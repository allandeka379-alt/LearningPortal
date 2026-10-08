import "server-only";
import { z } from "zod";
import { purgeExpiredResponseCache } from "@/server/ai/response-cache-db";
import { handleBackfillMetricsJob, handleDailyMetricsJob } from "@/server/analytics/jobs";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { handleReindexAllJob, handleReindexEntityJob, SEARCH_JOB_QUEUE } from "@/server/search/indexer";

/**
 * Job registrations for modules built before the worker existed (analytics, search, AI cache). Each delegates to the
 * module's own validated, idempotent handler. See src/worker/handlers.ts for the registration pattern.
 */

/** Scheduler-enqueued payloads carry `periodStart`; the domain handlers validate their own (strict) shapes. */
const anyPayload = z.unknown();

function withoutPeriodStart(payload: unknown): unknown {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    const rest: Record<string, unknown> = { ...(payload as Record<string, unknown>) };
    delete rest.periodStart;
    return rest;
  }
  return payload;
}

/** analytics.dailyMetrics (nightly 01:00 CAT = 23:00 UTC, after the Africa/Harare day has ended) + on-demand backfill. */
export function registerAnalyticsJobs(): void {
  registerJobHandler("analytics.dailyMetrics", anyPayload, (payload) => handleDailyMetricsJob(withoutPeriodStart(payload)), {
    queue: "rollups",
    maxAttempts: 3,
  });
  registerJobHandler("analytics.backfillMetrics", anyPayload, (payload) => handleBackfillMetricsJob(payload), {
    queue: "rollups",
    maxAttempts: 2,
  });
  registerRecurringJob("analytics.dailyMetrics", 1440, "analytics.dailyMetrics", { offsetMinutes: 23 * 60, queue: "rollups" });
}

/** Name of the weekly full-reindex schedule (its period dedupe key is `cron:<name>:<periodStart>`). */
export const SEARCH_REINDEX_WEEKLY = "search.reindexAll.weekly";
/** Once a week. */
export const SEARCH_REINDEX_EVERY_MINUTES = 7 * 1440;
/**
 * Weekly periods are aligned to the UTC epoch (a Thursday): + 3 days 1 h = Sunday 01:00 UTC = 03:00 CAT, the quietest
 * hour of the week and clear of the nightly rollups and Monday's leaderboard close.
 */
export const SEARCH_REINDEX_OFFSET_MINUTES = 3 * 1440 + 60;

/**
 * search.reindexEntity (enqueued by publish/archive flows) + search.reindexAll (admin on demand, and a weekly safety
 * net that repairs anything an entity job missed: a failed job past its retries, a catalogue change made outside the
 * services, a restored backup). The full rebuild is idempotent and only rewrites documents that changed.
 */
export function registerSearchJobs(): void {
  registerJobHandler("search.reindexEntity", anyPayload, (payload) => handleReindexEntityJob(payload), {
    queue: SEARCH_JOB_QUEUE,
    maxAttempts: 5,
  });
  registerJobHandler("search.reindexAll", anyPayload, (payload, ctx) => handleReindexAllJob(withoutPeriodStart(payload), { signal: ctx.signal }), {
    queue: SEARCH_JOB_QUEUE,
    maxAttempts: 2,
  });
  registerRecurringJob(SEARCH_REINDEX_WEEKLY, SEARCH_REINDEX_EVERY_MINUTES, "search.reindexAll", {
    offsetMinutes: SEARCH_REINDEX_OFFSET_MINUTES,
    queue: SEARCH_JOB_QUEUE,
  });
}

/** ai.cache.purge: daily removal of expired/invalidated AI response-cache rows (§40). */
export function registerAiMaintenanceJobs(): void {
  registerJobHandler("ai.cache.purge", anyPayload, async () => ({ deleted: await purgeExpiredResponseCache() }), {
    queue: "default",
    maxAttempts: 3,
  });
  registerRecurringJob("ai.cache.purge", 1440, "ai.cache.purge", { offsetMinutes: 60 });
}
