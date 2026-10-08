import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { resetEnvCache } from "@/server/lib/env";
import {
  correctResponse,
  createAssessment,
  createLearner,
  createLearningSetup,
  type Learner,
  type LearningSetup,
} from "../../../tests/factories/index";
import { createQuestion, type CreatedQuestion } from "../../../tests/factories/questions";
import { createAttemptAiMarkingHandler } from "./ai-marking";
import { AI_MARK_JOB } from "./effects";
import { answerAndMark, getAttemptForStudent, recordSelfAssessment, saveResponse, startAttempt, submitAttempt } from "./index";
import { SELF_MARK_NOTE } from "./policy";
import { aiMarkingAvailableFor } from "./self-assess";

// Owner decision 2026-10-07: AI switched off (`features.ai`). Served from this object, never written to the shared DB.
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Open answers while AI is switched off (docs/ARCHITECTURE.md §3.14, §6.5): routed at answer time, so NO `ai.mark` job
 * is ever queued; the student's own written work waits for self-assessment against the mark scheme, everything else
 * goes to the teacher / reviewer queue. The flag wins even on a server with an API key, and a leftover job never
 * reaches the model.
 */

let setup: LearningSetup;
let essay: CreatedQuestion;
let calculation: CreatedQuestion;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 1 });
  const context = { subjectId: setup.subjectId, syllabusId: setup.syllabusId, topicIds: setup.leafTopicIds };
  const topicId = setup.leafTopicIds[0] as string;
  [essay, calculation] = await Promise.all([
    createQuestion("ESSAY", { context, topicId, accessTier: "FREE" }),
    createQuestion("CALCULATION", { context, topicId, accessTier: "FREE" }),
  ]);
});

afterEach(() => {
  featureFlags.ai = false;
  vi.unstubAllEnvs();
  resetEnvCache();
});

/** A server WITH an Anthropic key: only the platform flag keeps AI off. */
function withApiKey(): void {
  vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-test-not-real");
  resetEnvCache();
}

async function aiMarkJobs(attemptId: string): Promise<number> {
  return db.job.count({ where: { type: AI_MARK_JOB, dedupeKey: { startsWith: `mark:${attemptId}:` } } });
}

const ESSAY_TEXT = "Solar power is clean and cheap to run, but batteries are expensive for rural clinics.";
const CALCULATION_RESPONSE = { type: "CALCULATION", value: "50", unit: "km/h", working: "150 / 3" };

async function submittedMock(learner: Learner) {
  const mcq = setup.questions[0];
  if (!mcq) throw new Error("fixture MCQ missing");
  const mock = await createAssessment({
    subjectId: setup.subjectId,
    syllabusId: setup.syllabusId,
    kind: "MOCK_EXAM",
    title: "AI switched off mock",
    timeLimitSeconds: 3600,
    sections: [{ questionIds: [mcq.id, essay.id, calculation.id] }],
  });
  const { attempt } = await startAttempt(learner.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
  const positions = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
  await saveResponse(learner.actor, attempt.id, positions.get(mcq.id) as number, correctResponse(mcq.definition));
  await saveResponse(learner.actor, attempt.id, positions.get(essay.id) as number, { type: "ESSAY", text: ESSAY_TEXT });
  await saveResponse(learner.actor, attempt.id, positions.get(calculation.id) as number, CALCULATION_RESPONSE);
  const result = await submitAttempt(learner.actor, attempt.id);
  return { attemptId: attempt.id, essayPosition: positions.get(essay.id) as number, calcPosition: positions.get(calculation.id) as number, result };
}

describe("open answers while AI is switched off", () => {
  it("practice: an essay waits for the student's own mark and queues no ai.mark job, even with an API key", async () => {
    withApiKey();
    const learner = await createLearner();
    expect(await aiMarkingAvailableFor(learner.userId)).toBe(false);

    const { attempt } = await startAttempt(learner.actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 3 });
    const slot = attempt.questions.find((q) => q.question?.id === essay.id);
    if (!slot) throw new Error("expected the essay in the session");
    const feedback = await answerAndMark(learner.actor, attempt.id, slot.position, { type: "ESSAY", text: ESSAY_TEXT });
    expect(feedback).toMatchObject({ status: "PENDING", selfAssessable: true, marksAwarded: null });
    expect(feedback.notes[0]).toBe(SELF_MARK_NOTE);
    expect(feedback.notes.join(" ")).not.toMatch(/shortly/);
    expect(await aiMarkJobs(attempt.id)).toBe(0);

    const decision = await recordSelfAssessment(learner.actor, attempt.id, slot.position, { pointIds: ["P1"] });
    expect(decision).toMatchObject({ markingStatus: "SELF_ASSESSED" });
    expect(await aiMarkJobs(attempt.id)).toBe(0);
  });

  it("mock exam: the essay waits for self-assessment, the calculation goes straight to the teacher queue, nothing is queued", async () => {
    withApiKey();
    const learner = await createLearner();
    const { attemptId, essayPosition, calcPosition, result } = await submittedMock(learner);
    expect(result.status).toBe("AWAITING_MARKING");
    expect(await aiMarkJobs(attemptId)).toBe(0);

    const slots = new Map((await db.questionAttempt.findMany({ where: { attemptId } })).map((slot) => [slot.position, slot]));
    expect(slots.get(essayPosition)).toMatchObject({ markingStatus: "PENDING", marksAwarded: null });
    expect(slots.get(essayPosition)?.markedAt).not.toBeNull();
    expect(slots.get(calcPosition)).toMatchObject({ markingStatus: "NEEDS_REVIEW" });
    expect(slots.get(calcPosition)?.marksAwarded).not.toBeNull();

    const view = await getAttemptForStudent(learner.actor, attemptId);
    expect(view.questions.find((q) => q.position === essayPosition)?.result).toMatchObject({ status: "PENDING", selfAssessable: true });
    expect(view.questions.find((q) => q.position === calcPosition)?.result?.selfAssessable).toBe(false);

    // Once the student has marked the essay nothing waits for marking: the score is final, the calculation stays in review.
    const decision = await recordSelfAssessment(learner.actor, attemptId, essayPosition, { pointIds: ["P1", "P2"] });
    expect(decision).toMatchObject({ markingStatus: "SELF_ASSESSED", attemptStatus: "MARKED", pendingReviewCount: 1 });
    expect(await aiMarkJobs(attemptId)).toBe(0);
  });

  it("switching AI back on restores AI marking: the same submission queues ai.mark jobs again", async () => {
    featureFlags.ai = true;
    withApiKey();
    const learner = await createLearner();
    expect(await aiMarkingAvailableFor(learner.userId)).toBe(true);
    const { attemptId, essayPosition, calcPosition } = await submittedMock(learner);
    expect(await aiMarkJobs(attemptId)).toBe(2);
    const slots = new Map((await db.questionAttempt.findMany({ where: { attemptId } })).map((slot) => [slot.position, slot]));
    expect(slots.get(essayPosition)?.markingStatus).toBe("PENDING");
    expect(slots.get(calcPosition)?.markingStatus).toBe("PENDING");
  });

  it("a leftover ai.mark job from before the switch never reaches the model: its answers are routed without AI", async () => {
    // Queued while AI was on...
    featureFlags.ai = true;
    const learner = await createLearner();
    const { attemptId, essayPosition, calcPosition } = await submittedMock(learner);
    const jobs = await db.job.findMany({ where: { type: AI_MARK_JOB, dedupeKey: { startsWith: `mark:${attemptId}:` } }, select: { payload: true } });
    expect(jobs).toHaveLength(2);

    // ...and run by the worker after the switch, through the PRODUCTION gateway (flag checked before anything else).
    featureFlags.ai = false;
    withApiKey();
    const silent = { child: () => silent, debug: () => undefined, info: () => undefined, warn: () => undefined, error: () => undefined };
    const handler = createAttemptAiMarkingHandler();
    for (const job of jobs) {
      const summary = await handler(job.payload, { signal: new AbortController().signal, logger: silent as never });
      expect(summary).toMatchObject({ aiMarked: 0, selfAssessment: 1, failed: [] });
    }

    // No metering (no model call was made) and the same routing as at answer time.
    expect(await db.aiUsageDaily.count({ where: { userId: learner.userId } })).toBe(0);
    const slots = new Map((await db.questionAttempt.findMany({ where: { attemptId } })).map((slot) => [slot.position, slot]));
    expect(slots.get(essayPosition)).toMatchObject({ markingStatus: "PENDING", marksAwarded: null });
    expect(slots.get(calcPosition)).toMatchObject({ markingStatus: "NEEDS_REVIEW" });
    expect(await db.notification.count({ where: { userId: learner.userId, dedupeKey: `self-assess:${attemptId}` } })).toBe(1);
  });
});
