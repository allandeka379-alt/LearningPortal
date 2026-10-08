import { createHash, randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { db } from "@/server/db";
import { setContentPublishContext } from "@/server/lib/db-context";
import { getEnv } from "@/server/lib/env";
import { isAppError } from "@/server/lib/errors";
import { createCurriculumChain, createParent, createStudent, linkParent, uniqueSlug } from "../../../tests/factories/index";
import { getSandboxCheckoutView, simulateSandboxCheckout, startCheckout, type StartCheckoutInput } from "./checkout";
import { clearEntitlementCaches, getEntitlements, getSubjectEntitlements } from "./entitlements";
import { parsePaynowMessage } from "./providers/paynow";
import {
  TEST_APP_URL,
  PAID_PLAN_ENTITLEMENTS,
  TEST_PAYNOW_INTEGRATION_ID,
  createPaidPlan,
  paymentAudit,
  paymentsTestEnv,
  paynowMessage,
} from "./testing";
import { PAYMENT_AUDIT_ACTIONS } from "./webhooks";

/**
 * Checkout against Postgres with the provider network mocked (`fetch` stubbed; the sandbox needs none). Covers the
 * end-to-end sandbox flow: start -> sandbox confirmation -> signed webhook -> ACTIVE subscription -> entitlements.
 */

const env = paymentsTestEnv();

beforeEach(() => {
  clearEntitlementCaches();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

async function codeOf(promise: Promise<unknown>): Promise<string | null> {
  try {
    await promise;
    return null;
  } catch (error) {
    return isAppError(error) ? error.code : `THREW:${(error as Error).message}`;
  }
}

/** Stubs the global fetch with a Paynow answer and returns the mock (requests are inspected by the tests). */
function stubPaynow(answer: (url: string) => [string, string][] | "network-error") {
  const mock = vi.fn(async (url: string | URL | Request) => {
    const result = answer(String(url));
    if (result === "network-error") throw new TypeError("fetch failed");
    const hasHash = result.some(([key]) => key === "hash");
    const isError = result.some(([key, value]) => key === "status" && value === "Error");
    return new Response(hasHash || isError ? new URLSearchParams(result).toString() : paynowMessage(result), { status: 200 });
  });
  vi.stubGlobal("fetch", mock);
  return mock;
}

function sentFields(mock: ReturnType<typeof vi.fn>, call = 0): Record<string, string> {
  const init = mock.mock.calls[call]?.[1] as RequestInit | undefined;
  return Object.fromEntries(parsePaynowMessage(String(init?.body ?? "")));
}

function pollUrlFor(guid: string): string {
  return `https://www.paynow.co.zw/Interface/CheckPayment/?guid=${guid}`;
}

async function subscriptionInput(overrides: Partial<StartCheckoutInput> = {}) {
  const { plan, price } = await createPaidPlan();
  const { user: student } = await createStudent();
  const input: StartCheckoutInput = { userId: student.id, purpose: "SUBSCRIPTION", planPriceId: price.id, provider: "sandbox", ...overrides };
  return { plan, price, student, input };
}

describe("end-to-end sandbox flow", () => {
  it("start -> sandbox confirm -> signed webhook -> subscription ACTIVE and entitlements upgraded", async () => {
    const { plan, price, student, input } = await subscriptionInput();
    expect((await getEntitlements(student.id)).planCode).not.toBe(plan.code);

    const started = await startCheckout(input, { env });
    expect(started).toEqual({
      kind: "redirect",
      url: `${TEST_APP_URL}/dev/sandbox-checkout/${started.paymentId}`,
      paymentId: started.paymentId,
      reused: false,
    });
    const pending = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(pending).toMatchObject({
      status: "PENDING",
      purpose: "SUBSCRIPTION",
      provider: "sandbox",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      planPriceId: price.id,
      amountMinor: 500,
      currency: "USD",
      listAmountMinor: 500,
      providerReference: `sbx_${started.paymentId}`,
    });
    expect(pending.expiresAt!.getTime()).toBeGreaterThan(Date.now() + 23 * 3_600_000);
    const subscriptionId = pending.subscriptionId!;
    expect(await db.subscription.findUniqueOrThrow({ where: { id: subscriptionId } })).toMatchObject({
      status: "PENDING",
      holderUserId: student.id,
      planId: plan.id,
      planPriceId: price.id,
      payerUserId: null,
    });

    // A double tap returns the same checkout (no second payment, no second provider transaction).
    await expect(startCheckout(input, { env })).resolves.toEqual({ ...started, reused: true });
    expect(await db.payment.count({ where: { payerUserId: student.id } })).toBe(1);

    // The dev confirmation page: only the payer sees it.
    await expect(getSandboxCheckoutView(student.id, started.paymentId, { env })).resolves.toMatchObject({
      status: "PENDING",
      amountMinor: 500,
      currency: "USD",
      itemLabel: plan.name,
    });
    const { user: stranger } = await createStudent();
    await expect(getSandboxCheckoutView(stranger.id, started.paymentId, { env })).resolves.toBeNull();
    expect(await codeOf(simulateSandboxCheckout(stranger.id, started.paymentId, "PAID", { env }))).toBe("NOT_FOUND");

    const returnPath = `/billing/return?paymentId=${started.paymentId}&provider=sandbox`;
    await expect(simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env })).resolves.toEqual({ returnPath, delivered: true });

    const paid = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(paid.status).toBe("SUCCESSFUL");
    expect(paid.fulfilledAt).not.toBeNull();
    expect(paid.receiptNumber).toMatch(/^R-/);
    expect(paid.servicePeriodEnd!.getTime()).toBeGreaterThan(Date.now());
    const active = await db.subscription.findUniqueOrThrow({ where: { id: subscriptionId } });
    expect(active.status).toBe("ACTIVE");
    const event = await db.paymentEvent.findFirstOrThrow({ where: { paymentId: started.paymentId, signatureValid: true } });
    expect(event).toMatchObject({ provider: "sandbox", source: "WEBHOOK", mappedStatus: "SUCCESSFUL" });

    const upgraded = await getEntitlements(student.id);
    expect(upgraded.planCode).toBe(plan.code);
    expect(upgraded.entitlements).toMatchObject({ lessonAccess: "ALL", mockExams: true, practiceQuestionsPerDay: null });

    // Finished payments cannot be re-confirmed; a renewal is a new checkout on the same (live) subscription.
    await expect(simulateSandboxCheckout(student.id, started.paymentId, "FAILED", { env })).resolves.toEqual({ returnPath, delivered: false });
    const renewal = await startCheckout(input, { env });
    expect(renewal.paymentId).not.toBe(started.paymentId);
    expect((await db.payment.findUniqueOrThrow({ where: { id: renewal.paymentId } })).subscriptionId).toBe(subscriptionId);
  });

  it("a parent pays for a linked child (never for other students)", async () => {
    const { plan, price, student } = await subscriptionInput();
    const { user: parent } = await createParent();
    const input: StartCheckoutInput = {
      userId: parent.id,
      beneficiaryUserId: student.id,
      purpose: "SUBSCRIPTION",
      planPriceId: price.id,
      provider: "sandbox",
    };
    expect(await codeOf(startCheckout(input, { env }))).toBe("NOT_FOUND");

    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const started = await startCheckout(input, { env });
    const payment = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(payment).toMatchObject({ payerUserId: parent.id, beneficiaryUserId: student.id });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: payment.subscriptionId! } })).toMatchObject({
      holderUserId: student.id,
      payerUserId: parent.id,
    });
    await simulateSandboxCheckout(parent.id, started.paymentId, "PAID", { env });
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);
  });

  it("PAY-2: a different plan cannot be bought onto the prepaid period of the current plan", async () => {
    // STUDENT yearly (USD 48) paid through the real sandbox flow.
    const { plan: yearly, price: yearlyPrice } = await createPaidPlan({ interval: "YEAR", amountMinor: 4800 });
    const { user: student } = await createStudent();
    const first = await startCheckout({ userId: student.id, purpose: "SUBSCRIPTION", planPriceId: yearlyPrice.id, provider: "sandbox" }, { env });
    await simulateSandboxCheckout(student.id, first.paymentId, "PAID", { env });
    const sub = await db.subscription.findFirstOrThrow({ where: { holderUserId: student.id, status: "ACTIVE" } });

    // PREMIUM monthly (USD 9, DEEP AI): refused while the paid year runs; nothing is created or charged.
    const { plan: premium, price: premiumMonthly } = await createPaidPlan({ amountMinor: 900 });
    await db.plan.update({ where: { id: premium.id }, data: { entitlements: { ...PAID_PLAN_ENTITLEMENTS, aiMaxModelTier: "DEEP" } } });
    const switchInput: StartCheckoutInput = { userId: student.id, purpose: "SUBSCRIPTION", planPriceId: premiumMonthly.id, provider: "sandbox" };
    expect(await codeOf(startCheckout(switchInput, { env }))).toBe("CONFLICT");
    expect(await db.payment.count({ where: { payerUserId: student.id } })).toBe(1);
    expect(await db.subscription.findUniqueOrThrow({ where: { id: sub.id } })).toMatchObject({ planId: yearly.id, currentPeriodEnd: sub.currentPeriodEnd });
    clearEntitlementCaches();
    expect((await getEntitlements(student.id)).planCode).toBe(yearly.code);

    // Renewing the current plan is still a checkout on the same subscription.
    const renewal = await startCheckout({ userId: student.id, purpose: "SUBSCRIPTION", planPriceId: yearlyPrice.id, provider: "sandbox" }, { env });
    expect((await db.payment.findUniqueOrThrow({ where: { id: renewal.paymentId } })).subscriptionId).toBe(sub.id);
  });

  it("a declined sandbox payment fails without fulfilment", async () => {
    const { student, input } = await subscriptionInput();
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "FAILED", { env });
    expect(await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } })).toMatchObject({
      status: "FAILED",
      failureCode: "insufficient_funds",
      fulfilledAt: null,
    });
  });
});

describe("Paynow checkout (fetch mocked)", () => {
  it("web checkout sends the database amount and our URLs, and stores the provider references", async () => {
    const { plan, input } = await subscriptionInput({ provider: "paynow" });
    const guid = randomUUID();
    const browserUrl = `https://www.paynow.co.zw/Payment/ConfirmPayment/1?guid=${guid}`;
    const fetchMock = stubPaynow(() => [
      ["status", "Ok"],
      ["browserurl", browserUrl],
      ["pollurl", pollUrlFor(guid)],
    ]);
    const started = await startCheckout(input, { env });
    expect(started).toMatchObject({ kind: "redirect", url: browserUrl, reused: false });

    const sent = sentFields(fetchMock);
    expect(sent).toMatchObject({
      id: TEST_PAYNOW_INTEGRATION_ID,
      reference: started.paymentId,
      amount: "5.00",
      returnurl: `${TEST_APP_URL}/billing/return?paymentId=${started.paymentId}&provider=paynow`,
      resulturl: `${TEST_APP_URL}/api/webhooks/payments/paynow`,
      status: "Message",
    });
    expect(sent.additionalinfo).toContain(plan.name);
    expect(sent.authemail).toBeUndefined();

    const payment = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(payment).toMatchObject({
      provider: "paynow",
      method: null,
      providerReference: guid,
      providerPollUrl: pollUrlFor(guid),
      metadata: { checkoutKind: "redirect", checkoutUrl: browserUrl },
      payerFingerprint: null,
    });
  });

  it("EcoCash express checkout returns phone instructions and stores only a masked number and a fingerprint", async () => {
    const { student, input } = await subscriptionInput({ provider: "paynow", paynowMethod: "ecocash", phone: "077 123 4567" });
    const guid = randomUUID();
    const fetchMock = stubPaynow(() => [
      ["status", "Ok"],
      ["instructions", "Dial *151*2*4# and enter your PIN"],
      ["pollurl", pollUrlFor(guid)],
    ]);
    const started = await startCheckout(input, { env });
    expect(started).toMatchObject({ kind: "mobile", instructions: "Dial *151*2*4# and enter your PIN", reused: false });
    expect(String(fetchMock.mock.calls[0]?.[0])).toContain("remotetransaction");
    const sent = sentFields(fetchMock);
    expect(sent).toMatchObject({ phone: "0771234567", method: "ecocash", authemail: student.emailNormalized });

    const payment = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(payment.method).toBe("ecocash");
    expect(payment.payerFingerprint).toMatch(/^[0-9a-f]{64}$/);
    expect(payment.metadata).toMatchObject({ maskedMsisdn: "+263 77* *** 567", checkoutKind: "mobile_prompt" });
    expect(JSON.stringify(payment.metadata)).not.toContain("771234567");

    expect(await codeOf(startCheckout({ ...input, phone: undefined }, { env }))).toBe("VALIDATION");
    expect(await codeOf(startCheckout({ ...input, phone: "+27821234567" }, { env }))).toBe("VALIDATION");
  });

  it("a provider failure marks the payment FAILED and returns a client-safe error", async () => {
    const { student, input } = await subscriptionInput({ provider: "paynow" });
    stubPaynow(() => [
      ["status", "Error"],
      ["error", "Invalid integration"],
    ]);
    const error = await startCheckout(input, { env }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
    expect((error as Error).message).not.toContain("Invalid integration");
    const payment = await db.payment.findFirstOrThrow({ where: { payerUserId: student.id }, orderBy: { createdAt: "desc" } });
    expect(payment).toMatchObject({ status: "FAILED", failureCode: "checkout_failed" });

    // The retry starts a fresh payment (the failed one is final).
    stubPaynow(() => [
      ["status", "Ok"],
      ["browserurl", "https://www.paynow.co.zw/Payment/ConfirmPayment/2"],
      ["pollurl", pollUrlFor(randomUUID())],
    ]);
    const retry = await startCheckout(input, { env });
    expect(retry.paymentId).not.toBe(payment.id);
  });

  it("switching provider supersedes the open checkout (event + audit)", async () => {
    const { student, input } = await subscriptionInput();
    const first = await startCheckout(input, { env });
    stubPaynow(() => [
      ["status", "Ok"],
      ["browserurl", "https://www.paynow.co.zw/Payment/ConfirmPayment/3"],
      ["pollurl", pollUrlFor(randomUUID())],
    ]);
    const second = await startCheckout({ ...input, provider: "paynow" }, { env });
    expect(second.paymentId).not.toBe(first.paymentId);
    expect(await db.payment.findUniqueOrThrow({ where: { id: first.paymentId } })).toMatchObject({
      status: "CANCELLED",
      failureCode: "superseded",
    });
    const event = await db.paymentEvent.findFirstOrThrow({ where: { paymentId: first.paymentId, eventType: "local.superseded" } });
    expect(event).toMatchObject({ source: "RECONCILIATION", mappedStatus: "CANCELLED", signatureValid: true });
    expect(event.processedAt).not.toBeNull();
    expect((await paymentAudit(first.paymentId)).map((a) => a.action)).toEqual([PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE]);
    // Both payments target the same PENDING checkout subscription.
    const rows = await db.payment.findMany({ where: { payerUserId: student.id }, select: { subscriptionId: true } });
    expect(new Set(rows.map((r) => r.subscriptionId)).size).toBe(1);
  });
});

describe("idempotency and refusals", () => {
  it("a client idempotency key returns the same payment; reusing it for another item conflicts", async () => {
    const idempotencyKey = randomUUID();
    const { student, input } = await subscriptionInput({ idempotencyKey });
    const first = await startCheckout(input, { env });
    await expect(startCheckout(input, { env })).resolves.toEqual({ ...first, reused: true });
    expect((await db.payment.findUniqueOrThrow({ where: { id: first.paymentId } })).idempotencyKey).toBe(idempotencyKey);

    const other = await createPaidPlan();
    expect(await codeOf(startCheckout({ ...input, planPriceId: other.price.id }, { env }))).toBe("CONFLICT");

    // After completion the same key leads to the result page.
    await simulateSandboxCheckout(student.id, first.paymentId, "PAID", { env });
    await expect(startCheckout(input, { env })).resolves.toEqual({
      kind: "redirect",
      url: `${TEST_APP_URL}/app/billing/result?paymentId=${first.paymentId}`,
      paymentId: first.paymentId,
      reused: true,
    });
  });

  it("refuses disabled providers, the sandbox in production, unknown prices, wrong currencies and bad input", async () => {
    const { input, student } = await subscriptionInput();
    const sandboxOnly = paymentsTestEnv({ PAYMENTS_ENABLED_PROVIDERS: "sandbox" });
    expect(await codeOf(startCheckout({ ...input, provider: "stripe" }, { env: sandboxOnly }))).toBe("BAD_REQUEST");
    expect(await codeOf(startCheckout({ ...input, provider: "bitcoin" }, { env }))).toBe("BAD_REQUEST");

    const production = getEnv({
      NODE_ENV: "production",
      APP_URL: "https://learn.example",
      DATABASE_URL: "postgresql://app@db.example:5432/app",
      SESSION_SECRET: "p".repeat(48),
      EMAIL_PROVIDER: "resend",
      RESEND_API_KEY: "re_not_a_real_key",
      EMAIL_FROM: "no-reply@mail.learn.dzidza.test",
      SMS_PROVIDER: "africastalking",
      AFRICASTALKING_USERNAME: "dzidza",
      AFRICASTALKING_API_KEY: "not-a-real-key",
      TRUSTED_PROXY_HOPS: "1",
      PAYMENTS_ENABLED_PROVIDERS: "paynow",
      PAYNOW_INTEGRATION_ID: "1",
      PAYNOW_INTEGRATION_KEY: "k",
    });
    expect(await codeOf(startCheckout(input, { env: production }))).toBe("BAD_REQUEST");

    expect(await codeOf(startCheckout({ ...input, planPriceId: randomUUID() }, { env }))).toBe("NOT_FOUND");
    const retired = await createPaidPlan();
    await db.planPrice.update({ where: { id: retired.price.id }, data: { isActive: false } });
    expect(await codeOf(startCheckout({ ...input, planPriceId: retired.price.id }, { env }))).toBe("NOT_FOUND");

    const zig = await createPaidPlan({ currency: "ZWG", amountMinor: 13_500 });
    expect(await codeOf(startCheckout({ ...input, planPriceId: zig.price.id, provider: "stripe" }, { env }))).toBe("BAD_REQUEST");
    expect(await codeOf(startCheckout({ ...input, provider: "stripe", paynowMethod: "ecocash", phone: "0771234567" }, { env }))).toBe(
      "BAD_REQUEST",
    );

    expect(await codeOf(startCheckout({ ...input, userId: "not-a-uuid" }, { env }))).toBe("VALIDATION");
    expect(await codeOf(startCheckout({ ...input, planPriceId: undefined }, { env }))).toBe("VALIDATION");
    expect(await codeOf(startCheckout({ ...input, purpose: "STUDY_PACK" }, { env }))).toBe("VALIDATION");
    expect(await db.payment.count({ where: { payerUserId: student.id } })).toBe(0);
  });
});

describe("study packs", () => {
  async function publishedPack(subjectId: string) {
    const now = new Date();
    return db.$transaction(async (tx) => {
      const pack = await tx.studyPack.create({
        data: {
          slug: uniqueSlug("pack"),
          title: "Test Mathematics Study Pack",
          entitlements: { version: 1, features: { mock_exams: true, flashcards: true }, limits: {} },
          status: "PUBLISHED",
          approvedAt: now,
          publishedAt: now,
        },
        select: { id: true, title: true },
      });
      // Child rows of a PUBLISHED pack change only inside its publish transaction (content workflow guard).
      await setContentPublishContext(tx, pack.id);
      await tx.studyPackScope.create({ data: { studyPackId: pack.id, subjectId } });
      const snapshot = { studyPack: { id: pack.id, title: pack.title }, scopes: [{ subjectId }] };
      await tx.contentRevision.create({
        data: {
          entityType: "STUDY_PACK",
          entityId: pack.id,
          revision: 1,
          snapshot,
          contentHash: createHash("sha256").update(JSON.stringify(snapshot)).digest("hex"),
          changeNote: "Test fixture",
        },
      });
      return pack;
    });
  }

  it("checkout -> sandbox paid -> one scoped EntitlementGrant (renewal continues after the running grant)", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const pack = await publishedPack(chain.subject.id);
    await db.planPrice.create({ data: { studyPackId: pack.id, currency: "USD", amountMinor: 300, interval: "ONE_OFF", periodDays: 90 } });
    const { user: student } = await createStudent();

    const input: StartCheckoutInput = { userId: student.id, purpose: "STUDY_PACK", studyPackId: pack.id, provider: "sandbox" };
    const started = await startCheckout(input, { env });
    const payment = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(payment).toMatchObject({ purpose: "STUDY_PACK", studyPackId: pack.id, subscriptionId: null, amountMinor: 300 });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });

    const grant = await db.entitlementGrant.findUniqueOrThrow({ where: { paymentId: started.paymentId } });
    expect(grant).toMatchObject({ userId: student.id, source: "STUDY_PACK", studyPackId: pack.id, revokedAt: null });
    const days = (grant.endsAt!.getTime() - grant.startsAt.getTime()) / 86_400_000;
    expect(days).toBe(90);
    expect(grant.features).toMatchObject({ features: { mock_exams: true }, scope: { subjectIds: [chain.subject.id] } });
    const paid = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(paid.fulfilledAt).not.toBeNull();
    expect(paid.servicePeriodEnd).toEqual(grant.endsAt);

    const inSubject = await getSubjectEntitlements(student.id, chain.subject.id);
    expect(inSubject).toMatchObject({ lessonAccess: "ALL", mockExams: true, flashcards: true });

    // Buying again while the pack runs extends it: the new grant starts when the current one ends.
    const again = await startCheckout(input, { env });
    expect(again.paymentId).not.toBe(started.paymentId);
    await simulateSandboxCheckout(student.id, again.paymentId, "PAID", { env });
    const second = await db.entitlementGrant.findUniqueOrThrow({ where: { paymentId: again.paymentId } });
    expect(second.startsAt).toEqual(grant.endsAt);
  });

  it("an open-ended pack cannot be bought twice; unpublished packs are not for sale", async () => {
    const chain = await createCurriculumChain({ topicCount: 1, subtopicsPerTopic: 0, lessonsPerTopic: 0 });
    const pack = await publishedPack(chain.subject.id);
    await db.planPrice.create({ data: { studyPackId: pack.id, currency: "USD", amountMinor: 900, interval: "ONE_OFF" } });
    const { user: student } = await createStudent();
    const input: StartCheckoutInput = { userId: student.id, purpose: "STUDY_PACK", studyPackId: pack.id, provider: "sandbox" };
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });
    expect((await db.entitlementGrant.findUniqueOrThrow({ where: { paymentId: started.paymentId } })).endsAt).toBeNull();
    expect(await codeOf(startCheckout(input, { env }))).toBe("CONFLICT");

    const draft = await db.studyPack.create({
      data: { slug: uniqueSlug("pack"), title: "Draft pack", entitlements: {}, scopes: { create: [{ subjectId: chain.subject.id }] } },
      select: { id: true },
    });
    expect(await codeOf(startCheckout({ ...input, studyPackId: draft.id }, { env }))).toBe("NOT_FOUND");
  });
});
