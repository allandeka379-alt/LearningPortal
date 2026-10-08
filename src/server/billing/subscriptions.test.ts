import { describe, expect, it } from "vitest";
import {
  DEFAULT_TERM_MONTHS,
  addMonthsUtc,
  computePeriodEnd,
  isTerminalSubscriptionStatus,
  planChangeBlockedUntil,
  transitionSubscription,
  type BillingPeriodSpec,
  type SubscriptionSnapshot,
} from "./subscriptions";

const DAY = 86_400_000;
const d = (iso: string) => new Date(iso);
const MONTHLY: BillingPeriodSpec = { interval: "MONTH", intervalCount: 1, periodDays: null };

function snapshot(overrides: Partial<SubscriptionSnapshot> = {}): SubscriptionSnapshot {
  return {
    status: "PENDING",
    startedAt: null,
    currentPeriodStart: null,
    currentPeriodEnd: null,
    trialEndsAt: null,
    cancelAtPeriodEnd: false,
    cancelledAt: null,
    cancelReason: null,
    endedAt: null,
    ...overrides,
  };
}

function active(start: string, end: string, overrides: Partial<SubscriptionSnapshot> = {}): SubscriptionSnapshot {
  return snapshot({ status: "ACTIVE", startedAt: d(start), currentPeriodStart: d(start), currentPeriodEnd: d(end), ...overrides });
}

function expectOk(result: ReturnType<typeof transitionSubscription>) {
  if (!result.ok) throw new Error(`expected ok, got ${result.code}: ${result.message}`);
  return result;
}

describe("addMonthsUtc / computePeriodEnd", () => {
  it("adds calendar months and clamps to the month end", () => {
    expect(addMonthsUtc(d("2026-01-31T10:00:00Z"), 1)).toEqual(d("2026-02-28T10:00:00Z"));
    expect(addMonthsUtc(d("2028-01-31T10:00:00Z"), 1)).toEqual(d("2028-02-29T10:00:00Z")); // leap year
    expect(addMonthsUtc(d("2026-10-05T08:30:00Z"), 1)).toEqual(d("2026-11-05T08:30:00Z"));
    expect(addMonthsUtc(d("2026-11-30T00:00:00Z"), 3)).toEqual(d("2027-02-28T00:00:00Z"));
    expect(() => addMonthsUtc(d("2026-01-01T00:00:00Z"), 1.5)).toThrow(RangeError);
  });

  it("computes MONTH, YEAR, WEEK and multi-interval periods", () => {
    const start = d("2026-10-05T12:00:00Z");
    expect(computePeriodEnd(start, MONTHLY)).toEqual(d("2026-11-05T12:00:00Z"));
    expect(computePeriodEnd(start, { interval: "MONTH", intervalCount: 3, periodDays: null })).toEqual(d("2027-01-05T12:00:00Z"));
    expect(computePeriodEnd(start, { interval: "YEAR", intervalCount: 1, periodDays: null })).toEqual(d("2027-10-05T12:00:00Z"));
    expect(computePeriodEnd(start, { interval: "WEEK", intervalCount: 2, periodDays: null })).toEqual(
      new Date(start.getTime() + 14 * DAY),
    );
  });

  it("TERM defaults to 4 months and is configurable", () => {
    const start = d("2026-01-10T00:00:00Z");
    expect(DEFAULT_TERM_MONTHS).toBe(4);
    expect(computePeriodEnd(start, { interval: "TERM", intervalCount: 1, periodDays: null })).toEqual(d("2026-05-10T00:00:00Z"));
    expect(computePeriodEnd(start, { interval: "TERM", intervalCount: 1, periodDays: null }, { termMonths: 3 })).toEqual(
      d("2026-04-10T00:00:00Z"),
    );
    expect(computePeriodEnd(start, { interval: "TERM", intervalCount: 3, periodDays: null })).toEqual(d("2027-01-10T00:00:00Z"));
  });

  it("explicit periodDays wins over the interval", () => {
    const start = d("2026-01-10T00:00:00Z");
    expect(computePeriodEnd(start, { interval: "TERM", intervalCount: 1, periodDays: 90 })).toEqual(new Date(start.getTime() + 90 * DAY));
    expect(computePeriodEnd(start, { interval: "ONE_OFF", intervalCount: 1, periodDays: 30 })).toEqual(
      new Date(start.getTime() + 30 * DAY),
    );
  });

  it("rejects non-renewable or invalid specs", () => {
    const start = d("2026-01-10T00:00:00Z");
    expect(() => computePeriodEnd(start, { interval: "ONE_OFF", intervalCount: 1, periodDays: null })).toThrow(RangeError);
    expect(() => computePeriodEnd(start, { interval: "MONTH", intervalCount: 0, periodDays: null })).toThrow(RangeError);
    expect(() => computePeriodEnd(start, { interval: "TERM", intervalCount: 1, periodDays: null }, { termMonths: 0 })).toThrow(RangeError);
  });
});

describe("transitionSubscription: payments", () => {
  const paidAt = d("2026-10-05T10:00:00Z");

  it("PENDING -> ACTIVE on the first successful payment", () => {
    const result = expectOk(transitionSubscription(snapshot(), { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.changed).toBe(true);
    expect(result.reactivated).toBe(false);
    expect(result.next).toMatchObject({
      status: "ACTIVE",
      startedAt: paidAt,
      currentPeriodStart: paidAt,
      currentPeriodEnd: d("2026-11-05T10:00:00Z"),
    });
    expect(result.servicePeriod).toEqual({ start: paidAt, end: d("2026-11-05T10:00:00Z") });
  });

  it("an early renewal extends contiguously from the current period end", () => {
    const sub = active("2026-09-20T00:00:00Z", "2026-10-20T00:00:00Z");
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.next.currentPeriodEnd).toEqual(d("2026-11-20T00:00:00Z"));
    expect(result.next.currentPeriodStart).toEqual(d("2026-09-20T00:00:00Z")); // the running period is unchanged
    expect(result.servicePeriod).toEqual({ start: d("2026-10-20T00:00:00Z"), end: d("2026-11-20T00:00:00Z") });
  });

  it("a renewal during grace (PAST_DUE) is contiguous, so grace days are not free extra time", () => {
    const sub = active("2026-09-03T00:00:00Z", "2026-10-03T00:00:00Z", { status: "PAST_DUE" });
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.next.status).toBe("ACTIVE");
    expect(result.next.currentPeriodStart).toEqual(d("2026-10-03T00:00:00Z"));
    expect(result.next.currentPeriodEnd).toEqual(d("2026-11-03T00:00:00Z"));
  });

  it("a renewal after grace lapsed (job not run yet) starts a fresh period at payment time", () => {
    const sub = active("2026-08-01T00:00:00Z", "2026-09-01T00:00:00Z", { status: "PAST_DUE" });
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.next.currentPeriodStart).toEqual(paidAt);
    expect(result.next.currentPeriodEnd).toEqual(d("2026-11-05T10:00:00Z"));
  });

  it("paying clears a pending cancel-at-period-end", () => {
    const sub = active("2026-09-20T00:00:00Z", "2026-10-20T00:00:00Z", {
      cancelAtPeriodEnd: true,
      cancelledAt: d("2026-10-01T00:00:00Z"),
      cancelReason: "too expensive",
    });
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.next).toMatchObject({ cancelAtPeriodEnd: false, cancelledAt: null, cancelReason: null });
  });

  it("paying during a trial starts the paid period when the trial ends", () => {
    const sub = snapshot({
      status: "TRIALING",
      startedAt: d("2026-10-01T00:00:00Z"),
      currentPeriodStart: d("2026-10-01T00:00:00Z"),
      currentPeriodEnd: d("2026-10-08T00:00:00Z"),
      trialEndsAt: d("2026-10-08T00:00:00Z"),
    });
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.next.status).toBe("ACTIVE");
    expect(result.servicePeriod).toEqual({ start: d("2026-10-08T00:00:00Z"), end: d("2026-11-08T00:00:00Z") });
    expect(result.next.startedAt).toEqual(d("2026-10-01T00:00:00Z"));
  });

  it("a late payment revives an EXPIRED subscription and flags it", () => {
    const sub = active("2026-08-01T00:00:00Z", "2026-09-01T00:00:00Z", { status: "EXPIRED", endedAt: d("2026-09-04T00:00:00Z") });
    const result = expectOk(transitionSubscription(sub, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(result.reactivated).toBe(true);
    expect(result.next).toMatchObject({ status: "ACTIVE", endedAt: null, currentPeriodStart: paidAt });
    expect(result.next.startedAt).toEqual(d("2026-08-01T00:00:00Z"));
  });

  it("a late payment revives an abandoned checkout but not a staff-cancelled subscription", () => {
    const abandoned = snapshot({ status: "CANCELLED", cancelledAt: d("2026-10-02T00:00:00Z"), endedAt: d("2026-10-02T00:00:00Z") });
    const revived = expectOk(transitionSubscription(abandoned, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 }));
    expect(revived).toMatchObject({ reactivated: true, next: { status: "ACTIVE", startedAt: paidAt, cancelledAt: null } });

    const staffCancelled = active("2026-09-01T00:00:00Z", "2026-10-01T00:00:00Z", {
      status: "CANCELLED",
      cancelledAt: d("2026-09-15T00:00:00Z"),
      endedAt: d("2026-09-15T00:00:00Z"),
    });
    const review = transitionSubscription(staffCancelled, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3 });
    expect(review).toMatchObject({ ok: false, code: "NEEDS_REVIEW" });
  });
});

describe("transitionSubscription: a payment for a different plan (PAY-2)", () => {
  const paidAt = d("2026-10-05T10:00:00Z");
  const yearlyStudent = active("2026-10-01T00:00:00Z", "2027-10-01T00:00:00Z");

  it("never moves the current plan's prepaid period onto another plan (STUDENT yearly, then PREMIUM monthly)", () => {
    const switched = transitionSubscription(yearlyStudent, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3, planChange: true });
    expect(switched).toMatchObject({ ok: false, code: "NEEDS_REVIEW" });
    // The same plan still renews contiguously after the paid year.
    const renewal = expectOk(transitionSubscription(yearlyStudent, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3, planChange: false }));
    expect(renewal.servicePeriod).toEqual({ start: d("2027-10-01T00:00:00Z"), end: d("2027-11-01T00:00:00Z") });
    expect(planChangeBlockedUntil(yearlyStudent, paidAt)).toEqual(d("2027-10-01T00:00:00Z"));
  });

  it("a different plan bought once the paid period is over (grace or lapsed) starts like any renewal", () => {
    const pastDue = active("2026-09-03T00:00:00Z", "2026-10-03T00:00:00Z", { status: "PAST_DUE" });
    expect(planChangeBlockedUntil(pastDue, paidAt)).toBeNull();
    const result = expectOk(transitionSubscription(pastDue, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3, planChange: true }));
    expect(result.servicePeriod).toEqual({ start: d("2026-10-03T00:00:00Z"), end: d("2026-11-03T00:00:00Z") });
    // ACTIVE but already past its period (the lifecycle job has not run yet) counts as over too.
    const overdue = active("2026-09-03T00:00:00Z", "2026-10-03T00:00:00Z");
    expect(planChangeBlockedUntil(overdue, paidAt)).toBeNull();
    expect(transitionSubscription(overdue, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3, planChange: true }).ok).toBe(true);
  });

  it("a different plan bought during a trial starts at payment time (the trial days are not carried over)", () => {
    const trial = snapshot({
      status: "TRIALING",
      startedAt: d("2026-10-01T00:00:00Z"),
      currentPeriodStart: d("2026-10-01T00:00:00Z"),
      currentPeriodEnd: d("2026-10-08T00:00:00Z"),
      trialEndsAt: d("2026-10-08T00:00:00Z"),
    });
    expect(planChangeBlockedUntil(trial, paidAt)).toBeNull();
    const result = expectOk(transitionSubscription(trial, { type: "PAYMENT_SUCCEEDED", paidAt, period: MONTHLY, graceDays: 3, planChange: true }));
    expect(result.servicePeriod).toEqual({ start: paidAt, end: d("2026-11-05T10:00:00Z") });
    expect(result.next).toMatchObject({ status: "ACTIVE", currentPeriodStart: paidAt, currentPeriodEnd: d("2026-11-05T10:00:00Z") });
  });
});

describe("transitionSubscription: time", () => {
  const sub = active("2026-09-05T00:00:00Z", "2026-10-05T00:00:00Z");

  it("leaves a running subscription alone", () => {
    const result = expectOk(transitionSubscription(sub, { type: "TICK", now: d("2026-10-04T23:59:59Z"), graceDays: 3 }));
    expect(result.changed).toBe(false);
  });

  it("ACTIVE -> PAST_DUE at period end, then EXPIRED when grace ends", () => {
    const pastDue = expectOk(transitionSubscription(sub, { type: "TICK", now: d("2026-10-05T00:00:00Z"), graceDays: 3 }));
    expect(pastDue.next.status).toBe("PAST_DUE");
    const stillGrace = expectOk(transitionSubscription(pastDue.next, { type: "TICK", now: d("2026-10-07T23:00:00Z"), graceDays: 3 }));
    expect(stillGrace.changed).toBe(false);
    const expired = expectOk(transitionSubscription(pastDue.next, { type: "TICK", now: d("2026-10-08T00:00:00Z"), graceDays: 3 }));
    expect(expired.next).toMatchObject({ status: "EXPIRED", endedAt: d("2026-10-08T00:00:00Z") });
  });

  it("ACTIVE skips straight to EXPIRED when grace is zero or already over", () => {
    const noGrace = expectOk(transitionSubscription(sub, { type: "TICK", now: d("2026-10-05T00:00:01Z"), graceDays: 0 }));
    expect(noGrace.next.status).toBe("EXPIRED");
    const late = expectOk(transitionSubscription(sub, { type: "TICK", now: d("2026-10-20T00:00:00Z"), graceDays: 3 }));
    expect(late.next).toMatchObject({ status: "EXPIRED", endedAt: d("2026-10-08T00:00:00Z") });
  });

  it("cancel-at-period-end expires exactly at period end, without grace", () => {
    const cancelling = { ...sub, cancelAtPeriodEnd: true };
    const result = expectOk(transitionSubscription(cancelling, { type: "TICK", now: d("2026-10-05T00:00:00Z"), graceDays: 3 }));
    expect(result.next).toMatchObject({ status: "EXPIRED", endedAt: d("2026-10-05T00:00:00Z") });
  });

  it("an unpaid trial expires at trial end", () => {
    const trial = snapshot({ status: "TRIALING", startedAt: d("2026-10-01T00:00:00Z"), trialEndsAt: d("2026-10-08T00:00:00Z") });
    expect(expectOk(transitionSubscription(trial, { type: "TICK", now: d("2026-10-07T00:00:00Z"), graceDays: 3 })).changed).toBe(false);
    expect(expectOk(transitionSubscription(trial, { type: "TICK", now: d("2026-10-08T00:00:00Z"), graceDays: 3 })).next).toMatchObject({
      status: "EXPIRED",
      endedAt: d("2026-10-08T00:00:00Z"),
    });
  });

  it("time does not move PENDING or terminal subscriptions", () => {
    for (const status of ["PENDING", "CANCELLED", "EXPIRED"] as const) {
      const result = expectOk(transitionSubscription(snapshot({ status }), { type: "TICK", now: d("2030-01-01T00:00:00Z"), graceDays: 3 }));
      expect(result.changed).toBe(false);
    }
  });
});

describe("transitionSubscription: trials, cancellation and resume", () => {
  const at = d("2026-10-05T10:00:00Z");

  it("starts a trial only on a PENDING subscription with trial days", () => {
    const result = expectOk(transitionSubscription(snapshot(), { type: "START_TRIAL", at, trialDays: 7 }));
    expect(result.next).toMatchObject({ status: "TRIALING", startedAt: at, trialEndsAt: new Date(at.getTime() + 7 * DAY) });
    expect(transitionSubscription(snapshot(), { type: "START_TRIAL", at, trialDays: 0 })).toMatchObject({ ok: false });
    expect(transitionSubscription(active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z"), { type: "START_TRIAL", at, trialDays: 7 })).toMatchObject({
      ok: false,
      code: "ILLEGAL_TRANSITION",
    });
  });

  it("cancel at period end keeps ACTIVE and records the request; repeating is a no-op", () => {
    const sub = active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z");
    const result = expectOk(transitionSubscription(sub, { type: "CANCEL_AT_PERIOD_END", at, reason: "  exams finished  " }));
    expect(result.next).toMatchObject({ status: "ACTIVE", cancelAtPeriodEnd: true, cancelledAt: at, cancelReason: "exams finished" });
    expect(expectOk(transitionSubscription(result.next, { type: "CANCEL_AT_PERIOD_END", at })).changed).toBe(false);
  });

  it("cancelling a PENDING checkout cancels it; cancelling during grace ends access now", () => {
    expect(expectOk(transitionSubscription(snapshot(), { type: "CANCEL_AT_PERIOD_END", at })).next).toMatchObject({
      status: "CANCELLED",
      cancelledAt: at,
      endedAt: at,
    });
    const pastDue = active("2026-09-01T00:00:00Z", "2026-10-04T00:00:00Z", { status: "PAST_DUE" });
    expect(expectOk(transitionSubscription(pastDue, { type: "CANCEL_AT_PERIOD_END", at })).next).toMatchObject({
      status: "EXPIRED",
      endedAt: at,
    });
  });

  it("cannot cancel an ended subscription at period end", () => {
    expect(transitionSubscription(snapshot({ status: "EXPIRED" }), { type: "CANCEL_AT_PERIOD_END", at })).toMatchObject({ ok: false });
  });

  it("resume clears a pending cancel only while running", () => {
    const cancelling = active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z", { cancelAtPeriodEnd: true, cancelledAt: at, cancelReason: "x" });
    expect(expectOk(transitionSubscription(cancelling, { type: "RESUME" })).next).toMatchObject({
      cancelAtPeriodEnd: false,
      cancelledAt: null,
      cancelReason: null,
    });
    expect(expectOk(transitionSubscription(active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z"), { type: "RESUME" })).changed).toBe(false);
    expect(transitionSubscription(snapshot({ status: "EXPIRED" }), { type: "RESUME" })).toMatchObject({ ok: false });
  });

  it("cancel now ends any live subscription immediately and is idempotent on ended ones", () => {
    const result = expectOk(transitionSubscription(active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z"), { type: "CANCEL_NOW", at, reason: "refund" }));
    expect(result.next).toMatchObject({ status: "CANCELLED", cancelledAt: at, endedAt: at, cancelReason: "refund", cancelAtPeriodEnd: false });
    expect(expectOk(transitionSubscription(result.next, { type: "CANCEL_NOW", at })).changed).toBe(false);
  });

  it("abandons only PENDING checkouts", () => {
    expect(expectOk(transitionSubscription(snapshot(), { type: "ABANDON_CHECKOUT", at })).next).toMatchObject({
      status: "CANCELLED",
      cancelReason: "checkout_abandoned",
      endedAt: at,
    });
    expect(expectOk(transitionSubscription(active("2026-10-01T00:00:00Z", "2026-11-01T00:00:00Z"), { type: "ABANDON_CHECKOUT", at })).changed).toBe(false);
  });

  it("every live or terminal result satisfies the table CHECKs", () => {
    // Subscription_live_period_chk, Subscription_cancelled_chk, Subscription_ended_chk, Subscription_period_chk.
    const starts: SubscriptionSnapshot[] = [
      snapshot(),
      active("2026-09-05T00:00:00Z", "2026-10-05T00:00:00Z"),
      active("2026-09-05T00:00:00Z", "2026-10-05T00:00:00Z", { status: "PAST_DUE" }),
      snapshot({ status: "TRIALING", startedAt: d("2026-10-01T00:00:00Z"), trialEndsAt: d("2026-10-04T00:00:00Z") }),
    ];
    const events = [
      { type: "PAYMENT_SUCCEEDED", paidAt: at, period: MONTHLY, graceDays: 3 },
      { type: "TICK", now: d("2026-12-01T00:00:00Z"), graceDays: 3 },
      { type: "CANCEL_AT_PERIOD_END", at },
      { type: "CANCEL_NOW", at },
      { type: "ABANDON_CHECKOUT", at },
    ] as const;
    for (const start of starts) {
      for (const event of events) {
        const result = transitionSubscription(start, event);
        if (!result.ok) continue;
        const n = result.next;
        if (n.status === "ACTIVE" || n.status === "PAST_DUE") {
          expect(n.currentPeriodStart).not.toBeNull();
          expect(n.currentPeriodEnd).not.toBeNull();
        }
        if (n.status === "TRIALING") expect(n.trialEndsAt).not.toBeNull();
        if (n.status === "CANCELLED") expect(n.cancelledAt).not.toBeNull();
        if (isTerminalSubscriptionStatus(n.status)) expect(n.endedAt).not.toBeNull();
        if (n.currentPeriodStart && n.currentPeriodEnd) {
          expect(n.currentPeriodEnd.getTime()).toBeGreaterThan(n.currentPeriodStart.getTime());
        }
      }
    }
  });
});
