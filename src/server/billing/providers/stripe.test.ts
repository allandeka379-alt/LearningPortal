import { randomUUID } from "node:crypto";
import { describe, expect, it, vi } from "vitest";
import {
  STRIPE_API_BASE,
  StripeApiError,
  createStripeProvider,
  mapStripeSession,
  signStripePayload,
  stripeSignatureHeader,
  verifyStripeSignature,
  type StripeConfig,
} from "./stripe";
import { syntheticEventId, type CheckoutRequest } from "./types";

const SECRET_KEY = "sk_test_51NotARealKey";
const WEBHOOK_SECRET = "whsec_test_not_a_real_secret";
const NOW = new Date("2026-10-05T10:00:00Z");
const NOW_SECONDS = Math.floor(NOW.getTime() / 1000);

type FetchImpl = (url: string, init?: RequestInit) => Promise<Response>;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

function provider(fetchImpl: FetchImpl = async () => json({}), extra: Partial<StripeConfig> = {}) {
  const fetchMock = vi.fn(fetchImpl);
  const instance = createStripeProvider({
    secretKey: SECRET_KEY,
    webhookSecret: WEBHOOK_SECRET,
    fetch: fetchMock as unknown as typeof fetch,
    now: () => NOW,
    ...extra,
  });
  return { instance, fetchMock };
}

function webhook(event: unknown, options: { secret?: string; timestamp?: number } = {}) {
  const rawBody = JSON.stringify(event);
  const header = stripeSignatureHeader(options.secret ?? WEBHOOK_SECRET, rawBody, options.timestamp ?? NOW_SECONDS);
  return { headers: new Headers({ "stripe-signature": header, "content-type": "application/json" }), rawBody };
}

function sessionEvent(type: string, session: Record<string, unknown>) {
  return { id: `evt_${randomUUID().replace(/-/g, "")}`, object: "event", type, created: NOW_SECONDS - 5, data: { object: session } };
}

function session(paymentId: string, overrides: Record<string, unknown> = {}) {
  return {
    id: "cs_test_a1B2c3",
    object: "checkout.session",
    status: "complete",
    payment_status: "paid",
    amount_total: 500,
    currency: "usd",
    client_reference_id: paymentId,
    metadata: { paymentId },
    payment_intent: "pi_123",
    customer_details: { email: "payer@example.test", name: "A Payer" },
    ...overrides,
  };
}

function checkout(overrides: Partial<CheckoutRequest> = {}): CheckoutRequest {
  const paymentId = randomUUID();
  return {
    paymentId,
    amountMinor: 500,
    currency: "USD",
    description: "BvunzoHub Student - 1 month",
    payer: { email: "payer@example.test" },
    returnUrl: `http://localhost:3000/billing/return?paymentId=${paymentId}&provider=stripe`,
    webhookUrl: "http://localhost:3000/api/webhooks/payments/stripe",
    ...overrides,
  };
}

describe("Stripe-Signature verification", () => {
  const body = JSON.stringify({ id: "evt_1", type: "ping" });

  it("accepts a valid v1 within the tolerance (any matching v1, for secret rotation)", () => {
    const header = stripeSignatureHeader(WEBHOOK_SECRET, body, NOW_SECONDS - 10);
    expect(verifyStripeSignature(header, body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(true);
    const rotated = `t=${NOW_SECONDS},v1=${signStripePayload("whsec_old", NOW_SECONDS, body)},v1=${signStripePayload(WEBHOOK_SECRET, NOW_SECONDS, body)},v0=abc`;
    expect(verifyStripeSignature(rotated, body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(true);
  });

  it("rejects a wrong secret, a tampered body, stale or future timestamps and malformed headers", () => {
    const header = stripeSignatureHeader(WEBHOOK_SECRET, body, NOW_SECONDS);
    expect(verifyStripeSignature(stripeSignatureHeader("whsec_other", body, NOW_SECONDS), body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(header, `${body} `, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(stripeSignatureHeader(WEBHOOK_SECRET, body, NOW_SECONDS - 301), body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(stripeSignatureHeader(WEBHOOK_SECRET, body, NOW_SECONDS + 301), body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(stripeSignatureHeader(WEBHOOK_SECRET, body, NOW_SECONDS - 300), body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(true);
    expect(verifyStripeSignature(`v1=${signStripePayload(WEBHOOK_SECRET, NOW_SECONDS, body)}`, body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(`t=${NOW_SECONDS}`, body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature("garbage", body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
    expect(verifyStripeSignature(null, body, WEBHOOK_SECRET, NOW_SECONDS)).toBe(false);
  });
});

describe("createCheckout", () => {
  it("creates a one-off Checkout Session with our payment id, return URLs and an idempotency key", async () => {
    const { instance, fetchMock } = provider(async () => json({ id: "cs_test_1", object: "checkout.session", url: "https://checkout.stripe.com/c/pay/cs_test_1" }));
    const input = checkout();
    await expect(instance.createCheckout(input)).resolves.toEqual({
      kind: "redirect",
      url: "https://checkout.stripe.com/c/pay/cs_test_1",
      providerRef: "cs_test_1",
    });
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(`${STRIPE_API_BASE}/checkout/sessions`);
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers.authorization).toBe(`Bearer ${SECRET_KEY}`);
    expect(headers["content-type"]).toBe("application/x-www-form-urlencoded");
    expect(headers["idempotency-key"]).toBe(`checkout_${input.paymentId}`);
    const body = Object.fromEntries(new URLSearchParams(String(init.body)));
    expect(body).toMatchObject({
      mode: "payment",
      client_reference_id: input.paymentId,
      "metadata[paymentId]": input.paymentId,
      "payment_intent_data[metadata][paymentId]": input.paymentId,
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": "usd",
      "line_items[0][price_data][unit_amount]": "500",
      "line_items[0][price_data][product_data][name]": input.description,
      success_url: input.returnUrl,
      customer_email: "payer@example.test",
    });
    expect(new URL(body.cancel_url ?? "").searchParams.get("cancelled")).toBe("1");
    expect(new URL(body.cancel_url ?? "").searchParams.get("paymentId")).toBe(input.paymentId);
  });

  it("surfaces API errors without secrets and validates its input", async () => {
    const { instance } = provider(async () => json({ error: { type: "invalid_request_error", code: "parameter_invalid_integer", message: "bad" } }, 400));
    const error = await instance.createCheckout(checkout()).catch((e: unknown) => e);
    expect(error).toBeInstanceOf(StripeApiError);
    expect((error as Error).message).toContain("invalid_request_error");
    expect((error as Error).message).not.toContain(SECRET_KEY);

    const { instance: unused, fetchMock } = provider();
    await expect(unused.createCheckout(checkout({ currency: "ZWG" }))).rejects.toThrow(RangeError);
    await expect(unused.createCheckout(checkout({ amountMinor: 0 }))).rejects.toThrow(RangeError);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(unused.supports("USD")).toBe(true);
    expect(unused.supports("USD", "card")).toBe(true);
    expect(unused.supports("USD", "ecocash")).toBe(false);
    expect(unused.supports("ZWG")).toBe(false);
  });
});

describe("verifyWebhook", () => {
  it("maps checkout.session.completed (paid) and keeps customer details out of the payload", async () => {
    const paymentId = randomUUID();
    const { instance } = provider();
    const event = sessionEvent("checkout.session.completed", session(paymentId));
    const verified = await instance.verifyWebhook(webhook(event));
    expect(verified).toMatchObject({
      providerEventId: event.id,
      eventType: "checkout.session.completed",
      paymentId,
      providerRef: "cs_test_a1B2c3",
      status: "PAID",
      amountMinor: 500,
      currency: "USD",
      metadata: { stripePaymentIntent: "pi_123" },
      occurredAt: new Date((NOW_SECONDS - 5) * 1000),
    });
    expect(JSON.stringify(verified?.payload)).not.toContain("payer@example.test");
    expect(JSON.stringify(verified?.payload)).not.toContain("A Payer");
  });

  it("maps unpaid, async success/failure and expiry", async () => {
    const paymentId = randomUUID();
    const { instance } = provider();
    const verify = (type: string, overrides: Record<string, unknown> = {}) =>
      instance.verifyWebhook(webhook(sessionEvent(type, session(paymentId, overrides))));
    await expect(verify("checkout.session.completed", { payment_status: "unpaid" })).resolves.toMatchObject({ status: "PENDING" });
    await expect(verify("checkout.session.async_payment_succeeded")).resolves.toMatchObject({ status: "PAID" });
    await expect(verify("checkout.session.async_payment_failed", { payment_status: "unpaid" })).resolves.toMatchObject({
      status: "FAILED",
      failureCode: "async_payment_failed",
    });
    await expect(verify("checkout.session.expired", { status: "expired", payment_status: "unpaid" })).resolves.toMatchObject({
      status: "CANCELLED",
      failureCode: "expired",
    });
  });

  it("maps refunds (partial and full) and links them through the PaymentIntent", async () => {
    const paymentId = randomUUID();
    const charge = (refunded: boolean, amountRefunded: number, metadata: Record<string, string> = { paymentId }) =>
      sessionEvent("charge.refunded", {
        id: "ch_1",
        object: "charge",
        amount: 500,
        amount_refunded: amountRefunded,
        currency: "usd",
        refunded,
        payment_intent: "pi_123",
        metadata,
      });
    const { instance, fetchMock } = provider(async () => json({ object: "list", data: [session(paymentId, { id: "cs_live_lookup" })] }));
    await expect(instance.verifyWebhook(webhook(charge(false, 200)))).resolves.toMatchObject({
      paymentId,
      status: null,
      providerStatus: "partially_refunded",
      refundedAmountMinor: 200,
    });
    await expect(instance.verifyWebhook(webhook(charge(true, 500)))).resolves.toMatchObject({ status: "REFUNDED", refundedAmountMinor: 500 });
    expect(fetchMock).not.toHaveBeenCalled();

    // No metadata on the charge: the session that created the PaymentIntent names our payment.
    await expect(instance.verifyWebhook(webhook(charge(true, 500, {})))).resolves.toMatchObject({
      paymentId,
      providerRef: "cs_live_lookup",
      status: "REFUNDED",
    });
    expect(String(fetchMock.mock.calls[0]?.[0])).toBe(`${STRIPE_API_BASE}/checkout/sessions?payment_intent=pi_123&limit=1`);
  });

  it("flags disputes and acknowledges irrelevant events as informational", async () => {
    const paymentId = randomUUID();
    const { instance } = provider(async () => json({ object: "list", data: [session(paymentId)] }));
    const dispute = sessionEvent("charge.dispute.created", {
      id: "dp_1",
      object: "dispute",
      amount: 500,
      currency: "usd",
      status: "needs_response",
      reason: "fraudulent",
      payment_intent: "pi_123",
      charge: "ch_1",
    });
    await expect(instance.verifyWebhook(webhook(dispute))).resolves.toMatchObject({ paymentId, status: null, disputed: true });
    const other = sessionEvent("customer.created", { id: "cus_1", email: "payer@example.test" });
    const verified = await instance.verifyWebhook(webhook(other));
    expect(verified).toMatchObject({ status: null, paymentId: null, providerRef: null });
    expect(JSON.stringify(verified?.payload)).not.toContain("payer@example.test");
  });

  it("returns null for bad signatures, expired timestamps and malformed bodies", async () => {
    const { instance } = provider();
    const event = sessionEvent("checkout.session.completed", session(randomUUID()));
    await expect(instance.verifyWebhook(webhook(event, { secret: "whsec_wrong" }))).resolves.toBeNull();
    await expect(instance.verifyWebhook(webhook(event, { timestamp: NOW_SECONDS - 301 }))).resolves.toBeNull();
    const good = webhook(event);
    await expect(instance.verifyWebhook({ headers: good.headers, rawBody: good.rawBody.replace("500", "1") })).resolves.toBeNull();
    await expect(instance.verifyWebhook({ headers: new Headers(), rawBody: good.rawBody })).resolves.toBeNull();
    const notJson = "{not json";
    const header = stripeSignatureHeader(WEBHOOK_SECRET, notJson, NOW_SECONDS);
    await expect(instance.verifyWebhook({ headers: new Headers({ "stripe-signature": header }), rawBody: notJson })).resolves.toBeNull();
  });
});

describe("poll and refund", () => {
  it("retrieves the session and maps its state", async () => {
    const paymentId = randomUUID();
    const answers = [session(paymentId), session(paymentId, { status: "open", payment_status: "unpaid" }), session(paymentId, { status: "expired" })];
    const { instance, fetchMock } = provider(async () => json(answers.shift()));
    const paid = await instance.poll({ providerRef: "cs_test_a1B2c3" });
    expect(paid).toMatchObject({ status: "PAID", amountMinor: 500, currency: "USD" });
    expect(paid.providerEventId).toBe(syntheticEventId("stripe", ["poll", "cs_test_a1B2c3", "PAID"]));
    expect(fetchMock.mock.calls[0]?.[0]).toBe(`${STRIPE_API_BASE}/checkout/sessions/cs_test_a1B2c3`);
    await expect(instance.poll({ providerRef: "cs_test_a1B2c3" })).resolves.toMatchObject({ status: "PENDING" });
    await expect(instance.poll({ providerRef: "cs_test_a1B2c3" })).resolves.toMatchObject({ status: "CANCELLED", failureCode: "expired" });
    await expect(instance.poll({ providerRef: "../../v1/charges" })).resolves.toMatchObject({ status: "PENDING", providerStatus: "UNKNOWN" });
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(mapStripeSession({ status: "complete", payment_status: "unpaid" })).toEqual({ status: "PENDING", failureCode: null });
  });

  it("refunds through the session's PaymentIntent", async () => {
    const answers = [json(session(randomUUID())), json({ id: "re_1", object: "refund", status: "succeeded" })];
    const { instance, fetchMock } = provider(async () => answers.shift() as Response);
    await expect(instance.refund({ providerRef: "cs_test_a1B2c3", amountMinor: 200, currency: "USD", reason: "Duplicate purchase" })).resolves.toEqual({
      status: "REFUNDED",
      providerRef: "re_1",
    });
    const [url, init] = fetchMock.mock.calls[1] as [string, RequestInit];
    expect(url).toBe(`${STRIPE_API_BASE}/refunds`);
    expect(Object.fromEntries(new URLSearchParams(String(init.body)))).toMatchObject({ payment_intent: "pi_123", amount: "200" });
  });
});
