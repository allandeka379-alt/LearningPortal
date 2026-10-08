import "server-only";
import { db } from "@/server/db";
import { rateLimit, rateLimitSubject } from "@/server/lib/rate-limit";
import { LOCKOUT_POLICY, lockUntil } from "./lockout";

/**
 * Password-failure counting and locks for password sign-in (§39), with the SAME behaviour for real accounts and for
 * identifiers that have no account, so responses never reveal which accounts exist:
 *
 * - Failures go to a sliding 15-minute window per subject (`loginFail:<subject>`) that refuses the 5th failure. Old
 *   failures decay identically for everyone (the old per-account counter never decayed, an enumeration oracle).
 * - The 5th failure starts a fixed 15-minute lock and restarts the counter. A real account keeps its lock in
 *   `User.lockedUntil` (shown to admins, cleared by resets); an unknown identifier keeps it in a `loginLock:<subject>`
 *   row of `RateLimitBucket` (purged after expiry). Both are read on every attempt, and both report the same
 *   `Retry-After` (time left on the fixed lock).
 *
 * Subjects: `u:<userId>` for an account, the keyed hash of the typed identifier otherwise (never the raw value).
 */

const FAILURE_RULE = { limit: LOCKOUT_POLICY.maxFailures - 1, windowSeconds: LOCKOUT_POLICY.lockMs / 1000 };

/** Counter subject for an account (`userId`) or, when there is none, for the identifier that was typed. */
export function lockSubject(userId: string | null, identifierKey: string): string {
  return userId !== null ? `u:${userId}` : rateLimitSubject(identifierKey);
}

function failureKey(subject: string): string {
  return `loginFail:${subject}`;
}

function lockKey(subject: string): string {
  return `loginLock:${subject}`;
}

/** Lock end stored under `subject` in `RateLimitBucket` (identifiers without an account), or `null`. */
export async function storedLockUntil(subject: string): Promise<Date | null> {
  const row = await db.rateLimitBucket.findUnique({ where: { key: lockKey(subject) }, select: { expiresAt: true } });
  return row?.expiresAt ?? null;
}

/** Stores a lock for an identifier without an account. */
export async function storeLock(subject: string, until: Date, now: Date): Promise<void> {
  const windowSeconds = Math.max(1, Math.ceil((until.getTime() - now.getTime()) / 1000));
  const data = { windowStart: now, windowSeconds, count: 1, prevCount: 0, expiresAt: until };
  await db.rateLimitBucket.upsert({ where: { key: lockKey(subject) }, create: { key: lockKey(subject), ...data }, update: data, select: { key: true } });
}

/**
 * Counts one wrong password for `subject`. Returns the end of the new lock when this failure reaches the threshold
 * (the failure counter then restarts from zero, as after any lock), otherwise `null`.
 */
export async function countPasswordFailure(subject: string, now: Date): Promise<Date | null> {
  const bucket = await rateLimit({ key: failureKey(subject), ...FAILURE_RULE });
  if (bucket.allowed) return null;
  await db.rateLimitBucket.deleteMany({ where: { key: failureKey(subject) } });
  return lockUntil(now);
}

/** Forgets an account's recent password failures (successful sign-in, password reset). */
export async function clearPasswordFailures(userId: string): Promise<void> {
  const subject = lockSubject(userId, "");
  await db.rateLimitBucket.deleteMany({ where: { key: { in: [failureKey(subject), lockKey(subject)] } } });
}
