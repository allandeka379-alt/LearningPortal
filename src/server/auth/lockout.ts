/**
 * Account lockout after repeated wrong passwords (§39). Pure: no I/O.
 *
 * Five failures within 15 minutes lock password login for 15 minutes. A successful login resets the count; after a
 * lock the count starts again from zero. The database side (./login-lock, ./flows) counts failures in an atomic
 * sliding-window bucket and applies EXACTLY the same rules to identifiers without an account, so responses never
 * reveal which accounts exist. Rate limits per (IP, identifier) apply on top (lib/rate-limit). Browsers that already
 * signed in to the account are exempt from the lock (./device-trust).
 */

export const LOCKOUT_POLICY = Object.freeze({ maxFailures: 5, lockMs: 15 * 60_000 });

/** True while a lock is in force. */
export function isLocked(lockedUntil: Date | null, now: Date): boolean {
  return lockedUntil !== null && lockedUntil.getTime() > now.getTime();
}

/** True when a lock was set and has run out (the failure counter should restart from zero). */
export function isLockExpired(lockedUntil: Date | null, now: Date): boolean {
  return lockedUntil !== null && lockedUntil.getTime() <= now.getTime();
}

/** True when `failedLoginCount` (after counting the current failure) reaches the lock threshold. */
export function reachesLockThreshold(failedLoginCount: number): boolean {
  return failedLoginCount >= LOCKOUT_POLICY.maxFailures;
}

/** End of a lock starting at `now`. */
export function lockUntil(now: Date): Date {
  return new Date(now.getTime() + LOCKOUT_POLICY.lockMs);
}

/** Whole seconds until the lock ends (0 when not locked). */
export function lockRemainingSeconds(lockedUntil: Date | null, now: Date): number {
  if (lockedUntil === null || !isLocked(lockedUntil, now)) return 0;
  return Math.max(1, Math.ceil((lockedUntil.getTime() - now.getTime()) / 1000));
}
