import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { LearnerActor } from "@/server/attempts";
import {
  correctResponse,
  createEnrollment,
  createLearner,
  createLearningSetup,
  wrongResponse,
  type LearningSetup,
} from "../../../../tests/factories/learning";

/**
 * Integration: a practice session through the Server Actions (start → hint → answer every question → summary), the
 * daily question, ending early and the self-assessment fallback, against the test database. The auth guard is
 * mocked to "sign in" a fixture learner; everything below it (practice service, attempt engine, marking, mastery,
 * XP) is real.
 */

class RedirectSignal extends Error {
  constructor(readonly location: string) {
    super(`NEXT_REDIRECT ${location}`);
  }
}

const auth = vi.hoisted(() => ({ actor: null as LearnerActor | null }));

vi.mock("@/server/auth/guards", () => ({
  requireOnboardedStudentForAction: async () => {
    if (!auth.actor) throw new (await import("@/server/lib/errors")).AppError("UNAUTHENTICATED");
    return auth.actor;
  },
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  redirect: (location: string) => {
    throw new RedirectSignal(location);
  },
}));

const actions = await import("./actions");
const dailyActions = await import("../daily/actions");
const { aiMarkingAvailable, getPracticeSummary, getSessionState, getDailyOverview } = await import("@/server/practice");
const { db } = await import("@/server/db");

async function redirectOf(promise: Promise<unknown>): Promise<string> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof RedirectSignal) return error.location;
    throw error;
  }
  throw new Error("expected a redirect");
}

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

async function signedInLearner(setup: LearningSetup) {
  const learner = await createLearner();
  await createEnrollment(learner.userId, setup);
  auth.actor = learner.actor;
  return learner;
}

beforeEach(() => {
  auth.actor = null;
});

describe("practice Server Actions", () => {
  it("start → hint → answer each question → summary", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 2, questionsPerLeaf: 2 });
    const learner = await signedInLearner(setup);
    const idempotencyKey = `k-${randomUUID()}`;

    const started = await actions.startPracticeAction({ subjectId: setup.subjectId, count: 3, difficulty: "ADAPTIVE", idempotencyKey });
    if (!started.ok) throw new Error(started.error.message);
    expect(started.data.questionCount).toBe(3);
    expect(started.data.resumed).toBe(false);

    // A double tap resumes the same session.
    const again = await actions.startPracticeAction({ subjectId: setup.subjectId, count: 3, idempotencyKey });
    expect(again.ok && again.data.attemptId).toBe(started.data.attemptId);
    expect(again.ok && again.data.resumed).toBe(true);

    const attemptId = started.data.attemptId;
    let state = await getSessionState(learner.actor, attemptId);
    expect(state.isOpen).toBe(true);
    expect(state.current?.position).toBe(1);
    // The presented question carries no answer data.
    const presentedJson = JSON.stringify(state.current?.question);
    expect(presentedJson).not.toContain("isCorrect");
    expect(presentedJson).not.toContain("Original explanation");

    const hint = await actions.revealHintAction({ attemptId, position: 1 });
    expect(hint.ok && hint.data.html).toContain("Original hint");

    const outcomes: string[] = [];
    let lastAnswer = null as Awaited<ReturnType<typeof actions.answerQuestionAction>> | null;
    for (let position = 1; position <= 3; position += 1) {
      state = await getSessionState(learner.actor, attemptId);
      const current = state.current;
      if (!current?.question) throw new Error("no current question");
      expect(current.position).toBe(position);
      const definition = definitionOf(setup, current.question.id);
      const response = position === 2 ? wrongResponse(definition) : correctResponse(definition);
      lastAnswer = await actions.answerQuestionAction({
        attemptId,
        position,
        response: response as never,
        timeSpentSeconds: 12,
        hintsUsed: position === 1 ? 1 : 0,
      });
      if (!lastAnswer.ok) throw new Error(lastAnswer.error.message);
      outcomes.push(lastAnswer.data.outcome);
      expect(lastAnswer.data.reveal?.explanationHtml).toContain("Original explanation");
      expect(lastAnswer.data.topic?.name).toBeTruthy();
      expect(lastAnswer.data.mastery).not.toBeNull();
      expect(lastAnswer.data.studyLesson?.href).toMatch(/^\/app\/lessons\//);
    }
    expect(outcomes).toEqual(["correct", "incorrect", "correct"]);
    expect(lastAnswer?.ok && lastAnswer.data.attemptCompleted).toBe(true);

    // Answering again changes nothing (idempotent replay returns the stored mark).
    const replay = await actions.answerQuestionAction({ attemptId, position: 2, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] }, timeSpentSeconds: 1, hintsUsed: 0 });
    expect(replay.ok && replay.data.outcome).toBe("incorrect");

    const summary = await getPracticeSummary(learner.actor, attemptId);
    expect(summary.status).toBe("MARKED");
    expect(summary.result?.score).toMatchObject({ answeredCount: 3, correctCount: 2, questionCount: 3 });
    expect(summary.topics.length).toBeGreaterThan(0);
    expect(summary.topics.every((topic) => topic.mastery !== null)).toBe(true);
    const xp = await db.xpEvent.aggregate({ where: { userId: learner.userId, sourceId: attemptId }, _sum: { amount: true } });
    expect(summary.xpEarned).toBe(xp._sum.amount ?? null);
    expect(summary.review).toHaveLength(3);
    expect(summary.review.map((item) => item.feedback?.outcome)).toEqual(["correct", "incorrect", "correct"]);
    expect(summary.review[1]?.response).toEqual(expect.objectContaining({ type: "MULTIPLE_CHOICE" }));

    // The session page now has nothing left to answer.
    const closed = await getSessionState(learner.actor, attemptId);
    expect(closed.isOpen).toBe(false);
    expect(closed.current).toBeNull();
  });

  it("rejects malformed answers, other students, signed-out callers and subjects the student does not take", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 2 });
    const owner = await signedInLearner(setup);
    const started = await actions.startPracticeAction({ subjectId: setup.subjectId, count: 2 });
    if (!started.ok) throw new Error(started.error.message);
    const attemptId = started.data.attemptId;

    const malformed = await actions.answerQuestionAction({ attemptId, position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: "A" } as never, timeSpentSeconds: 1, hintsUsed: 0 });
    expect(malformed.ok ? null : malformed.error.code).toBe("VALIDATION");

    await signedInLearner(setup);
    const other = await actions.answerQuestionAction({ attemptId, position: 1, response: { type: "MULTIPLE_CHOICE", optionKeys: ["A"] }, timeSpentSeconds: 1, hintsUsed: 0 });
    expect(other.ok ? null : other.error.code).toBe("NOT_FOUND");

    auth.actor = null;
    const anonymous = await actions.startPracticeAction({ subjectId: setup.subjectId });
    expect(anonymous.ok ? null : anonymous.error.code).toBe("UNAUTHENTICATED");

    const elsewhere = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    auth.actor = owner.actor;
    const notEnrolled = await actions.startPracticeAction({ subjectId: elsewhere.subjectId });
    expect(notEnrolled.ok ? null : notEnrolled.error.code).toBe("VALIDATION");
    expect(notEnrolled.ok ? null : notEnrolled.error.fieldErrors?.subjectId?.[0]).toMatch(/Add this subject/);
  });

  it("ending a session early scores what was answered and opens the summary", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
    const learner = await signedInLearner(setup);
    const started = await actions.startPracticeAction({ subjectId: setup.subjectId, count: 3 });
    if (!started.ok) throw new Error(started.error.message);
    const attemptId = started.data.attemptId;
    const state = await getSessionState(learner.actor, attemptId);
    const question = state.current?.question;
    if (!question) throw new Error("no question");
    await actions.answerQuestionAction({ attemptId, position: 1, response: correctResponse(definitionOf(setup, question.id)) as never, timeSpentSeconds: 5, hintsUsed: 0 });

    expect(await redirectOf(actions.endPracticeSessionAction(null, form({ attemptId })))).toBe(`/app/practice/${attemptId}/summary`);
    const summary = await getPracticeSummary(learner.actor, attemptId);
    expect(summary.result?.score).toMatchObject({ answeredCount: 1, correctCount: 1, percentage: 100 });
    expect(summary.review.filter((item) => item.feedback?.outcome === "unanswered")).toHaveLength(2);

    const missing = await actions.endPracticeSessionAction(null, form({ attemptId: randomUUID() }));
    expect(missing?.ok ? null : missing?.error.code).toBe("NOT_FOUND");
  });

  it("self-assessment of an essay when AI marking is not configured", async () => {
    const setup = await createLearningSetup({ type: "ESSAY", topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const learner = await signedInLearner(setup);
    const started = await actions.startPracticeAction({ subjectId: setup.subjectId, count: 1 });
    if (!started.ok) throw new Error(started.error.message);
    const attemptId = started.data.attemptId;

    const answered = await actions.answerQuestionAction({
      attemptId,
      position: 1,
      response: { type: "ESSAY", text: "Solar panels give clinics power at night. They cost a lot at first." },
      timeSpentSeconds: 300,
      hintsUsed: 0,
    });
    if (!answered.ok) throw new Error(answered.error.message);
    expect(answered.data.outcome).toBe("pending");
    expect(answered.data.marksAwarded).toBeNull();
    expect(answered.data.reveal?.markScheme?.points).toHaveLength(3);

    if (aiMarkingAvailable()) {
      // With an API key the answer is AI-marked by the worker; self-marking is refused.
      expect(answered.data.selfAssessment).toBeNull();
      return;
    }
    expect(answered.data.selfAssessment?.maxMarks).toBe(10);
    // The server sums the ticked points itself (unknown ids are ignored; a claimed total is never trusted).
    const marked = await actions.selfAssessAction({ attemptId, position: 1, pointIds: ["P1", "P2", "NOPE"], marks: 10 });
    if (!marked.ok) throw new Error(marked.error.message);
    expect(marked.data).toMatchObject({ status: "SELF_ASSESSED", outcome: "partial", marksAwarded: 6, marksAvailable: 10, selfAssessment: null });

    const twice = await actions.selfAssessAction({ attemptId, position: 1, pointIds: ["P3"], marks: 0 });
    expect(twice.ok ? null : twice.error.code).toBe("CONFLICT");

    const summary = await getPracticeSummary(learner.actor, attemptId);
    expect(summary.status).toBe("MARKED");
    expect(summary.result?.score.percentage).toBe(60);
  });
});

describe("daily question actions", () => {
  it("opens today's question for a subject, then answers it with instant feedback", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    const learner = await signedInLearner(setup);
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    const { localDateString, dateColumnFromLocalDate } = await import("@/lib/dates");
    const today = localDateString(new Date(), "Africa/Harare");
    await db.dailyQuestion.create({
      data: { date: dateColumnFromLocalDate(today), qualificationId: setup.qualificationId, subjectId: setup.subjectId, questionId: question.id, isAutoSelected: false },
    });

    let overview = await getDailyOverview(learner.actor);
    const item = overview.items.find((i) => i.subject.id === setup.subjectId);
    expect(item?.dailyQuestionId).toBeTruthy();
    expect(item?.attempt).toBeNull();
    expect(item?.entitled).toBe(true);

    expect(await redirectOf(dailyActions.startDailyQuestionAction(null, form({ subjectId: setup.subjectId })))).toBe(
      `/app/daily?subjectId=${setup.subjectId}`,
    );
    overview = await getDailyOverview(learner.actor);
    const attemptId = overview.items.find((i) => i.subject.id === setup.subjectId)?.attempt?.id;
    if (!attemptId) throw new Error("no daily attempt");
    // Opening it again resumes the same attempt.
    await redirectOf(dailyActions.startDailyQuestionAction(null, form({ subjectId: setup.subjectId })));
    expect(await db.assessmentAttempt.count({ where: { userId: learner.userId, mode: "DAILY_QUESTION" } })).toBe(1);

    const answer = await actions.answerQuestionAction({ attemptId, position: 1, response: correctResponse(question.definition) as never, timeSpentSeconds: 20, hintsUsed: 0 });
    expect(answer.ok && answer.data).toMatchObject({ outcome: "correct", attemptCompleted: true });

    const state = await getSessionState(learner.actor, attemptId, { withLastAnswered: true });
    expect(state.current).toBeNull();
    expect(state.lastAnswered?.feedback).toMatchObject({ outcome: "correct", attemptCompleted: true });
  });

  it("a subject the student does not take cannot be opened", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
    await signedInLearner(setup);
    const result = await dailyActions.startDailyQuestionAction(null, form({ subjectId: randomUUID() }));
    expect(result?.ok ? null : result?.error.code).toBe("VALIDATION");
  });
});
