import { describe, expect, it } from "vitest";
import type { PaymentStatus } from "@/generated/prisma/client";
import {
  canTransitionPayment,
  idempotencyKeySchema,
  isCurrencyCode,
  mapProviderStatus,
  syntheticEventId,
  transitionPayment,
  type PaymentSnapshot,
  type PaymentStateEvent,
} from "./types";

const at = new Date("2026-10-05T10:00:00Z");

function payment(status: PaymentStatus, overrides: Partial<PaymentSnapshot> = {}): PaymentSnapshot {
  return { status, amountMinor: 500, currency: "USD", refundedAmountMinor: 0, ...overrides };
}

function paid(overrides: Partial<Extract<PaymentStateEvent, { type: "PROVIDER_STATUS" }>> = {}): PaymentStateEvent {
  return { type: "PROVIDER_STATUS", status: "PAID", verified: true, amountMinor: 500, currency: "USD", at, ...overrides };
}

describe("canTransitionPayment (mirrors the Payment_guard trigger)", () => {
  const all: PaymentStatus[] = ["PENDING", "SUCCESSFUL", "FAILED", "REFUNDED", "CANCELLED"];

  it("allows PENDING to move anywhere else", () => {
    for (const to of all.filter((s) => s !== "PENDING")) expect(canTransitionPayment("PENDING", to)).toBe(true);
  });

  it("allows only late success out of FAILED/CANCELLED and only refund out of SUCCESSFUL", () => {
    expect(canTransitionPayment("FAILED", "SUCCESSFUL")).toBe(true);
    expect(canTransitionPayment("CANCELLED", "SUCCESSFUL")).toBe(true);
    expect(canTransitionPayment("SUCCESSFUL", "REFUNDED")).toBe(true);
    expect(canTransitionPayment("FAILED", "CANCELLED")).toBe(false);
    expect(canTransitionPayment("SUCCESSFUL", "FAILED")).toBe(false);
    expect(canTransitionPayment("SUCCESSFUL", "PENDING")).toBe(false);
    for (const to of all) expect(canTransitionPayment("REFUNDED", to)).toBe(false);
  });

  it("treats same-state as not a transition", () => {
    for (const s of all) expect(canTransitionPayment(s, s)).toBe(false);
  });
});

describe("transitionPayment", () => {
  it("PENDING + verified paid with matching amount -> SUCCESSFUL and fulfils", () => {
    const result = transitionPayment(payment("PENDING"), paid());
    expect(result).toEqual({
      kind: "APPLY",
      from: "PENDING",
      to: "SUCCESSFUL",
      patch: { status: "SUCCESSFUL", paidAt: at },
      fulfil: true,
      alertAdmin: false,
    });
  });

  it("accepts a lower-case currency from the provider", () => {
    const result = transitionPayment(payment("PENDING"), paid({ currency: "usd" }));
    expect(result.kind).toBe("APPLY");
  });

  it("rejects unverified events whatever they claim", () => {
    const result = transitionPayment(payment("PENDING"), paid({ verified: false }));
    expect(result).toMatchObject({ kind: "REJECTED", reason: "UNVERIFIED" });
  });

  it("routes amount or currency mismatches to manual review", () => {
    expect(transitionPayment(payment("PENDING"), paid({ amountMinor: 499 }))).toMatchObject({
      kind: "REJECTED",
      reason: "AMOUNT_MISMATCH",
    });
    expect(transitionPayment(payment("PENDING"), paid({ currency: "ZWG" }))).toMatchObject({
      kind: "REJECTED",
      reason: "AMOUNT_MISMATCH",
    });
    expect(transitionPayment(payment("PENDING"), paid({ amountMinor: null }))).toMatchObject({
      kind: "REJECTED",
      reason: "AMOUNT_UNKNOWN",
    });
  });

  it("lets a late verified paid win over FAILED and CANCELLED, alerting an admin", () => {
    for (const from of ["FAILED", "CANCELLED"] as const) {
      const result = transitionPayment(payment(from), paid());
      expect(result).toMatchObject({ kind: "APPLY", from, to: "SUCCESSFUL", fulfil: true, alertAdmin: true });
    }
  });

  it("is a no-op for duplicate paid events", () => {
    expect(transitionPayment(payment("SUCCESSFUL"), paid()).kind).toBe("NOOP");
    expect(transitionPayment(payment("REFUNDED", { refundedAmountMinor: 500 }), paid()).kind).toBe("NOOP");
  });

  it("treats a provider PENDING status as informational", () => {
    expect(transitionPayment(payment("PENDING"), paid({ status: "PENDING" })).kind).toBe("NOOP");
  });

  it("PENDING + failed -> FAILED with a normalised failure code", () => {
    const result = transitionPayment(payment("PENDING"), paid({ status: "FAILED", failureCode: "Insufficient Funds" }));
    expect(result).toMatchObject({
      kind: "APPLY",
      to: "FAILED",
      patch: { status: "FAILED", failedAt: at, failureCode: "insufficient_funds" },
      fulfil: false,
    });
    const fallback = transitionPayment(payment("PENDING"), paid({ status: "FAILED", failureCode: null }));
    expect(fallback).toMatchObject({ patch: { failureCode: "declined" } });
  });

  it("never moves a terminal payment back to FAILED or CANCELLED", () => {
    for (const from of ["SUCCESSFUL", "FAILED", "CANCELLED", "REFUNDED"] as const) {
      expect(transitionPayment(payment(from), paid({ status: "FAILED" })).kind).toBe("NOOP");
      expect(transitionPayment(payment(from), paid({ status: "CANCELLED" })).kind).toBe("NOOP");
    }
  });

  it("user cancel and expiry cancel only PENDING payments", () => {
    expect(transitionPayment(payment("PENDING"), { type: "USER_CANCELLED", at })).toMatchObject({
      kind: "APPLY",
      to: "CANCELLED",
      patch: { status: "CANCELLED", cancelledAt: at, failureCode: "user_cancelled" },
    });
    expect(transitionPayment(payment("PENDING"), { type: "EXPIRED", at })).toMatchObject({
      patch: { failureCode: "expired" },
    });
    expect(transitionPayment(payment("SUCCESSFUL"), { type: "EXPIRED", at }).kind).toBe("NOOP");
  });

  it("partial refunds accumulate and keep SUCCESSFUL; the last one makes it REFUNDED", () => {
    const partial = transitionPayment(payment("SUCCESSFUL"), { type: "REFUND_RECORDED", amountMinor: 200, at });
    expect(partial).toEqual({
      kind: "APPLY",
      from: "SUCCESSFUL",
      to: "SUCCESSFUL",
      patch: { refundedAmountMinor: 200, refundedAt: at },
      fulfil: false,
      alertAdmin: false,
    });
    const rest = transitionPayment(payment("SUCCESSFUL", { refundedAmountMinor: 200 }), {
      type: "REFUND_RECORDED",
      amountMinor: 300,
      at,
    });
    expect(rest).toMatchObject({ to: "REFUNDED", patch: { status: "REFUNDED", refundedAmountMinor: 500 } });
  });

  it("rejects refunds that exceed the refundable amount or target unpaid payments", () => {
    expect(
      transitionPayment(payment("SUCCESSFUL", { refundedAmountMinor: 400 }), { type: "REFUND_RECORDED", amountMinor: 101, at }),
    ).toMatchObject({ kind: "REJECTED", reason: "INVALID_REFUND" });
    expect(transitionPayment(payment("SUCCESSFUL"), { type: "REFUND_RECORDED", amountMinor: 0, at })).toMatchObject({
      reason: "INVALID_REFUND",
    });
    expect(transitionPayment(payment("PENDING"), { type: "REFUND_RECORDED", amountMinor: 100, at })).toMatchObject({
      reason: "INVALID_REFUND",
    });
  });

  it("records a provider-side full refund and alerts staff", () => {
    const result = transitionPayment(payment("SUCCESSFUL"), paid({ status: "REFUNDED" }));
    expect(result).toMatchObject({
      kind: "APPLY",
      to: "REFUNDED",
      patch: { status: "REFUNDED", refundedAmountMinor: 500, refundedAt: at },
      alertAdmin: true,
    });
    expect(transitionPayment(payment("PENDING"), paid({ status: "REFUNDED" }))).toMatchObject({ reason: "ILLEGAL" });
  });

  it("every APPLY it produces is a legal database transition", () => {
    const statuses: PaymentStatus[] = ["PENDING", "SUCCESSFUL", "FAILED", "REFUNDED", "CANCELLED"];
    const events: PaymentStateEvent[] = [
      paid(),
      paid({ status: "FAILED" }),
      paid({ status: "CANCELLED" }),
      paid({ status: "REFUNDED" }),
      { type: "USER_CANCELLED", at },
      { type: "EXPIRED", at },
      { type: "REFUND_RECORDED", amountMinor: 500, at },
    ];
    for (const status of statuses) {
      for (const event of events) {
        const result = transitionPayment(payment(status), event);
        if (result.kind === "APPLY" && result.from !== result.to) {
          expect(canTransitionPayment(result.from, result.to)).toBe(true);
        }
      }
    }
  });
});

describe("helpers", () => {
  it("mapProviderStatus", () => {
    expect(mapProviderStatus("PAID")).toBe("SUCCESSFUL");
    expect(mapProviderStatus("FAILED")).toBe("FAILED");
    expect(mapProviderStatus("CANCELLED")).toBe("CANCELLED");
    expect(mapProviderStatus("REFUNDED")).toBe("REFUNDED");
    expect(mapProviderStatus("PENDING")).toBeNull();
    expect(mapProviderStatus(null)).toBeNull();
  });

  it("syntheticEventId is deterministic, provider-scoped and status-sensitive", () => {
    const a = syntheticEventId("paynow", ["ref-1", "Paid", "pn-9"]);
    expect(a).toMatch(/^[0-9a-f]{64}$/);
    expect(syntheticEventId("paynow", ["ref-1", "Paid", "pn-9"])).toBe(a);
    expect(syntheticEventId("paynow", ["ref-1", "Cancelled", "pn-9"])).not.toBe(a);
    expect(syntheticEventId("sandbox", ["ref-1", "Paid", "pn-9"])).not.toBe(a);
    // Part boundaries matter: ["ab", "c"] must not collide with ["a", "bc"].
    expect(syntheticEventId("paynow", ["ab", "c"])).not.toBe(syntheticEventId("paynow", ["a", "bc"]));
    expect(() => syntheticEventId("paynow", [])).toThrow(RangeError);
  });

  it("isCurrencyCode", () => {
    expect(isCurrencyCode("USD")).toBe(true);
    expect(isCurrencyCode("usd")).toBe(false);
    expect(isCurrencyCode("US")).toBe(false);
  });

  it("idempotencyKeySchema accepts UUIDs and URL-safe tokens only", () => {
    expect(idempotencyKeySchema.parse(" 0199a000-0000-7000-8000-000000000001 ")).toBe("0199a000-0000-7000-8000-000000000001");
    expect(idempotencyKeySchema.safeParse("short").success).toBe(false);
    expect(idempotencyKeySchema.safeParse("x".repeat(65)).success).toBe(false);
    expect(idempotencyKeySchema.safeParse("has spaces in the middle!").success).toBe(false);
  });
});
