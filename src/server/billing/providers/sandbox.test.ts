import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import { isAppError } from "@/server/lib/errors";
import {
  SANDBOX_SIGNATURE_HEADER,
  SANDBOX_TIMESTAMP_HEADER,
  createSandboxProvider,
  getSandboxCheckout,
  resetSandboxLedger,
  sandboxCheckoutPath,
  sandboxProviderRef,
  signSandboxWebhook,
  simulateSandboxPayment,
} from "./sandbox";
import { transitionPayment, type CheckoutRequest } from "./types";

let clock = new Date("2026-10-05T10:00:00Z");
const config = {
  appUrl: "http://localhost:3000/",
  signingSecret: "sandbox-test-secret-0123456789abcdef",
  production: false,
  now: () => clock,
};
const provider = createSandboxProvider(config);

function checkout(overrides: Partial<CheckoutRequest> = {}): CheckoutRequest {
  return {
    paymentId: randomUUID(),
    amountMinor: 500,
    currency: "USD",
    description: "Student plan - 1 month",
    payer: { email: "payer@example.test" },
    returnUrl: "http://localhost:3000/app/billing/return",
    webhookUrl: "http://localhost:3000/api/webhooks/payments/sandbox",
    ...overrides,
  };
}

beforeEach(() => {
  resetSandboxLedger();
  clock = new Date("2026-10-05T10:00:00Z");
});

describe("production guard", () => {
  it("refuses to construct or simulate in production", () => {
    expect(() => createSandboxProvider({ ...config, production: true })).toThrow(/disabled in production/);
    expect(() => simulateSandboxPayment({ paymentId: randomUUID(), outcome: "PAID", amountMinor: 1, currency: "USD" }, { ...config, production: true })).toThrow(
      /disabled in production/,
    );
  });
});

describe("createCheckout", () => {
  it("redirects to the local confirmation page with a deterministic reference (idempotent)", async () => {
    const input = checkout();
    const result = await provider.createCheckout(input);
    expect(result).toEqual({
      kind: "redirect",
      url: `http://localhost:3000/dev/sandbox-checkout/${input.paymentId}`,
      providerRef: `sbx_${input.paymentId}`,
    });
    expect(await provider.createCheckout(input)).toEqual(result);
    expect(sandboxCheckoutPath(input.paymentId)).toBe(`/dev/sandbox-checkout/${input.paymentId}`);
    expect(getSandboxCheckout(input.paymentId)).toMatchObject({ status: "PENDING", amountMinor: 500, currency: "USD", returnUrl: input.returnUrl });
  });

  it("uses a mobile prompt for EcoCash / OneMoney", async () => {
    const result = await provider.createCheckout(checkout({ method: "ecocash", payer: { phone: "+263771234567" } }));
    expect(result.kind).toBe("mobile_prompt");
  });

  it("validates its input and reports support", async () => {
    await expect(provider.createCheckout(checkout({ amountMinor: 0 }))).rejects.toThrow(RangeError);
    await expect(provider.createCheckout(checkout({ currency: "usd" }))).rejects.toThrow(RangeError);
    await expect(provider.createCheckout(checkout({ paymentId: "nope" }))).rejects.toThrow(RangeError);
    expect(provider.supports("USD")).toBe(true);
    expect(provider.supports("ZWG", "onemoney")).toBe(true);
    expect(provider.supports("usd")).toBe(false);
  });
});

describe("webhooks", () => {
  it("a simulated outcome produces a signed webhook that verifies and drives the payment state machine", async () => {
    const input = checkout();
    await provider.createCheckout(input);
    const { body, request } = simulateSandboxPayment({ paymentId: input.paymentId, outcome: "PAID" }, config);
    const event = await provider.verifyWebhook(request);
    expect(event).toMatchObject({
      providerEventId: body.id,
      eventType: "payment.status",
      paymentId: input.paymentId,
      providerRef: sandboxProviderRef(input.paymentId),
      status: "PAID",
      amountMinor: 500,
      currency: "USD",
      failureCode: null,
      occurredAt: clock,
    });
    const transition = transitionPayment(
      { status: "PENDING", amountMinor: 500, currency: "USD", refundedAmountMinor: 0 },
      { type: "PROVIDER_STATUS", status: event!.status!, verified: true, amountMinor: event!.amountMinor, currency: event!.currency, at: event!.occurredAt! },
    );
    expect(transition).toMatchObject({ kind: "APPLY", to: "SUCCESSFUL", fulfil: true });
  });

  it("carries failure codes for declined payments", async () => {
    const input = checkout();
    await provider.createCheckout(input);
    const { request } = simulateSandboxPayment({ paymentId: input.paymentId, outcome: "FAILED", failureCode: "insufficient_funds" }, config);
    await expect(provider.verifyWebhook(request)).resolves.toMatchObject({ status: "FAILED", failureCode: "insufficient_funds" });
  });

  it("rejects tampered bodies, wrong keys, stale or missing timestamps and malformed payloads", async () => {
    const input = checkout();
    await provider.createCheckout(input);
    const { body, request } = simulateSandboxPayment({ paymentId: input.paymentId, outcome: "PAID" }, config);

    const tampered = { headers: request.headers, rawBody: JSON.stringify({ ...body, amountMinor: 1 }) };
    await expect(provider.verifyWebhook(tampered)).resolves.toBeNull();

    const otherKey = signSandboxWebhook(body, { ...config, signingSecret: "a-different-secret-0123456789abcdef" });
    await expect(provider.verifyWebhook(otherKey)).resolves.toBeNull();

    clock = new Date(clock.getTime() + 301_000); // replayed after the 5-minute window
    await expect(provider.verifyWebhook(request)).resolves.toBeNull();
    clock = new Date("2026-10-05T10:00:00Z");

    const noSignature = new Headers(request.headers);
    noSignature.delete(SANDBOX_SIGNATURE_HEADER);
    await expect(provider.verifyWebhook({ headers: noSignature, rawBody: request.rawBody })).resolves.toBeNull();
    const badTimestamp = new Headers(request.headers);
    badTimestamp.set(SANDBOX_TIMESTAMP_HEADER, "yesterday");
    await expect(provider.verifyWebhook({ headers: badTimestamp, rawBody: request.rawBody })).resolves.toBeNull();

    // Correctly signed but not a valid event body.
    await expect(provider.verifyWebhook(signSandboxWebhook({ hello: "world" }, config))).resolves.toBeNull();
    const signedGarbage = signSandboxWebhook("not json at all", config);
    await expect(provider.verifyWebhook({ headers: signedGarbage.headers, rawBody: "{not json" })).resolves.toBeNull();
  });

  it("can report a different amount than the payment (to exercise amount-mismatch handling)", async () => {
    const input = checkout();
    await provider.createCheckout(input);
    const { request } = simulateSandboxPayment({ paymentId: input.paymentId, outcome: "PAID", amountMinor: 499 }, config);
    const event = await provider.verifyWebhook(request);
    expect(event?.amountMinor).toBe(499);
    expect(
      transitionPayment(
        { status: "PENDING", amountMinor: 500, currency: "USD", refundedAmountMinor: 0 },
        { type: "PROVIDER_STATUS", status: "PAID", verified: true, amountMinor: event!.amountMinor, currency: event!.currency, at: clock },
      ),
    ).toMatchObject({ kind: "REJECTED", reason: "AMOUNT_MISMATCH" });
  });

  it("refuses to simulate a payment it has never seen without an amount", () => {
    const error = (() => {
      try {
        simulateSandboxPayment({ paymentId: randomUUID(), outcome: "PAID" }, config);
        return null;
      } catch (e) {
        return e;
      }
    })();
    expect(isAppError(error) && error.code).toBe("NOT_FOUND");
  });
});

describe("poll and refund", () => {
  it("poll reports the ledger status with a stable synthetic event id per status", async () => {
    const input = checkout();
    const { providerRef } = await provider.createCheckout(input);
    const pending = await provider.poll({ providerRef });
    expect(pending).toMatchObject({ status: "PENDING", amountMinor: 500, currency: "USD" });
    simulateSandboxPayment({ paymentId: input.paymentId, outcome: "PAID" }, config);
    const paid = await provider.poll({ providerRef });
    expect(paid.status).toBe("PAID");
    expect((await provider.poll({ providerRef })).providerEventId).toBe(paid.providerEventId);
    expect(paid.providerEventId).not.toBe(pending.providerEventId);
    await expect(provider.poll({ providerRef: "sbx_unknown" })).resolves.toMatchObject({ status: "PENDING", providerStatus: "UNKNOWN" });
  });

  it("refunds paid payments partially then fully; unknown ones need a manual refund", async () => {
    const input = checkout();
    const { providerRef } = await provider.createCheckout(input);
    await expect(provider.refund({ providerRef, amountMinor: 100, currency: "USD", reason: "test" })).rejects.toMatchObject({ code: "CONFLICT" });
    simulateSandboxPayment({ paymentId: input.paymentId, outcome: "PAID" }, config);
    await expect(provider.refund({ providerRef, amountMinor: 200, currency: "USD", reason: "partial" })).resolves.toMatchObject({ status: "REFUNDED" });
    await expect(provider.refund({ providerRef, amountMinor: 301, currency: "USD", reason: "too much" })).rejects.toMatchObject({ code: "VALIDATION" });
    await expect(provider.refund({ providerRef, amountMinor: 300, currency: "USD", reason: "rest" })).resolves.toMatchObject({ status: "REFUNDED" });
    expect((await provider.poll({ providerRef })).status).toBe("REFUNDED");
    await expect(provider.refund({ providerRef: "sbx_unknown", amountMinor: 1, currency: "USD", reason: "x" })).resolves.toEqual({
      status: "MANUAL_REQUIRED",
    });
  });
});
