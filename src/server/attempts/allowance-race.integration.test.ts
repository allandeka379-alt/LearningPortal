import { describe, expect, it } from "vitest";
import { checkLimit } from "@/server/billing/entitlements";
import { practiceQuestionsToday, topicTestsThisWeek } from "@/server/billing/usage";
import {
  correctResponse,
  createAssessment,
  createAttemptWithAnswers,
  createLearner,
  createLearningSetup,
  type LearningSetup,
} from "../../../tests/factories/learning";
import { answerAndMark, startAttempt } from "./index";

/**
 * PAY-3: numeric plan allowances are check-and-consume ATOMIC. The pre-check outside the transaction reads committed
 * usage only, so a burst of parallel requests (several open sessions, several tests) all saw the same count and all
 * went through. Each consuming transaction now re-counts under a per-(user, limit) lock.
 *
 * The shared default (FREE) plan may hold any values (tests/README.md), so the effective limit is read first and the
 * allowance is pre-filled up to a known remainder; an unlimited default plan cannot be limit-tested.
 */

function definitionOf(setup: LearningSetup, questionId: string) {
  const question = setup.questions.find((q) => q.id === questionId);
  if (!question) throw new Error(`question ${questionId} not in setup`);
  return question.definition;
}

function outcome(promise: Promise<unknown>): Promise<string> {
  return promise.then(
    () => "OK",
    (error: unknown) => String((error as { code?: unknown }).code ?? (error as Error).message),
  );
}

function tally(results: readonly string[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const result of results) counts[result] = (counts[result] ?? 0) + 1;
  return counts;
}

describe("plan allowances under concurrency (PAY-3)", () => {
  it("parallel answers across several open practice sessions never exceed practiceQuestionsPerDay", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 6 });
    const { userId, actor } = await createLearner({ features: null });
    const { limit } = await checkLimit(actor, "practiceQuestionsPerDay", 0, { subjectId: setup.subjectId });
    if (limit === null || limit === 0) return; // not limit-testable with this default plan (see practice.integration.test.ts)
    const question = setup.questions[0];
    if (!question) throw new Error("no question");

    // Two questions left today; both sessions start capped at 2 (starting consumes nothing).
    await createAttemptWithAnswers({ userId, subjectId: setup.subjectId, questionId: question.id, topicId: question.topicId, answered: limit - 2 });
    const sessions = await Promise.all([1, 2].map(() => startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 3 })));
    const slots = sessions.flatMap(({ attempt }) => attempt.questions.map((q) => ({ attemptId: attempt.id, position: q.position, questionId: q.question?.id as string })));
    expect(slots).toHaveLength(4);

    const results = await Promise.all(slots.map((s) => outcome(answerAndMark(actor, s.attemptId, s.position, correctResponse(definitionOf(setup, s.questionId))))));
    expect(tally(results)).toEqual({ OK: 2, QUOTA_EXCEEDED: 2 });
    expect(await practiceQuestionsToday(userId)).toBe(limit);
  });

  it("parallel starts of different topic tests never exceed topicTestsPerWeek", async () => {
    const setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 3 });
    // A small weekly allowance (grants only raise the default plan's value, so read the effective limit).
    const { userId, actor } = await createLearner({ features: { topicTestsPerWeek: 2 } });
    const { limit } = await checkLimit(actor, "topicTestsPerWeek", 0, { subjectId: setup.subjectId });
    if (limit === null || limit === 0 || limit > 5) return;
    const question = setup.questions[0];
    if (!question) throw new Error("no question");
    const tests = await Promise.all(
      Array.from({ length: limit + 2 }, (_, n) =>
        createAssessment({ subjectId: setup.subjectId, syllabusId: setup.syllabusId, kind: "TOPIC_TEST", title: `Race test ${n}`, sections: [{ questionIds: [question.id] }] }),
      ),
    );

    // Use all but one of this week's topic tests, then start three different ones at once.
    for (const test of tests.slice(0, limit - 1)) await startAttempt(actor, { mode: "TOPIC_TEST", subjectId: setup.subjectId, assessmentId: test.id });
    const racing = tests.slice(limit - 1);
    const results = await Promise.all(racing.map((t) => outcome(startAttempt(actor, { mode: "TOPIC_TEST", subjectId: setup.subjectId, assessmentId: t.id }))));
    expect(tally(results)).toEqual({ OK: 1, QUOTA_EXCEEDED: 2 });
    expect(await topicTestsThisWeek(userId)).toBe(limit);
  });
});
