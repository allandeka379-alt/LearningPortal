import "server-only";
import { createHash, randomUUID } from "node:crypto";
import type { z } from "zod";
import { Prisma } from "@/generated/prisma/client";
import { AUDIT_ACTIONS, type AuditAction } from "@/server/lib/audit";
import { AppError } from "@/server/lib/errors";

/**
 * Shared plumbing of the commerce admin services (plans, prices, subscriptions, payments, promo codes).
 *
 * Audit keys: precise entries of the shared registry (`AUDIT_ACTIONS`, src/server/lib/audit.ts). The intent is also
 * written to `metadata.operation` ({@link COMMERCE_AUDIT_OPERATIONS}), which refines it where one key covers several
 * steps (a price replaced / activated / deactivated is `plan_price.update`).
 */

export const COMMERCE_AUDIT = {
  PLAN_UPDATE: AUDIT_ACTIONS.PLAN_UPDATE,
  PRICE_CREATE: AUDIT_ACTIONS.PLAN_PRICE_CREATE,
  /** Price replaced (closed by a newer one), activated or deactivated. */
  PRICE_UPDATE: AUDIT_ACTIONS.PLAN_PRICE_UPDATE,
  PROMO_CREATE: AUDIT_ACTIONS.PROMO_CODE_CREATE,
  PROMO_UPDATE: AUDIT_ACTIONS.PROMO_CODE_UPDATE,
  PROMO_DELETE: AUDIT_ACTIONS.PROMO_CODE_DELETE,
  /** Staff extension of a subscription (recorded on the EntitlementGrant that carries the extra days). */
  SUBSCRIPTION_EXTEND: AUDIT_ACTIONS.SUBSCRIPTION_EXTEND,
  GRANT: AUDIT_ACTIONS.ENTITLEMENT_GRANT,
  GRANT_REVOKE: AUDIT_ACTIONS.ENTITLEMENT_REVOKE,
  REFUND: AUDIT_ACTIONS.PAYMENT_REFUND,
  DISPUTED: AUDIT_ACTIONS.PAYMENT_DISPUTED,
  NEEDS_REVIEW: AUDIT_ACTIONS.PAYMENT_NEEDS_REVIEW,
  SUBSCRIPTION_CANCEL: AUDIT_ACTIONS.SUBSCRIPTION_CANCEL,
  SUBSCRIPTION_RESUME: AUDIT_ACTIONS.SUBSCRIPTION_RESUME,
} as const satisfies Record<string, AuditAction>;

/** Precise operation names written to `AuditLog.metadata.operation`. */
export const COMMERCE_AUDIT_OPERATIONS = {
  planUpdate: "plan.update",
  planEntitlementsUpdate: "plan.entitlements.update",
  priceCreate: "plan_price.create",
  priceReplaced: "plan_price.replace",
  priceActivate: "plan_price.activate",
  priceDeactivate: "plan_price.deactivate",
  promoCreate: "promo_code.create",
  promoUpdate: "promo_code.update",
  promoDelete: "promo_code.delete",
  subscriptionExtend: "subscription.extend",
  grantRevoke: "entitlement.revoke",
  refundProvider: "payment.refund.provider",
  refundManual: "payment.refund.manual",
  refundReview: "payment.refund.needs_review",
  disputeMark: "payment.dispute.mark",
} as const;

/**
 * Parses `input` with `schema`, mapping failures to a VALIDATION AppError with field errors. The first problem is
 * also the error message, so confirm dialogs (which show only the message) still say what is wrong.
 */
export function parseInput<S extends z.ZodType>(schema: S, input: unknown): z.output<S> {
  const result = schema.safeParse(input);
  if (!result.success) throw AppError.fromZod(result.error, result.error.issues[0]?.message);
  return result.data;
}

export function isUniqueViolation(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002";
}

export const PROFILE_NAME_SELECT = { select: { displayName: true, firstName: true, lastName: true, username: true } } as const;

export type NameProfile = { displayName: string | null; firstName: string | null; lastName: string | null; username: string | null } | null;

/** Display name from the usual profile fields (never an email or phone number). */
export function personName(profile: NameProfile | undefined): string {
  if (!profile) return "Unnamed user";
  const display = profile.displayName?.trim();
  if (display) return display;
  const full = [profile.firstName, profile.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");
  return full || profile.username || "Unnamed user";
}

/** A person reference safe to render in the admin console: id (for links) + display name. */
export interface PersonRef {
  id: string;
  name: string;
}

export function personRef(user: { id: string; profile: NameProfile } | null | undefined): PersonRef | null {
  return user ? { id: user.id, name: personName(user.profile) } : null;
}

/** Event id for staff-recorded PaymentEvent rows: unique per action (never collides with provider ids). */
export function staffEventId(paymentId: string, action: string): string {
  return createHash("sha256").update(`staff|${action}|${paymentId}|${randomUUID()}`).digest("hex");
}

/** True when an optimistic-concurrency token from a form still matches the row. */
export function sameInstant(a: Date, isoString: string): boolean {
  return a.getTime() === new Date(isoString).getTime();
}

export function staleFormError(what: string): AppError {
  return AppError.conflict(`This ${what} was changed by someone else. Reload the page to see the latest version.`);
}

/** A short audit entry view for admin detail pages. */
export interface AuditTrailEntry {
  id: string;
  action: string;
  operation: string | null;
  entityType: string;
  entityId: string | null;
  actorName: string | null;
  reason: string | null;
  createdAt: Date;
}

export const AUDIT_TRAIL_SELECT = {
  id: true,
  action: true,
  entityType: true,
  entityId: true,
  reason: true,
  metadata: true,
  createdAt: true,
  actor: { select: { profile: PROFILE_NAME_SELECT } },
} as const satisfies Prisma.AuditLogSelect;

type AuditTrailRow = Prisma.AuditLogGetPayload<{ select: typeof AUDIT_TRAIL_SELECT }>;

export function toAuditTrailEntry(row: AuditTrailRow): AuditTrailEntry {
  const metadata = row.metadata;
  const operation =
    typeof metadata === "object" && metadata !== null && !Array.isArray(metadata) && typeof (metadata as Record<string, unknown>).operation === "string"
      ? ((metadata as Record<string, unknown>).operation as string)
      : null;
  return {
    id: row.id,
    action: row.action,
    operation,
    entityType: row.entityType,
    entityId: row.entityId,
    actorName: row.actor ? personName(row.actor.profile) : null,
    reason: row.reason,
    createdAt: row.createdAt,
  };
}
