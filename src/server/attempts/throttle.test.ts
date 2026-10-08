import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import { isAppError } from "@/server/lib/errors";
import { acquireAttemptSlot, attemptWritesInFlight, MAX_CONCURRENT_ATTEMPT_WRITES, withAttemptThrottle } from "./throttle";

/** Unit tests of the in-process concurrency layer (no database: kind "other" skips the rate buckets). */

function refusal(run: () => unknown): { code: string; retryAfterSeconds: number | undefined } | null {
  try {
    run();
    return null;
  } catch (error) {
    if (!isAppError(error)) throw error;
    return { code: error.code, retryAfterSeconds: error.retryAfterSeconds };
  }
}

describe("acquireAttemptSlot", () => {
  it("admits up to the per-student limit, refuses the next with RATE_LIMITED, and frees slots on release", () => {
    const student = randomUUID();
    const releases = Array.from({ length: MAX_CONCURRENT_ATTEMPT_WRITES }, () => acquireAttemptSlot(student));
    expect(attemptWritesInFlight(student)).toBe(MAX_CONCURRENT_ATTEMPT_WRITES);
    expect(refusal(() => acquireAttemptSlot(student))).toEqual({ code: "RATE_LIMITED", retryAfterSeconds: 1 });
    // Another student is unaffected.
    const other = randomUUID();
    const otherRelease = acquireAttemptSlot(other);
    otherRelease();

    releases[0]!();
    releases[0]!(); // idempotent: a double release never frees someone else's slot
    expect(attemptWritesInFlight(student)).toBe(MAX_CONCURRENT_ATTEMPT_WRITES - 1);
    const again = acquireAttemptSlot(student);
    for (const release of [...releases.slice(1), again]) release();
    expect(attemptWritesInFlight(student)).toBe(0);
    expect(attemptWritesInFlight(other)).toBe(0);
  });
});

describe("withAttemptThrottle", () => {
  it("takes the slot synchronously, so a burst in one tick is cut at the limit before any work starts", async () => {
    const student = randomUUID();
    let started = 0;
    let finish: () => void = () => undefined;
    const gate = new Promise<void>((resolve) => (finish = resolve));
    const burst: Promise<string>[] = [];
    for (let i = 0; i < 20; i += 1) {
      let call: Promise<string>;
      try {
        call = withAttemptThrottle(student, "other", async () => {
          started += 1;
          await gate;
          return "OK";
        });
      } catch (error) {
        call = Promise.reject(error);
      }
      burst.push(call.catch((error: unknown) => (isAppError(error) ? error.code : "OTHER")));
    }
    expect(attemptWritesInFlight(student)).toBe(MAX_CONCURRENT_ATTEMPT_WRITES);
    finish();
    const results = await Promise.all(burst);
    expect(results.filter((r) => r === "OK")).toHaveLength(MAX_CONCURRENT_ATTEMPT_WRITES);
    expect(results.filter((r) => r === "RATE_LIMITED")).toHaveLength(20 - MAX_CONCURRENT_ATTEMPT_WRITES);
    expect(started).toBe(MAX_CONCURRENT_ATTEMPT_WRITES);
    expect(attemptWritesInFlight(student)).toBe(0);
  });

  it("releases the slot when the work fails", async () => {
    const student = randomUUID();
    await expect(withAttemptThrottle(student, "other", () => Promise.reject(new Error("boom")))).rejects.toThrow("boom");
    expect(attemptWritesInFlight(student)).toBe(0);
  });
});
