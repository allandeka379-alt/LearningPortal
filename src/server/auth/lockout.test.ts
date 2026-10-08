import { describe, expect, it } from "vitest";
import { isLocked, isLockExpired, lockRemainingSeconds, lockUntil, LOCKOUT_POLICY, reachesLockThreshold } from "./lockout";

const now = new Date("2026-10-05T08:00:00Z");

describe("lockout policy", () => {
  it("locks on the 5th consecutive failure for 15 minutes", () => {
    expect(LOCKOUT_POLICY).toEqual({ maxFailures: 5, lockMs: 15 * 60_000 });
    expect(reachesLockThreshold(4)).toBe(false);
    expect(reachesLockThreshold(5)).toBe(true);
    expect(lockUntil(now)).toEqual(new Date("2026-10-05T08:15:00Z"));
  });

  it("reports lock state and remaining time", () => {
    const until = lockUntil(now);
    expect(isLocked(until, now)).toBe(true);
    expect(isLocked(until, until)).toBe(false);
    expect(isLocked(null, now)).toBe(false);
    expect(isLockExpired(until, new Date(until.getTime() + 1))).toBe(true);
    expect(isLockExpired(until, now)).toBe(false);
    expect(isLockExpired(null, now)).toBe(false);
    expect(lockRemainingSeconds(until, now)).toBe(900);
    expect(lockRemainingSeconds(until, new Date(until.getTime() - 400))).toBe(1);
    expect(lockRemainingSeconds(null, now)).toBe(0);
  });
});
