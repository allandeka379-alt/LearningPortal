import "server-only";
import { z } from "zod";
import type { AiFeature } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { addDays, dateColumnFromLocalDate, daysBetween, eachLocalDate, isLocalDate, localDateFromDateColumn, localDateString, type LocalDate } from "@/lib/dates";
import { loadAiConfig } from "@/server/ai/config";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { enqueue } from "@/server/lib/jobs";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import {
  AI_MODEL_METRICS,
  AI_MODEL_USAGE_JOB,
  AI_MODEL_VALUE_METRICS,
  aiModelUsageDedupeKey,
  parseModelDimension,
  type ModelUsageGroup,
} from "./ai-usage-rollup";
import { platformSpendMicros } from "./ai-settings";

/**
 * AI usage report (/admin/ai/usage; §40 token tracking and cost control, §35 AI usage, ARCHITECTURE §6.9). `ai.admin`
 * at any scope (ADMIN and SUPER_ADMIN). Every number is read from metering tables, never estimated:
 *
 * - per day: `AiSpendDaily` (the global spend counter, Africa/Harare platform days), plus today so far;
 * - per feature: `AiUsageDaily` (requests, cache hits, DEEP-tier units, images, tokens, cost; user-local days);
 * - per model and tier: `DailyMetric` `ai.model.*` rows written by the `ai.modelUsageRollup` worker job (days not yet
 *   computed are listed so the admin can queue them);
 * - top users by cost: user ids only (link to the user admin; no names or conversation content on this page);
 * - response cache: live entries, hits and the spend they avoided (`hitCount × costMicros`).
 */

export const MAX_USAGE_RANGE_DAYS = 366;
export const TOP_USERS_LIMIT = 20;

const rangeSchema = z
  .object({
    from: z.string().refine(isLocalDate, { error: "Invalid start date." }),
    to: z.string().refine(isLocalDate, { error: "Invalid end date." }),
  })
  .refine((range) => range.from <= range.to, { error: "The start must be on or before the end.", path: ["to"] })
  .refine((range) => daysBetween(range.from, range.to) < MAX_USAGE_RANGE_DAYS, { error: "Choose at most a year.", path: ["from"] });

export interface AiUsageTotals {
  requests: number;
  costMicros: number;
  cacheHits: number;
  /** cacheHits / requests; `null` without requests. */
  cacheHitRate: number | null;
  deepRequests: number;
  images: number;
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens: number;
  cacheWriteTokens: number;
  /** Share of prompt tokens served from the prompt cache; `null` without tokens. */
  cacheReadRatio: number | null;
}

export interface AiFeatureUsage extends Omit<AiUsageTotals, "cacheHitRate" | "cacheReadRatio"> {
  feature: AiFeature;
}

export interface AiModelUsage extends ModelUsageGroup {
  /** Average cost per request in micro-dollars; `null` without requests. */
  avgCostMicros: number | null;
}

export interface AiUsageReport {
  range: { from: LocalDate; to: LocalDate; days: number };
  platformToday: LocalDate;
  apiKeyConfigured: boolean;
  aiEnabled: boolean;
  dailyCeilingMicros: number | null;
  todaySpendMicros: number;
  /** One point per day of the range (0 when no AI request was metered that day). */
  daily: { date: LocalDate; requests: number; costMicros: number }[];
  totals: AiUsageTotals;
  byFeature: AiFeatureUsage[];
  byModel: AiModelUsage[];
  /** Past days of the range (up to yesterday) the per-model rollup has not computed yet. */
  modelDaysMissing: LocalDate[];
  modelDaysComputed: number;
  /** When the per-model rollup last ran for a day of this range. */
  modelLastComputedAt: Date | null;
  topUsers: { userId: string; costMicros: number; requests: number }[];
  responseCache: { liveEntries: number; totalEntries: number; hits: number; savedMicros: number };
}

function ratio(numerator: number, denominator: number): number | null {
  return denominator > 0 ? numerator / denominator : null;
}

/** Builds the usage report for an inclusive range of local dates. */
export async function getAiUsage(actor: CmsActor, input: { from: string; to: string }, now: Date = new Date()): Promise<AiUsageReport> {
  assertCmsPermission(actor, "ai.admin", "restricted");
  const parsed = rangeSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid date range.");
  const { from, to } = parsed.data;
  const fromDate = dateColumnFromLocalDate(from);
  const toDate = dateColumnFromLocalDate(to);
  const platformToday = localDateString(now, DEFAULT_TIMEZONE);

  const [spendRows, featureRows, userRows, modelRows, computedRows, cacheTotals, cacheLive, cacheSaved, todaySpendMicros, config] = await Promise.all([
    // AiSpendDaily PK (date, shard).
    db.aiSpendDaily.groupBy({ by: ["date"], where: { date: { gte: fromDate, lte: toDate } }, _sum: { costMicros: true, requests: true } }),
    // AiUsageDaily(date, feature) index.
    db.aiUsageDaily.groupBy({
      by: ["feature"],
      where: { date: { gte: fromDate, lte: toDate } },
      _sum: {
        requests: true,
        cacheHits: true,
        deepRequests: true,
        images: true,
        inputTokens: true,
        outputTokens: true,
        cacheReadTokens: true,
        cacheWriteTokens: true,
        costMicros: true,
      },
    }),
    db.aiUsageDaily.groupBy({
      by: ["userId"],
      where: { date: { gte: fromDate, lte: toDate } },
      _sum: { costMicros: true, requests: true },
      orderBy: { _sum: { costMicros: "desc" } },
      take: TOP_USERS_LIMIT,
    }),
    // DailyMetric(metric, date) index.
    db.dailyMetric.findMany({
      where: { metric: { in: [...AI_MODEL_VALUE_METRICS] }, date: { gte: fromDate, lte: toDate } },
      select: { metric: true, dimension: true, value: true },
    }),
    db.dailyMetric.findMany({
      where: { metric: AI_MODEL_METRICS.COMPUTED, dimension: "", date: { gte: fromDate, lte: toDate } },
      select: { date: true, updatedAt: true },
    }),
    db.aiResponseCache.aggregate({ _count: { _all: true }, _sum: { hitCount: true } }),
    db.aiResponseCache.count({ where: { invalidatedAt: null, expiresAt: { gt: now } } }),
    db.$queryRaw<{ saved: number | null }[]>`SELECT coalesce(sum("hitCount"::float8 * "costMicros"::float8), 0)::float8 AS saved FROM "AiResponseCache"`,
    platformSpendMicros(platformToday),
    loadAiConfig(),
  ]);

  const spendByDate = new Map(
    spendRows.map((row) => [localDateFromDateColumn(row.date), { requests: row._sum.requests ?? 0, costMicros: Number(row._sum.costMicros ?? 0n) }]),
  );
  const days = daysBetween(from, to) + 1;
  const daily = eachLocalDate(from, days).map((date) => ({ date, requests: spendByDate.get(date)?.requests ?? 0, costMicros: spendByDate.get(date)?.costMicros ?? 0 }));

  const byFeature: AiFeatureUsage[] = featureRows
    .map((row) => ({
      feature: row.feature,
      requests: row._sum.requests ?? 0,
      cacheHits: row._sum.cacheHits ?? 0,
      deepRequests: row._sum.deepRequests ?? 0,
      images: row._sum.images ?? 0,
      inputTokens: row._sum.inputTokens ?? 0,
      outputTokens: row._sum.outputTokens ?? 0,
      cacheReadTokens: row._sum.cacheReadTokens ?? 0,
      cacheWriteTokens: row._sum.cacheWriteTokens ?? 0,
      costMicros: row._sum.costMicros ?? 0,
    }))
    .sort((a, b) => b.costMicros - a.costMicros || b.requests - a.requests);

  const sum = (pick: (row: AiFeatureUsage) => number) => byFeature.reduce((total, row) => total + pick(row), 0);
  const requests = sum((row) => row.requests);
  const cacheHits = sum((row) => row.cacheHits);
  const inputTokens = sum((row) => row.inputTokens);
  const cacheReadTokens = sum((row) => row.cacheReadTokens);
  const cacheWriteTokens = sum((row) => row.cacheWriteTokens);
  const totals: AiUsageTotals = {
    requests,
    costMicros: sum((row) => row.costMicros),
    cacheHits,
    cacheHitRate: ratio(cacheHits, requests),
    deepRequests: sum((row) => row.deepRequests),
    images: sum((row) => row.images),
    inputTokens,
    outputTokens: sum((row) => row.outputTokens),
    cacheReadTokens,
    cacheWriteTokens,
    cacheReadRatio: ratio(cacheReadTokens, inputTokens + cacheReadTokens + cacheWriteTokens),
  };

  const models = new Map<string, AiModelUsage>();
  for (const row of modelRows) {
    const parsedDimension = parseModelDimension(row.dimension);
    if (!parsedDimension) continue;
    let entry = models.get(row.dimension);
    if (!entry) {
      entry = { ...parsedDimension, requests: 0, cacheHits: 0, inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costMicros: 0, avgCostMicros: null };
      models.set(row.dimension, entry);
    }
    switch (row.metric) {
      case AI_MODEL_METRICS.REQUESTS:
        entry.requests += row.value;
        break;
      case AI_MODEL_METRICS.CACHE_HITS:
        entry.cacheHits += row.value;
        break;
      case AI_MODEL_METRICS.INPUT_TOKENS:
        entry.inputTokens += row.value;
        break;
      case AI_MODEL_METRICS.OUTPUT_TOKENS:
        entry.outputTokens += row.value;
        break;
      case AI_MODEL_METRICS.CACHE_READ_TOKENS:
        entry.cacheReadTokens += row.value;
        break;
      case AI_MODEL_METRICS.CACHE_WRITE_TOKENS:
        entry.cacheWriteTokens += row.value;
        break;
      case AI_MODEL_METRICS.COST_MICROS:
        entry.costMicros += row.value;
        break;
    }
  }
  const byModel = [...models.values()]
    .map((entry) => ({ ...entry, avgCostMicros: entry.requests > 0 ? entry.costMicros / entry.requests : null }))
    .sort((a, b) => b.costMicros - a.costMicros || b.requests - a.requests);

  const computed = new Set(computedRows.map((row) => localDateFromDateColumn(row.date)));
  const lastPastDay = addDays(platformToday, -1);
  const modelDaysMissing = eachLocalDate(from, days).filter((date) => date <= lastPastDay && !computed.has(date));

  return {
    range: { from, to, days },
    platformToday,
    apiKeyConfigured: Boolean(getEnv().ANTHROPIC_API_KEY?.trim()),
    aiEnabled: config.enabled,
    dailyCeilingMicros: config.budget.dailyCostCeilingMicros,
    todaySpendMicros,
    daily,
    totals,
    byFeature,
    byModel,
    modelDaysMissing,
    modelDaysComputed: computed.size,
    modelLastComputedAt: computedRows.reduce<Date | null>((latest, row) => (latest === null || row.updatedAt > latest ? row.updatedAt : latest), null),
    topUsers: userRows.map((row) => ({ userId: row.userId, costMicros: row._sum.costMicros ?? 0, requests: row._sum.requests ?? 0 })),
    responseCache: {
      liveEntries: cacheLive,
      totalEntries: cacheTotals._count._all,
      hits: cacheTotals._sum.hitCount ?? 0,
      savedMicros: cacheSaved[0]?.saved ?? 0,
    },
  };
}

/** At most this many days are queued by one "compute missing days" click. */
export const MAX_BACKFILL_DAYS = 90;

/**
 * Queues the per-model rollup for the given past days (deduplicated per day). Audited as a job enqueue
 * (`job.enqueue` with `metadata.operation = "job.enqueue.ai_model_usage"`).
 */
export async function enqueueAiModelUsageBackfill(
  actor: CmsActor,
  input: { dates: readonly string[] },
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ queued: number }> {
  assertCmsPermission(actor, "ai.admin", "restricted");
  const lastPastDay = addDays(localDateString(now, DEFAULT_TIMEZONE), -1);
  const dates = [...new Set(input.dates)].filter((date) => isLocalDate(date) && date <= lastPastDay).sort().slice(-MAX_BACKFILL_DAYS);
  if (dates.length === 0) throw AppError.validation({ _form: ["There are no past days to compute."] });
  return db.$transaction(async (tx) => {
    let queued = 0;
    for (const date of dates) {
      const result = await enqueue(AI_MODEL_USAGE_JOB, { date }, { client: tx, queue: "rollups", dedupeKey: aiModelUsageDedupeKey(date) });
      if (result.created) queued += 1;
    }
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: AUDIT_ACTIONS.JOB_ENQUEUE,
      entityType: "Job",
      entityId: AI_MODEL_USAGE_JOB,
      metadata: { operation: "job.enqueue.ai_model_usage", from: dates[0] ?? null, to: dates.at(-1) ?? null, days: dates.length, queued },
      request,
    });
    return { queued };
  });
}
