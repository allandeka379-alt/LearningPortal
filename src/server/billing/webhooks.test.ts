import { describe, expect, it } from "vitest";
import type { PaymentStatus } from "@/generated/prisma/client";
import type { PaymentSnapshot } from "./providers/types";
import { decideProviderTransition, localPaymentTransition, mergePaymentMetadata, receiptNumberFor, type ProviderFacts } from "./webhooks";

const at = new Date("2026-10-05T10:00:00Z");

function payment(status: PaymentStatus, overrides: Partial<PaymentSnapshot> = {}): PaymentSnapshot {
  return { status, amountMinor: 500, currency: "USD", refundedAmountMinor: 0, ...overrides };
}

function facts(overrides: Partial<ProviderFacts> = {}): ProviderFacts {
  return { status: "PAID", amountMinor: 500, currency: "USD", failureCode: null, ...overrides };
}

describe("decideProviderTransition", () => {
  it("a matching verified paid succeeds and fulfils", () => {
    expect(decideProviderTransition(payment("PENDING"), facts(), at)).toEqual({
      transition: { kind: "APPLY", from: "PENDING", to: "SUCCESSFUL", patch: { status: "SUCCESSFUL", paidAt: at }, fulfil: true, alertAdmin: false },
      amountMismatch: false,
      providerRefund: false,
    });
  });

  it("an amount or currency mismatch fails a PENDING payment (and only flags a finished one)", () => {
    const decision = decideProviderTransition(payment("PENDING"), facts({ amountMinor: 1 }), at);
    expect(decision.amountMismatch).toBe(true);
    expect(decision.transition).toEqual({
      kind: "APPLY",
      from: "PENDING",
      to: "FAILED",
      patch: { status: "FAILED", failedAt: at, failureCode: "amount_mismatch" },
      fulfil: false,
      alertAdmin: true,
    });
    expect(decideProviderTransition(payment("PENDING"), facts({ currency: "ZWG" }), at).transition).toMatchObject({ to: "FAILED" });
    const late = decideProviderTransition(payment("CANCELLED"), facts({ amountMinor: 1 }), at);
    expect(late).toMatchObject({ amountMismatch: true, transition: { kind: "REJECTED", reason: "AMOUNT_MISMATCH" } });
    // After a mismatch FAILED, a correct verified paid still wins.
    expect(decideProviderTransition(payment("FAILED"), facts(), at).transition).toMatchObject({ to: "SUCCESSFUL", alertAdmin: true });
  });

  it("a paid event without an amount is held for review, never applied", () => {
    expect(decideProviderTransition(payment("PENDING"), facts({ amountMinor: null }), at)).toMatchObject({
      amountMismatch: false,
      transition: { kind: "REJECTED", reason: "AMOUNT_UNKNOWN" },
    });
  });

  it("informational events are no-ops", () => {
    expect(decideProviderTransition(payment("PENDING"), facts({ status: null }), at).transition.kind).toBe("NOOP");
    expect(decideProviderTransition(payment("PENDING"), facts({ status: "PENDING" }), at).transition.kind).toBe("NOOP");
  });

  it("records cumulative provider refunds as deltas (partial, then full, replays are no-ops)", () => {
    const partial = decideProviderTransition(payment("SUCCESSFUL"), facts({ status: null, refundedAmountMinor: 200 }), at);
    expect(partial).toMatchObject({
      providerRefund: true,
      transition: { kind: "APPLY", to: "SUCCESSFUL", patch: { refundedAmountMinor: 200, refundedAt: at }, alertAdmin: true },
    });
    const replay = decideProviderTransition(payment("SUCCESSFUL", { refundedAmountMinor: 200 }), facts({ status: null, refundedAmountMinor: 200 }), at);
    expect(replay.transition.kind).toBe("NOOP");
    const full = decideProviderTransition(payment("SUCCESSFUL", { refundedAmountMinor: 200 }), facts({ status: "REFUNDED", refundedAmountMinor: 500 }), at);
    expect(full.transition).toMatchObject({ kind: "APPLY", to: "REFUNDED", patch: { status: "REFUNDED", refundedAmountMinor: 500 } });
    // A refund report for a payment that never succeeded is rejected.
    expect(decideProviderTransition(payment("PENDING"), facts({ status: "REFUNDED", refundedAmountMinor: 500 }), at).transition).toMatchObject({
      kind: "REJECTED",
      reason: "INVALID_REFUND",
    });
    // Without an amount, REFUNDED means a full provider-side refund.
    expect(decideProviderTransition(payment("SUCCESSFUL"), facts({ status: "REFUNDED" }), at)).toMatchObject({
      providerRefund: true,
      transition: { to: "REFUNDED", alertAdmin: true },
    });
  });
});

describe("localPaymentTransition", () => {
  it("expires, cancels, supersedes and fails only PENDING payments", () => {
    expect(localPaymentTransition(payment("PENDING"), "EXPIRED", at)).toMatchObject({
      to: "CANCELLED",
      patch: { cancelledAt: at, failureCode: "expired" },
    });
    expect(localPaymentTransition(payment("PENDING"), "USER_CANCELLED", at)).toMatchObject({ patch: { failureCode: "user_cancelled" } });
    expect(localPaymentTransition(payment("PENDING"), "SUPERSEDED", at)).toMatchObject({
      to: "CANCELLED",
      patch: { status: "CANCELLED", failureCode: "superseded" },
    });
    expect(localPaymentTransition(payment("PENDING"), "CHECKOUT_FAILED", at)).toMatchObject({
      to: "FAILED",
      patch: { status: "FAILED", failedAt: at, failureCode: "checkout_failed" },
    });
    for (const action of ["EXPIRED", "USER_CANCELLED", "SUPERSEDED", "CHECKOUT_FAILED"] as const) {
      expect(localPaymentTransition(payment("SUCCESSFUL"), action, at).kind).toBe("NOOP");
    }
  });
});

describe("receipts and metadata", () => {
  it("receipt numbers are deterministic per payment and carry the year", () => {
    const id = "0199a9b0-0000-7000-8000-000000000001";
    const receipt = receiptNumberFor(id, at);
    expect(receipt).toMatch(/^R-2026-[0-9A-HJKMNP-TV-Z]{12}$/);
    expect(receiptNumberFor(id.toUpperCase(), at)).toBe(receipt);
    expect(receiptNumberFor("0199a9b0-0000-7000-8000-000000000002", at)).not.toBe(receipt);
    expect(receipt.length).toBeLessThanOrEqual(32);
  });

  it("merges flat metadata, drops odd keys and nested values, and scrubs contact details", () => {
    const merged = mergePaymentMetadata(
      { maskedMsisdn: "+263 77* *** 567", nested: { a: 1 }, ok: true },
      { providerStatus: "Paid", note: "call +263771234567", "bad key": "x", count: 2, nan: Number.NaN },
    );
    expect(merged).toEqual({ maskedMsisdn: "+263 77* *** 567", ok: true, providerStatus: "Paid", note: "call [PHONE]", count: 2 });
    expect(mergePaymentMetadata(null, {})).toEqual({});
  });
});
