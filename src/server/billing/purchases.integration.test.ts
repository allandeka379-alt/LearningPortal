import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { DEFAULT_FEATURE_FLAGS } from "@/lib/features";
import { refundPayment } from "@/server/cms/commerce/payments";
import type { CmsActor } from "@/server/cms/users/access";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { createParent, createStudent, createUser, linkParent } from "../../../tests/factories/index";
import { simulateSandboxCheckout, startCheckout, type StartCheckoutInput } from "./checkout";
import { clearEntitlementCaches, getEntitlements } from "./entitlements";
import { fulfilPlanPurchasePayment, getPurchasedAccess, ownsLifetimePlan } from "./purchases";
import { syntheticEventId } from "./providers/types";
import { createPaidPlan, paymentAudit, paymentsTestEnv, paynowMessage, paynowUpdate, paynowWebhookRequest } from "./testing";
import { PAYMENT_AUDIT_ACTIONS, handleWebhook, processProviderEvent, type ProviderEventInput } from "./webhooks";

/**
 * One-off "Full access" purchases against Postgres (owner decision 2026-10-07; ARCHITECTURE §7.5): a ONE_OFF plan price
 * is paid once (Payment purpose PLAN_PURCHASE, no subscription) and fulfilled as exactly one lifetime
 * EntitlementGrant(source PURCHASE). Paynow is mocked (`fetch` stubbed); the sandbox needs no network.
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

/** A lifetime one-off price (USD 1.00, no end date) on a fresh, non-public plan with paid entitlements. */
function lifetimePlan(amountMinor = 100) {
  return createPaidPlan({ interval: "ONE_OFF", periodDays: null, amountMinor });
}

async function purchaseFixture() {
  const { plan, price } = await lifetimePlan();
  const { user: student } = await createStudent();
  const input: StartCheckoutInput = { userId: student.id, purpose: "PLAN_PURCHASE", planPriceId: price.id, provider: "sandbox" };
  return { plan, price, student, input };
}

async function staff(roles: Exclude<Role, "SCHOOL_ADMIN">[]): Promise<CmsActor> {
  const { user } = await createUser({ roles });
  return { kind: "user", userId: user.id, roles };
}

function paidPoll(paymentId: string, amountMinor = 100, eventId = randomUUID()): ProviderEventInput {
  return {
    provider: "paynow",
    source: "POLL",
    providerEventId: eventId,
    eventType: "paynow.poll",
    paymentId,
    providerRef: null,
    status: "PAID",
    providerStatus: "Paid",
    amountMinor,
    currency: "USD",
    failureCode: null,
    occurredAt: null,
    payload: { test: true },
  };
}

function grantsOf(userId: string) {
  return db.entitlementGrant.findMany({
    where: { userId, source: "PURCHASE" },
    orderBy: { createdAt: "asc" },
    select: { id: true, planId: true, paymentId: true, startsAt: true, endsAt: true, revokedAt: true, revokedById: true },
  });
}

describe("one-off lifetime purchase", () => {
  it("sandbox paid -> one PURCHASE grant, lifetime entitlements, no subscription", async () => {
    const { plan, price, student, input } = await purchaseFixture();
    expect((await getEntitlements(student.id)).planCode).not.toBe(plan.code);

    const started = await startCheckout(input, { env });
    const pending = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(pending).toMatchObject({
      purpose: "PLAN_PURCHASE",
      status: "PENDING",
      provider: "sandbox",
      payerUserId: student.id,
      beneficiaryUserId: student.id,
      subscriptionId: null,
      studyPackId: null,
      planPriceId: price.id,
      amountMinor: 100,
      currency: "USD",
    });

    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });
    const paid = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(paid.status).toBe("SUCCESSFUL");
    expect(paid.fulfilledAt).not.toBeNull();
    expect(paid.receiptNumber).toMatch(/^R-/);
    // Lifetime: no service period, nothing to renew.
    expect(paid.servicePeriodStart).toBeNull();
    expect(paid.servicePeriodEnd).toBeNull();

    const grants = await grantsOf(student.id);
    expect(grants).toHaveLength(1);
    expect(grants[0]).toMatchObject({ planId: plan.id, paymentId: paid.id, endsAt: null, revokedAt: null });
    expect(await db.subscription.count({ where: { holderUserId: student.id } })).toBe(0);

    const resolved = await getEntitlements(student.id);
    expect(resolved.planCode).toBe(plan.code);
    expect(resolved.entitlements).toMatchObject({ lessonAccess: "ALL", mockExams: true, practiceQuestionsPerDay: null });
    expect(resolved.validUntil).toBeNull();
    expect(resolved.sources).toContainEqual(
      expect.objectContaining({ kind: "GRANT", grantSource: "PURCHASE", planCode: plan.code, endsAt: null, scoped: false }),
    );

    await expect(getPurchasedAccess(student.id)).resolves.toMatchObject({
      plan: { id: plan.id, code: plan.code },
      endsAt: null,
      payment: { id: paid.id, receiptNumber: paid.receiptNumber, amountMinor: 100, currency: "USD", payerUserId: student.id },
    });
    await expect(ownsLifetimePlan(student.id, plan.id)).resolves.toBe(true);
  });

  it("a plan price sent with the older SUBSCRIPTION purpose is still a one-off purchase (the price decides)", async () => {
    const { student, input } = await purchaseFixture();
    const started = await startCheckout({ ...input, purpose: "SUBSCRIPTION" }, { env });
    expect(await db.payment.findUniqueOrThrow({ where: { id: started.paymentId }, select: { purpose: true, subscriptionId: true } })).toEqual({
      purpose: "PLAN_PURCHASE",
      subscriptionId: null,
    });
    expect(await db.subscription.count({ where: { holderUserId: student.id } })).toBe(0);
  });

  it("duplicate webhooks and polls fulfil exactly once (Paynow, fetch mocked)", async () => {
    const { plan, price, student } = await purchaseFixture();
    const guid = randomUUID();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        new Response(
          paynowMessage([
            ["status", "Ok"],
            ["browserurl", `https://www.paynow.co.zw/Payment/ConfirmPayment/1?guid=${guid}`],
            ["pollurl", `https://www.paynow.co.zw/Interface/CheckPayment/?guid=${guid}`],
          ]),
          { status: 200 },
        ),
      ),
    );
    const started = await startCheckout({ userId: student.id, purpose: "PLAN_PURCHASE", planPriceId: price.id, provider: "paynow" }, { env });
    expect(started.kind).toBe("redirect");

    // Paynow posts the same "Paid" update twice, then our own poll and the reconciliation confirm it again.
    const body = paynowMessage(paynowUpdate(started.paymentId, { amount: "1.00", paynowreference: "445566" }));
    await expect(handleWebhook("paynow", paynowWebhookRequest(body), { env })).resolves.toEqual({ status: 200, body: { received: true } });
    const first = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(first).toMatchObject({ status: "SUCCESSFUL", purpose: "PLAN_PURCHASE" });
    await expect(handleWebhook("paynow", paynowWebhookRequest(body), { env })).resolves.toEqual({ status: 200, body: { received: true } });
    const poll = await processProviderEvent(paidPoll(started.paymentId));
    expect(poll).toMatchObject({ outcome: "NOOP", paymentStatus: "SUCCESSFUL", fulfilment: null });
    const replay = await processProviderEvent({ ...paidPoll(started.paymentId), providerEventId: syntheticEventId("paynow", [started.paymentId, "paid", "445566", "100"]) });
    expect(replay.outcome).toBe("DUPLICATE");

    // A direct re-run of the fulfilment is a no-op too.
    const again = await db.$transaction((tx) => fulfilPlanPurchasePayment(tx, started.paymentId));
    expect(again.outcome).toBe("ALREADY_FULFILLED");

    const grants = await grantsOf(student.id);
    expect(grants).toHaveLength(1);
    expect(grants[0]?.planId).toBe(plan.id);
    const after = await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } });
    expect(after.fulfilledAt).toEqual(first.fulfilledAt);
    expect(after.receiptNumber).toBe(first.receiptNumber);
    const statusChanges = (await paymentAudit(started.paymentId)).filter((row) => row.action === PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE);
    expect(statusChanges).toHaveLength(1);
  });

  it("already owned: a new checkout is refused (any key, any payer) and creates nothing", async () => {
    const { student, input } = await purchaseFixture();
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });

    expect(await codeOf(startCheckout({ ...input, idempotencyKey: randomUUID() }, { env }))).toBe("CONFLICT");
    const error = await startCheckout(input, { env }).catch((e: unknown) => e);
    expect((error as Error).message).toMatch(/already has full access/);

    const { user: parent } = await createParent();
    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    expect(await codeOf(startCheckout({ ...input, userId: parent.id, beneficiaryUserId: student.id }, { env }))).toBe("CONFLICT");
    expect(await db.payment.count({ where: { beneficiaryUserId: student.id } })).toBe(1);
  });

  it("a parent pays for a linked child: the child gets lifetime access, the parent nothing", async () => {
    const { plan, price, student } = await purchaseFixture();
    const { user: parent } = await createParent();
    const input: StartCheckoutInput = { userId: parent.id, beneficiaryUserId: student.id, purpose: "PLAN_PURCHASE", planPriceId: price.id, provider: "sandbox" };
    // Never for a student the parent is not linked to (same answer as an unknown student).
    expect(await codeOf(startCheckout(input, { env }))).toBe("NOT_FOUND");

    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    const started = await startCheckout(input, { env });
    expect(await db.payment.findUniqueOrThrow({ where: { id: started.paymentId } })).toMatchObject({
      purpose: "PLAN_PURCHASE",
      payerUserId: parent.id,
      beneficiaryUserId: student.id,
      subscriptionId: null,
    });
    await simulateSandboxCheckout(parent.id, started.paymentId, "PAID", { env });

    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);
    expect(await grantsOf(parent.id)).toHaveLength(0);
    await expect(getPurchasedAccess(student.id)).resolves.toMatchObject({ endsAt: null, payment: { payerUserId: parent.id } });
  });

  it("a second payment confirmed in parallel is left for a refund, never a second lifetime grant", async () => {
    const { price, student, input } = await purchaseFixture();
    const { user: parent } = await createParent();
    await linkParent({ parentUserId: parent.id, studentUserId: student.id });
    // Student and parent each open a checkout before either is paid (different payers: both stay PENDING).
    const own = await startCheckout(input, { env });
    const parents = await startCheckout({ userId: parent.id, beneficiaryUserId: student.id, purpose: "PLAN_PURCHASE", planPriceId: price.id, provider: "sandbox" }, { env });

    await simulateSandboxCheckout(student.id, own.paymentId, "PAID", { env });
    await simulateSandboxCheckout(parent.id, parents.paymentId, "PAID", { env });

    const grants = await grantsOf(student.id);
    expect(grants).toHaveLength(1);
    expect(grants[0]?.paymentId).toBe(own.paymentId);
    const second = await db.payment.findUniqueOrThrow({ where: { id: parents.paymentId } });
    expect(second.status).toBe("SUCCESSFUL");
    expect(second.fulfilledAt).toBeNull();
    const event = await db.paymentEvent.findFirstOrThrow({ where: { paymentId: parents.paymentId, signatureValid: true, mappedStatus: "SUCCESSFUL" } });
    expect(event.processingError).toMatch(/needs review.*already owns lifetime access/i);
    expect((await paymentAudit(parents.paymentId)).map((row) => row.action)).toContain(PAYMENT_AUDIT_ACTIONS.NEEDS_REVIEW);
  });

  it("a full admin refund revokes the access (a partial one keeps it); the student can then buy again", async () => {
    const { plan, student, input } = await purchaseFixture();
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });
    const admin = await staff(["ADMIN"]);

    const partial = await refundPayment(admin, { paymentId: started.paymentId, method: "MANUAL", amount: "0.40", reason: "Goodwill partial refund" });
    expect(partial).toMatchObject({ outcome: "REFUNDED", full: false, needsReview: false });
    expect((await grantsOf(student.id))[0]?.revokedAt).toBeNull();
    clearEntitlementCaches();
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);

    const full = await refundPayment(admin, { paymentId: started.paymentId, method: "MANUAL", reason: "Bought by mistake, money returned" });
    expect(full).toMatchObject({ outcome: "REFUNDED", full: true, status: "REFUNDED", needsReview: false });
    const [grant] = await grantsOf(student.id);
    expect(grant?.revokedAt).not.toBeNull();
    expect(grant?.revokedById).toBe(admin.kind === "user" ? admin.userId : null);
    clearEntitlementCaches();
    expect((await getEntitlements(student.id)).planCode).not.toBe(plan.code);
    await expect(getPurchasedAccess(student.id)).resolves.toBeNull();
    await expect(ownsLifetimePlan(student.id, plan.id)).resolves.toBe(false);

    // Access ended, so buying again is allowed (and fulfils a new grant).
    const again = await startCheckout({ ...input, idempotencyKey: randomUUID() }, { env });
    await simulateSandboxCheckout(student.id, again.paymentId, "PAID", { env });
    expect((await grantsOf(student.id)).filter((row) => row.revokedAt === null)).toHaveLength(1);
  });

  it("a refund reported by the provider revokes the access too", async () => {
    const { plan, student, input } = await purchaseFixture();
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });

    const refunded = await processProviderEvent({ ...paidPoll(started.paymentId), provider: "sandbox", status: "REFUNDED", providerStatus: "refunded", refundedAmountMinor: 100 });
    expect(refunded).toMatchObject({ outcome: "APPLIED", paymentStatus: "REFUNDED" });
    expect((await grantsOf(student.id))[0]?.revokedAt).not.toBeNull();
    clearEntitlementCaches();
    expect((await getEntitlements(student.id)).planCode).not.toBe(plan.code);
  });

  it("is paid through Paynow only: other providers are refused before any payment exists", async () => {
    const { student, input } = await purchaseFixture();
    // Stripe is switched off (features.stripe, the default): it is not even a payment method.
    const off = await startCheckout({ ...input, provider: "stripe" }, { env }).catch((e: unknown) => e);
    expect(isAppError(off) && off.code).toBe("BAD_REQUEST");
    // Even with Stripe switched on, Full access is paid through Paynow only.
    const error = await startCheckout({ ...input, provider: "stripe" }, { env, features: { ...DEFAULT_FEATURE_FLAGS, stripe: true } }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("BAD_REQUEST");
    expect((error as Error).message).toMatch(/Paynow/);
    expect(await db.payment.count({ where: { payerUserId: student.id } })).toBe(0);
  });

  it("a one-off pass with an access window continues after the running one", async () => {
    const { plan, price } = await createPaidPlan({ interval: "ONE_OFF", periodDays: 30, amountMinor: 100 });
    const { user: student } = await createStudent();
    const input: StartCheckoutInput = { userId: student.id, purpose: "PLAN_PURCHASE", planPriceId: price.id, provider: "sandbox" };
    const first = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, first.paymentId, "PAID", { env });
    // Not lifetime, so another pass may be bought (no "already owned").
    const second = await startCheckout({ ...input, idempotencyKey: randomUUID() }, { env });
    await simulateSandboxCheckout(student.id, second.paymentId, "PAID", { env });

    const [a, b] = await grantsOf(student.id);
    expect(a?.endsAt).not.toBeNull();
    expect(b?.startsAt).toEqual(a?.endsAt);
    expect(b!.endsAt!.getTime() - b!.startsAt.getTime()).toBe(30 * 86_400_000);
    expect((await db.payment.findUniqueOrThrow({ where: { id: second.paymentId } })).servicePeriodEnd).toEqual(b?.endsAt);
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);
  });
});

describe("database rules for one-off purchases", () => {
  async function paidPurchase() {
    const { plan, student, input } = await purchaseFixture();
    const started = await startCheckout(input, { env });
    await simulateSandboxCheckout(student.id, started.paymentId, "PAID", { env });
    return { plan, student, paymentId: started.paymentId };
  }

  it("a PURCHASE grant needs a plan and a payment; a PLAN_PURCHASE payment never names a subscription", async () => {
    const { plan, student } = await paidPurchase();
    await expect(db.entitlementGrant.create({ data: { userId: student.id, source: "PURCHASE", planId: plan.id } })).rejects.toThrow(/EntitlementGrant_purchase_chk/);
    const sub = await db.subscription.create({ data: { planId: plan.id, holderUserId: student.id, status: "PENDING" }, select: { id: true } });
    await expect(
      db.payment.create({
        data: {
          purpose: "PLAN_PURCHASE",
          provider: "sandbox",
          payerUserId: student.id,
          beneficiaryUserId: student.id,
          subscriptionId: sub.id,
          amountMinor: 100,
          currency: "USD",
          idempotencyKey: randomUUID(),
        },
      }),
    ).rejects.toThrow(/Payment_purpose_refs_chk/);
  });

  it("one unrevoked lifetime purchase per user and plan; a grant must fulfil a payment for that plan", async () => {
    const { plan, student, paymentId } = await paidPurchase();
    // Another payment for the same plan, confirmed: the database refuses a second lifetime grant.
    const extra = await db.payment.create({
      data: {
        purpose: "PLAN_PURCHASE",
        provider: "sandbox",
        payerUserId: student.id,
        beneficiaryUserId: student.id,
        planPriceId: (await db.payment.findUniqueOrThrow({ where: { id: paymentId }, select: { planPriceId: true } })).planPriceId,
        amountMinor: 100,
        currency: "USD",
        idempotencyKey: randomUUID(),
        status: "SUCCESSFUL",
        paidAt: new Date(),
      },
      select: { id: true },
    });
    await expect(db.entitlementGrant.create({ data: { userId: student.id, source: "PURCHASE", planId: plan.id, paymentId: extra.id } })).rejects.toThrow(
      /EntitlementGrant_one_lifetime_purchase_idx|Unique constraint/,
    );
    // A payment for one plan cannot fulfil a grant of another plan.
    const { plan: other } = await lifetimePlan();
    await expect(db.entitlementGrant.create({ data: { userId: student.id, source: "PURCHASE", planId: other.id, paymentId: extra.id } })).rejects.toThrow(
      /bought a different plan/,
    );
    // Only PURCHASE grants fulfil a plan purchase.
    await expect(db.entitlementGrant.create({ data: { userId: student.id, source: "PROMO", planId: plan.id, paymentId: extra.id } })).rejects.toThrow(
      /only a PURCHASE grant/,
    );
  });
});
