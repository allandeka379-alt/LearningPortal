import { describe, expect, it } from "vitest";
import { dateColumnFromLocalDate, localDateString } from "@/lib/dates";
import { canAccessSubjectContent } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { rateLimit } from "@/server/lib/rate-limit";
import { createClass } from "../../../tests/factories/identity";
import { createEnrollment, createLearner, type Learner } from "../../../tests/factories/learning";
import { lessonProgressRateLimit, markLessonProgress } from "./index";
import { createLessonFixture, type LessonFixture } from "./testing";

/**
 * Integration: lesson progress (§8 "Mark as complete", automatic time tracking) against the test database —
 * LessonProgress, StudySession, DailyActivity, LearnerStats, the XP ledger, lesson assignments, entitlement lock and
 * the per-student rate limit.
 */

const ZONE = "Africa/Harare";

async function expectAppError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error) ? error.code : error).toBe(code);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

async function enrolled(fixture: LessonFixture, features: "UNLIMITED" | null = "UNLIMITED"): Promise<Learner> {
  const learner = await createLearner({ features, timezone: ZONE });
  await createEnrollment(learner.userId, { subjectId: fixture.subjectId, syllabusId: fixture.syllabusId });
  return { ...learner, actor: { ...learner.actor, timeZone: ZONE } };
}

describe("markLessonProgress", () => {
  it("tracks views and active time, completes once, and records streak, XP and lifetime totals idempotently", async () => {
    const fixture = await createLessonFixture();
    const lesson = fixture.lessons[0];
    const { userId, actor } = await enrolled(fixture);
    // Three hours ago, so every later step is still in the past (the database clock is never ahead of it).
    const t0 = new Date(Date.now() - 3 * 3_600_000);
    const at = (seconds: number) => new Date(t0.getTime() + seconds * 1000);

    const view = await markLessonProgress(actor, lesson.id, { view: true }, { now: t0 });
    expect(view).toMatchObject({ status: "IN_PROGRESS", creditedSeconds: 0, newlyCompleted: false, xpAwarded: 0, dailyGoalMet: null });

    const beat = await markLessonProgress(actor, lesson.id, { secondsSpent: 30 }, { now: at(30) });
    expect(beat).toMatchObject({ creditedSeconds: 30, timeSpentSeconds: 30 });
    // A replayed heartbeat a second later only gets what the server clock allows.
    const replay = await markLessonProgress(actor, lesson.id, { secondsSpent: 30 }, { now: at(31) });
    expect(replay.creditedSeconds).toBe(6);

    const done = await markLessonProgress(actor, lesson.id, { secondsSpent: 30, completed: true }, { now: at(91) });
    expect(done).toMatchObject({ status: "COMPLETED", newlyCompleted: true, creditedSeconds: 30, timeSpentSeconds: 66 });
    expect(done.xpAwarded).toBeGreaterThan(0);
    expect(done.completedAt?.getTime()).toBe(at(91).getTime());

    const twice = await markLessonProgress(actor, lesson.id, { completed: true }, { now: at(100) });
    expect(twice).toMatchObject({ status: "COMPLETED", newlyCompleted: false, xpAwarded: 0 });

    const progress = await db.lessonProgress.findUniqueOrThrow({ where: { userId_lessonId: { userId, lessonId: lesson.id } } });
    expect(progress).toMatchObject({ status: "COMPLETED", completedRevision: 1, progressPercent: 100, timeSpentSeconds: 66, viewCount: 1 });

    const sessions = await db.studySession.findMany({ where: { userId, lessonId: lesson.id }, orderBy: { startedAt: "asc" } });
    expect(sessions).toHaveLength(1);
    expect(sessions[0]).toMatchObject({ activityType: "LESSON", durationSeconds: 66, subjectId: fixture.subjectId, topicId: fixture.topicId, endedAt: null });

    const day = await db.dailyActivity.findUniqueOrThrow({ where: { userId_date: { userId, date: dateColumnFromLocalDate(localDateString(t0, ZONE)) } } });
    expect(day.studySeconds).toBe(66);
    expect(day.lessonsCompleted).toBe(1);

    const xp = await db.xpEvent.findMany({ where: { userId, reason: "LESSON_COMPLETED" } });
    expect(xp).toHaveLength(1);
    expect(xp[0]).toMatchObject({ sourceId: lesson.id, sourceType: "LESSON", amount: done.xpAwarded });

    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.lessonsCompleted).toBe(1);
    expect(stats.totalStudySeconds).toBe(66);

    // After 30 idle minutes a new study session starts and the old one is closed at its last activity.
    const later = await markLessonProgress(actor, lesson.id, { secondsSpent: 20, view: true }, { now: at(7_200) });
    expect(later.creditedSeconds).toBe(20);
    const after = await db.studySession.findMany({ where: { userId, lessonId: lesson.id }, orderBy: { startedAt: "asc" } });
    expect(after).toHaveLength(2);
    expect(after[0]?.lastActiveAt.getTime()).toBe(at(91).getTime());
    expect(after[0]?.endedAt?.getTime()).toBe(at(91).getTime());
    expect(after[1]).toMatchObject({ durationSeconds: 20, endedAt: null });
    expect((await db.lessonProgress.findUniqueOrThrow({ where: { userId_lessonId: { userId, lessonId: lesson.id } } })).viewCount).toBe(2);
    // Lifetime totals are written at completion only, never per heartbeat.
    expect((await db.learnerStats.findUniqueOrThrow({ where: { userId } })).lessonsCompleted).toBe(1);
  });

  it("hands in the student's lesson assignment on completion (§22)", async () => {
    const fixture = await createLessonFixture();
    const lesson = fixture.lessons[2];
    const learner = await enrolled(fixture);
    const { class: klass } = await createClass({ studentUserIds: [learner.userId], subjectId: fixture.subjectId });
    const assignment = await db.assignment.create({
      data: {
        classId: klass.id,
        createdById: klass.createdById,
        subjectId: fixture.subjectId,
        lessonId: lesson.id,
        type: "LESSON",
        status: "PUBLISHED",
        publishedAt: new Date(Date.now() - 3_600_000),
        dueAt: new Date(Date.now() + 86_400_000),
        title: "Read: the quadratic formula",
      },
    });
    const key = { assignmentId_userId: { assignmentId: assignment.id, userId: learner.userId } };
    await db.assignmentProgress.create({ data: { assignmentId: assignment.id, userId: learner.userId } });

    const counters = { assignedCount: true, startedCount: true, submittedCount: true, averageScorePercent: true } as const;
    await markLessonProgress(learner.actor, lesson.id, { view: true });
    expect(await db.assignmentProgress.findUniqueOrThrow({ where: key })).toMatchObject({ status: "IN_PROGRESS" });
    // The assignment's cached counters follow the student's progress in the same transaction.
    expect(await db.assignment.findUniqueOrThrow({ where: { id: assignment.id }, select: counters })).toEqual({
      assignedCount: 1,
      startedCount: 1,
      submittedCount: 0,
      averageScorePercent: null,
    });
    await markLessonProgress(learner.actor, lesson.id, { completed: true });
    const handedIn = await db.assignmentProgress.findUniqueOrThrow({ where: key });
    expect(handedIn).toMatchObject({ status: "SUBMITTED", progressPercent: 100 });
    expect(handedIn.submittedAt).not.toBeNull();
    expect(await db.assignment.findUniqueOrThrow({ where: { id: assignment.id }, select: counters })).toEqual({
      assignedCount: 1,
      startedCount: 1,
      submittedCount: 1,
      averageScorePercent: null,
    });
  });

  it("records nothing for a locked lesson, and validates input", async () => {
    const fixture = await createLessonFixture();
    const [first, premium] = fixture.lessons;
    const learner = await enrolled(fixture, null);
    await expectAppError(markLessonProgress(learner.actor, first.id, { secondsSpent: -1 }), "VALIDATION");
    await expectAppError(markLessonProgress(learner.actor, fixture.draft.id, { view: true }), "NOT_FOUND");
    if (await canAccessSubjectContent(learner.userId, fixture.subjectId, { syllabusId: fixture.syllabusId })) return;
    await expectAppError(markLessonProgress(learner.actor, premium.id, { view: true, completed: true }), "ENTITLEMENT_REQUIRED");
    expect(await db.lessonProgress.findUnique({ where: { userId_lessonId: { userId: learner.userId, lessonId: premium.id } } })).toBeNull();
  });

  it("is rate limited per student", async () => {
    const fixture = await createLessonFixture();
    const learner = await enrolled(fixture);
    const rule = lessonProgressRateLimit(learner.userId);
    for (let i = 0; i < rule.limit; i += 1) await rateLimit(rule);
    await expectAppError(markLessonProgress(learner.actor, fixture.lessons[0].id, { view: true }), "RATE_LIMITED");
    // Another student is not affected.
    const other = await enrolled(fixture);
    await expect(markLessonProgress(other.actor, fixture.lessons[0].id, { view: true })).resolves.toMatchObject({ status: "IN_PROGRESS" });
  });
});
