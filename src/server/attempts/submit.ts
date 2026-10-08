import "server-only";
import { db } from "@/server/db";
import { expiryAction, LATE_SYNC_GRACE_SECONDS, SUBMIT_GRACE_SECONDS } from "@/server/exams/timer";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertLearner, loadAttemptContext, lockAttempt, requireOwnAttempt, TX_OPTIONS, uuidSchema } from "./context";
import { finalizeAttempt } from "./finalize";
import { IDLE_TIMEOUT_MINUTES } from "./policy";
import { loadAttemptResult } from "./result";
import type { AttemptResult, AutoSubmitSummary, LearnerActor } from "./types";
import { withAttemptThrottle } from "./throttle";

/**
 * Submitting and auto-closing attempts (§12 "submit", §13 "submit exam", server-authoritative timer).
 *
 * - {@link submitAttempt} is idempotent: a closed attempt returns its stored result, nothing runs twice (a double tap,
 *   an offline replay and the auto-submit job may race; the attempt row lock serialises them).
 * - {@link autoSubmitExpired} (job `exams.autoSubmit`) closes timed attempts once `deadline + late-sync grace` has
 *   passed (`expiryAction` = AUTO_SUBMIT) with reason TIME_EXPIRED — or EXPIRED when nothing was answered — and
 *   untimed attempts idle for {@link IDLE_TIMEOUT_MINUTES} with reason IDLE_TIMEOUT (ABANDONED when empty).
 */

/**
 * Submits the student's attempt: marks every saved answer, scores it and applies the side effects (./finalize).
 * Returns the results (§12).
 *
 * @throws AppError FORBIDDEN (not a student) | NOT_FOUND (not the student's attempt)
 */
export async function submitAttempt(actor: LearnerActor, attemptId: string, options: { now?: Date } = {}): Promise<AttemptResult> {
  assertLearner(actor);
  // Concurrency throttle before any lock or transaction (./throttle.ts; PAY-3).
  return withAttemptThrottle(actor.userId, "other", () => submitAttemptNow(actor, attemptId, options));
}

async function submitAttemptNow(actor: LearnerActor, attemptId: string, options: { now?: Date }): Promise<AttemptResult> {
  if (!uuidSchema.safeParse(attemptId).success) throw AppError.notFound("Attempt not found.");
  const now = options.now ?? new Date();
  await db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, attemptId))) throw AppError.notFound("Attempt not found.");
    const context = await requireOwnAttempt(tx, actor, attemptId);
    if (context.status !== "IN_PROGRESS") return;
    await finalizeAttempt(tx, context, "STUDENT", now);
  }, TX_OPTIONS);
  const result = await loadAttemptResult(db, attemptId);
  if (!result) throw AppError.notFound("Attempt not found.");
  return result;
}

/** The results of the student's own attempt (null while it is still in progress). */
export async function getAttemptResult(actor: LearnerActor, attemptId: string): Promise<AttemptResult | null> {
  assertLearner(actor);
  const context = await requireOwnAttempt(db, actor, attemptId);
  if (context.status === "IN_PROGRESS") return null;
  return loadAttemptResult(db, attemptId);
}

/** Why an open attempt must be closed by the system now. */
export type DueReason = "TIME_EXPIRED" | "IDLE_TIMEOUT";

/**
 * Pure due-decision of the auto-submit job: a timed attempt is due once `deadline + late-sync grace` has passed
 * (`expiryAction` = AUTO_SUBMIT); an untimed one when neither its start nor its last save is within the idle window.
 */
export function attemptDueReason(
  context: { status: string; startedAt: Date; deadlineAt: Date | null; lastSavedAt: Date },
  now: Date,
  idleMinutes: number = IDLE_TIMEOUT_MINUTES,
): DueReason | null {
  if (context.status !== "IN_PROGRESS") return null;
  if (context.deadlineAt !== null) {
    return expiryAction({ status: "IN_PROGRESS", startedAt: context.startedAt, deadline: context.deadlineAt }, now) === "AUTO_SUBMIT" ? "TIME_EXPIRED" : null;
  }
  const cutoff = now.getTime() - idleMinutes * 60_000;
  return context.lastSavedAt.getTime() < cutoff && context.startedAt.getTime() < cutoff ? "IDLE_TIMEOUT" : null;
}

/**
 * Closes one attempt if it is due (timer expired beyond the late-sync grace, or idle). Safe to call from the job, a
 * sweep or lazily on read; returns the resulting status, or null when nothing was due.
 */
export async function closeAttemptIfDue(
  attemptId: string,
  options: { now?: Date; idleMinutes?: number } = {},
): Promise<"MARKED" | "AWAITING_MARKING" | "EXPIRED" | "ABANDONED" | null> {
  const now = options.now ?? new Date();
  const idleMinutes = options.idleMinutes ?? IDLE_TIMEOUT_MINUTES;
  return db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, attemptId))) return null;
    const context = await loadAttemptContext(tx, attemptId);
    if (!context) return null;
    const reason = attemptDueReason(context, now, idleMinutes);
    if (!reason) return null;
    const outcome = await finalizeAttempt(tx, context, reason, now);
    return outcome.status as "MARKED" | "AWAITING_MARKING" | "EXPIRED" | "ABANDONED";
  }, TX_OPTIONS);
}

/**
 * Closes one open attempt at assignment work because the teacher (or the `teaching.closeDueAssignments` job) closed
 * the assignment: answered questions are marked and counted, reason ASSIGNMENT_CLOSED. Locks the attempt row, so it
 * is safe to race a student's own submit; returns false when the attempt is missing, not tied to an assignment, or
 * no longer open (idempotent).
 */
export async function closeAttemptForAssignment(attemptId: string, now: Date = new Date()): Promise<boolean> {
  if (!uuidSchema.safeParse(attemptId).success) return false;
  return db.$transaction(async (tx) => {
    if (!(await lockAttempt(tx, attemptId))) return false;
    const context = await loadAttemptContext(tx, attemptId);
    if (!context || context.status !== "IN_PROGRESS" || context.assignmentId === null) return false;
    await finalizeAttempt(tx, context, "ASSIGNMENT_CLOSED", now);
    return true;
  }, TX_OPTIONS);
}

/**
 * Sweep for the `exams.autoSubmit` job: timed attempts past `deadline + late-sync grace` (partial index
 * AssessmentAttempt_open_deadline_idx) and untimed attempts idle beyond the timeout (AssessmentAttempt_open_idle_idx on
 * the immutable startedAt, then filtered on lastSavedAt). Each attempt closes in its own transaction; a failure is
 * logged and counted, never blocking the rest.
 */
export async function autoSubmitExpired(options: { now?: Date; limit?: number; idleMinutes?: number } = {}): Promise<AutoSubmitSummary> {
  const now = options.now ?? new Date();
  const limit = Math.min(1_000, Math.max(1, options.limit ?? 200));
  const idleMinutes = options.idleMinutes ?? IDLE_TIMEOUT_MINUTES;
  const graceMs = Math.max(LATE_SYNC_GRACE_SECONDS, SUBMIT_GRACE_SECONDS) * 1000;
  const idleCutoff = new Date(now.getTime() - idleMinutes * 60_000);
  const [timed, idle] = await Promise.all([
    db.assessmentAttempt.findMany({
      where: { status: "IN_PROGRESS", deadlineAt: { not: null, lt: new Date(now.getTime() - graceMs) } },
      orderBy: { deadlineAt: "asc" },
      take: limit,
      select: { id: true },
    }),
    db.assessmentAttempt.findMany({
      where: { status: "IN_PROGRESS", deadlineAt: null, startedAt: { lt: idleCutoff }, lastSavedAt: { lt: idleCutoff } },
      orderBy: { startedAt: "asc" },
      take: limit,
      select: { id: true },
    }),
  ]);
  const summary: AutoSubmitSummary = { scanned: timed.length + idle.length, submitted: 0, expired: 0, abandoned: 0, failed: 0 };
  for (const { id } of [...timed, ...idle]) {
    try {
      const status = await closeAttemptIfDue(id, { now, idleMinutes });
      if (status === "EXPIRED") summary.expired += 1;
      else if (status === "ABANDONED") summary.abandoned += 1;
      else if (status !== null) summary.submitted += 1;
    } catch (error) {
      summary.failed += 1;
      logger.error("attempts: auto-submit failed", { attemptId: id, err: error });
    }
  }
  return summary;
}
