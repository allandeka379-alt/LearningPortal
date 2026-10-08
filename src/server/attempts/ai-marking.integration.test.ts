import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import type { GuardianConsentStatus } from "@/generated/prisma/client";
import { createAiGateway, type AiGateway } from "@/server/ai";
import { DEFAULT_AI_CONFIG, type AiConfig } from "@/server/ai/config";
import { MARKING_PROMPT_VERSION, MARKING_SYSTEM_PROMPT } from "@/server/ai/marking";
import { DbUsageMeter } from "@/server/ai/meter-db";
import { FakeTransport } from "@/server/ai/testing/fake-transport";
import { db } from "@/server/db";
import { resetEnvCache } from "@/server/lib/env";
import { getJobHandler } from "@/server/lib/jobs";
import {
  correctResponse,
  createAssessment,
  createLearner,
  createLearningSetup,
  UNLIMITED_LEARNING_FEATURES,
  type Learner,
  type LearningSetup,
} from "../../../tests/factories/index";
import { createQuestion, type CreatedQuestion } from "../../../tests/factories/questions";
import { createAttemptAiMarkingHandler, registerAiMarkingJobs } from "./ai-marking";
import { recordSelfAssessment, saveResponse, startAttempt, submitAttempt } from "./index";
import { aiMarkingAvailableFor } from "./self-assess";

// The ai.mark job is tested with AI switched on: `features.ai` is on for this file (never written to the shared DB).
const featureFlags = vi.hoisted(() => ({ ai: true, whatsapp: false, email: false, stripe: false }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * The `ai.mark` job end to end against the test database: attempt engine enqueues -> handler (this module's deps,
 * the real AI marking pipeline over a FAKE transport, real metering) -> marks saved -> attempt re-scored.
 */

function testConfig(): AiConfig {
  const config = structuredClone(DEFAULT_AI_CONFIG);
  // The shared test database accumulates spend from parallel files; the budget guard is tested in src/server/ai.
  config.budget.dailyCostCeilingMicros = null;
  return config;
}

function gatewayWith(transport: FakeTransport | null): AiGateway {
  return createAiGateway({ transport, config: testConfig(), meter: new DbUsageMeter() });
}

const silentLogger = { child: () => silentLogger, debug: () => undefined, info: () => undefined, warn: () => undefined, error: () => undefined };
const jobContext = () => ({ signal: new AbortController().signal, logger: silentLogger as never });

function markingReply(awards: { pointId: string; marks: number }[], confidence: number) {
  return {
    text: JSON.stringify({
      awards: awards.map((award) => ({ ...award, awarded: award.marks > 0, evidence: award.marks > 0 ? "clean energy" : "" })),
      totalMarks: 99, // ignored: the total is recomputed in code
      feedback: "Good definition. Add a disadvantage with a local example to earn more marks.",
      misconceptions: ["confuses energy with power"],
      confidence,
    }),
  };
}

async function jobPayload(attemptId: string, position: number): Promise<unknown> {
  const job = await db.job.findFirst({ where: { dedupeKey: `mark:${attemptId}:${position}` }, select: { type: true, queue: true, payload: true } });
  expect(job).toMatchObject({ type: "ai.mark", queue: "ai" });
  return job?.payload;
}

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

/** A closed mock with an MCQ (answered correctly) and the given open questions answered. */
async function submittedMock(learner: Learner, answers: { question: CreatedQuestion; response: unknown }[]) {
  const mcq = setup.questions[0];
  if (!mcq) throw new Error("fixture MCQ missing");
  const mock = await createAssessment({
    subjectId: setup.subjectId,
    syllabusId: setup.syllabusId,
    kind: "MOCK_EXAM",
    title: "AI marking mock",
    timeLimitSeconds: 3600,
    sections: [{ questionIds: [mcq.id, ...answers.map((answer) => answer.question.id)] }],
  });
  const { attempt } = await startAttempt(learner.actor, { mode: "MOCK_EXAM", subjectId: setup.subjectId, assessmentId: mock.id });
  const positions = new Map(attempt.questions.map((q) => [q.question?.id, q.position]));
  await saveResponse(learner.actor, attempt.id, positions.get(mcq.id) as number, correctResponse(mcq.definition));
  for (const answer of answers) await saveResponse(learner.actor, attempt.id, positions.get(answer.question.id) as number, answer.response);
  const result = await submitAttempt(learner.actor, attempt.id);
  return { attemptId: attempt.id, positions, result };
}

const ESSAY_TEXT = "Renewable energy comes from sources that are replenished naturally. Solar panels give rural clinics clean energy.";

describe("ai.mark job (ARCHITECTURE §6.5)", () => {
  it("AI-marks a submitted essay, records the decision and re-scores the attempt", async () => {
    const learner = await createLearner({ features: { ...UNLIMITED_LEARNING_FEATURES, aiMaxModelTier: "DEEP" } });
    const { attemptId, positions, result } = await submittedMock(learner, [{ question: essay, response: { type: "ESSAY", text: ESSAY_TEXT } }]);
    expect(result.status).toBe("AWAITING_MARKING");
    const position = positions.get(essay.id) as number;

    const transport = new FakeTransport().enqueue(markingReply([{ pointId: "P1", marks: 2 }, { pointId: "P2", marks: 3 }, { pointId: "P3", marks: 2 }], 0.92));
    const handler = createAttemptAiMarkingHandler({ gateway: gatewayWith(transport) });
    const summary = await handler(await jobPayload(attemptId, position), jobContext());
    expect(summary).toMatchObject({ requested: 1, loaded: 1, aiMarked: 1, needsReview: 0, selfAssessment: 0, failed: [] });

    // The model saw OUR mark scheme and the answer from the revision the student saw, on the essay route (DEEP plan).
    const request = transport.lastRequest;
    expect(request?.params.model).toBe(DEFAULT_AI_CONFIG.routing.tiers.DEEP.model);
    const prompt = JSON.stringify(request?.params.messages);
    expect(prompt).toContain("pointId: P2 (4 marks)");
    expect(prompt).toContain("Solar panels give rural clinics clean energy.");
    expect(JSON.stringify(request?.params.system)).toContain(MARKING_SYSTEM_PROMPT.slice(0, 60));

    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position } } });
    expect(slot).toMatchObject({ markingStatus: "AI_MARKED", marksAwarded: 7, isCorrect: false });
    expect(slot.feedback).toMatchObject({ aiMarked: true, comment: expect.stringContaining("Good definition"), misconceptions: ["confuses energy with power"] });
    const marking = await db.questionAttemptMarking.findFirstOrThrow({ where: { attemptId, position } });
    expect(marking).toMatchObject({ source: "AI", resultingStatus: "AI_MARKED", marksAwarded: 7, promptVersion: MARKING_PROMPT_VERSION, confidence: 0.92 });
    expect(marking.aiModel).toBeTruthy();
    expect(marking.points).toEqual([
      { pointId: "P1", awarded: 2, evidence: "clean energy" },
      { pointId: "P2", awarded: 3, evidence: "clean energy" },
      { pointId: "P3", awarded: 2, evidence: "clean energy" },
    ]);

    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    expect(attempt).toMatchObject({ status: "MARKED", marksAwarded: 8, totalMarks: 11, pendingReviewCount: 0 });
    expect(await db.notification.count({ where: { userId: learner.userId, dedupeKey: `attempt-marked:${attemptId}` } })).toBe(1);
    // Marking is metered under MARKING: one unit of the student's daily marking allowance (AI-04).
    const usage = await db.aiUsageDaily.findFirst({ where: { userId: learner.userId, feature: "MARKING" } });
    expect(usage?.outputTokens).toBeGreaterThan(0);
    expect(usage).toMatchObject({ requests: 1, reservedRequests: 0 });

    // A retry of the same job is a no-op: the answer is no longer PENDING.
    const again = await handler(await jobPayload(attemptId, position), jobContext());
    expect(again).toMatchObject({ loaded: 0, aiMarked: 0 });
    expect(transport.calls).toHaveLength(1);
  });

  it("sends a low-confidence mark to review with a provisional score", async () => {
    const learner = await createLearner();
    const { attemptId, positions } = await submittedMock(learner, [{ question: essay, response: { type: "ESSAY", text: ESSAY_TEXT } }]);
    const position = positions.get(essay.id) as number;
    const transport = new FakeTransport().enqueue(markingReply([{ pointId: "P1", marks: 2 }, { pointId: "P2", marks: 1 }, { pointId: "P3", marks: 0 }], 0.4));
    const summary = await createAttemptAiMarkingHandler({ gateway: gatewayWith(transport) })(await jobPayload(attemptId, position), jobContext());
    expect(summary).toMatchObject({ aiMarked: 0, needsReview: 1 });

    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position } } });
    expect(slot).toMatchObject({ markingStatus: "NEEDS_REVIEW", marksAwarded: 3 });
    expect(await db.questionAttemptMarking.findFirst({ where: { attemptId, position } })).toMatchObject({ source: "AI", resultingStatus: "NEEDS_REVIEW", confidence: 0.4 });
    // Nothing waits for AI any more: the attempt closes with a provisional score and a review count (teacher queue).
    const attempt = await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } });
    expect(attempt).toMatchObject({ status: "MARKED", marksAwarded: 4, pendingReviewCount: 1 });
  });

  it("adds AI method marks to the final-answer marks of a calculation", async () => {
    const learner = await createLearner();
    const response = { type: "CALCULATION", value: "50", unit: "km/h", working: "speed = distance / time = 150 / 3 = 50" };
    const { attemptId, positions } = await submittedMock(learner, [{ question: calculation, response }]);
    const position = positions.get(calculation.id) as number;
    const transport = new FakeTransport().enqueue(markingReply([{ pointId: "M1", marks: 1 }], 0.9));
    await createAttemptAiMarkingHandler({ gateway: gatewayWith(transport) })(await jobPayload(attemptId, position), jobContext());

    expect(JSON.stringify(transport.lastRequest?.params.messages)).toContain("Final answer: 50 km/h");
    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position } } });
    // Wrong final answer (A mark 0) + method mark from the AI = 1 of 2.
    expect(slot).toMatchObject({ markingStatus: "AI_MARKED", marksAwarded: 1, marksAvailable: 2 });
  });

  it("without an API key: essays wait for self-assessment, other answers go to human review", async () => {
    const learner = await createLearner();
    const { attemptId, positions } = await submittedMock(learner, [
      { question: essay, response: { type: "ESSAY", text: ESSAY_TEXT } },
      { question: calculation, response: { type: "CALCULATION", value: "50", unit: "km/h", working: "150 / 3" } },
    ]);
    const essayPosition = positions.get(essay.id) as number;
    const calcPosition = positions.get(calculation.id) as number;
    const handler = createAttemptAiMarkingHandler({ gateway: gatewayWith(null) });
    const first = await handler(await jobPayload(attemptId, essayPosition), jobContext());
    const second = await handler(await jobPayload(attemptId, calcPosition), jobContext());
    expect(first).toMatchObject({ selfAssessment: 1, aiMarked: 0 });
    expect(second).toMatchObject({ selfAssessment: 1, aiMarked: 0 });

    const slots = await db.questionAttempt.findMany({ where: { attemptId, position: { in: [essayPosition, calcPosition] } } });
    const byPosition = new Map(slots.map((slot) => [slot.position, slot]));
    expect(byPosition.get(essayPosition)).toMatchObject({ markingStatus: "PENDING", marksAwarded: null });
    expect(byPosition.get(calcPosition)).toMatchObject({ markingStatus: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(await db.questionAttemptMarking.findFirst({ where: { attemptId, position: calcPosition } })).toMatchObject({ source: "AUTO", resultingStatus: "NEEDS_REVIEW" });
    // The student is told once to mark their written answer (the results page shows the self-assessment form).
    const notes = await db.notification.findMany({ where: { userId: learner.userId, dedupeKey: `self-assess:${attemptId}` } });
    expect(notes).toHaveLength(1);
    expect(notes[0]?.data).toMatchObject({ href: `/app/exams/attempt/${attemptId}/results` });
    // The essay still waits, so the attempt does too.
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } })).status).toBe("AWAITING_MARKING");
  });

  it("AI-04: once a student's daily marking allowance is used up, further answers go to human review without a model call", async () => {
    const learner = await createLearner();
    const { attemptId, positions } = await submittedMock(learner, [
      { question: essay, response: { type: "ESSAY", text: ESSAY_TEXT } },
      { question: calculation, response: { type: "CALCULATION", value: "50", unit: "km/h", working: "150 / 3" } },
    ]);
    const essayPosition = positions.get(essay.id) as number;
    const calcPosition = positions.get(calculation.id) as number;
    const config = testConfig();
    config.limits.markingUnitsPerUserPerDay = 1;
    const transport = new FakeTransport().enqueue(markingReply([{ pointId: "P1", marks: 2 }, { pointId: "P2", marks: 3 }, { pointId: "P3", marks: 2 }], 0.92));
    const handler = createAttemptAiMarkingHandler({ gateway: createAiGateway({ transport, config, meter: new DbUsageMeter() }) });

    expect(await handler(await jobPayload(attemptId, essayPosition), jobContext())).toMatchObject({ aiMarked: 1, failed: [] });
    const second = await handler(await jobPayload(attemptId, calcPosition), jobContext());
    expect(second).toMatchObject({ aiMarked: 0, failed: [{ attemptId, position: calcPosition, code: "QUOTA_EXCEEDED" }] });
    expect(transport.calls).toHaveLength(1);

    const slot = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position: calcPosition } } });
    expect(slot).toMatchObject({ markingStatus: "NEEDS_REVIEW", marksAwarded: 0 });
    expect(await db.questionAttemptMarking.findFirst({ where: { attemptId, position: calcPosition } })).toMatchObject({
      source: "AUTO",
      resultingStatus: "NEEDS_REVIEW",
      reason: expect.stringContaining("automatic marking limit"),
    });
    const usage = await db.aiUsageDaily.findFirst({ where: { userId: learner.userId, feature: "MARKING" } });
    expect(usage).toMatchObject({ requests: 1, reservedRequests: 0 });
    // Nothing is left waiting for AI: the attempt closes with a provisional score.
    expect((await db.assessmentAttempt.findUniqueOrThrow({ where: { id: attemptId } })).status).toBe("MARKED");
  });

  describe("MIN-01: a minor whose guardian consent refuses AI processing", () => {
    afterEach(() => {
      vi.unstubAllEnvs();
      resetEnvCache();
    });

    async function minor(status: Exclude<GuardianConsentStatus, "GRANTED" | "NOT_REQUIRED">): Promise<Learner> {
      const learner = await createLearner();
      await db.student.update({ where: { userId: learner.userId }, data: { isMinor: true, guardianConsentStatus: status } });
      return learner;
    }

    it("never sends their answers to the model: written work waits for self-assessment, the rest goes to a teacher", async () => {
      const learner = await minor("WITHDRAWN");
      const { attemptId, positions } = await submittedMock(learner, [
        { question: essay, response: { type: "ESSAY", text: "My own private essay about solar panels at our clinic." } },
        { question: calculation, response: { type: "CALCULATION", value: "50", unit: "km/h", working: "150 / 3" } },
      ]);
      const essayPosition = positions.get(essay.id) as number;
      const calcPosition = positions.get(calculation.id) as number;
      const transport = new FakeTransport();
      transport.defaultReply = markingReply([{ pointId: "P1", marks: 2 }], 0.95);
      const handler = createAttemptAiMarkingHandler({ gateway: gatewayWith(transport) });

      expect(await handler(await jobPayload(attemptId, essayPosition), jobContext())).toMatchObject({ loaded: 1, consentWithheld: 1, aiMarked: 0 });
      expect(await handler(await jobPayload(attemptId, calcPosition), jobContext())).toMatchObject({ loaded: 1, consentWithheld: 1, aiMarked: 0 });
      expect(transport.calls).toHaveLength(0);
      expect(await db.aiUsageDaily.count({ where: { userId: learner.userId, feature: "MARKING" } })).toBe(0);

      const slots = new Map((await db.questionAttempt.findMany({ where: { attemptId } })).map((slot) => [slot.position, slot]));
      expect(slots.get(essayPosition)).toMatchObject({ markingStatus: "PENDING", marksAwarded: null });
      expect(slots.get(calcPosition)).toMatchObject({ markingStatus: "NEEDS_REVIEW" });
      expect(await db.questionAttemptMarking.findFirst({ where: { attemptId, position: calcPosition } })).toMatchObject({
        source: "AUTO",
        resultingStatus: "NEEDS_REVIEW",
        reason: expect.stringContaining("guardian's consent"),
      });
      const note = await db.notification.findFirst({ where: { userId: learner.userId, dedupeKey: `self-assess:${attemptId}` } });
      expect(note?.body).toMatch(/until a parent or guardian gives consent/);

      // The student can mark their own essay even on a server where AI marking is configured.
      vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-test-not-real");
      resetEnvCache();
      expect(await aiMarkingAvailableFor(learner.userId)).toBe(false);
      await recordSelfAssessment(learner.actor, attemptId, essayPosition, { pointIds: ["P1"] });
      expect((await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position: essayPosition } } })).markingStatus).toBe(
        "SELF_ASSESSED",
      );
    });

    it("refuses PENDING consent only while the platform requires it; adults keep AI marking", async () => {
      const refusedNow = await minor("REFUSED");
      const adult = await createLearner();
      vi.stubEnv("ANTHROPIC_API_KEY", "sk-ant-test-not-real");
      resetEnvCache();
      expect(await aiMarkingAvailableFor(refusedNow.userId)).toBe(false);
      expect(await aiMarkingAvailableFor(adult.userId)).toBe(true);
      // PENDING follows `privacy.minorAiConsentRequired` (default off: still AI-marked), as for the tutor and solver.
      const pending = await minor("PENDING");
      expect(await aiMarkingAvailableFor(pending.userId)).toBe(true);
    });
  });

  it("registers the handler on the queue the attempt engine enqueues to", () => {
    registerAiMarkingJobs({ gateway: gatewayWith(null) });
    expect(getJobHandler("ai.mark")).toMatchObject({ type: "ai.mark", queue: "ai", maxAttempts: 5 });
  });
});
