import "server-only";
import { z } from "zod";
import type { BillingInterval, PlanAudience, Prisma } from "@/generated/prisma/client";
import type { Entitlements } from "@/lib/billing/entitlements";
import { invalidateEntitlements, LIVE_SUBSCRIPTION_STATUSES, normalizeEntitlementDocument } from "@/server/billing/entitlements";
import { invalidatePlanCache } from "@/server/billing/plans";
import { db } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { changedEntitlementKeys } from "./entitlement-fields";
import {
  createPlanPriceSchema,
  setPlanPriceActiveSchema,
  updatePlanDetailsSchema,
  updatePlanEntitlementsSchema,
  type CreatePlanPriceInput,
  type SetPlanPriceActiveInput,
  type UpdatePlanDetailsInput,
  type UpdatePlanEntitlementsInput,
} from "./schemas";
import {
  AUDIT_TRAIL_SELECT,
  COMMERCE_AUDIT,
  COMMERCE_AUDIT_OPERATIONS,
  parseInput,
  sameInstant,
  staleFormError,
  toAuditTrailEntry,
  type AuditTrailEntry,
} from "./shared";

/**
 * Plans & prices administration (§31 "prices NOT hard-coded; configurable from admin", §36; ARCHITECTURE §4.8,
 * §5.2 `billing.manage` = ADMIN / SUPER_ADMIN).
 *
 * - Plan details (name, copy, public flag, order, trial) and the entitlements document are edited in place; both
 *   use the row's `updatedAt` as an optimistic-concurrency token so two admins never silently overwrite each other.
 *   The entitlements are validated against the contract (`entitlementsSchema`) and stored in its flat shape.
 * - Prices are NEVER edited in place (the `PlanPrice_immutable` trigger freezes every price-defining column): a change
 *   is a NEW row, optionally "replacing" an old one, which is then deactivated now or ends when the new one starts.
 *   Only `isActive` is toggled on existing rows. Two current prices with identical terms are refused (the pricing
 *   page would show both).
 * - Every mutation writes its AuditLog entry in the same transaction and drops the plan / entitlement caches of this
 *   instance (others refresh within 60 s).
 */

const planIdSchema = z.uuid({ error: "Invalid id." });

/** Grace for a "starts now" price submitted from a form a few seconds after it rendered. */
const PAST_START_TOLERANCE_MS = 5 * 60_000;

// ---------------------------------------------------------------------------------------------------------------------
// Pure helpers
// ---------------------------------------------------------------------------------------------------------------------

export type PriceState = "current" | "scheduled" | "ended" | "inactive";

/** Where a price is in its life at `now` (pure). */
export function priceState(price: { isActive: boolean; validFrom: Date; validTo: Date | null }, now: Date): PriceState {
  if (!price.isActive) return "inactive";
  if (price.validFrom.getTime() > now.getTime()) return "scheduled";
  if (price.validTo !== null && price.validTo.getTime() <= now.getTime()) return "ended";
  return "current";
}

export interface PriceTerms {
  currency: string;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat: boolean;
  countryId: string | null;
}

/** Two prices compete on the pricing page when their buying terms are identical. Pure. */
export function sameTerms(a: PriceTerms, b: PriceTerms): boolean {
  return (
    a.currency === b.currency &&
    a.interval === b.interval &&
    a.intervalCount === b.intervalCount &&
    a.periodDays === b.periodDays &&
    a.perSeat === b.perSeat &&
    a.countryId === b.countryId
  );
}

/** True when the half-open windows [fromA, toA) and [fromB, toB) overlap (`null` = open-ended). Pure. */
export function windowsOverlap(fromA: Date, toA: Date | null, fromB: Date, toB: Date | null): boolean {
  const aEnds = toA?.getTime() ?? Number.POSITIVE_INFINITY;
  const bEnds = toB?.getTime() ?? Number.POSITIVE_INFINITY;
  return fromA.getTime() < bEnds && fromB.getTime() < aEnds;
}

// ---------------------------------------------------------------------------------------------------------------------
// Reads
// ---------------------------------------------------------------------------------------------------------------------

export interface AdminPriceSummary {
  id: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat: boolean;
  countryId: string | null;
  label: string | null;
}

export interface AdminPlanListItem {
  id: string;
  code: string;
  name: string;
  audience: PlanAudience;
  isPublic: boolean;
  isActive: boolean;
  isDefault: boolean;
  isDemo: boolean;
  sortOrder: number;
  trialDays: number;
  updatedAt: Date;
  currentPrices: AdminPriceSummary[];
  scheduledPrices: number;
  liveSubscriptions: number;
  /** Students holding the plan through a live one-off purchase (EntitlementGrant source PURCHASE). */
  livePurchases: number;
}

/** Plan list cap: plans are configuration (a handful of rows), not a growing table. */
export const MAX_ADMIN_PLANS = 200;

const PRICE_SUMMARY_SELECT = {
  id: true,
  planId: true,
  currency: true,
  amountMinor: true,
  interval: true,
  intervalCount: true,
  periodDays: true,
  perSeat: true,
  countryId: true,
  label: true,
  isActive: true,
  validFrom: true,
  validTo: true,
  sortOrder: true,
} as const satisfies Prisma.PlanPriceSelect;

function priceSummary(price: Prisma.PlanPriceGetPayload<{ select: typeof PRICE_SUMMARY_SELECT }>): AdminPriceSummary {
  return {
    id: price.id,
    currency: price.currency,
    amountMinor: price.amountMinor,
    interval: price.interval,
    intervalCount: price.intervalCount,
    periodDays: price.periodDays,
    perSeat: price.perSeat,
    countryId: price.countryId,
    label: price.label,
  };
}

/**
 * Every plan (active or not, public or not) in display order, with current prices and live subscription counts.
 * `options.q` narrows the list to plans whose code or name contains it (case-insensitive).
 */
export async function listPlansForAdmin(actor: CmsActor, now: Date = new Date(), options: { q?: string | null } = {}): Promise<AdminPlanListItem[]> {
  assertCmsPermission(actor, "billing.manage");
  const q = options.q?.trim().slice(0, 100) ?? "";
  const plans = await db.plan.findMany({
    ...(q ? { where: { OR: [{ code: { contains: q, mode: "insensitive" as const } }, { name: { contains: q, mode: "insensitive" as const } }] } } : {}),
    orderBy: [{ sortOrder: "asc" }, { code: "asc" }],
    take: MAX_ADMIN_PLANS,
    select: {
      id: true,
      code: true,
      name: true,
      audience: true,
      isPublic: true,
      isActive: true,
      isDefault: true,
      isDemo: true,
      sortOrder: true,
      trialDays: true,
      updatedAt: true,
    },
  });
  if (plans.length === 0) return [];
  const planIds = plans.map((plan) => plan.id);
  const [prices, live, bought] = await Promise.all([
    // PlanPrice(planId, isActive, currency) index.
    db.planPrice.findMany({
      where: { planId: { in: planIds }, isActive: true },
      orderBy: [{ sortOrder: "asc" }, { currency: "asc" }, { amountMinor: "asc" }],
      select: PRICE_SUMMARY_SELECT,
    }),
    // Subscription(planId, status) index.
    db.subscription.groupBy({
      by: ["planId"],
      where: { planId: { in: planIds }, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } },
      _count: { _all: true },
    }),
    // EntitlementGrant(planId) index.
    db.entitlementGrant.groupBy({ by: ["planId"], where: livePurchaseWhere({ in: planIds }, now), _count: { _all: true } }),
  ]);
  const liveByPlan = new Map(live.map((row) => [row.planId, row._count._all]));
  const boughtByPlan = new Map(bought.map((row) => [row.planId, row._count._all]));
  return plans.map((plan) => {
    const own = prices.filter((price) => price.planId === plan.id);
    return {
      ...plan,
      currentPrices: own.filter((price) => priceState(price, now) === "current").map(priceSummary),
      scheduledPrices: own.filter((price) => priceState(price, now) === "scheduled").length,
      liveSubscriptions: liveByPlan.get(plan.id) ?? 0,
      livePurchases: boughtByPlan.get(plan.id) ?? 0,
    };
  });
}

export interface AdminPriceRow extends AdminPriceSummary {
  isActive: boolean;
  validFrom: Date;
  validTo: Date | null;
  minSeats: number | null;
  sortOrder: number;
  isDemo: boolean;
  createdAt: Date;
  state: PriceState;
  countryName: string | null;
  /** Payments and subscriptions that point at this exact price (history is exact; never edit it). */
  paymentCount: number;
  subscriptionCount: number;
  /** Off sale but its window has not ended: it can be put back on sale. */
  canReactivate: boolean;
}

export interface AdminPlanDetail {
  plan: {
    id: string;
    code: string;
    name: string;
    tagline: string | null;
    description: string | null;
    highlights: string[];
    audience: PlanAudience;
    isPublic: boolean;
    isActive: boolean;
    isDefault: boolean;
    isDemo: boolean;
    sortOrder: number;
    trialDays: number;
    createdAt: Date;
    updatedAt: Date;
  };
  /** Parsed entitlements (fail-closed per key) and any problems in the stored document. */
  entitlements: Entitlements;
  entitlementIssues: string[];
  prices: AdminPriceRow[];
  liveSubscriptions: number;
  /** Students holding the plan through a live one-off purchase. */
  livePurchases: number;
  countries: { id: string; name: string }[];
  audit: AuditTrailEntry[];
}

/** Live one-off purchases of a plan (owner decision 2026-10-07: "Full access" is a grant, not a subscription). */
function livePurchaseWhere(planId: string | { in: string[] }, now: Date): Prisma.EntitlementGrantWhereInput {
  return { planId, source: "PURCHASE", revokedAt: null, startsAt: { lte: now }, OR: [{ endsAt: null }, { endsAt: { gt: now } }] };
}

/** One plan with its full price history (newest first), entitlements and audit trail. */
export async function getPlanForAdmin(actor: CmsActor, planId: string, now: Date = new Date()): Promise<AdminPlanDetail> {
  assertCmsPermission(actor, "billing.manage");
  const plan = await db.plan.findUnique({
    where: { id: parseInput(planIdSchema, planId) },
    select: {
      id: true,
      code: true,
      name: true,
      tagline: true,
      description: true,
      highlights: true,
      audience: true,
      isPublic: true,
      isActive: true,
      isDefault: true,
      isDemo: true,
      sortOrder: true,
      trialDays: true,
      createdAt: true,
      updatedAt: true,
      entitlements: true,
    },
  });
  if (!plan) throw AppError.notFound("Plan not found.");
  const [prices, live, livePurchases, countries] = await Promise.all([
    db.planPrice.findMany({
      where: { planId: plan.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 200,
      select: { ...PRICE_SUMMARY_SELECT, minSeats: true, isDemo: true, createdAt: true, country: { select: { name: true } } },
    }),
    db.subscription.count({ where: { planId: plan.id, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } } }),
    db.entitlementGrant.count({ where: livePurchaseWhere(plan.id, now) }),
    db.country.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }], take: 300, select: { id: true, name: true } }),
  ]);
  const priceIds = prices.map((price) => price.id);
  const [paymentCounts, subscriptionCounts, auditRows] = await Promise.all([
    priceIds.length === 0
      ? []
      : db.payment.groupBy({ by: ["planPriceId"], where: { planPriceId: { in: priceIds } }, _count: { _all: true } }),
    priceIds.length === 0
      ? []
      : db.subscription.groupBy({ by: ["planPriceId"], where: { planPriceId: { in: priceIds } }, _count: { _all: true } }),
    // AuditLog(entityType, entityId, createdAt) index.
    db.auditLog.findMany({
      where: {
        OR: [
          { entityType: "Plan", entityId: plan.id },
          ...(priceIds.length > 0 ? [{ entityType: "PlanPrice", entityId: { in: priceIds } }] : []),
        ],
      },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: AUDIT_TRAIL_SELECT,
    }),
  ]);
  const payments = new Map(paymentCounts.map((row) => [row.planPriceId, row._count._all]));
  const subscriptions = new Map(subscriptionCounts.map((row) => [row.planPriceId, row._count._all]));
  const { entitlements: rawEntitlements, ...planFields } = plan;
  const normalized = normalizeEntitlementDocument(rawEntitlements);
  return {
    plan: planFields,
    entitlements: normalized.entitlements,
    entitlementIssues: normalized.issues,
    prices: prices.map((price) => ({
      ...priceSummary(price),
      isActive: price.isActive,
      validFrom: price.validFrom,
      validTo: price.validTo,
      minSeats: price.minSeats,
      sortOrder: price.sortOrder,
      isDemo: price.isDemo,
      createdAt: price.createdAt,
      state: priceState(price, now),
      countryName: price.country?.name ?? null,
      paymentCount: payments.get(price.id) ?? 0,
      subscriptionCount: subscriptions.get(price.id) ?? 0,
      canReactivate: !price.isActive && (price.validTo === null || price.validTo.getTime() > now.getTime()),
    })),
    liveSubscriptions: live,
    livePurchases,
    countries,
    audit: auditRows.map(toAuditTrailEntry),
  };
}

/** Plans for pickers (promo-code restrictions, free-day grants): id, code, name, audience, active. */
export async function listPlanOptions(actor: CmsActor): Promise<{ id: string; code: string; name: string; audience: PlanAudience; isActive: boolean }[]> {
  assertCmsPermission(actor, "billing.manage");
  return db.plan.findMany({
    orderBy: [{ sortOrder: "asc" }, { code: "asc" }],
    take: MAX_ADMIN_PLANS,
    select: { id: true, code: true, name: true, audience: true, isActive: true },
  });
}

// ---------------------------------------------------------------------------------------------------------------------
// Plan edits
// ---------------------------------------------------------------------------------------------------------------------

type DetailField = "name" | "tagline" | "description" | "highlights" | "isPublic" | "isActive" | "sortOrder" | "trialDays";

/**
 * Edits a plan's buyer-facing details. The default (free fallback) plan must stay active (Plan_default_chk).
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT (stale form)
 */
export async function updatePlanDetails(
  actor: CmsActor,
  input: UpdatePlanDetailsInput,
  request: AuditRequestInfo | null = null,
): Promise<{ changed: DetailField[]; updatedAt: Date }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(updatePlanDetailsSchema, input);
  const next = {
    name: data.name,
    tagline: data.tagline ?? null,
    description: data.description ?? null,
    highlights: data.highlights,
    isPublic: data.isPublic,
    isActive: data.isActive,
    sortOrder: data.sortOrder,
    trialDays: data.trialDays,
  };
  const result = await db.$transaction(async (tx) => {
    const plan = await tx.plan.findUnique({
      where: { id: data.planId },
      select: { id: true, code: true, isDefault: true, updatedAt: true, name: true, tagline: true, description: true, highlights: true, isPublic: true, isActive: true, sortOrder: true, trialDays: true },
    });
    if (!plan) throw AppError.notFound("Plan not found.");
    if (!sameInstant(plan.updatedAt, data.expectedUpdatedAt)) throw staleFormError("plan");
    if (plan.isDefault && !next.isActive) {
      throw AppError.validation({ isActive: ["The default (free) plan must stay active: it is what every user falls back to."] });
    }
    const changed = (Object.keys(next) as DetailField[]).filter((field) => JSON.stringify(plan[field]) !== JSON.stringify(next[field]));
    if (changed.length === 0) return { changed, updatedAt: plan.updatedAt };
    const updated = await tx.plan.updateMany({ where: { id: plan.id, updatedAt: plan.updatedAt }, data: next });
    if (updated.count !== 1) throw staleFormError("plan");
    const after = await tx.plan.findUniqueOrThrow({ where: { id: plan.id }, select: { updatedAt: true } });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.PLAN_UPDATE,
      entityType: "Plan",
      entityId: plan.id,
      before: Object.fromEntries(changed.map((field) => [field, plan[field]])),
      after: Object.fromEntries(changed.map((field) => [field, next[field]])),
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.planUpdate, planCode: plan.code, changed },
      request,
    });
    return { changed, updatedAt: after.updatedAt };
  });
  if (result.changed.length > 0) invalidatePlanCache();
  return result;
}

/**
 * Replaces a plan's entitlements document with a validated, complete flat document (§31 plan features / limits are
 * data; §40 admin-configurable quotas). Changes apply to every holder of the plan: entitlement caches are dropped on
 * this instance and expire within 60 s elsewhere.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT (stale form)
 */
export async function updatePlanEntitlements(
  actor: CmsActor,
  input: UpdatePlanEntitlementsInput,
  request: AuditRequestInfo | null = null,
): Promise<{ changed: string[]; updatedAt: Date }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(updatePlanEntitlementsSchema, input);
  const next: Entitlements = data.entitlements;
  const result = await db.$transaction(async (tx) => {
    const plan = await tx.plan.findUnique({ where: { id: data.planId }, select: { id: true, code: true, entitlements: true, updatedAt: true } });
    if (!plan) throw AppError.notFound("Plan not found.");
    if (!sameInstant(plan.updatedAt, data.expectedUpdatedAt)) throw staleFormError("plan");
    const before = normalizeEntitlementDocument(plan.entitlements);
    const changed = changedEntitlementKeys(before.entitlements, next);
    // A legacy/nested document with problems is rewritten in the flat contract shape even when nothing changed.
    const storedIsFlat = JSON.stringify(plan.entitlements) === JSON.stringify(next);
    if (changed.length === 0 && storedIsFlat) return { changed: [] as string[], updatedAt: plan.updatedAt };
    const updated = await tx.plan.updateMany({
      where: { id: plan.id, updatedAt: plan.updatedAt },
      data: { entitlements: next as unknown as Prisma.InputJsonObject },
    });
    if (updated.count !== 1) throw staleFormError("plan");
    const after = await tx.plan.findUniqueOrThrow({ where: { id: plan.id }, select: { updatedAt: true } });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.PLAN_UPDATE,
      entityType: "Plan",
      entityId: plan.id,
      before: Object.fromEntries(changed.map((key) => [key, before.entitlements[key]])),
      after: Object.fromEntries(changed.map((key) => [key, next[key]])),
      metadata: {
        operation: COMMERCE_AUDIT_OPERATIONS.planEntitlementsUpdate,
        planCode: plan.code,
        changed,
        ...(before.issues.length > 0 ? { repairedIssues: before.issues.slice(0, 10) } : {}),
      },
      request,
    });
    return { changed: changed as string[], updatedAt: after.updatedAt };
  });
  invalidatePlanCache();
  invalidateEntitlements();
  return result;
}

// ---------------------------------------------------------------------------------------------------------------------
// Prices
// ---------------------------------------------------------------------------------------------------------------------

function termsLabel(price: { amountMinor: number; currency: string; label: string | null }): string {
  return price.label ? `"${price.label}"` : `${price.currency} ${(price.amountMinor / 100).toFixed(2)}`;
}

/**
 * Adds a price row to a plan (§31). With `replacesPriceId`, the old price is deactivated now (new price starts now)
 * or ends exactly when the new one starts (scheduled change). Refuses a second price with identical terms in an
 * overlapping window, per-seat prices on individual plans and back-dated starts.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT
 */
export async function createPlanPrice(
  actor: CmsActor,
  input: CreatePlanPriceInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; replacedPriceId: string | null }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(createPlanPriceSchema, input);
  const validFrom = data.validFrom ?? now;
  if (validFrom.getTime() < now.getTime() - PAST_START_TOLERANCE_MS) {
    throw AppError.validation({ validFrom: ["Prices cannot start in the past. Leave it empty to start now."] });
  }
  if (data.validTo && data.validTo.getTime() <= Math.max(validFrom.getTime(), now.getTime())) {
    throw AppError.validation({ validTo: ["The end must be in the future and after the start."] });
  }
  const terms: PriceTerms = {
    currency: data.currency,
    interval: data.interval,
    intervalCount: data.intervalCount,
    periodDays: data.periodDays ?? null,
    perSeat: data.perSeat,
    countryId: data.countryId ?? null,
  };

  const result = await db.$transaction(async (tx) => {
    // Serialise price changes per plan (two admins adding the same terms at once).
    await tx.$queryRaw`SELECT "id" FROM "Plan" WHERE "id" = ${data.planId}::uuid FOR UPDATE`;
    const plan = await tx.plan.findUnique({ where: { id: data.planId }, select: { id: true, code: true, audience: true } });
    if (!plan) throw AppError.notFound("Plan not found.");
    if (data.perSeat && plan.audience !== "SCHOOL") {
      throw AppError.validation({ perSeat: ["Per-seat pricing is only for school plans."] });
    }
    if (data.countryId) {
      const country = await tx.country.findUnique({ where: { id: data.countryId }, select: { id: true } });
      if (!country) throw AppError.validation({ countryId: ["Choose a country from the list."] });
    }

    let replaced: { id: string; validFrom: Date; validTo: Date | null; isActive: boolean } | null = null;
    if (data.replacesPriceId) {
      replaced = await tx.planPrice.findFirst({
        where: { id: data.replacesPriceId, planId: plan.id },
        select: { id: true, validFrom: true, validTo: true, isActive: true },
      });
      if (!replaced || priceState(replaced, now) === "inactive" || priceState(replaced, now) === "ended") {
        throw AppError.validation({ replacesPriceId: ["Choose a price of this plan that is still on sale or scheduled."] });
      }
      if (validFrom.getTime() > now.getTime() && validFrom.getTime() <= replaced.validFrom.getTime()) {
        throw AppError.validation({ validFrom: ["A scheduled replacement must start after the price it replaces starts."] });
      }
    }

    // PlanPrice(planId, isActive, currency) index.
    const competing = await tx.planPrice.findMany({
      where: { planId: plan.id, isActive: true, currency: terms.currency, ...(replaced ? { id: { not: replaced.id } } : {}) },
      select: { id: true, currency: true, interval: true, intervalCount: true, periodDays: true, perSeat: true, countryId: true, validFrom: true, validTo: true, amountMinor: true, label: true },
    });
    const clash = competing.find(
      (other) => sameTerms(other, terms) && priceState({ ...other, isActive: true }, now) !== "ended" && windowsOverlap(other.validFrom, other.validTo, validFrom, data.validTo ?? null),
    );
    if (clash) {
      throw AppError.validation({
        replacesPriceId: [`Price ${termsLabel(clash)} has the same terms and overlaps. Choose it under "Replaces", or deactivate it first.`],
      });
    }

    const created = await tx.planPrice.create({
      data: {
        planId: plan.id,
        currency: terms.currency,
        amountMinor: data.amount,
        interval: terms.interval,
        intervalCount: terms.intervalCount,
        periodDays: terms.periodDays,
        perSeat: terms.perSeat,
        minSeats: data.minSeats ?? null,
        label: data.label ?? null,
        countryId: terms.countryId,
        validFrom,
        validTo: data.validTo ?? null,
        sortOrder: data.sortOrder,
      },
      select: { id: true },
    });

    const audit = auditActorFields(infraActor(actor));
    if (replaced) {
      const startsNow = validFrom.getTime() <= now.getTime();
      // A scheduled replacement ends the old price when the new one starts (never extends an earlier end).
      const patch = startsNow
        ? { isActive: false }
        : replaced.validTo === null || replaced.validTo.getTime() > validFrom.getTime()
          ? { validTo: validFrom }
          : null;
      if (patch) {
        await tx.planPrice.update({ where: { id: replaced.id }, data: patch });
        await auditInTx(tx, {
          ...audit,
          action: COMMERCE_AUDIT.PRICE_UPDATE,
          entityType: "PlanPrice",
          entityId: replaced.id,
          before: { isActive: replaced.isActive, validTo: replaced.validTo?.toISOString() ?? null },
          after: "isActive" in patch ? { isActive: false } : { validTo: validFrom.toISOString() },
          metadata: { operation: COMMERCE_AUDIT_OPERATIONS.priceReplaced, planId: plan.id, planCode: plan.code, replacedById: created.id },
          request,
        });
      }
    }
    await auditInTx(tx, {
      ...audit,
      action: COMMERCE_AUDIT.PRICE_CREATE,
      entityType: "PlanPrice",
      entityId: created.id,
      after: {
        currency: terms.currency,
        amountMinor: data.amount,
        interval: terms.interval,
        intervalCount: terms.intervalCount,
        periodDays: terms.periodDays,
        perSeat: terms.perSeat,
        minSeats: data.minSeats ?? null,
        countryId: terms.countryId,
        validFrom: validFrom.toISOString(),
        validTo: data.validTo?.toISOString() ?? null,
        label: data.label ?? null,
      },
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.priceCreate, planId: plan.id, planCode: plan.code, replacesPriceId: replaced?.id ?? null },
      request,
    });
    return { id: created.id, replacedPriceId: replaced?.id ?? null };
  });
  invalidatePlanCache();
  return result;
}

/**
 * Puts an existing plan price on or off sale (`isActive` is one of the few columns the immutability trigger allows to
 * change). Re-activation is refused for prices whose window has ended or when another current price has the same
 * terms. Prices of study packs are managed from the study pack.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | CONFLICT
 */
export async function setPlanPriceActive(
  actor: CmsActor,
  input: SetPlanPriceActiveInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ changed: boolean; isActive: boolean }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(setPlanPriceActiveSchema, input);
  const result = await db.$transaction(async (tx) => {
    const price = await tx.planPrice.findUnique({
      where: { id: data.priceId },
      select: { id: true, planId: true, isActive: true, validFrom: true, validTo: true, currency: true, interval: true, intervalCount: true, periodDays: true, perSeat: true, countryId: true, plan: { select: { code: true } } },
    });
    if (!price || price.planId === null) throw AppError.notFound("Price not found.");
    await tx.$queryRaw`SELECT "id" FROM "Plan" WHERE "id" = ${price.planId}::uuid FOR UPDATE`;
    if (price.isActive === data.active) return { changed: false, isActive: price.isActive };
    if (data.active) {
      if (price.validTo !== null && price.validTo.getTime() <= now.getTime()) {
        throw AppError.conflict("This price's sale window has ended. Add a new price instead.");
      }
      const others = await tx.planPrice.findMany({
        where: { planId: price.planId, isActive: true, currency: price.currency, id: { not: price.id } },
        select: { currency: true, interval: true, intervalCount: true, periodDays: true, perSeat: true, countryId: true, validFrom: true, validTo: true, amountMinor: true, label: true },
      });
      const clash = others.find((other) => sameTerms(other, price) && windowsOverlap(other.validFrom, other.validTo, price.validFrom, price.validTo));
      if (clash) throw AppError.conflict(`Price ${termsLabel(clash)} with the same terms is already on sale. Deactivate it first.`);
    }
    await tx.planPrice.update({ where: { id: price.id }, data: { isActive: data.active } });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.PRICE_UPDATE,
      entityType: "PlanPrice",
      entityId: price.id,
      before: { isActive: price.isActive },
      after: { isActive: data.active },
      metadata: {
        operation: data.active ? COMMERCE_AUDIT_OPERATIONS.priceActivate : COMMERCE_AUDIT_OPERATIONS.priceDeactivate,
        planId: price.planId,
        planCode: price.plan?.code ?? null,
      },
      reason: data.reason ?? null,
      request,
    });
    return { changed: true, isActive: data.active };
  });
  if (result.changed) invalidatePlanCache();
  return result;
}

/** Days a price's period lasts, for display ("TERM 120 days"); `null` when it follows calendar months. Pure. */
export function priceDays(price: { periodDays: number | null; intervalCount: number }): number | null {
  return price.periodDays === null ? null : price.periodDays * price.intervalCount;
}
