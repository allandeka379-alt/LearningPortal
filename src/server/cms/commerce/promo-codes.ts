import "server-only";
import { z } from "zod";
import type { PlanAudience, Prisma, PromoDiscountType, PromoRedemptionStatus } from "@/generated/prisma/client";
import { db } from "@/server/db";
import { auditActorFields, auditInTx, type AuditRequestInfo } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "../users/cursor";
import {
  checkPromoValue,
  createPromoCodeSchema,
  deletePromoCodeSchema,
  listPromoCodesSchema,
  updatePromoCodeSchema,
  type CreatePromoCodeInput,
  type ListPromoCodesInput,
  type PromoState,
  type PromoValueFields,
  type UpdatePromoCodeInput,
} from "./schemas";
import {
  AUDIT_TRAIL_SELECT,
  COMMERCE_AUDIT,
  COMMERCE_AUDIT_OPERATIONS,
  isUniqueViolation,
  parseInput,
  sameInstant,
  staleFormError,
  toAuditTrailEntry,
  type AuditTrailEntry,
} from "./shared";

/**
 * Promo codes (§31 admin-configurable, ARCHITECTURE §7.6; §5.2 `billing.manage`). CRUD within the database CHECKs:
 * upper-case code format, PERCENT 1-99 (a 100% discount is FREE_DAYS: a Payment is never zero), FIXED_AMOUNT with a
 * currency, FREE_DAYS with the plan it grants, redemption cap >= redemptions so far, valid window.
 *
 * Once a code has been used (any redemption or payment), the discount itself (code, type, value, currency, free days,
 * granted plan) is frozen so receipts and reports keep meaning what they meant; the rules (window, cap, audience,
 * plans, active flag, description) stay editable. Unused codes can be deleted; used ones can only be deactivated.
 * Every change is audited in the same transaction.
 */

/** Discount-defining columns, frozen once a code has been used. */
export const PROMO_LOCKED_FIELDS = ["code", "discountType", "percentOff", "amountOff", "currency", "freeDays", "grantPlanId"] as const;
type LockedField = (typeof PROMO_LOCKED_FIELDS)[number];

/** State of a code at `now` (pure; "used up" is shown separately from the cap). */
export function promoState(code: { isActive: boolean; validFrom: Date; validTo: Date | null }, now: Date): PromoState {
  if (!code.isActive) return "inactive";
  if (code.validFrom.getTime() > now.getTime()) return "scheduled";
  if (code.validTo !== null && code.validTo.getTime() <= now.getTime()) return "expired";
  return "active";
}

export interface PromoCodeListItem {
  id: string;
  code: string;
  description: string | null;
  discountType: PromoDiscountType;
  percentOff: number | null;
  amountOffMinor: number | null;
  currency: string | null;
  freeDays: number | null;
  grantPlanCode: string | null;
  audience: PlanAudience | null;
  maxRedemptions: number | null;
  redeemedCount: number;
  validFrom: Date;
  validTo: Date | null;
  isActive: boolean;
  isDemo: boolean;
  state: PromoState;
  usedUp: boolean;
  planCount: number;
  createdAt: Date;
}

const LIST_SELECT = {
  id: true,
  code: true,
  description: true,
  discountType: true,
  percentOff: true,
  amountOffMinor: true,
  currency: true,
  freeDays: true,
  audience: true,
  maxRedemptions: true,
  redeemedCount: true,
  validFrom: true,
  validTo: true,
  isActive: true,
  isDemo: true,
  createdAt: true,
  grantPlan: { select: { code: true } },
  _count: { select: { plans: true } },
} as const satisfies Prisma.PromoCodeSelect;

function toListItem(row: Prisma.PromoCodeGetPayload<{ select: typeof LIST_SELECT }>, now: Date): PromoCodeListItem {
  const { grantPlan, _count, ...rest } = row;
  return {
    ...rest,
    grantPlanCode: grantPlan?.code ?? null,
    planCount: _count.plans,
    state: promoState(row, now),
    usedUp: row.maxRedemptions !== null && row.redeemedCount >= row.maxRedemptions,
  };
}

function stateWhere(state: PromoState, now: Date): Prisma.PromoCodeWhereInput {
  switch (state) {
    case "inactive":
      return { isActive: false };
    case "scheduled":
      return { isActive: true, validFrom: { gt: now } };
    case "expired":
      return { isActive: true, validTo: { lte: now } };
    case "active":
      return { isActive: true, validFrom: { lte: now }, OR: [{ validTo: null }, { validTo: { gt: now } }] };
  }
}

/** Newest first; search by code or description; filter by state and discount type. */
export async function listPromoCodes(
  actor: CmsActor,
  input: ListPromoCodesInput = {},
  now: Date = new Date(),
): Promise<{ items: PromoCodeListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(listPromoCodesSchema, input);
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.PromoCodeWhereInput[] = [];
  if (data.state) where.push(stateWhere(data.state, now));
  if (data.type) where.push({ discountType: data.type });
  if (data.q) {
    where.push({ OR: [{ code: { contains: data.q.toUpperCase() } }, { description: { contains: data.q, mode: "insensitive" } }] });
  }
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.PromoCodeWhereInput);
  const rows = await db.promoCode.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: LIST_SELECT,
  });
  const page = pageOf(rows, limit);
  return { items: page.items.map((row) => toListItem(row, now)), nextCursor: page.nextCursor };
}

export interface PromoRedemptionRow {
  id: string;
  userId: string;
  status: PromoRedemptionStatus;
  discountMinor: number | null;
  currency: string | null;
  paymentId: string | null;
  grantId: string | null;
  appliedAt: Date | null;
  createdAt: Date;
}

export interface PromoCodeDetail extends PromoCodeListItem {
  grantPlanId: string | null;
  appliesToStudyPacks: boolean;
  newCustomersOnly: boolean;
  createdBy: string | null;
  updatedAt: Date;
  plans: { id: string; code: string; name: string }[];
  redemptionCounts: Record<PromoRedemptionStatus, number>;
  paymentCount: number;
  /** The discount is frozen (used at least once); deletion is refused. */
  used: boolean;
  recentRedemptions: PromoRedemptionRow[];
  audit: AuditTrailEntry[];
}

/** One promo code with its plans, redemption counts, recent redemptions (user ids only) and audit trail. */
export async function getPromoCode(actor: CmsActor, promoCodeId: string, now: Date = new Date()): Promise<PromoCodeDetail> {
  assertCmsPermission(actor, "billing.manage");
  const id = parseInput(z.uuid({ error: "Invalid id." }), promoCodeId);
  const row = await db.promoCode.findUnique({
    where: { id },
    select: {
      ...LIST_SELECT,
      grantPlanId: true,
      appliesToStudyPacks: true,
      newCustomersOnly: true,
      updatedAt: true,
      createdBy: { select: { profile: { select: { displayName: true, firstName: true, lastName: true, username: true } } } },
      plans: { select: { plan: { select: { id: true, code: true, name: true } } }, orderBy: { createdAt: "asc" } },
    },
  });
  if (!row) throw AppError.notFound("Promo code not found.");
  const [counts, paymentCount, redemptions, auditRows] = await Promise.all([
    // PromoRedemption(promoCodeId, userId) unique index (leading promoCodeId).
    db.promoRedemption.groupBy({ by: ["status"], where: { promoCodeId: row.id }, _count: { _all: true } }),
    db.payment.count({ where: { promoCodeId: row.id } }),
    db.promoRedemption.findMany({
      where: { promoCodeId: row.id },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: 25,
      select: { id: true, userId: true, status: true, discountMinor: true, currency: true, paymentId: true, grantId: true, appliedAt: true, createdAt: true },
    }),
    db.auditLog.findMany({ where: { entityType: "PromoCode", entityId: row.id }, orderBy: { createdAt: "desc" }, take: 30, select: AUDIT_TRAIL_SELECT }),
  ]);
  const redemptionCounts: Record<PromoRedemptionStatus, number> = { RESERVED: 0, APPLIED: 0, RELEASED: 0 };
  for (const count of counts) redemptionCounts[count.status] = count._count._all;
  const totalRedemptions = redemptionCounts.RESERVED + redemptionCounts.APPLIED + redemptionCounts.RELEASED;
  const profile = row.createdBy?.profile;
  return {
    ...toListItem(row, now),
    grantPlanId: row.grantPlanId,
    appliesToStudyPacks: row.appliesToStudyPacks,
    newCustomersOnly: row.newCustomersOnly,
    createdBy: profile ? profile.displayName || [profile.firstName, profile.lastName].filter(Boolean).join(" ") || profile.username || null : null,
    updatedAt: row.updatedAt,
    plans: row.plans.map((link) => link.plan),
    redemptionCounts,
    paymentCount,
    used: row.redeemedCount > 0 || totalRedemptions > 0 || paymentCount > 0,
    recentRedemptions: redemptions,
    audit: auditRows.map(toAuditTrailEntry),
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------------------------------------------------

interface PromoColumns {
  code: string;
  discountType: PromoDiscountType;
  percentOff: number | null;
  amountOffMinor: number | null;
  currency: string | null;
  freeDays: number | null;
  grantPlanId: string | null;
  description: string | null;
  audience: PlanAudience | null;
  appliesToStudyPacks: boolean;
  newCustomersOnly: boolean;
  maxRedemptions: number | null;
  validFrom: Date;
  validTo: Date | null;
  isActive: boolean;
}

/** Keeps only the value columns that belong to the discount type (the CHECK refuses the others). Pure. */
export function promoValueColumns(fields: PromoValueFields & { code: string }): Pick<
  PromoColumns,
  "code" | "discountType" | "percentOff" | "amountOffMinor" | "currency" | "freeDays" | "grantPlanId"
> {
  return {
    code: fields.code,
    discountType: fields.discountType,
    percentOff: fields.discountType === "PERCENT" ? (fields.percentOff ?? null) : null,
    amountOffMinor: fields.discountType === "FIXED_AMOUNT" ? (fields.amountOff ?? null) : null,
    currency: fields.discountType === "FIXED_AMOUNT" ? (fields.currency ?? null) : null,
    freeDays: fields.discountType === "FREE_DAYS" ? (fields.freeDays ?? null) : null,
    grantPlanId: fields.discountType === "FREE_DAYS" ? (fields.grantPlanId ?? null) : null,
  };
}

async function checkPlans(
  tx: Prisma.TransactionClient,
  columns: Pick<PromoColumns, "grantPlanId" | "audience">,
  planIds: readonly string[],
): Promise<void> {
  if (columns.grantPlanId) {
    const plan = await tx.plan.findUnique({ where: { id: columns.grantPlanId }, select: { audience: true } });
    if (!plan) throw AppError.validation({ grantPlanId: ["Choose a plan from the list."] });
    if (plan.audience !== "INDIVIDUAL") throw AppError.validation({ grantPlanId: ["Free days can only unlock an individual plan."] });
  }
  if (planIds.length > 0) {
    const plans = await tx.plan.findMany({ where: { id: { in: [...planIds] } }, select: { id: true, audience: true } });
    if (plans.length !== new Set(planIds).size) throw AppError.validation({ planIds: ["Choose plans from the list."] });
    if (columns.audience && plans.some((plan) => plan.audience !== columns.audience)) {
      throw AppError.validation({ planIds: ["The chosen plans must match the code's audience."] });
    }
  }
}

function duplicateCode(error: unknown): never {
  if (isUniqueViolation(error)) throw AppError.validation({ code: ["That code is already in use. Choose another one."] });
  throw error;
}

function auditColumns(columns: Partial<PromoColumns>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(columns).map(([key, value]) => [key, value instanceof Date ? value.toISOString() : value]),
  );
}

/**
 * Creates a promo code.
 *
 * @throws AppError FORBIDDEN | VALIDATION (fields, duplicate code)
 */
export async function createPromoCode(
  actor: CmsActor,
  input: CreatePromoCodeInput,
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ id: string; code: string }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(createPromoCodeSchema, input);
  const columns: PromoColumns = {
    ...promoValueColumns(data),
    description: data.description ?? null,
    audience: data.audience ?? null,
    appliesToStudyPacks: data.appliesToStudyPacks,
    newCustomersOnly: data.newCustomersOnly,
    maxRedemptions: data.maxRedemptions ?? null,
    validFrom: data.validFrom ?? now,
    validTo: data.validTo ?? null,
    isActive: data.isActive,
  };
  if (columns.validTo !== null && columns.validTo.getTime() <= columns.validFrom.getTime()) {
    throw AppError.validation({ validTo: ["The end must be after the start."] });
  }
  return db
    .$transaction(async (tx) => {
      await checkPlans(tx, columns, data.planIds);
      const created = await tx.promoCode.create({
        data: {
          ...columns,
          createdById: actor.userId,
          ...(data.planIds.length > 0 ? { plans: { create: [...new Set(data.planIds)].map((planId) => ({ planId })) } } : {}),
        },
        select: { id: true, code: true },
      });
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: COMMERCE_AUDIT.PROMO_CREATE,
        entityType: "PromoCode",
        entityId: created.id,
        after: { ...auditColumns(columns), planIds: data.planIds },
        metadata: { operation: COMMERCE_AUDIT_OPERATIONS.promoCreate, code: created.code },
        request,
      });
      return created;
    })
    .catch(duplicateCode);
}

const mergedValueSchema = z
  .object({
    discountType: z.string(),
    percentOff: z.number().optional(),
    amountOff: z.number().optional(),
    currency: z.string().optional(),
    freeDays: z.number().optional(),
    grantPlanId: z.string().optional(),
    audience: z.string().optional(),
    validFrom: z.date().optional(),
    validTo: z.date().optional(),
  })
  .superRefine((value, ctx) => checkPromoValue(value as PromoValueFields, ctx));

/**
 * Edits a promo code. Value fields that are absent keep their stored value; for a USED code any change to them is
 * refused. Rule fields are always replaced (blank = none: no end date, no cap, any audience). `maxRedemptions` can
 * never go below the redemptions already applied.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT (stale form)
 */
export async function updatePromoCode(
  actor: CmsActor,
  input: UpdatePromoCodeInput,
  request: AuditRequestInfo | null = null,
): Promise<{ changed: string[] }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(updatePromoCodeSchema, input);
  return db
    .$transaction(async (tx) => {
      await tx.$queryRaw`SELECT "id" FROM "PromoCode" WHERE "id" = ${data.promoCodeId}::uuid FOR UPDATE`;
      const existing = await tx.promoCode.findUnique({
        where: { id: data.promoCodeId },
        select: {
          id: true,
          code: true,
          discountType: true,
          percentOff: true,
          amountOffMinor: true,
          currency: true,
          freeDays: true,
          grantPlanId: true,
          description: true,
          audience: true,
          appliesToStudyPacks: true,
          newCustomersOnly: true,
          maxRedemptions: true,
          redeemedCount: true,
          validFrom: true,
          validTo: true,
          isActive: true,
          updatedAt: true,
          plans: { select: { planId: true } },
          _count: { select: { redemptions: true, payments: true } },
        },
      });
      if (!existing) throw AppError.notFound("Promo code not found.");
      if (!sameInstant(existing.updatedAt, data.expectedUpdatedAt)) throw staleFormError("promo code");
      const used = existing.redeemedCount > 0 || existing._count.redemptions > 0 || existing._count.payments > 0;

      const merged = {
        code: data.code ?? existing.code,
        discountType: data.discountType ?? existing.discountType,
        percentOff: data.percentOff ?? (data.discountType === undefined ? (existing.percentOff ?? undefined) : undefined),
        amountOff: data.amountOff ?? (data.discountType === undefined ? (existing.amountOffMinor ?? undefined) : undefined),
        currency: data.currency ?? (data.discountType === undefined ? (existing.currency ?? undefined) : undefined),
        freeDays: data.freeDays ?? (data.discountType === undefined ? (existing.freeDays ?? undefined) : undefined),
        grantPlanId: data.grantPlanId ?? (data.discountType === undefined ? (existing.grantPlanId ?? undefined) : undefined),
      };
      const validFrom = data.validFrom ?? existing.validFrom;
      const validTo = data.validTo ?? null;
      const check = mergedValueSchema.safeParse({ ...merged, audience: data.audience, validFrom, validTo: validTo ?? undefined });
      if (!check.success) throw AppError.fromZod(check.error);

      const value = promoValueColumns(merged);
      const before = {
        code: existing.code,
        discountType: existing.discountType,
        percentOff: existing.percentOff,
        amountOffMinor: existing.amountOffMinor,
        currency: existing.currency,
        freeDays: existing.freeDays,
        grantPlanId: existing.grantPlanId,
      };
      if (used) {
        const lockedChanges = (Object.keys(value) as (keyof typeof value)[]).filter((key) => value[key] !== before[key]);
        if (lockedChanges.length > 0) {
          const fieldErrors: Record<string, string[]> = {};
          for (const key of lockedChanges) {
            const field: LockedField = key === "amountOffMinor" ? "amountOff" : key;
            fieldErrors[field] = ["This code has been used, so its discount can no longer change. Create a new code instead."];
          }
          throw AppError.validation(fieldErrors);
        }
      }
      if (data.maxRedemptions !== undefined && data.maxRedemptions < existing.redeemedCount) {
        throw AppError.validation({ maxRedemptions: [`It has already been redeemed ${existing.redeemedCount} times; the cap cannot be lower.`] });
      }

      const columns: PromoColumns = {
        ...value,
        description: data.description ?? null,
        audience: data.audience ?? null,
        appliesToStudyPacks: data.appliesToStudyPacks,
        newCustomersOnly: data.newCustomersOnly,
        maxRedemptions: data.maxRedemptions ?? null,
        validFrom,
        validTo,
        isActive: data.isActive,
      };
      await checkPlans(tx, columns, data.planIds);
      const current: PromoColumns = { ...before, description: existing.description, audience: existing.audience, appliesToStudyPacks: existing.appliesToStudyPacks, newCustomersOnly: existing.newCustomersOnly, maxRedemptions: existing.maxRedemptions, validFrom: existing.validFrom, validTo: existing.validTo, isActive: existing.isActive };
      const changed = (Object.keys(columns) as (keyof PromoColumns)[]).filter(
        (key) => JSON.stringify(columns[key]) !== JSON.stringify(current[key]),
      ) as string[];
      const currentPlans = existing.plans.map((link) => link.planId).sort();
      const nextPlans = [...new Set(data.planIds)].sort();
      const plansChanged = JSON.stringify(currentPlans) !== JSON.stringify(nextPlans);
      if (plansChanged) changed.push("planIds");
      if (changed.length === 0) return { changed };

      const updated = await tx.promoCode.updateMany({ where: { id: existing.id, updatedAt: existing.updatedAt }, data: columns });
      if (updated.count !== 1) throw staleFormError("promo code");
      if (plansChanged) {
        await tx.promoCodePlan.deleteMany({ where: { promoCodeId: existing.id, planId: { notIn: nextPlans } } });
        const keep = new Set(currentPlans);
        const add = nextPlans.filter((planId) => !keep.has(planId));
        if (add.length > 0) await tx.promoCodePlan.createMany({ data: add.map((planId) => ({ promoCodeId: existing.id, planId })) });
      }
      const beforeAudit: Record<string, unknown> = {};
      const afterAudit: Record<string, unknown> = {};
      for (const key of changed) {
        if (key === "planIds") {
          beforeAudit.planIds = currentPlans;
          afterAudit.planIds = nextPlans;
        } else {
          const field = key as keyof PromoColumns;
          beforeAudit[field] = auditColumns({ [field]: current[field] })[field];
          afterAudit[field] = auditColumns({ [field]: columns[field] })[field];
        }
      }
      await auditInTx(tx, {
        ...auditActorFields(infraActor(actor)),
        action: COMMERCE_AUDIT.PROMO_UPDATE,
        entityType: "PromoCode",
        entityId: existing.id,
        before: beforeAudit,
        after: afterAudit,
        metadata: { operation: COMMERCE_AUDIT_OPERATIONS.promoUpdate, code: columns.code, changed },
        request,
      });
      return { changed };
    })
    .catch(duplicateCode);
}

/**
 * Deletes a promo code that was never used (its plan links cascade). Used codes are refused: deactivate them instead,
 * so redemption and payment history keeps its code.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | CONFLICT
 */
export async function deletePromoCode(
  actor: CmsActor,
  input: { promoCodeId: string; reason?: string },
  request: AuditRequestInfo | null = null,
): Promise<{ code: string }> {
  assertCmsPermission(actor, "billing.manage");
  const data = parseInput(deletePromoCodeSchema, input);
  return db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "PromoCode" WHERE "id" = ${data.promoCodeId}::uuid FOR UPDATE`;
    const existing = await tx.promoCode.findUnique({
      where: { id: data.promoCodeId },
      select: { id: true, code: true, discountType: true, redeemedCount: true, _count: { select: { redemptions: true, payments: true } } },
    });
    if (!existing) throw AppError.notFound("Promo code not found.");
    if (existing.redeemedCount > 0 || existing._count.redemptions > 0 || existing._count.payments > 0) {
      throw AppError.conflict("This code has been used, so it is kept for the payment history. Deactivate it instead.");
    }
    await tx.promoCode.delete({ where: { id: existing.id } });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.PROMO_DELETE,
      entityType: "PromoCode",
      entityId: existing.id,
      before: { code: existing.code, discountType: existing.discountType },
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.promoDelete, code: existing.code },
      reason: data.reason ?? null,
      request,
    });
    return { code: existing.code };
  });
}
