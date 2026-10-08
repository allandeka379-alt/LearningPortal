import "server-only";
import type { PaymentPurpose, Prisma } from "@/generated/prisma/client";
import { db, type DbClient } from "@/server/db";
import type { Tx } from "@/server/lib/db-context";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { invalidateEntitlements } from "./entitlements";

/**
 * One-off plan purchases (owner decision 2026-10-07: "Full access", pay once, keep it; ARCHITECTURE §7.5).
 *
 * Model (chosen against the database rules, see prisma/migrations/*_plan_purchase_rules):
 * - A ONE_OFF PlanPrice of a plan is paid by a Payment with purpose PLAN_PURCHASE (planPriceId + beneficiary, never a
 *   Subscription: `Subscription_live_period_chk` requires a period end for every ACTIVE subscription, and a prepaid
 *   subscription would renew, expire and send reminders).
 * - Fulfilment creates exactly ONE EntitlementGrant(source PURCHASE, planId, paymentId) for the beneficiary: paymentId is
 *   unique (one grant per payment), `Payment.fulfilledAt` is write-once under SELECT ... FOR UPDATE (webhook + poll races
 *   and replays fulfil once), and a partial unique index allows one unrevoked lifetime purchase per user and plan.
 * - `periodDays` NULL on the price = lifetime (grant endsAt NULL); N = an N-day pass that continues after a running one.
 * - The grant references the PLAN (it does not copy its document): buyers follow the plan's current entitlements, like
 *   subscribers ("plan changes apply immediately"), so features added to Full access later reach everyone who bought it.
 * - A full refund revokes the grant (admin refund or a provider-reported refund); partial refunds keep access.
 * - Entitlement resolution needs nothing new: a live unscoped plan grant contributes the plan's entitlements
 *   (`resolveEntitlements`, source kind GRANT).
 */

const DAY_MS = 86_400_000;

/** Purposes fulfilled by an EntitlementGrant keyed by paymentId (revoked on a full refund). */
export const GRANT_FULFILLED_PURPOSES: ReadonlySet<PaymentPurpose> = new Set<PaymentPurpose>(["STUDY_PACK", "PLAN_PURCHASE"]);

/** True when a full refund of a payment with this purpose ends the access it bought (its grant is revoked). */
export function refundRevokesAccess(purpose: PaymentPurpose): boolean {
  return GRANT_FULFILLED_PURPOSES.has(purpose);
}

/** Live-grant filter at `now` (not revoked, started, not ended). */
function liveAt(now: Date): Prisma.EntitlementGrantWhereInput {
  return { revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] };
}

// =====================================================================================================================
// Ownership
// =====================================================================================================================

/**
 * True when `userId` already holds open-ended (lifetime) access to `planId` from a grant (a purchase, or staff credit):
 * buying it again would take money for nothing, so checkout refuses.
 */
export async function ownsLifetimePlan(userId: string, planId: string, options: { now?: Date; client?: DbClient | Tx } = {}): Promise<boolean> {
  const now = options.now ?? new Date();
  const client = options.client ?? db;
  // EntitlementGrant(userId, endsAt) index.
  const row = await client.entitlementGrant.findFirst({
    where: { userId, planId, revokedAt: null, startsAt: { lte: now }, endsAt: null },
    select: { id: true },
  });
  return row !== null;
}

/** A student's bought access to a plan, for billing pages ("Full access since 7 October 2026", receipt). */
export interface PurchasedAccessView {
  grantId: string;
  plan: { id: string; code: string; name: string };
  /** When the access started (the confirmed payment). */
  since: Date;
  /** `null` = lifetime. */
  endsAt: Date | null;
  payment: { id: string; receiptNumber: string | null; paidAt: Date | null; amountMinor: number; currency: string; payerUserId: string } | null;
}

/**
 * The beneficiary's live purchased access (source PURCHASE), lifetime first, then the longest-running pass; `null` when
 * none. One query over the EntitlementGrant(userId, endsAt) index.
 */
export async function getPurchasedAccess(userId: string, options: { now?: Date } = {}): Promise<PurchasedAccessView | null> {
  const now = options.now ?? new Date();
  const rows = await db.entitlementGrant.findMany({
    where: { userId, source: "PURCHASE", ...liveAt(now) },
    orderBy: [{ startsAt: "asc" }, { id: "asc" }],
    take: 20,
    select: {
      id: true,
      startsAt: true,
      endsAt: true,
      plan: { select: { id: true, code: true, name: true } },
      payment: { select: { id: true, receiptNumber: true, paidAt: true, amountMinor: true, currency: true, payerUserId: true } },
    },
  });
  const best = rows
    .filter((row) => row.plan !== null)
    .sort((a, b) => (a.endsAt === null ? -1 : b.endsAt === null ? 1 : b.endsAt.getTime() - a.endsAt.getTime()))[0];
  if (!best || !best.plan) return null;
  return { grantId: best.id, plan: best.plan, since: best.startsAt, endsAt: best.endsAt, payment: best.payment };
}

// =====================================================================================================================
// Fulfilment
// =====================================================================================================================

export type PlanPurchaseFulfilment =
  | { outcome: "GRANTED"; grantId: string; userId: string; planId: string; startsAt: Date; endsAt: Date | null }
  | { outcome: "ALREADY_FULFILLED"; grantId: string | null; userId: string | null }
  | { outcome: "NEEDS_REVIEW"; userId: string | null; reason: string };

/**
 * Fulfils a SUCCESSFUL PLAN_PURCHASE payment: one EntitlementGrant(source PURCHASE) for the beneficiary. Idempotent:
 * `Payment.fulfilledAt` (write-once) and the unique `paymentId` on the grant make duplicate webhooks, polls and retries
 * no-ops (ALREADY_FULFILLED). Fulfilments for the same beneficiary and plan are serialised (advisory lock), so a second
 * payment confirmed while lifetime access already exists is never turned into a second grant: it returns NEEDS_REVIEW
 * (staff refund it) without writing, and the caller's transaction is never aborted by a constraint.
 *
 * Run it INSIDE the transaction that moved the payment to SUCCESSFUL.
 *
 * @throws AppError NOT_FOUND (no payment) / BAD_REQUEST (not a plan purchase) / CONFLICT (not SUCCESSFUL)
 */
export async function fulfilPlanPurchasePayment(tx: Tx, paymentId: string, options: { now?: Date } = {}): Promise<PlanPurchaseFulfilment> {
  const now = options.now ?? new Date();
  await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
  const payment = await tx.payment.findUnique({
    where: { id: paymentId },
    select: {
      purpose: true,
      status: true,
      fulfilledAt: true,
      beneficiaryUserId: true,
      planPrice: { select: { planId: true, interval: true, periodDays: true } },
      entitlementGrant: { select: { id: true } },
    },
  });
  if (!payment) throw AppError.notFound("Payment not found.", { paymentId });
  if (payment.purpose !== "PLAN_PURCHASE") throw new AppError("BAD_REQUEST", "This payment is not a one-off plan purchase.");
  if (payment.status !== "SUCCESSFUL") throw AppError.conflict("Only a successful payment can be fulfilled.", { paymentId });
  const userId = payment.beneficiaryUserId;
  if (payment.fulfilledAt !== null || payment.entitlementGrant !== null) {
    return { outcome: "ALREADY_FULFILLED", grantId: payment.entitlementGrant?.id ?? null, userId };
  }
  const review = (reason: string): PlanPurchaseFulfilment => {
    logger.error("billing: plan purchase needs manual review before fulfilment", { paymentId, reason });
    return { outcome: "NEEDS_REVIEW", userId, reason };
  };
  const price = payment.planPrice;
  if (userId === null) return review("payment has no beneficiary");
  if (price === null || price.planId === null) return review("payment price is not a plan price");
  if (price.interval !== "ONE_OFF") return review("payment price is not a one-off price");
  const planId = price.planId;

  // One fulfilment at a time per beneficiary and plan (a student and a parent may pay in parallel).
  const lockKey = `billing.purchase:${userId}:${planId}`;
  await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))) l`;

  const lifetime = price.periodDays === null;
  if (lifetime) {
    const owned = await tx.entitlementGrant.findFirst({
      where: { userId, planId, source: "PURCHASE", revokedAt: null, endsAt: null },
      select: { id: true },
    });
    if (owned) return review("beneficiary already owns lifetime access to this plan: refund this duplicate payment");
  }

  // A time-boxed pass continues after the latest running purchase of the same plan (never overlap paid days).
  const running = lifetime
    ? null
    : await tx.entitlementGrant.findFirst({
        where: { userId, planId, source: "PURCHASE", revokedAt: null, startsAt: { lte: now }, endsAt: { gt: now } },
        orderBy: { endsAt: "desc" },
        select: { endsAt: true },
      });
  const startsAt = running?.endsAt ?? now;
  const endsAt = price.periodDays === null ? null : new Date(startsAt.getTime() + price.periodDays * DAY_MS);

  const grant = await tx.entitlementGrant.create({
    data: { userId, source: "PURCHASE", planId, paymentId, startsAt, endsAt },
    select: { id: true },
  });
  await tx.payment.update({
    where: { id: paymentId },
    data: { fulfilledAt: now, ...(endsAt !== null ? { servicePeriodStart: startsAt, servicePeriodEnd: endsAt } : {}) },
  });
  invalidateEntitlements(userId);
  return { outcome: "GRANTED", grantId: grant.id, userId, planId, startsAt, endsAt };
}

/**
 * Ends the access a fully refunded payment bought (study pack or plan purchase): its grant is revoked now. Returns the
 * number of grants revoked (0 when the payment never fulfilled one, or it was already revoked). Run inside the
 * transaction that records the refund.
 */
export async function revokeAccessBoughtBy(
  tx: Tx,
  paymentId: string,
  options: { now: Date; revokedById?: string | null; reason?: string },
): Promise<number> {
  const result = await tx.entitlementGrant.updateMany({
    where: { paymentId, revokedAt: null },
    data: {
      revokedAt: options.now,
      revokeReason: options.reason ?? "Payment refunded",
      ...(options.revokedById ? { revokedById: options.revokedById } : {}),
    },
  });
  return result.count;
}
