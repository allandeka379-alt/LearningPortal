import "server-only";
import type { BillingInterval, SubscriptionSource, SubscriptionStatus } from "@/generated/prisma/client";
import { SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import { LIVE_SUBSCRIPTION_STATUSES } from "@/server/billing/entitlements";
import { db } from "@/server/db";
import { auditInTx } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { sendMessage } from "@/server/messaging";
import { notifyMany } from "@/server/notifications";
import { assertSchoolAdmin, parseInput, schoolAuditActor, type SchoolActor, type SchoolRequestMeta } from "./access";
import { SCHOOL_AUDIT, SCHOOL_AUDIT_OPERATIONS } from "./audit";
import { seatUsage, type SeatUsage } from "./core";
import { assertSchoolLimit } from "./limits";
import { planRequestSchema } from "./schemas";

/**
 * The school subscription as the school admin sees it (§31 SCHOOL plan, §53 B2B / B2B2C; ARCHITECTURE §4.8): plan,
 * seats purchased vs allocated (EntitlementGrant SCHOOL_SEAT rows; students claim a free seat automatically when they
 * next use the platform) and status. There is NO self-serve B2B checkout yet (B2B invoicing is TBC): a school without
 * a subscription can send a "Request a school plan" message, which notifies platform admins in-app (and the support
 * mailbox when configured). Plans and prices shown come from the database (rule 5), never from code.
 */

export interface SchoolPlanOption {
  id: string;
  name: string;
  tagline: string | null;
  highlights: string[];
  prices: { id: string; amountMinor: number; currency: string; interval: BillingInterval; intervalCount: number; perSeat: boolean; periodDays: number | null; minSeats: number | null; label: string | null }[];
}

export interface SchoolSubscriptionSummary {
  /** The school can hold a subscription (verified, ACTIVE school). */
  billingAvailable: boolean;
  live: {
    id: string;
    planName: string;
    status: SubscriptionStatus;
    source: SubscriptionSource;
    currentPeriodStart: Date | null;
    currentPeriodEnd: Date | null;
    trialEndsAt: Date | null;
    cancelAtPeriodEnd: boolean;
    seats: SeatUsage;
  } | null;
  history: { id: string; planName: string; status: SubscriptionStatus; seats: number | null; currentPeriodEnd: Date | null; endedAt: Date | null }[];
  activeStudents: number;
  plans: SchoolPlanOption[];
  lastRequest: { createdAt: Date; seats: number | null } | null;
}

/** Seat usage of the school's live subscription (null without one). */
export async function getSchoolSeatSummary(schoolId: string, activeStudents: number, now: Date = new Date()): Promise<(SeatUsage & { subscriptionId: string; planName: string; status: SubscriptionStatus; currentPeriodEnd: Date | null }) | null> {
  const live = await db.subscription.findFirst({
    where: { schoolId, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } },
    orderBy: { createdAt: "desc" },
    select: { id: true, seats: true, status: true, currentPeriodEnd: true, plan: { select: { name: true } } },
  });
  if (!live) return null;
  const allocated = await db.entitlementGrant.count({
    where: { subscriptionId: live.id, source: "SCHOOL_SEAT", revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
  });
  return { subscriptionId: live.id, planName: live.plan.name, status: live.status, currentPeriodEnd: live.currentPeriodEnd, ...seatUsage({ seats: live.seats, allocated, activeStudents }) };
}

/** The school subscription page data (see the module docs). */
export async function getSchoolSubscription(actor: SchoolActor, schoolId: string, options: { now?: Date } = {}): Promise<SchoolSubscriptionSummary> {
  const school = await assertSchoolAdmin(actor, schoolId);
  const now = options.now ?? new Date();
  const [subscriptions, activeStudents, plans, lastRequest] = await Promise.all([
    db.subscription.findMany({
      where: { schoolId: school.schoolId },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 10,
      select: {
        id: true,
        status: true,
        source: true,
        seats: true,
        currentPeriodStart: true,
        currentPeriodEnd: true,
        trialEndsAt: true,
        cancelAtPeriodEnd: true,
        endedAt: true,
        plan: { select: { name: true } },
      },
    }),
    db.schoolMember.count({ where: { schoolId: school.schoolId, role: "STUDENT", status: "ACTIVE" } }),
    db.plan.findMany({
      where: { audience: "SCHOOL", isActive: true, isPublic: true },
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      take: 10,
      select: {
        id: true,
        name: true,
        tagline: true,
        highlights: true,
        prices: {
          where: { isActive: true, validFrom: { lte: now }, AND: [{ OR: [{ validTo: null }, { validTo: { gt: now } }] }, { OR: [{ countryId: null }, { countryId: school.countryId }] }] },
          orderBy: [{ sortOrder: "asc" }, { amountMinor: "asc" }],
          select: { id: true, amountMinor: true, currency: true, interval: true, intervalCount: true, perSeat: true, periodDays: true, minSeats: true, label: true },
        },
      },
    }),
    db.auditLog.findFirst({
      where: { schoolId: school.schoolId, action: SCHOOL_AUDIT.PLAN_REQUEST },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true, after: true },
    }),
  ]);
  const liveRow = subscriptions.find((sub) => (LIVE_SUBSCRIPTION_STATUSES as readonly string[]).includes(sub.status));
  const allocated = liveRow
    ? await db.entitlementGrant.count({
        where: { subscriptionId: liveRow.id, source: "SCHOOL_SEAT", revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] },
      })
    : 0;
  const requestedSeats = lastRequest?.after && typeof lastRequest.after === "object" && !Array.isArray(lastRequest.after) ? (lastRequest.after as { seats?: unknown }).seats : null;
  return {
    billingAvailable: school.status === "ACTIVE",
    live: liveRow
      ? {
          id: liveRow.id,
          planName: liveRow.plan.name,
          status: liveRow.status,
          source: liveRow.source,
          currentPeriodStart: liveRow.currentPeriodStart,
          currentPeriodEnd: liveRow.currentPeriodEnd,
          trialEndsAt: liveRow.trialEndsAt,
          cancelAtPeriodEnd: liveRow.cancelAtPeriodEnd,
          seats: seatUsage({ seats: liveRow.seats, allocated, activeStudents }),
        }
      : null,
    history: subscriptions
      .filter((sub) => sub.id !== liveRow?.id)
      .map((sub) => ({ id: sub.id, planName: sub.plan.name, status: sub.status, seats: sub.seats, currentPeriodEnd: sub.currentPeriodEnd, endedAt: sub.endedAt })),
    activeStudents,
    plans,
    lastRequest: lastRequest ? { createdAt: lastRequest.createdAt, seats: typeof requestedSeats === "number" ? requestedSeats : null } : null,
  };
}

/**
 * "Request a school plan": tells platform admins (in-app notification to every ACTIVE ADMIN / SUPER_ADMIN, and the
 * support mailbox when configured) that this school wants a plan for `seats` students. Rate limited per school (3 a
 * day). Audited. Nothing is charged: B2B invoicing is arranged by the platform team.
 */
export async function requestSchoolPlan(actor: SchoolActor, input: unknown, meta?: SchoolRequestMeta, options: { now?: Date } = {}): Promise<{ notified: number }> {
  const data = parseInput(planRequestSchema, input);
  const school = await assertSchoolAdmin(actor, data.schoolId);
  const now = options.now ?? new Date();
  let planName: string | null = null;
  if (data.planId) {
    const plan = await db.plan.findFirst({ where: { id: data.planId, audience: "SCHOOL", isActive: true }, select: { name: true } });
    if (!plan) throw AppError.validation({ planId: ["Choose one of the school plans."] });
    planName = plan.name;
  }
  await assertSchoolLimit("planRequest", school.schoolId, "Your school has already sent a request today. The platform team will be in touch.");
  // Platform admins (a handful in production; bounded, newest first).
  const admins = await db.user.findMany({
    where: { status: "ACTIVE", roles: { hasSome: ["ADMIN", "SUPER_ADMIN"] } },
    orderBy: { createdAt: "desc" },
    select: { id: true },
    take: 2_000,
  });
  const summary = `${school.name} asked about a school plan for ${data.seats} student${data.seats === 1 ? "" : "s"}${planName ? ` (${planName})` : ""}.`;
  const body = data.message ? `${summary} Message: ${data.message}` : summary;
  const notified = await db.$transaction(async (tx) => {
    await auditInTx(tx, {
      ...schoolAuditActor(actor),
      action: SCHOOL_AUDIT.PLAN_REQUEST,
      entityType: "School",
      entityId: school.schoolId,
      schoolId: school.schoolId,
      after: { seats: data.seats, planId: data.planId ?? null },
      metadata: { operation: SCHOOL_AUDIT_OPERATIONS.planRequest, hasMessage: data.message !== undefined },
      request: meta ?? null,
    });
    const result = await notifyMany(
      admins.map((admin) => admin.id),
      {
        type: "billing.school_plan_request",
        category: "BILLING",
        title: `School plan request: ${school.name}`.slice(0, 200),
        body: body.slice(0, 2_000),
        data: { href: `/admin/schools/${school.schoolId}`, entityType: "School", entityId: school.schoolId },
        dedupeKey: `school-plan-request:${school.schoolId}:${now.getTime()}`,
      },
      { client: tx },
    );
    return result.created;
  }, { maxWait: 10_000, timeout: 30_000 });
  // A copy for the support mailbox is OPTIONAL email (skipped while `features.email` is off): the in-app notice above is
  // the record.
  if (SUPPORT_EMAIL_CONFIGURED) {
    try {
      await sendMessage({ channel: "email", to: SUPPORT_EMAIL, subject: `School plan request: ${school.name}`, text: `${body}\nSchool id: ${school.schoolId}`, tag: "school.plan_request" });
    } catch (error) {
      logger.warn("school plan request email failed", { schoolId: school.schoolId, err: error });
    }
  }
  return { notified };
}
