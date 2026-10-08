import "server-only";
import { z } from "zod";
import { Prisma, type JobStatus, type Role } from "@/generated/prisma/client";
import { decodeCursor, encodeCursor, pageSizeSchema } from "@/server/cms/users/cursor";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/**
 * Dead-letter queue for operators (/admin/jobs; ARCHITECTURE §3.7). Lists jobs that stopped retrying: DEAD (attempts
 * exhausted, or a lease expired on the last attempt) and FAILED (permanent failure: invalid payload,
 * `PermanentJobError`, a validation / forbidden AppError). Two actions, both audited in the same transaction as the
 * change:
 *
 * - retry (`job.retry`): back to PENDING now with a fresh attempt budget (attempts reset to 0, the same reset as
 *   `retryJob` in lib/jobs, with the run time taken from the database clock). The last error stays on the row until the
 *   next run replaces it. Refused (CONFLICT) while another PENDING job holds the same dedupe key: that job will do the
 *   work.
 * - cancel (`job.cancel`): marks it CANCELLED, so it never runs again and leaves this list (the finished-job purge
 *   deletes cancelled rows after 7 days instead of 30).
 *
 * ADMIN / SUPER_ADMIN only. Payloads carry ids only (jobs.ts rule), so showing them leaks no personal data.
 */

export const DEAD_LETTER_STATUSES = ["DEAD", "FAILED"] as const satisfies readonly JobStatus[];
export type DeadLetterStatus = (typeof DEAD_LETTER_STATUSES)[number];

export interface OpsActor {
  userId: string;
  roles: readonly Role[];
}

function assertOperator(actor: OpsActor): void {
  if (!actor.roles.includes("ADMIN") && !actor.roles.includes("SUPER_ADMIN")) {
    throw AppError.forbidden("Only platform admins can manage background jobs.");
  }
}

export const deadLetterFilterSchema = z.object({
  status: z.enum(DEAD_LETTER_STATUSES).optional(),
  /** Exact job type ("notifications.send") or a prefix ending in "." ("notifications."). */
  type: z
    .string()
    .trim()
    .max(100)
    .regex(/^[A-Za-z0-9_.]+$/, { error: "Use a job type such as notifications.send, or a prefix such as notifications." })
    .optional(),
  queue: z.string().trim().max(32).regex(/^[a-z][a-z0-9_-]*$/).optional(),
  cursor: z.string().max(500).optional(),
  limit: pageSizeSchema,
});
export type DeadLetterFilter = z.input<typeof deadLetterFilterSchema>;

export interface DeadLetterJob {
  id: string;
  type: string;
  queue: string;
  status: DeadLetterStatus;
  attempts: number;
  maxAttempts: number;
  lastError: string | null;
  payload: unknown;
  dedupeKey: string | null;
  createdAt: Date;
  /** When it stopped retrying. */
  failedAt: Date;
}

export interface DeadLetterSummary {
  dead: number;
  failed: number;
  /** Counts per type, most first (at most 20 types). */
  byType: { type: string; dead: number; failed: number }[];
}

const JOB_SELECT = {
  id: true,
  type: true,
  queue: true,
  status: true,
  attempts: true,
  maxAttempts: true,
  lastError: true,
  payload: true,
  dedupeKey: true,
  createdAt: true,
  completedAt: true,
} as const satisfies Prisma.JobSelect;

type JobRow = Prisma.JobGetPayload<{ select: typeof JOB_SELECT }>;

function toItem(row: JobRow): DeadLetterJob {
  return {
    id: row.id,
    type: row.type,
    queue: row.queue,
    status: row.status as DeadLetterStatus,
    attempts: row.attempts,
    maxAttempts: row.maxAttempts,
    lastError: row.lastError,
    payload: row.payload,
    dedupeKey: row.dedupeKey,
    createdAt: row.createdAt,
    failedAt: row.completedAt ?? row.createdAt,
  };
}

/**
 * Dead and failed jobs, most recently failed first, keyset-paginated on (completedAt DESC, id DESC) over the
 * `Job(status, completedAt)` index.
 *
 * @throws AppError FORBIDDEN | VALIDATION | BAD_REQUEST (stale cursor)
 */
export async function listDeadLetterJobs(actor: OpsActor, filter: DeadLetterFilter = {}): Promise<{ items: DeadLetterJob[]; nextCursor: string | null }> {
  assertOperator(actor);
  const parsed = deadLetterFilterSchema.safeParse(filter);
  if (!parsed.success) throw AppError.fromZod(parsed.error, "Check the filters.");
  const input = parsed.data;
  const where: Prisma.JobWhereInput[] = [
    { status: input.status ? input.status : { in: [...DEAD_LETTER_STATUSES] } },
    { completedAt: { not: null } },
  ];
  if (input.type) where.push(input.type.endsWith(".") ? { type: { startsWith: input.type } } : { type: input.type });
  if (input.queue) where.push({ queue: input.queue });
  if (input.cursor) {
    const cursor = decodeCursor(input.cursor);
    where.push({ OR: [{ completedAt: { lt: cursor.createdAt } }, { completedAt: cursor.createdAt, id: { lt: cursor.id } }] });
  }
  const rows = await db.job.findMany({
    where: { AND: where },
    orderBy: [{ completedAt: "desc" }, { id: "desc" }],
    take: input.limit + 1,
    select: JOB_SELECT,
  });
  const items = rows.slice(0, input.limit).map(toItem);
  const last = items.at(-1);
  return { items, nextCursor: rows.length > input.limit && last ? encodeCursor({ createdAt: last.failedAt, id: last.id }) : null };
}

/** Totals for the page header: DEAD / FAILED counts and the types they come from. */
export async function getDeadLetterSummary(actor: OpsActor): Promise<DeadLetterSummary> {
  assertOperator(actor);
  const rows = await db.job.groupBy({
    by: ["type", "status"],
    where: { status: { in: [...DEAD_LETTER_STATUSES] } },
    _count: { _all: true },
  });
  const byType = new Map<string, { type: string; dead: number; failed: number }>();
  let dead = 0;
  let failed = 0;
  for (const row of rows) {
    const entry = byType.get(row.type) ?? { type: row.type, dead: 0, failed: 0 };
    if (row.status === "DEAD") {
      entry.dead += row._count._all;
      dead += row._count._all;
    } else {
      entry.failed += row._count._all;
      failed += row._count._all;
    }
    byType.set(row.type, entry);
  }
  const list = [...byType.values()].sort((a, b) => b.dead + b.failed - (a.dead + a.failed) || a.type.localeCompare(b.type)).slice(0, 20);
  return { dead, failed, byType: list };
}

const jobIdSchema = z.uuid();

function isUniqueViolation(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return true;
  // Raw statements surface the Postgres code (23505) instead of P2002.
  const text = error instanceof Error ? error.message : "";
  return /23505|unique constraint|Job_dedupeKey_pending_key/i.test(text);
}

async function loadDeadLetter(jobId: string): Promise<JobRow> {
  if (!jobIdSchema.safeParse(jobId).success) throw AppError.validation({ jobId: ["Invalid job."] });
  const row = await db.job.findUnique({ where: { id: jobId }, select: JOB_SELECT });
  if (!row) throw AppError.notFound("This job no longer exists (finished jobs are purged after 30 days).");
  if (!(DEAD_LETTER_STATUSES as readonly JobStatus[]).includes(row.status)) {
    throw AppError.conflict(`This job is ${row.status.toLowerCase()} now, so there is nothing to retry or cancel.`);
  }
  return row;
}

function jobAuditFields(row: JobRow) {
  return { type: row.type, queue: row.queue, previousStatus: row.status, attempts: row.attempts, maxAttempts: row.maxAttempts };
}

/**
 * Re-queues a DEAD or FAILED job with a fresh attempt budget (attempts reset to 0, runs now). Audited `job.retry`.
 *
 * @throws AppError FORBIDDEN | VALIDATION | NOT_FOUND | CONFLICT (not dead/failed any more, or an identical job is queued)
 */
export async function retryDeadLetterJob(actor: OpsActor, jobId: string, options: { request?: AuditRequestInfo | null } = {}): Promise<{ id: string; type: string }> {
  assertOperator(actor);
  const row = await loadDeadLetter(jobId);
  try {
    await db.$transaction(async (tx) => {
      const updated = await tx.$executeRaw`
        UPDATE "Job"
           SET "status" = 'PENDING', "attempts" = 0, "runAt" = now(), "completedAt" = NULL, "lockedAt" = NULL,
               "lockedBy" = NULL, "updatedAt" = now()
         WHERE "id" = ${row.id}::uuid AND "status" IN ('DEAD', 'FAILED')`;
      if (updated !== 1) throw AppError.conflict("This job changed meanwhile. Reload the page.");
      await auditInTx(tx, {
        actorUserId: actor.userId,
        actorRoles: actor.roles,
        action: AUDIT_ACTIONS.JOB_RETRY,
        entityType: "Job",
        entityId: row.id,
        metadata: jobAuditFields(row),
        request: options.request ?? null,
      });
    });
  } catch (error) {
    // Job_dedupeKey_pending_key: only one PENDING job per dedupe key.
    if (isUniqueViolation(error)) throw AppError.conflict("An identical job is already queued; it will do this work.");
    throw error;
  }
  return { id: row.id, type: row.type };
}

/**
 * Cancels a DEAD or FAILED job: it will never run again and leaves the dead-letter list. Audited `job.cancel` in the
 * same transaction.
 *
 * @throws AppError FORBIDDEN | VALIDATION | NOT_FOUND | CONFLICT (not dead/failed any more)
 */
export async function cancelDeadLetterJob(actor: OpsActor, jobId: string, options: { request?: AuditRequestInfo | null } = {}): Promise<{ id: string; type: string }> {
  assertOperator(actor);
  const row = await loadDeadLetter(jobId);
  await db.$transaction(async (tx) => {
    const updated = await tx.job.updateMany({ where: { id: row.id, status: { in: [...DEAD_LETTER_STATUSES] } }, data: { status: "CANCELLED" } });
    if (updated.count !== 1) throw AppError.conflict("This job changed meanwhile. Reload the page.");
    await auditInTx(tx, {
      actorUserId: actor.userId,
      actorRoles: actor.roles,
      action: AUDIT_ACTIONS.JOB_CANCEL,
      entityType: "Job",
      entityId: row.id,
      metadata: jobAuditFields(row),
      request: options.request ?? null,
    });
  });
  return { id: row.id, type: row.type };
}
