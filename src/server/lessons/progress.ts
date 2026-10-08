import "server-only";
import { z } from "zod";
import type { LessonProgressStatus } from "@/generated/prisma/client";
import { localDateString, dateColumnFromLocalDate } from "@/lib/dates";
import { EntitlementRequiredError } from "@/server/billing/entitlements";
import { db, type DbClient } from "@/server/db";
import { awardXp, evaluateAchievements, recordActivity } from "@/server/gamification/service";
import { AppError } from "@/server/lib/errors";
import { assertRateLimit, RATE_LIMIT_PRESETS, rateLimits, type RateLimitInput } from "@/server/lib/rate-limit";
import { refreshSubjectProgress } from "@/server/progress/service";
import { recordPlanActivity } from "@/server/studyplan/service";
import { refreshAssignmentCounters } from "@/server/teaching/assignment-progress";
import { assertStudent, resolveLessonAccess, timeZoneOf, type LessonAccess, type LessonActor } from "./access";
import { creditableSeconds, MAX_CREDIT_PER_BEAT_SECONDS, sessionIdleCutoff } from "./core";

/**
 * Lesson progress (§8 "Mark as complete", §6 daily target, §19 streaks and XP, §21 parent activity, §22 lesson
 * assignments). One idempotent write path for the reader's heartbeat beacon and the "Mark as complete" button:
 *
 * - `LessonProgress` (student × lesson): first / last viewed, view count, active seconds, completion (once, with the
 *   revision the student completed);
 * - `StudySession` (activity LESSON): heartbeats extend the open session; after `STUDY_SESSION_IDLE_MINUTES` (./core)
 *   of silence a new one starts (the old one is closed at its last activity);
 * - `DailyActivity` through gamification `recordActivity` (study seconds, lessons completed; daily goal and streak);
 * - at FIRST completion only: LearnerStats lifetime totals (lessons completed + the lesson's study time so far),
 *   `LESSON_COMPLETED` XP (ledger-idempotent per lesson), the subject rollup, badges, the student's LESSON
 *   assignments of this lesson (SUBMITTED / LATE), and the study plan's LESSON items of this lesson (DONE, with the
 *   lesson's study seconds; `recordPlanActivity`).
 *
 * The client's time is never trusted beyond the server clock (`creditableSeconds`), so replays, double taps and two
 * open tabs add nothing. Locked lessons record nothing (ENTITLEMENT_REQUIRED). Rate limited per student.
 */

/** Per-student limit on progress writes (heartbeats every 30 s per open lesson tab, plus views and completions). */
export const LESSON_PROGRESS_RATE_LIMIT = RATE_LIMIT_PRESETS.lessonProgress;

/** The shared `lessonProgress` preset (`lessonProgress:<userId>`; tunable through the `rateLimits` setting). */
export function lessonProgressRateLimit(userId: string): RateLimitInput {
  return rateLimits.lessonProgress(userId);
}

export const markLessonProgressSchema = z.strictObject({
  /** Active seconds measured by the client since its last report. */
  secondsSpent: z.int().min(0).max(3_600).default(0),
  /** "Mark as complete". Completing again changes nothing. */
  completed: z.boolean().default(false),
  /** The page was just opened (counts a view). */
  view: z.boolean().default(false),
});
export type MarkLessonProgressInput = z.input<typeof markLessonProgressSchema>;

export interface LessonProgressResult {
  lessonId: string;
  status: LessonProgressStatus;
  completedAt: Date | null;
  timeSpentSeconds: number;
  /** Seconds credited by this call (after the server-clock cap). */
  creditedSeconds: number;
  /** This call completed the lesson for the first time. */
  newlyCompleted: boolean;
  /** XP recorded for completing the lesson by this call (0 on replays). */
  xpAwarded: number;
  /** Today's daily goal is met (null when this call recorded no activity). */
  dailyGoalMet: boolean | null;
}

const TX_OPTIONS = { maxWait: 10_000, timeout: 30_000 } as const;

interface ProgressRow {
  status: LessonProgressStatus;
  completedAt: Date | null;
  lastViewedAt: Date;
  timeSpentSeconds: number;
  viewCount: number;
}

/** Inserts the progress row when missing, then locks it for the rest of the transaction. */
async function lockProgressRow(tx: DbClient, userId: string, lessonId: string, now: Date): Promise<{ row: ProgressRow; created: boolean }> {
  const { count } = await tx.lessonProgress.createMany({
    data: [{ userId, lessonId, firstViewedAt: now, lastViewedAt: now, createdAt: now, viewCount: 1 }],
    skipDuplicates: true,
  });
  const rows = await tx.$queryRaw<ProgressRow[]>`
    SELECT "status", "completedAt", "lastViewedAt", "timeSpentSeconds", "viewCount"
      FROM "LessonProgress"
     WHERE "userId" = ${userId}::uuid AND "lessonId" = ${lessonId}::uuid
       FOR UPDATE`;
  const row = rows[0];
  if (!row) throw new Error("lessons: progress row missing after insert");
  return { row, created: count > 0 };
}

/** Extends the open lesson study session, or closes the idle one and starts a new session (ARCHITECTURE §4.7). */
async function recordStudySession(tx: DbClient, access: LessonAccess, userId: string, seconds: number, now: Date, timeZone: string, channel: LessonActor["channel"]): Promise<void> {
  const cutoff = sessionIdleCutoff(now);
  const open = await tx.studySession.findFirst({
    where: { userId, lessonId: access.lesson.id, activityType: "LESSON", endedAt: null, lastActiveAt: { gte: cutoff }, startedAt: { gte: new Date(now.getTime() - 24 * 3_600_000) } },
    orderBy: { startedAt: "desc" },
    select: { id: true },
  });
  if (open) {
    await tx.studySession.update({ where: { id: open.id }, data: { durationSeconds: { increment: seconds }, lastActiveAt: now } });
    return;
  }
  await tx.$executeRaw`
    UPDATE "StudySession" SET "endedAt" = "lastActiveAt", "updatedAt" = ${now}
     WHERE "userId" = ${userId}::uuid AND "lessonId" = ${access.lesson.id}::uuid AND "activityType" = 'LESSON'
       AND "endedAt" IS NULL AND "lastActiveAt" < ${cutoff}`;
  const startedAt = new Date(now.getTime() - seconds * 1000);
  await tx.studySession.create({
    data: {
      userId,
      subjectId: access.subjectId,
      topicId: access.topic.id,
      lessonId: access.lesson.id,
      startedAt,
      lastActiveAt: now,
      createdAt: now,
      localDate: dateColumnFromLocalDate(localDateString(startedAt, timeZone)),
      durationSeconds: seconds,
      activityType: "LESSON",
      channel: channel === "whatsapp" ? "WHATSAPP" : channel === "api" ? "API" : "WEB",
    },
  });
}

/**
 * Marks the student's live LESSON assignments of this lesson as handed in (§22): SUBMITTED, or LATE after the due date.
 * Returns the assignment ids whose progress changed (their cached counters need a refresh).
 */
async function completeLessonAssignments(tx: DbClient, userId: string, lessonId: string, now: Date): Promise<string[]> {
  const rows = await tx.assignmentProgress.findMany({
    where: {
      userId,
      status: { in: ["NOT_STARTED", "IN_PROGRESS"] },
      assignment: { type: "LESSON", lessonId, status: "PUBLISHED", publishedAt: { lte: now }, OR: [{ closesAt: null }, { closesAt: { gt: now } }] },
    },
    select: { assignmentId: true, startedAt: true, assignment: { select: { dueAt: true, allowLateSubmission: true } } },
  });
  const changed: string[] = [];
  for (const row of rows) {
    const late = row.assignment.dueAt !== null && row.assignment.dueAt.getTime() < now.getTime();
    if (late && !row.assignment.allowLateSubmission) continue;
    await tx.assignmentProgress.update({
      where: { assignmentId_userId: { assignmentId: row.assignmentId, userId } },
      data: { status: late ? "LATE" : "SUBMITTED", startedAt: row.startedAt ?? now, submittedAt: now, completedAt: now, progressPercent: 100 },
    });
    changed.push(row.assignmentId);
  }
  return changed;
}

/**
 * First time the student works on an assigned lesson: NOT_STARTED -> IN_PROGRESS. Returns the assignment ids whose
 * progress changed (none on most heartbeats: the lookup hits the (userId, status) index and finds nothing).
 */
async function startLessonAssignments(tx: DbClient, userId: string, lessonId: string, now: Date): Promise<string[]> {
  const rows = await tx.assignmentProgress.findMany({
    where: { userId, status: "NOT_STARTED", assignment: { type: "LESSON", lessonId, status: "PUBLISHED", publishedAt: { lte: now } } },
    select: { assignmentId: true },
  });
  const ids = rows.map((row) => row.assignmentId);
  if (ids.length === 0) return [];
  await tx.assignmentProgress.updateMany({
    where: { userId, status: "NOT_STARTED", assignmentId: { in: ids } },
    data: { status: "IN_PROGRESS", startedAt: now },
  });
  return ids;
}

/**
 * Records lesson activity (module doc). Idempotent: completing twice awards nothing more; heartbeats only credit time
 * the server clock allows.
 *
 * @throws AppError VALIDATION | NOT_FOUND (not readable) | ENTITLEMENT_REQUIRED (locked lesson) | RATE_LIMITED | FORBIDDEN
 */
export async function markLessonProgress(
  actor: LessonActor,
  lessonId: string,
  input: MarkLessonProgressInput,
  options: { now?: Date } = {},
): Promise<LessonProgressResult> {
  assertStudent(actor);
  const parsed = markLessonProgressSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const now = options.now ?? new Date();
  await assertRateLimit(rateLimits.lessonProgress(actor.userId), "You're sending updates too quickly. Please wait a moment.");
  const access = await resolveLessonAccess(actor, lessonId, { now });
  if (!access.open) throw new EntitlementRequiredError("lessons.full");

  const { secondsSpent, completed, view } = parsed.data;
  const userId = actor.userId;
  const timeZone = await timeZoneOf(actor);

  return db.$transaction(async (tx) => {
    const { row, created } = await lockProgressRow(tx, userId, access.lesson.id, now);
    const credited = creditableSeconds({
      claimedSeconds: Math.min(secondsSpent, MAX_CREDIT_PER_BEAT_SECONDS),
      previousActivityAt: created ? null : row.lastViewedAt,
      now,
    });
    const newlyCompleted = completed && row.status !== "COMPLETED";
    const timeSpentSeconds = Math.min(2_000_000_000, row.timeSpentSeconds + credited);

    const updated = await tx.lessonProgress.update({
      where: { userId_lessonId: { userId, lessonId: access.lesson.id } },
      data: {
        lastViewedAt: now.getTime() > row.lastViewedAt.getTime() ? now : row.lastViewedAt,
        timeSpentSeconds,
        ...(view && !created ? { viewCount: Math.min(2_000_000_000, row.viewCount + 1) } : {}),
        ...(newlyCompleted
          ? { status: "COMPLETED" as const, completedAt: now, completedRevision: access.lesson.revision, progressPercent: 100 }
          : {}),
      },
      select: { status: true, completedAt: true, timeSpentSeconds: true },
    });

    if (credited > 0) await recordStudySession(tx, access, userId, credited, now, timeZone, actor.channel);
    const touchedAssignments: string[] = [];
    if (created || view) touchedAssignments.push(...(await startLessonAssignments(tx, userId, access.lesson.id, now)));
    // A lesson assigned after the student had already completed it counts as handed in on the next visit.
    if (completed || (view && updated.status === "COMPLETED")) {
      touchedAssignments.push(...(await completeLessonAssignments(tx, userId, access.lesson.id, now)));
    }
    // Keeps the assignments' cached counters ("18/25 submitted") current; a no-op when nothing changed.
    await refreshAssignmentCounters(tx, touchedAssignments);

    let dailyGoalMet: boolean | null = null;
    if (credited > 0 || newlyCompleted) {
      const activity = await recordActivity(
        tx,
        userId,
        { studySeconds: credited, lessonsCompleted: newlyCompleted ? 1 : 0 },
        // LearnerStats is written at completion only (never per heartbeat): the lesson's time so far joins the lifetime total.
        { at: now, timeZone, ...(newlyCompleted ? { lifetime: { lessonsCompleted: 1, studySeconds: timeSpentSeconds } } : {}) },
      );
      dailyGoalMet = activity.dailyGoalMet;
    }

    let xpAwarded = 0;
    if (newlyCompleted) {
      const award = await awardXp(tx, userId, "LESSON_COMPLETED", access.lesson.id, undefined, { sourceType: "LESSON", at: now, timeZone });
      if (award.awarded) xpAwarded = award.amount;
      if (access.enrollmentStatus !== null) await refreshSubjectProgress(tx, userId, access.subjectId, { now, activityAt: now });
      await evaluateAchievements(tx, userId, { at: now, timeZone, context: { subjectId: access.subjectId, topicId: access.topic.id } });
      // Study plan (§16): the plan's LESSON items of this lesson become DONE and get the lesson's study time.
      await recordPlanActivity(tx, { userId, at: now, timeZone, lesson: { lessonId: access.lesson.id, seconds: updated.timeSpentSeconds } });
    }

    return {
      lessonId: access.lesson.id,
      status: updated.status,
      completedAt: updated.completedAt,
      timeSpentSeconds: updated.timeSpentSeconds,
      creditedSeconds: credited,
      newlyCompleted,
      xpAwarded,
      dailyGoalMet,
    };
  }, TX_OPTIONS);
}
