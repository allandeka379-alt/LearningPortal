import "server-only";
import { createHash } from "node:crypto";
import { z } from "zod";
import type { PaymentStatus, Prisma } from "@/generated/prisma/client";
import type { FeatureFlags } from "@/lib/features";
import { db, type DbClient } from "@/server/db";
import { getFeatures } from "@/server/features";
import { AUDIT_ACTIONS, auditInTx, type AuditAction, type AuditEntry } from "@/server/lib/audit";
import type { Tx } from "@/server/lib/db-context";
import type { ServerEnv } from "@/server/lib/env";
import { AppError, isAppError } from "@/server/lib/errors";
import { logger, scrubString } from "@/server/lib/logger";
import { rateLimit, rateLimits } from "@/server/lib/rate-limit";
import { clientIpFromHeaders } from "@/server/lib/request";
import { enqueueReferralCheck } from "@/server/referrals/service";
import { invalidateEntitlements } from "./entitlements";
import {
  getProvider,
  isPaymentProviderId,
  recordPaymentEvent,
  type RecordPaymentEventInput,
  type RecordedPaymentEvent,
} from "./providers/registry";
import {
  mapProviderStatus,
  syntheticEventId,
  transitionPayment,
  type PaymentProvider,
  type PaymentProviderId,
  type PaymentSnapshot,
  type PaymentTransition,
  type ProviderPaymentStatus,
  type VerifiedProviderEvent,
} from "./providers/types";
import { fulfilPlanPurchasePayment, refundRevokesAccess, revokeAccessBoughtBy, type PlanPurchaseFulfilment } from "./purchases";
import { activateSubscriptionFromPayment, type ActivationResult } from "./subscriptions";

/**
 * Payment event processing (§32; ARCHITECTURE §7.2-7.4): the ONE path by which provider news changes a Payment.
 * Webhooks ({@link handleWebhook}), server-side polls (return URL, `payments.reconcile`) and local actions (expiry,
 * superseded checkouts) all end here, so every change:
 *
 * 1. appends a `PaymentEvent` (idempotent on (provider, providerEventId) among authentic rows: a replay is a no-op);
 * 2. locks the Payment row (`SELECT … FOR UPDATE`) and runs the PURE state machine (`transitionPayment`);
 * 3. on SUCCESSFUL fulfils in the SAME transaction: `activateSubscriptionFromPayment` (subscription period),
 *    {@link fulfilStudyPackPayment} or `fulfilPlanPurchasePayment` (one-off "Full access", ./purchases.ts) (an
 *    EntitlementGrant keyed uniquely by paymentId), all idempotent via fulfilledAt;
 * 4. writes the audit trail (status changes, amount mismatches, disputes, fulfilment needing review);
 * 5. marks the event processed (`processedAt`, `processingError` for anything staff must look at).
 *
 * Policy decisions on top of the pure machine:
 * - A verified "paid" whose amount/currency differs from our row moves a PENDING payment to FAILED
 *   (failureCode `amount_mismatch`) with an audit entry; a later correct "paid" can still succeed it.
 * - A dispute keeps the payment state and sets `metadata.disputed` + audit.
 * - A full refund revokes the grant a study-pack or one-off plan purchase created; refunded subscription payments are
 *   flagged for staff review (a payment may have bought one of several periods, so access is not cut automatically).
 *
 * Nothing here trusts a client: amounts come from our Payment row, provider data only from verified webhooks or our own
 * polls. Routes never see internals: {@link handleWebhook} answers `{ received }` with 200 / 400 / 404 / 413 / 500.
 */

/** Audit keys written by payment processing (from the shared registry in src/server/lib/audit.ts). */
export const PAYMENT_AUDIT_ACTIONS = {
  STATUS_CHANGE: AUDIT_ACTIONS.PAYMENT_STATUS_CHANGE,
  AMOUNT_MISMATCH: AUDIT_ACTIONS.PAYMENT_AMOUNT_MISMATCH,
  DISPUTED: AUDIT_ACTIONS.PAYMENT_DISPUTED,
  NEEDS_REVIEW: AUDIT_ACTIONS.PAYMENT_NEEDS_REVIEW,
} as const;
type PaymentAuditAction = (typeof PAYMENT_AUDIT_ACTIONS)[keyof typeof PAYMENT_AUDIT_ACTIONS];

function auditAction(action: PaymentAuditAction): AuditAction {
  return action;
}

/** Largest webhook body accepted (providers send a few KB). */
export const MAX_WEBHOOK_BODY_BYTES = 256 * 1024;
/** Unsigned (rejected) webhook rows stored per source IP and provider per hour; beyond that they are only logged. */
const TRANSACTION_OPTIONS = { maxWait: 10_000, timeout: 20_000 } as const;
const DAY_MS = 86_400_000;
const uuidSchema = z.uuid();

// =====================================================================================================================
// Pure decisions (unit-tested)
// =====================================================================================================================

/** The provider facts {@link decideProviderTransition} reads. */
export interface ProviderFacts {
  status: ProviderPaymentStatus | null;
  amountMinor: number | null;
  currency: string | null;
  failureCode: string | null;
  refundedAmountMinor?: number | null;
}

export interface ProviderDecision {
  transition: PaymentTransition;
  /** A verified "paid" reported another amount or currency than our row. */
  amountMismatch: boolean;
  /** A refund made at the provider (not initiated through our admin flow): staff are alerted. */
  providerRefund: boolean;
}

/**
 * What a verified provider event does to a payment: the pure state machine plus this module's policies (amount
 * mismatch -> FAILED for a PENDING payment; cumulative refund amounts -> REFUND_RECORDED deltas).
 */
export function decideProviderTransition(payment: PaymentSnapshot, facts: ProviderFacts, at: Date): ProviderDecision {
  const refunded = facts.refundedAmountMinor;
  if (refunded !== null && refunded !== undefined && (facts.status === "REFUNDED" || facts.status === null)) {
    if (!Number.isSafeInteger(refunded) || refunded < 0) {
      return {
        transition: { kind: "REJECTED", reason: "INVALID_REFUND", message: "Provider reported an invalid refunded amount." },
        amountMismatch: false,
        providerRefund: true,
      };
    }
    const delta = refunded - payment.refundedAmountMinor;
    if (delta <= 0) return { transition: { kind: "NOOP", reason: "refund already recorded" }, amountMismatch: false, providerRefund: false };
    const transition = transitionPayment(payment, { type: "REFUND_RECORDED", amountMinor: delta, at });
    return {
      transition: transition.kind === "APPLY" ? { ...transition, alertAdmin: true } : transition,
      amountMismatch: false,
      providerRefund: true,
    };
  }
  if (facts.status === null) {
    return { transition: { kind: "NOOP", reason: "informational provider event" }, amountMismatch: false, providerRefund: false };
  }
  const transition = transitionPayment(payment, {
    type: "PROVIDER_STATUS",
    status: facts.status,
    verified: true,
    amountMinor: facts.amountMinor,
    currency: facts.currency,
    failureCode: facts.failureCode,
    at,
  });
  if (transition.kind === "REJECTED" && transition.reason === "AMOUNT_MISMATCH") {
    if (payment.status !== "PENDING") return { transition, amountMismatch: true, providerRefund: false };
    return {
      transition: {
        kind: "APPLY",
        from: "PENDING",
        to: "FAILED",
        patch: { status: "FAILED", failedAt: at, failureCode: "amount_mismatch" },
        fulfil: false,
        alertAdmin: true,
      },
      amountMismatch: true,
      providerRefund: false,
    };
  }
  return { transition, amountMismatch: false, providerRefund: transition.kind === "APPLY" && transition.to === "REFUNDED" };
}

/** Status changes WE make (no provider news): expiry, payer cancel, superseded checkout, provider never reached. */
export const LOCAL_PAYMENT_ACTIONS = ["EXPIRED", "USER_CANCELLED", "SUPERSEDED", "CHECKOUT_FAILED"] as const;
export type LocalPaymentAction = (typeof LOCAL_PAYMENT_ACTIONS)[number];

/** Pure transition for a {@link LocalPaymentAction}; only a PENDING payment changes. */
export function localPaymentTransition(payment: PaymentSnapshot, action: LocalPaymentAction, at: Date): PaymentTransition {
  switch (action) {
    case "EXPIRED":
    case "USER_CANCELLED":
      return transitionPayment(payment, { type: action, at });
    case "SUPERSEDED": {
      const transition = transitionPayment(payment, { type: "USER_CANCELLED", at });
      return transition.kind === "APPLY" ? { ...transition, patch: { ...transition.patch, failureCode: "superseded" } } : transition;
    }
    case "CHECKOUT_FAILED":
      if (payment.status !== "PENDING") return { kind: "NOOP", reason: `payment is ${payment.status}` };
      return {
        kind: "APPLY",
        from: "PENDING",
        to: "FAILED",
        patch: { status: "FAILED", failedAt: at, failureCode: "checkout_failed" },
        fulfil: false,
        alertAdmin: false,
      };
  }
}

const CROCKFORD = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";

/**
 * Human-readable receipt number, e.g. "R-2026-7KQ2M9XH4C1B": the year plus 60 bits derived from the payment id
 * (deterministic, so a retried transaction writes the same value; unique index guards the negligible collision risk).
 * TODO(shared): strictly sequential numbers need a database sequence.
 */
export function receiptNumberFor(paymentId: string, at: Date): string {
  let value = createHash("sha256").update(`receipt:${paymentId.toLowerCase()}`).digest().readBigUInt64BE(0);
  let code = "";
  for (let i = 0; i < 12; i += 1) {
    code = `${CROCKFORD[Number(value & 31n)]}${code}`;
    value >>= 5n;
  }
  return `R-${at.getUTCFullYear()}-${code}`;
}

type MetadataValue = string | number | boolean;

/** Merges flat, size-bounded support details into `Payment.metadata` (strings scrubbed of contact details). */
export function mergePaymentMetadata(existing: unknown, patch: Record<string, MetadataValue>): Record<string, MetadataValue> {
  const merged: Record<string, MetadataValue> = {};
  if (typeof existing === "object" && existing !== null && !Array.isArray(existing)) {
    for (const [key, value] of Object.entries(existing)) {
      if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") merged[key] = value;
    }
  }
  for (const [key, value] of Object.entries(patch)) {
    if (!/^[A-Za-z][A-Za-z0-9_]{0,39}$/.test(key)) continue;
    if (typeof value === "string") merged[key] = scrubString(value).slice(0, 500);
    else if (typeof value === "number" ? Number.isFinite(value) : typeof value === "boolean") merged[key] = value;
  }
  return merged;
}

function sameJson(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

// =====================================================================================================================
// Fulfilment
// =====================================================================================================================

export type StudyPackFulfilment =
  | { outcome: "GRANTED"; grantId: string; userId: string; startsAt: Date; endsAt: Date | null }
  | { outcome: "ALREADY_FULFILLED"; grantId: string | null; userId: string | null }
  | { outcome: "NEEDS_REVIEW"; userId: string | null; reason: string };

export type FulfilmentResult =
  | { kind: "SUBSCRIPTION"; result: ActivationResult }
  | { kind: "STUDY_PACK"; result: StudyPackFulfilment }
  | { kind: "PLAN_PURCHASE"; result: PlanPurchaseFulfilment };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Fulfils a SUCCESSFUL study-pack payment (§24): one EntitlementGrant(source STUDY_PACK, paymentId unique) for the
 * beneficiary, with the pack's entitlement document and scope COPIED into `features` (what was bought stays bought if
 * the pack is edited later). The access window is the price's `periodDays` (NULL = no expiry); a repeat purchase while
 * an earlier grant still runs starts when that one ends. Idempotent via `Payment.fulfilledAt` under the row lock.
 * Run inside the transaction that moved the payment to SUCCESSFUL.
 *
 * @throws AppError NOT_FOUND / BAD_REQUEST (not a study-pack payment) / CONFLICT (not SUCCESSFUL)
 */
export async function fulfilStudyPackPayment(tx: Tx, paymentId: string, options: { now?: Date } = {}): Promise<StudyPackFulfilment> {
  const now = options.now ?? new Date();
  await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
  const payment = await tx.payment.findUnique({
    where: { id: paymentId },
    select: {
      purpose: true,
      status: true,
      fulfilledAt: true,
      beneficiaryUserId: true,
      studyPackId: true,
      planPriceId: true,
      entitlementGrant: { select: { id: true } },
    },
  });
  if (!payment) throw AppError.notFound("Payment not found.", { paymentId });
  if (payment.purpose !== "STUDY_PACK") throw new AppError("BAD_REQUEST", "This payment is not for a study pack.");
  if (payment.status !== "SUCCESSFUL") throw AppError.conflict("Only a successful payment can be fulfilled.", { paymentId });
  const userId = payment.beneficiaryUserId;
  if (payment.fulfilledAt !== null || payment.entitlementGrant !== null) {
    return { outcome: "ALREADY_FULFILLED", grantId: payment.entitlementGrant?.id ?? null, userId };
  }
  const review = (reason: string): StudyPackFulfilment => {
    logger.error("billing: study pack payment needs manual review before fulfilment", { paymentId, reason });
    return { outcome: "NEEDS_REVIEW", userId, reason };
  };
  if (userId === null || payment.studyPackId === null) return review("payment has no beneficiary or study pack");

  const pack = await tx.studyPack.findUnique({
    where: { id: payment.studyPackId },
    select: { entitlements: true, scopes: { select: { subjectId: true, qualificationId: true, syllabusId: true } } },
  });
  if (!pack) return review("study pack not found");
  const price =
    payment.planPriceId === null
      ? null
      : await tx.planPrice.findUnique({ where: { id: payment.planPriceId }, select: { periodDays: true } });

  // Renewal of a time-boxed pack: continue after the latest running grant (never overlap paid days).
  const running = await tx.entitlementGrant.findFirst({
    where: { userId, studyPackId: payment.studyPackId, revokedAt: null, startsAt: { lte: now }, endsAt: { gt: now } },
    orderBy: { endsAt: "desc" },
    select: { endsAt: true },
  });
  const startsAt = running?.endsAt ?? now;
  const periodDays = price?.periodDays ?? null;
  const endsAt = periodDays === null ? null : new Date(startsAt.getTime() + periodDays * DAY_MS);

  const doc = isRecord(pack.entitlements) ? pack.entitlements : {};
  const scope = {
    subjectIds: pack.scopes.flatMap((s) => (s.subjectId ? [s.subjectId] : [])),
    qualificationIds: pack.scopes.flatMap((s) => (s.qualificationId ? [s.qualificationId] : [])),
    syllabusIds: pack.scopes.flatMap((s) => (s.syllabusId ? [s.syllabusId] : [])),
  };
  const features = JSON.parse(JSON.stringify({ ...doc, scope })) as Prisma.InputJsonValue;

  const grant = await tx.entitlementGrant.create({
    data: { userId, source: "STUDY_PACK", studyPackId: payment.studyPackId, paymentId, startsAt, endsAt, features },
    select: { id: true },
  });
  await tx.payment.update({
    where: { id: paymentId },
    data: { fulfilledAt: now, ...(endsAt !== null ? { servicePeriodStart: startsAt, servicePeriodEnd: endsAt } : {}) },
  });
  invalidateEntitlements(userId);
  return { outcome: "GRANTED", grantId: grant.id, userId, startsAt, endsAt };
}

function fulfilmentReview(fulfilment: FulfilmentResult): string | null {
  return fulfilment.result.outcome === "NEEDS_REVIEW" ? fulfilment.result.reason : null;
}

// =====================================================================================================================
// Event processing (database)
// =====================================================================================================================

/** Where an applied event came from (`PaymentEvent.source`). */
export type ProviderEventSource = "WEBHOOK" | "POLL" | "RECONCILIATION";

/** A verified provider fact to apply (from a webhook or our own poll). */
export interface ProviderEventInput {
  provider: PaymentProviderId;
  source: ProviderEventSource;
  providerEventId: string;
  eventType: string;
  /** Our Payment id echoed by the provider (preferred lookup). */
  paymentId: string | null;
  /** Provider reference (`Payment.providerReference`) for the fallback lookup. */
  providerRef: string | null;
  status: ProviderPaymentStatus | null;
  providerStatus: string;
  amountMinor: number | null;
  currency: string | null;
  failureCode: string | null;
  occurredAt: Date | null;
  disputed?: boolean;
  refundedAmountMinor?: number | null;
  pollUrl?: string | null;
  metadata?: Record<string, MetadataValue>;
  payload: Record<string, unknown>;
}

export type ProcessOutcome = "APPLIED" | "NOOP" | "REJECTED" | "DUPLICATE" | "UNMATCHED";

export interface ProcessedProviderEvent {
  outcome: ProcessOutcome;
  /** The PaymentEvent row. */
  eventId: string;
  paymentId: string | null;
  /** Payment status after processing (`null` when unmatched or a duplicate). */
  paymentStatus: PaymentStatus | null;
  fulfilment: FulfilmentResult | null;
  /** Stored as `processingError` (staff attention), when any. */
  message: string | null;
}

/** Maps an adapter's verified webhook event onto {@link ProviderEventInput}. */
export function providerEventInput(provider: PaymentProviderId, source: ProviderEventSource, event: VerifiedProviderEvent): ProviderEventInput {
  return {
    provider,
    source,
    providerEventId: event.providerEventId,
    eventType: event.eventType,
    paymentId: event.paymentId,
    providerRef: event.providerRef,
    status: event.status,
    providerStatus: event.providerStatus,
    amountMinor: event.amountMinor,
    currency: event.currency,
    failureCode: event.failureCode,
    occurredAt: event.occurredAt,
    disputed: event.disputed ?? false,
    refundedAmountMinor: event.refundedAmountMinor ?? null,
    pollUrl: event.pollUrl ?? null,
    ...(event.metadata ? { metadata: event.metadata } : {}),
    payload: event.payload,
  };
}

function eventRecord(input: ProviderEventInput, paymentId: string | null, now: Date): RecordPaymentEventInput {
  return {
    provider: input.provider,
    providerEventId: input.providerEventId,
    source: input.source,
    eventType: input.eventType,
    providerStatus: input.providerStatus,
    mappedStatus: mapProviderStatus(input.status),
    amountMinor: input.amountMinor,
    currency: input.currency,
    signatureValid: true,
    payload: input.payload,
    paymentId,
    receivedAt: now,
  };
}

async function findPaymentId(client: DbClient, input: ProviderEventInput): Promise<string | null> {
  if (input.paymentId !== null && uuidSchema.safeParse(input.paymentId).success) {
    const row = await client.payment.findUnique({ where: { id: input.paymentId }, select: { id: true, provider: true } });
    // An event from one provider can never touch another provider's payment.
    if (row && row.provider === input.provider) return row.id;
  }
  if (input.providerRef !== null && input.providerRef.trim() !== "" && input.providerRef.length <= 255) {
    const row = await client.payment.findUnique({
      where: { provider_providerReference: { provider: input.provider, providerReference: input.providerRef } },
      select: { id: true },
    });
    if (row) return row.id;
  }
  return null;
}

async function finishEvent(tx: Tx, eventId: string, now: Date, processingError: string | null, linkPaymentId: string | null): Promise<void> {
  await tx.paymentEvent.update({
    where: { id: eventId },
    data: {
      processedAt: now,
      processingError: processingError === null ? null : processingError.slice(0, 1000),
      ...(linkPaymentId !== null ? { paymentId: linkPaymentId } : {}),
    },
  });
}

const LOCKED_PAYMENT_SELECT = {
  id: true,
  provider: true,
  purpose: true,
  status: true,
  amountMinor: true,
  currency: true,
  refundedAmountMinor: true,
  payerUserId: true,
  beneficiaryUserId: true,
  schoolId: true,
  subscriptionId: true,
  studyPackId: true,
  providerPollUrl: true,
  receiptNumber: true,
  paidAt: true,
  metadata: true,
} as const satisfies Prisma.PaymentSelect;

type LockedPayment = Prisma.PaymentGetPayload<{ select: typeof LOCKED_PAYMENT_SELECT }>;

async function lockPayment(tx: Tx, paymentId: string): Promise<LockedPayment> {
  await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
  return tx.payment.findUniqueOrThrow({ where: { id: paymentId }, select: LOCKED_PAYMENT_SELECT });
}

function snapshotOf(payment: LockedPayment): PaymentSnapshot {
  return {
    status: payment.status,
    amountMinor: payment.amountMinor,
    currency: payment.currency,
    refundedAmountMinor: payment.refundedAmountMinor,
  };
}

function systemAudit(payment: LockedPayment, action: PaymentAuditAction, extra: Omit<AuditEntry, "actorUserId" | "action" | "entityType">): AuditEntry {
  return {
    actorUserId: null,
    actorRoles: [],
    action: auditAction(action),
    entityType: "Payment",
    entityId: payment.id,
    schoolId: payment.schoolId,
    targetUserId: payment.beneficiaryUserId,
    ...extra,
  };
}

interface ApplyOutcome {
  outcome: "APPLIED" | "NOOP" | "REJECTED";
  status: PaymentStatus;
  fulfilment: FulfilmentResult | null;
  processingError: string | null;
}

async function fulfil(tx: Tx, payment: LockedPayment, now: Date): Promise<FulfilmentResult> {
  if (payment.purpose === "STUDY_PACK") return { kind: "STUDY_PACK", result: await fulfilStudyPackPayment(tx, payment.id, { now }) };
  if (payment.purpose === "PLAN_PURCHASE") return { kind: "PLAN_PURCHASE", result: await fulfilPlanPurchasePayment(tx, payment.id, { now }) };
  return { kind: "SUBSCRIPTION", result: await activateSubscriptionFromPayment(tx, payment.id, { now }) };
}

/** A full refund: the grant a study pack / one-off plan purchase created ends now; subscription refunds go to staff. */
async function afterFullRefund(tx: Tx, payment: LockedPayment, now: Date, audits: AuditEntry[]): Promise<string | null> {
  if (refundRevokesAccess(payment.purpose)) {
    await revokeAccessBoughtBy(tx, payment.id, { now });
    if (payment.beneficiaryUserId !== null) invalidateEntitlements(payment.beneficiaryUserId);
    return null;
  }
  const reason = "Subscription payment refunded: review the subscription period and access.";
  audits.push(systemAudit(payment, PAYMENT_AUDIT_ACTIONS.NEEDS_REVIEW, { metadata: { reason: "subscription_refunded", subscriptionId: payment.subscriptionId } }));
  return reason;
}

async function applyToPayment(tx: Tx, paymentId: string, input: ProviderEventInput, now: Date): Promise<ApplyOutcome & { beneficiaryUserId: string | null }> {
  const payment = await lockPayment(tx, paymentId);
  const at = input.occurredAt ?? now;
  const audits: AuditEntry[] = [];
  const metadataPatch: Record<string, MetadataValue> = { ...(input.metadata ?? {}) };
  if (input.providerStatus.trim() !== "") metadataPatch.providerStatus = input.providerStatus.trim().slice(0, 64);
  const extra: Prisma.PaymentUncheckedUpdateInput = {};
  if (payment.providerPollUrl === null && input.pollUrl) extra.providerPollUrl = input.pollUrl.slice(0, 1024);
  const meta = { provider: input.provider, source: input.source, eventType: input.eventType };

  if (input.disputed) {
    metadataPatch.disputed = true;
    audits.push(systemAudit(payment, PAYMENT_AUDIT_ACTIONS.DISPUTED, { metadata: { ...meta, providerStatus: input.providerStatus } }));
    logger.warn("billing: provider reports a dispute on a payment", { paymentId, provider: input.provider });
  }

  const decision = decideProviderTransition(
    snapshotOf(payment),
    {
      status: input.status,
      amountMinor: input.amountMinor,
      currency: input.currency,
      failureCode: input.failureCode,
      refundedAmountMinor: input.refundedAmountMinor ?? null,
    },
    at,
  );
  const transition = decision.transition;
  let processingError: string | null = null;

  if (decision.amountMismatch) {
    processingError = `Amount mismatch: provider reported ${input.amountMinor ?? "?"} ${input.currency ?? "?"}, payment is ${payment.amountMinor} ${payment.currency}.`;
    audits.push(
      systemAudit(payment, PAYMENT_AUDIT_ACTIONS.AMOUNT_MISMATCH, {
        before: { status: payment.status },
        metadata: { ...meta, expectedMinor: payment.amountMinor, expectedCurrency: payment.currency, reportedMinor: input.amountMinor, reportedCurrency: input.currency },
      }),
    );
    logger.error("billing: provider amount does not match the payment", { paymentId, provider: input.provider, status: payment.status });
  }

  const metadata = mergePaymentMetadata(payment.metadata, metadataPatch);
  const metadataChanged = !sameJson(metadata, payment.metadata);

  if (transition.kind !== "APPLY") {
    if (transition.kind === "REJECTED") {
      processingError ??= transition.message;
      logger.warn("billing: provider event rejected by the payment state machine", { paymentId, reason: transition.reason, provider: input.provider });
    }
    if (metadataChanged || Object.keys(extra).length > 0) {
      await tx.payment.update({ where: { id: paymentId }, data: { ...extra, ...(metadataChanged ? { metadata } : {}) } });
    }
    for (const entry of audits) await auditInTx(tx, entry);
    return {
      outcome: transition.kind === "REJECTED" ? "REJECTED" : "NOOP",
      status: payment.status,
      fulfilment: null,
      processingError,
      beneficiaryUserId: payment.beneficiaryUserId,
    };
  }

  const data: Prisma.PaymentUncheckedUpdateInput = { ...transition.patch, ...extra, metadata };
  if (decision.amountMismatch) data.failureReason = processingError?.slice(0, 500) ?? null;
  if (transition.to === "SUCCESSFUL" && payment.receiptNumber === null) data.receiptNumber = receiptNumberFor(payment.id, at);
  if (payment.paidAt !== null) delete data.paidAt; // write-once (trigger)
  await tx.payment.update({ where: { id: paymentId }, data });
  audits.push(
    systemAudit(payment, PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE, {
      before: { status: transition.from, refundedAmountMinor: payment.refundedAmountMinor },
      after: { status: transition.to, refundedAmountMinor: transition.patch.refundedAmountMinor ?? payment.refundedAmountMinor },
      metadata: { ...meta, alertAdmin: transition.alertAdmin, providerRefund: decision.providerRefund },
    }),
  );

  let fulfilment: FulfilmentResult | null = null;
  if (transition.fulfil) {
    fulfilment = await fulfil(tx, payment, now);
    const review = fulfilmentReview(fulfilment);
    if (review !== null) {
      processingError = `Fulfilment needs review: ${review}`;
      audits.push(systemAudit(payment, PAYMENT_AUDIT_ACTIONS.NEEDS_REVIEW, { metadata: { ...meta, reason: review.slice(0, 200) } }));
    }
    // A first successful payment can qualify the learner's referral (§46): checked by a job, in this transaction.
    await enqueueReferralCheck(payment.beneficiaryUserId ?? payment.payerUserId, { client: tx });
  }
  if (transition.to === "REFUNDED" && transition.from !== "REFUNDED") {
    processingError = (await afterFullRefund(tx, payment, now, audits)) ?? processingError;
  }
  if (transition.alertAdmin) {
    logger.warn("billing: payment change needs staff attention", { paymentId, from: transition.from, to: transition.to, provider: input.provider });
  }
  for (const entry of audits) await auditInTx(tx, entry);
  return { outcome: "APPLIED", status: transition.to, fulfilment, processingError, beneficiaryUserId: payment.beneficiaryUserId };
}

/** Keeps a failed processing attempt on record (processedAt stays NULL so a provider retry reprocesses it). */
async function recordProcessingFailure(input: ProviderEventInput, now: Date, error: unknown): Promise<void> {
  try {
    const paymentId = await findPaymentId(db, input);
    const recorded = await recordPaymentEvent(eventRecord(input, paymentId, now));
    if (recorded.processedAt === null) {
      const code = isAppError(error) ? error.code : error instanceof Error ? error.name : "unknown";
      await db.paymentEvent.update({
        where: { id: recorded.id },
        data: {
          processingError: `Processing failed (${code}); will be retried.`,
          ...(recorded.paymentId === null && paymentId !== null ? { paymentId } : {}),
        },
      });
    }
  } catch (recordError) {
    logger.error("billing: could not record a failed payment event", { provider: input.provider, eventType: input.eventType, err: recordError });
  }
}

/**
 * For an event that already existed (a replay, or a retry of one a crashed attempt left with `processedAt` NULL): takes
 * the event row lock and re-reads it, so concurrent retries of the same event serialise here and only the first one
 * processes it (the others then see `processedAt` and answer DUPLICATE instead of failing on the append-only trigger).
 * A fresh insert needs no lock: a concurrent duplicate INSERT already waits on the unique index until we commit.
 */
async function lockDuplicateEvent(tx: Tx, recorded: RecordedPaymentEvent): Promise<RecordedPaymentEvent> {
  if (!recorded.duplicate) return recorded;
  const [current] = await tx.$queryRaw<{ processedAt: Date | null; paymentId: string | null }[]>`
    SELECT "processedAt", "paymentId" FROM "PaymentEvent" WHERE "id" = ${recorded.id}::uuid FOR UPDATE`;
  return current === undefined ? recorded : { ...recorded, processedAt: current.processedAt, paymentId: current.paymentId };
}

/**
 * Applies one verified provider fact (webhook or our own poll): appends the PaymentEvent, then (unless it is a replay
 * already processed) locks the payment, runs the state machine, fulfils and audits, all in one transaction.
 *
 * @throws on database failure (the event is then stored unprocessed for the retry; nothing was applied)
 */
export async function processProviderEvent(input: ProviderEventInput, options: { now?: Date } = {}): Promise<ProcessedProviderEvent> {
  const now = options.now ?? new Date();
  try {
    const { beneficiaryUserId, ...result } = await db.$transaction(async (tx) => {
      const paymentId = await findPaymentId(tx, input);
      const recorded = await lockDuplicateEvent(tx, await recordPaymentEvent(eventRecord(input, paymentId, now), tx));
      if (recorded.duplicate && recorded.processedAt !== null) {
        const duplicate: ProcessedProviderEvent = {
          outcome: "DUPLICATE",
          eventId: recorded.id,
          paymentId: recorded.paymentId ?? paymentId,
          paymentStatus: null,
          fulfilment: null,
          message: null,
        };
        return { ...duplicate, beneficiaryUserId: null };
      }
      const link = recorded.paymentId === null ? paymentId : null;
      if (paymentId === null) {
        const message = "No payment matches this provider reference.";
        await finishEvent(tx, recorded.id, now, message, null);
        logger.warn("billing: provider event matches no payment", { provider: input.provider, eventType: input.eventType });
        const unmatched: ProcessedProviderEvent = {
          outcome: "UNMATCHED",
          eventId: recorded.id,
          paymentId: null,
          paymentStatus: null,
          fulfilment: null,
          message,
        };
        return { ...unmatched, beneficiaryUserId: null };
      }
      const applied = await applyToPayment(tx, paymentId, input, now);
      await finishEvent(tx, recorded.id, now, applied.processingError, link);
      const processed: ProcessedProviderEvent = {
        outcome: applied.outcome,
        eventId: recorded.id,
        paymentId,
        paymentStatus: applied.status,
        fulfilment: applied.fulfilment,
        message: applied.processingError,
      };
      return { ...processed, beneficiaryUserId: applied.beneficiaryUserId };
    }, TRANSACTION_OPTIONS);
    // Caches were dropped inside the transaction; drop again after COMMIT so no stale read was cached in between.
    if (beneficiaryUserId !== null) invalidateEntitlements(beneficiaryUserId);
    return result;
  } catch (error) {
    await recordProcessingFailure(input, now, error);
    throw error;
  }
}

/**
 * Applies a {@link LocalPaymentAction} to a payment (expiry, payer cancel, superseded checkout, provider unreachable),
 * with its PaymentEvent (source RECONCILIATION) and audit entry. Runs in `tx` when given (checkout), else its own
 * transaction. Returns whether the payment changed and its status afterwards.
 */
export async function applyLocalPaymentAction(
  paymentId: string,
  action: LocalPaymentAction,
  options: { now?: Date; tx?: Tx; reason?: string } = {},
): Promise<{ applied: boolean; status: PaymentStatus }> {
  const now = options.now ?? new Date();
  const run = async (tx: Tx) => {
    const payment = await lockPayment(tx, paymentId);
    const transition = localPaymentTransition(snapshotOf(payment), action, now);
    if (transition.kind !== "APPLY") return { applied: false, status: payment.status, beneficiaryUserId: payment.beneficiaryUserId };
    await tx.payment.update({ where: { id: paymentId }, data: transition.patch });
    if (isPaymentProviderId(payment.provider)) {
      const recorded = await recordPaymentEvent(
        {
          provider: payment.provider,
          providerEventId: syntheticEventId(payment.provider, ["local", action.toLowerCase(), paymentId]),
          source: "RECONCILIATION",
          eventType: `local.${action.toLowerCase()}`,
          providerStatus: action,
          mappedStatus: transition.to,
          signatureValid: true,
          payload: { action, reason: options.reason ?? null },
          paymentId,
          receivedAt: now,
        },
        tx,
      );
      if (recorded.processedAt === null) await finishEvent(tx, recorded.id, now, null, null);
    }
    await auditInTx(
      tx,
      systemAudit(payment, PAYMENT_AUDIT_ACTIONS.STATUS_CHANGE, {
        before: { status: transition.from },
        after: { status: transition.to },
        metadata: { provider: payment.provider, source: "RECONCILIATION", action, failureCode: transition.patch.failureCode ?? null },
      }),
    );
    return { applied: true, status: transition.to, beneficiaryUserId: payment.beneficiaryUserId };
  };
  const { beneficiaryUserId, ...result } = options.tx ? await run(options.tx) : await db.$transaction(run, TRANSACTION_OPTIONS);
  if (result.applied && beneficiaryUserId !== null) invalidateEntitlements(beneficiaryUserId);
  return result;
}

// =====================================================================================================================
// Webhook intake (route handler entry point)
// =====================================================================================================================

export interface WebhookHttpResult {
  status: number;
  /** Safe to send as-is: never contains internals. */
  body: { received: boolean; error?: "not_found" | "payload_too_large" | "invalid_signature" | "processing_failed" };
}

export interface HandleWebhookOptions {
  /** Inject an environment (tests); default `getEnv()`. */
  env?: ServerEnv;
  now?: Date;
  /** Feature flags (a switched-off provider such as Stripe answers 404); default `getFeatures()`. */
  features?: FeatureFlags;
}

/** Authentic but irrelevant: nothing to apply and nothing to link (e.g. a Stripe event type we do not use). */
function isIgnorable(event: VerifiedProviderEvent): boolean {
  return (
    event.status === null &&
    event.disputed !== true &&
    (event.refundedAmountMinor === null || event.refundedAmountMinor === undefined) &&
    event.paymentId === null &&
    event.providerRef === null
  );
}

/**
 * The request body as UTF-8 text (same decoding as `Request.text()`), or `null` once it exceeds `maxBytes`. Reads the
 * stream incrementally, so a chunked body without (or lying about) Content-Length is never buffered past the cap.
 */
export async function readBodyCapped(request: Request, maxBytes: number): Promise<string | null> {
  if (request.body === null) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  return new TextDecoder("utf-8").decode(Buffer.concat(chunks));
}

/** Stores an unauthenticated callback for investigation (rate-limited per source IP; never processed). */
async function recordRejectedWebhook(provider: PaymentProviderId, request: Request, rawBody: string, now: Date): Promise<void> {
  try {
    const ip = clientIpFromHeaders(request.headers);
    const limit = await rateLimit(rateLimits.paymentWebhookRejected(provider, ip));
    if (!limit.allowed) return;
    const bodySha256 = createHash("sha256").update(rawBody).digest("hex");
    await recordPaymentEvent({
      provider,
      providerEventId: syntheticEventId(provider, ["rejected", bodySha256, now.toISOString()]),
      source: "WEBHOOK",
      eventType: "rejected.signature",
      signatureValid: false,
      payload: {
        reason: "signature_invalid",
        bodySha256,
        bodyBytes: rawBody.length,
        contentType: (request.headers.get("content-type") ?? "").slice(0, 100),
      },
      receivedAt: now,
    });
  } catch (error) {
    logger.error("billing: could not record a rejected webhook", { provider, err: error });
  }
}

/**
 * Handles `POST /api/webhooks/payments/[provider]`: verifies the signature/hash over the RAW body, then
 * {@link processProviderEvent}. Responses: 200 `{ received: true }` (processed, duplicate, unmatched or irrelevant),
 * 400 invalid signature, 404 unknown/disabled provider, 413 oversized body, 500 processing failure (the provider
 * retries; the event is kept unprocessed).
 */
export async function handleWebhook(providerName: string, request: Request, options: HandleWebhookOptions = {}): Promise<WebhookHttpResult> {
  const now = options.now ?? new Date();
  const name = providerName.trim().toLowerCase();
  if (!isPaymentProviderId(name)) return { status: 404, body: { received: false, error: "not_found" } };
  let provider: PaymentProvider;
  try {
    // A switched-off provider (features.stripe) looks exactly like a disabled one: 404, nothing read or stored.
    const features = options.features ?? (await getFeatures());
    provider = getProvider(name, { ...(options.env ? { env: options.env } : {}), features });
  } catch (error) {
    if (isAppError(error)) return { status: 404, body: { received: false, error: "not_found" } };
    throw error;
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declared) && declared > MAX_WEBHOOK_BODY_BYTES) {
    return { status: 413, body: { received: false, error: "payload_too_large" } };
  }
  const rawBody = await readBodyCapped(request, MAX_WEBHOOK_BODY_BYTES);
  if (rawBody === null) return { status: 413, body: { received: false, error: "payload_too_large" } };

  const event = await provider.verifyWebhook({ headers: request.headers, rawBody });
  if (event === null) {
    logger.warn("billing: rejected a payment webhook with an invalid signature", { provider: provider.id });
    await recordRejectedWebhook(provider.id, request, rawBody, now);
    return { status: 400, body: { received: false, error: "invalid_signature" } };
  }
  if (isIgnorable(event)) {
    logger.info("billing: ignored an irrelevant payment webhook", { provider: provider.id, eventType: event.eventType });
    return { status: 200, body: { received: true } };
  }
  try {
    const result = await processProviderEvent(providerEventInput(provider.id, "WEBHOOK", event), { now });
    logger.info("billing: payment webhook processed", {
      provider: provider.id,
      eventType: event.eventType,
      outcome: result.outcome,
      paymentId: result.paymentId,
    });
    return { status: 200, body: { received: true } };
  } catch (error) {
    logger.error("billing: payment webhook processing failed", { provider: provider.id, eventType: event.eventType, err: error });
    return { status: 500, body: { received: false, error: "processing_failed" } };
  }
}
