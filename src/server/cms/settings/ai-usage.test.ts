import { randomInt, randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { addDays, localDateString } from "@/lib/dates";
import { recordExchange, startConversation } from "@/server/ai/conversations";
import type { AiTextResult } from "@/server/ai/gateway";
import { db } from "@/server/db";
import { withAiScope } from "@/server/lib/db-context";
import { cancelJob } from "@/server/lib/jobs";
import { createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { enqueueAiModelUsageBackfill, getAiUsage } from "./ai-usage";
import {
  AI_MODEL_METRICS,
  AI_MODEL_USAGE_JOB,
  aiModelUsageDedupeKey,
  computeAiModelUsage,
  mergeModelGroups,
  modelDimension,
  parseModelDimension,
} from "./ai-usage-rollup";

/**
 * AI usage report and the per-model rollup against Postgres. The metering tables are shared: this file works on a
 * random day of 2003 (no other test writes there) plus a unique model id for "today", asserts only on its own rows and
 * removes what it added.
 */

const day = addDays("2003-01-01", randomInt(0, 300));
const nextDay = addDays(day, 1);
const shard = randomInt(0, 16);
const model = `claude-test-${randomUUID().slice(0, 8)}`;
const today = localDateString(new Date());
const cleanup = { users: [] as string[], conversations: [] as string[], spend: [] as { date: string; cost: number; requests: number }[] };

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

async function addSpend(date: string, cost: number, requests: number): Promise<void> {
  await db.$executeRaw`
    INSERT INTO "AiSpendDaily" ("date", "shard", "costMicros", "requests", "updatedAt")
    VALUES (${date}::date, ${shard}::smallint, ${cost}::bigint, ${requests}::int, now())
    ON CONFLICT ("date", "shard") DO UPDATE SET "costMicros" = "AiSpendDaily"."costMicros" + EXCLUDED."costMicros",
      "requests" = "AiSpendDaily"."requests" + EXCLUDED."requests", "updatedAt" = now()`;
  cleanup.spend.push({ date, cost, requests });
}

afterAll(async () => {
  for (const entry of cleanup.spend) {
    await db.$executeRaw`UPDATE "AiSpendDaily" SET "costMicros" = "costMicros" - ${entry.cost}::bigint, "requests" = "requests" - ${entry.requests}::int
      WHERE "date" = ${entry.date}::date AND "shard" = ${shard}::smallint`;
  }
  await db.aiUsageDaily.deleteMany({ where: { userId: { in: cleanup.users } } });
  await db.dailyMetric.deleteMany({ where: { OR: [{ dimension: { startsWith: `model:${model}|` } }, { date: { in: [new Date(`${day}T00:00:00Z`), new Date(`${nextDay}T00:00:00Z`)] }, metric: AI_MODEL_METRICS.COMPUTED }] } });
  const pending = await db.job.findMany({ where: { dedupeKey: { in: [aiModelUsageDedupeKey(day), aiModelUsageDedupeKey(nextDay)] }, status: "PENDING" }, select: { id: true } });
  for (const job of pending) await cancelJob(job.id);
  for (const id of cleanup.conversations) await withAiScope("system", null, (tx) => tx.aiConversation.deleteMany({ where: { id } }));
});

describe("model dimension helpers", () => {
  it("round-trips dimensions and merges groups", () => {
    const dimension = modelDimension("claude-sonnet-5-5", "STANDARD");
    expect(dimension).toBe("model:claude-sonnet-5-5|tier:STANDARD");
    expect(parseModelDimension(dimension)).toEqual({ model: "claude-sonnet-5-5", tier: "STANDARD" });
    expect(parseModelDimension("feature:TUTOR")).toBeNull();
    expect(modelDimension("we|ird model", "")).toBe("model:weirdmodel|tier:UNKNOWN");
    const base = { model: "m", tier: "FAST", requests: 1, cacheHits: 1, inputTokens: 10, outputTokens: 5, cacheReadTokens: 0, cacheWriteTokens: 0, costMicros: 7 };
    expect(mergeModelGroups([base], [{ ...base, requests: 2, costMicros: 3 }, { ...base, tier: "DEEP" }])).toEqual([
      { ...base, requests: 3, cacheHits: 2, inputTokens: 20, outputTokens: 10, costMicros: 10 },
      { ...base, tier: "DEEP" },
    ]);
  });
});

describe("AI usage report", () => {
  it("reports spend per day, usage per feature, cache hit rate and top users by id; ADMIN may view it", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { user: heavy } = await createUser({ roles: ["STUDENT"] });
    cleanup.users.push(heavy.id);
    const date = new Date(`${day}T00:00:00Z`);
    await db.aiUsageDaily.createMany({
      data: [
        { userId: heavy.id, date, feature: "TUTOR", requests: 40, cacheHits: 10, deepRequests: 4, inputTokens: 40_000, outputTokens: 8_000, cacheReadTokens: 60_000, cacheWriteTokens: 0, costMicros: 900_000_000 },
        { userId: heavy.id, date, feature: "SOLVER", requests: 10, images: 3, inputTokens: 9_000, outputTokens: 2_000, costMicros: 100_000_000 },
      ],
    });
    await addSpend(day, 1_000_000_000, 50);

    const report = await getAiUsage(admin, { from: day, to: nextDay });
    expect(report.range).toEqual({ from: day, to: nextDay, days: 2 });
    expect(report.daily).toHaveLength(2);
    expect(report.daily[0]?.date).toBe(day);
    expect(report.daily[0]?.costMicros).toBeGreaterThanOrEqual(1_000_000_000);
    expect(report.daily[0]?.requests).toBeGreaterThanOrEqual(50);
    const tutor = report.byFeature.find((row) => row.feature === "TUTOR");
    expect(tutor?.requests).toBeGreaterThanOrEqual(40);
    expect(tutor?.deepRequests).toBeGreaterThanOrEqual(4);
    expect(report.totals.cacheHitRate).not.toBeNull();
    expect(report.totals.cacheReadRatio).not.toBeNull();
    expect(report.topUsers[0]).toEqual({ userId: heavy.id, costMicros: 1_000_000_000, requests: 50 });
    expect(Object.keys(report.topUsers[0] ?? {}).sort()).toEqual(["costMicros", "requests", "userId"]);
    expect(report.modelDaysMissing).toEqual([day, nextDay]);
    expect(typeof report.apiKeyConfigured).toBe("boolean");

    await expect(getAiUsage(await actorWith(["CONTENT_EDITOR"]), { from: day, to: day })).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(getAiUsage(admin, { from: nextDay, to: day })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(getAiUsage(admin, { from: "2001-01-01", to: "2003-01-01" })).rejects.toMatchObject({ code: "VALIDATION" });
  });

  it("rolls up AiMessage metering per model and tier under the system scope (no content) and reports it", async () => {
    const admin = await actorWith(["SUPER_ADMIN"]);
    const { user: owner } = await createUser({ roles: ["STUDENT"] });
    const { id } = await startConversation({ kind: "user", userId: owner.id }, { userId: owner.id, mode: "TUTOR", promptVersion: "usage-test" });
    cleanup.conversations.push(id);
    const result: AiTextResult = {
      route: "tutor",
      feature: "TUTOR",
      tier: "STANDARD",
      model,
      servedByModel: model,
      servedByFallback: false,
      promptVersion: "usage-test",
      usage: { inputTokens: 1200, outputTokens: 300, cacheReadTokens: 1500, cacheWriteTokens: 200 },
      costMicros: 6200,
      latencyMs: 800,
      stopReason: "end_turn",
      refusalCategory: null,
      cached: false,
      cacheEntryId: null,
      status: "COMPLETE",
      text: "Which two numbers multiply to 6?",
    };
    await recordExchange({ kind: "user", userId: owner.id }, { conversationId: id, user: { content: "Factorise x^2 - 5x + 6" }, assistant: { result } });
    await recordExchange({ kind: "user", userId: owner.id }, { conversationId: id, user: { content: "Next step?" }, assistant: { result: { ...result, cached: true, costMicros: 0 } } });

    const computed = await computeAiModelUsage(today);
    expect(computed.groups).toBeGreaterThanOrEqual(1);
    const rows = await db.dailyMetric.findMany({ where: { dimension: modelDimension(model, "STANDARD") } });
    const values = Object.fromEntries(rows.map((row) => [row.metric, row.value]));
    expect(values).toMatchObject({
      [AI_MODEL_METRICS.REQUESTS]: 2,
      [AI_MODEL_METRICS.CACHE_HITS]: 1,
      [AI_MODEL_METRICS.INPUT_TOKENS]: 2400,
      [AI_MODEL_METRICS.COST_MICROS]: 6200,
    });
    // Idempotent: a re-run upserts the same totals.
    await computeAiModelUsage(today);
    expect(await db.dailyMetric.count({ where: { dimension: modelDimension(model, "STANDARD") } })).toBe(rows.length);

    const report = await getAiUsage(admin, { from: today, to: today });
    const mine = report.byModel.find((row) => row.model === model);
    expect(mine).toMatchObject({ tier: "STANDARD", requests: 2, cacheHits: 1, costMicros: 6200, avgCostMicros: 3100 });
    expect(report.modelDaysMissing).toEqual([]);
  });

  it("queues missing past days once (deduplicated) with an audit entry", async () => {
    const admin = await actorWith(["ADMIN"]);
    const first = await enqueueAiModelUsageBackfill(admin, { dates: [day, nextDay, "2999-01-01", "garbage"] });
    expect(first.queued).toBe(2);
    expect((await enqueueAiModelUsageBackfill(admin, { dates: [day] })).queued).toBe(0);
    const jobs = await db.job.findMany({ where: { dedupeKey: { in: [aiModelUsageDedupeKey(day), aiModelUsageDedupeKey(nextDay)] }, status: "PENDING" } });
    expect(jobs.map((job) => [job.type, job.queue])).toEqual([
      [AI_MODEL_USAGE_JOB, "rollups"],
      [AI_MODEL_USAGE_JOB, "rollups"],
    ]);
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Job", entityId: AI_MODEL_USAGE_JOB, actorUserId: admin.userId } });
    expect(audit.action).toBe("job.enqueue");
    expect(audit.metadata).toMatchObject({ operation: "job.enqueue.ai_model_usage", days: 2, queued: 2 });
    await expect(enqueueAiModelUsageBackfill(admin, { dates: ["2999-01-01"] })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
