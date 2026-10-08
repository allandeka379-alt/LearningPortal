/**
 * Server-authoritative exam timing. Pure core: no DB, no I/O; every function takes `now` explicitly.
 * Satisfies §12 (timer, save progress, submit), §13 (time remaining, submit exam) and §51 ("exam timer" tests);
 * implements ARCHITECTURE §3.13 (local-first autosave, "late sync" grace window) and the `exams.autoSubmit` job.
 *
 * Rules:
 * - The deadline is fixed when the attempt starts: `startedAt + ceil(timeLimit × accommodations)` seconds, never
 *   later than the assessment window's `closesAt`. The client only ever displays a countdown towards this server
 *   deadline (corrected for its own clock offset via {@link timerSnapshot}); client clocks are never trusted.
 * - The deadline instant itself is still on time; an attempt is expired strictly after `deadline + grace`.
 * - Answers are accepted while the attempt is IN_PROGRESS and the server receives them no later than
 *   `deadline + SUBMIT_GRACE_SECONDS` (30 s network allowance for a request sent just before time ran out).
 * - Answers saved offline before the deadline may sync up to `LATE_SYNC_GRACE_SECONDS` (10 min) after it; they
 *   are accepted and flagged `lateSync` so the result can show "late sync". Their client timestamp must lie within
 *   the attempt (after `startedAt`, not after `deadline + SUBMIT_GRACE_SECONDS`) and not in the server's future.
 * - Expiry action: nothing until `deadline + SUBMIT_GRACE_SECONDS`; then wait for late syncs; after
 *   `deadline + LATE_SYNC_GRACE_SECONDS` the attempt must be auto-submitted (by the job or lazily on next read).
 * - Untimed attempts (no time limit, no window) never expire.
 */

/** Network allowance for answers/submit requests sent just before the deadline. */
export const SUBMIT_GRACE_SECONDS = 30;
/** How long after the deadline answers saved offline before it are still accepted (flagged "late sync"). */
export const LATE_SYNC_GRACE_SECONDS = 600;
/** Tolerated amount by which a client's save timestamp may be ahead of the server clock. */
export const CLIENT_CLOCK_SKEW_SECONDS = 120;
/** Extra-time accommodations are expressed as a multiplier of the time limit (1.25 = 25 % extra time). */
export const MIN_ACCOMMODATIONS_MULTIPLIER = 1;
export const MAX_ACCOMMODATIONS_MULTIPLIER = 3;
/** Remaining-time thresholds (seconds) at which the exam UI announces a warning (`aria-live`, §43). */
export const TIME_WARNING_THRESHOLDS_SECONDS = Object.freeze({ FIVE_MINUTES: 300, ONE_MINUTE: 60 });

/**
 * Client autosave policy for exam mode (local IndexedDB first, then server sync):
 * save `debounceMs` after the last change, at least every `maxIntervalMs` while the student keeps typing, and
 * immediately on question navigation, flagging, visibility change and submit. Failed syncs retry with backoff and
 * stay queued in the outbox; the server re-syncs the countdown every `timerResyncMs`.
 */
export const AUTOSAVE_POLICY = Object.freeze({
  debounceMs: 2_000,
  maxIntervalMs: 30_000,
  retryBackoffMs: Object.freeze([2_000, 5_000, 10_000, 30_000]),
  timerResyncMs: 60_000,
  saveOnNavigate: true,
  saveOnFlag: true,
  saveOnVisibilityHidden: true,
});

export type AttemptStatus = "IN_PROGRESS" | "SUBMITTED" | "AUTO_SUBMITTED" | "CANCELLED";

/** The timing-relevant slice of an assessment attempt. */
export interface AttemptTiming {
  status: AttemptStatus;
  startedAt: Date;
  /** null for untimed attempts. */
  deadline: Date | null;
}

export interface GraceOptions {
  submitGraceSeconds?: number;
  lateSyncGraceSeconds?: number;
}

function assertDate(value: Date, name: string): number {
  const ms = value instanceof Date ? value.getTime() : Number.NaN;
  if (!Number.isFinite(ms)) throw new RangeError(`${name} must be a valid Date`);
  return ms;
}

function assertNonNegative(value: number, name: string): number {
  if (!Number.isFinite(value) || value < 0) throw new RangeError(`${name} must be a non-negative number, received ${String(value)}`);
  return value;
}

/**
 * The attempt deadline, or `null` when the attempt is untimed and has no closing window.
 *
 * `timeLimitSeconds × accommodationsMultiplier` is rounded UP to a whole second (the student never loses a fraction
 * of a second to rounding). When the assessment window closes earlier (`options.closesAt`), that wins: a student
 * starting 20 minutes before a scheduled mock closes gets 20 minutes. Throws `RangeError` on a non-positive limit,
 * a multiplier outside 1–3 or invalid dates.
 */
export function computeDeadline(
  startedAt: Date,
  timeLimitSeconds: number | null,
  accommodationsMultiplier = 1,
  options: { closesAt?: Date | null } = {},
): Date | null {
  const startMs = assertDate(startedAt, "startedAt");
  if (
    !Number.isFinite(accommodationsMultiplier) ||
    accommodationsMultiplier < MIN_ACCOMMODATIONS_MULTIPLIER ||
    accommodationsMultiplier > MAX_ACCOMMODATIONS_MULTIPLIER
  ) {
    throw new RangeError(
      `accommodationsMultiplier must be between ${MIN_ACCOMMODATIONS_MULTIPLIER} and ${MAX_ACCOMMODATIONS_MULTIPLIER}, received ${String(accommodationsMultiplier)}`,
    );
  }
  const closesMs = options.closesAt ? assertDate(options.closesAt, "closesAt") : null;
  if (timeLimitSeconds === null) return closesMs === null ? null : new Date(closesMs);
  if (!Number.isFinite(timeLimitSeconds) || timeLimitSeconds <= 0) {
    throw new RangeError(`timeLimitSeconds must be positive, received ${String(timeLimitSeconds)}`);
  }
  // Round the product to 1e-9 first so e.g. 3600 × 1.1 (= 3960.0000000000005) is not bumped to 3961.
  const allowedSeconds = Math.ceil(Number((timeLimitSeconds * accommodationsMultiplier).toFixed(9)));
  const limitMs = startMs + allowedSeconds * 1000;
  return new Date(closesMs === null ? limitMs : Math.min(limitMs, closesMs));
}

/** Whole seconds left, rounded up (0 once the deadline has passed); `null` for untimed attempts. */
export function remainingSeconds(deadline: Date | null, now: Date): number | null {
  const nowMs = assertDate(now, "now");
  if (deadline === null) return null;
  return Math.max(0, Math.ceil((assertDate(deadline, "deadline") - nowMs) / 1000));
}

/** True strictly after `deadline + graceSeconds`. Untimed (`null`) never expires. */
export function isExpired(deadline: Date | null, now: Date, graceSeconds = 0): boolean {
  const nowMs = assertDate(now, "now");
  if (deadline === null) return false;
  return nowMs > assertDate(deadline, "deadline") + assertNonNegative(graceSeconds, "graceSeconds") * 1000;
}

export type AnswerDecision =
  | { accepted: true; lateSync: boolean }
  | { accepted: false; reason: "ATTEMPT_CLOSED" | "DEADLINE_PASSED" | "INVALID_CLIENT_TIMESTAMP" };

/**
 * Whether the server may store an answer (or autosave) for `attempt` at `now`; see the header for the rules.
 * `clientSavedAt` is the time the client recorded the answer locally (offline outbox), used only for late syncs.
 */
export function canAcceptAnswer(
  attempt: AttemptTiming,
  now: Date,
  options: GraceOptions & { clientSavedAt?: Date | null } = {},
): AnswerDecision {
  const nowMs = assertDate(now, "now");
  if (attempt.status !== "IN_PROGRESS") return { accepted: false, reason: "ATTEMPT_CLOSED" };
  if (attempt.deadline === null) return { accepted: true, lateSync: false };

  const submitGrace = assertNonNegative(options.submitGraceSeconds ?? SUBMIT_GRACE_SECONDS, "submitGraceSeconds");
  const lateGrace = assertNonNegative(options.lateSyncGraceSeconds ?? LATE_SYNC_GRACE_SECONDS, "lateSyncGraceSeconds");
  const deadlineMs = assertDate(attempt.deadline, "deadline");
  if (nowMs <= deadlineMs + submitGrace * 1000) return { accepted: true, lateSync: false };

  if (nowMs > deadlineMs + Math.max(lateGrace, submitGrace) * 1000) return { accepted: false, reason: "DEADLINE_PASSED" };
  if (!options.clientSavedAt) return { accepted: false, reason: "DEADLINE_PASSED" };
  const savedMs = options.clientSavedAt.getTime();
  const startMs = assertDate(attempt.startedAt, "startedAt");
  const plausible =
    Number.isFinite(savedMs) &&
    savedMs >= startMs &&
    savedMs <= deadlineMs + submitGrace * 1000 &&
    savedMs <= nowMs + CLIENT_CLOCK_SKEW_SECONDS * 1000;
  return plausible ? { accepted: true, lateSync: true } : { accepted: false, reason: "INVALID_CLIENT_TIMESTAMP" };
}

/** A student may submit any attempt that is still in progress (after the deadline this simply finalises it). */
export function canSubmit(attempt: Pick<AttemptTiming, "status">): boolean {
  return attempt.status === "IN_PROGRESS";
}

export type ExpiryAction = "NONE" | "AWAIT_LATE_SYNC" | "AUTO_SUBMIT";

/**
 * What the server must do about an attempt's clock at `now`:
 * `NONE` (running, closed, or untimed) → `AWAIT_LATE_SYNC` (time is up; new answers rejected unless they are
 * offline saves from before the deadline) → `AUTO_SUBMIT` (finalise now, reason "time expired").
 */
export function expiryAction(attempt: AttemptTiming, now: Date, options: GraceOptions = {}): ExpiryAction {
  const nowMs = assertDate(now, "now");
  if (attempt.status !== "IN_PROGRESS" || attempt.deadline === null) return "NONE";
  const deadlineMs = assertDate(attempt.deadline, "deadline");
  const submitGrace = assertNonNegative(options.submitGraceSeconds ?? SUBMIT_GRACE_SECONDS, "submitGraceSeconds");
  const lateGrace = Math.max(submitGrace, assertNonNegative(options.lateSyncGraceSeconds ?? LATE_SYNC_GRACE_SECONDS, "lateSyncGraceSeconds"));
  if (nowMs <= deadlineMs + submitGrace * 1000) return "NONE";
  if (nowMs <= deadlineMs + lateGrace * 1000) return "AWAIT_LATE_SYNC";
  return "AUTO_SUBMIT";
}

/** When to run the `exams.autoSubmit` job for a deadline (just after the late-sync window closes); null if untimed. */
export function autoSubmitAt(deadline: Date | null, options: GraceOptions = {}): Date | null {
  if (deadline === null) return null;
  const submitGrace = assertNonNegative(options.submitGraceSeconds ?? SUBMIT_GRACE_SECONDS, "submitGraceSeconds");
  const lateGrace = Math.max(submitGrace, assertNonNegative(options.lateSyncGraceSeconds ?? LATE_SYNC_GRACE_SECONDS, "lateSyncGraceSeconds"));
  return new Date(assertDate(deadline, "deadline") + lateGrace * 1000 + 1);
}

export type TimeWarning = "NONE" | "FIVE_MINUTES" | "ONE_MINUTE" | "TIME_UP";

/** Warning level for a remaining-seconds value (`null` = untimed → NONE). */
export function timeWarning(remaining: number | null): TimeWarning {
  if (remaining === null) return "NONE";
  if (remaining <= 0) return "TIME_UP";
  if (remaining <= TIME_WARNING_THRESHOLDS_SECONDS.ONE_MINUTE) return "ONE_MINUTE";
  if (remaining <= TIME_WARNING_THRESHOLDS_SECONDS.FIVE_MINUTES) return "FIVE_MINUTES";
  return "NONE";
}

export interface TimerSnapshot {
  /** Server clock, so the client can compute its offset (`serverNowMs − Date.now()`) and count down locally. */
  serverNowMs: number;
  deadlineMs: number | null;
  remainingSeconds: number | null;
  warning: TimeWarning;
  /** True once no further on-time answers are accepted. */
  answeringClosed: boolean;
}

/**
 * Serializable timer state for the exam-mode client island (§13 "time remaining"). Remaining time is capped at the
 * allowed duration so a server clock that briefly lags `startedAt` never shows more time than the student has.
 */
export function timerSnapshot(attempt: AttemptTiming, now: Date, options: GraceOptions = {}): TimerSnapshot {
  const nowMs = assertDate(now, "now");
  const deadlineMs = attempt.deadline === null ? null : assertDate(attempt.deadline, "deadline");
  let remaining = remainingSeconds(attempt.deadline, now);
  if (remaining !== null && deadlineMs !== null) {
    const total = Math.max(0, Math.ceil((deadlineMs - assertDate(attempt.startedAt, "startedAt")) / 1000));
    remaining = Math.min(remaining, total);
  }
  const closed = attempt.status !== "IN_PROGRESS" || isExpired(attempt.deadline, now, options.submitGraceSeconds ?? SUBMIT_GRACE_SECONDS);
  return { serverNowMs: nowMs, deadlineMs, remainingSeconds: remaining, warning: timeWarning(remaining), answeringClosed: closed };
}
