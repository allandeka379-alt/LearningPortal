import { randomUUID } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { createPaidPlan, createPendingPayment } from "@/server/billing/testing";
import type { PaymentProvider, RefundRequest, RefundResult } from "@/server/billing/providers/types";
import { processProviderEvent } from "@/server/billing/webhooks";
import { db } from "@/server/db";
import { createStudent, createUser } from "../../../../tests/factories/index";
import type { CmsActor } from "../users/access";
import { getPaymentDetail, listPayments, markPaymentDisputed, refundPayment } from "./payments";

/**
 * Payments admin against Postgres: lists, the PaymentEvent timeline, refunds through the payment state machine
 * (provider API with an injected adapter, provider without a refund API, staff-recorded manual refunds), disputes.
 */

async function actorWith(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

async function successfulPayment(provider: "paynow" | "stripe" | "sandbox" = "paynow", amountMinor = 500) {
  const { plan, price } = await createPaidPlan({ amountMinor });
  const { user: student } = await createStudent();
  const { payment, subscription } = await createPendingPayment({
    provider,
    payerUserId: student.id,
    beneficiaryUserId: student.id,
    planId: plan.id,
    planPriceId: price.id,
    amountMinor,
    providerReference: randomUUID(),
  });
  const processed = await processProviderEvent({
    provider,
    source: "POLL",
    providerEventId: randomUUID(),
    eventType: "test.poll",
    paymentId: payment.id,
    providerRef: null,
    status: "PAID",
    providerStatus: "paid",
    amountMinor,
    currency: "USD",
    failureCode: null,
    occurredAt: null,
    payload: { test: true },
  });
  expect(processed.paymentStatus).toBe("SUCCESSFUL");
  const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id }, select: { receiptNumber: true, providerReference: true } });
  return { student, payment, subscription, receiptNumber: row.receiptNumber, providerReference: row.providerReference };
}

function fakeProvider(result: RefundResult | Error, calls: RefundRequest[] = []): PaymentProvider {
  return {
    id: "stripe",
    displayName: "Fake",
    supports: () => true,
    createCheckout: () => Promise.reject(new Error("not used")),
    verifyWebhook: () => Promise.resolve(null),
    poll: () => Promise.reject(new Error("not used")),
    refund: (input) => {
      calls.push(input);
      return result instanceof Error ? Promise.reject(result) : Promise.resolve(result);
    },
  };
}

describe("payment lists and details", () => {
  it("finds payments by receipt, id and payer email, with filters; editors are refused", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { payment, receiptNumber, student } = await successfulPayment();
    expect(receiptNumber).toMatch(/^R-\d{4}-/);

    expect((await listPayments(admin, { q: receiptNumber ?? "" })).items.map((item) => item.id)).toEqual([payment.id]);
    expect((await listPayments(admin, { q: payment.id })).items[0]).toMatchObject({ status: "SUCCESSFUL", amountMinor: 500, currency: "USD", payer: { id: student.id } });
    expect((await listPayments(admin, { q: student.emailNormalized ?? "" })).items.map((item) => item.id)).toEqual([payment.id]);
    expect((await listPayments(admin, { q: payment.id, status: "FAILED" })).items).toEqual([]);
    expect((await listPayments(admin, { q: payment.id, provider: "paynow", purpose: "SUBSCRIPTION", currency: "USD" })).items).toHaveLength(1);

    await expect(listPayments(await actorWith(["CONTENT_EDITOR"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
    await expect(listPayments(await actorWith(["PARENT"]))).rejects.toMatchObject({ code: "FORBIDDEN" });
  });

  it("returns the event timeline and how a refund can be made, never the poll URL", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { payment } = await successfulPayment("paynow");
    const detail = await getPaymentDetail(admin, payment.id);
    expect(detail.status).toBe("SUCCESSFUL");
    expect(detail.events).toHaveLength(1);
    expect(detail.events[0]).toMatchObject({ source: "POLL", mappedStatus: "SUCCESSFUL", signatureValid: true });
    expect(detail.refund).toEqual({ refundableMinor: 500, support: "manual_only", allowed: true });
    expect(detail.canMarkDisputed).toBe(true);
    expect(JSON.stringify(detail)).not.toContain("providerPollUrl");
    await expect(getPaymentDetail(admin, "not-a-uuid")).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("refunds", () => {
  it("records manual partial then full refunds through the state machine, flagging the subscription for review", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { payment, subscription } = await successfulPayment("paynow", 1000);

    const partial = await refundPayment(admin, { paymentId: payment.id, method: "MANUAL", amount: "2.50", reason: "Refunded half a week in the Paynow dashboard", externalReference: "PN-REF-1" });
    expect(partial).toMatchObject({ outcome: "REFUNDED", status: "SUCCESSFUL", refundedMinor: 250, totalRefundedMinor: 250, full: false, needsReview: false });

    await expect(refundPayment(admin, { paymentId: payment.id, method: "MANUAL", amount: "8.00", reason: "Too much money back" })).rejects.toMatchObject({
      code: "VALIDATION",
      fieldErrors: { amount: expect.any(Array) },
    });

    const full = await refundPayment(admin, { paymentId: payment.id, method: "MANUAL", amount: "", reason: "Remaining balance returned to the parent" });
    expect(full).toMatchObject({ outcome: "REFUNDED", status: "REFUNDED", refundedMinor: 750, totalRefundedMinor: 1000, full: true, needsReview: true });

    const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(row).toMatchObject({ status: "REFUNDED", refundedAmountMinor: 1000, refundedById: admin.userId, refundReason: "Remaining balance returned to the parent" });
    expect(row.metadata).toMatchObject({ needsReview: true, refundReference: "PN-REF-1", lastRefundMethod: "manual" });

    const events = await db.paymentEvent.findMany({ where: { paymentId: payment.id, source: "MANUAL" }, orderBy: { createdAt: "asc" } });
    expect(events.map((event) => [event.eventType, event.amountMinor, event.mappedStatus, event.recordedById])).toEqual([
      ["staff.refund.manual", 250, null, admin.userId],
      ["staff.refund.manual", 750, "REFUNDED", admin.userId],
    ]);
    expect(events[1]?.processingError).toMatch(/review the subscription/);

    const audits = await db.auditLog.findMany({ where: { entityType: "Payment", entityId: payment.id, actorUserId: admin.userId }, orderBy: { createdAt: "asc" } });
    expect(audits.map((entry) => entry.action)).toEqual(["payment.refund", "payment.refund", "payment.needs_review"]);
    expect(audits[0]?.reason).toBe("Refunded half a week in the Paynow dashboard");
    expect(audits[2]?.metadata).toMatchObject({ reason: "subscription_refunded", subscriptionId: subscription.id });

    await expect(refundPayment(admin, { paymentId: payment.id, method: "MANUAL", reason: "Nothing left to refund" })).rejects.toMatchObject({ code: "CONFLICT" });
    expect((await getPaymentDetail(admin, payment.id)).details.needsReview).toBe(true);
  });

  it("refunds through the provider under the row lock; a provider without a refund API records nothing", async () => {
    const admin = await actorWith(["SUPER_ADMIN"]);
    const { payment, providerReference } = await successfulPayment("stripe", 800);

    const manualOnly = await refundPayment(admin, { paymentId: payment.id, method: "PROVIDER", reason: "Customer asked for a refund" }, null, {
      providerFor: () => fakeProvider({ status: "MANUAL_REQUIRED" }),
    });
    expect(manualOnly).toEqual({ outcome: "MANUAL_REQUIRED", status: "SUCCESSFUL" });
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).refundedAmountMinor).toBe(0);

    await expect(
      refundPayment(admin, { paymentId: payment.id, method: "PROVIDER", reason: "Customer asked for a refund" }, null, {
        providerFor: () => fakeProvider(new Error("provider down")),
      }),
    ).rejects.toThrow("provider down");
    expect(await db.paymentEvent.count({ where: { paymentId: payment.id, source: "MANUAL" } })).toBe(0);

    const calls: RefundRequest[] = [];
    const refunded = await refundPayment(admin, { paymentId: payment.id, method: "PROVIDER", amount: "3", reason: "Customer asked for a refund" }, null, {
      providerFor: () => fakeProvider({ status: "PENDING", providerRef: "re_test_123" }, calls),
    });
    expect(refunded).toMatchObject({ outcome: "REFUNDED", refundedMinor: 300, full: false, providerStatus: "PENDING" });
    expect(calls).toEqual([{ providerRef: providerReference, amountMinor: 300, currency: "USD", reason: "Customer asked for a refund" }]);
    const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(row.metadata).toMatchObject({ providerRefundRef: "re_test_123", lastRefundMethod: "provider" });
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Payment", entityId: payment.id, action: "payment.refund" } });
    expect(audit.metadata).toMatchObject({ operation: "payment.refund.provider", amountMinor: 300, providerStatus: "PENDING" });
  });

  it("refuses refunds of unpaid payments and by non-refund staff", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const { payment } = await createPendingPayment({ provider: "paynow", payerUserId: student.id, beneficiaryUserId: student.id, planId: plan.id, planPriceId: price.id });
    await expect(refundPayment(admin, { paymentId: payment.id, method: "MANUAL", reason: "Should not be possible" })).rejects.toMatchObject({ code: "CONFLICT" });
    await expect(refundPayment(await actorWith(["CONTENT_EDITOR"]), { paymentId: payment.id, method: "MANUAL", reason: "Not allowed here" })).rejects.toMatchObject({
      code: "FORBIDDEN",
    });
    await expect(refundPayment(admin, { paymentId: payment.id, method: "MANUAL", reason: "abc" })).rejects.toMatchObject({ code: "VALIDATION" });
  });
});

describe("disputes", () => {
  it("marks a paid payment disputed once, with an event and an audit entry", async () => {
    const admin = await actorWith(["ADMIN"]);
    const { payment } = await successfulPayment("paynow");
    await markPaymentDisputed(admin, { paymentId: payment.id, reason: "EcoCash reversal request from the payer" });
    const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(row.status).toBe("SUCCESSFUL");
    expect(row.metadata).toMatchObject({ disputed: true, disputeSource: "staff" });
    expect(await db.paymentEvent.count({ where: { paymentId: payment.id, eventType: "staff.dispute", recordedById: admin.userId } })).toBe(1);
    const audit = await db.auditLog.findFirstOrThrow({ where: { entityType: "Payment", entityId: payment.id, action: "payment.disputed" } });
    expect(audit).toMatchObject({ actorUserId: admin.userId, reason: "EcoCash reversal request from the payer" });
    await expect(markPaymentDisputed(admin, { paymentId: payment.id, reason: "EcoCash reversal request again" })).rejects.toMatchObject({ code: "CONFLICT" });
    const listed = await listPayments(admin, { q: payment.id });
    expect(listed.items[0]?.disputed).toBe(true);
    expect((await getPaymentDetail(admin, payment.id)).canMarkDisputed).toBe(false);
  });
});
