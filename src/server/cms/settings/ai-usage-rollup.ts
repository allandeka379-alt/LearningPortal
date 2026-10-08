import "server-only";
import { z } from "zod";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { addDays, isLocalDate, localDateString, startOfLocalDay, type LocalDate } from "@/lib/dates";
import { db } from "@/server/db";
import { withAiScope } from "@/server/lib/db-context";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";

/**
 * AI usage by MODEL and TIER (§40 token tracking, ARCHITECTURE §6.9 "/admin/ai shows spend by feature, tier…").
 *
 * The quota ledger (`AiUsageDaily`) and the spend counter (`AiSpendDaily`) carry no model, and the per-call metering
 * lives on `AiMessage` rows, which are private by row-level security. This worker job aggregates ONLY the metering
 * columns (model, tier, tokens, cost, cache flag; never content, never user ids) of one Africa/Harare day under the
 * `system` AI scope that is reserved for workers, adds admin content-generation runs (`AiGenerationJob`, no RLS), and
 * upserts the totals into `DailyMetric` under its own metric keys (`ai.model.*`, dimension
 * `model:<id>|tier:<TIER>`), which the admin usage page reads. A `ai.model.computed` marker row records that a day
 * was computed, so a day without AI traffic shows as zero rather than "not computed".
 *
 * Idempotent (upserts), safe to re-run for any day. Rows are never deleted: AiMessage metering is append-only, so a
 * (model, tier) group that once existed for a day keeps existing.
 */

export const AI_MODEL_USAGE_JOB = "ai.modelUsageRollup";
/** Daily at 01:30 CAT (23:30 UTC), after the analytics rollup. */
const DAILY_OFFSET_MINUTES = 23 * 60 + 30;

export const AI_MODEL_METRICS = {
  COMPUTED: "ai.model.computed",
  REQUESTS: "ai.model.requests",
  CACHE_HITS: "ai.model.cacheHits",
  INPUT_TOKENS: "ai.model.inputTokens",
  OUTPUT_TOKENS: "ai.model.outputTokens",
  CACHE_READ_TOKENS: "ai.model.cacheReadTokens",
  CACHE_WRITE_TOKENS: "ai.model.cacheWriteTokens",
  COST_MICROS: "ai.model.costMicros",
} as const;

export const AI_MODEL_VALUE_METRICS = [
  AI_MODEL_METRICS.REQUESTS,
  AI_MODEL_METRICS.CACHE_HITS,
  AI_MODEL_METRICS.INPUT_TOKENS,
  AI_MODEL_METRICS.OUTPUT_TOKENS,
  AI_MODEL_METRICS.CACHE_READ_TOKENS,
  AI_MODEL_METRICS.CACHE_WRITE_TOKENS,
  AI_MODEL_METRICS.COST_MICROS,
] as const;

const SAFE_PART = /[^A-Za-z0-9._@-]/g;

/** `model:<id>|tier:<TIER>` (VarChar 128; separators stripped from the parts). Pure. */
export function modelDimension(model: string, tier: string): string {
  const safeModel = (model.replace(SAFE_PART, "").slice(0, 80) || "unknown").toLowerCase();
  const safeTier = tier.replace(SAFE_PART, "").slice(0, 16) || "UNKNOWN";
  return `model:${safeModel}|tier:${safeTier}`;
}

/** Inverse of {@link modelDimension}; `null` for any other dimension. Pure. */
export function parseModelDimension(dimension: string): { model: string; tier: string } | null {
  const match = /^model:([^|]+)\|tier:([^|]+)$/.exec(dimension);
  return match?.[1] && match[2] ? { model: match[1], tier: match[2] } : null;
}

export interface ModelUsageGroup {
  model: string;
  tier: string;
  requests: number;
  cacheHits: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  costMicros: number;
}

/** Adds groups with the same (model, tier). Pure. */
export function mergeModelGroups(...lists: readonly ModelUsageGroup[][]): ModelUsageGroup[] {
  const merged = new Map<string, ModelUsageGroup>();
  for (const group of lists.flat()) {
    const key = modelDimension(group.model, group.tier);
    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...group });
      continue;
    }
    existing.requests += group.requests;
    existing.cacheHits += group.cacheHits;
    existing.inputTokens += group.inputTokens;
    existing.outputTokens += group.outputTokens;
    existing.cacheReadTokens += group.cacheReadTokens;
    existing.cacheWriteTokens += group.cacheWriteTokens;
    existing.costMicros += group.costMicros;
  }
  return [...merged.values()];
}

type RawGroup = { model: string; tier: string; requests: number; cacheHits: number; inputTokens: number; outputTokens: number; cacheReadTokens: number; cacheWriteTokens: number; costMicros: number };

/** Computes and upserts the per-model usage of one platform day. */
export async function computeAiModelUsage(date: LocalDate): Promise<{ date: LocalDate; groups: number }> {
  if (!isLocalDate(date)) throw new RangeError(`computeAiModelUsage: invalid date ${String(date)}`);
  const start = startOfLocalDay(date, DEFAULT_TIMEZONE);
  const end = startOfLocalDay(addDays(date, 1), DEFAULT_TIMEZONE);

  // Metering columns only, under the worker-only `system` scope (AiMessage is RLS-protected).
  const messages = await withAiScope("system", null, (tx) =>
    tx.$queryRaw<RawGroup[]>`
      SELECT coalesce(m."model", 'unknown') AS model,
             coalesce(m."tier"::text, 'UNKNOWN') AS tier,
             count(*)::float8 AS requests,
             count(*) FILTER (WHERE m."cached")::float8 AS "cacheHits",
             coalesce(sum(m."inputTokens"), 0)::float8 AS "inputTokens",
             coalesce(sum(m."outputTokens"), 0)::float8 AS "outputTokens",
             coalesce(sum(m."cacheReadTokens"), 0)::float8 AS "cacheReadTokens",
             coalesce(sum(m."cacheWriteTokens"), 0)::float8 AS "cacheWriteTokens",
             coalesce(sum(m."costMicros"), 0)::float8 AS "costMicros"
        FROM "AiMessage" m
       WHERE m."role" = 'ASSISTANT' AND m."createdAt" >= ${start} AND m."createdAt" < ${end}
       GROUP BY 1, 2`,
  );
  const generation = await db.$queryRaw<RawGroup[]>`
    SELECT coalesce(g."model", 'unknown') AS model,
           coalesce(g."tier"::text, 'UNKNOWN') AS tier,
           count(*)::float8 AS requests,
           0::float8 AS "cacheHits",
           coalesce(sum(g."inputTokens"), 0)::float8 AS "inputTokens",
           coalesce(sum(g."outputTokens"), 0)::float8 AS "outputTokens",
           coalesce(sum(g."cacheReadTokens"), 0)::float8 AS "cacheReadTokens",
           coalesce(sum(g."cacheWriteTokens"), 0)::float8 AS "cacheWriteTokens",
           coalesce(sum(g."costMicros"), 0)::float8 AS "costMicros"
      FROM "AiGenerationJob" g
     WHERE g."status" IN ('COMPLETED', 'FAILED', 'CANCELLED')
       AND (g."inputTokens" > 0 OR g."outputTokens" > 0 OR g."costMicros" > 0)
       AND coalesce(g."completedAt", g."cancelledAt", g."updatedAt") >= ${start}
       AND coalesce(g."completedAt", g."cancelledAt", g."updatedAt") < ${end}
     GROUP BY 1, 2`;
  const groups = mergeModelGroups(messages, generation);

  const metrics: string[] = [AI_MODEL_METRICS.COMPUTED];
  const dimensions: string[] = [""];
  const values: number[] = [groups.length];
  for (const group of groups) {
    const dimension = modelDimension(group.model, group.tier);
    const entries: [string, number][] = [
      [AI_MODEL_METRICS.REQUESTS, group.requests],
      [AI_MODEL_METRICS.CACHE_HITS, group.cacheHits],
      [AI_MODEL_METRICS.INPUT_TOKENS, group.inputTokens],
      [AI_MODEL_METRICS.OUTPUT_TOKENS, group.outputTokens],
      [AI_MODEL_METRICS.CACHE_READ_TOKENS, group.cacheReadTokens],
      [AI_MODEL_METRICS.CACHE_WRITE_TOKENS, group.cacheWriteTokens],
      [AI_MODEL_METRICS.COST_MICROS, group.costMicros],
    ];
    for (const [metric, value] of entries) {
      metrics.push(metric);
      dimensions.push(dimension);
      values.push(value);
    }
  }
  await db.$executeRaw`
    INSERT INTO "DailyMetric" ("id", "date", "metric", "dimension", "value", "createdAt", "updatedAt")
    SELECT uuidv7(), ${date}::date, m."metric", m."dimension", m."value", now(), now()
      FROM unnest(${metrics}::text[], ${dimensions}::text[], ${values}::float8[]) AS m("metric", "dimension", "value")
    ON CONFLICT ("date", "metric", "dimension") DO UPDATE SET "value" = EXCLUDED."value", "updatedAt" = EXCLUDED."updatedAt"`;
  return { date, groups: groups.length };
}

/** The platform day before `now` (what the nightly run computes). */
export function previousPlatformDay(now: Date): LocalDate {
  return addDays(localDateString(now, DEFAULT_TIMEZONE), -1);
}

/** Dedupe key per day, so a backfill and the nightly run never queue the same day twice. */
export function aiModelUsageDedupeKey(date: LocalDate): string {
  return `ai-model-usage:${date}`;
}

const payloadSchema = z.looseObject({
  date: z.string().refine(isLocalDate, { error: "Invalid date." }).optional(),
  periodStart: z.iso.datetime().optional(),
});

/**
 * Registers the `ai.modelUsageRollup` handler (queue `rollups`) and its daily schedule. Call once from
 * src/worker/handlers.ts. Payload `{ date: "YYYY-MM-DD" }` recomputes that day; the scheduled run (no date) computes
 * yesterday.
 */
export function registerAiUsageJobs(): void {
  registerJobHandler(
    AI_MODEL_USAGE_JOB,
    payloadSchema,
    async (payload) => computeAiModelUsage(payload.date ?? previousPlatformDay(new Date())),
    { queue: "rollups", maxAttempts: 3 },
  );
  registerRecurringJob(AI_MODEL_USAGE_JOB, 1440, AI_MODEL_USAGE_JOB, { offsetMinutes: DAILY_OFFSET_MINUTES, queue: "rollups" });
}
