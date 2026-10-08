import { describe, expect, it } from "vitest";
import { addDays, dateColumnFromLocalDate, daysBetween, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { answerAndMark, saveResponse, startAttempt, submitAttempt } from "@/server/attempts";
import { db } from "@/server/db";
import { enrolInSubjects } from "@/server/enrollment";
import { isAppError } from "@/server/lib/errors";
import { markLessonProgress } from "@/server/lessons";
import { createParent } from "../../../tests/factories/identity";
import { correctResponse, createExamSession, createLearner, createLearningSetup, wrongResponse, type LearningSetup } from "../../../tests/factories/learning";
import { weekdayKey, type WeeklyAvailability } from "./generator";
import {
  adaptPlan,
  createPlan,
  getPlanPage,
  getPlanSetup,
  markItemDone,
  recordPlanActivity,
  reopenItem,
  skipItem,
  syncPlanProgress,
} from "./service";

/**
 * Study plan service against Postgres (§16): plans respect each day's minutes, one ACTIVE plan per student, adaptation
 * keeps completed work, and real practice / lesson completion ticks the matching items. Every fixture is unique to
 * the test (shared, never-truncated test database).
 */

const ZONE = "Africa/Harare";
const EVERY_DAY_60: WeeklyAvailability = { mon: 60, tue: 60, wed: 60, thu: 60, fri: 60, sat: 60, sun: 60 };

async function student(options: { examInDays?: number | null; questionsPerLeaf?: number } = {}) {
  const setup = await createLearningSetup({ topics: 3, subtopicsPerTopic: 2, questionsPerLeaf: options.questionsPerLeaf ?? 5, lessonsPerTopic: 1 });
  const now = new Date();
  const today = localDateString(now, ZONE);
  const examInDays = options.examInDays === undefined ? 70 : options.examInDays;
  const session = examInDays === null ? null : await createExamSession(setup.qualificationId, { startsOn: addDays(today, examInDays) });
  const { userId, actor } = await createLearner();
  const planActor = { ...actor, timeZone: ZONE };
  await enrolInSubjects(actor, { subjectIds: [setup.subjectId], ...(session ? { targetExamSessionId: session.id } : {}) });
  return { setup, userId, actor: planActor, now, today, session, examInDays };
}

function definitionOf(setup: LearningSetup, questionId: string | undefined) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${String(questionId)} not in setup`);
  return question.definition;
}

/** A diagnostic with every answer wrong: the subject gets (weak) mastery evidence, so the plan starts with practice. */
async function takeDiagnostic(actor: Awaited<ReturnType<typeof student>>["actor"], setup: LearningSetup) {
  const { attempt } = await startAttempt(actor, { mode: "DIAGNOSTIC", subjectId: setup.subjectId, count: 6 });
  for (const slot of attempt.questions) await saveResponse(actor, attempt.id, slot.position, wrongResponse(definitionOf(setup, slot.question?.id)));
  await submitAttempt(actor, attempt.id);
}

async function planItems(planId: string) {
  return db.studyPlanItem.findMany({ where: { planId }, orderBy: [{ date: "asc" }, { sortOrder: "asc" }] });
}

function minutesByDate(items: readonly { date: Date; targetMinutes: number }[]): Map<LocalDate, number> {
  const out = new Map<LocalDate, number>();
  for (const item of items) {
    const date = localDateFromDateColumn(item.date);
    out.set(date, (out.get(date) ?? 0) + item.targetMinutes);
  }
  return out;
}

async function expectCode(promise: Promise<unknown>, code: string) {
  const error = await promise.then(
    () => null,
    (e: unknown) => e,
  );
  expect(isAppError(error) ? error.code : error).toBe(code);
}

describe("createPlan", () => {
  it("plans within each day's available minutes, from the pinned syllabus, with a diagnostic first for a new subject", async () => {
    const { setup, userId, actor, today, session, examInDays } = await student();
    const availability: WeeklyAvailability = { mon: 45, tue: 30, wed: 0, thu: 60, fri: 20, sat: 90, sun: 15 };

    const result = await createPlan(actor, { availability });
    expect(result.supersededPlanId).toBeNull();
    const plan = await db.studyPlan.findUniqueOrThrow({ where: { id: result.planId } });
    expect(plan).toMatchObject({ userId, status: "ACTIVE", weeklyTargetMinutes: 260, dailyTargetMinutes: 37, generatorVersion: "planner-1", adaptationCount: 0 });
    expect(localDateFromDateColumn(plan.startsOn)).toBe(today);
    expect(localDateFromDateColumn(plan.examDate)).toBe(addDays(today, examInDays as number));
    expect(plan.inputs).toMatchObject({ examDateSource: "TARGET_SESSION", examSessionId: session?.id, timezone: ZONE });

    const items = await planItems(plan.id);
    expect(items.length).toBe(result.itemCount);
    expect(items.length).toBeGreaterThan(5);
    for (const [date, minutes] of minutesByDate(items)) {
      expect(daysBetween(today, date)).toBeGreaterThanOrEqual(0);
      expect(daysBetween(today, date)).toBeLessThan(28);
      expect(minutes).toBeLessThanOrEqual(availability[weekdayKey(date)]);
    }
    // Days without time hold nothing.
    expect(items.some((i) => weekdayKey(localDateFromDateColumn(i.date)) === "wed")).toBe(false);

    // No evidence yet: one diagnostic first, no lessons or practice for the subject before (or on) its day.
    const diagnostics = items.filter((i) => i.activityType === "DIAGNOSTIC");
    expect(diagnostics).toHaveLength(1);
    const diagnosticDate = localDateFromDateColumn(diagnostics[0]?.date as Date);
    expect(items.filter((i) => i.activityType !== "DIAGNOSTIC" && daysBetween(localDateFromDateColumn(i.date), diagnosticDate) >= 0)).toEqual([]);

    // Topic level of the pinned version; practice only where questions exist; each lesson once.
    const topicIds = new Set(setup.topicIds);
    for (const item of items.filter((i) => i.activityType === "PRACTICE" || i.activityType === "REVIEW")) {
      expect(topicIds.has(item.topicId as string)).toBe(true);
      expect(item.targetQuestions).toBeGreaterThan(0);
    }
    const lessonIds = items.filter((i) => i.activityType === "LESSON").map((i) => i.lessonId);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);
    expect(lessonIds.every((id) => setup.chain.lessons.some((l) => l.id === id))).toBe(true);
    expect(items.every((i) => i.status === "PENDING" && (i.reasonData as { plannerReason?: string } | null)?.plannerReason)).toBe(true);
    expect(items.some((i) => i.activityType === "MOCK_EXAM")).toBe(false); // no published mock exists

    // Read model.
    const page = await getPlanPage(actor);
    expect(page.plan).toMatchObject({ id: plan.id, examDateSource: "TARGET_SESSION", daysUntilExam: examInDays, mode: "EXAM_PREP" });
    expect(page.plan?.subjects).toEqual([{ subjectId: setup.subjectId, name: setup.chain.subject.name }]);
    expect(page.todayPlan?.items.map((i) => i.id)).toEqual(items.filter((i) => localDateFromDateColumn(i.date) === today).map((i) => i.id));
    expect(page.todayPlan?.availableMinutes).toBe(availability[weekdayKey(today)]);
    expect(page.week?.days).toHaveLength(7);
    expect(page.week?.days.filter((d) => d.isToday)).toHaveLength(1);
  });

  it("keeps exactly one ACTIVE plan: a new plan supersedes the old one, also under concurrent requests", async () => {
    const { userId, actor } = await student({ examInDays: null });
    const first = await createPlan(actor, { availability: EVERY_DAY_60 });
    const second = await createPlan(actor, { availability: { ...EVERY_DAY_60, sun: 0 }, examDate: null });
    expect(second.supersededPlanId).toBe(first.planId);
    expect(await db.studyPlan.findUniqueOrThrow({ where: { id: first.planId }, select: { status: true } })).toEqual({ status: "SUPERSEDED" });

    const results = await Promise.allSettled([createPlan(actor, { availability: EVERY_DAY_60 }), createPlan(actor, { availability: EVERY_DAY_60 })]);
    for (const outcome of results) {
      if (outcome.status === "rejected") expect(isAppError(outcome.reason) && outcome.reason.code).toBe("CONFLICT");
    }
    expect(results.some((r) => r.status === "fulfilled")).toBe(true);
    expect(await db.studyPlan.count({ where: { userId, status: "ACTIVE" } })).toBe(1);

    // No exam date anywhere: a rolling (maintenance) plan.
    const page = await getPlanPage(actor);
    expect(page.plan).toMatchObject({ examDate: null, examDateSource: "NONE", daysUntilExam: null, mode: "MAINTENANCE" });
  });

  it("validates subjects and the exam date, and refuses non-students", async () => {
    const { actor, today } = await student();
    await expectCode(createPlan(actor, { availability: EVERY_DAY_60, subjectIds: ["0199a1d2-0000-7000-8000-000000000001"] }), "VALIDATION");
    await expectCode(createPlan(actor, { availability: EVERY_DAY_60, examDate: today }), "VALIDATION");
    await expectCode(createPlan(actor, { availability: { mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 } }), "VALIDATION");

    const { user } = await createParent();
    await expectCode(createPlan({ userId: user.id, roles: ["PARENT"] }, { availability: EVERY_DAY_60 }), "FORBIDDEN");
  });

  it("prefills the form from the target examination and study defaults", async () => {
    const { setup, actor, today, examInDays } = await student();
    const setupView = await getPlanSetup(actor);
    expect(setupView.subjects.map((s) => s.subjectId)).toEqual([setup.subjectId]);
    expect(setupView.suggestedExam).toMatchObject({ date: addDays(today, examInDays as number), source: "TARGET_SESSION" });
    expect(setupView.availabilitySource).toBe("DEFAULTS");
    expect(setupView.current).toBeNull();
    expect(setupView.minExamDate).toBe(addDays(today, 1));

    await createPlan(actor, { availability: EVERY_DAY_60, examDate: addDays(today, 40) });
    const editing = await getPlanSetup(actor);
    expect(editing).toMatchObject({ availabilitySource: "PLAN", availability: EVERY_DAY_60, current: { subjectIds: [setup.subjectId], examDate: addDays(today, 40) } });
  });
});

describe("adaptPlan", () => {
  it("keeps completed (and today's skipped) items, replaces pending ones and still respects each day's minutes", async () => {
    const { setup, actor, today } = await student();
    await takeDiagnostic(actor, setup);
    const { planId } = await createPlan(actor, { availability: EVERY_DAY_60 });
    const before = await planItems(planId);
    const todays = before.filter((i) => localDateFromDateColumn(i.date) === today);
    expect(todays.length).toBeGreaterThanOrEqual(2);
    const [doneItem, skippedItem] = todays as [(typeof todays)[number], (typeof todays)[number]];
    await markItemDone(actor, doneItem.id);
    await skipItem(actor, skippedItem.id);
    const pendingIds = before.filter((i) => i.id !== doneItem.id && i.id !== skippedItem.id).map((i) => i.id);

    const result = await adaptPlan(actor);
    expect(result).toMatchObject({ planId, kept: 2, removed: pendingIds.length });
    expect(result.added).toBeGreaterThan(0);

    const after = await planItems(planId);
    expect(after.find((i) => i.id === doneItem.id)).toMatchObject({ status: "DONE", generation: 0 });
    expect(after.find((i) => i.id === skippedItem.id)).toMatchObject({ status: "SKIPPED" });
    expect(after.filter((i) => pendingIds.includes(i.id))).toEqual([]);
    expect(after.filter((i) => i.id !== doneItem.id && i.id !== skippedItem.id).every((i) => i.generation === 1 && i.status === "PENDING")).toBe(true);
    for (const minutes of minutesByDate(after).values()) expect(minutes).toBeLessThanOrEqual(60);
    if (doneItem.lessonId) expect(after.filter((i) => i.lessonId === doneItem.lessonId)).toHaveLength(1);

    const plan = await db.studyPlan.findUniqueOrThrow({ where: { id: planId } });
    expect(plan.adaptationCount).toBe(1);
    expect(plan.lastAdaptedAt).not.toBeNull();
    expect(plan.status).toBe("ACTIVE");
  });

  it("lets the student undo a tick, and refuses items that are not theirs", async () => {
    const { setup, actor } = await student();
    await takeDiagnostic(actor, setup);
    const { planId } = await createPlan(actor, { availability: EVERY_DAY_60 });
    const [item] = await planItems(planId);
    if (!item) throw new Error("plan has no items");
    expect((await markItemDone(actor, item.id)).status).toBe("DONE");
    expect((await reopenItem(actor, item.id)).status).toBe("PENDING");
    const stored = await db.studyPlanItem.findUniqueOrThrow({ where: { id: item.id } });
    expect(stored.completedAt).toBeNull();

    const other = await createLearner();
    await expectCode(markItemDone({ ...other.actor, timeZone: ZONE }, item.id), "NOT_FOUND");
    await expectCode(adaptPlan({ ...other.actor, timeZone: ZONE }), "NOT_FOUND");
  });
});

describe("completion matching", () => {
  it("ticks practice by the questions answered in the item's topic, lessons on completion, and marks past items missed", async () => {
    const { setup, userId, actor, today } = await student();
    await takeDiagnostic(actor, setup);
    const { planId } = await createPlan(actor, { availability: EVERY_DAY_60 });
    const items = await planItems(planId);
    const practiceItem = items.find((i) => i.activityType === "PRACTICE" && localDateFromDateColumn(i.date) === today && i.topicId);
    if (!practiceItem?.topicId || !practiceItem.targetQuestions) throw new Error("expected a practice item today");

    // Practice in the item's topic (questions sit on its subtopics).
    const target = practiceItem.targetQuestions;
    const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, topicIds: [practiceItem.topicId], count: Math.min(target, 10) });
    for (const slot of attempt.questions) {
      await answerAndMark(actor, attempt.id, slot.position, correctResponse(definitionOf(setup, slot.question?.id)));
    }
    const answered = attempt.questions.length;
    expect(answered).toBeGreaterThan(0);
    await recordPlanActivity(db, { userId, timeZone: ZONE });
    const credited = await db.studyPlanItem.findUniqueOrThrow({ where: { id: practiceItem.id } });
    expect(credited.completedQuestions).toBe(Math.min(answered, target));
    expect(credited.status).toBe(answered >= target ? "DONE" : "PARTIAL");
    if (credited.status === "DONE") expect(credited.completedAt).not.toBeNull();

    // Idempotent: syncing again changes nothing.
    await syncPlanProgress(db, userId, { timeZone: ZONE });
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: practiceItem.id } })).toMatchObject({
      status: credited.status,
      completedQuestions: credited.completedQuestions,
    });

    // A completed lesson ticks its item, even one planned for a later day this week.
    const lessonItem = items.find((i) => i.activityType === "LESSON" && i.lessonId && daysBetween(localDateFromDateColumn(i.date), addDays(today, 6)) >= 0);
    if (!lessonItem?.lessonId) throw new Error("expected a lesson in the first week");
    const completedAt = new Date();
    await db.lessonProgress.create({ data: { userId, lessonId: lessonItem.lessonId, status: "COMPLETED", completedAt, progressPercent: 100 } });
    await recordPlanActivity(db, { userId, timeZone: ZONE });
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: lessonItem.id } })).toMatchObject({ status: "DONE", completedAt });

    // Tomorrow, today's untouched items are MISSED.
    const tomorrow = new Date(Date.now() + 86_400_000);
    const untouched = await db.studyPlanItem.findMany({ where: { planId, date: dateColumnFromLocalDate(today), status: "PENDING" }, select: { id: true } });
    await syncPlanProgress(db, userId, { now: tomorrow, timeZone: ZONE });
    if (untouched.length > 0) {
      const statuses = await db.studyPlanItem.findMany({ where: { id: { in: untouched.map((u) => u.id) } }, select: { status: true } });
      expect(statuses.every((s) => s.status === "MISSED")).toBe(true);
    }
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: lessonItem.id }, select: { status: true } })).toEqual({ status: "DONE" });
  });

  it("is credited by the flows themselves: a submitted diagnostic asks for a re-plan, a completed lesson ticks its item with its time", async () => {
    const { setup, userId, actor, today } = await student();
    await takeDiagnostic(actor, setup);
    const { planId } = await createPlan(actor, { availability: EVERY_DAY_60 });
    expect(await db.job.count({ where: { type: "studyplan.adapt", payload: { path: ["planId"], equals: planId } } })).toBe(0);

    // Another diagnostic after the plan exists: one studyplan.adapt job for the plan today (repeats collapse).
    await takeDiagnostic(actor, setup);
    await takeDiagnostic(actor, setup);
    const jobs = await db.job.findMany({ where: { type: "studyplan.adapt", dedupeKey: `plan:${planId}:${today}` }, select: { payload: true, status: true } });
    expect(jobs).toEqual([{ payload: { userId, planId }, status: "PENDING" }]);

    // Completing a planned lesson in the reader: the item is DONE (no manual sync) and carries the lesson's study time.
    const items = await planItems(planId);
    const lessonItem = items.find((i) => i.activityType === "LESSON" && i.lessonId && daysBetween(localDateFromDateColumn(i.date), addDays(today, 6)) >= 0);
    if (!lessonItem?.lessonId) throw new Error("expected a lesson in the first week");
    const t0 = new Date(Date.now() - 10 * 60_000);
    await markLessonProgress(actor, lessonItem.lessonId, { view: true }, { now: t0 });
    const done = await markLessonProgress(actor, lessonItem.lessonId, { secondsSpent: 30, completed: true }, { now: new Date(t0.getTime() + 30_000) });
    expect(done.newlyCompleted).toBe(true);
    expect(done.timeSpentSeconds).toBeGreaterThan(0);
    expect(await db.studyPlanItem.findUniqueOrThrow({ where: { id: lessonItem.id }, select: { status: true, completedSeconds: true } })).toEqual({
      status: "DONE",
      completedSeconds: done.timeSpentSeconds,
    });
  });

  it("does nothing for a student without a plan", async () => {
    const { userId } = await student();
    expect(await recordPlanActivity(db, { userId })).toBe(0);
  });
});
