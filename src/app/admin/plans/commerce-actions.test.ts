import { randomUUID } from "node:crypto";
import { beforeAll, describe, expect, it, vi } from "vitest";
import type { Role } from "@/generated/prisma/client";
import { REAUTH_REQUIRED_CODE } from "@/components/admin/form-state";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { createPaidPlan, createPendingPayment } from "@/server/billing/testing";
import { processProviderEvent } from "@/server/billing/webhooks";
import { db } from "@/server/db";
import { AppError } from "@/server/lib/errors";
import { createStudent, createUser, uniqueCode } from "../../../../tests/factories/index";

/**
 * Wiring tests for the commerce Server Actions: FormData → permission re-check (scope "all", step-up for refunds) →
 * service → ActionResult (+ audit). The session lookup, request headers and cache revalidation are mocked; services and
 * the database are real.
 */

type Actor = { kind: "user"; userId: string; roles: Role[] };
let currentActor: Actor | null = null;
let recentlyAuthenticated = false;

vi.mock("@/server/auth/guards", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/server/auth/guards")>();
  return {
    ...original,
    requirePermissionForAction: async (permission: Parameters<typeof import("@/server/auth/permissions").hasPermission>[1]) => {
      if (!currentActor) throw AppError.unauthenticated();
      const { hasPermission } = await import("@/server/auth/permissions");
      if (!hasPermission(currentActor, permission)) throw AppError.forbidden();
      return currentActor;
    },
    requireRecentAuthForAction: async () => {
      if (!currentActor) throw AppError.unauthenticated();
      if (!recentlyAuthenticated) throw AppError.forbidden(original.REAUTH_REQUIRED_MESSAGE, { reason: "reauth_required" });
      return currentActor;
    },
  };
});
vi.mock("@/server/lib/request", () => ({ getRequestContext: async () => ({ requestId: "test-request", ip: "10.0.0.1", userAgent: "vitest" }) }));
vi.mock("next/cache", () => ({ revalidatePath: vi.fn(), revalidateTag: vi.fn(), refresh: vi.fn(), updateTag: vi.fn() }));

const { createPlanPriceAction, updatePlanEntitlementsAction } = await import("./actions");
const { refundPaymentAction, markDisputedAction } = await import("../payments/actions");
const { cancelSubscriptionAction, extendSubscriptionAction } = await import("../subscriptions/actions");
const { createPromoCodeAction, deletePromoCodeAction } = await import("../promo-codes/actions");

function form(fields: Record<string, string | string[]>): FormData {
  const data = new FormData();
  for (const [key, value] of Object.entries(fields)) {
    if (Array.isArray(value)) for (const item of value) data.append(key, item);
    else data.set(key, value);
  }
  return data;
}

let admin: Actor;
let editor: Actor;

async function paidSubscription() {
  const { plan, price } = await createPaidPlan({ amountMinor: 900 });
  const { user: student } = await createStudent();
  const { payment, subscription } = await createPendingPayment({
    provider: "paynow",
    payerUserId: student.id,
    beneficiaryUserId: student.id,
    planId: plan.id,
    planPriceId: price.id,
    amountMinor: 900,
    providerReference: randomUUID(),
  });
  await processProviderEvent({
    provider: "paynow",
    source: "POLL",
    providerEventId: randomUUID(),
    eventType: "test.poll",
    paymentId: payment.id,
    providerRef: null,
    status: "PAID",
    providerStatus: "paid",
    amountMinor: 900,
    currency: "USD",
    failureCode: null,
    occurredAt: null,
    payload: {},
  });
  return { plan, payment, subscription };
}

beforeAll(async () => {
  const [a, e] = await Promise.all([createUser({ roles: ["ADMIN"] }), createUser({ roles: ["CONTENT_EDITOR"] })]);
  admin = { kind: "user", userId: a.user.id, roles: ["ADMIN"] };
  editor = { kind: "user", userId: e.user.id, roles: ["CONTENT_EDITOR"] };
});

describe("plan actions", () => {
  it("re-check billing.manage, validate and return field errors or a confirmation", async () => {
    const code = `P${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
    const plan = await db.plan.create({ data: { code, name: `Plan ${code}`, audience: "INDIVIDUAL", isPublic: false, entitlements: NO_ENTITLEMENTS }, select: { id: true, updatedAt: true } });
    const fields = { planId: plan.id, currency: "USD", amount: "4.50", interval: "MONTH", intervalCount: "1" };

    currentActor = null;
    expect(await createPlanPriceAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "UNAUTHENTICATED" } });
    currentActor = editor;
    expect(await createPlanPriceAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });

    currentActor = admin;
    // PAY-8: prices and entitlements decide what is given away: a recent password confirmation is required.
    recentlyAuthenticated = false;
    expect(await createPlanPriceAction(null, form(fields))).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });
    expect(await updatePlanEntitlementsAction(null, form({ planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), entitlements: "{}" }))).toMatchObject({
      ok: false,
      error: { code: REAUTH_REQUIRED_CODE },
    });
    expect(await db.planPrice.count({ where: { planId: plan.id } })).toBe(0);
    recentlyAuthenticated = true;
    const invalid = await createPlanPriceAction(null, form({ ...fields, amount: "free" }));
    expect(invalid).toMatchObject({ ok: false, error: { code: "VALIDATION", fieldErrors: { amount: expect.any(Array) } }, values: { amount: "free" } });
    expect(await createPlanPriceAction(null, form(fields))).toMatchObject({ ok: true, message: "Price added." });

    const entitlements = JSON.stringify({ ...NO_ENTITLEMENTS, flashcards: true });
    expect(await updatePlanEntitlementsAction(null, form({ planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), entitlements: "{oops" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { entitlements: expect.any(Array) } },
    });
    expect(await updatePlanEntitlementsAction(null, form({ planId: plan.id, expectedUpdatedAt: plan.updatedAt.toISOString(), entitlements }))).toMatchObject({
      ok: true,
      message: "Entitlements saved (1 change).",
    });
    recentlyAuthenticated = false;
  });
});

describe("payment actions", () => {
  it("refunds need a recent password confirmation; a provider that cannot refund records nothing", async () => {
    const { payment } = await paidSubscription();
    currentActor = admin;
    recentlyAuthenticated = false;
    const fields = { paymentId: payment.id, currency: "USD", method: "MANUAL", amount: "1.00", reason: "Refunded one dollar by EcoCash" };
    expect(await refundPaymentAction(null, form(fields))).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });

    recentlyAuthenticated = true;
    const provider = await refundPaymentAction(null, form({ ...fields, method: "PROVIDER" }));
    // Paynow is not enabled in the test environment (and has no refund API anyway): nothing is recorded.
    expect(provider).toMatchObject({ ok: false, error: { code: "BAD_REQUEST", message: expect.stringMatching(/not enabled on this server|No refund was made/) } });
    expect((await db.payment.findUniqueOrThrow({ where: { id: payment.id } })).refundedAmountMinor).toBe(0);

    const manual = await refundPaymentAction(null, form(fields));
    expect(manual).toMatchObject({ ok: true, message: expect.stringMatching(/Partial refund of USD\s1\.00 recorded/) });
    expect(await db.auditLog.count({ where: { entityType: "Payment", entityId: payment.id, action: "payment.refund", actorUserId: admin.userId } })).toBe(1);

    const tooMuch = await refundPaymentAction(null, form({ ...fields, amount: "50" }));
    expect(tooMuch).toMatchObject({ ok: false, error: { code: "VALIDATION", message: expect.stringMatching(/Refund at most 8\.00 USD/) } });

    currentActor = editor;
    expect(await refundPaymentAction(null, form(fields))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
    expect(await markDisputedAction(null, form({ paymentId: payment.id, reason: "Payer called the bank" }))).toMatchObject({ ok: false, error: { code: "FORBIDDEN" } });
    currentActor = admin;
    expect(await markDisputedAction(null, form({ paymentId: payment.id, reason: "Payer called the bank" }))).toMatchObject({ ok: true, message: "Payment marked as disputed." });
    recentlyAuthenticated = false;
  });
});

describe("subscription and promo code actions", () => {
  it("cancel with a reason, extend with a grant, create and delete a promo code", async () => {
    const { subscription } = await paidSubscription();
    currentActor = admin;
    expect(await cancelSubscriptionAction(null, form({ subscriptionId: subscription.id, mode: "period_end", reason: "" }))).toMatchObject({
      ok: false,
      error: { code: "VALIDATION", fieldErrors: { reason: expect.any(Array) } },
    });
    expect(await cancelSubscriptionAction(null, form({ subscriptionId: subscription.id, mode: "period_end", reason: "Parent asked to stop renewal" }))).toMatchObject({
      ok: true,
      message: expect.stringMatching(/^Renewal stopped/),
    });
    // PAY-8: free access (extensions) and discounts (promo codes) need a recent password confirmation.
    recentlyAuthenticated = false;
    const extend = form({ subscriptionId: subscription.id, days: "5", source: "COMPENSATION", reason: "Outage on 3 October" });
    expect(await extendSubscriptionAction(null, extend)).toMatchObject({ ok: false, error: { code: REAUTH_REQUIRED_CODE } });
    const holder = await db.subscription.findUniqueOrThrow({ where: { id: subscription.id }, select: { holderUserId: true } });
    expect(await db.entitlementGrant.count({ where: { userId: holder.holderUserId, source: { in: ["ADMIN", "COMPENSATION"] } } })).toBe(0);
    const code = uniqueCode("ACT");
    expect(await createPromoCodeAction(null, form({ code, discountType: "PERCENT", percentOff: "15", isActive: "on", planIds: [] }))).toMatchObject({
      ok: false,
      error: { code: REAUTH_REQUIRED_CODE },
    });
    expect(await db.promoCode.count({ where: { code } })).toBe(0);

    recentlyAuthenticated = true;
    expect(await extendSubscriptionAction(null, extend)).toMatchObject({
      ok: true,
      message: expect.stringMatching(/^Extension granted/),
    });

    const created = await createPromoCodeAction(null, form({ code, discountType: "PERCENT", percentOff: "15", isActive: "on", planIds: [] }));
    expect(created).toMatchObject({ ok: true, redirectTo: expect.stringMatching(/^\/admin\/promo-codes\//) });
    const row = await db.promoCode.findUniqueOrThrow({ where: { code } });
    expect(row).toMatchObject({ percentOff: 15, isActive: true, appliesToStudyPacks: false });
    expect(await deletePromoCodeAction(null, form({ promoCodeId: row.id, reason: "Created by mistake" }))).toMatchObject({ ok: true, redirectTo: "/admin/promo-codes" });
    recentlyAuthenticated = false;
  });
});
