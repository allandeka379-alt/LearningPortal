import { createHash } from "node:crypto";
import { z } from "zod";
import type { PaymentStatus } from "@/generated/prisma/client";
import type { PaymentProvider as PaymentProviderName } from "@/server/lib/env";

/**
 * Payment provider contract (§32 "payment abstraction supporting multiple providers"; ARCHITECTURE §7.1) and the pure
 * payment state machine (§32 states; ARCHITECTURE §7.2).
 *
 * Adding a provider (Paynow, Stripe, other African mobile money, §53) = implement {@link PaymentProvider} in
 * `src/server/billing/providers/<id>.ts` and register its factory in `./registry.ts`. Nothing else changes.
 *
 * Rules every adapter follows:
 * - Amounts are integer minor units and ISO 4217 upper-case currencies. The amount and currency of a payment always
 *   come from OUR `Payment` row; adapters report what the provider says and {@link transitionPayment} compares them.
 * - `createCheckout` is idempotent per `paymentId` (the same payment never opens two provider transactions).
 * - `verifyWebhook` NEVER throws: it returns `null` for anything it cannot authenticate (bad signature, stale
 *   timestamp, malformed body). Unverified callbacks are never processed.
 * - Every webhook/poll result carries a stable `providerEventId` (synthetic via {@link syntheticEventId} when the
 *   provider sends none, e.g. Paynow) so `PaymentEvent` stays idempotent (unique among signature-valid rows).
 * - Payloads returned to callers are already free of secrets; callers still pass them through `redact()` before storage.
 *
 * Pure module (no I/O): safe for unit tests and the worker.
 */

/** Provider keys (stored in `Payment.provider` / `PaymentEvent.provider`). Mirrors `PAYMENTS_ENABLED_PROVIDERS`. */
export type PaymentProviderId = PaymentProviderName;

/**
 * Payment method keys within a provider (`Payment.method`, VarChar 32). Free-form in the database so a provider can add
 * methods without a migration; these are the ones the platform knows how to present.
 */
export const KNOWN_PAYMENT_METHODS = ["ecocash", "onemoney", "innbucks", "zimswitch", "card", "bank_transfer", "sandbox"] as const;
export type PaymentMethod = (typeof KNOWN_PAYMENT_METHODS)[number];

/** Mobile-money methods complete with a USSD/push prompt on the payer's phone rather than a browser redirect. */
export const MOBILE_MONEY_METHODS: ReadonlySet<PaymentMethod> = new Set<PaymentMethod>(["ecocash", "onemoney", "innbucks"]);

const CURRENCY_PATTERN = /^[A-Z]{3}$/;

/** True for an ISO 4217-shaped, upper-case currency code (`USD`, `ZWG`, `ZAR`). */
export function isCurrencyCode(value: string): boolean {
  return CURRENCY_PATTERN.test(value);
}

/**
 * Client `Idempotency-Key` for "start checkout" (ARCHITECTURE §7.3): 16-64 URL-safe characters, typically a UUID
 * generated when the checkout form renders. Stored in `Payment.idempotencyKey`, unique per payer
 * (`@@unique([payerUserId, idempotencyKey])`): a double tap or a retry on a flaky network must return the SAME
 * Payment (on a P2002 for that index, load and return the existing row instead of failing).
 */
export const idempotencyKeySchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z0-9_-]{16,64}$/, { error: "Invalid idempotency key." });

// ---------------------------------------------------------------------------------------------------------------------
// Adapter interface (ARCHITECTURE §7.1)
// ---------------------------------------------------------------------------------------------------------------------

export interface CheckoutRequest {
  /** Our `Payment.id`; also the provider-side merchant reference. */
  paymentId: string;
  /** From our Payment row (after discount). Integer minor units, > 0. */
  amountMinor: number;
  /** ISO 4217 upper-case. */
  currency: string;
  /** Short line shown by the provider, e.g. "Student plan - 1 month". No PII. */
  description: string;
  /** Contact details the provider needs (mobile money needs the wallet number). Never logged. */
  payer: { email?: string; phone?: string };
  method?: PaymentMethod;
  /** Absolute URL the payer returns to (the return page only polls; it never fulfils). */
  returnUrl: string;
  /** Absolute URL of our webhook for this provider. */
  webhookUrl: string;
}

export type CheckoutResult =
  | { kind: "redirect"; url: string; providerRef: string; pollUrl?: string }
  | { kind: "mobile_prompt"; instructions: string; providerRef: string; pollUrl?: string };

/** What a provider says about a payment, normalised. `PENDING` is informational (no state change). */
export const PROVIDER_PAYMENT_STATUSES = ["PENDING", "PAID", "FAILED", "CANCELLED", "REFUNDED"] as const;
export type ProviderPaymentStatus = (typeof PROVIDER_PAYMENT_STATUSES)[number];

/** Raw inbound webhook as received by the route handler (read the body ONCE as text: signatures cover the bytes). */
export interface WebhookRequest {
  headers: Headers;
  rawBody: string;
}

/** An authenticated provider event (webhook) ready to be stored as a `PaymentEvent` and applied. */
export interface VerifiedProviderEvent {
  /** Stable, unique per provider (synthetic when the provider sends none). */
  providerEventId: string;
  /** Provider event type, e.g. "payment.status" or "paynow.status_update" (VarChar 64). */
  eventType: string;
  /** Our `Payment.id` echoed back by the provider, when it does. */
  paymentId: string | null;
  /** Provider transaction reference (`Payment.providerReference`), when known. */
  providerRef: string | null;
  /** Normalised status; `null` = informational event. */
  status: ProviderPaymentStatus | null;
  /** Raw provider status string (VarChar 64). */
  providerStatus: string;
  /** Amount/currency the provider reports (compared with our Payment row; mismatch => manual review). */
  amountMinor: number | null;
  currency: string | null;
  /** Normalised failure code for FAILED/CANCELLED ("declined", "insufficient_funds", ...). */
  failureCode: string | null;
  occurredAt: Date | null;
  /** Provider payload WITHOUT secrets (callers still `redact()` it before storage). */
  payload: Record<string, unknown>;
  /**
   * The provider reports a dispute / chargeback (Paynow "Disputed", Stripe `charge.dispute.created`). The payment keeps
   * its state; processing flags it in `Payment.metadata` and writes an audit entry for staff. Optional (default false).
   */
  disputed?: boolean;
  /**
   * Cumulative amount the provider has refunded so far (minor units), when it reports one (Stripe `amount_refunded`).
   * Lets processing record partial refunds; `null`/absent = unknown (a `REFUNDED` status then means a full refund).
   */
  refundedAmountMinor?: number | null;
  /** Status-poll URL carried by the event (Paynow result posts), already validated by the adapter. */
  pollUrl?: string | null;
  /** Flat, secret-free support details merged into `Payment.metadata` (e.g. `{ paynowReference }`). */
  metadata?: Record<string, string | number | boolean>;
}

/** Result of a server-side status poll (authentic by construction: we asked the provider). */
export interface ProviderPollResult {
  /** Synthetic, stable per (reference, status): replays of the same status are idempotent. */
  providerEventId: string;
  status: ProviderPaymentStatus;
  providerStatus: string;
  amountMinor: number | null;
  currency: string | null;
  failureCode: string | null;
  payload: Record<string, unknown>;
  /** See {@link VerifiedProviderEvent.disputed}. Optional (default false). */
  disputed?: boolean;
  /** See {@link VerifiedProviderEvent.metadata}. */
  metadata?: Record<string, string | number | boolean>;
}

export interface RefundRequest {
  providerRef: string;
  /** Integer minor units, > 0, <= the amount still refundable (checked by the caller with {@link transitionPayment}). */
  amountMinor: number;
  currency: string;
  /** Staff reason (no PII). */
  reason: string;
}

export interface RefundResult {
  /** `MANUAL_REQUIRED`: the provider has no refund API (Paynow); staff refund out of band and record it. */
  status: "REFUNDED" | "PENDING" | "MANUAL_REQUIRED";
  providerRef?: string;
}

/** A payment provider adapter (ARCHITECTURE §7.1). */
export interface PaymentProvider {
  readonly id: PaymentProviderId;
  /** Human label for checkout method pickers (UI copy, not a brand claim). */
  readonly displayName: string;
  supports(currency: string, method?: PaymentMethod): boolean;
  createCheckout(input: CheckoutRequest): Promise<CheckoutResult>;
  /** `null` = reject (unauthenticated or malformed). Never throws. */
  verifyWebhook(request: WebhookRequest): Promise<VerifiedProviderEvent | null>;
  poll(payment: { providerRef: string; pollUrl?: string | null }): Promise<ProviderPollResult>;
  refund(input: RefundRequest): Promise<RefundResult>;
}

/**
 * Deterministic event id for providers that send none (Paynow): `sha256(provider | parts...)`, hex. Include the
 * provider reference AND the status so each distinct status update is its own event while replays collide.
 */
export function syntheticEventId(provider: PaymentProviderId, parts: readonly string[]): string {
  if (parts.length === 0) throw new RangeError("syntheticEventId needs at least one part");
  return createHash("sha256").update([provider, ...parts].join("\u001f")).digest("hex");
}

/** `PaymentEvent.mappedStatus` for a provider status (`PENDING` is informational => `null`). */
export function mapProviderStatus(status: ProviderPaymentStatus | null): PaymentStatus | null {
  switch (status) {
    case "PAID":
      return "SUCCESSFUL";
    case "FAILED":
      return "FAILED";
    case "CANCELLED":
      return "CANCELLED";
    case "REFUNDED":
      return "REFUNDED";
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// Payment state machine (§32: PENDING -> SUCCESSFUL | FAILED | CANCELLED; SUCCESSFUL -> REFUNDED)
// ---------------------------------------------------------------------------------------------------------------------

/**
 * Legal status changes, mirroring the `Payment_guard` trigger (defence in depth): PENDING -> any; a late VERIFIED
 * "paid" moves FAILED/CANCELLED -> SUCCESSFUL (money was received); SUCCESSFUL -> REFUNDED. Nothing else leaves a
 * terminal state.
 */
export function canTransitionPayment(from: PaymentStatus, to: PaymentStatus): boolean {
  if (from === to) return false;
  if (from === "PENDING") return true;
  if ((from === "FAILED" || from === "CANCELLED") && to === "SUCCESSFUL") return true;
  return from === "SUCCESSFUL" && to === "REFUNDED";
}

/** The parts of a `Payment` row the state machine reads. */
export interface PaymentSnapshot {
  status: PaymentStatus;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
}

/** Inputs to {@link transitionPayment}. */
export type PaymentStateEvent =
  /** A provider webhook or poll result. `verified` = signature checked / server-side poll / staff / reconciliation. */
  | {
      type: "PROVIDER_STATUS";
      status: ProviderPaymentStatus;
      verified: boolean;
      amountMinor: number | null;
      currency: string | null;
      failureCode?: string | null;
      at: Date;
    }
  /** The payer cancelled on our side (before paying). */
  | { type: "USER_CANCELLED"; at: Date }
  /** No confirmation within the window (default 24 h, `payments.reconcile`): CANCELLED with code "expired". */
  | { type: "EXPIRED"; at: Date }
  /** A refund executed (provider API or staff-recorded manual refund) for `amountMinor`. */
  | { type: "REFUND_RECORDED"; amountMinor: number; at: Date };

/** Columns to write on the `Payment` row (only the ones that change). */
export interface PaymentPatch {
  status?: PaymentStatus;
  paidAt?: Date;
  failedAt?: Date;
  cancelledAt?: Date;
  failureCode?: string;
  refundedAmountMinor?: number;
  refundedAt?: Date;
}

export type PaymentRejection = "UNVERIFIED" | "AMOUNT_MISMATCH" | "AMOUNT_UNKNOWN" | "INVALID_REFUND" | "ILLEGAL";

export type PaymentTransition =
  /** Write `patch`. `to` may equal `from` (partial refund). */
  | {
      kind: "APPLY";
      from: PaymentStatus;
      to: PaymentStatus;
      patch: PaymentPatch;
      /** Run fulfilment (subscription period / study-pack grant) once, under the row lock. */
      fulfil: boolean;
      /** Late "paid" after FAILED/CANCELLED, or a provider-side refund we did not initiate: alert an admin. */
      alertAdmin: boolean;
    }
  /** Nothing to do (duplicate, informational, already in that state). Mark the event processed. */
  | { kind: "NOOP"; reason: string }
  /** Do not apply. Store the event with `processingError` and route to manual review. */
  | { kind: "REJECTED"; reason: PaymentRejection; message: string };

const FAILURE_CODE_PATTERN = /^[a-z0-9_]{1,64}$/;

function normaliseFailureCode(code: string | null | undefined, fallback: string): string {
  const cleaned = code?.trim().toLowerCase().replace(/[^a-z0-9_]+/g, "_").slice(0, 64);
  return cleaned && FAILURE_CODE_PATTERN.test(cleaned) ? cleaned : fallback;
}

function apply(
  from: PaymentStatus,
  to: PaymentStatus,
  patch: PaymentPatch,
  flags: { fulfil?: boolean; alertAdmin?: boolean } = {},
): PaymentTransition {
  return { kind: "APPLY", from, to, patch, fulfil: flags.fulfil ?? false, alertAdmin: flags.alertAdmin ?? false };
}

/**
 * Pure payment state machine (ARCHITECTURE §7.2). Decides what an event does to a payment; the caller holds the
 * `SELECT ... FOR UPDATE` lock on the Payment row, appends the `PaymentEvent`, writes `patch` and runs fulfilment when
 * `fulfil` is true (fulfilment itself is idempotent via `Payment.fulfilledAt`).
 *
 * - Unverified events are rejected (stored for investigation, never applied).
 * - A verified "paid" must report the SAME amount and currency as our row, else manual review.
 * - A verified "paid" always wins: FAILED/CANCELLED -> SUCCESSFUL (fulfils and alerts an admin).
 * - Refunds only accumulate; a full refund makes the payment REFUNDED, a partial one keeps it SUCCESSFUL.
 */
export function transitionPayment(payment: PaymentSnapshot, event: PaymentStateEvent): PaymentTransition {
  const from = payment.status;

  if (event.type === "USER_CANCELLED" || event.type === "EXPIRED") {
    if (from !== "PENDING") return { kind: "NOOP", reason: `payment is ${from}` };
    const code = event.type === "EXPIRED" ? "expired" : "user_cancelled";
    return apply(from, "CANCELLED", { status: "CANCELLED", cancelledAt: event.at, failureCode: code });
  }

  if (event.type === "REFUND_RECORDED") {
    if (from !== "SUCCESSFUL") {
      return { kind: "REJECTED", reason: "INVALID_REFUND", message: `Only a successful payment can be refunded (it is ${from}).` };
    }
    const remaining = payment.amountMinor - payment.refundedAmountMinor;
    if (!Number.isInteger(event.amountMinor) || event.amountMinor <= 0 || event.amountMinor > remaining) {
      return {
        kind: "REJECTED",
        reason: "INVALID_REFUND",
        message: `Refund amount must be a whole number between 1 and ${remaining} minor units.`,
      };
    }
    const total = payment.refundedAmountMinor + event.amountMinor;
    const full = total === payment.amountMinor;
    return apply(from, full ? "REFUNDED" : "SUCCESSFUL", {
      ...(full ? { status: "REFUNDED" as const } : {}),
      refundedAmountMinor: total,
      refundedAt: event.at,
    });
  }

  // PROVIDER_STATUS
  if (!event.verified) {
    return { kind: "REJECTED", reason: "UNVERIFIED", message: "Unverified provider event; stored for investigation only." };
  }

  switch (event.status) {
    case "PENDING":
      return { kind: "NOOP", reason: "provider reports the payment as pending" };

    case "PAID": {
      if (from === "SUCCESSFUL" || from === "REFUNDED") return { kind: "NOOP", reason: `payment already ${from}` };
      if (event.amountMinor === null || event.currency === null) {
        return { kind: "REJECTED", reason: "AMOUNT_UNKNOWN", message: "Provider did not report the paid amount and currency." };
      }
      if (event.amountMinor !== payment.amountMinor || event.currency.toUpperCase() !== payment.currency) {
        return {
          kind: "REJECTED",
          reason: "AMOUNT_MISMATCH",
          message: "Provider amount or currency does not match the payment; manual review required.",
        };
      }
      const late = from === "FAILED" || from === "CANCELLED";
      return apply(from, "SUCCESSFUL", { status: "SUCCESSFUL", paidAt: event.at }, { fulfil: true, alertAdmin: late });
    }

    case "FAILED":
      if (from !== "PENDING") return { kind: "NOOP", reason: `payment is ${from}` };
      return apply(from, "FAILED", {
        status: "FAILED",
        failedAt: event.at,
        failureCode: normaliseFailureCode(event.failureCode, "declined"),
      });

    case "CANCELLED":
      if (from !== "PENDING") return { kind: "NOOP", reason: `payment is ${from}` };
      return apply(from, "CANCELLED", {
        status: "CANCELLED",
        cancelledAt: event.at,
        failureCode: normaliseFailureCode(event.failureCode, "provider_cancelled"),
      });

    case "REFUNDED": {
      if (from === "REFUNDED") return { kind: "NOOP", reason: "payment already refunded" };
      if (from !== "SUCCESSFUL") {
        return { kind: "REJECTED", reason: "ILLEGAL", message: `Provider reports a refund for a ${from} payment.` };
      }
      // A provider-side full refund (e.g. a card dispute settled at the provider): record it and alert staff.
      return apply(
        from,
        "REFUNDED",
        { status: "REFUNDED", refundedAmountMinor: payment.amountMinor, refundedAt: event.at },
        { alertAdmin: true },
      );
    }
  }
}
