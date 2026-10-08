import "server-only";
import { z } from "zod";
import type { AttemptStatus } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE, dateColumnFromLocalDate, isValidTimeZone, localDateString, type LocalDate } from "@/lib/dates";
import { startAttempt, type LearnerActor } from "@/server/attempts";
import { hasPermission } from "@/server/auth/permissions";
import { hasEntitlement } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { listEnrollments } from "@/server/enrollment";
import { displayedStreak } from "@/server/gamification/service";
import { AppError } from "@/server/lib/errors";

/**
 * The signed-in daily question (§46 "daily question", §19 streaks): one question per day for each of the student's
 * subjects (a subject-specific DailyQuestion wins over a qualification-wide one, exactly as the attempt engine
 * resolves it), answered as a DAILY_QUESTION attempt (instant feedback, streak credit through the engine's activity
 * recording). The public, signed-out page is built with the marketing site.
 */

export interface DailySubjectItem {
  subject: { id: string; name: string };
  qualificationName: string;
  /** Today's question for this subject, if one is scheduled. */
  dailyQuestionId: string | null;
  /** The student's attempt at it (one per question and student). */
  attempt: { id: string; status: AttemptStatus } | null;
  /** The plan includes the daily question for this subject. */
  entitled: boolean;
}

export interface DailyOverview {
  /** The student's local date. */
  date: LocalDate;
  items: DailySubjectItem[];
  /** Current streak in days, live (an unbridgeable gap shows 0 until the nightly job closes it). */
  streak: number;
}

function assertStudent(actor: LearnerActor): void {
  if (!z.uuid().safeParse(actor.userId).success) throw AppError.unauthenticated();
  if (!hasPermission({ roles: [...actor.roles] }, "learn.study", "all")) throw AppError.forbidden("Only students can answer the daily question.");
}

async function timeZoneOf(actor: LearnerActor): Promise<string> {
  if (actor.timeZone && isValidTimeZone(actor.timeZone)) return actor.timeZone;
  const profile = await db.profile.findUnique({ where: { userId: actor.userId }, select: { timezone: true } });
  return profile?.timezone && isValidTimeZone(profile.timezone) ? profile.timezone : DEFAULT_TIMEZONE;
}

/** Today's daily questions across the student's ACTIVE subjects, with their own attempts and the live streak. */
export async function getDailyOverview(actor: LearnerActor, now: Date = new Date()): Promise<DailyOverview> {
  assertStudent(actor);
  const timeZone = await timeZoneOf(actor);
  const today = localDateString(now, timeZone);
  const enrollments = (await listEnrollments(actor)).filter((e) => e.status === "ACTIVE");
  const qualificationIds = [...new Set(enrollments.map((e) => e.subject.qualification.id))];
  const subjectIds = enrollments.map((e) => e.subject.id);

  const [rows, stats] = await Promise.all([
    qualificationIds.length > 0
      ? db.dailyQuestion.findMany({
          where: {
            date: dateColumnFromLocalDate(today),
            qualificationId: { in: qualificationIds },
            OR: [{ subjectId: { in: subjectIds } }, { subjectId: null }],
          },
          select: { id: true, qualificationId: true, subjectId: true },
        })
      : Promise.resolve([]),
    db.learnerStats.findUnique({
      where: { userId: actor.userId },
      select: { currentStreak: true, longestStreak: true, lastStreakDate: true, streakFreezesAvailable: true, weekStartDate: true, weekGoalMet: true },
    }),
  ]);

  const chosen = new Map(
    enrollments.map((e) => {
      const qualificationId = e.subject.qualification.id;
      const row =
        rows.find((r) => r.qualificationId === qualificationId && r.subjectId === e.subject.id) ??
        rows.find((r) => r.qualificationId === qualificationId && r.subjectId === null) ??
        null;
      return [e.subject.id, row?.id ?? null] as const;
    }),
  );
  const dailyIds = [...new Set([...chosen.values()].filter((id): id is string => id !== null))];
  const [attempts, entitled] = await Promise.all([
    dailyIds.length > 0
      ? db.assessmentAttempt.findMany({
          where: { userId: actor.userId, dailyQuestionId: { in: dailyIds } },
          select: { id: true, status: true, dailyQuestionId: true },
        })
      : Promise.resolve([]),
    Promise.all(enrollments.map((e) => hasEntitlement(actor, "daily_question", { subjectId: e.subject.id }))),
  ]);
  const attemptByDaily = new Map(attempts.map((a) => [a.dailyQuestionId, { id: a.id, status: a.status }]));

  return {
    date: today,
    streak: displayedStreak(stats, today),
    items: enrollments.map((e, index) => {
      const dailyQuestionId = chosen.get(e.subject.id) ?? null;
      return {
        subject: { id: e.subject.id, name: e.subject.name },
        qualificationName: e.subject.qualification.shortName ?? e.subject.qualification.name,
        dailyQuestionId,
        attempt: dailyQuestionId ? (attemptByDaily.get(dailyQuestionId) ?? null) : null,
        entitled: entitled[index] ?? false,
      };
    }),
  };
}

/**
 * Starts (or resumes) today's daily question in an enrolled subject. The engine checks the `daily_question`
 * entitlement and returns the existing attempt when the student already opened today's question.
 *
 * @throws AppError VALIDATION (not enrolled) | NOT_FOUND (no question today) | ENTITLEMENT_REQUIRED
 */
export async function startDailyQuestion(actor: LearnerActor, subjectId: string): Promise<{ attemptId: string; resumed: boolean }> {
  assertStudent(actor);
  if (!z.uuid().safeParse(subjectId).success) throw AppError.validation({ subjectId: ["Choose a subject."] });
  const enrollment = await db.subjectEnrollment.findUnique({
    where: { userId_subjectId: { userId: actor.userId, subjectId } },
    select: { status: true },
  });
  if (!enrollment || enrollment.status !== "ACTIVE") throw AppError.validation({ subjectId: ["Choose one of your subjects."] });
  const started = await startAttempt(actor, { mode: "DAILY_QUESTION", subjectId });
  return { attemptId: started.attempt.id, resumed: started.resumed };
}
