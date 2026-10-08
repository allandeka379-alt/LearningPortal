import { createHash, randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { createStudent } from "../../../tests/factories/index";
import { clearEntitlementCaches, getEntitlements } from "./entitlements";
import { syntheticEventId } from "./providers/types";
import {
  TEST_PAYNOW_POLL_URL,
  createPaidPlan,
  createPendingPayment,
  paymentAudit,
  paymentsTestEnv,
  paynowMessage,
  paynowUpdate,
  paynowWebhookRequest,
  stripeEvent,
  stripeSession,
  stripeWebhookRequest,
} from "./testing";
import { PAYMENT_AUDIT_ACTIONS, handleWebhook, processProviderEvent } from "./webhooks";

// The dormant Stripe adapter is tested here, so `features.stripe` is on for this file (off by default: owner decision
// 2026-10-07; the Stripe-off behaviour is covered by providers/registry.test.ts and the webhook route test).
const featureFlags = vi.hoisted(() => ({ ai: false, whatsapp: false, email: false, sms: false, stripe: true }));
vi.mock("@/server/lib/settings", async (importOriginal) =>
  (await import("../../../tests/support/feature-flags")).settingsWithFeatureFlags(await importOriginal(), featureFlags),
);

/**
 * Webhook intake against Postgres (shared test DB): signature/hash verification, idempotent PaymentEvent rows, the
 * payment state machine, fulfilment in the same transaction and the audit trail. No network: Paynow and Stripe
 * messages are built and signed locally with the test keys.
 */

const env = paymentsTestEnv();

beforeEach(() => {
  clearEntitlementCaches();
});

async function paynowFixture(options: { amountMinor?: number } = {}) {
  const { plan, price } = await createPaidPlan(options.amountMinor === undefined ? {} : { amountMinor: options.amountMinor });
  const { user: student } = await createStudent();
  const { payment, subscription } = await createPendingPayment({
    provider: "paynow",
    payerUserId: student.id,
    beneficiaryUserId: student.id,
    planId: plan.id,
    planPriceId: price.id,
    ...(options.amountMinor === undefined ? {} : { amountMinor: options.amountMinor }),
    // A unique provider reference per test (the shared poll URL GUID would collide on the unique index).
    providerReference: randomUUID(),
  });
  return { plan, price, student, payment, subscription };
}

function validEvents(paymentId: string) {
  return db.paymentEvent.findMany({
    where: { paymentId, signatureValid: true },
    select: { source: true, mappedStatus: true, processedAt: true, processingError: true, providerEventId: true, eventType: true },
  });
}

describe("Paynow result URL", () => {
  it("a verified Paid update activates the subscription once; a replay is acknowledged and not reprocessed", async () => {
    const { plan, student, payment, subscription } = await paynowFixture();
    const body = paynowMessage(paynowUpdate(payment.id, { paynowreference: "778899" }));

    const first = await handleWebhook("paynow", paynowWebhookRequest(body), { env });
    expect(first).toEqual({ status: 200, body: { received: true } });

    const paid = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(paid).toMatchObject({ status: "SUCCESSFUL", providerPollUrl: TEST_PAYNOW_POLL_URL });
    expect(paid.paidAt).not.toBeNull();
    expect(paid.fulfilledAt).not.toBeNull();
    expect(paid.receiptNumber).toMatch(/^R-\d{4}-[0-9A-Z]{12}$/);
    expect(paid.metadata).toMatchObject({ paynowReference: "778899", providerStatus: "Paid" });
    const sub = await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } });
    expect(sub.status).toBe("ACTIVE");
    expect(sub.currentPeriodEnd!.getTime()).toBeGreaterThan(Date.now());
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);

    const events = await validEvents(payment.id);
    expect(events).toHaveLength(1);
    expect(events[0]).toMatchObject({ source: "WEBHOOK", mappedStatus: "SUCCESSFUL", processingError: null, eventType: "paynow.status_update" });
    expect(events[0]?.processedAt).not.toBeNull();
    expect(events[0]?.providerEventId).toBe(syntheticEventId("paynow", [payment.id, "paid", "778899", "500"]));
    const audit = await paymentAudit(payment.id);
    expect(audit).toHaveLength(1);
    expect(audit[0]).toMatchObject({ action: PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE, actorUserId: null, after: { status: "SUCCESSFUL" } });
    // The fulfilment queues the learner's referral check (§46) in the same transaction.
    expect(await db.job.findFirst({ where: { type: "referrals.qualify", dedupeKey: `referral:qualify:${student.id}` }, select: { payload: true } })).toMatchObject({
      payload: { referredUserId: student.id },
    });

    // Paynow re-posts the same update: 200, one event, one fulfilment, same period.
    const replay = await handleWebhook("paynow", paynowWebhookRequest(body), { env });
    expect(replay).toEqual({ status: 200, body: { received: true } });
    expect(await validEvents(payment.id)).toHaveLength(1);
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).currentPeriodEnd).toEqual(sub.currentPeriodEnd);
    expect(await paymentAudit(payment.id)).toHaveLength(1);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).receiptNumber).toBe(paid.receiptNumber);
  });

  it("the processor reports a replay as DUPLICATE", async () => {
    const { payment } = await paynowFixture();
    const input = {
      provider: "paynow" as const,
      source: "WEBHOOK" as const,
      providerEventId: syntheticEventId("paynow", [payment.id, "sent", "1"]),
      eventType: "paynow.status_update",
      paymentId: payment.id,
      providerRef: null,
      status: "PENDING" as const,
      providerStatus: "Sent",
      amountMinor: 500,
      currency: "USD",
      failureCode: null,
      occurredAt: null,
      payload: { status: "Sent" },
    };
    await expect(processProviderEvent(input)).resolves.toMatchObject({ outcome: "NOOP", paymentStatus: "PENDING" });
    await expect(processProviderEvent(input)).resolves.toMatchObject({ outcome: "DUPLICATE" });
  });

  it("rejects a bad hash with 400, stores the forgery for investigation and changes nothing", async () => {
    const { payment, subscription } = await paynowFixture();
    const now = new Date();
    const forged = new URLSearchParams([...paynowUpdate(payment.id), ["hash", "A".repeat(128)]]).toString();
    const response = await handleWebhook("paynow", paynowWebhookRequest(forged), { env, now });
    expect(response).toEqual({ status: 400, body: { received: false, error: "invalid_signature" } });

    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("PENDING");
    expect(await validEvents(payment.id)).toHaveLength(0);
    const bodySha256 = createHash("sha256").update(forged).digest("hex");
    const stored = await db.paymentEvent.findFirst({
      where: { provider: "paynow", providerEventId: syntheticEventId("paynow", ["rejected", bodySha256, now.toISOString()]) },
      select: { signatureValid: true, processedAt: true, paymentId: true, eventType: true },
    });
    expect(stored).toEqual({ signatureValid: false, processedAt: null, paymentId: null, eventType: "rejected.signature" });

    // A tampered amount on an otherwise genuine message is also a bad hash.
    const genuine = paynowMessage(paynowUpdate(payment.id));
    const tampered = genuine.replace("amount=5.00", "amount=0.05");
    expect((await handleWebhook("paynow", paynowWebhookRequest(tampered), { env })).status).toBe(400);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
  });

  it("an amount mismatch fails the payment (audited, not fulfilled); a later correct Paid still succeeds it", async () => {
    const { payment, subscription } = await paynowFixture();
    const short = paynowMessage(paynowUpdate(payment.id, { amount: "0.50", paynowreference: "1001" }));
    expect((await handleWebhook("paynow", paynowWebhookRequest(short), { env })).status).toBe(200);

    const failed = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(failed).toMatchObject({ status: "FAILED", failureCode: "amount_mismatch", fulfilledAt: null, paidAt: null });
    expect(failed.failureReason).toContain("Amount mismatch");
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("PENDING");
    const [event] = await validEvents(payment.id);
    expect(event?.processingError).toContain("Amount mismatch");
    const actions = (await paymentAudit(payment.id)).map((row) => row.action);
    expect(actions).toEqual(expect.arrayContaining([PAYMENT_AUDIT_ACTIONS.AMOUNT_MISMATCH, PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE]));

    // The verified full amount arrives later (money really received): FAILED -> SUCCESSFUL, fulfilled once.
    const full = paynowMessage(paynowUpdate(payment.id, { paynowreference: "1001" }));
    expect((await handleWebhook("paynow", paynowWebhookRequest(full), { env })).status).toBe(200);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("SUCCESSFUL");
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("ACTIVE");
  });

  it("a dispute keeps the state, flags the payment and is audited", async () => {
    const { payment } = await paynowFixture();
    const disputed = paynowMessage(paynowUpdate(payment.id, { status: "Disputed" }));
    expect((await handleWebhook("paynow", paynowWebhookRequest(disputed), { env })).status).toBe(200);
    const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(row.status).toBe("PENDING");
    expect(row.metadata).toMatchObject({ disputed: true, providerStatus: "Disputed" });
    expect((await paymentAudit(payment.id)).map((a) => a.action)).toEqual([PAYMENT_AUDIT_ACTIONS.DISPUTED]);
  });

  it("acknowledges an update for an unknown payment and records it as unmatched", async () => {
    const reference = randomUUID();
    const body = paynowMessage(paynowUpdate(reference, { paynowreference: "424242" }));
    expect(await handleWebhook("paynow", paynowWebhookRequest(body), { env })).toEqual({ status: 200, body: { received: true } });
    const event = await db.paymentEvent.findFirst({
      where: { provider: "paynow", providerEventId: syntheticEventId("paynow", [reference, "paid", "424242", "500"]), signatureValid: true },
      select: { paymentId: true, processedAt: true, processingError: true },
    });
    expect(event?.paymentId).toBeNull();
    expect(event?.processedAt).not.toBeNull();
    expect(event?.processingError).toMatch(/No payment matches/);
  });

  it("a Paynow event can never touch another provider's payment", async () => {
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const { payment } = await createPendingPayment({
      provider: "stripe",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
    });
    await handleWebhook("paynow", paynowWebhookRequest(paynowMessage(paynowUpdate(payment.id))), { env });
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
  });
});

describe("concurrent deliveries", () => {
  it("two simultaneous deliveries of the same Paynow update apply ONE transition and fulfil once", async () => {
    const { payment, subscription } = await paynowFixture();
    const body = paynowMessage(paynowUpdate(payment.id, { paynowreference: "550011" }));

    const [a, b] = await Promise.all([
      handleWebhook("paynow", paynowWebhookRequest(body), { env }),
      handleWebhook("paynow", paynowWebhookRequest(body), { env }),
    ]);
    expect(a).toEqual({ status: 200, body: { received: true } });
    expect(b).toEqual({ status: 200, body: { received: true } });

    const events = await validEvents(payment.id);
    expect(events).toHaveLength(1);
    expect(events[0]?.processedAt).not.toBeNull();
    expect(events[0]?.processingError).toBeNull();
    const audit = (await paymentAudit(payment.id)).filter((row) => row.action === PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE);
    expect(audit).toHaveLength(1);
    const paid = await db.payment.findUniqueOrThrow({ where: { id: payment.id }, select: { status: true, fulfilledAt: true } });
    expect(paid.status).toBe("SUCCESSFUL");
    expect(paid.fulfilledAt).not.toBeNull();
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("ACTIVE");
  });

  it("two simultaneous deliveries of the same Stripe event apply ONE transition", async () => {
    const { plan, price } = await createPaidPlan();
    const { user: student } = await createStudent();
    const sessionId = `cs_test_${randomUUID().replace(/-/g, "")}`;
    const { payment } = await createPendingPayment({
      provider: "stripe",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
      providerReference: sessionId,
    });
    const event = stripeEvent("checkout.session.completed", stripeSession(payment.id, sessionId));
    const results = await Promise.all([1, 2, 3].map(() => handleWebhook("stripe", stripeWebhookRequest(event), { env })));
    for (const result of results) expect(result).toEqual({ status: 200, body: { received: true } });
    expect(await validEvents(payment.id)).toHaveLength(1);
    const audit = (await paymentAudit(payment.id)).filter((row) => row.action === PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE);
    expect(audit).toHaveLength(1);
  });

  it("concurrent retries of an event left unprocessed by a crash: one APPLIED, the others DUPLICATE, none fail", async () => {
    const { payment } = await paynowFixture();
    const providerEventId = syntheticEventId("paynow", [payment.id, "disputed", "990001", "500"]);
    const input = {
      provider: "paynow" as const,
      source: "WEBHOOK" as const,
      providerEventId,
      eventType: "paynow.status_update",
      paymentId: payment.id,
      providerRef: null,
      status: null,
      providerStatus: "Disputed",
      amountMinor: 500,
      currency: "USD",
      failureCode: null,
      occurredAt: null,
      disputed: true,
      payload: { status: "Disputed" },
    };
    // A first attempt stored the event and then crashed before processing it (processedAt NULL).
    await db.paymentEvent.create({
      data: {
        provider: "paynow",
        providerEventId,
        source: "WEBHOOK",
        eventType: "paynow.status_update",
        providerStatus: "Disputed",
        signatureValid: true,
        payload: { status: "Disputed" },
        paymentId: payment.id,
      },
    });

    const base = Date.now();
    const outcomes = await Promise.all(
      [0, 1, 2].map((offset) => processProviderEvent(input, { now: new Date(base + offset) }).then((r) => r.outcome)),
    );
    expect(outcomes.filter((o) => o === "NOOP")).toHaveLength(1); // a dispute applies no status change
    expect(outcomes.filter((o) => o === "DUPLICATE")).toHaveLength(2);
    // The dispute is audited once, not once per retry.
    expect((await paymentAudit(payment.id)).map((row) => row.action)).toEqual([PAYMENT_AUDIT_ACTIONS.DISPUTED]);
  });
});

describe("routing and limits", () => {
  it("unknown or disabled providers are 404; oversized bodies 413", async () => {
    const request = () => paynowWebhookRequest("a=b");
    expect(await handleWebhook("bitcoin", request(), { env })).toEqual({ status: 404, body: { received: false, error: "not_found" } });
    const sandboxOnly = paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "sandbox" });
    expect((await handleWebhook("paynow", request(), { env: sandboxOnly })).status).toBe(404);
    const huge = new Request("http://localhost:3000/api/webhooks/payments/paynow", { method: "POST", body: "x".repeat(300 * 1024) });
    expect((await handleWebhook("paynow", huge, { env })).status).toBe(413);
  });

  it("a streamed body without Content-Length is cut off at the cap (never fully buffered)", async () => {
    let pulled = 0;
    const chunk = new Uint8Array(64 * 1024).fill(120);
    const endless = new ReadableStream<Uint8Array>({
      pull(controller) {
        pulled += 1;
        if (pulled > 1000) controller.close();
        else controller.enqueue(chunk);
      },
    });
    const request = new Request("http://localhost:3000/api/webhooks/payments/paynow", {
      method: "POST",
      body: endless,
      duplex: "half",
    } as RequestInit);
    expect(await handleWebhook("paynow", request, { env })).toEqual({ status: 413, body: { received: false, error: "payload_too_large" } });
    expect(pulled).toBeLessThan(10);
  });

  it("missing signature headers are rejected for every provider", async () => {
    const { payment } = await paynowFixture();
    const unsignedPaynow = new URLSearchParams(paynowUpdate(payment.id)).toString(); // no hash field at all
    expect((await handleWebhook("paynow", paynowWebhookRequest(unsignedPaynow), { env })).status).toBe(400);

    const stripeBody = JSON.stringify(stripeEvent("checkout.session.completed", stripeSession(payment.id, "cs_test_unsigned")));
    const unsignedStripe = new Request("http://localhost:3000/api/webhooks/payments/stripe", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.9.9.9" },
      body: stripeBody,
    });
    expect((await handleWebhook("stripe", unsignedStripe, { env })).status).toBe(400);

    const unsignedSandbox = new Request("http://localhost:3000/api/webhooks/payments/sandbox", {
      method: "POST",
      headers: { "content-type": "application/json", "x-forwarded-for": "10.9.9.8" },
      body: JSON.stringify({ id: "evt_unsigned_0001", type: "payment.status", paymentId: payment.id, status: "PAID" }),
    });
    expect((await handleWebhook("sandbox", unsignedSandbox, { env })).status).toBe(400);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
  });

  it("the sandbox webhook does not exist in production", async () => {
    const production = { ...env, NODE_ENV: "production" } as typeof env;
    const request = new Request("http://localhost:3000/api/webhooks/payments/sandbox", { method: "POST", body: "{}" });
    expect(await handleWebhook("sandbox", request, { env: production })).toEqual({ status: 404, body: { received: false, error: "not_found" } });
  });
});

describe("Stripe webhooks", () => {
  async function stripeFixture() {
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
    return { plan, student, payment, subscription, sessionId };
  }

  it("checkout.session.completed with a valid signature activates the subscription", async () => {
    const { plan, student, payment, subscription, sessionId } = await stripeFixture();
    const event = stripeEvent("checkout.session.completed", stripeSession(payment.id, sessionId));
    expect(await handleWebhook("stripe", stripeWebhookRequest(event), { env })).toEqual({ status: 200, body: { received: true } });
    const row = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(row.status).toBe("SUCCESSFUL");
    expect(row.metadata).toMatchObject({ stripePaymentIntent: `pi_${sessionId.slice(3)}` });
    expect((await db.subscription.findUniqueOrThrow({ where: { id: subscription.id } })).status).toBe("ACTIVE");
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);
    const [stored] = await validEvents(payment.id);
    expect(stored?.providerEventId).toBe(event.id);
  });

  it("invalid and expired signatures are rejected with 400 and change nothing", async () => {
    const { payment, sessionId } = await stripeFixture();
    const event = stripeEvent("checkout.session.completed", stripeSession(payment.id, sessionId));
    const wrongSecret = await handleWebhook("stripe", stripeWebhookRequest(event, { secret: "whsec_attacker" }), { env });
    expect(wrongSecret).toEqual({ status: 400, body: { received: false, error: "invalid_signature" } });
    const stale = await handleWebhook(
      "stripe",
      stripeWebhookRequest(event, { timestampSeconds: Math.floor(Date.now() / 1000) - 301 }),
      { env },
    );
    expect(stale.status).toBe(400);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("PENDING");
    expect(await validEvents(payment.id)).toHaveLength(0);
  });

  it("refunds: a partial refund accumulates, a full refund moves the payment to REFUNDED (staff flagged)", async () => {
    const { payment, sessionId } = await stripeFixture();
    await handleWebhook("stripe", stripeWebhookRequest(stripeEvent("checkout.session.completed", stripeSession(payment.id, sessionId))), { env });
    const charge = (refunded: boolean, amountRefunded: number) =>
      stripeEvent("charge.refunded", {
        id: `ch_${randomUUID().slice(0, 8)}`,
        object: "charge",
        amount: 500,
        amount_refunded: amountRefunded,
        currency: "usd",
        refunded,
        payment_intent: `pi_${sessionId.slice(3)}`,
        metadata: { paymentId: payment.id },
      });

    expect((await handleWebhook("stripe", stripeWebhookRequest(charge(false, 200)), { env })).status).toBe(200);
    expect(await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).toMatchObject({ status: "SUCCESSFUL", refundedAmountMinor: 200 });

    expect((await handleWebhook("stripe", stripeWebhookRequest(charge(true, 500)), { env })).status).toBe(200);
    const refunded = await db.payment.findUniqueOrThrow({ where: { id: payment.id } });
    expect(refunded).toMatchObject({ status: "REFUNDED", refundedAmountMinor: 500 });
    expect(refunded.refundedAt).not.toBeNull();
    const actions = (await paymentAudit(payment.id)).map((row) => row.action);
    expect(actions.filter((a) => a === PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE)).toHaveLength(3);
    expect(actions).toContain(PAYMENT_AUDIT_ACTIONS.NEEDS_REVIEW); // refunded subscription: staff decide on access
  });

  it("checkout.session.expired cancels a pending payment; irrelevant events are acknowledged", async () => {
    const { payment, sessionId } = await stripeFixture();
    const expired = stripeEvent("checkout.session.expired", stripeSession(payment.id, sessionId, { status: "expired", payment_status: "unpaid" }));
    expect((await handleWebhook("stripe", stripeWebhookRequest(expired), { env })).status).toBe(200);
    expect(await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).toMatchObject({ status: "CANCELLED", failureCode: "expired" });

    const irrelevant = stripeEvent("customer.created", { id: "cus_123", object: "customer" });
    expect(await handleWebhook("stripe", stripeWebhookRequest(irrelevant), { env })).toEqual({ status: 200, body: { received: true } });
    expect(await db.paymentEvent.count({ where: { provider: "stripe", providerEventId: irrelevant.id } })).toBe(0);
  });

  it("matches by provider reference when the event carries no payment id", async () => {
    const { payment, sessionId } = await stripeFixture();
    const event = stripeEvent("checkout.session.completed", stripeSession(payment.id, sessionId, { client_reference_id: null, metadata: {} }));
    expect((await handleWebhook("stripe", stripeWebhookRequest(event), { env })).status).toBe(200);
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).status).toBe("SUCCESSFUL");
  });
});
