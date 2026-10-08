import "server-only";
import { z } from "zod";
import { Prisma, type BillingInterval, type SubscriptionStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { AUDIT_ACTIONS, auditActorFields, auditInTx, type AuditAction, type InfraActor } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { getSetting } from "@/server/lib/settings";
import {
  LIVE_SUBSCRIPTION_STATUSES,
  getBillingGraceDays,
  invalidateEntitlements,
  isSubscriptionLive,
  releaseStaleSchoolSeats,
  subscriptionAccessEndsAt,
} from "./entitlements";

/**
 * Subscriptions (§31, §53; ARCHITECTURE §7.5). Mobile money has no reliable recurring debit, so a subscription is a run
 * of PREPAID periods: each SUCCESSFUL payment extends `currentPeriodEnd`; after it a short grace period (Setting
 * `billing.graceDays`) keeps access (PAST_DUE), then the subscription EXPIRES.
 *
 * - {@link transitionSubscription}: the pure state machine (unit-tested).
 * - {@link activateSubscriptionFromPayment}: fulfilment of a SUCCESSFUL subscription/seat payment, idempotent via
 *   `Payment.fulfilledAt` under `SELECT ... FOR UPDATE` (run it inside the payment-processing transaction).
 * - {@link cancelSubscription} / {@link resumeSubscription}: holder, payer, school admin or staff.
 * - {@link expireDueSubscriptions}: the `billing.lifecycle` job (PAST_DUE / EXPIRED / abandoned checkouts, stale seats).
 *
 * Entitlement resolution never trusts `status` alone (it checks the period and grace by time), so this job is
 * bookkeeping, not a security boundary.
 */

const DAY_MS = 86_400_000;

/** Default length of a school TERM when a price has no explicit `periodDays` (Setting `billing.termMonths`). */
export const DEFAULT_TERM_MONTHS = 4;
export const TERM_MONTHS_SETTING_KEY = "billing.termMonths";
/** A PENDING checkout with no pending payment is abandoned (CANCELLED) after this many days. */
export const PENDING_CHECKOUT_ABANDON_DAYS = 7;
/** Job type of the hourly lifecycle sweep (ARCHITECTURE §3.7). */
export const BILLING_LIFECYCLE_JOB = "billing.lifecycle";

// =====================================================================================================================
// Billing periods (pure)
// =====================================================================================================================

/** The period-defining columns of a PlanPrice. */
export interface BillingPeriodSpec {
  interval: BillingInterval;
  intervalCount: number;
  /** Explicit length in days (required for TERM prices by CHECK); overrides the interval when set. */
  periodDays: number | null;
}

function daysInMonthUtc(year: number, monthIndex: number): number {
  return new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();
}

/** `date` plus whole calendar months (UTC), clamping to the month's last day (31 Jan + 1 month = 28/29 Feb). */
export function addMonthsUtc(date: Date, months: number): Date {
  if (!Number.isInteger(months)) throw new RangeError(`addMonthsUtc expects whole months, received ${months}`);
  const result = new Date(date.getTime());
  const day = result.getUTCDate();
  result.setUTCDate(1);
  result.setUTCMonth(result.getUTCMonth() + months);
  result.setUTCDate(Math.min(day, daysInMonthUtc(result.getUTCFullYear(), result.getUTCMonth())));
  return result;
}

/**
 * End of a billing period starting at `start`: `periodDays x intervalCount` days when the price sets `periodDays`,
 * else WEEK = 7 days, MONTH / YEAR = calendar months, TERM = `termMonths` months (default 4), each x `intervalCount`.
 *
 * @throws RangeError for ONE_OFF without `periodDays` (not a renewable period) or invalid counts.
 */
export function computePeriodEnd(start: Date, spec: BillingPeriodSpec, options: { termMonths?: number } = {}): Date {
  const count = spec.intervalCount;
  if (!Number.isInteger(count) || count < 1) throw new RangeError("intervalCount must be a positive integer");
  if (spec.periodDays !== null) {
    if (!Number.isInteger(spec.periodDays) || spec.periodDays < 1) throw new RangeError("periodDays must be a positive integer");
    return new Date(start.getTime() + spec.periodDays * count * DAY_MS);
  }
  const termMonths = options.termMonths ?? DEFAULT_TERM_MONTHS;
  if (!Number.isInteger(termMonths) || termMonths < 1) throw new RangeError("termMonths must be a positive integer");
  switch (spec.interval) {
    case "WEEK":
      return new Date(start.getTime() + 7 * count * DAY_MS);
    case "MONTH":
      return addMonthsUtc(start, count);
    case "YEAR":
      return addMonthsUtc(start, 12 * count);
    case "TERM":
      return addMonthsUtc(start, termMonths * count);
    case "ONE_OFF":
      throw new RangeError("ONE_OFF prices without periodDays have no renewal period");
  }
}

// =====================================================================================================================
// State machine (pure)
// =====================================================================================================================

/** The lifecycle columns of a Subscription row. */
export interface SubscriptionSnapshot {
  status: SubscriptionStatus;
  startedAt: Date | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
  cancelledAt: Date | null;
  cancelReason: string | null;
  endedAt: Date | null;
}

export type SubscriptionEvent =
  /**
   * A SUCCESSFUL payment for this subscription (first payment or renewal). `planChange`: the paid price belongs to a
   * different plan than the subscription's current one (see {@link planChangeBlockedUntil}).
   */
  | { type: "PAYMENT_SUCCEEDED"; paidAt: Date; period: BillingPeriodSpec; graceDays: number; termMonths?: number; planChange?: boolean }
  /** Start a free trial on a PENDING subscription (`Plan.trialDays`). */
  | { type: "START_TRIAL"; at: Date; trialDays: number }
  /** Time passes: ACTIVE -> PAST_DUE -> EXPIRED, trials end. */
  | { type: "TICK"; now: Date; graceDays: number }
  /** Stop renewing: access continues to the end of the paid period (no grace), then EXPIRED. */
  | { type: "CANCEL_AT_PERIOD_END"; at: Date; reason?: string | null }
  /** Undo a pending cancel-at-period-end. */
  | { type: "RESUME" }
  /** End access now (staff, refunds). */
  | { type: "CANCEL_NOW"; at: Date; reason?: string | null }
  /** A PENDING checkout that was never paid. */
  | { type: "ABANDON_CHECKOUT"; at: Date };

export type SubscriptionTransition =
  | {
      ok: true;
      changed: boolean;
      next: SubscriptionSnapshot;
      /** Service period bought by a payment (written to `Payment.servicePeriodStart/End`). */
      servicePeriod: { start: Date; end: Date } | null;
      /** A terminal subscription brought back by a late payment (alert staff). */
      reactivated: boolean;
    }
  | { ok: false; code: "ILLEGAL_TRANSITION" | "NEEDS_REVIEW"; message: string };

function unchanged(s: SubscriptionSnapshot): SubscriptionTransition {
  return { ok: true, changed: false, next: s, servicePeriod: null, reactivated: false };
}

function changed(next: SubscriptionSnapshot, extra: { servicePeriod?: { start: Date; end: Date }; reactivated?: boolean } = {}): SubscriptionTransition {
  return { ok: true, changed: true, next, servicePeriod: extra.servicePeriod ?? null, reactivated: extra.reactivated ?? false };
}

function illegal(message: string): SubscriptionTransition {
  return { ok: false, code: "ILLEGAL_TRANSITION", message };
}

function cleanReason(reason: string | null | undefined): string | null {
  const trimmed = reason?.trim();
  return trimmed ? trimmed.slice(0, 500) : null;
}

function later(a: Date, b: Date | null): Date {
  return b !== null && b.getTime() > a.getTime() ? b : a;
}

/** True for CANCELLED / EXPIRED (a new purchase creates a new row; only a late payment can revive one). */
export function isTerminalSubscriptionStatus(status: SubscriptionStatus): boolean {
  return status === "CANCELLED" || status === "EXPIRED";
}

/**
 * Plan switches (PAY-2): a subscription has ONE plan, and a renewal's period starts where the paid-up period ends. A
 * payment for a DIFFERENT plan while the current plan's prepaid period is still running would therefore apply the new
 * plan to time that was paid for at the old plan's price (e.g. a year of STUDENT plus one month of PREMIUM = 13 months
 * of PREMIUM). Such a switch is refused at checkout and left for staff review if it is paid anyway (two open
 * checkouts); it is allowed once the paid period is over (grace or lapsed, where it renews like any payment) and during
 * a free trial (the new plan's period then starts at payment time, the trial days are not carried over).
 *
 * @returns the end of the running prepaid period that blocks a switch to another plan, or `null` when a switch is
 *          allowed at `at`.
 */
export function planChangeBlockedUntil(s: Pick<SubscriptionSnapshot, "status" | "currentPeriodEnd">, at: Date): Date | null {
  if (s.status !== "ACTIVE" && s.status !== "PAST_DUE") return null;
  return s.currentPeriodEnd !== null && s.currentPeriodEnd.getTime() > at.getTime() ? s.currentPeriodEnd : null;
}

function applyPayment(s: SubscriptionSnapshot, event: Extract<SubscriptionEvent, { type: "PAYMENT_SUCCEEDED" }>): SubscriptionTransition {
  const { paidAt, graceDays } = event;
  const planChange = event.planChange === true;
  if (planChange && planChangeBlockedUntil(s, paidAt) !== null) {
    return {
      ok: false,
      code: "NEEDS_REVIEW",
      message: "Payment for a different plan while the current plan's paid period is still running.",
    };
  }
  let start: Date;
  let reactivated = false;
  switch (s.status) {
    case "PENDING":
      start = paidAt;
      break;
    case "TRIALING":
      // Paying during a trial: the paid period starts when the trial ends (the trial days are kept) — for the same
      // plan only; another plan starts now (free trial days of one plan never become days of another).
      start = planChange ? paidAt : later(paidAt, s.trialEndsAt);
      break;
    case "ACTIVE":
    case "PAST_DUE": {
      // Renewal: contiguous with the previous period while access lasts (early payment or within grace), so grace
      // days are never free extra time; after access lapsed (job not yet run) the new period starts at payment time.
      const accessEnd = subscriptionAccessEndsAt(s, graceDays);
      start = s.currentPeriodEnd !== null && accessEnd !== null && paidAt.getTime() < accessEnd.getTime() ? s.currentPeriodEnd : paidAt;
      break;
    }
    case "EXPIRED":
      // A renewal confirmed after expiry (e.g. a delayed mobile-money confirmation): money received, so fulfil.
      start = paidAt;
      reactivated = true;
      break;
    case "CANCELLED":
      if (s.startedAt !== null) {
        return { ok: false, code: "NEEDS_REVIEW", message: "Payment received for a subscription that staff cancelled." };
      }
      // An abandoned checkout paid late (verified "paid" wins, ARCHITECTURE §7.2).
      start = paidAt;
      reactivated = true;
      break;
  }
  const end = computePeriodEnd(start, event.period, event.termMonths === undefined ? {} : { termMonths: event.termMonths });
  const currentPeriodStart = start.getTime() <= paidAt.getTime() ? start : (s.currentPeriodStart ?? paidAt);
  return changed(
    {
      ...s,
      status: "ACTIVE",
      startedAt: s.startedAt ?? paidAt,
      currentPeriodStart,
      currentPeriodEnd: end,
      cancelAtPeriodEnd: false,
      cancelledAt: null,
      cancelReason: null,
      endedAt: null,
    },
    { servicePeriod: { start, end }, reactivated },
  );
}

function applyTick(s: SubscriptionSnapshot, now: Date, graceDays: number): SubscriptionTransition {
  const t = now.getTime();
  switch (s.status) {
    case "TRIALING": {
      const end = s.trialEndsAt ?? s.currentPeriodEnd;
      if (end === null || t < end.getTime()) return unchanged(s);
      return changed({ ...s, status: "EXPIRED", endedAt: end });
    }
    case "ACTIVE": {
      const end = s.currentPeriodEnd;
      if (end === null || t < end.getTime()) return unchanged(s);
      if (s.cancelAtPeriodEnd) return changed({ ...s, status: "EXPIRED", endedAt: end });
      const accessEnd = new Date(end.getTime() + Math.max(0, graceDays) * DAY_MS);
      if (t >= accessEnd.getTime()) return changed({ ...s, status: "EXPIRED", endedAt: accessEnd });
      return changed({ ...s, status: "PAST_DUE" });
    }
    case "PAST_DUE": {
      const accessEnd = subscriptionAccessEndsAt(s, graceDays);
      if (accessEnd === null || t < accessEnd.getTime()) return unchanged(s);
      return changed({ ...s, status: "EXPIRED", endedAt: accessEnd });
    }
    default:
      return unchanged(s);
  }
}

/**
 * Pure subscription state machine:
 *
 * ```
 * PENDING --pay--> ACTIVE --period end--> PAST_DUE --grace end--> EXPIRED
 *    |  \--trial--> TRIALING --pay--> ACTIVE          ^ pay (renewal) returns to ACTIVE
 *    |              TRIALING --trial end--> EXPIRED
 *    \--abandon/cancel--> CANCELLED       ACTIVE --cancel at period end--> (ACTIVE) --period end--> EXPIRED
 * any live --cancel now (staff)--> CANCELLED;  late payment: EXPIRED / abandoned CANCELLED --> ACTIVE (reactivated)
 * ```
 */
export function transitionSubscription(s: SubscriptionSnapshot, event: SubscriptionEvent): SubscriptionTransition {
  switch (event.type) {
    case "PAYMENT_SUCCEEDED":
      return applyPayment(s, event);

    case "TICK":
      return applyTick(s, event.now, event.graceDays);

    case "START_TRIAL": {
      if (s.status !== "PENDING") return illegal(`A trial can only start on a pending subscription (it is ${s.status}).`);
      if (!Number.isInteger(event.trialDays) || event.trialDays < 1) return illegal("This plan has no trial.");
      const trialEndsAt = new Date(event.at.getTime() + event.trialDays * DAY_MS);
      return changed({
        ...s,
        status: "TRIALING",
        startedAt: event.at,
        currentPeriodStart: event.at,
        currentPeriodEnd: trialEndsAt,
        trialEndsAt,
      });
    }

    case "CANCEL_AT_PERIOD_END": {
      const reason = cleanReason(event.reason);
      switch (s.status) {
        case "PENDING":
          return changed({ ...s, status: "CANCELLED", cancelledAt: event.at, cancelReason: reason, endedAt: event.at });
        case "TRIALING":
        case "ACTIVE":
          if (s.cancelAtPeriodEnd) return unchanged(s);
          return changed({ ...s, cancelAtPeriodEnd: true, cancelledAt: event.at, cancelReason: reason });
        case "PAST_DUE":
          // The paid period is already over: not renewing ends the grace access now.
          return changed({
            ...s,
            status: "EXPIRED",
            cancelAtPeriodEnd: true,
            cancelledAt: event.at,
            cancelReason: reason,
            endedAt: event.at,
          });
        default:
          return illegal("This subscription has already ended.");
      }
    }

    case "RESUME":
      if (s.status !== "ACTIVE" && s.status !== "TRIALING") return illegal("Only a running subscription can be resumed.");
      if (!s.cancelAtPeriodEnd) return unchanged(s);
      return changed({ ...s, cancelAtPeriodEnd: false, cancelledAt: null, cancelReason: null });

    case "CANCEL_NOW":
      if (isTerminalSubscriptionStatus(s.status)) return unchanged(s);
      return changed({
        ...s,
        status: "CANCELLED",
        cancelAtPeriodEnd: false,
        cancelledAt: event.at,
        cancelReason: cleanReason(event.reason),
        endedAt: event.at,
      });

    case "ABANDON_CHECKOUT":
      if (s.status !== "PENDING") return unchanged(s);
      return changed({
        ...s,
        status: "CANCELLED",
        cancelledAt: event.at,
        cancelReason: "checkout_abandoned",
        endedAt: event.at,
      });
  }
}

// =====================================================================================================================
// Database
// =====================================================================================================================

const uuidSchema = z.uuid();

function assertUuid(value: string, field: string): void {
  if (!uuidSchema.safeParse(value).success) throw AppError.validation({ [field]: ["Invalid id."] });
}

/** School TERM length in months for prices without `periodDays` (Setting `billing.termMonths`, default 4). */
export function getTermMonths(): Promise<number> {
  return getSetting(TERM_MONTHS_SETTING_KEY, z.number().int().min(1).max(12), DEFAULT_TERM_MONTHS);
}

const SNAPSHOT_SELECT = {
  status: true,
  startedAt: true,
  currentPeriodStart: true,
  currentPeriodEnd: true,
  trialEndsAt: true,
  cancelAtPeriodEnd: true,
  cancelledAt: true,
  cancelReason: true,
  endedAt: true,
} as const satisfies Prisma.SubscriptionSelect;

function snapshotData(next: SubscriptionSnapshot): Prisma.SubscriptionUncheckedUpdateInput {
  return {
    status: next.status,
    startedAt: next.startedAt,
    currentPeriodStart: next.currentPeriodStart,
    currentPeriodEnd: next.currentPeriodEnd,
    trialEndsAt: next.trialEndsAt,
    cancelAtPeriodEnd: next.cancelAtPeriodEnd,
    cancelledAt: next.cancelledAt,
    cancelReason: next.cancelReason,
    endedAt: next.endedAt,
  };
}

async function lockSubscription(tx: Tx, id: string, skipLocked = false): Promise<boolean> {
  const rows = skipLocked
    ? await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Subscription" WHERE "id" = ${id}::uuid FOR UPDATE SKIP LOCKED`
    : await tx.$queryRaw<{ id: string }[]>`SELECT "id" FROM "Subscription" WHERE "id" = ${id}::uuid FOR UPDATE`;
  return rows.length === 1;
}

function invalidateHolder(holder: { holderUserId: string | null; schoolId: string | null }): void {
  // A school subscription affects every member: drop this instance's whole entitlement cache.
  if (holder.holderUserId !== null) invalidateEntitlements(holder.holderUserId);
  else invalidateEntitlements();
}

export type ActivationResult =
  | {
      outcome: "ACTIVATED" | "RENEWED" | "REACTIVATED";
      subscriptionId: string;
      holderUserId: string | null;
      schoolId: string | null;
      periodStart: Date;
      periodEnd: Date;
    }
  | { outcome: "SEATS_ADDED"; subscriptionId: string; holderUserId: null; schoolId: string; seats: number }
  | { outcome: "ALREADY_FULFILLED"; subscriptionId: string | null; holderUserId: string | null; schoolId: string | null }
  | { outcome: "NEEDS_REVIEW"; subscriptionId: string | null; holderUserId: string | null; schoolId: string | null; reason: string };

/**
 * Fulfils a SUCCESSFUL `SUBSCRIPTION` (or `SEATS`) payment: starts, renews or (late payment) revives the subscription
 * and records the service period on the payment. Idempotent: `Payment.fulfilledAt` is set exactly once under
 * `SELECT ... FOR UPDATE` on the Payment, so webhook + poll races and retries fulfil once.
 *
 * Run it INSIDE the transaction that moved the payment to SUCCESSFUL. Situations that need a human (payment for a
 * staff-cancelled subscription, holder already has another live subscription, missing price) return `NEEDS_REVIEW`
 * without writing, so the caller's transaction is never aborted by a constraint; alert staff on that outcome and on
 * `REACTIVATED`. The returned holder lets the caller call `invalidateEntitlements` again after COMMIT.
 *
 * @throws AppError NOT_FOUND (no payment), BAD_REQUEST (study-pack / one-off plan purchase), CONFLICT (not SUCCESSFUL)
 */
export async function activateSubscriptionFromPayment(
  tx: Tx,
  paymentId: string,
  options: { now?: Date } = {},
): Promise<ActivationResult> {
  assertUuid(paymentId, "paymentId");
  const now = options.now ?? new Date();
  await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
  const payment = await tx.payment.findUnique({
    where: { id: paymentId },
    select: {
      purpose: true,
      status: true,
      subscriptionId: true,
      planPriceId: true,
      paidAt: true,
      fulfilledAt: true,
      quantity: true,
      servicePeriodStart: true,
    },
  });
  if (!payment) throw AppError.notFound("Payment not found.", { paymentId });
  if (payment.purpose !== "SUBSCRIPTION" && payment.purpose !== "SEATS") throw new AppError("BAD_REQUEST", "This payment is not for a subscription.");
  if (payment.status !== "SUCCESSFUL") {
    throw AppError.conflict("Only a successful payment can be fulfilled.", { paymentId, status: payment.status });
  }
  const subscriptionId = payment.subscriptionId;
  if (subscriptionId === null) throw AppError.conflict("Payment has no subscription.", { paymentId });

  await lockSubscription(tx, subscriptionId);
  const sub = await tx.subscription.findUnique({
    where: { id: subscriptionId },
    select: { ...SNAPSHOT_SELECT, holderUserId: true, schoolId: true, seats: true, planId: true, planPriceId: true },
  });
  if (!sub) throw AppError.notFound("Subscription not found.", { subscriptionId });
  const holder = { holderUserId: sub.holderUserId, schoolId: sub.schoolId };
  if (payment.fulfilledAt !== null) return { outcome: "ALREADY_FULFILLED", subscriptionId, ...holder };

  const review = (reason: string): ActivationResult => {
    logger.error("billing: payment needs manual review before fulfilment", { paymentId, subscriptionId, reason });
    return { outcome: "NEEDS_REVIEW", subscriptionId, ...holder, reason };
  };
  const graceDays = await getBillingGraceDays();

  if (payment.purpose === "SEATS") {
    if (sub.schoolId === null || sub.seats === null) return review("seat payment for a non-school subscription");
    if (!isSubscriptionLive(sub, now, graceDays)) return review("seat payment for a subscription that is not live");
    const seats = sub.seats + payment.quantity;
    await tx.subscription.update({ where: { id: subscriptionId }, data: { seats } });
    await tx.payment.update({ where: { id: paymentId }, data: { fulfilledAt: now } });
    invalidateEntitlements();
    return { outcome: "SEATS_ADDED", subscriptionId, holderUserId: null, schoolId: sub.schoolId, seats };
  }

  const priceId = payment.planPriceId ?? sub.planPriceId;
  if (priceId === null) return review("no price to compute the period from");
  const price = await tx.planPrice.findUnique({
    where: { id: priceId },
    select: { id: true, planId: true, interval: true, intervalCount: true, periodDays: true, plan: { select: { audience: true } } },
  });
  if (!price || price.planId === null || price.plan === null) return review("payment price is not a plan price");
  if (price.plan.audience !== (sub.holderUserId !== null ? "INDIVIDUAL" : "SCHOOL")) {
    return review("price plan audience does not match the subscription holder");
  }

  const transition = transitionSubscription(sub, {
    type: "PAYMENT_SUCCEEDED",
    paidAt: payment.paidAt ?? now,
    period: price,
    graceDays,
    termMonths: await getTermMonths(),
    // Another plan never takes over the current plan's prepaid period (PAY-2, planChangeBlockedUntil).
    planChange: price.planId !== sub.planId,
  });
  if (!transition.ok) return review(transition.message);

  if (!LIVE_SUBSCRIPTION_STATUSES.some((s) => s === sub.status)) {
    // Becoming live must not collide with another live subscription of the same holder (partial unique index).
    const other = await tx.subscription.findFirst({
      where: {
        id: { not: subscriptionId },
        status: { in: [...LIVE_SUBSCRIPTION_STATUSES] },
        ...(sub.holderUserId !== null ? { holderUserId: sub.holderUserId } : { schoolId: sub.schoolId }),
      },
      select: { id: true },
    });
    if (other) return review("holder already has another live subscription");
  }

  const period = transition.servicePeriod;
  if (period === null) return review("payment produced no service period");
  await tx.subscription.update({
    where: { id: subscriptionId },
    data: { ...snapshotData(transition.next), planId: price.planId, planPriceId: price.id },
  });
  await tx.payment.update({
    where: { id: paymentId },
    data: {
      fulfilledAt: now,
      ...(payment.servicePeriodStart === null ? { servicePeriodStart: period.start, servicePeriodEnd: period.end } : {}),
    },
  });
  invalidateHolder(holder);

  const outcome = transition.reactivated ? "REACTIVATED" : sub.status === "PENDING" || sub.status === "TRIALING" ? "ACTIVATED" : "RENEWED";
  if (outcome === "REACTIVATED") {
    logger.warn("billing: late payment revived an ended subscription", { paymentId, subscriptionId, from: sub.status });
  }
  return { outcome, subscriptionId, ...holder, periodStart: period.start, periodEnd: period.end };
}

const cancelInputSchema = z.object({
  immediately: z.boolean().default(false),
  reason: z.string().trim().max(500).optional(),
});
export type CancelSubscriptionInput = z.input<typeof cancelInputSchema>;

/** What a subscription looks like after a change (safe to return to the client). */
export interface SubscriptionStateView {
  id: string;
  status: SubscriptionStatus;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
  endedAt: Date | null;
}

const STAFF_ROLES = new Set(["ADMIN", "SUPER_ADMIN"]);

function isStaff(actor: InfraActor): boolean {
  return actor.kind === "system" || actor.roles.some((role) => STAFF_ROLES.has(role));
}

async function loadForManagement(actor: InfraActor, subscriptionId: string) {
  assertUuid(subscriptionId, "subscriptionId");
  const sub = await db.subscription.findUnique({
    where: { id: subscriptionId },
    select: { id: true, holderUserId: true, payerUserId: true, schoolId: true },
  });
  if (!sub) throw AppError.notFound("Subscription not found.");
  if (actor.kind === "system" || isStaff(actor)) return sub;
  const userId = actor.userId;
  if (sub.holderUserId === userId || sub.payerUserId === userId) return sub;
  if (sub.schoolId !== null) {
    const admin = await db.schoolMember.findUnique({
      where: { schoolId_userId_role: { schoolId: sub.schoolId, userId, role: "SCHOOL_ADMIN" } },
      select: { status: true },
    });
    if (admin?.status === "ACTIVE") return sub;
  }
  // Do not reveal other people's subscriptions.
  throw AppError.notFound("Subscription not found.");
}

async function applyManagementEvent(
  actor: InfraActor,
  subscriptionId: string,
  makeEvent: (now: Date) => SubscriptionEvent,
  audit: { action: AuditAction; operation: string; metadata?: Record<string, unknown> } | null,
): Promise<SubscriptionStateView> {
  const sub = await loadForManagement(actor, subscriptionId);
  const now = new Date();
  const graceDays = await getBillingGraceDays();
  const result = await db.$transaction(async (tx) => {
    await lockSubscription(tx, subscriptionId);
    const current = await tx.subscription.findUniqueOrThrow({ where: { id: subscriptionId }, select: SNAPSHOT_SELECT });
    // Bring the row up to date first (the lifecycle job may not have run yet).
    const ticked = transitionSubscription(current, { type: "TICK", now, graceDays });
    const base = ticked.ok ? ticked.next : current;
    const transition = transitionSubscription(base, makeEvent(now));
    if (!transition.ok) throw AppError.conflict(transition.message);
    const next = transition.next;
    if (transition.changed || (ticked.ok && ticked.changed)) {
      await tx.subscription.update({ where: { id: subscriptionId }, data: snapshotData(next) });
      if (audit && actor.kind === "user" && isStaff(actor)) {
        await auditInTx(tx, {
          ...auditActorFields(actor),
          action: audit.action,
          entityType: "Subscription",
          entityId: subscriptionId,
          schoolId: sub.schoolId,
          targetUserId: sub.holderUserId,
          before: { status: current.status, cancelAtPeriodEnd: current.cancelAtPeriodEnd },
          after: { status: next.status, cancelAtPeriodEnd: next.cancelAtPeriodEnd },
          metadata: { operation: audit.operation, ...audit.metadata },
          reason: next.cancelReason,
        });
      }
    }
    return next;
  });
  invalidateHolder(sub);
  return {
    id: subscriptionId,
    status: result.status,
    cancelAtPeriodEnd: result.cancelAtPeriodEnd,
    currentPeriodEnd: result.currentPeriodEnd,
    endedAt: result.endedAt,
  };
}

/**
 * Cancels a subscription. Holders, payers (e.g. a parent) and ACTIVE school admins stop renewal at the end of the paid
 * period (a PENDING checkout is cancelled at once); staff (ADMIN / SUPER_ADMIN or the system) may also end access
 * immediately (`immediately: true`, audited).
 *
 * @throws AppError NOT_FOUND (unknown or not yours), FORBIDDEN (immediate cancel by a non-staff user),
 *         CONFLICT (already ended), VALIDATION
 */
export async function cancelSubscription(
  actor: InfraActor,
  subscriptionId: string,
  input: CancelSubscriptionInput = {},
): Promise<SubscriptionStateView> {
  const parsed = cancelInputSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const { immediately, reason } = parsed.data;
  if (immediately && !isStaff(actor)) {
    // Checked before loading so the message is the same whether or not the subscription exists.
    throw AppError.forbidden("Only staff can end a subscription immediately. You can stop it renewing instead.");
  }
  return applyManagementEvent(
    actor,
    subscriptionId,
    (now) => (immediately ? { type: "CANCEL_NOW", at: now, reason: reason ?? null } : { type: "CANCEL_AT_PERIOD_END", at: now, reason: reason ?? null }),
    {
      action: AUDIT_ACTIONS.SUBSCRIPTION_CANCEL,
      operation: immediately ? "subscription.cancel_now" : "subscription.cancel_at_period_end",
    },
  );
}

/** Undoes a cancel-at-period-end while the subscription is still running. Same access rules as {@link cancelSubscription}. */
export async function resumeSubscription(actor: InfraActor, subscriptionId: string): Promise<SubscriptionStateView> {
  return applyManagementEvent(actor, subscriptionId, () => ({ type: "RESUME" }), {
    action: AUDIT_ACTIONS.SUBSCRIPTION_RESUME,
    operation: "subscription.resume",
  });
}

/** The subscription a user's billing page shows: the live one, else the newest pending checkout. */
export interface CurrentSubscriptionView extends SubscriptionStateView {
  plan: { code: string; name: string };
  payerUserId: string | null;
  /** When access ends (period end + grace, or trial end); `null` when not live. */
  accessEndsAt: Date | null;
}

/** Reads a user's current own subscription (live first, else the latest PENDING checkout), or `null`. */
export async function getCurrentSubscription(userId: string): Promise<CurrentSubscriptionView | null> {
  assertUuid(userId, "userId");
  const select = {
    id: true,
    ...SNAPSHOT_SELECT,
    payerUserId: true,
    plan: { select: { code: true, name: true } },
  } as const satisfies Prisma.SubscriptionSelect;
  // Subscription(holderUserId, status) index.
  const sub =
    (await db.subscription.findFirst({ where: { holderUserId: userId, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } }, select })) ??
    (await db.subscription.findFirst({ where: { holderUserId: userId, status: "PENDING" }, orderBy: { createdAt: "desc" }, select }));
  if (!sub) return null;
  const graceDays = await getBillingGraceDays();
  const live = isSubscriptionLive(sub, new Date(), graceDays);
  return {
    id: sub.id,
    status: sub.status,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    currentPeriodEnd: sub.currentPeriodEnd,
    endedAt: sub.endedAt,
    plan: sub.plan,
    payerUserId: sub.payerUserId,
    accessEndsAt: live ? subscriptionAccessEndsAt(sub, graceDays) : null,
  };
}

export interface LifecycleResult {
  scanned: number;
  pastDue: number;
  expired: number;
  abandoned: number;
  seatsReleased: number;
}

/**
 * The `billing.lifecycle` job (hourly, idempotent): moves ACTIVE subscriptions past their period to PAST_DUE, PAST_DUE
 * past grace and ended trials to EXPIRED, abandons PENDING checkouts older than {@link PENDING_CHECKOUT_ABANDON_DAYS}
 * days with no pending payment, releases stale school seats and busts entitlement caches. Each row is processed in its
 * own short transaction under `FOR UPDATE SKIP LOCKED`, so concurrent runs and live payments never block or collide.
 */
export async function expireDueSubscriptions(
  options: {
    now?: Date;
    batchSize?: number;
    maxBatches?: number;
    /** Limit the sweep to these subscriptions (targeted runs and tests). */
    subscriptionIds?: readonly string[];
  } = {},
): Promise<LifecycleResult> {
  const now = options.now ?? new Date();
  const batchSize = options.batchSize ?? 200;
  const maxBatches = options.maxBatches ?? 50;
  const only = options.subscriptionIds;
  if (only !== undefined) for (const id of only) assertUuid(id, "subscriptionId");
  const graceDays = await getBillingGraceDays();
  const graceCutoff = new Date(now.getTime() - graceDays * DAY_MS);
  const abandonCutoff = new Date(now.getTime() - PENDING_CHECKOUT_ABANDON_DAYS * DAY_MS);
  const result: LifecycleResult = { scanned: 0, pastDue: 0, expired: 0, abandoned: 0, seatsReleased: 0 };
  let schoolChanged = false;
  let cursor: string | undefined;

  for (let batch = 0; batch < maxBatches; batch += 1) {
    // Subscription(status, currentPeriodEnd) index; TRIALING and PENDING sets are small.
    const idFilter: Prisma.StringFilter<"Subscription"> = {};
    if (cursor) idFilter.gt = cursor;
    if (only !== undefined) idFilter.in = [...only];
    const due = await db.subscription.findMany({
      where: {
        ...(cursor || only !== undefined ? { id: idFilter } : {}),
        OR: [
          { status: "ACTIVE", currentPeriodEnd: { lte: now } },
          { status: "PAST_DUE", currentPeriodEnd: { lte: graceCutoff } },
          { status: "TRIALING", OR: [{ trialEndsAt: { lte: now } }, { trialEndsAt: null, currentPeriodEnd: { lte: now } }] },
          { status: "PENDING", createdAt: { lte: abandonCutoff }, payments: { none: { status: "PENDING" } } },
        ],
      },
      orderBy: { id: "asc" },
      take: batchSize,
      select: { id: true },
    });
    if (due.length === 0) break;
    cursor = due[due.length - 1]?.id;

    for (const { id } of due) {
      result.scanned += 1;
      const outcome = await db.$transaction(async (tx) => {
        if (!(await lockSubscription(tx, id, true))) return null; // being changed right now; next run
        const sub = await tx.subscription.findUnique({
          where: { id },
          select: { ...SNAPSHOT_SELECT, holderUserId: true, schoolId: true, _count: { select: { payments: { where: { status: "PENDING" } } } } },
        });
        if (!sub) return null;
        const event: SubscriptionEvent =
          sub.status === "PENDING" ? { type: "ABANDON_CHECKOUT", at: now } : { type: "TICK", now, graceDays };
        if (sub.status === "PENDING" && sub._count.payments > 0) return null;
        const transition = transitionSubscription(sub, event);
        if (!transition.ok || !transition.changed) return null;
        await tx.subscription.update({ where: { id }, data: snapshotData(transition.next) });
        return { from: sub.status, to: transition.next.status, holderUserId: sub.holderUserId, schoolId: sub.schoolId };
      });
      if (!outcome) continue;
      if (outcome.to === "PAST_DUE") result.pastDue += 1;
      else if (outcome.from === "PENDING") result.abandoned += 1;
      else if (outcome.to === "EXPIRED") result.expired += 1;
      if (outcome.holderUserId !== null) invalidateEntitlements(outcome.holderUserId);
      else schoolChanged = true;
    }
    if (due.length < batchSize) break;
  }

  result.seatsReleased = await releaseStaleSchoolSeats(only === undefined ? { now } : { now, subscriptionIds: only });
  if (schoolChanged) invalidateEntitlements();
  return result;
}

const lifecyclePayloadSchema = z.looseObject({ periodStart: z.iso.datetime().optional() });

/**
 * Registers the hourly `billing.lifecycle` job (payments queue). Called once from `src/worker/handlers.ts`.
 */
export function registerSubscriptionJobs(): void {
  registerJobHandler(BILLING_LIFECYCLE_JOB, lifecyclePayloadSchema, async () => expireDueSubscriptions(), {
    queue: "payments",
    maxAttempts: 3,
  });
  registerRecurringJob(BILLING_LIFECYCLE_JOB, 60, BILLING_LIFECYCLE_JOB, { offsetMinutes: 20, queue: "payments" });
}
