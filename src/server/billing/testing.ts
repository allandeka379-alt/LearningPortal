import "server-only";
import { randomUUID } from "node:crypto";
import type { BillingInterval, Prisma } from "@/generated/prisma/client";
import { NO_ENTITLEMENTS } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { getEnv, type EnvSource, type ServerEnv } from "@/server/lib/env";
import { paynowFieldsHash } from "./providers/paynow";
import { stripeSignatureHeader } from "./providers/stripe";
import type { PaymentProviderId } from "./providers/types";

/**
 * Helpers for the payments integration tests (not used by application code). Test files run in parallel against one
 * shared, never-truncated database: every fixture here is unique, and plans are created non-public so they never show
 * up in other tests' catalogue listings.
 */

export const TEST_APP_URL = "http://localhost:3000";
export const TEST_PAYNOW_INTEGRATION_ID = "12345";
export const TEST_PAYNOW_KEY = "test-paynow-integration-key-0001";
export const TEST_STRIPE_SECRET_KEY = "sk_test_payments_backend_0001";
export const TEST_STRIPE_WEBHOOK_SECRET = "whsec_test_payments_backend_0001";
export const TEST_PAYNOW_GUID = "0f8fad5b-d9cb-469f-a165-70867728950e";
export const TEST_PAYNOW_POLL_URL = `https://www.paynow.co.zw/Interface/CheckPayment/?guid=${TEST_PAYNOW_GUID}`;

/** An environment with sandbox, Paynow and Stripe enabled (test keys). */
export function paymentsTestEnv(overrides: EnvSource = {}): ServerEnv {
  return getEnv({
    ...process.env,
    NODE_ENV: "test",
    APP_URL: TEST_APP_URL,
    PAYMENTS_ENABLED_PROVIDERS: "sandbox,paynow,stripe",
    PAYNOW_INTEGRATION_ID: TEST_PAYNOW_INTEGRATION_ID,
    PAYNOW_INTEGRATION_KEY: TEST_PAYNOW_KEY,
    STRIPE_SECRET_KEY: TEST_STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: TEST_STRIPE_WEBHOOK_SECRET,
    ...overrides,
  });
}

/** Entitlements of the test paid plan: clearly above any FREE plan (full lessons, mock exams, unlimited practice). */
export const PAID_PLAN_ENTITLEMENTS = { ...NO_ENTITLEMENTS, lessonAccess: "ALL", mockExams: true, practiceQuestionsPerDay: null };

function uniquePlanCode(): string {
  return `T${randomUUID().replace(/-/g, "").slice(0, 14).toUpperCase()}`;
}

export interface PaidPlanOptions {
  amountMinor?: number;
  currency?: string;
  interval?: BillingInterval;
  periodDays?: number | null;
  countryId?: string | null;
}

/** A non-public INDIVIDUAL plan with one current price (default USD 5.00 per month). */
export async function createPaidPlan(options: PaidPlanOptions = {}) {
  const code = uniquePlanCode();
  const plan = await db.plan.create({
    data: { code, name: `Test plan ${code}`, audience: "INDIVIDUAL", isPublic: false, entitlements: PAID_PLAN_ENTITLEMENTS },
    select: { id: true, code: true, name: true },
  });
  const price = await db.planPrice.create({
    data: {
      planId: plan.id,
      currency: options.currency ?? "USD",
      amountMinor: options.amountMinor ?? 500,
      interval: options.interval ?? "MONTH",
      periodDays: options.periodDays ?? null,
      countryId: options.countryId ?? null,
    },
    select: { id: true, amountMinor: true, currency: true },
  });
  return { plan, price };
}

export interface PendingPaymentOptions {
  provider: PaymentProviderId;
  payerUserId: string;
  beneficiaryUserId: string;
  planId: string;
  planPriceId: string;
  amountMinor?: number;
  currency?: string;
  providerReference?: string | null;
  providerPollUrl?: string | null;
  createdAt?: Date;
  expiresAt?: Date | null;
  metadata?: Prisma.InputJsonValue;
}

/** A PENDING checkout subscription plus its PENDING payment (what startCheckout leaves behind). */
export async function createPendingPayment(options: PendingPaymentOptions) {
  const subscription = await db.subscription.create({
    data: { planId: options.planId, planPriceId: options.planPriceId, holderUserId: options.beneficiaryUserId, status: "PENDING" },
    select: { id: true },
  });
  const amountMinor = options.amountMinor ?? 500;
  const payment = await db.payment.create({
    data: {
      purpose: "SUBSCRIPTION",
      provider: options.provider,
      payerUserId: options.payerUserId,
      beneficiaryUserId: options.beneficiaryUserId,
      subscriptionId: subscription.id,
      planPriceId: options.planPriceId,
      amountMinor,
      currency: options.currency ?? "USD",
      listAmountMinor: amountMinor,
      idempotencyKey: randomUUID(),
      providerReference: options.providerReference ?? null,
      providerPollUrl: options.providerPollUrl ?? null,
      expiresAt: options.expiresAt === undefined ? new Date(Date.now() + 24 * 3_600_000) : options.expiresAt,
      ...(options.createdAt ? { createdAt: options.createdAt } : {}),
      ...(options.metadata !== undefined ? { metadata: options.metadata } : {}),
    },
    select: { id: true },
  });
  return { subscription, payment };
}

/** A Paynow status message (result-URL post or poll answer) with a valid hash. */
export function paynowMessage(fields: [string, string][], key: string = TEST_PAYNOW_KEY): string {
  return new URLSearchParams([...fields, ["hash", paynowFieldsHash(fields, key)]]).toString();
}

/** Paynow status-update fields for a payment (defaults: Paid, 5.00, the test poll URL). */
export function paynowUpdate(paymentId: string, overrides: Record<string, string> = {}): [string, string][] {
  return Object.entries({
    reference: paymentId,
    paynowreference: String(100_000 + Math.floor(Math.random() * 899_999)),
    amount: "5.00",
    status: "Paid",
    pollurl: TEST_PAYNOW_POLL_URL,
    ...overrides,
  });
}

export function paynowWebhookRequest(body: string): Request {
  return new Request(`${TEST_APP_URL}/api/webhooks/payments/paynow`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded", "x-forwarded-for": randomIp() },
    body,
  });
}

/** A Stripe event envelope. */
export function stripeEvent(type: string, object: Record<string, unknown>, createdSeconds = Math.floor(Date.now() / 1000)) {
  return { id: `evt_${randomUUID().replace(/-/g, "")}`, object: "event", type, created: createdSeconds, data: { object } };
}

/** A Checkout Session object for `paymentId` (paid by default). */
export function stripeSession(paymentId: string, sessionId: string, overrides: Record<string, unknown> = {}) {
  return {
    id: sessionId,
    object: "checkout.session",
    status: "complete",
    payment_status: "paid",
    amount_total: 500,
    currency: "usd",
    client_reference_id: paymentId,
    metadata: { paymentId },
    payment_intent: `pi_${sessionId.slice(3)}`,
    ...overrides,
  };
}

export function stripeWebhookRequest(
  event: unknown,
  options: { secret?: string; timestampSeconds?: number } = {},
): Request {
  const rawBody = JSON.stringify(event);
  const header = stripeSignatureHeader(
    options.secret ?? TEST_STRIPE_WEBHOOK_SECRET,
    rawBody,
    options.timestampSeconds ?? Math.floor(Date.now() / 1000),
  );
  return new Request(`${TEST_APP_URL}/api/webhooks/payments/stripe`, {
    method: "POST",
    headers: { "content-type": "application/json", "stripe-signature": header, "x-forwarded-for": randomIp() },
    body: rawBody,
  });
}

/** A random private IPv4 address, so IP-keyed rate limits never collide between parallel tests. */
export function randomIp(): string {
  const byte = () => Math.floor(Math.random() * 254) + 1;
  return `10.${byte()}.${byte()}.${byte()}`;
}

/** Audit rows written for one payment, oldest first. */
export function paymentAudit(paymentId: string) {
  return db.auditLog.findMany({
    where: { entityType: "Payment", entityId: paymentId },
    orderBy: { createdAt: "asc" },
    select: { action: true, actorUserId: true, before: true, after: true, metadata: true },
  });
}
