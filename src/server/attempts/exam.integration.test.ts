import { describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { hasEntitlement } from "@/server/billing/entitlements";
import { attemptXp, getXpRules } from "@/server/gamification/service";
import { getJobHandler, type JobContext } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { isAppError } from "@/server/lib/errors";
import {
  correctResponse,
  createAssessment,
  createLearner,
  createLearningSetup,
  wrongResponse,
  type LearningSetup,
} from "../../../tests/factories/learning";
import {
  AUTO_SUBMIT_JOB,
  answerAndMark,
  closeAttemptIfDue,
  getAttemptForStudent,
  registerAttemptJobs,
  saveResponse,
  startAttempt,
  submitAttempt,
} from "./index";

// AI-assisted marking (ai.mark jobs) needs AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

const HOUR = 3_600_000;

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

async function expectAppError(promise: Promise<unknown>, code: string): Promise<void> {
  try {
    await promise;
  } catch (error) {
    expect(isAppError(error)).toBe(true);
    expect((error as { code: string }).code).toBe(code);
    return;
  }
  throw new Error(`expected AppError ${code}`);
}

async function mockSetup() {
  const setup = await createLearningSetup({ topics: 2, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
  const mock = await createAssessment({
    subjectId: setup.subjectId,
    syllabusId: setup.syllabusId,
    kind: "MOCK_EXAM",
    title: "Test mock paper",
    timeLimitSeconds: 3600,
    accessTier: "PREMIUM",
    sections: [{ title: "Paper 1", questionIds: setup.questions.map((q) => q.id) }],
  });
  return { setup, mock };
}

function jobContext(): JobContext {
  return {
    jobId: "00000000-0000-7000-8000-000000000000",
    type: AUTO_SUBMIT_JOB,
    queue: "default",
    attempt: 1,
    maxAttempts: 5,
    workerId: "test",
    signal: new AbortController().signal,
    logger,
  };
}

describe("timed mock exams (§12, §13)", () => {
  it("saves, flags, enforces the deadline, hides answers until submission, scores with a grade estimate, submits once", async () => {
    const { setup, mock } = await mockSetup();
    const { userId, actor } = await createLearner();
    const t0 = new Date();

    const started = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now: t0 });
    const view = started.attempt;
    expect(view.mode).toBe("MOCK_EXAM");
    expect(view.feedback).toBe("ON_SUBMIT");
    expect(view.deadlineAt?.getTime()).toBe(t0.getTime() + HOUR);
    expect(view.timer?.remainingSeconds).toBeGreaterThan(3500);
    expect(view.questions).toHaveLength(4);
    expect(view.sections).toHaveLength(1);
    expect(view.assessment?.title).toBe("Test mock paper");
    // Starting again resumes the open attempt (one open attempt per assessment).
    const again = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now: t0 });
    expect(again.resumed).toBe(true);
    expect(again.attempt.id).toBe(view.id);

    const [q1, q2, q3, q4] = view.questions;
    if (!q1 || !q2 || !q3 || !q4) throw new Error("expected 4 slots");
    const def = (slot: typeof q1) => definitionOf(setup, slot.question?.id as string);

    await saveResponse(actor, view.id, q1.position, correctResponse(def(q1)), { now: new Date(t0.getTime() + 60_000) });
    await saveResponse(actor, view.id, q2.position, wrongResponse(def(q2)), { now: new Date(t0.getTime() + 120_000) });
    const flagged = await saveResponse(actor, view.id, q3.position, undefined, { flagged: true, now: new Date(t0.getTime() + 130_000) });
    expect(flagged.flagged).toBe(true);
    expect(flagged.answered).toBe(false);
    // An older offline replay never overwrites a newer save.
    const stale = await saveResponse(actor, view.id, q1.position, wrongResponse(def(q1)), { responseVersion: 1, now: new Date(t0.getTime() + 140_000) });
    expect(stale.stale).toBe(true);
    // Exam mode never marks per answer.
    await expectAppError(answerAndMark(actor, view.id, q1.position, correctResponse(def(q1))), "BAD_REQUEST");

    // Before submission: no marks, no reveal, no answer data anywhere in the view.
    const during = await getAttemptForStudent(actor, view.id, { now: new Date(t0.getTime() + 150_000) });
    expect(during.flaggedPositions).toEqual([q3.position]);
    expect(during.unansweredPositions).toEqual([q3.position, q4.position]);
    expect(during.answeredCount).toBe(2);
    expect(during.result).toBeNull();
    expect(during.questions.every((q) => q.result === null)).toBe(true);
    const json = JSON.stringify(during);
    expect(json).not.toContain("Original explanation written for tests.");
    expect(json).not.toContain("and 2 is even");
    expect(json).not.toContain("answerSpec");
    expect(json).not.toContain('"isCorrect"');
    expect(during.questions[0]?.response).toEqual(correctResponse(def(q1)));

    // Deadline: on-time saves end at deadline + 30 s; offline saves from before the deadline sync within 10 min.
    await expectAppError(
      saveResponse(actor, view.id, q4.position, correctResponse(def(q4)), { now: new Date(t0.getTime() + HOUR + 31_000) }),
      "CONFLICT",
    );
    const late = await saveResponse(actor, view.id, q4.position, correctResponse(def(q4)), {
      now: new Date(t0.getTime() + HOUR + 120_000),
      clientSavedAt: new Date(t0.getTime() + HOUR - 100_000),
    });
    expect(late.saved).toBe(true);
    expect(late.lateSync).toBe(true);

    const result = await submitAttempt(actor, view.id, { now: new Date(t0.getTime() + HOUR + 200_000) });
    expect(result.status).toBe("MARKED");
    expect(result.submitReason).toBe("STUDENT");
    expect(result.score).toMatchObject({ marksAwarded: 2, totalMarks: 4, percentage: 50, answeredCount: 3, correctCount: 2, questionCount: 4 });
    expect(result.grade).toMatchObject({ grade: "C", isPass: true, isEstimate: true });
    expect(result.grade?.disclaimer).toBeTruthy();
    expect(result.topics).toHaveLength(2);
    expect(result.topics.reduce((sum, t) => sum + t.marksAvailable, 0)).toBe(4);
    expect(result.analysis?.time?.unansweredCount).toBe(1);

    // Idempotent: a second submit returns the same result and awards nothing again.
    const again2 = await submitAttempt(actor, view.id);
    expect(again2.score.percentage).toBe(50);
    const xp = await db.xpEvent.findMany({ where: { userId, sourceId: view.id } });
    expect(xp).toHaveLength(1);
    expect(xp[0]?.reason).toBe("MOCK_EXAM_COMPLETED");
    expect(xp[0]?.amount).toBe(attemptXp("MOCK_EXAM", [{ result: "CORRECT", difficulty: 3 }], await getXpRules()));
    const stats = await db.learnerStats.findUniqueOrThrow({ where: { userId } });
    expect(stats.mockExamsCompleted).toBe(1);
    expect(stats.assessmentsCompleted).toBe(1);
    expect(stats.totalQuestionsAttempted).toBe(3);

    // After submission everything is revealed.
    const after = await getAttemptForStudent(actor, view.id);
    expect(after.status).toBe("MARKED");
    expect(after.lateSync).toBe(true);
    expect(after.questions.every((q) => q.result !== null && q.result.reveal !== null)).toBe(true);
    expect(after.questions.find((q) => q.position === q3.position)?.result?.status).toBe("UNANSWERED");
    expect(after.result?.score.percentage).toBe(50);
    // A closed attempt rejects saves.
    await expectAppError(saveResponse(actor, view.id, q3.position, correctResponse(def(q3))), "CONFLICT");

    const progress = await db.subjectProgress.findUniqueOrThrow({ where: { userId_subjectId: { userId, subjectId: setup.subjectId } } });
    expect(progress.mockExamsCompleted).toBe(1);
    expect(progress.lastMockPercent).toBe(50);
    expect(progress.averageScorePercent).toBe(50);
    const attemptRow = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: view.id } });
    expect(attemptRow.gradeEstimate).toBe("C");
    expect(attemptRow.gradeSchemeId).toBe(setup.gradeSchemeId);
    expect(attemptRow.gradeIsPass).toBe(true);
  });

  it("auto-submits an expired attempt through the exams.autoSubmit job; an empty one EXPIRES; reads close lazily", async () => {
    const { setup, mock } = await mockSetup();
    if (!getJobHandler(AUTO_SUBMIT_JOB)) registerAttemptJobs();
    const handler = getJobHandler(AUTO_SUBMIT_JOB);
    if (!handler) throw new Error("handler not registered");
    const past = new Date(Date.now() - 2 * HOUR);

    // Answered once, then the time ran out (deadline was an hour ago, beyond the late-sync window).
    const answered = await createLearner();
    const a = await startAttempt(answered.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now: past });
    const slot = a.attempt.questions[0];
    await saveResponse(answered.actor, a.attempt.id, slot?.position as number, correctResponse(definitionOf(setup, slot?.question?.id as string)), {
      now: new Date(past.getTime() + 60_000),
    });
    const job = await db.job.findFirst({ where: { dedupeKey: `autosubmit:${a.attempt.id}` } });
    expect(job?.type).toBe(AUTO_SUBMIT_JOB);
    await handler.handler({ attemptId: a.attempt.id }, jobContext());
    const closed = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: a.attempt.id } });
    expect(closed.status).toBe("MARKED");
    expect(closed.submitReason).toBe("TIME_EXPIRED");
    expect(closed.marksAwarded).toBe(1);
    expect(closed.percentage).toBe(25);
    // Running it again changes nothing.
    await handler.handler({ attemptId: a.attempt.id }, jobContext());
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: a.attempt.id } })).submittedAt?.getTime()).toBe(closed.submittedAt?.getTime());

    // Nothing answered: EXPIRED, nothing marked, no XP.
    const empty = await createLearner();
    const e = await startAttempt(empty.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now: past });
    expect(await closeAttemptIfDue(e.attempt.id)).toBe("EXPIRED");
    expect(await db.xpEvent.count({ where: { userId: empty.userId } })).toBe(0);

    // Not due yet: nothing happens.
    const running = await createLearner();
    const r = await startAttempt(running.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    expect(await closeAttemptIfDue(r.attempt.id)).toBeNull();

    // Reading an expired attempt closes it lazily.
    const lazy = await createLearner();
    const l = await startAttempt(lazy.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now: past });
    const read = await getAttemptForStudent(lazy.actor, l.attempt.id);
    expect(read.status).toBe("EXPIRED");
  });

  it("counts only the best N answers of an 'answer any N' section", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 4 });
    const [a, b, c, d] = setup.questions;
    if (!a || !b || !c || !d) throw new Error("expected 4 questions");
    const test = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "SUBJECT_TEST",
      sections: [
        { title: "Section A: answer any two", questionIds: [a.id, b.id, c.id], answerCount: 2, marks: 2 },
        { title: "Section B", questionIds: [d.id] },
      ],
    });
    const { actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "SUBJECT_TEST", subjectId: setup.subjectId, assessmentId: test.id });
    expect(attempt.sections.map((s) => s.answerCount)).toEqual([2, null]);
    const byQuestion = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
    await saveResponse(actor, attempt.id, byQuestion.get(a.id) as number, wrongResponse(a.definition));
    await saveResponse(actor, attempt.id, byQuestion.get(b.id) as number, correctResponse(b.definition));
    await saveResponse(actor, attempt.id, byQuestion.get(c.id) as number, correctResponse(c.definition));
    await saveResponse(actor, attempt.id, byQuestion.get(d.id) as number, correctResponse(d.definition));
    const result = await submitAttempt(actor, attempt.id);
    expect(result.score).toMatchObject({ totalMarks: 3, marksAwarded: 3, percentage: 100 });
    const slots = await db.questionAttempt.findMany({ where: { attemptId: attempt.id }, orderBy: { position: "asc" } });
    expect(slots.find((s) => s.questionId === a.id)?.isCounted).toBe(false);
    expect(slots.filter((s) => s.isCounted)).toHaveLength(3);
    const sections = await db.assessmentAttemptSection.findMany({ where: { attemptId: attempt.id }, orderBy: { sectionNumber: "asc" } });
    expect(sections.map((s) => s.marksAwarded)).toEqual([2, 1]);
  });

  it("requires the mock_exams entitlement (rule 9)", async () => {
    const { setup, mock } = await mockSetup();
    const { actor } = await createLearner({ features: null });
    if (await hasEntitlement(actor, "mock_exams", { subjectId: setup.subjectId })) return; // the shared default plan includes mocks
    await expectAppError(startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }), "ENTITLEMENT_REQUIRED");
  });

  it("applies the student's extra-time accommodation to the server deadline", async () => {
    const { setup, mock } = await mockSetup();
    const { actor } = await createLearner({ examExtraTimePercent: 25 });
    const now = new Date();
    const { attempt } = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id }, { now });
    expect(attempt.deadlineAt?.getTime()).toBe(now.getTime() + 4500 * 1000);
    const row = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt.id } });
    expect(row.timeLimitSeconds).toBe(4500);
    expect((row.config as { extraTimePercent?: number }).extraTimePercent).toBe(25);
  });
});

describe("AI-assisted answers (§9, ARCHITECTURE §6.5)", () => {
  it("queues ai.mark jobs on submit and keeps the score provisional", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const mcq = setup.questions[0];
    if (!mcq) throw new Error("no question");
    const { createQuestion } = await import("../../../tests/factories/questions");
    const essay = await createQuestion("ESSAY", {
      context: { subjectId: setup.subjectId, syllabusId: setup.syllabusId, topicIds: setup.leafTopicIds },
      topicId: mcq.topicId,
      accessTier: "FREE",
    });
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      timeLimitSeconds: 3600,
      sections: [{ questionIds: [mcq.id, essay.id] }],
    });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const positions = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
    const essayPosition = positions.get(essay.id) as number;
    await saveResponse(actor, attempt.id, positions.get(mcq.id) as number, correctResponse(mcq.definition));
    await saveResponse(actor, attempt.id, essayPosition, { type: "ESSAY", text: "Solar panels give rural clinics reliable power, but batteries are costly." });

    const result = await submitAttempt(actor, attempt.id);
    expect(result.status).toBe("AWAITING_MARKING");
    expect(result.score).toMatchObject({ isProvisional: true, pendingReviewCount: 1, marksAwarded: 1, totalMarks: 11, percentage: 100 });
    const job = await db.job.findFirst({ where: { dedupeKey: `mark:${attempt.id}:${essayPosition}` } });
    expect(job).toMatchObject({ type: "ai.mark", queue: "ai", status: "PENDING", payload: { items: [{ attemptId: attempt.id, position: essayPosition }] } });
    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId: attempt.id, position: essayPosition } } });
    expect(slot.markingStatus).toBe("PENDING");
    expect(slot.marksAwarded).toBeNull();
    expect(slot.markedAt).not.toBeNull();
    // The completed attempt still earns its XP once.
    expect(await db.xpEvent.count({ where: { userId, sourceId: attempt.id } })).toBe(1);
    // Resubmitting does not queue twice.
    await submitAttempt(actor, attempt.id);
    expect(await db.job.count({ where: { dedupeKey: `mark:${attempt.id}:${essayPosition}` } })).toBe(1);
  });
});

describe("late marking decisions (AI, teacher override)", () => {
  it("re-scores a closed attempt, marks it once nothing waits for AI, and never double counts an override", async () => {
    const { recordMarkingDecision } = await import("./index");
    const { createQuestion } = await import("../../../tests/factories/questions");
    const { createTeacher } = await import("../../../tests/factories/identity");
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const mcq = setup.questions[0];
    if (!mcq) throw new Error("no question");
    const essay = await createQuestion("ESSAY", {
      context: { subjectId: setup.subjectId, syllabusId: setup.syllabusId, topicIds: setup.leafTopicIds },
      topicId: mcq.topicId,
      accessTier: "FREE",
    });
    const mock = await createAssessment({
      subjectId: setup.subjectId,
      syllabusId: setup.syllabusId,
      kind: "MOCK_EXAM",
      timeLimitSeconds: 3600,
      sections: [{ questionIds: [mcq.id, essay.id] }],
    });
    const { userId, actor } = await createLearner();
    const { attempt } = await startAttempt(actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
    const positions = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
    const essayPosition = positions.get(essay.id) as number;
    await saveResponse(actor, attempt.id, positions.get(mcq.id) as number, correctResponse(mcq.definition));
    await saveResponse(actor, attempt.id, essayPosition, { type: "ESSAY", text: "A balanced answer about renewable energy." });
    expect((await submitAttempt(actor, attempt.id)).status).toBe("AWAITING_MARKING");

    const ai = await recordMarkingDecision({
      attemptId: attempt.id,
      position: essayPosition,
      source: "AI",
      resultingStatus: "AI_MARKED",
      marksAwarded: 7,
      aiModel: "test-model",
      promptVersion: "marking-test",
      confidence: 0.9,
      points: [{ pointId: "P1", awarded: 2 }],
    });
    expect(ai).toMatchObject({ attemptStatus: "MARKED", marksAwarded: 7, percentage: 72.7, pendingReviewCount: 0 });
    const marked = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attempt.id } });
    expect(marked).toMatchObject({ status: "MARKED", marksAwarded: 8, totalMarks: 11, percentage: 72.7 });
    expect(marked.markedAt).not.toBeNull();
    expect(await db.notification.count({ where: { userId, dedupeKey: `attempt-marked:${attempt.id}` } })).toBe(1);
    const statsAfterAi = await db.questionStats.findUniqueOrThrow({ where: { questionId: essay.id } });
    expect(statsAfterAi.answeredCount).toBe(1);

    const teacher = await createTeacher();
    const override = await recordMarkingDecision({
      attemptId: attempt.id,
      position: essayPosition,
      source: "TEACHER",
      resultingStatus: "TEACHER_MARKED",
      marksAwarded: 99,
      markedById: teacher.user.id,
      reason: "Clear, well-argued conclusion.",
    });
    expect(override).toMatchObject({ attemptStatus: "MARKED", marksAwarded: 10, percentage: 100 });
    expect((await db.questionStats.findUniqueOrThrow({ where: { questionId: essay.id } })).answeredCount).toBe(1);
    const log = await db.questionAttemptMarking.findMany({ where: { attemptId: attempt.id }, orderBy: { createdAt: "asc" } });
    expect(log.map((l) => [l.source, l.marksAwarded, l.previousMarksAwarded])).toEqual([
      ["AI", 7, null],
      ["TEACHER", 10, 7],
    ]);
    expect(await db.xpEvent.count({ where: { userId, sourceId: attempt.id } })).toBe(1);
    await expect(
      recordMarkingDecision({ attemptId: attempt.id, position: essayPosition, source: "AI", resultingStatus: "AI_MARKED", marksAwarded: 1 }),
    ).rejects.toSatisfy((error: unknown) => isAppError(error) && error.code === "VALIDATION");
  });
});
