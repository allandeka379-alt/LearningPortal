import "server-only";

import { timingSafeEqual } from "node:crypto";
import { logger as rootLogger } from "@/server/lib/logger";
import { registerAllJobs } from "@/worker/handlers";
import { DEFAULT_WORKER_QUEUES, type WorkerOptions } from "@/worker/options";
import { startWorker } from "@/worker/runner";

/**
 * Serverless job runner (Vercel Cron, docs/DEPLOYMENT.md "Vercel"): where no long-running worker process exists, a
 * scheduled request runs one scheduler tick and drains due jobs with the same runner as `npm run worker -- --drain`,
 * then stops before the function's time limit. Jobs still running at the budget get the normal graceful stop; anything
 * unfinished keeps its lease and is reclaimed by a later run (handlers are idempotent).
 */

/** Pure: is the `Authorization` header exactly `Bearer <secret>`? Constant-time; false when no secret is configured. */
export function isAuthorizedCronRequest(header: string | null, secret: string | undefined): boolean {
  if (!secret || !header) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const given = Buffer.from(header);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

/** Pure: worker options for one bounded drain run. */
export function cronWorkerOptions(workerId: string): WorkerOptions {
  return {
    workerId,
    queues: [...DEFAULT_WORKER_QUEUES],
    concurrency: 2,
    pollIntervalMs: 2_000,
    schedulerIntervalMs: 60_000,
    heartbeatIntervalMs: 60_000,
    // After the budget: 20 s for in-flight jobs, then their AbortSignal and 5 s more (callers keep 30 s spare).
    shutdownTimeoutMs: 20_000,
    scheduler: true,
    listen: false,
    drain: true,
  };
}

export interface CronDrainResult {
  processed: number;
  stoppedEarly: boolean;
  ms: number;
}

/** Runs one scheduler tick and drains due jobs for at most `budgetMs` (then a graceful stop). */
export async function drainJobsOnce(budgetMs: number): Promise<CronDrainResult> {
  registerAllJobs();
  const started = Date.now();
  const log = rootLogger.child({ component: "cron-drain" });
  const worker = startWorker(cronWorkerOptions(`cron:${process.pid}:${started}`), { logger: log, listen: null });
  let stoppedEarly = false;
  const timer = setTimeout(() => {
    stoppedEarly = true;
    void worker.stop("cron time budget reached");
  }, budgetMs);
  try {
    await worker.done;
  } finally {
    clearTimeout(timer);
  }
  const processed = worker.stats().processed;
  if (processed > 0 || stoppedEarly) log.info("cron drain finished", { processed, stoppedEarly });
  return { processed, stoppedEarly, ms: Date.now() - started };
}
