import "server-only";
import { z } from "zod";
import type { PaymentStatus } from "@/generated/prisma/client";
import type { FeatureFlags } from "@/lib/features";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import type { ServerEnv } from "@/server/lib/env";
import { registerJobHandler, registerRecurringJob } from "@/server/lib/jobs";
import { logger } from "@/server/lib/logger";
import { PENDING_PAYMENT_TTL_HOURS } from "./checkout";
import { getProvider, isPaymentProviderId } from "./providers/registry";
import type { PaymentProvider } from "./providers/types";
import { applyLocalPaymentAction, processProviderEvent, type ProcessOutcome } from "./webhooks";

/**
 * Payment reconciliation (ARCHITECTURE §7.4): webhooks get lost (Paynow cannot reach a dev machine, networks fail), so
 * PENDING payments are also confirmed by POLLING the provider from the server, through the same transition path as
 * webhooks (`processProviderEvent`, source POLL: authentic because we asked the provider).
 *
 * - {@link pollPayment}: one poll for one payment (the browser return route uses it; it never fulfils on the return
 *   URL's word, only on the provider's answer).
 * - {@link reconcilePendingPayments}: the `payments.reconcile` job (every {@link PAYMENTS_RECONCILE_EVERY_MINUTES}
 *   min): polls stale PENDING payments, oldest first, and CANCELS (failureCode "expired") those past `expiresAt`
 *   (default {@link PENDING_PAYMENT_TTL_HOURS} h) that the provider still does not report as paid. A verified "paid"
 *   arriving later still wins (CANCELLED -> SUCCESSFUL, admin alerted).
 *
 * Settlement-report reconciliation (Paynow statement upload, daily mismatch report) is a separate, later feature.
 */

export const PAYMENTS_RECONCILE_JOB = "payments.reconcile";
export const PAYMENTS_RECONCILE_EVERY_MINUTES = 10;
/** Payments younger than this are left to the webhook (and the payer's return-page poll). */
export const DEFAULT_RECONCILE_OLDER_THAN_MINUTES = 5;
export const DEFAULT_RECONCILE_LIMIT = 200;
/** Provider polls in flight at once (keeps provider rate limits and the DB pool comfortable). */
const POLL_CONCURRENCY = 4;
const HOUR_MS = 3_600_000;
const uuidSchema = z.uuid();

export interface PollPaymentResult {
  paymentId: string;
  /** Payment status after the poll. */
  status: PaymentStatus;
  /** False when nothing was asked (not pending, no provider reference, provider disabled). */
  polled: boolean;
  outcome: ProcessOutcome | null;
}

export interface PollOptions {
  /** Inject an environment (tests); default `getEnv()`. */
  env?: ServerEnv;
  now?: Date;
  /** Feature flags (a switched-off provider such as Stripe is never asked); default `getFeatures()`. */
  features?: FeatureFlags;
}

function providerFor(name: string, env: ServerEnv | undefined, features: FeatureFlags): PaymentProvider | null {
  if (!isPaymentProviderId(name)) return null;
  try {
    return getProvider(name, { ...(env ? { env } : {}), features });
  } catch {
    return null; // disabled / switched off / not configured here: nothing to ask
  }
}

/**
 * Asks the provider about one PENDING payment and applies the answer.
 *
 * @returns `null` for an unknown or malformed id
 * @throws when the provider call or the database fails (callers log and move on)
 */
export async function pollPayment(paymentId: string, options: PollOptions = {}): Promise<PollPaymentResult | null> {
  if (!uuidSchema.safeParse(paymentId).success) return null;
  const now = options.now ?? new Date();
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    select: { id: true, provider: true, status: true, providerReference: true, providerPollUrl: true },
  });
  if (!payment) return null;
  const idle: PollPaymentResult = { paymentId: payment.id, status: payment.status, polled: false, outcome: null };
  if (payment.status !== "PENDING") return idle;
  if (payment.providerReference === null && payment.providerPollUrl === null) return idle;
  const provider = providerFor(payment.provider, options.env, options.features ?? (await getFeatures()));
  if (provider === null) return idle;

  const answer = await provider.poll({ providerRef: payment.providerReference ?? "", pollUrl: payment.providerPollUrl });
  const processed = await processProviderEvent(
    {
      provider: provider.id,
      source: "POLL",
      providerEventId: answer.providerEventId,
      eventType: `${provider.id}.poll`,
      paymentId: payment.id,
      providerRef: payment.providerReference,
      status: answer.status,
      providerStatus: answer.providerStatus,
      amountMinor: answer.amountMinor,
      currency: answer.currency,
      failureCode: answer.failureCode,
      occurredAt: null,
      disputed: answer.disputed ?? false,
      ...(answer.metadata ? { metadata: answer.metadata } : {}),
      payload: answer.payload,
    },
    { now },
  );
  const status =
    processed.paymentStatus ??
    (await db.payment.findUniqueOrThrow({ where: { id: payment.id }, select: { status: true } })).status;
  return { paymentId: payment.id, status, polled: true, outcome: processed.outcome };
}

export interface ReconcileOptions extends PollOptions {
  /** Only payments created at least this long ago (default {@link DEFAULT_RECONCILE_OLDER_THAN_MINUTES}). */
  olderThanMinutes?: number;
  /** Most payments per run (default {@link DEFAULT_RECONCILE_LIMIT}, max 1000). */
  limit?: number;
  /** Restrict to these payments (targeted runs and tests). */
  paymentIds?: readonly string[];
}

export interface ReconcileResult {
  scanned: number;
  /** Provider asked. */
  polled: number;
  /** No longer PENDING after the poll (paid, failed, cancelled by the provider). */
  updated: number;
  /** CANCELLED by us: still unconfirmed past `expiresAt`. */
  expired: number;
  errors: number;
}

/**
 * The `payments.reconcile` job body: polls stale PENDING payments (oldest first) and expires the ones past their
 * deadline. Idempotent and safe to run concurrently (every change goes through the locked transition path; poll
 * answers are deduplicated by their synthetic event ids).
 */
export async function reconcilePendingPayments(options: ReconcileOptions = {}): Promise<ReconcileResult> {
  const now = options.now ?? new Date();
  const olderThanMinutes = Math.max(0, options.olderThanMinutes ?? DEFAULT_RECONCILE_OLDER_THAN_MINUTES);
  const limit = Math.min(Math.max(1, Math.trunc(options.limit ?? DEFAULT_RECONCILE_LIMIT)), 1000);
  const ids = options.paymentIds;
  if (ids !== undefined && ids.some((id) => !uuidSchema.safeParse(id).success)) throw new RangeError("paymentIds must be uuids");

  // Payment_pending_reconcile_idx (provider, createdAt) WHERE status = 'PENDING'.
  const rows = await db.payment.findMany({
    where: {
      status: "PENDING",
      createdAt: { lte: new Date(now.getTime() - olderThanMinutes * 60_000) },
      ...(ids !== undefined ? { id: { in: [...ids] } } : {}),
    },
    orderBy: { createdAt: "asc" },
    take: limit,
    select: { id: true, provider: true, createdAt: true, expiresAt: true },
  });

  const result: ReconcileResult = { scanned: 0, polled: 0, updated: 0, expired: 0, errors: 0 };
  const reconcileOne = async (row: (typeof rows)[number]): Promise<void> => {
    result.scanned += 1;
    try {
      const poll = await pollPayment(row.id, options.env ? { env: options.env, now } : { now });
      if (poll?.polled) result.polled += 1;
      if (poll && poll.status !== "PENDING") {
        result.updated += 1;
        return;
      }
    } catch (error) {
      result.errors += 1;
      logger.warn("billing: payment poll failed during reconciliation", { paymentId: row.id, provider: row.provider, err: error });
    }
    const expiresAt = row.expiresAt ?? new Date(row.createdAt.getTime() + PENDING_PAYMENT_TTL_HOURS * HOUR_MS);
    if (now.getTime() < expiresAt.getTime()) return;
    try {
      const expired = await applyLocalPaymentAction(row.id, "EXPIRED", { now, reason: "no provider confirmation before expiry" });
      if (expired.applied) result.expired += 1;
    } catch (error) {
      result.errors += 1;
      logger.error("billing: could not expire a pending payment", { paymentId: row.id, err: error });
    }
  };

  for (let i = 0; i < rows.length; i += POLL_CONCURRENCY) {
    await Promise.all(rows.slice(i, i + POLL_CONCURRENCY).map(reconcileOne));
  }
  if (result.scanned > 0) logger.info("billing: payments reconciled", { ...result });
  return result;
}

const reconcilePayloadSchema = z.looseObject({ periodStart: z.iso.datetime().optional() });

/** Job handler body for `payments.reconcile` (exported so the worker or an admin "run now" can call it). */
export function runPaymentsReconcileJob(): Promise<ReconcileResult> {
  return reconcilePendingPayments();
}

/**
 * Registers the `payments.reconcile` handler (payments queue) and its schedule (every
 * {@link PAYMENTS_RECONCILE_EVERY_MINUTES} min). Call once from `src/worker/handlers.ts`.
 */
export function registerPaymentJobs(): void {
  registerJobHandler(PAYMENTS_RECONCILE_JOB, reconcilePayloadSchema, async () => runPaymentsReconcileJob(), {
    queue: "payments",
    maxAttempts: 3,
  });
  registerRecurringJob(PAYMENTS_RECONCILE_JOB, PAYMENTS_RECONCILE_EVERY_MINUTES, PAYMENTS_RECONCILE_JOB, {
    offsetMinutes: 3,
    queue: "payments",
  });
}
