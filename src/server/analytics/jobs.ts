import "server-only";
import { z } from "zod";
import { AppError } from "@/server/lib/errors";
import { addDays, localDateString, type LocalDate } from "@/lib/dates";
import { localDateSchema } from "./core";
import { backfill, computeDailyMetrics, computeYesterdayMetrics, dailyMetricsDedupeKey, PLATFORM_TIMEZONE } from "./rollups";

/**
 * Background-job adapters for analytics (ARCHITECTURE §3.7). They are NOT registered yet: `src/worker` and
 * `src/server/lib/jobs.ts` belong to another workstream. Wiring (remaining work): register each handler under its
 * `name` on queue `rollups`, and have the cron scheduler enqueue `analytics.dailyMetrics` daily at 01:00 CAT with
 * dedupe key `metrics:{yesterday}` (see `nightlyDailyMetricsJob`).
 *
 * Handlers take the raw JSON payload, validate it with Zod and are idempotent (a retry recomputes and replaces the same
 * DailyMetric rows), so the queue's at-least-once delivery is safe.
 */

/** Minimal handler contract, to be adapted to the job runner's signature when it lands. */
export type AnalyticsJobHandler = (payload: unknown) => Promise<void>;

const dailyMetricsPayload = z.object({ date: localDateSchema.optional() }).strict();
const backfillPayload = z.object({ from: localDateSchema, to: localDateSchema }).strict();

/** `analytics.dailyMetrics`: payload `{ date?: "YYYY-MM-DD" }`; without a date it computes yesterday (Africa/Harare). */
export const handleDailyMetricsJob: AnalyticsJobHandler = async (payload) => {
  const parsed = dailyMetricsPayload.safeParse(payload ?? {});
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid analytics.dailyMetrics payload.");
  if (parsed.data.date) await computeDailyMetrics(parsed.data.date);
  else await computeYesterdayMetrics();
};

/** `analytics.backfillMetrics`: payload `{ from, to }` (inclusive, ≤ 366 days, both days already ended). */
export const handleBackfillMetricsJob: AnalyticsJobHandler = async (payload) => {
  const parsed = backfillPayload.safeParse(payload);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Invalid analytics.backfillMetrics payload.");
  await backfill(parsed.data.from, parsed.data.to);
};

/** Handlers to register with the worker, keyed by job name (queue `rollups`). */
export const ANALYTICS_JOB_HANDLERS: Readonly<Record<string, AnalyticsJobHandler>> = Object.freeze({
  "analytics.dailyMetrics": handleDailyMetricsJob,
  "analytics.backfillMetrics": handleBackfillMetricsJob,
});

/** The cron enqueue for the nightly run: job name, queue, payload and period dedupe key for "yesterday" at `now`. */
export function nightlyDailyMetricsJob(now: Date = new Date()): {
  name: "analytics.dailyMetrics";
  queue: "rollups";
  payload: { date: LocalDate };
  dedupeKey: string;
} {
  const date = addDays(localDateString(now, PLATFORM_TIMEZONE), -1);
  return { name: "analytics.dailyMetrics", queue: "rollups", payload: { date }, dedupeKey: dailyMetricsDedupeKey(date) };
}
