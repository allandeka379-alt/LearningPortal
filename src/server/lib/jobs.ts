import "server-only";
import { z } from "zod";
import { Prisma, type JobStatus } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import { AppError, isAppError } from "./errors";
import { logger as rootLogger, scrubString, type Logger } from "./logger";

/**
 * Postgres job queue (§38 background jobs; ARCHITECTURE §3.7). The `Job` table is the queue; `src/worker` runs it.
 *
 * - {@link enqueue} inside the same transaction as the domain write (pass `client: tx`): a transactional outbox for
 *   free. A `dedupeKey` is unique while the job is PENDING (partial unique index), so a duplicate enqueue is a no-op,
 *   while a follow-up may still be queued while one RUNS (debounced rollups never miss a change).
 * - {@link claimJobs}: one atomic `UPDATE … WHERE id IN (SELECT … FOR UPDATE SKIP LOCKED)`: concurrent workers never
 *   claim the same job and never block each other.
 * - {@link failJob}: retryable failures go back to PENDING with exponential backoff (`10 s · 2^attempts`, capped at
 *   1 h, ±10 % jitter); after `maxAttempts` the job is DEAD (dead letter). Permanent failures (invalid payload,
 *   {@link PermanentJobError}) are FAILED immediately. Operators retry or cancel DEAD / FAILED jobs from /admin/jobs
 *   (src/server/ops/dead-letters.ts, audited `job.retry` / `job.cancel`).
 * - Leases: RUNNING jobs whose `lockedAt` is older than {@link JOB_LEASE_MS} are reclaimed ({@link reclaimExpiredLeases});
 *   the worker heartbeats long jobs ({@link extendLeases}).
 * - Handlers are registered with {@link registerJobHandler} (Zod schema per type) and MUST be idempotent: a job can run
 *   more than once (lease expiry, crash after the side effect but before completion).
 * - Payloads carry ids only — never PII or secrets (they are visible in the admin queue view).
 * - Periodic work: {@link registerRecurringJob} + {@link runSchedulerTick} (one leader per tick via a transaction-level
 *   advisory lock; a period-bucket dedupe key makes each period run once).
 *
 * Time: every timestamp that is later compared with the database clock (`runAt`, `lockedAt`) is written with SQL
 * `now()` arithmetic or an explicit-UTC ISO parameter, and raw reads return epoch milliseconds. This keeps the queue
 * correct even when the database session TimeZone is not UTC (Prisma's pg adapter sends and reads timestamps without
 * an offset).
 */

/** Queues isolate workloads so an AI backlog never delays payments. Any `^[a-z][a-z0-9_-]{0,31}$` name is accepted. */
export const JOB_QUEUES = ["default", "payments", "notifications", "ai", "rollups", "search", "imports"] as const;
export type KnownJobQueue = (typeof JOB_QUEUES)[number];

export const JOB_LEASE_MS = 5 * 60_000;
export const DEFAULT_MAX_ATTEMPTS = 5;
const BACKOFF_BASE_MS = 10_000;
const BACKOFF_MAX_MS = 3_600_000;
const MAX_ERROR_LENGTH = 2_000;
const MAX_RESULT_BYTES = 8_192;

const QUEUE_PATTERN = /^[a-z][a-z0-9_-]{0,31}$/;
const TYPE_PATTERN = /^[a-z][A-Za-z0-9_]*(\.[a-z][A-Za-z0-9_]*)+$/;
const RECURRING_NAME_PATTERN = /^[A-Za-z0-9_.-]{1,100}$/;

export type JsonObject = { [key: string]: unknown };

/** Thrown by a handler for failures that retrying cannot fix (the job becomes FAILED immediately). */
export class PermanentJobError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "PermanentJobError";
  }
}

function assertQueue(queue: string): void {
  if (!QUEUE_PATTERN.test(queue)) throw new Error(`jobs: invalid queue name "${queue}"`);
}

function assertType(type: string): void {
  if (type.length > 100 || !TYPE_PATTERN.test(type)) throw new Error(`jobs: invalid job type "${type}" (use "domain.action")`);
}

function toJsonText(value: unknown, what: string): string {
  const text = JSON.stringify(value);
  if (text === undefined) throw new Error(`jobs: ${what} must be JSON-serialisable`);
  return text;
}

// ---------------------------------------------------------------------------------------------------------------------
// Handler registry
// ---------------------------------------------------------------------------------------------------------------------

export interface JobContext {
  jobId: string;
  type: string;
  queue: string;
  /** 1-based attempt number of this run. */
  attempt: number;
  maxAttempts: number;
  workerId: string;
  /** Aborted when the worker is shutting down; long handlers should stop early and throw. */
  signal: AbortSignal;
  logger: Logger;
}

/** A job handler. Its return value (small JSON) is stored in `Job.result` for the admin view. */
export type JobHandler<P> = (payload: P, context: JobContext) => Promise<unknown>;

export interface JobHandlerOptions {
  /** Default queue for `enqueue(type, …)` (default "default"). */
  queue?: string;
  /** Default `maxAttempts` for `enqueue(type, …)` (default 5). */
  maxAttempts?: number;
}

export interface RegisteredJobHandler {
  type: string;
  schema: z.ZodType;
  handler: JobHandler<unknown>;
  queue: string;
  maxAttempts: number;
}

const handlers = new Map<string, RegisteredJobHandler>();

/**
 * Registers the handler for a job type (call from `src/worker/handlers.ts`). The payload is parsed with `schema` before
 * the handler runs; an invalid payload fails the job permanently. Registering a type twice throws.
 *
 * @example
 * registerJobHandler("search.index", z.object({ entityType: z.string(), id: z.uuid() }), async (payload, ctx) => {
 *   await indexEntity(payload.entityType, payload.id);
 * }, { queue: "search" });
 */
export function registerJobHandler<S extends z.ZodType>(
  type: string,
  schema: S,
  handler: JobHandler<z.output<S>>,
  options: JobHandlerOptions = {},
): void {
  assertType(type);
  const queue = options.queue ?? "default";
  assertQueue(queue);
  const maxAttempts = options.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 100) {
    throw new Error("jobs: maxAttempts must be an integer between 1 and 100");
  }
  if (handlers.has(type)) throw new Error(`jobs: a handler for "${type}" is already registered`);
  handlers.set(type, { type, schema, handler: handler as JobHandler<unknown>, queue, maxAttempts });
}

/** The registered handler for `type`, if any (in this process). */
export function getJobHandler(type: string): RegisteredJobHandler | undefined {
  return handlers.get(type);
}

/** Job types registered in this process. */
export function registeredJobTypes(): string[] {
  return [...handlers.keys()];
}

// ---------------------------------------------------------------------------------------------------------------------
// Enqueue
// ---------------------------------------------------------------------------------------------------------------------

export interface EnqueueOptions {
  /** Earliest run time (default now). */
  runAt?: Date;
  /** Alternative to `runAt`: run after this many milliseconds. */
  delayMs?: number;
  /** Queue (default: the registered handler's queue, else "default"). */
  queue?: string;
  /** Lower runs first (SmallInt, default 0). */
  priority?: number;
  /** While a PENDING job with this key exists, enqueueing again is a no-op (≤ 255 chars). */
  dedupeKey?: string;
  maxAttempts?: number;
  /** Transaction client for outbox-style enqueue in the same transaction as the domain write. */
  client?: DbClient;
}

export interface EnqueueResult {
  /** The new job id, or the existing PENDING job's id when deduplicated (rarely `null` if it was claimed meanwhile). */
  id: string | null;
  created: boolean;
}

/**
 * Adds a job. When a handler for `type` is registered in this process, the payload is validated with its schema first.
 *
 * @throws Error for programming mistakes (bad type/queue/priority, payload not matching the registered schema).
 */
export async function enqueue(type: string, payload: JsonObject = {}, options: EnqueueOptions = {}): Promise<EnqueueResult> {
  assertType(type);
  const registered = handlers.get(type);
  if (registered) {
    const parsed = registered.schema.safeParse(payload);
    if (!parsed.success) {
      throw new Error(`jobs: payload for "${type}" does not match its schema: ${parsed.error.issues.map((i) => i.message).join("; ")}`);
    }
  }
  const queue = options.queue ?? registered?.queue ?? "default";
  assertQueue(queue);
  const priority = options.priority ?? 0;
  if (!Number.isInteger(priority) || priority < -32_768 || priority > 32_767) throw new Error("jobs: priority must be a SmallInt");
  const maxAttempts = options.maxAttempts ?? registered?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 100) {
    throw new Error("jobs: maxAttempts must be an integer between 1 and 100");
  }
  const dedupeKey = options.dedupeKey ?? null;
  if (dedupeKey !== null && (dedupeKey.length === 0 || dedupeKey.length > 255)) throw new Error("jobs: dedupeKey must be 1-255 chars");
  const runAt = options.runAt ?? (options.delayMs !== undefined ? new Date(Date.now() + options.delayMs) : null);
  // Explicit-UTC ISO string: a bare Date parameter would be read in the session time zone.
  const runAtIso = runAt === null ? null : runAt.toISOString();
  const payloadJson = toJsonText(payload, "payload");
  const client = options.client ?? db;

  const rows = await client.$queryRaw<{ id: string }[]>`
    INSERT INTO "Job" ("id", "queue", "type", "payload", "status", "priority", "runAt", "maxAttempts", "dedupeKey",
                       "createdAt", "updatedAt")
    VALUES (uuidv7(), ${queue}, ${type}, ${payloadJson}::jsonb, 'PENDING', ${priority}::smallint,
            COALESCE(${runAtIso}::timestamptz, now()), ${maxAttempts}::smallint, ${dedupeKey}, now(), now())
    ON CONFLICT ("dedupeKey") WHERE "dedupeKey" IS NOT NULL AND "status" = 'PENDING' DO NOTHING
    RETURNING "id"`;
  const created = rows[0];
  if (created) return { id: created.id, created: true };

  const existing = await client.$queryRaw<{ id: string }[]>`
    SELECT "id" FROM "Job" WHERE "dedupeKey" = ${dedupeKey} AND "status" = 'PENDING' LIMIT 1`;
  return { id: existing[0]?.id ?? null, created: false };
}

// ---------------------------------------------------------------------------------------------------------------------
// Claim / complete / fail
// ---------------------------------------------------------------------------------------------------------------------

/** A job claimed by a worker (status RUNNING, leased to `lockedBy`). */
export interface ClaimedJob {
  id: string;
  queue: string;
  type: string;
  payload: unknown;
  /** Attempts including this run (1 on the first run). */
  attempts: number;
  maxAttempts: number;
  priority: number;
  runAt: Date;
  dedupeKey: string | null;
  lockedBy: string;
  createdAt: Date;
}

/**
 * Atomically claims up to `batch` due PENDING jobs of `queue` for `workerId` (lowest priority value first, then oldest
 * `runAt`). Uses `FOR UPDATE SKIP LOCKED`, so concurrent claimers get disjoint jobs without waiting on each other.
 */
export async function claimJobs(workerId: string, queue: string, batch = 1): Promise<ClaimedJob[]> {
  assertQueue(queue);
  if (workerId.length === 0 || workerId.length > 128) throw new Error("jobs: workerId must be 1-128 chars");
  if (!Number.isInteger(batch) || batch < 1 || batch > 1_000) throw new Error("jobs: batch must be 1-1000");

  const rows = await db.$queryRaw<(Omit<ClaimedJob, "lockedBy" | "runAt" | "createdAt"> & { runAtMs: number; createdAtMs: number })[]>`
    UPDATE "Job"
       SET "status" = 'RUNNING', "lockedAt" = now(), "lockedBy" = ${workerId}, "attempts" = "attempts" + 1,
           "updatedAt" = now()
     WHERE "id" IN (
       SELECT "id" FROM "Job"
        WHERE "queue" = ${queue} AND "status" = 'PENDING' AND "runAt" <= now() AND "attempts" < "maxAttempts"
        ORDER BY "priority", "runAt"
        LIMIT ${batch}
        FOR UPDATE SKIP LOCKED)
    RETURNING "id", "queue", "type", "payload", "attempts", "maxAttempts", "priority", "dedupeKey",
              (extract(epoch FROM "runAt") * 1000)::float8 AS "runAtMs",
              (extract(epoch FROM "createdAt") * 1000)::float8 AS "createdAtMs"`;
  return rows
    .map(({ runAtMs, createdAtMs, ...row }) => ({
      ...row,
      runAt: new Date(runAtMs),
      createdAt: new Date(createdAtMs),
      lockedBy: workerId,
    }))
    .sort((a, b) => a.priority - b.priority || a.runAt.getTime() - b.runAt.getTime());
}

function resultJson(result: unknown): Prisma.InputJsonValue | typeof Prisma.DbNull {
  if (result === undefined || result === null) return Prisma.DbNull;
  const text = JSON.stringify(typeof result === "object" && !Array.isArray(result) ? result : { value: result });
  if (text === undefined) return Prisma.DbNull;
  if (text.length > MAX_RESULT_BYTES) return { truncated: true, bytes: text.length };
  return JSON.parse(text) as Prisma.InputJsonValue;
}

/**
 * Marks a RUNNING job SUCCEEDED. Only the worker holding the lease can complete it.
 *
 * @returns `false` when the job is no longer leased to `workerId` (lease expired and reclaimed, or cancelled).
 */
export async function completeJob(jobId: string, workerId: string, result?: unknown): Promise<boolean> {
  const updated = await db.job.updateMany({
    where: { id: jobId, status: "RUNNING", lockedBy: workerId },
    data: { status: "SUCCEEDED", completedAt: new Date(), result: resultJson(result) },
  });
  return updated.count === 1;
}

/** Retry delay after `attempts` failed runs: `min(10 s · 2^attempts, 1 h)` with ±10 % jitter (thundering-herd guard). */
export function retryDelayMs(attempts: number, random: () => number = Math.random): number {
  const base = Math.min(BACKOFF_BASE_MS * 2 ** Math.max(0, attempts), BACKOFF_MAX_MS);
  const jittered = base * (0.9 + 0.2 * random());
  return Math.round(Math.min(jittered, BACKOFF_MAX_MS));
}

export interface FailureDecision {
  /** CANCELLED = superseded: a PENDING job with the same dedupe key will do the work, so no retry is queued. */
  status: Extract<JobStatus, "PENDING" | "FAILED" | "DEAD" | "CANCELLED">;
  /** Backoff before the next run when retried. */
  delayMs: number | null;
  /** Approximate next run time (app clock) when retried; the stored value is database `now() + delay`. */
  runAt: Date | null;
}

/** Pure retry policy: permanent → FAILED; attempts exhausted → DEAD; otherwise PENDING after {@link retryDelayMs}. */
export function decideJobFailure(input: {
  attempts: number;
  maxAttempts: number;
  permanent: boolean;
  now: Date;
  random?: () => number;
}): FailureDecision {
  if (input.permanent) return { status: "FAILED", delayMs: null, runAt: null };
  if (input.attempts >= input.maxAttempts) return { status: "DEAD", delayMs: null, runAt: null };
  const delayMs = retryDelayMs(input.attempts, input.random);
  return { status: "PENDING", delayMs, runAt: new Date(input.now.getTime() + delayMs) };
}

/** Log-safe, length-limited description of an error for `Job.lastError` (emails / phone numbers masked). */
export function describeJobError(error: unknown): string {
  let text: string;
  if (isAppError(error)) text = `AppError(${error.code}): ${error.message}`;
  else if (error instanceof z.ZodError) text = `Invalid payload: ${error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`;
  else if (error instanceof Error) text = `${error.name}: ${error.message}`;
  else text = String(error);
  return scrubString(text).slice(0, MAX_ERROR_LENGTH);
}

/** True for errors that retrying cannot fix. */
export function isPermanentJobError(error: unknown): boolean {
  if (error instanceof PermanentJobError || error instanceof z.ZodError) return true;
  return isAppError(error) && (error.code === "VALIDATION" || error.code === "BAD_REQUEST" || error.code === "FORBIDDEN");
}

/**
 * Records a failed run of a RUNNING job leased to `workerId`: PENDING with backoff, DEAD after `maxAttempts`, FAILED
 * when `permanent`, or CANCELLED (superseded) when a PENDING job with the same dedupe key is already queued.
 *
 * @returns the decision, or `null` when the job is no longer leased to this worker.
 */
export async function failJob(
  jobId: string,
  workerId: string,
  error: unknown,
  options: { permanent?: boolean; now?: Date; random?: () => number } = {},
): Promise<FailureDecision | null> {
  const lastError = describeJobError(error);
  return db.$transaction(async (tx) => {
    const rows = await tx.$queryRaw<{ attempts: number; maxAttempts: number; hasPendingTwin: boolean }[]>`
      SELECT j."attempts", j."maxAttempts",
             (j."dedupeKey" IS NOT NULL AND EXISTS (
               SELECT 1 FROM "Job" p WHERE p."dedupeKey" = j."dedupeKey" AND p."status" = 'PENDING')) AS "hasPendingTwin"
        FROM "Job" j
       WHERE j."id" = ${jobId}::uuid AND j."status" = 'RUNNING' AND j."lockedBy" = ${workerId}
       FOR UPDATE OF j`;
    const job = rows[0];
    if (!job) return null;
    let decision = decideJobFailure({
      attempts: job.attempts,
      maxAttempts: job.maxAttempts,
      permanent: options.permanent ?? isPermanentJobError(error),
      now: options.now ?? new Date(),
      ...(options.random ? { random: options.random } : {}),
    });
    // A follow-up with the same dedupe key is already queued (allowed while this one ran): it will do the work, and
    // re-queueing this one would violate the PENDING-only unique key.
    if (decision.status === "PENDING" && job.hasPendingTwin) decision = { status: "CANCELLED", delayMs: null, runAt: null };
    if (decision.status === "PENDING") {
      await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = 'PENDING', "runAt" = now() + make_interval(secs => ${(decision.delayMs ?? 0) / 1000}::double precision),
               "lockedAt" = NULL, "lockedBy" = NULL, "lastError" = ${lastError}, "updatedAt" = now()
         WHERE "id" = ${jobId}::uuid`;
    } else {
      const message =
        decision.status === "CANCELLED" ? `${lastError} (superseded by a queued job with the same dedupe key)` : lastError;
      await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = ${decision.status}::"JobStatus", "completedAt" = now(),
               "lastError" = ${message.slice(0, MAX_ERROR_LENGTH)}, "updatedAt" = now()
         WHERE "id" = ${jobId}::uuid`;
    }
    return decision;
  });
}

/** Heartbeat: refreshes the lease of RUNNING jobs still held by `workerId`. Returns the number of leases extended. */
export async function extendLeases(jobIds: readonly string[], workerId: string): Promise<number> {
  if (jobIds.length === 0) return 0;
  // Database clock (`now()`), the same clock the claim and the lease reclaim use.
  return db.$executeRaw`
    UPDATE "Job" SET "lockedAt" = now(), "updatedAt" = now()
     WHERE "id" = ANY(${[...jobIds]}::uuid[]) AND "status" = 'RUNNING' AND "lockedBy" = ${workerId}`;
}

/** An expired RUNNING job considered by {@link planLeaseReclaim}. */
export interface ExpiredLease {
  id: string;
  dedupeKey: string | null;
  attempts: number;
  maxAttempts: number;
  createdAtMs: number;
}

export interface LeaseReclaimPlan {
  requeue: string[];
  dead: string[];
  /** Superseded by a PENDING job with the same dedupe key (or by a newer expired twin): CANCELLED. */
  superseded: string[];
}

/**
 * Pure plan for expired leases: no attempts left -> DEAD; otherwise back to PENDING, except that at most one job per
 * dedupe key may be PENDING (partial unique index), so a job whose key already has a PENDING job (or a newer expired
 * twin being re-queued) is superseded instead.
 */
export function planLeaseReclaim(expired: readonly ExpiredLease[], pendingKeys: ReadonlySet<string>): LeaseReclaimPlan {
  const plan: LeaseReclaimPlan = { requeue: [], dead: [], superseded: [] };
  const takenKeys = new Set(pendingKeys);
  const newestFirst = [...expired].sort((a, b) => b.createdAtMs - a.createdAtMs || (a.id < b.id ? 1 : -1));
  for (const job of newestFirst) {
    if (job.attempts >= job.maxAttempts) plan.dead.push(job.id);
    else if (job.dedupeKey !== null && takenKeys.has(job.dedupeKey)) plan.superseded.push(job.id);
    else {
      plan.requeue.push(job.id);
      if (job.dedupeKey !== null) takenKeys.add(job.dedupeKey);
    }
  }
  return plan;
}

const LEASE_EXPIRED_MESSAGE = "Lease expired: the worker stopped or the job ran longer than the lease without a heartbeat";

/**
 * Reclaims RUNNING jobs whose lease expired (worker crashed or was killed): back to PENDING, DEAD when no attempts
 * remain, or CANCELLED when a PENDING job with the same dedupe key already exists ({@link planLeaseReclaim}).
 * Locks with `SKIP LOCKED`, so it never blocks on a job a worker is completing right now. At most 1,000 per call.
 */
export async function reclaimExpiredLeases(
  leaseMs: number = JOB_LEASE_MS,
  client: DbClient = db,
): Promise<{ requeued: string[]; dead: string[]; superseded: string[] }> {
  const run = async (tx: DbClient) => {
    const expired = await tx.$queryRaw<ExpiredLease[]>`
      SELECT "id", "dedupeKey", "attempts", "maxAttempts",
             (extract(epoch FROM "createdAt") * 1000)::float8 AS "createdAtMs"
        FROM "Job"
       WHERE "status" = 'RUNNING' AND "lockedAt" < now() - make_interval(secs => ${leaseMs / 1000}::double precision)
       ORDER BY "lockedAt"
       LIMIT 1000
       FOR UPDATE SKIP LOCKED`;
    if (expired.length === 0) return { requeued: [], dead: [], superseded: [] };
    const keys = [...new Set(expired.map((job) => job.dedupeKey).filter((key): key is string => key !== null))];
    const pending =
      keys.length === 0
        ? []
        : await tx.$queryRaw<{ dedupeKey: string }[]>`
            SELECT "dedupeKey" FROM "Job" WHERE "status" = 'PENDING' AND "dedupeKey" = ANY(${keys}::varchar[])`;
    const plan = planLeaseReclaim(expired, new Set(pending.map((row) => row.dedupeKey)));
    if (plan.requeue.length > 0) {
      await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = 'PENDING', "lockedAt" = NULL, "lockedBy" = NULL, "lastError" = ${LEASE_EXPIRED_MESSAGE},
               "updatedAt" = now()
         WHERE "id" = ANY(${plan.requeue}::uuid[])`;
    }
    if (plan.dead.length > 0) {
      await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = 'DEAD', "completedAt" = now(), "lockedAt" = NULL, "lockedBy" = NULL,
               "lastError" = ${LEASE_EXPIRED_MESSAGE}, "updatedAt" = now()
         WHERE "id" = ANY(${plan.dead}::uuid[])`;
    }
    if (plan.superseded.length > 0) {
      await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = 'CANCELLED', "completedAt" = now(), "lockedAt" = NULL, "lockedBy" = NULL,
               "lastError" = ${`${LEASE_EXPIRED_MESSAGE} (superseded by a queued job with the same dedupe key)`},
               "updatedAt" = now()
         WHERE "id" = ANY(${plan.superseded}::uuid[])`;
    }
    return { requeued: plan.requeue, dead: plan.dead, superseded: plan.superseded };
  };
  // Reuse the caller's transaction (the scheduler tick) when given one; otherwise use a short transaction.
  return client === db ? db.$transaction((tx) => run(tx)) : run(client);
}

// ---------------------------------------------------------------------------------------------------------------------
// Running handlers
// ---------------------------------------------------------------------------------------------------------------------

export type JobOutcome = "succeeded" | "retry" | "failed" | "dead" | "superseded" | "lost";

/**
 * Runs one claimed job through its registered handler and records the outcome. Never throws for handler errors.
 * A job type with no handler in this process is retried with backoff (a newer worker may know it) and eventually DEAD.
 */
export async function runClaimedJob(
  job: ClaimedJob,
  options: { signal?: AbortSignal; logger?: Logger } = {},
): Promise<JobOutcome> {
  const log = (options.logger ?? rootLogger).child({ jobId: job.id, jobType: job.type, queue: job.queue, attempt: job.attempts });
  const registered = handlers.get(job.type);
  const started = Date.now();
  try {
    if (!registered) throw new Error(`No handler registered for job type "${job.type}" in this worker`);
    const payload = registered.schema.parse(job.payload);
    const result = await registered.handler(payload, {
      jobId: job.id,
      type: job.type,
      queue: job.queue,
      attempt: job.attempts,
      maxAttempts: job.maxAttempts,
      workerId: job.lockedBy,
      signal: options.signal ?? new AbortController().signal,
      logger: log,
    });
    const completed = await completeJob(job.id, job.lockedBy, result);
    log.info(completed ? "job succeeded" : "job finished after losing its lease", { durationMs: Date.now() - started });
    return completed ? "succeeded" : "lost";
  } catch (error) {
    const decision = await failJob(job.id, job.lockedBy, error, { permanent: registered ? isPermanentJobError(error) : false });
    const outcomes: Record<FailureDecision["status"], JobOutcome> = {
      PENDING: "retry",
      DEAD: "dead",
      FAILED: "failed",
      CANCELLED: "superseded",
    };
    const outcome: JobOutcome = decision === null ? "lost" : outcomes[decision.status];
    const fields = { durationMs: Date.now() - started, outcome, err: error };
    if (outcome === "retry" || outcome === "superseded") log.warn("job failed; it will run again", fields);
    else log.error("job failed", fields);
    return outcome;
  }
}

/**
 * Claims up to `batch` jobs from `queue` and runs them one after another. Returns how many were processed.
 * Used by the worker loop and by tests.
 */
export async function processJobs(options: {
  workerId: string;
  queue: string;
  batch?: number;
  signal?: AbortSignal;
  logger?: Logger;
}): Promise<number> {
  const jobs = await claimJobs(options.workerId, options.queue, options.batch ?? 1);
  for (const job of jobs) {
    await runClaimedJob(job, { ...(options.signal ? { signal: options.signal } : {}), ...(options.logger ? { logger: options.logger } : {}) });
  }
  return jobs.length;
}

// ---------------------------------------------------------------------------------------------------------------------
// Admin operations and maintenance
// ---------------------------------------------------------------------------------------------------------------------

/** Cancels a PENDING job. Returns `false` when it is not PENDING (already running or finished). */
export async function cancelJob(jobId: string): Promise<boolean> {
  const updated = await db.job.updateMany({
    where: { id: jobId, status: "PENDING" },
    data: { status: "CANCELLED", completedAt: new Date() },
  });
  return updated.count === 1;
}

/**
 * Re-queues a DEAD, FAILED or CANCELLED job with a fresh attempt budget (the caller audits `job.retry`). The /admin/jobs
 * retry button uses the same reset inside its audited transaction (src/server/ops/dead-letters.ts).
 *
 * @throws AppError CONFLICT when another PENDING job holds the same dedupe key.
 */
export async function retryJob(jobId: string): Promise<boolean> {
  try {
    const updated = await db.job.updateMany({
      where: { id: jobId, status: { in: ["DEAD", "FAILED", "CANCELLED"] } },
      data: { status: "PENDING", attempts: 0, runAt: new Date(), completedAt: null, lockedAt: null, lockedBy: null },
    });
    return updated.count === 1;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw AppError.conflict("An identical job is already queued.");
    }
    throw error;
  }
}

/**
 * Deletes finished jobs: SUCCEEDED / CANCELLED after `succeededDays` (default 7, ARCHITECTURE §4.13) and FAILED / DEAD
 * after `failedDays` (default 30, so dead letters stay visible for triage). Batched; returns rows deleted.
 */
export async function purgeFinishedJobs(
  options: { succeededDays?: number; failedDays?: number; batchSize?: number; maxBatches?: number } = {},
): Promise<number> {
  const succeededDays = options.succeededDays ?? 7;
  const failedDays = options.failedDays ?? 30;
  const batchSize = options.batchSize ?? 5_000;
  const maxBatches = options.maxBatches ?? 100;
  let total = 0;
  for (let i = 0; i < maxBatches; i += 1) {
    const deleted = await db.$executeRaw`
      DELETE FROM "Job" WHERE "id" IN (
        SELECT "id" FROM "Job"
         WHERE ("status" IN ('SUCCEEDED', 'CANCELLED')
                AND "completedAt" < now() - make_interval(days => ${succeededDays}::int))
            OR ("status" IN ('FAILED', 'DEAD')
                AND "completedAt" < now() - make_interval(days => ${failedDays}::int))
         LIMIT ${batchSize})`;
    total += deleted;
    if (deleted < batchSize) break;
  }
  return total;
}

// ---------------------------------------------------------------------------------------------------------------------
// Recurring jobs (scheduler)
// ---------------------------------------------------------------------------------------------------------------------

export interface RecurringJobDefinition {
  /** Unique schedule name, used in the period dedupe key (`cron:<name>:<periodStart>`). */
  name: string;
  /** Period length in minutes (e.g. 5, 60, 1440). */
  everyMinutes: number;
  /** Job type to enqueue (its handler must be registered in some worker). */
  type: string;
  /** Shifts period boundaries, in minutes from the UTC epoch grid (e.g. 1440 + offset 900 = daily at 15:00 UTC). */
  offsetMinutes: number;
  queue?: string;
  priority?: number;
  /** Extra payload; the scheduler adds `periodStart` (ISO string). */
  payload: JsonObject;
}

const recurring = new Map<string, RecurringJobDefinition>();

/**
 * Registers a periodic job: each period of `everyMinutes` (aligned to the UTC epoch, shifted by `offsetMinutes`)
 * enqueues `type` once, with payload `{ ...payload, periodStart }`. Daily jobs at a local time: Africa/Harare is UTC+2,
 * so "daily 02:00 CAT" is `registerRecurringJob(name, 1440, type, { offsetMinutes: 0 })`.
 */
export function registerRecurringJob(
  name: string,
  everyMinutes: number,
  type: string,
  options: { offsetMinutes?: number; queue?: string; priority?: number; payload?: JsonObject } = {},
): void {
  if (!RECURRING_NAME_PATTERN.test(name)) throw new Error(`jobs: invalid recurring job name "${name}"`);
  if (!Number.isInteger(everyMinutes) || everyMinutes < 1 || everyMinutes > 31 * 24 * 60) {
    throw new Error("jobs: everyMinutes must be an integer between 1 and 44640");
  }
  assertType(type);
  if (options.queue !== undefined) assertQueue(options.queue);
  const offsetMinutes = options.offsetMinutes ?? 0;
  if (!Number.isInteger(offsetMinutes) || offsetMinutes < 0 || offsetMinutes >= everyMinutes) {
    throw new Error("jobs: offsetMinutes must be an integer in [0, everyMinutes)");
  }
  if (recurring.has(name)) throw new Error(`jobs: recurring job "${name}" is already registered`);
  recurring.set(name, {
    name,
    everyMinutes,
    type,
    offsetMinutes,
    payload: options.payload ?? {},
    ...(options.queue !== undefined ? { queue: options.queue } : {}),
    ...(options.priority !== undefined ? { priority: options.priority } : {}),
  });
}

/** Recurring jobs registered in this process. */
export function recurringJobs(): RecurringJobDefinition[] {
  return [...recurring.values()];
}

/** Start of the period containing `now` (pure). */
export function recurringPeriodStart(now: Date, everyMinutes: number, offsetMinutes = 0): Date {
  const periodMs = everyMinutes * 60_000;
  const offsetMs = offsetMinutes * 60_000;
  return new Date(Math.floor((now.getTime() - offsetMs) / periodMs) * periodMs + offsetMs);
}

/**
 * Enqueues the current period's run of a recurring job unless that period already has a job in ANY state (so a
 * finished or running period is never re-run, and two schedulers cannot double-enqueue). Returns the new job id or
 * `null` when the period was already scheduled.
 */
export async function enqueueRecurring(
  definition: RecurringJobDefinition,
  now: Date = new Date(),
  client: DbClient = db,
): Promise<string | null> {
  const periodStart = recurringPeriodStart(now, definition.everyMinutes, definition.offsetMinutes);
  const dedupeKey = `cron:${definition.name}:${periodStart.toISOString()}`;
  const registered = handlers.get(definition.type);
  const queue = definition.queue ?? registered?.queue ?? "default";
  const maxAttempts = registered?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const payloadJson = toJsonText({ ...definition.payload, periodStart: periodStart.toISOString() }, "payload");
  const rows = await client.$queryRaw<{ id: string }[]>`
    INSERT INTO "Job" ("id", "queue", "type", "payload", "status", "priority", "runAt", "maxAttempts", "dedupeKey",
                       "createdAt", "updatedAt")
    SELECT uuidv7(), ${queue}, ${definition.type}, ${payloadJson}::jsonb, 'PENDING', ${definition.priority ?? 0}::smallint,
           now(), ${maxAttempts}::smallint, ${dedupeKey}, now(), now()
     WHERE NOT EXISTS (
       SELECT 1 FROM "Job" j
        WHERE j."status" IN ('PENDING', 'RUNNING', 'SUCCEEDED', 'FAILED', 'DEAD', 'CANCELLED')
          AND j."queue" = ${queue} AND j."runAt" >= ${periodStart.toISOString()}::timestamptz
          AND j."dedupeKey" = ${dedupeKey})
    ON CONFLICT ("dedupeKey") WHERE "dedupeKey" IS NOT NULL AND "status" = 'PENDING' DO NOTHING
    RETURNING "id"`;
  return rows[0]?.id ?? null;
}

export interface SchedulerTickResult {
  /** False when another worker held the scheduler lock for this tick. */
  leader: boolean;
  /** Names of recurring jobs enqueued for a new period. */
  enqueued: string[];
  requeued: number;
  dead: number;
  superseded: number;
}

/**
 * One scheduler tick: if this process wins the transaction-level advisory lock (one leader per tick, safe behind
 * transaction-pooling poolers), enqueue every due recurring job and reclaim expired leases.
 */
export async function runSchedulerTick(
  options: { now?: Date; definitions?: RecurringJobDefinition[]; leaseMs?: number } = {},
): Promise<SchedulerTickResult> {
  const now = options.now ?? new Date();
  const definitions = options.definitions ?? recurringJobs();
  return db.$transaction(async (tx) => {
    const lock = await tx.$queryRaw<{ locked: boolean }[]>`SELECT pg_try_advisory_xact_lock(hashtext('dzidza:job-scheduler')) AS "locked"`;
    if (!lock[0]?.locked) return { leader: false, enqueued: [], requeued: 0, dead: 0, superseded: 0 };
    const enqueued: string[] = [];
    for (const definition of definitions) {
      if ((await enqueueRecurring(definition, now, tx)) !== null) enqueued.push(definition.name);
    }
    const reclaimed = await reclaimExpiredLeases(options.leaseMs ?? JOB_LEASE_MS, tx);
    return {
      leader: true,
      enqueued,
      requeued: reclaimed.requeued.length,
      dead: reclaimed.dead.length,
      superseded: reclaimed.superseded.length,
    };
  });
}
