import "server-only";
import { clearInterval, clearTimeout, setInterval, setTimeout } from "node:timers";
import pg from "pg";
import { claimJobs, extendLeases, runClaimedJob, runSchedulerTick } from "@/server/lib/jobs";
import { logger as rootLogger, type Logger } from "@/server/lib/logger";
import type { WorkerOptions } from "./options";

/**
 * The job worker loop (ARCHITECTURE §3.7). `concurrency` lanes each claim ONE job at a time, round-robin across the
 * configured queues (payments first in the default order), run it, and sleep for `pollIntervalMs` when every queue is
 * empty. A LISTEN connection on `job_enqueued` (fired by a trigger on PENDING inserts) wakes idle lanes immediately;
 * polling remains the fallback (LISTEN needs a direct, non-transaction-pooled connection).
 *
 * Alongside the lanes: a scheduler tick (recurring jobs + lease reclaim; one leader per tick across all workers) and a
 * heartbeat that extends the lease of in-flight jobs, so long imports / AI generations are never reclaimed mid-run.
 *
 * Graceful stop: lanes stop claiming, in-flight jobs get `shutdownTimeoutMs` to finish, then their AbortSignal fires;
 * anything still running after a short grace stays RUNNING and is reclaimed by the lease timeout.
 */

export interface WorkerStats {
  processed: number;
  inFlight: number;
  /** Errors from the claim / scheduler / heartbeat machinery (not job failures). */
  loopErrors: number;
}

export interface WorkerHandle {
  readonly workerId: string;
  /** Resolves when every lane has exited (after `stop()`, or when a `drain` run finds no more work). */
  readonly done: Promise<void>;
  /** Stops claiming and waits for in-flight jobs (see module doc). Idempotent. */
  stop(reason?: string): Promise<void>;
  stats(): WorkerStats;
  /** Wakes idle lanes (used by LISTEN/NOTIFY; exposed for tests). */
  wake(): void;
}

/** Subscribes to job notifications; returns an unsubscribe function. */
export type JobListener = (onNotify: (queue: string) => void, logger: Logger) => Promise<() => Promise<void>>;

/** LISTEN `job_enqueued` on a dedicated `pg` connection to `DATABASE_URL`. */
export const listenWithPg: JobListener = async (onNotify, logger) => {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is not set");
  const client = new pg.Client({ connectionString });
  client.on("error", (error) => logger.warn("job listener connection error; falling back to polling", { err: error }));
  client.on("notification", (message) => onNotify(message.payload ?? ""));
  await client.connect();
  await client.query("LISTEN job_enqueued");
  return async () => {
    await client.end().catch(() => undefined);
  };
};

const GRACE_AFTER_ABORT_MS = 5_000;
const MAX_ERROR_BACKOFF_MS = 30_000;

/** Starts the worker. Returns immediately; observe `done` / call `stop()`. */
export function startWorker(
  options: WorkerOptions,
  deps: { logger?: Logger; listen?: JobListener | null } = {},
): WorkerHandle {
  const log = (deps.logger ?? rootLogger).child({ workerId: options.workerId });
  const abort = new AbortController();
  const inFlight = new Set<string>();
  const sleepers = new Set<() => void>();
  const stats = { processed: 0, loopErrors: 0 };
  const servedQueues = new Set(options.queues);
  let stopping = false;
  let idleLanes = 0;
  let stopPromise: Promise<void> | null = null;
  let unlisten: (() => Promise<void>) | null = null;
  const timers: NodeJS.Timeout[] = [];

  const wake = (): void => {
    for (const resolve of [...sleepers]) resolve();
  };

  const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => {
      const done = (): void => {
        clearTimeout(timer);
        sleepers.delete(done);
        resolve();
      };
      const timer = setTimeout(done, ms);
      sleepers.add(done);
    });

  async function lane(index: number): Promise<void> {
    let offset = index % options.queues.length;
    let errorBackoff = options.pollIntervalMs;
    while (!stopping) {
      let worked = false;
      try {
        for (let i = 0; i < options.queues.length && !stopping; i += 1) {
          const queue = options.queues[(offset + i) % options.queues.length] as string;
          const [job] = await claimJobs(options.workerId, queue, 1);
          if (!job) continue;
          inFlight.add(job.id);
          try {
            await runClaimedJob(job, { signal: abort.signal, logger: log });
          } finally {
            inFlight.delete(job.id);
            stats.processed += 1;
          }
          offset = (offset + i + 1) % options.queues.length; // next round starts after the queue just served
          worked = true;
          break;
        }
        errorBackoff = options.pollIntervalMs;
      } catch (error) {
        stats.loopErrors += 1;
        log.error("worker lane error; backing off", { lane: index, err: error });
        await sleep(errorBackoff);
        errorBackoff = Math.min(errorBackoff * 2, MAX_ERROR_BACKOFF_MS);
        continue;
      }
      if (worked || stopping) continue;
      if (options.drain) {
        idleLanes += 1;
        if (idleLanes >= options.concurrency) {
          stopping = true;
          wake();
        }
        return;
      }
      await sleep(options.pollIntervalMs);
    }
  }

  async function schedulerTick(): Promise<void> {
    try {
      const result = await runSchedulerTick();
      if (result.leader && (result.enqueued.length > 0 || result.requeued + result.dead + result.superseded > 0)) {
        log.info("scheduler tick", {
          enqueued: result.enqueued,
          requeued: result.requeued,
          dead: result.dead,
          superseded: result.superseded,
        });
      }
      if (result.enqueued.length > 0 || result.requeued > 0) wake();
    } catch (error) {
      stats.loopErrors += 1;
      log.error("scheduler tick failed", { err: error });
    }
  }

  async function heartbeat(): Promise<void> {
    if (inFlight.size === 0) return;
    try {
      await extendLeases([...inFlight], options.workerId);
    } catch (error) {
      stats.loopErrors += 1;
      log.warn("lease heartbeat failed", { err: error });
    }
  }

  // The first scheduler tick runs before the lanes start, so a `drain` run also picks up due recurring jobs.
  const firstTick = options.scheduler ? schedulerTick() : Promise.resolve();
  if (options.scheduler) timers.push(setInterval(() => void schedulerTick(), options.schedulerIntervalMs));
  timers.push(setInterval(() => void heartbeat(), options.heartbeatIntervalMs));
  for (const timer of timers) timer.unref();

  const listen = deps.listen === undefined ? listenWithPg : deps.listen;
  if (options.listen && listen) {
    listen((queue) => {
      if (servedQueues.has(queue)) wake();
    }, log)
      .then((stop) => {
        if (stopping) void stop();
        else unlisten = stop;
      })
      .catch((error: unknown) => log.warn("LISTEN unavailable; polling only", { err: error }));
  }

  log.info("worker started", { queues: options.queues, concurrency: options.concurrency, drain: options.drain });
  const lanes = Array.from({ length: options.concurrency }, (_, index) => firstTick.then(() => lane(index)));
  const done = Promise.all(lanes).then(async () => {
    for (const timer of timers) clearInterval(timer);
    if (unlisten) await unlisten();
    log.info("worker stopped", { processed: stats.processed });
  });

  async function stop(reason = "stop requested"): Promise<void> {
    stopPromise ??= (async () => {
      log.info("worker stopping", { reason, inFlight: inFlight.size });
      stopping = true;
      wake();
      const timedOut = await Promise.race([
        done.then(() => false),
        new Promise<boolean>((resolve) => setTimeout(() => resolve(true), options.shutdownTimeoutMs).unref()),
      ]);
      if (timedOut) {
        log.warn("in-flight jobs did not finish in time; aborting them", { inFlight: [...inFlight] });
        abort.abort(new Error("worker shutting down"));
        await Promise.race([done, new Promise((resolve) => setTimeout(resolve, GRACE_AFTER_ABORT_MS).unref())]);
      }
    })();
    return stopPromise;
  }

  return {
    workerId: options.workerId,
    done,
    stop,
    wake,
    stats: () => ({ processed: stats.processed, inFlight: inFlight.size, loopErrors: stats.loopErrors }),
  };
}
