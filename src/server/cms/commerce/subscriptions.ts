import "server-only";
import type {
  BillingInterval,
  EntitlementSource,
  PaymentStatus,
  PlanAudience,
  Prisma,
  SubscriptionSource,
  SubscriptionStatus,
} from "@/generated/prisma/client";
import {
  getBillingGraceDays,
  invalidateEntitlements,
  isSubscriptionLive,
  LIVE_SUBSCRIPTION_STATUSES,
  subscriptionAccessEndsAt,
} from "@/server/billing/entitlements";
import { cancelSubscription, isTerminalSubscriptionStatus, resumeSubscription } from "@/server/billing/subscriptions";
import { db } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "../users/cursor";
import { userSearchWhere } from "../users/service";
import {
  cancelSubscriptionSchema,
  extendSubscriptionSchema,
  listSubscriptionsSchema,
  resumeSubscriptionSchema,
  revokeGrantSchema,
  type CancelSubscriptionAdminInput,
  type ExtendSubscriptionInput,
  type ListSubscriptionsInput,
} from "./schemas";
import {
  AUDIT_TRAIL_SELECT,
  COMMERCE_AUDIT,
  COMMERCE_AUDIT_OPERATIONS,
  parseInput,
  personRef,
  PROFILE_NAME_SELECT,
  toAuditTrailEntry,
  type AuditTrailEntry,
  type PersonRef,
} from "./shared";

/**
 * Subscriptions administration (§31, §36 Subscriptions; ARCHITECTURE §7.5, §5.2 `billing.manage`).
 *
 * - Lists and details (holder, payer, price, payments, grants, audit trail). Holder and payer are shown by name with
 *   a link to their admin page; contact details are never listed here.
 * - Cancel at period end / now and resume reuse the billing state machine (`cancelSubscription`,
 *   `resumeSubscription` in src/server/billing/subscriptions.ts, which audit in the same transaction); staff must give
 *   a reason.
 * - "Extend" never edits the paid period (a period is what a payment bought): it issues a time-boxed
 *   EntitlementGrant (source ADMIN or COMPENSATION, attributed and justified by CHECK) for the subscription's plan,
 *   starting when the subscription's paid period (or the user's last staff grant for that plan) ends. School
 *   subscriptions are extended through the school contract instead (school-held grants apply to staff only).
 */

const DAY_MS = 86_400_000;

export interface SubscriptionHolder {
  kind: "user" | "school";
  id: string;
  name: string;
}

export interface SubscriptionListItem {
  id: string;
  status: SubscriptionStatus;
  source: SubscriptionSource;
  plan: { id: string; code: string; name: string };
  holder: SubscriptionHolder;
  seats: number | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
}

const HOLDER_SELECT = {
  holder: { select: { id: true, profile: PROFILE_NAME_SELECT } },
  school: { select: { id: true, name: true } },
} as const satisfies Prisma.SubscriptionSelect;

type HolderRows = Prisma.SubscriptionGetPayload<{ select: typeof HOLDER_SELECT }>;

function holderOf(row: HolderRows): SubscriptionHolder {
  if (row.school) return { kind: "school", id: row.school.id, name: row.school.name };
  const person = personRef(row.holder);
  return { kind: "user", id: person?.id ?? "", name: person?.name ?? "Unknown holder" };
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function searchWhere(q: string): Prisma.SubscriptionWhereInput {
  if (UUID_PATTERN.test(q)) {
    const id = q.toLowerCase();
    return { OR: [{ id }, { holderUserId: id }, { schoolId: id }, { payerUserId: id }] };
  }
  return { OR: [{ holder: { is: userSearchWhere(q) } }, { school: { is: { name: { contains: q, mode: "insensitive" } } } }] };
}

/** §36 Subscriptions: newest first; search by holder (name / email / phone / id) or school name; filters. */
export async function listSubscriptions(
  actor: CmsActor,
  input: ListSubscriptionsInput = {},
): Promise<{ items: SubscriptionListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(listSubscriptionsSchema, input);
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.SubscriptionWhereInput[] = [];
  if (data.status) where.push({ status: data.status });
  if (data.planId) where.push({ planId: data.planId });
  if (data.source) where.push({ source: data.source });
  if (data.holder === "user") where.push({ holderUserId: { not: null } });
  if (data.holder === "school") where.push({ schoolId: { not: null } });
  if (data.q) where.push(searchWhere(data.q));
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.SubscriptionWhereInput);
  const rows = await db.subscription.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: {
      id: true,
      status: true,
      source: true,
      seats: true,
      currentPeriodEnd: true,
      cancelAtPeriodEnd: true,
      createdAt: true,
      plan: { select: { id: true, code: true, name: true } },
      ...HOLDER_SELECT,
    },
  });
  const page = pageOf(rows, limit);
  return {
    items: page.items.map((row) => ({
      id: row.id,
      status: row.status,
      source: row.source,
      plan: row.plan,
      holder: holderOf(row),
      seats: row.seats,
      currentPeriodEnd: row.currentPeriodEnd,
      cancelAtPeriodEnd: row.cancelAtPeriodEnd,
      createdAt: row.createdAt,
    })),
    nextCursor: page.nextCursor,
  };
}

export interface SubscriptionPaymentRow {
  id: string;
  status: PaymentStatus;
  provider: string;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
  receiptNumber: string | null;
  paidAt: Date | null;
  servicePeriodStart: Date | null;
  servicePeriodEnd: Date | null;
  createdAt: Date;
}

export interface GrantRow {
  id: string;
  source: EntitlementSource;
  planCode: string | null;
  startsAt: Date;
  endsAt: Date | null;
  revokedAt: Date | null;
  reason: string | null;
  revokeReason: string | null;
  grantedBy: PersonRef | null;
  live: boolean;
  state: "active" | "upcoming" | "ended" | "revoked";
  /** Staff-issued (ADMIN / COMPENSATION) grants can be revoked from the admin. */
  revocable: boolean;
}

export interface SubscriptionDetail {
  id: string;
  status: SubscriptionStatus;
  source: SubscriptionSource;
  plan: { id: string; code: string; name: string; audience: PlanAudience };
  price: {
    id: string;
    currency: string;
    amountMinor: number;
    interval: BillingInterval;
    intervalCount: number;
    periodDays: number | null;
    perSeat: boolean;
    label: string | null;
  } | null;
  holder: SubscriptionHolder;
  payer: PersonRef | null;
  createdBy: PersonRef | null;
  seats: number | null;
  seatsInUse: number | null;
  startedAt: Date | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  cancelAtPeriodEnd: boolean;
  cancelledAt: Date | null;
  cancelReason: string | null;
  endedAt: Date | null;
  autoRenew: boolean;
  provider: string | null;
  providerSubscriptionRef: string | null;
  notes: string | null;
  createdAt: Date;
  /** Live by time (period + grace), whatever the stored status says; and when access ends. */
  access: { live: boolean; endsAt: Date | null; graceDays: number };
  payments: SubscriptionPaymentRow[];
  grants: GrantRow[];
  audit: AuditTrailEntry[];
  actions: { cancelAtPeriodEnd: boolean; cancelNow: boolean; resume: boolean; extend: boolean };
}

const STAFF_GRANT_SOURCES: readonly EntitlementSource[] = ["ADMIN", "COMPENSATION"];

function grantLive(grant: { startsAt: Date; endsAt: Date | null; revokedAt: Date | null }, now: Date): boolean {
  return grant.revokedAt === null && grant.startsAt.getTime() <= now.getTime() && (grant.endsAt === null || grant.endsAt.getTime() > now.getTime());
}

/** One subscription with its price, parties, recent payments, holder grants and audit trail. */
export async function getSubscriptionDetail(actor: CmsActor, subscriptionId: string, now: Date = new Date()): Promise<SubscriptionDetail> {
  assertCmsPermission(actor, "billing.manage");
  const id = parseInput(resumeSubscriptionSchema.shape.subscriptionId, subscriptionId);
  const sub = await db.subscription.findUnique({
    where: { id },
    select: {
      id: true,
      status: true,
      source: true,
      seats: true,
      holderUserId: true,
      schoolId: true,
      startedAt: true,
      currentPeriodStart: true,
      currentPeriodEnd: true,
      trialEndsAt: true,
      cancelAtPeriodEnd: true,
      cancelledAt: true,
      cancelReason: true,
      endedAt: true,
      autoRenew: true,
      provider: true,
      providerSubscriptionRef: true,
      notes: true,
      createdAt: true,
      plan: { select: { id: true, code: true, name: true, audience: true } },
      planPrice: { select: { id: true, currency: true, amountMinor: true, interval: true, intervalCount: true, periodDays: true, perSeat: true, label: true } },
      payer: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      createdBy: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      ...HOLDER_SELECT,
    },
  });
  if (!sub) throw AppError.notFound("Subscription not found.");
  const graceDays = await getBillingGraceDays();
  const [payments, grants, seatsInUse] = await Promise.all([
    // Payment(subscriptionId, createdAt) index.
    db.payment.findMany({
      where: { subscriptionId: sub.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 25,
      select: {
        id: true,
        status: true,
        provider: true,
        amountMinor: true,
        currency: true,
        refundedAmountMinor: true,
        receiptNumber: true,
        paidAt: true,
        servicePeriodStart: true,
        servicePeriodEnd: true,
        createdAt: true,
      },
    }),
    sub.holderUserId === null
      ? Promise.resolve([])
      : // EntitlementGrant(userId, endsAt) index.
        db.entitlementGrant.findMany({
          where: { userId: sub.holderUserId, source: { not: "SCHOOL_SEAT" } },
          orderBy: [{ createdAt: "desc" }, { id: "desc" }],
          take: 25,
          select: {
            id: true,
            source: true,
            startsAt: true,
            endsAt: true,
            revokedAt: true,
            reason: true,
            revokeReason: true,
            plan: { select: { code: true } },
            grantedBy: { select: { id: true, profile: PROFILE_NAME_SELECT } },
          },
        }),
    sub.schoolId === null
      ? Promise.resolve(null)
      : // EntitlementGrant(subscriptionId, revokedAt) index.
        db.entitlementGrant.count({
          where: { subscriptionId: sub.id, source: "SCHOOL_SEAT", revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
        }),
  ]);
  const grantIds = grants.map((grant) => grant.id);
  const auditRows = await db.auditLog.findMany({
    where: {
      OR: [
        { entityType: "Subscription", entityId: sub.id },
        ...(grantIds.length > 0 ? [{ entityType: "EntitlementGrant", entityId: { in: grantIds } }] : []),
      ],
    },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: AUDIT_TRAIL_SELECT,
  });

  const live = isSubscriptionLive(sub, now, graceDays);
  const terminal = isTerminalSubscriptionStatus(sub.status);
  return {
    id: sub.id,
    status: sub.status,
    source: sub.source,
    plan: sub.plan,
    price: sub.planPrice,
    holder: holderOf(sub),
    payer: personRef(sub.payer),
    createdBy: personRef(sub.createdBy),
    seats: sub.seats,
    seatsInUse,
    startedAt: sub.startedAt,
    currentPeriodStart: sub.currentPeriodStart,
    currentPeriodEnd: sub.currentPeriodEnd,
    trialEndsAt: sub.trialEndsAt,
    cancelAtPeriodEnd: sub.cancelAtPeriodEnd,
    cancelledAt: sub.cancelledAt,
    cancelReason: sub.cancelReason,
    endedAt: sub.endedAt,
    autoRenew: sub.autoRenew,
    provider: sub.provider,
    providerSubscriptionRef: sub.providerSubscriptionRef,
    notes: sub.notes,
    createdAt: sub.createdAt,
    access: { live, endsAt: live ? subscriptionAccessEndsAt(sub, graceDays) : null, graceDays },
    payments,
    grants: grants.map((grant) => ({
      id: grant.id,
      source: grant.source,
      planCode: grant.plan?.code ?? null,
      startsAt: grant.startsAt,
      endsAt: grant.endsAt,
      revokedAt: grant.revokedAt,
      reason: grant.reason,
      revokeReason: grant.revokeReason,
      grantedBy: personRef(grant.grantedBy),
      live: grantLive(grant, now),
      state: grant.revokedAt !== null ? "revoked" : grantLive(grant, now) ? "active" : grant.startsAt.getTime() > now.getTime() ? "upcoming" : "ended",
      revocable: grant.revokedAt === null && STAFF_GRANT_SOURCES.includes(grant.source) && (grant.endsAt === null || grant.endsAt.getTime() > now.getTime()),
    })),
    audit: auditRows.map(toAuditTrailEntry),
    actions: {
      cancelAtPeriodEnd: !terminal && !sub.cancelAtPeriodEnd,
      cancelNow: !terminal,
      resume: (sub.status === "ACTIVE" || sub.status === "TRIALING") && sub.cancelAtPeriodEnd,
      extend: sub.holderUserId !== null,
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------

export interface SubscriptionChangeResult {
  changed: boolean;
  status: SubscriptionStatus;
  cancelAtPeriodEnd: boolean;
  currentPeriodEnd: Date | null;
  endedAt: Date | null;
}

/**
 * Staff cancellation (reason required): `period_end` stops renewal and keeps access to the end of the paid period (a
 * PAST_DUE subscription ends now, its paid period being over); `now` ends access immediately. Runs the billing state
 * machine, which writes the `subscription.cancel` audit entry in the same transaction.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT (already ended)
 */
export async function cancelSubscriptionAsStaff(actor: CmsActor, input: CancelSubscriptionAdminInput): Promise<SubscriptionChangeResult> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(cancelSubscriptionSchema, input);
  const before = await db.subscription.findUnique({ where: { id: data.subscriptionId }, select: { status: true, cancelAtPeriodEnd: true } });
  if (!before) throw AppError.notFound("Subscription not found.");
  if (isTerminalSubscriptionStatus(before.status)) throw AppError.conflict("This subscription has already ended.");
  const after = await cancelSubscription(infraActor(actor), data.subscriptionId, { immediately: data.mode === "now", reason: data.reason });
  return {
    changed: after.status !== before.status || after.cancelAtPeriodEnd !== before.cancelAtPeriodEnd,
    status: after.status,
    cancelAtPeriodEnd: after.cancelAtPeriodEnd,
    currentPeriodEnd: after.currentPeriodEnd,
    endedAt: after.endedAt,
  };
}

/** Undoes a pending cancel-at-period-end (audited by the billing service as `subscription.resume`). */
export async function resumeSubscriptionAsStaff(actor: CmsActor, input: { subscriptionId: string; reason?: string }): Promise<SubscriptionChangeResult> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(resumeSubscriptionSchema, input);
  const before = await db.subscription.findUnique({ where: { id: data.subscriptionId }, select: { status: true, cancelAtPeriodEnd: true } });
  if (!before) throw AppError.notFound("Subscription not found.");
  const after = await resumeSubscription(infraActor(actor), data.subscriptionId);
  return {
    changed: after.cancelAtPeriodEnd !== before.cancelAtPeriodEnd,
    status: after.status,
    cancelAtPeriodEnd: after.cancelAtPeriodEnd,
    currentPeriodEnd: after.currentPeriodEnd,
    endedAt: after.endedAt,
  };
}

/**
 * Extends an individual subscription by `days` with an attributed, justified EntitlementGrant for its plan. The grant
 * starts at the latest of: now, the end of the paid period (live subscriptions) and the end of the user's last live
 * staff grant for the same plan, so repeated extensions chain instead of overlapping. Staff never extend a subscription
 * they hold or pay for (PAY-8); the Server Action also requires a recent password confirmation (step-up).
 *
 * @throws AppError FORBIDDEN (incl. self-grant) | NOT_FOUND | VALIDATION (school subscription)
 */
export async function extendSubscription(
  actor: CmsActor,
  input: ExtendSubscriptionInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ grantId: string; startsAt: Date; endsAt: Date }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(extendSubscriptionSchema, input);
  const result = await db.$transaction(async (tx) => {
    // Serialise extensions of one subscription (chaining reads the latest grant).
    await tx.$queryRaw`SELECT "id" FROM "Subscription" WHERE "id" = ${data.subscriptionId}::uuid FOR UPDATE`;
    const sub = await tx.subscription.findUnique({
      where: { id: data.subscriptionId },
      select: {
        id: true,
        holderUserId: true,
        payerUserId: true,
        schoolId: true,
        planId: true,
        status: true,
        currentPeriodEnd: true,
        plan: { select: { code: true } },
      },
    });
    if (!sub) throw AppError.notFound("Subscription not found.");
    // PAY-8: free access is never self-granted (own account, or one the staff member pays for).
    if (sub.holderUserId === actor.userId || sub.payerUserId === actor.userId) {
      throw AppError.forbidden("You can't extend a subscription you hold or pay for. Ask another admin.");
    }
    if (sub.holderUserId === null) {
      throw AppError.validation({
        _form: ["School subscriptions are extended through the school's contract (seats and period), not with a grant."],
      });
    }
    let startsAt = now;
    if (LIVE_SUBSCRIPTION_STATUSES.some((status) => status === sub.status) && sub.currentPeriodEnd && sub.currentPeriodEnd > startsAt) {
      startsAt = sub.currentPeriodEnd;
    }
    const latest = await tx.entitlementGrant.findFirst({
      where: { userId: sub.holderUserId, planId: sub.planId, source: { in: [...STAFF_GRANT_SOURCES] }, revokedAt: null, endsAt: { gt: startsAt } },
      orderBy: { endsAt: "desc" },
      select: { endsAt: true },
    });
    if (latest?.endsAt) startsAt = latest.endsAt;
    const endsAt = new Date(startsAt.getTime() + data.days * DAY_MS);
    const grant = await tx.entitlementGrant.create({
      data: {
        userId: sub.holderUserId,
        source: data.source,
        planId: sub.planId,
        startsAt,
        endsAt,
        grantedById: actor.userId,
        reason: data.reason,
      },
      select: { id: true },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.SUBSCRIPTION_EXTEND,
      entityType: "EntitlementGrant",
      entityId: grant.id,
      targetUserId: sub.holderUserId,
      after: { source: data.source, planCode: sub.plan.code, startsAt: startsAt.toISOString(), endsAt: endsAt.toISOString(), days: data.days },
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.subscriptionExtend, subscriptionId: sub.id },
      reason: data.reason,
      request,
    });
    return { grantId: grant.id, startsAt, endsAt, userId: sub.holderUserId };
  });
  invalidateEntitlements(result.userId);
  return { grantId: result.grantId, startsAt: result.startsAt, endsAt: result.endsAt };
}

/**
 * Revokes a staff-issued grant (ADMIN / COMPENSATION) with a reason. Purchases, referral rewards and school seats are
 * never revoked from here (refund the payment or manage the school instead).
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | CONFLICT
 */
export async function revokeStaffGrant(
  actor: CmsActor,
  input: { grantId: string; reason: string },
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ revokedAt: Date }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(revokeGrantSchema, input);
  const userId = await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "EntitlementGrant" WHERE "id" = ${data.grantId}::uuid FOR UPDATE`;
    const grant = await tx.entitlementGrant.findUnique({
      where: { id: data.grantId },
      select: { id: true, userId: true, schoolId: true, source: true, revokedAt: true, endsAt: true, plan: { select: { code: true } } },
    });
    if (!grant) throw AppError.notFound("Grant not found.");
    if (!STAFF_GRANT_SOURCES.includes(grant.source)) {
      throw AppError.conflict("Only staff-issued grants can be revoked here. Refund the payment or change the school's seats instead.");
    }
    if (grant.revokedAt !== null) throw AppError.conflict("This grant was already revoked.");
    if (grant.endsAt !== null && grant.endsAt.getTime() <= now.getTime()) throw AppError.conflict("This grant has already ended.");
    await tx.entitlementGrant.update({
      where: { id: grant.id },
      data: { revokedAt: now, revokedById: actor.userId, revokeReason: data.reason },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.GRANT_REVOKE,
      entityType: "EntitlementGrant",
      entityId: grant.id,
      targetUserId: grant.userId,
      schoolId: grant.schoolId,
      before: { revokedAt: null },
      after: { revokedAt: now.toISOString() },
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.grantRevoke, source: grant.source, planCode: grant.plan?.code ?? null },
      reason: data.reason,
      request,
    });
    return grant.userId;
  });
  invalidateEntitlements(userId ?? undefined);
  return { revokedAt: now };
}
