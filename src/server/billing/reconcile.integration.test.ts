import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { getJobHandler, recurringJobs } from "@/server/lib/jobs";
import { createStudent } from "../../../tests/factories/index";
import { clearEntitlementCaches } from "./entitlements";
import {
  PAYMENTS_RECONCILE_EVERY_MINUTES,
  PAYMENTS_RECONCILE_JOB,
  pollPayment,
  reconcilePendingPayments,
  registerPaymentJobs,
} from "./reconcile";
import { createPaidPlan, createPendingPayment, paymentsTestEnv, paynowMessage, stripeSession } from "./testing";

// The dormant Stripe adapter is tested here, so `features.stripe` is on for this file (off by default: owner decision
// 2026-10-07; the Stripe-off behaviour is covered by providers/registry.test.ts and the webhook route test).
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: true }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Reconciliation against Postgres with provider polls mocked (global `fetch` stubbed). Every run is restricted to the
 * payments created by the test (`paymentIds`), because the shared test database holds other files' PENDING payments.
 */

const env = paymentsTestEnv();
const HOUR = 3_600_000;

beforeEach(() => {
  clearEntitlementCaches();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function stubFetch(handler: (url: string) => Response | Promise<Response>) {
  const mock = vi.fn(async (url: string | URL | Request) => handler(String(url)));
  vi.stubGlobal("fetch", mock);
  return mock;
}

async function paynowPending(options: { createdAt?: Date; expiresAt?: Date | null; withReference?: boolean } = {}) {
  const { plan, price } = await createPaidPlan();
  const { user: student } = await createStudent();
  const guid = randomUUID();
  const pollUrl = `https://www.paynow.co.zw/Interface/CheckPayment/?guid=${guid}`;
  const withReference = options.withReference ?? true;
  const created = await createPendingPayment({
    provider: "paynow",
    payerUserId: student.id,
    beneficiaryUserId: student.id,
    planId: plan.id,
    planPriceId: price.id,
    providerReference: withReference ? guid : null,
    providerPollUrl: withReference ? pollUrl : null,
    createdAt: options.createdAt ?? new Date(Date.now() - 20 * 60_000),
    ...(options.expiresAt !== undefined ? { expiresAt: options.expiresAt } : {}),
  });
  return { ...created, pollUrl, student };
}

function paynowStatus(paymentId: string, status: string, amount = "5.00"): Response {
  return new Response(
    paynowMessage([
      ["reference", paymentId],
      ["paynowreference", "31337"],
      ["amount", amount],
      ["status", status],
    ]),
  );
}

describe("reconcilePendingPayments", () => {
  it("polls a stale Paynow payment and applies a Paid answer (fulfils through the same path)", async () => {
    const { payment, subscription, pollUrl } = await paynowPending();
    const fetchMock = stubFetch(() => paynowStatus(payment.id, "Paid"));
    const result = await reconcilePendingPayments({ env, paymentIds: [payment.id] });
    expect(result).toEqual({ scanned: 1, polled: 1, updated: 1, expired: 0, errors: 0 });
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(pollUrl);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("SUCCESSFUL");
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("ACTIVE");
    const event = await db.paymentEvent.findFirstOrThrow({ where: { paymentId: payment.id, signatureValid: true } });
    expect(event).toMatchObject({ source: "POLL", eventType: "paynow.poll", mappedStatus: "SUCCESSFUL" });

    // Nothing left to do on the next run.
    await expect(reconcilePendingPayments({ env, paymentIds: [payment.id] })).resolves.toMatchObject({ scanned: 0 });
  });

  it("leaves young payments to the webhook, and still-pending ones alone until they expire", async () => {
    const young = await paynowPending({ createdAt: new Date(Date.now() - 60_000) });
    const waiting = await paynowPending();
    const fetchMock = stubFetch(() => paynowStatus(waiting.payment.id, "Sent"));
    const result = await reconcilePendingPayments({ env, paymentIds: [young.payment.id, waiting.payment.id] });
    expect(result).toEqual({ scanned: 1, polled: 1, updated: 0, expired: 0, errors: 0 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect((await db.payment.findUniqueOrThrow({ where: { id: waiting.payment.id } })).status).toBe("PENDING");
  });

  it("expires payments past their deadline that the provider still does not report as paid", async () => {
    const old = await paynowPending({ createdAt: new Date(Date.now() - 30 * HOUR), expiresAt: new Date(Date.now() - 6 * HOUR) });
    const noReference = await paynowPending({
      createdAt: new Date(Date.now() - 30 * HOUR),
      expiresAt: new Date(Date.now() - 6 * HOUR),
      withReference: false,
    });
    const fetchMock = stubFetch((url) => (url === old.pollUrl ? paynowStatus(old.payment.id, "Sent") : new Response("", { status: 500 })));
    const result = await reconcilePendingPayments({ env, paymentIds: [old.payment.id, noReference.payment.id] });
    expect(result).toEqual({ scanned: 2, polled: 1, updated: 0, expired: 2, errors: 0 });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    for (const id of [old.payment.id, noReference.payment.id]) {
      const row = await db.payment.findUniqueOrThrow({ where: { id } });
      expect(row).toMatchObject({ status: "CANCELLED", failureCode: "expired" });
      expect(row.cancelledAt).not.toBeNull();
      const event = await db.paymentEvent.findFirstOrThrow({ where: { paymentId: id, eventType: "local.expired" } });
      expect(event).toMatchObject({ source: "RECONCILIATION", mappedStatus: "CANCELLED" });
    }
    // A late verified "paid" after expiry arrives by webhook and still wins (CANCELLED -> SUCCESSFUL, state machine).
  });

  it("a failing provider counts as an error and changes nothing", async () => {
    const { payment } = await paynowPending();
    stubFetch(() => {
      throw new TypeError("fetch failed");
    });
    await expect(reconcilePendingPayments({ env, paymentIds: [payment.id] })).resolves.toEqual({
      scanned: 1,
      polled: 0,
      updated: 0,
      expired: 0,
      errors: 1,
    });
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
    expect(await db.paymentEvent.count({ where: { paymentId: payment.id } })).toBe(0);
  });

  it("an amount mismatch reported by a poll fails the payment", async () => {
    const { payment } = await paynowPending();
    stubFetch(() => paynowStatus(payment.id, "Paid", "0.01"));
    await reconcilePendingPayments({ env, paymentIds: [payment.id] });
    expect(await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).toMatchObject({ status: "FAILED", failureCode: "amount_mismatch" });
  });
});

describe("pollPayment (return page)", () => {
  it("asks Stripe once about a pending session and applies the answer; finished payments are not polled", async () => {
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const sessionId = `cs_test_${randomUUID().replace(/-/g, "")}`;
    const { payment, subscription } = await createPendingPayment({
      provider: "stripe",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
      providerReference: sessionId,
    });
    const fetchMock = stubFetch(() => Response.json(stripeSession(payment.id, sessionId)));
    await expect(pollPayment(payment.id, { env })).resolves.toEqual({
      paymentId: payment.id,
      status: "SUCCESSFUL",
      polled: true,
      outcome: "APPLIED",
    });
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`);
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("ACTIVE");

    await expect(pollPayment(payment.id, { env })).resolves.toMatchObject({ status: "SUCCESSFUL", polled: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    await expect(pollPayment("not-a-uuid", { env })).resolves.toBeNull();
    await expect(pollPayment(randomUUID(), { env })).resolves.toBeNull();
  });

  it("does not poll a provider that is disabled here", async () => {
    const { payment } = await paynowPending();
    const fetchMock = stubFetch(() => new Response(""));
    const sandboxOnly = paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "sandbox" });
    await expect(pollPayment(payment.id, { env: sandboxOnly })).resolves.toMatchObject({ status: "PENDING", polled: false });
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("job registration", () => {
  it("registers payments.reconcile on the payments queue every 10 minutes", () => {
    registerPaymentJobs();
    expect(getJobHandler(PAYMENTS_RECONCILE_JOB)).toMatchObject({ queue: "payments", maxAttempts: 3 });
    expect(recurringJobs().find((job) => job.name === PAYMENTS_RECONCILE_JOB)).toMatchObject({
      everyMinutes: PAYMENTS_RECONCILE_EVERY_MINUTES,
      type: PAYMENTS_RECONCILE_JOB,
      queue: "payments",
    });
  });
});
