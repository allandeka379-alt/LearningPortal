import { describe, expect, it } from "vitest";
import {
  AUTOSAVE_POLICY,
  LATE_SYNC_GRACE_SECONDS,
  SUBMIT_GRACE_SECONDS,
  autoSubmitAt,
  canAcceptAnswer,
  canSubmit,
  computeDeadline,
  expiryAction,
  isExpired,
  remainingSeconds,
  timeWarning,
  timerSnapshot,
  type AttemptTiming,
} from "./timer";

const START = new Date("2026-11-02T07:00:00.000Z"); // 09:00 CAT
const TWO_HOURS = 7200;
const at = (offsetMs: number) => new Date(START.getTime() + offsetMs);
const SEC = 1000;

function attempt(overrides: Partial<AttemptTiming> = {}): AttemptTiming {
  return { status: "IN_PROGRESS", startedAt: START, deadline: computeDeadline(START, TWO_HOURS), ...overrides };
}

describe("computeDeadline", () => {
  it("adds the time limit to the start", () => {
    expect(computeDeadline(START, TWO_HOURS)?.toISOString()).toBe("2026-11-02T09:00:00.000Z");
  });

  it("applies extra-time accommodations and rounds up to a whole second", () => {
    expect(computeDeadline(START, TWO_HOURS, 1.25)?.toISOString()).toBe("2026-11-02T09:30:00.000Z");
    expect(computeDeadline(START, 3600, 1.1)?.getTime()).toBe(START.getTime() + 3960 * SEC); // no float bump to 3961
    expect(computeDeadline(START, 10.2)?.getTime()).toBe(START.getTime() + 11 * SEC);
  });

  it("never runs past the assessment window", () => {
    const closesAt = at(30 * 60 * SEC);
    expect(computeDeadline(START, TWO_HOURS, 1, { closesAt })?.toISOString()).toBe(closesAt.toISOString());
    const lateClose = at(5 * 3600 * SEC);
    expect(computeDeadline(START, TWO_HOURS, 1, { closesAt: lateClose })?.getTime()).toBe(START.getTime() + TWO_HOURS * SEC);
  });

  it("returns null for untimed attempts, or the window close when there is one", () => {
    expect(computeDeadline(START, null)).toBeNull();
    expect(computeDeadline(START, null, 1, { closesAt: at(SEC) })?.getTime()).toBe(at(SEC).getTime());
  });

  it("rejects invalid limits, multipliers and dates", () => {
    expect(() => computeDeadline(START, 0)).toThrow(RangeError);
    expect(() => computeDeadline(START, -60)).toThrow(RangeError);
    expect(() => computeDeadline(START, Number.NaN)).toThrow(RangeError);
    expect(() => computeDeadline(START, 60, 0.9)).toThrow(RangeError);
    expect(() => computeDeadline(START, 60, 3.5)).toThrow(RangeError);
    expect(() => computeDeadline(new Date(Number.NaN), 60)).toThrow(RangeError);
    expect(() => computeDeadline(START, 60, 1, { closesAt: new Date(Number.NaN) })).toThrow(RangeError);
  });

  it("is pure instant arithmetic (unaffected by DST changes in any zone)", () => {
    // US clocks fall back on 2026-11-01 at 06:00Z; a 2h exam spanning it is still exactly 2h.
    const start = new Date("2026-11-01T05:30:00Z");
    expect(computeDeadline(start, TWO_HOURS)?.getTime()).toBe(start.getTime() + TWO_HOURS * SEC);
  });
});

describe("remainingSeconds / isExpired at clock edges", () => {
  const deadline = computeDeadline(START, TWO_HOURS) as Date;

  it("rounds up partial seconds and floors at zero", () => {
    expect(remainingSeconds(deadline, START)).toBe(TWO_HOURS);
    expect(remainingSeconds(deadline, new Date(deadline.getTime() - 1))).toBe(1);
    expect(remainingSeconds(deadline, new Date(deadline.getTime() - 1001))).toBe(2);
    expect(remainingSeconds(deadline, deadline)).toBe(0);
    expect(remainingSeconds(deadline, new Date(deadline.getTime() + 60 * SEC))).toBe(0);
    expect(remainingSeconds(null, START)).toBeNull();
  });

  it("treats the deadline instant as on time and expires strictly after deadline + grace", () => {
    expect(isExpired(deadline, deadline)).toBe(false);
    expect(isExpired(deadline, new Date(deadline.getTime() + 1))).toBe(true);
    expect(isExpired(deadline, new Date(deadline.getTime() + 30 * SEC), 30)).toBe(false);
    expect(isExpired(deadline, new Date(deadline.getTime() + 30 * SEC + 1), 30)).toBe(true);
    expect(isExpired(null, new Date("2099-01-01T00:00:00Z"))).toBe(false);
  });

  it("rejects invalid clocks and negative grace", () => {
    expect(() => remainingSeconds(deadline, new Date(Number.NaN))).toThrow(RangeError);
    expect(() => isExpired(deadline, START, -1)).toThrow(RangeError);
  });
});

describe("canAcceptAnswer", () => {
  const a = attempt();
  const deadlineMs = (a.deadline as Date).getTime();

  it("accepts on-time answers, including within the network grace", () => {
    expect(canAcceptAnswer(a, at(60 * SEC))).toEqual({ accepted: true, lateSync: false });
    expect(canAcceptAnswer(a, new Date(deadlineMs))).toEqual({ accepted: true, lateSync: false });
    expect(canAcceptAnswer(a, new Date(deadlineMs + SUBMIT_GRACE_SECONDS * SEC))).toEqual({ accepted: true, lateSync: false });
  });

  it("rejects answers after the grace unless they are offline saves from before the deadline", () => {
    const afterGrace = new Date(deadlineMs + SUBMIT_GRACE_SECONDS * SEC + 1);
    expect(canAcceptAnswer(a, afterGrace)).toEqual({ accepted: false, reason: "DEADLINE_PASSED" });
    const savedBefore = new Date(deadlineMs - 5 * 60 * SEC);
    expect(canAcceptAnswer(a, afterGrace, { clientSavedAt: savedBefore })).toEqual({ accepted: true, lateSync: true });
    const lastLateMoment = new Date(deadlineMs + LATE_SYNC_GRACE_SECONDS * SEC);
    expect(canAcceptAnswer(a, lastLateMoment, { clientSavedAt: savedBefore })).toEqual({ accepted: true, lateSync: true });
    expect(canAcceptAnswer(a, new Date(lastLateMoment.getTime() + 1), { clientSavedAt: savedBefore })).toEqual({
      accepted: false,
      reason: "DEADLINE_PASSED",
    });
  });

  it("rejects implausible client timestamps", () => {
    const late = new Date(deadlineMs + 2 * 60 * SEC);
    expect(canAcceptAnswer(a, late, { clientSavedAt: new Date(deadlineMs + 60 * SEC) })).toEqual({ accepted: false, reason: "INVALID_CLIENT_TIMESTAMP" });
    expect(canAcceptAnswer(a, late, { clientSavedAt: new Date(START.getTime() - SEC) })).toEqual({ accepted: false, reason: "INVALID_CLIENT_TIMESTAMP" });
    expect(canAcceptAnswer(a, late, { clientSavedAt: new Date(Number.NaN) })).toEqual({ accepted: false, reason: "INVALID_CLIENT_TIMESTAMP" });
  });

  it("rejects anything for closed attempts and accepts anything for untimed ones", () => {
    expect(canAcceptAnswer(attempt({ status: "SUBMITTED" }), at(SEC))).toEqual({ accepted: false, reason: "ATTEMPT_CLOSED" });
    expect(canAcceptAnswer(attempt({ status: "AUTO_SUBMITTED" }), at(SEC))).toEqual({ accepted: false, reason: "ATTEMPT_CLOSED" });
    expect(canAcceptAnswer(attempt({ deadline: null }), new Date("2030-01-01T00:00:00Z"))).toEqual({ accepted: true, lateSync: false });
  });

  it("honours custom grace windows", () => {
    expect(canAcceptAnswer(a, new Date(deadlineMs + 1), { submitGraceSeconds: 0 })).toEqual({ accepted: false, reason: "DEADLINE_PASSED" });
  });
});

describe("submission and expiry", () => {
  const a = attempt();
  const deadlineMs = (a.deadline as Date).getTime();

  it("allows submitting only in-progress attempts", () => {
    expect(canSubmit(a)).toBe(true);
    expect(canSubmit({ status: "SUBMITTED" })).toBe(false);
  });

  it("moves NONE → AWAIT_LATE_SYNC → AUTO_SUBMIT", () => {
    expect(expiryAction(a, at(SEC))).toBe("NONE");
    expect(expiryAction(a, new Date(deadlineMs + SUBMIT_GRACE_SECONDS * SEC))).toBe("NONE");
    expect(expiryAction(a, new Date(deadlineMs + SUBMIT_GRACE_SECONDS * SEC + 1))).toBe("AWAIT_LATE_SYNC");
    expect(expiryAction(a, new Date(deadlineMs + LATE_SYNC_GRACE_SECONDS * SEC))).toBe("AWAIT_LATE_SYNC");
    expect(expiryAction(a, new Date(deadlineMs + LATE_SYNC_GRACE_SECONDS * SEC + 1))).toBe("AUTO_SUBMIT");
    expect(expiryAction(attempt({ status: "SUBMITTED" }), new Date(deadlineMs + 86_400_000))).toBe("NONE");
    expect(expiryAction(attempt({ deadline: null }), new Date(deadlineMs + 86_400_000))).toBe("NONE");
  });

  it("schedules the auto-submit job just after the late-sync window", () => {
    const runAt = autoSubmitAt(a.deadline) as Date;
    expect(runAt.getTime()).toBe(deadlineMs + LATE_SYNC_GRACE_SECONDS * SEC + 1);
    expect(expiryAction(a, runAt)).toBe("AUTO_SUBMIT");
    expect(autoSubmitAt(null)).toBeNull();
  });
});

describe("timer snapshot and warnings", () => {
  it("maps remaining time to warnings", () => {
    expect(timeWarning(null)).toBe("NONE");
    expect(timeWarning(301)).toBe("NONE");
    expect(timeWarning(300)).toBe("FIVE_MINUTES");
    expect(timeWarning(61)).toBe("FIVE_MINUTES");
    expect(timeWarning(60)).toBe("ONE_MINUTE");
    expect(timeWarning(1)).toBe("ONE_MINUTE");
    expect(timeWarning(0)).toBe("TIME_UP");
  });

  it("gives the client what it needs to count down against the server clock", () => {
    const a = attempt();
    const now = at(TWO_HOURS * SEC - 4 * 60 * SEC);
    expect(timerSnapshot(a, now)).toEqual({
      serverNowMs: now.getTime(),
      deadlineMs: (a.deadline as Date).getTime(),
      remainingSeconds: 240,
      warning: "FIVE_MINUTES",
      answeringClosed: false,
    });
  });

  it("never shows more than the allowed time when the server clock lags the start", () => {
    const snapshot = timerSnapshot(attempt(), new Date(START.getTime() - 5 * SEC));
    expect(snapshot.remainingSeconds).toBe(TWO_HOURS);
  });

  it("reports answering closed after the grace or when submitted", () => {
    const a = attempt();
    const deadlineMs = (a.deadline as Date).getTime();
    expect(timerSnapshot(a, new Date(deadlineMs + 10 * SEC)).answeringClosed).toBe(false);
    expect(timerSnapshot(a, new Date(deadlineMs + 31 * SEC))).toMatchObject({ answeringClosed: true, warning: "TIME_UP", remainingSeconds: 0 });
    expect(timerSnapshot(attempt({ status: "SUBMITTED" }), at(SEC)).answeringClosed).toBe(true);
    expect(timerSnapshot(attempt({ deadline: null }), at(SEC))).toMatchObject({ remainingSeconds: null, warning: "NONE", answeringClosed: false });
  });
});

describe("autosave policy", () => {
  it("saves well inside the network grace window", () => {
    expect(AUTOSAVE_POLICY.debounceMs).toBeLessThan(SUBMIT_GRACE_SECONDS * SEC);
    expect(AUTOSAVE_POLICY.maxIntervalMs).toBeLessThanOrEqual(SUBMIT_GRACE_SECONDS * SEC);
    expect(Object.isFrozen(AUTOSAVE_POLICY)).toBe(true);
  });
});
