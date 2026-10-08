import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it } from "vitest";
import type { PaymentPurpose, PaymentStatus, SubscriptionStatus } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { isAppError } from "@/server/lib/errors";
import { getJobHandler, recurringJobs } from "@/server/lib/jobs";
import {
  createParent,
  createSchool,
  createSchoolMember,
  createStudent,
  createUser,
  uniqueCode,
} from "../../../tests/factories/index";
import { clearEntitlementCaches, getEntitlements } from "./entitlements";
import {
  BILLING_LIFECYCLE_JOB,
  activateSubscriptionFromPayment,
  addMonthsUtc,
  cancelSubscription,
  expireDueSubscriptions,
  getCurrentSubscription,
  registerSubscriptionJobs,
  resumeSubscription,
} from "./subscriptions";

const DAY = 86_400_000;
const STUDENT_DOC = { ...NO_ENTITLEMENTS, lessonAccess: "ALL", mockExams: true, practiceQuestionsPerDay: null };
const SCHOOL_DOC = { ...NO_ENTITLEMENTS, lessonAccess: "ALL", teacherDashboard: true };

async function planWithPrice(audience: "INDIVIDUAL" | "SCHOOL" = "INDIVIDUAL") {
  const code = uniqueCode("T");
  const plan = await db.plan.create({
    data: { code, name: `Test ${code}`, audience, isPublic: false, entitlements: audience === "SCHOOL" ? SCHOOL_DOC : STUDENT_DOC },
    select: { id: true, code: true },
  });
  const price = await db.planPrice.create({
    data: { planId: plan.id, currency: "USD", amountMinor: 500, interval: "MONTH", perSeat: audience === "SCHOOL" },
    select: { id: true },
  });
  return { plan, price };
}

async function subscription(options: {
  planId: string;
  planPriceId?: string;
  status: SubscriptionStatus;
  holderUserId?: string;
  payerUserId?: string;
  schoolId?: string;
  seats?: number;
  periodEnd?: Date;
  trialEndsAt?: Date;
  createdAt?: Date;
}) {
  const end = options.periodEnd ?? null;
  const start = end ? new Date(end.getTime() - 30 * DAY) : null;
  const ended = options.status === "EXPIRED" || options.status === "CANCELLED";
  return db.subscription.create({
    data: {
      planId: options.planId,
      planPriceId: options.planPriceId ?? null,
      holderUserId: options.holderUserId ?? null,
      payerUserId: options.payerUserId ?? null,
      schoolId: options.schoolId ?? null,
      seats: options.schoolId ? (options.seats ?? 5) : null,
      status: options.status,
      startedAt: options.status === "PENDING" ? null : start,
      currentPeriodStart: start,
      currentPeriodEnd: end,
      trialEndsAt: options.trialEndsAt ?? null,
      cancelledAt: options.status === "CANCELLED" ? (end ?? new Date()) : null,
      endedAt: ended ? (end ?? new Date()) : null,
      ...(options.createdAt ? { createdAt: options.createdAt } : {}),
    },
    select: { id: true },
  });
}

async function payment(options: {
  subscriptionId: string;
  payerUserId: string;
  beneficiaryUserId?: string;
  schoolId?: string;
  planPriceId?: string;
  status?: PaymentStatus;
  purpose?: PaymentPurpose;
  quantity?: number;
  paidAt?: Date;
}) {
  const status = options.status ?? "SUCCESSFUL";
  return db.payment.create({
    data: {
      purpose: options.purpose ?? "SUBSCRIPTION",
      status,
      provider: "sandbox",
      payerUserId: options.payerUserId,
      beneficiaryUserId: options.beneficiaryUserId ?? null,
      schoolId: options.schoolId ?? null,
      subscriptionId: options.subscriptionId,
      planPriceId: options.planPriceId ?? null,
      amountMinor: 500,
      currency: "USD",
      quantity: options.quantity ?? 1,
      idempotencyKey: randomUUID(),
      paidAt: status === "SUCCESSFUL" ? (options.paidAt ?? new Date()) : null,
    },
    select: { id: true },
  });
}

function activate(paymentId: string) {
  return db.$transaction((tx) => activateSubscriptionFromPayment(tx, paymentId));
}

beforeEach(() => {
  clearEntitlementCaches();
});

describe("activateSubscriptionFromPayment", () => {
  it("activates on the first payment, is idempotent, and renews contiguously", async () => {
    const { plan, price } = await planWithPrice();
    const { user: student } = await createStudent();
    const sub = await subscription({ planId: plan.id, planPriceId: price.id, status: "PENDING", holderUserId: student.id });
    const paidAt = new Date(Date.now() - 60_000);
    const first = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, planPriceId: price.id, paidAt });

    const result = await activate(first.id);
    expect(result).toMatchObject({ outcome: "ACTIVATED", subscriptionId: sub.id, holderUserId: student.id, periodStart: paidAt });
    const expectedEnd = addMonthsUtc(paidAt, 1);
    expect(result).toMatchObject({ periodEnd: expectedEnd });

    const row = await db.subscription.findUniqueOrThrow({ where: { id: sub.id } });
    expect(row).toMatchObject({ status: "ACTIVE", startedAt: paidAt, currentPeriodStart: paidAt, currentPeriodEnd: expectedEnd });
    const paid = await db.payment.findUniqueOrThrow({ where: { id: first.id } });
    expect(paid.fulfilledAt).not.toBeNull();
    expect(paid).toMatchObject({ servicePeriodStart: paidAt, servicePeriodEnd: expectedEnd });
    expect((await getEntitlements(student.id)).planCode).toBe(plan.code);

    // Webhook + poll race / retry: fulfils once.
    await expect(activate(first.id)).resolves.toMatchObject({ outcome: "ALREADY_FULFILLED", subscriptionId: sub.id });

    const second = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, planPriceId: price.id });
    const renewal = await activate(second.id);
    expect(renewal).toMatchObject({ outcome: "RENEWED", periodStart: expectedEnd, periodEnd: addMonthsUtc(expectedEnd, 1) });
    const renewed = await db.subscription.findUniqueOrThrow({ where: { id: sub.id } });
    expect(renewed.currentPeriodEnd).toEqual(addMonthsUtc(expectedEnd, 1));
    expect(renewed.currentPeriodStart).toEqual(paidAt); // the paid-up period is still running
  });

  it("refuses payments that are not successful", async () => {
    const { plan, price } = await planWithPrice();
    const { user: student } = await createStudent();
    const sub = await subscription({ planId: plan.id, planPriceId: price.id, status: "PENDING", holderUserId: student.id });
    const pending = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, status: "PENDING" });
    const error = await activate(pending.id).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("CONFLICT");
    const missing = await activate(randomUUID()).catch((e: unknown) => e);
    expect(isAppError(missing) && missing.code).toBe("NOT_FOUND");
  });

  it("needs review (without aborting the transaction) when the holder already has another live subscription", async () => {
    const { plan, price } = await planWithPrice();
    const { user: student } = await createStudent();
    await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: student.id, periodEnd: new Date(Date.now() + 10 * DAY) });
    const pendingSub = await subscription({ planId: plan.id, planPriceId: price.id, status: "PENDING", holderUserId: student.id });
    const pay = await payment({ subscriptionId: pendingSub.id, payerUserId: student.id, beneficiaryUserId: student.id });

    const [result, stillUsable] = await db.$transaction(async (tx) => {
      const r = await activateSubscriptionFromPayment(tx, pay.id);
      const after = await tx.subscription.findUniqueOrThrow({ where: { id: pendingSub.id }, select: { status: true } });
      return [r, after] as const;
    });
    expect(result).toMatchObject({ outcome: "NEEDS_REVIEW", reason: "holder already has another live subscription" });
    expect(stillUsable.status).toBe("PENDING");
    expect((await db.payment.findUniqueOrThrow({ where: { id: pay.id } })).fulfilledAt).toBeNull();
  });

  it("a late renewal revives an EXPIRED subscription", async () => {
    const { plan, price } = await planWithPrice();
    const { user: student } = await createStudent();
    const sub = await subscription({
      planId: plan.id,
      planPriceId: price.id,
      status: "EXPIRED",
      holderUserId: student.id,
      periodEnd: new Date(Date.now() - 10 * DAY),
    });
    const pay = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, planPriceId: price.id });
    await expect(activate(pay.id)).resolves.toMatchObject({ outcome: "REACTIVATED" });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: sub.id } })).toMatchObject({ status: "ACTIVE", endedAt: null });
  });

  it("adds purchased seats to a live school subscription", async () => {
    const { plan } = await planWithPrice("SCHOOL");
    const { school } = await createSchool();
    const { user: bursar } = await createUser();
    const sub = await subscription({ planId: plan.id, status: "ACTIVE", schoolId: school.id, seats: 5, periodEnd: new Date(Date.now() + 30 * DAY) });
    const pay = await payment({ subscriptionId: sub.id, payerUserId: bursar.id, schoolId: school.id, purpose: "SEATS", quantity: 3 });
    await expect(activate(pay.id)).resolves.toMatchObject({ outcome: "SEATS_ADDED", seats: 8 });
    await expect(activate(pay.id)).resolves.toMatchObject({ outcome: "ALREADY_FULFILLED" });
    expect((await db.subscription.findUniqueOrThrow({ where: { id: sub.id } })).seats).toBe(8);
  });

  it("PAY-2: a payment for another plan never takes over the current plan's prepaid period (needs review, nothing written)", async () => {
    // STUDENT-like plan paid for a year; a PREMIUM-like monthly payment lands on the same subscription (e.g. two open
    // checkouts paid one after the other).
    const { plan: yearlyPlan, price: yearlyPrice } = await planWithPrice();
    const premiumCode = uniqueCode("T");
    const premium = await db.plan.create({
      data: { code: premiumCode, name: `Premium ${premiumCode}`, audience: "INDIVIDUAL", isPublic: false, entitlements: { ...STUDENT_DOC, advancedAnalytics: true } },
      select: { id: true },
    });
    const premiumMonthly = await db.planPrice.create({ data: { planId: premium.id, currency: "USD", amountMinor: 900, interval: "MONTH" }, select: { id: true } });
    const { user: student } = await createStudent();
    const periodEnd = new Date(Date.now() + 360 * DAY);
    const sub = await subscription({ planId: yearlyPlan.id, planPriceId: yearlyPrice.id, status: "ACTIVE", holderUserId: student.id, periodEnd });
    const pay = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, planPriceId: premiumMonthly.id });

    await expect(activate(pay.id)).resolves.toMatchObject({ outcome: "NEEDS_REVIEW", subscriptionId: sub.id });
    const after = await db.subscription.findUniqueOrThrow({ where: { id: sub.id } });
    expect(after).toMatchObject({ planId: yearlyPlan.id, planPriceId: yearlyPrice.id, status: "ACTIVE", currentPeriodEnd: periodEnd });
    expect((await db.payment.findUniqueOrThrow({ where: { id: pay.id } })).fulfilledAt).toBeNull();
    expect((await getEntitlements(student.id)).planCode).toBe(yearlyPlan.code);
    expect((await getEntitlements(student.id)).entitlements.advancedAnalytics).toBe(false);
  });

  it("PAY-2: a payment for another plan after the paid period ended switches the plan from the old period end", async () => {
    const { plan: oldPlan, price: oldPrice } = await planWithPrice();
    const { plan: newPlan, price: newPrice } = await planWithPrice();
    const { user: student } = await createStudent();
    const periodEnd = new Date(Date.now() - DAY); // in grace (default 3 days)
    const sub = await subscription({ planId: oldPlan.id, planPriceId: oldPrice.id, status: "PAST_DUE", holderUserId: student.id, periodEnd });
    const pay = await payment({ subscriptionId: sub.id, payerUserId: student.id, beneficiaryUserId: student.id, planPriceId: newPrice.id });

    await expect(activate(pay.id)).resolves.toMatchObject({ outcome: "RENEWED", periodStart: periodEnd, periodEnd: addMonthsUtc(periodEnd, 1) });
    expect(await db.subscription.findUniqueOrThrow({ where: { id: sub.id } })).toMatchObject({ planId: newPlan.id, planPriceId: newPrice.id, status: "ACTIVE" });
  });
});

describe("cancelSubscription / resumeSubscription", () => {
  it("holders and payers stop renewal at period end; strangers see nothing; only staff end access now (audited)", async () => {
    const { plan } = await planWithPrice();
    const { user: student } = await createStudent();
    const { user: parent } = await createParent();
    const { user: stranger } = await createStudent();
    const { user: admin } = await createUser({ roles: ["ADMIN"] });
    const periodEnd = new Date(Date.now() + 20 * DAY);
    const sub = await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: student.id, payerUserId: parent.id, periodEnd });
    const asUser = (user: { id: string; roles: ("STUDENT" | "PARENT" | "ADMIN")[] }) => ({ kind: "user" as const, userId: user.id, roles: user.roles });

    const strangerError = await cancelSubscription(asUser({ id: stranger.id, roles: ["STUDENT"] }), sub.id).catch((e: unknown) => e);
    expect(isAppError(strangerError) && strangerError.code).toBe("NOT_FOUND");

    const nowError = await cancelSubscription(asUser({ id: student.id, roles: ["STUDENT"] }), sub.id, { immediately: true }).catch((e: unknown) => e);
    expect(isAppError(nowError) && nowError.code).toBe("FORBIDDEN");

    await expect(cancelSubscription(asUser({ id: parent.id, roles: ["PARENT"] }), sub.id, { reason: "Exams are over" })).resolves.toMatchObject({
      status: "ACTIVE",
      cancelAtPeriodEnd: true,
      currentPeriodEnd: periodEnd,
    });
    await expect(resumeSubscription(asUser({ id: student.id, roles: ["STUDENT"] }), sub.id)).resolves.toMatchObject({
      status: "ACTIVE",
      cancelAtPeriodEnd: false,
    });

    await expect(cancelSubscription(asUser({ id: admin.id, roles: ["ADMIN"] }), sub.id, { immediately: true, reason: "Refunded" })).resolves.toMatchObject({
      status: "CANCELLED",
    });
    const audit = await db.auditLog.findFirst({ where: { entityType: "Subscription", entityId: sub.id }, select: { action: true, actorUserId: true } });
    expect(audit).toEqual({ action: "subscription.cancel", actorUserId: admin.id });
    expect((await getEntitlements(student.id)).planCode).not.toBe(plan.code);

    const ended = await cancelSubscription(asUser({ id: student.id, roles: ["STUDENT"] }), sub.id).catch((e: unknown) => e);
    expect(isAppError(ended) && ended.code).toBe("CONFLICT");
  });

  it("an ACTIVE school admin can stop the school's renewal; a PENDING checkout is cancelled at once", async () => {
    const { plan } = await planWithPrice("SCHOOL");
    const { school } = await createSchool();
    const { user: schoolAdmin } = await createUser();
    await createSchoolMember({ schoolId: school.id, userId: schoolAdmin.id, role: "SCHOOL_ADMIN" });
    const sub = await subscription({ planId: plan.id, status: "ACTIVE", schoolId: school.id, periodEnd: new Date(Date.now() + 20 * DAY) });
    await expect(cancelSubscription({ kind: "user", userId: schoolAdmin.id, roles: [] }, sub.id)).resolves.toMatchObject({ cancelAtPeriodEnd: true });

    const { plan: individual } = await planWithPrice();
    const { user: student } = await createStudent();
    const pending = await subscription({ planId: individual.id, status: "PENDING", holderUserId: student.id });
    await expect(cancelSubscription({ kind: "user", userId: student.id, roles: ["STUDENT"] }, pending.id)).resolves.toMatchObject({
      status: "CANCELLED",
    });
  });

  it("validates input", async () => {
    const error = await cancelSubscription({ kind: "system", job: "test" }, randomUUID(), { reason: "x".repeat(501) }).catch((e: unknown) => e);
    expect(isAppError(error) && error.code).toBe("VALIDATION");
  });
});

describe("expireDueSubscriptions (billing.lifecycle)", () => {
  it("moves due rows along the lifecycle, abandons stale checkouts and is idempotent", async () => {
    const { plan } = await planWithPrice();
    const users = await Promise.all(Array.from({ length: 6 }, () => createStudent()));
    const id = (i: number) => users[i]!.user.id;
    const now = Date.now();
    const justEnded = await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: id(0), periodEnd: new Date(now - 3_600_000) });
    const longEnded = await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: id(1), periodEnd: new Date(now - 10 * DAY) });
    const graceOver = await subscription({ planId: plan.id, status: "PAST_DUE", holderUserId: id(2), periodEnd: new Date(now - 10 * DAY) });
    const trial = await subscription({ planId: plan.id, status: "TRIALING", holderUserId: id(3), trialEndsAt: new Date(now - DAY) });
    const abandoned = await subscription({ planId: plan.id, status: "PENDING", holderUserId: id(4), createdAt: new Date(now - 10 * DAY) });
    const awaitingPayment = await subscription({ planId: plan.id, status: "PENDING", holderUserId: id(5), createdAt: new Date(now - 10 * DAY) });
    await payment({ subscriptionId: awaitingPayment.id, payerUserId: id(5), beneficiaryUserId: id(5), status: "PENDING" });
    const running = await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: (await createStudent()).user.id, periodEnd: new Date(now + DAY) });
    const ids = [justEnded, longEnded, graceOver, trial, abandoned, awaitingPayment, running].map((s) => s.id);

    const result = await expireDueSubscriptions({ subscriptionIds: ids });
    // The checkout still awaiting a payment and the running subscription are not even scanned.
    expect(result).toMatchObject({ scanned: 5, pastDue: 1, expired: 3, abandoned: 1, seatsReleased: 0 });

    const status = async (subId: string) => (await db.subscription.findUniqueOrThrow({ where: { id: subId } })).status;
    expect(await status(justEnded.id)).toBe("PAST_DUE");
    expect(await status(longEnded.id)).toBe("EXPIRED");
    expect(await status(graceOver.id)).toBe("EXPIRED");
    expect(await status(trial.id)).toBe("EXPIRED");
    expect(await status(abandoned.id)).toBe("CANCELLED");
    expect(await status(awaitingPayment.id)).toBe("PENDING");
    expect(await status(running.id)).toBe("ACTIVE");
    const expiredRow = await db.subscription.findUniqueOrThrow({ where: { id: longEnded.id } });
    expect(expiredRow.endedAt!.getTime()).toBe(expiredRow.currentPeriodEnd!.getTime() + 3 * DAY);

    const again = await expireDueSubscriptions({ subscriptionIds: ids });
    expect(again).toMatchObject({ pastDue: 0, expired: 0, abandoned: 0 });
  });

  it("releases the seats of an expired school subscription", async () => {
    const { plan } = await planWithPrice("SCHOOL");
    const { school } = await createSchool();
    const { user: student } = await createStudent();
    await createSchoolMember({ schoolId: school.id, userId: student.id, role: "STUDENT" });
    const sub = await subscription({ planId: plan.id, status: "ACTIVE", schoolId: school.id, periodEnd: new Date(Date.now() + DAY) });
    await db.entitlementGrant.create({ data: { userId: student.id, source: "SCHOOL_SEAT", subscriptionId: sub.id, planId: plan.id } });
    await db.subscription.update({
      where: { id: sub.id },
      data: { currentPeriodStart: new Date(Date.now() - 60 * DAY), currentPeriodEnd: new Date(Date.now() - 30 * DAY) },
    });
    await expect(expireDueSubscriptions({ subscriptionIds: [sub.id] })).resolves.toMatchObject({ expired: 1, seatsReleased: 1 });
  });

  it("registers the hourly job on the payments queue", () => {
    registerSubscriptionJobs();
    expect(getJobHandler(BILLING_LIFECYCLE_JOB)).toMatchObject({ queue: "payments", maxAttempts: 3 });
    expect(recurringJobs()).toEqual(expect.arrayContaining([expect.objectContaining({ name: BILLING_LIFECYCLE_JOB, everyMinutes: 60 })]));
  });
});

describe("getCurrentSubscription", () => {
  it("returns the live subscription with its access end, else the pending checkout, else null", async () => {
    const { plan } = await planWithPrice();
    const { user: student } = await createStudent();
    await expect(getCurrentSubscription(student.id)).resolves.toBeNull();
    const pending = await subscription({ planId: plan.id, status: "PENDING", holderUserId: student.id });
    await expect(getCurrentSubscription(student.id)).resolves.toMatchObject({ id: pending.id, status: "PENDING", accessEndsAt: null });
    const periodEnd = new Date(Date.now() + 5 * DAY);
    const live = await subscription({ planId: plan.id, status: "ACTIVE", holderUserId: student.id, periodEnd });
    await expect(getCurrentSubscription(student.id)).resolves.toMatchObject({
      id: live.id,
      plan: { code: plan.code },
      accessEndsAt: new Date(periodEnd.getTime() + 3 * DAY),
    });
  });
});
