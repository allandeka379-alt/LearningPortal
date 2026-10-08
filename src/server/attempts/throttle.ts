import "server-only";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, rateLimits } from "@/server/lib/rate-limit";

/**
 * Per-student throttles on the attempt hot paths (SECURITY.md AI-04 and the PAY-3 follow-up; ARCHITECTURE §5.5).
 *
 * Every attempt write (start, save, answer, hint, submit, self-assessment) takes a row lock on the attempt inside a
 * transaction. Without a throttle, one student (or a script with their token) firing a burst of requests made each one
 * hold a pooled connection while it waited for that lock, so the pool (default 10) ran dry and everyone got Prisma
 * P2024 / P2028 errors. Two layers, both BEFORE any lock, transaction or other query:
 *
 * 1. **Concurrency** (in process, no database): at most {@link MAX_CONCURRENT_ATTEMPT_WRITES} attempt writes in flight per
 *    student on this node. The slot is taken synchronously when the service function is called, so a burst launched
 *    in one tick is admitted up to the limit and the rest is refused at once with RATE_LIMITED (Retry-After 1 s). Real
 *    clients never come close: the exam autosave sends one request at a time, practice one answer at a time.
 * 2. **Rate** (Postgres buckets shared by every node and channel): presets `attemptStart` (30 per 10 min) and
 *    `answerSubmit` (120 per minute), tunable through the `rateLimits` setting. One statement each.
 *
 * Refusals are RATE_LIMITED everywhere: HTTP 429 with Retry-After on the REST API, a friendly reply on WhatsApp, and
 * the exam autosave keeps the answer on the device and retries (src/components/exam/controller.ts).
 */

/** Attempt writes one student may have in flight at once on one node. */
export const MAX_CONCURRENT_ATTEMPT_WRITES = 4;

/** Which rate bucket a write counts against: starts, answers, or none (hints, submit, self-assessment). */
export type AttemptWriteKind = "start" | "answer" | "other";

const inFlight = new Map<string, number>();

/** Last refusal warning per student: a burst logs one line a minute, not one per request (no log flooding). */
const warnedAt = new Map<string, number>();
const WARN_INTERVAL_MS = 60_000;

function warnOnce(userId: string, current: number): void {
  const now = Date.now();
  if (now - (warnedAt.get(userId) ?? 0) < WARN_INTERVAL_MS) return;
  if (warnedAt.size > 10_000) warnedAt.clear();
  warnedAt.set(userId, now);
  logger.warn("attempt writes refused: too many in flight", { userId, inFlight: current });
}

const BUSY_MESSAGE = "You're sending answers faster than we can save them. Wait a moment and try again.";
const START_MESSAGE = "You've started a lot of sessions in a short time. Please wait a few minutes and try again.";
const ANSWER_MESSAGE = "You're answering very quickly. Please wait a moment and try again.";

/**
 * Takes one of the student's concurrency slots, synchronously. Returns the release function (idempotent).
 *
 * @throws AppError RATE_LIMITED when the student already has {@link MAX_CONCURRENT_ATTEMPT_WRITES} writes in flight.
 */
export function acquireAttemptSlot(userId: string): () => void {
  const current = inFlight.get(userId) ?? 0;
  if (current >= MAX_CONCURRENT_ATTEMPT_WRITES) {
    warnOnce(userId, current);
    throw AppError.rateLimited(1, BUSY_MESSAGE);
  }
  inFlight.set(userId, current + 1);
  let released = false;
  return () => {
    if (released) return;
    released = true;
    const left = (inFlight.get(userId) ?? 1) - 1;
    if (left <= 0) inFlight.delete(userId);
    else inFlight.set(userId, left);
  };
}

/** Attempt writes in flight for `userId` on this node (tests, diagnostics). */
export function attemptWritesInFlight(userId: string): number {
  return inFlight.get(userId) ?? 0;
}

/**
 * Runs one attempt write under both throttles (module header). Call it FIRST in a service entry point, before any
 * query: the concurrency slot is taken synchronously, then the rate bucket is counted, then `run` executes.
 *
 * @throws AppError RATE_LIMITED (Retry-After) from either layer; whatever `run` throws.
 */
export function withAttemptThrottle<T>(userId: string, kind: AttemptWriteKind, run: () => Promise<T>): Promise<T> {
  const release = acquireAttemptSlot(userId);
  return (async () => {
    try {
      if (kind === "start") await assertRateLimit(rateLimits.attemptStart(userId), START_MESSAGE);
      else if (kind === "answer") await assertRateLimit(rateLimits.answerSubmit(userId), ANSWER_MESSAGE);
      return await run();
    } finally {
      release();
    }
  })();
}
