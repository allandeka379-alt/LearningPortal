import { beforeAll, describe, expect, it } from "vitest";
import { db } from "@/server/db";
import { RATE_LIMIT_PRESETS, rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { getRateLimitOverrides } from "@/server/lib/settings";
import { correctResponse, createLearner, createLearningSetup, type LearningSetup } from "../../../tests/factories/learning";
import { answerAndMark, saveResponse, startAttempt } from "./index";
import { attemptWritesInFlight, MAX_CONCURRENT_ATTEMPT_WRITES } from "./throttle";

/**
 * AI-04 + PAY-3 follow-up: per-student throttles on the attempt hot paths, applied by the service entry points that the
 * web app, the REST API and WhatsApp all call. A burst from one student is refused with RATE_LIMITED before it reaches
 * a lock or a transaction, instead of every request holding a pooled connection while it waits for the attempt's row
 * lock (Prisma P2024 "timed out fetching a connection" / P2028 "unable to start a transaction").
 */

let setup: LearningSetup;

beforeAll(async () => {
  setup = await createLearningSetup({ topics: 1, subtopicsPerTopic: 1, questionsPerLeaf: 4 });
});

function codeOf(promise: Promise<unknown>): Promise<string> {
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

/** The effective limit of a preset (the shared test database may hold a `rateLimits` override). */
async function limitOf(preset: "attemptStart" | "answerSubmit"): Promise<number> {
  return (await getRateLimitOverrides())[preset]?.limit ?? RATE_LIMIT_PRESETS[preset].limit;
}

async function practiceAttempt(actor: Parameters<typeof startAttempt>[0]) {
  const { attempt } = await startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 });
  const first = attempt.questions[0];
  if (!first?.question) throw new Error("practice attempt has no question");
  const definition = setup.questions.find((q) => q.id === first.question?.id)?.definition;
  if (!definition) throw new Error("question not in setup");
  return { attemptId: attempt.id, position: first.position, response: correctResponse(definition) };
}

describe("attempt throttles (AI-04, PAY-3)", () => {
  it("a burst of 1,500 saves from one student gets RATE_LIMITED at once, never a connection-pool error", async () => {
    // Measured before the throttle on the development machine (pool 10, maxWait 10 s): this burst took 13 s, held every
    // pooled connection, and 541-599 of the 1,500 requests failed with P2028 "Unable to start a transaction".
    const burst = 1_500;
    const { actor, userId } = await createLearner();
    const { attemptId, position, response } = await practiceAttempt(actor);

    const startedAt = Date.now();
    const results = await Promise.all(Array.from({ length: burst }, () => codeOf(saveResponse(actor, attemptId, position, response))));
    const elapsedMs = Date.now() - startedAt;

    // Only the student's concurrency slots got through; everything else was refused before touching the database.
    expect(tally(results)).toEqual({ OK: MAX_CONCURRENT_ATTEMPT_WRITES, RATE_LIMITED: burst - MAX_CONCURRENT_ATTEMPT_WRITES });
    expect(results.some((code) => code === "P2024" || code === "P2028" || code === "INTERNAL")).toBe(false);
    expect(elapsedMs).toBeLessThan(10_000);
    expect(attemptWritesInFlight(userId)).toBe(0);
    // The student can carry on straight away.
    await expect(saveResponse(actor, attemptId, position, response)).resolves.toMatchObject({ saved: true });
  });

  it("answerSubmit: once the per-minute budget is used (any channel), saves and answers are refused before any write", async () => {
    const { actor, userId } = await createLearner();
    const { attemptId, position, response } = await practiceAttempt(actor);
    const before = await db.questionAttempt.findUniqueOrThrow({ where: { attemptId_position: { attemptId, position } }, select: { responseVersion: true } });

    const limit = await limitOf("answerSubmit");
    for (let i = 0; i < limit; i += 1) await rateLimit(rateLimits.answerSubmit(userId));

    const saved = await saveResponse(actor, attemptId, position, response).catch((error: unknown) => error);
    expect(saved).toMatchObject({ code: "RATE_LIMITED", retryAfterSeconds: expect.any(Number) });
    // The same bucket covers the practice / WhatsApp answer path.
    await expect(answerAndMark(actor, attemptId, position, response)).rejects.toMatchObject({ code: "RATE_LIMITED" });
    const after = await db.questionAttempt.findUniqueOrThrow({
      where: { attemptId_position: { attemptId, position } },
      select: { responseVersion: true, markingStatus: true, markedAt: true },
    });
    expect(after).toMatchObject({ responseVersion: before.responseVersion, markingStatus: "PENDING", markedAt: null });
  });

  it("attemptStart: starts beyond the 10-minute budget are refused and create nothing", async () => {
    const { actor, userId } = await createLearner();
    const limit = await limitOf("attemptStart");
    for (let i = 0; i < limit; i += 1) await rateLimit(rateLimits.attemptStart(userId));

    await expect(startAttempt(actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 })).rejects.toMatchObject({ code: "RATE_LIMITED" });
    expect(await db.assessmentAttempt.count({ where: { userId } })).toBe(0);
    expect(attemptWritesInFlight(userId)).toBe(0);
  });

  it("budgets are per student: another student is not affected", async () => {
    const busy = await createLearner();
    const calm = await createLearner();
    const limit = await limitOf("attemptStart");
    for (let i = 0; i < limit; i += 1) await rateLimit(rateLimits.attemptStart(busy.userId));
    await expect(startAttempt(busy.actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 })).rejects.toMatchObject({ code: "RATE_LIMITED" });
    await expect(startAttempt(calm.actor, { mode: "PRACTICE", subjectId: setup.subjectId, count: 2 })).resolves.toMatchObject({ resumed: false });
  });
});
