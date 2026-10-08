import "server-only";
import type { PaymentEventSource, PaymentPurpose, PaymentStatus, Prisma } from "@/generated/prisma/client";
import { DEFAULT_TIMEZONE } from "@/lib/config";
import { addDays, startOfLocalDay } from "@/lib/dates";
import type { FeatureFlags } from "@/lib/features";
import { invalidateEntitlements } from "@/server/billing/entitlements";
import { availableProviderIds, getProvider, isPaymentProviderId } from "@/server/billing/providers/registry";
import { refundRevokesAccess, revokeAccessBoughtBy } from "@/server/billing/purchases";
import { transitionPayment, type PaymentProvider, type RefundResult } from "@/server/billing/providers/types";
import { mergePaymentMetadata } from "@/server/billing/webhooks";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import { PAYMENT_PROVIDERS } from "@/server/lib/env";
import { auditActorFields, auditInTx, type AuditEntry, type AuditRequestInfo } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import { AppError, isAppError } from "@/server/lib/errors";
import { logger, redact, scrubString } from "@/server/lib/logger";
import { assertCmsPermission, infraActor, type CmsActor } from "../users/access";
import { afterCursorWhere, decodeCursor, DEFAULT_PAGE_SIZE, pageOf } from "../users/cursor";
import { listPaymentsSchema, markDisputedSchema, refundPaymentSchema, type ListPaymentsInput, type RefundPaymentInput } from "./schemas";
import {
  AUDIT_TRAIL_SELECT,
  COMMERCE_AUDIT,
  COMMERCE_AUDIT_OPERATIONS,
  parseInput,
  personRef,
  PROFILE_NAME_SELECT,
  staffEventId,
  toAuditTrailEntry,
  type AuditTrailEntry,
  type NameProfile,
  type PersonRef,
} from "./shared";

/**
 * Payments administration (§32 "proper transaction records", §36 Payments; ARCHITECTURE §7.2-7.4, §5.2
 * `payments.view` / `payments.refund` (ADMIN, SUPER_ADMIN; refunds need a recent password confirmation at the route)).
 *
 * - Lists and details with the full PaymentEvent timeline (append-only, redacted payloads). The provider poll URL and
 *   raw contact details are never returned.
 * - Refunds go through the pure payment state machine (`transitionPayment` REFUND_RECORDED): refunds only accumulate,
 *   a full refund makes the payment REFUNDED, a partial one keeps it SUCCESSFUL. PROVIDER refunds call the adapter's
 *   `refund()` WHILE holding the payment row lock, so two staff members can never refund the same money twice; a
 *   provider without a refund API (Paynow) answers MANUAL_REQUIRED and nothing is recorded until staff record the
 *   out-of-band refund (MANUAL). Every refund appends a MANUAL PaymentEvent (recorded by the staff member) and a
 *   `payment.refund` audit entry. Billing policy on a FULL refund: the grant a study pack or a one-off plan purchase
 *   ("Full access") created ends now; a subscription payment is flagged for review (`payment.needs_review`), because
 *   one payment may have bought one of several periods.
 * - Disputes: staff mark a payment disputed (state unchanged, `metadata.disputed`), with event and audit.
 */

const TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 45_000 } as const;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type PartyRef = { kind: "user"; id: string; name: string } | { kind: "school"; id: string; name: string };

export interface PaymentListItem {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  provider: string;
  method: string | null;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
  receiptNumber: string | null;
  payer: PersonRef | null;
  beneficiary: PartyRef | null;
  disputed: boolean;
  paidAt: Date | null;
  createdAt: Date;
}

function metadataRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function beneficiaryOf(row: { beneficiary: { id: string; profile: NameProfile } | null; school: { id: string; name: string } | null }): PartyRef | null {
  if (row.school) return { kind: "school", id: row.school.id, name: row.school.name };
  const person = personRef(row.beneficiary);
  return person ? { kind: "user", ...person } : null;
}

function searchWhere(q: string): Prisma.PaymentWhereInput {
  if (UUID_PATTERN.test(q)) {
    const id = q.toLowerCase();
    return { OR: [{ id }, { payerUserId: id }, { beneficiaryUserId: id }, { subscriptionId: id }, { schoolId: id }] };
  }
  if (/^R-\d{4}-[0-9A-Z]{4,}$/i.test(q)) return { receiptNumber: q.toUpperCase() };
  if (q.includes("@")) {
    const email = q.trim().toLowerCase();
    return { OR: [{ payer: { is: { emailNormalized: email } } }, { beneficiary: { is: { emailNormalized: email } } }] };
  }
  return { OR: [{ providerReference: q }, { receiptNumber: q.toUpperCase() }] };
}

/** §36 Payments: newest first; search by payment / user / subscription id, receipt number, provider reference or email. */
export async function listPayments(actor: CmsActor, input: ListPaymentsInput = {}): Promise<{ items: PaymentListItem[]; nextCursor: string | null }> {
  assertCmsPermission(actor, "payments.view");
  const data = parseInput(listPaymentsSchema, input);
  const limit = data.limit ?? DEFAULT_PAGE_SIZE;
  const where: Prisma.PaymentWhereInput[] = [];
  if (data.status) where.push({ status: data.status });
  if (data.provider) where.push({ provider: data.provider });
  if (data.purpose) where.push({ purpose: data.purpose });
  if (data.currency) where.push({ currency: data.currency });
  if (data.from) where.push({ createdAt: { gte: startOfLocalDay(data.from, DEFAULT_TIMEZONE) } });
  if (data.to) where.push({ createdAt: { lt: startOfLocalDay(addDays(data.to, 1), DEFAULT_TIMEZONE) } });
  if (data.q) where.push(searchWhere(data.q));
  if (data.cursor) where.push(afterCursorWhere(decodeCursor(data.cursor)) as Prisma.PaymentWhereInput);
  // Payment(status, createdAt) index for the common status filter.
  const rows = await db.payment.findMany({
    where: { AND: where },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: {
      id: true,
      status: true,
      purpose: true,
      provider: true,
      method: true,
      amountMinor: true,
      currency: true,
      refundedAmountMinor: true,
      receiptNumber: true,
      paidAt: true,
      createdAt: true,
      metadata: true,
      payer: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      beneficiary: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      school: { select: { id: true, name: true } },
    },
  });
  const page = pageOf(rows, limit);
  return {
    items: page.items.map((row) => ({
      id: row.id,
      status: row.status,
      purpose: row.purpose,
      provider: row.provider,
      method: row.method,
      amountMinor: row.amountMinor,
      currency: row.currency,
      refundedAmountMinor: row.refundedAmountMinor,
      receiptNumber: row.receiptNumber,
      payer: personRef(row.payer),
      beneficiary: beneficiaryOf(row),
      disputed: metadataRecord(row.metadata).disputed === true,
      paidAt: row.paidAt,
      createdAt: row.createdAt,
    })),
    nextCursor: page.nextCursor,
  };
}

/**
 * Filter options: the provider keys the platform knows and the currencies prices are set in (a payment's currency
 * always comes from a price). Read from small tables, never by scanning payments.
 */
export async function listPaymentFilterOptions(actor: CmsActor): Promise<{ providers: string[]; currencies: string[] }> {
  assertCmsPermission(actor, "payments.view");
  const currencies = await db.planPrice.groupBy({ by: ["currency"], orderBy: { currency: "asc" } });
  return { providers: [...PAYMENT_PROVIDERS], currencies: currencies.map((row) => row.currency) };
}

export interface PaymentEventView {
  id: string;
  source: PaymentEventSource;
  eventType: string;
  providerStatus: string | null;
  mappedStatus: PaymentStatus | null;
  amountMinor: number | null;
  currency: string | null;
  signatureValid: boolean;
  processedAt: Date | null;
  processingError: string | null;
  recordedBy: PersonRef | null;
  /** Stored redacted (secrets removed, contact details masked) by the billing layer. */
  payload: unknown;
  createdAt: Date;
}

/** How a refund of this payment can be made. */
export type RefundSupport =
  /** The provider adapter can refund through its API (Stripe, sandbox). */
  | "api"
  /** The provider has no refund API (Paynow): refund in the provider dashboard, then record it here. */
  | "manual_only"
  /** The provider is not enabled on this server: record a refund made elsewhere. */
  | "provider_unavailable";

export interface PaymentDetail {
  id: string;
  purpose: PaymentPurpose;
  status: PaymentStatus;
  provider: string;
  method: string | null;
  providerReference: string | null;
  amountMinor: number;
  currency: string;
  listAmountMinor: number | null;
  discountMinor: number;
  quantity: number;
  receiptNumber: string | null;
  servicePeriodStart: Date | null;
  servicePeriodEnd: Date | null;
  expiresAt: Date | null;
  paidAt: Date | null;
  failedAt: Date | null;
  cancelledAt: Date | null;
  fulfilledAt: Date | null;
  failureCode: string | null;
  failureReason: string | null;
  refundedAmountMinor: number;
  refundedAt: Date | null;
  refundReason: string | null;
  refundedBy: PersonRef | null;
  createdAt: Date;
  /** Whitelisted, already-redacted support details from `Payment.metadata`. */
  details: {
    maskedMsisdn: string | null;
    cardBrand: string | null;
    cardLast4: string | null;
    providerStatus: string | null;
    disputed: boolean;
    disputedAt: string | null;
    needsReview: boolean;
  };
  payer: PersonRef | null;
  beneficiary: PartyRef | null;
  subscription: { id: string; status: string; planCode: string } | null;
  studyPack: { id: string; title: string } | null;
  price: { id: string; label: string | null; planCode: string | null } | null;
  promoCode: { id: string; code: string } | null;
  grant: { id: string; revokedAt: Date | null; endsAt: Date | null } | null;
  events: PaymentEventView[];
  audit: AuditTrailEntry[];
  refund: { refundableMinor: number; support: RefundSupport; allowed: boolean };
  canMarkDisputed: boolean;
}

/** How `provider` can refund here. A switched-off provider (features.stripe) counts as unavailable: record it manually. */
function refundSupportFor(provider: string, features: FeatureFlags): RefundSupport {
  if (provider === "paynow") return "manual_only";
  if (!isPaymentProviderId(provider) || !availableProviderIds(undefined, features).includes(provider)) return "provider_unavailable";
  return "api";
}

function stringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** One payment with its parties, links, PaymentEvent timeline and audit trail. */
export async function getPaymentDetail(actor: CmsActor, paymentId: string): Promise<PaymentDetail> {
  assertCmsPermission(actor, "payments.view");
  const id = parseInput(markDisputedSchema.shape.paymentId, paymentId);
  const payment = await db.payment.findUnique({
    where: { id },
    select: {
      id: true,
      purpose: true,
      status: true,
      provider: true,
      method: true,
      providerReference: true,
      amountMinor: true,
      currency: true,
      listAmountMinor: true,
      discountMinor: true,
      quantity: true,
      receiptNumber: true,
      servicePeriodStart: true,
      servicePeriodEnd: true,
      expiresAt: true,
      paidAt: true,
      failedAt: true,
      cancelledAt: true,
      fulfilledAt: true,
      failureCode: true,
      failureReason: true,
      refundedAmountMinor: true,
      refundedAt: true,
      refundReason: true,
      createdAt: true,
      metadata: true,
      refundedBy: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      payer: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      beneficiary: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      school: { select: { id: true, name: true } },
      subscription: { select: { id: true, status: true, plan: { select: { code: true } } } },
      studyPack: { select: { id: true, title: true } },
      planPrice: { select: { id: true, label: true, plan: { select: { code: true } } } },
      promoCode: { select: { id: true, code: true } },
      entitlementGrant: { select: { id: true, revokedAt: true, endsAt: true } },
    },
  });
  if (!payment) throw AppError.notFound("Payment not found.");
  const [events, auditRows] = await Promise.all([
    // PaymentEvent(paymentId, createdAt) index.
    db.paymentEvent.findMany({
      where: { paymentId: payment.id },
      orderBy: [{ createdAt: "asc" }, { id: "asc" }],
      take: 200,
      select: {
        id: true,
        source: true,
        eventType: true,
        providerStatus: true,
        mappedStatus: true,
        amountMinor: true,
        currency: true,
        signatureValid: true,
        processedAt: true,
        processingError: true,
        payload: true,
        createdAt: true,
        recordedBy: { select: { id: true, profile: PROFILE_NAME_SELECT } },
      },
    }),
    db.auditLog.findMany({
      where: { entityType: "Payment", entityId: payment.id },
      orderBy: { createdAt: "desc" },
      take: 30,
      select: AUDIT_TRAIL_SELECT,
    }),
  ]);
  const meta = metadataRecord(payment.metadata);
  const refundableMinor = payment.amountMinor - payment.refundedAmountMinor;
  return {
    id: payment.id,
    purpose: payment.purpose,
    status: payment.status,
    provider: payment.provider,
    method: payment.method,
    providerReference: payment.providerReference,
    amountMinor: payment.amountMinor,
    currency: payment.currency,
    listAmountMinor: payment.listAmountMinor,
    discountMinor: payment.discountMinor,
    quantity: payment.quantity,
    receiptNumber: payment.receiptNumber,
    servicePeriodStart: payment.servicePeriodStart,
    servicePeriodEnd: payment.servicePeriodEnd,
    expiresAt: payment.expiresAt,
    paidAt: payment.paidAt,
    failedAt: payment.failedAt,
    cancelledAt: payment.cancelledAt,
    fulfilledAt: payment.fulfilledAt,
    failureCode: payment.failureCode,
    failureReason: payment.failureReason,
    refundedAmountMinor: payment.refundedAmountMinor,
    refundedAt: payment.refundedAt,
    refundReason: payment.refundReason,
    refundedBy: personRef(payment.refundedBy),
    createdAt: payment.createdAt,
    details: {
      maskedMsisdn: stringOrNull(meta.maskedMsisdn),
      cardBrand: stringOrNull(meta.cardBrand),
      cardLast4: stringOrNull(meta.cardLast4),
      providerStatus: stringOrNull(meta.providerStatus),
      disputed: meta.disputed === true,
      disputedAt: stringOrNull(meta.disputedAt),
      needsReview: meta.needsReview === true,
    },
    payer: personRef(payment.payer),
    beneficiary: beneficiaryOf(payment),
    subscription: payment.subscription ? { id: payment.subscription.id, status: payment.subscription.status, planCode: payment.subscription.plan.code } : null,
    studyPack: payment.studyPack,
    price: payment.planPrice ? { id: payment.planPrice.id, label: payment.planPrice.label, planCode: payment.planPrice.plan?.code ?? null } : null,
    promoCode: payment.promoCode,
    grant: payment.entitlementGrant,
    events: events.map((event) => ({
      id: event.id,
      source: event.source,
      eventType: event.eventType,
      providerStatus: event.providerStatus,
      mappedStatus: event.mappedStatus,
      amountMinor: event.amountMinor,
      currency: event.currency,
      signatureValid: event.signatureValid,
      processedAt: event.processedAt,
      processingError: event.processingError,
      recordedBy: personRef(event.recordedBy),
      payload: event.payload,
      createdAt: event.createdAt,
    })),
    audit: auditRows.map(toAuditTrailEntry),
    refund: { refundableMinor, support: refundSupportFor(payment.provider, await getFeatures()), allowed: payment.status === "SUCCESSFUL" && refundableMinor > 0 },
    canMarkDisputed: (payment.status === "SUCCESSFUL" || payment.status === "REFUNDED") && meta.disputed !== true,
  };
}

// ---------------------------------------------------------------------------------------------------------------------
// Refunds
// ---------------------------------------------------------------------------------------------------------------------

const LOCKED_SELECT = {
  id: true,
  purpose: true,
  status: true,
  provider: true,
  providerReference: true,
  amountMinor: true,
  currency: true,
  refundedAmountMinor: true,
  beneficiaryUserId: true,
  schoolId: true,
  subscriptionId: true,
  metadata: true,
} as const satisfies Prisma.PaymentSelect;

type LockedPayment = Prisma.PaymentGetPayload<{ select: typeof LOCKED_SELECT }>;

async function lockPayment(tx: Tx, paymentId: string): Promise<LockedPayment> {
  await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
  const payment = await tx.payment.findUnique({ where: { id: paymentId }, select: LOCKED_SELECT });
  if (!payment) throw AppError.notFound("Payment not found.");
  return payment;
}

export type RefundOutcome =
  /** Refund recorded (provider confirmed, provider accepted and pending, or staff-recorded manual refund). */
  | {
      outcome: "REFUNDED";
      status: PaymentStatus;
      refundedMinor: number;
      totalRefundedMinor: number;
      full: boolean;
      providerStatus: RefundResult["status"] | "MANUAL";
      /** A full subscription refund: staff must review the subscription's access. */
      needsReview: boolean;
    }
  /** The provider cannot refund through its API: nothing was recorded. Refund out of band, then record it as MANUAL. */
  | { outcome: "MANUAL_REQUIRED"; status: PaymentStatus };

export interface RefundOptions {
  now?: Date;
  /** Adapter resolver (tests inject a provider); default: the configured registry adapter. */
  providerFor?: (providerId: string) => PaymentProvider;
}

/** The registry adapter, honouring the feature flags (a switched-off provider such as Stripe is refused). */
function defaultProviderFor(features: FeatureFlags): (providerId: string) => PaymentProvider {
  return (providerId) => getProvider(providerId, { features });
}

/**
 * Refunds (part of) a SUCCESSFUL payment. `amount` blank = everything still refundable.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION (amount, reason) | CONFLICT (payment not refundable) |
 *         BAD_REQUEST (provider not enabled / no provider reference for an API refund)
 */
export async function refundPayment(
  actor: CmsActor,
  input: RefundPaymentInput,
  request: AuditRequestInfo | null = null,
  options: RefundOptions = {},
): Promise<RefundOutcome> {
  assertCmsPermission(actor, "payments.refund");
  const data = parseInput(refundPaymentSchema, input);
  const now = options.now ?? new Date();
  const providerFor = options.providerFor ?? defaultProviderFor(await getFeatures());
  const reason = scrubString(data.reason).slice(0, 500);

  const outcome = await db.$transaction(async (tx) => {
    const payment = await lockPayment(tx, data.paymentId);
    if (payment.status !== "SUCCESSFUL") {
      throw AppError.conflict(`Only a successful payment can be refunded (this one is ${payment.status.toLowerCase()}).`);
    }
    const remaining = payment.amountMinor - payment.refundedAmountMinor;
    const amountMinor = data.amount ?? remaining;
    const transition = transitionPayment(payment, { type: "REFUND_RECORDED", amountMinor, at: now });
    if (transition.kind !== "APPLY") {
      const message = `Refund at most ${(remaining / 100).toFixed(2)} ${payment.currency} (what is still refundable).`;
      throw AppError.validation({ amount: [message] }, message);
    }

    let providerStatus: RefundResult["status"] | "MANUAL" = "MANUAL";
    let providerRefundRef: string | null = null;
    if (data.method === "PROVIDER") {
      if (!payment.providerReference) {
        throw new AppError("BAD_REQUEST", "This payment has no provider reference, so the provider cannot refund it. Record a manual refund instead.");
      }
      let provider: PaymentProvider;
      try {
        provider = providerFor(payment.provider);
      } catch (error) {
        if (isAppError(error) && error.code === "BAD_REQUEST") {
          throw new AppError(
            "BAD_REQUEST",
            `The ${payment.provider} provider is not enabled on this server, so it cannot refund through its API. Refund the payer another way, then record a manual refund.`,
          );
        }
        throw error;
      }
      const result = await provider.refund({ providerRef: payment.providerReference, amountMinor, currency: payment.currency, reason });
      if (result.status === "MANUAL_REQUIRED") {
        logger.info("billing: provider requires a manual refund", { paymentId: payment.id, provider: payment.provider });
        return { outcome: "MANUAL_REQUIRED" as const, status: payment.status };
      }
      providerStatus = result.status;
      providerRefundRef = result.providerRef ?? null;
    }

    const full = transition.to === "REFUNDED";
    const revokesAccess = full && refundRevokesAccess(payment.purpose);
    const needsReview = full && !revokesAccess;
    const metadata = mergePaymentMetadata(payment.metadata, {
      lastRefundMethod: data.method === "PROVIDER" ? "provider" : "manual",
      ...(providerRefundRef ? { providerRefundRef } : {}),
      ...(data.externalReference ? { refundReference: data.externalReference } : {}),
      ...(needsReview ? { needsReview: true } : {}),
    });
    await tx.payment.update({
      where: { id: payment.id },
      data: { ...transition.patch, refundReason: reason, refundedById: actor.userId, metadata },
    });
    const totalRefundedMinor = transition.patch.refundedAmountMinor ?? payment.refundedAmountMinor + amountMinor;
    const reviewMessage = needsReview ? "Subscription payment fully refunded: review the subscription period and access." : null;
    await tx.paymentEvent.create({
      data: {
        paymentId: payment.id,
        provider: payment.provider,
        providerEventId: staffEventId(payment.id, "refund"),
        source: "MANUAL",
        eventType: data.method === "PROVIDER" ? "staff.refund.provider" : "staff.refund.manual",
        providerStatus: providerStatus.toLowerCase(),
        mappedStatus: full ? "REFUNDED" : null,
        amountMinor,
        currency: payment.currency,
        signatureValid: true,
        payload: redact({
          method: data.method,
          amountMinor,
          totalRefundedMinor,
          reason,
          externalReference: data.externalReference ?? null,
          providerRefundRef,
          providerStatus,
        }) as Prisma.InputJsonValue,
        processedAt: now,
        processingError: reviewMessage,
        recordedById: actor.userId,
        createdAt: now,
      },
    });

    if (revokesAccess) {
      await revokeAccessBoughtBy(tx, payment.id, { now, revokedById: actor.userId, reason: "Payment refunded" });
    }

    const audits: AuditEntry[] = [
      {
        ...auditActorFields(infraActor(actor)),
        action: COMMERCE_AUDIT.REFUND,
        entityType: "Payment",
        entityId: payment.id,
        schoolId: payment.schoolId,
        targetUserId: payment.beneficiaryUserId,
        before: { status: payment.status, refundedAmountMinor: payment.refundedAmountMinor },
        after: { status: transition.to, refundedAmountMinor: totalRefundedMinor },
        metadata: {
          operation: data.method === "PROVIDER" ? COMMERCE_AUDIT_OPERATIONS.refundProvider : COMMERCE_AUDIT_OPERATIONS.refundManual,
          amountMinor,
          currency: payment.currency,
          provider: payment.provider,
          providerStatus,
          full,
        },
        reason,
        request,
      },
    ];
    if (needsReview) {
      audits.push({
        ...auditActorFields(infraActor(actor)),
        action: COMMERCE_AUDIT.NEEDS_REVIEW,
        entityType: "Payment",
        entityId: payment.id,
        schoolId: payment.schoolId,
        targetUserId: payment.beneficiaryUserId,
        metadata: { operation: COMMERCE_AUDIT_OPERATIONS.refundReview, reason: "subscription_refunded", subscriptionId: payment.subscriptionId },
        request,
      });
    }
    for (const entry of audits) await auditInTx(tx, entry);
    return {
      outcome: "REFUNDED" as const,
      status: transition.to,
      refundedMinor: amountMinor,
      totalRefundedMinor,
      full,
      providerStatus,
      needsReview,
      beneficiaryUserId: payment.beneficiaryUserId,
    };
  }, TRANSACTION_OPTIONS);

  if (outcome.outcome === "MANUAL_REQUIRED") return outcome;
  const { beneficiaryUserId, ...result } = outcome;
  if (beneficiaryUserId !== null) invalidateEntitlements(beneficiaryUserId);
  return result;
}

/**
 * Marks a SUCCESSFUL or REFUNDED payment as disputed (chargeback / payer complaint): the status is unchanged (§32 has
 * no dispute state); `metadata.disputed` is set, a MANUAL PaymentEvent and a `payment.disputed` audit entry are written.
 *
 * @throws AppError FORBIDDEN | NOT_FOUND | VALIDATION | CONFLICT
 */
export async function markPaymentDisputed(
  actor: CmsActor,
  input: { paymentId: string; reason: string },
  request: AuditRequestInfo | null = null,
  now: Date = new Date(),
): Promise<{ disputedAt: Date }> {
  assertCmsPermission(actor, "payments.refund");
  const data = parseInput(markDisputedSchema, input);
  const reason = scrubString(data.reason).slice(0, 500);
  await db.$transaction(async (tx) => {
    const payment = await lockPayment(tx, data.paymentId);
    if (payment.status !== "SUCCESSFUL" && payment.status !== "REFUNDED") {
      throw AppError.conflict("Only a payment where money was received can be disputed.");
    }
    if (metadataRecord(payment.metadata).disputed === true) throw AppError.conflict("This payment is already marked as disputed.");
    await tx.payment.update({
      where: { id: payment.id },
      data: { metadata: mergePaymentMetadata(payment.metadata, { disputed: true, disputedAt: now.toISOString(), disputeSource: "staff" }) },
    });
    await tx.paymentEvent.create({
      data: {
        paymentId: payment.id,
        provider: payment.provider,
        providerEventId: staffEventId(payment.id, "dispute"),
        source: "MANUAL",
        eventType: "staff.dispute",
        providerStatus: "disputed",
        mappedStatus: null,
        signatureValid: true,
        payload: redact({ reason }) as Prisma.InputJsonValue,
        processedAt: now,
        recordedById: actor.userId,
        createdAt: now,
      },
    });
    await auditInTx(tx, {
      ...auditActorFields(infraActor(actor)),
      action: COMMERCE_AUDIT.DISPUTED,
      entityType: "Payment",
      entityId: payment.id,
      schoolId: payment.schoolId,
      targetUserId: payment.beneficiaryUserId,
      metadata: { operation: COMMERCE_AUDIT_OPERATIONS.disputeMark, provider: payment.provider, status: payment.status },
      reason,
      request,
    });
  });
  return { disputedAt: now };
}
