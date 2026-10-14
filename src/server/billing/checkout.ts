import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { Prisma, type BillingInterval, type PaymentPurpose, type PaymentStatus } from "@/generated/prisma/client";
import { APP_NAME } from "@/lib/config";
import { DEFAULT_TIMEZONE } from "@/lib/dates";
import type { FeatureFlags } from "@/lib/features";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import { hmacSha256 } from "@/server/lib/crypto";
import type { Tx } from "@/server/lib/db-context";
import { getEnv, isProd, type ServerEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertRateLimit, RATE_LIMIT_PRESETS, rateLimits } from "@/server/lib/rate-limit";
import { LIVE_SUBSCRIPTION_STATUSES } from "./entitlements";
import { getCheckoutPrice, isPriceCurrent, type PlanPriceView } from "./plans";
import { planChangeBlockedUntil } from "./subscriptions";
import { PAYNOW_MOBILE_METHODS } from "./providers/paynow";
import { getProvider } from "./providers/registry";
import { simulateSandboxPayment, type SandboxOutcome } from "./providers/sandbox";
import { ownsLifetimePlan } from "./purchases";
import {
  MOBILE_MONEY_METHODS,
  idempotencyKeySchema,
  type CheckoutResult,
  type PaymentMethod,
  type PaymentProvider,
} from "./providers/types";
import { applyLocalPaymentAction, handleWebhook, mergePaymentMetadata } from "./webhooks";

/**
 * Checkout (§31, §32, §24; ARCHITECTURE §7.1-7.3): turns "I want this plan / study pack, paid with this provider" into a
 * PENDING Payment and a provider checkout (browser redirect or mobile-money prompt).
 *
 * Rules:
 * - The amount ALWAYS comes from the database (PlanPrice of an active plan / published study pack, inside its validity
 *   window, for the buyer's country); a client never supplies an amount.
 * - Payer and beneficiary may differ: a parent pays for a child they hold an ACTIVE link to (§53 B2C). School (B2B)
 *   purchases are not self-service here.
 * - One open checkout per payer + beneficiary + item (plan / pack): a FRESH pending payment with the same price,
 *   provider and method is reused (the stored redirect URL / instructions are returned, no second provider
 *   transaction); older or different pending ones are CANCELLED as "superseded" (a late verified "paid" still wins).
 *   Serialised per item with a transaction-scoped advisory lock, so a double tap cannot create two payments. A client
 *   `idempotencyKey` (unique per payer) returns the same payment on retry.
 * - Subscription purchases attach to the beneficiary's live subscription (renewal) or to a PENDING checkout
 *   subscription created here. A different plan is refused (CONFLICT) while the live plan's prepaid period runs, so it
 *   never takes over time paid for at another price (PAY-2, `planChangeBlockedUntil`); during a trial, grace or after
 *   the period it switches at payment time (no proration). Renewals are new checkouts: both providers share the
 *   prepaid-period model (see providers/stripe.ts).
 * - A ONE_OFF plan price (owner decision 2026-10-07: "Full access", pay once, keep it) is a PLAN_PURCHASE: no
 *   subscription; fulfilment grants the plan (./purchases.ts). It is paid through Paynow only (EcoCash / OneMoney mobile
 *   prompt, cards on the Paynow page; the sandbox outside production), and a beneficiary who already owns lifetime
 *   access to the plan cannot buy it again (CONFLICT, re-checked under the checkout lock; the database allows one
 *   lifetime purchase per user and plan).
 * - Providers must be enabled (`PAYMENTS_ENABLED_PROVIDERS`) and implemented; the sandbox is refused in production.
 *   Rate-limited per payer.
 *
 * Fulfilment never happens here: only a verified webhook or our own poll moves the payment (./webhooks.ts).
 */

export const CHECKOUT_RETURN_PATH = "/billing/return";
export const CHECKOUT_RESULT_PATH = "/app/billing/result";
export const PAYMENT_WEBHOOK_PATH_PREFIX = "/api/webhooks/payments";
/** PENDING payments not confirmed by then are CANCELLED (expired) by `payments.reconcile`. */
export const PENDING_PAYMENT_TTL_HOURS = 24;
/** A pending browser checkout younger than this is reused instead of opening a new one. */
export const REDIRECT_CHECKOUT_REUSE_MINUTES = 30;
/** Mobile-money prompts time out on the phone quickly: after this a retry sends a new prompt. */
export const MOBILE_CHECKOUT_REUSE_MINUTES = 3;
/** Innbucks uses a generated authorization code rather than a push prompt; keep it reusable for the usual code window. */
export const INNBUCKS_CODE_REUSE_MINUTES = 10;
/** A pending payment whose provider call never completed is treated as abandoned after this. */
const PREPARING_STALE_MINUTES = 2;
/** Defaults of the `checkout` rate-limit preset (tunable via the `rateLimits` setting). */
export const CHECKOUT_RATE_LIMIT = RATE_LIMIT_PRESETS.checkout;

const MINUTE_MS = 60_000;
const UNAVAILABLE = "That payment method is not available. Please choose another one.";
/** Providers that take one-off plan purchases (owner decision 2026-10-07: Paynow only; the sandbox is dev/test only). */
export const PLAN_PURCHASE_PROVIDERS: ReadonlySet<string> = new Set(["paynow", "sandbox"]);
export const ALREADY_OWNED_MESSAGE = "This account already has full access. There is nothing more to pay.";

// =====================================================================================================================
// Pure helpers (unit-tested)
// =====================================================================================================================

/** E.164 Zimbabwe mobile number (+2637XXXXXXXX) from local "07…", "2637…" or "+2637…" input; `null` otherwise. */
export function normaliseZimbabweMobile(input: string | null | undefined): string | null {
  const compact = (input ?? "").replace(/[\s().-]/g, "");
  if (/^\+2637\d{8}$/.test(compact)) return compact;
  if (/^2637\d{8}$/.test(compact)) return `+${compact}`;
  if (/^07\d{8}$/.test(compact)) return `+263${compact.slice(1)}`;
  return null;
}

/** Display form of a wallet number that never reveals it: "+263771234567" -> "+263 77* *** 567". */
export function maskMsisdn(e164: string): string {
  const national = e164.replace(/^\+263/, "");
  return `+263 ${national.slice(0, 2)}* *** ${national.slice(-3)}`;
}

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

/** Human period of a price for the provider's line item: "1 month", "3 months", "1 term", "90 days". */
export function describePeriod(price: { interval: BillingInterval; intervalCount: number; periodDays: number | null }): string {
  switch (price.interval) {
    case "WEEK":
      return plural(price.intervalCount, "week");
    case "MONTH":
      return plural(price.intervalCount, "month");
    case "YEAR":
      return plural(price.intervalCount, "year");
    case "TERM":
      return plural(price.intervalCount, "term");
    case "ONE_OFF":
      return price.periodDays === null ? "one-off" : plural(price.periodDays, "day");
  }
}

/** Minutes a pending checkout stays reusable for this method. */
export function reuseWindowMinutes(method: string | null | undefined): number {
  if (method === "innbucks") return INNBUCKS_CODE_REUSE_MINUTES;
  return method && MOBILE_MONEY_METHODS.has(method as PaymentMethod) ? MOBILE_CHECKOUT_REUSE_MINUTES : REDIRECT_CHECKOUT_REUSE_MINUTES;
}

/** What a stored checkout looks like in `Payment.metadata` (written once the provider answered). */
export function storedCheckout(metadata: unknown): { kind: "redirect"; url: string } | { kind: "mobile"; instructions: string } | null {
  if (typeof metadata !== "object" || metadata === null || Array.isArray(metadata)) return null;
  const record = metadata as Record<string, unknown>;
  if (record.checkoutKind === "redirect" && typeof record.checkoutUrl === "string") return { kind: "redirect", url: record.checkoutUrl };
  if (record.checkoutKind === "mobile_prompt" && typeof record.instructions === "string") {
    return { kind: "mobile", instructions: record.instructions };
  }
  return null;
}

// =====================================================================================================================
// Input / output
// =====================================================================================================================

const startCheckoutSchema = z
  .object({
    /** The authenticated payer (resolved by the route from the session). */
    userId: z.uuid(),
    /** Whose plan / pack it is: the payer (default) or a child on an ACTIVE parent link. */
    beneficiaryUserId: z.uuid().optional(),
    /**
     * What is bought. "SUBSCRIPTION" and "PLAN_PURCHASE" both mean "a plan price": the price decides (ONE_OFF prices are
     * one-off purchases, renewable intervals subscriptions), so older clients keep working.
     */
    purpose: z.enum(["SUBSCRIPTION", "PLAN_PURCHASE", "STUDY_PACK"]),
    planPriceId: z.uuid().optional(),
    studyPackId: z.uuid().optional(),
    provider: z.string().trim().toLowerCase().min(1).max(32),
    /** Paynow mobile express checkout (EcoCash / OneMoney); the sandbox simulates it too. */
    paynowMethod: z.enum(PAYNOW_MOBILE_METHODS).optional(),
    /** Wallet number for mobile money ("0771234567" or "+263771234567"). */
    phone: z.string().trim().max(32).optional(),
    /** Client Idempotency-Key from the checkout form (a retry returns the same payment). */
    idempotencyKey: idempotencyKeySchema.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.purpose !== "STUDY_PACK") {
      if (!value.planPriceId) ctx.addIssue({ code: "custom", path: ["planPriceId"], message: "Choose a plan price." });
      if (value.studyPackId) ctx.addIssue({ code: "custom", path: ["studyPackId"], message: "Not used for a plan purchase." });
    }
    if (value.purpose === "STUDY_PACK" && !value.studyPackId) {
      ctx.addIssue({ code: "custom", path: ["studyPackId"], message: "Choose a study pack." });
    }
    if (value.paynowMethod && !value.phone) {
      ctx.addIssue({ code: "custom", path: ["phone"], message: "Enter the mobile number to charge." });
    }
  });

export type StartCheckoutInput = z.input<typeof startCheckoutSchema>;

export type StartCheckoutResult =
  | { kind: "redirect"; url: string; paymentId: string; reused: boolean }
  | { kind: "mobile"; instructions: string; paymentId: string; reused: boolean };

export interface CheckoutOptions {
  /** Inject an environment (tests); default `getEnv()`. */
  env?: ServerEnv;
  now?: Date;
  /** Feature flags (dormant providers such as Stripe need theirs on); default `getFeatures()`. */
  features?: FeatureFlags;
}

interface CheckoutItem {
  purpose: Extract<PaymentPurpose, "SUBSCRIPTION" | "PLAN_PURCHASE" | "STUDY_PACK">;
  /** Plan id (subscriptions) or study pack id: the "one open checkout" key. */
  itemId: string;
  planId: string | null;
  studyPackId: string | null;
  price: PlanPriceView;
  description: string;
}

interface Beneficiary {
  id: string;
  countryId: string | null;
}

// =====================================================================================================================
// Item resolution
// =====================================================================================================================

async function loadBeneficiary(payerId: string, beneficiaryId: string): Promise<Beneficiary> {
  const notFound = () => AppError.notFound("We couldn't find that student.");
  const user = await db.user.findUnique({
    where: { id: beneficiaryId },
    select: { id: true, status: true, student: { select: { countryId: true } } },
  });
  if (!user || user.status !== "ACTIVE") throw notFound();
  if (beneficiaryId !== payerId) {
    // ParentStudentLink(parentUserId, status) index.
    const link = await db.parentStudentLink.findFirst({
      where: { parentUserId: payerId, studentUserId: beneficiaryId, status: "ACTIVE" },
      select: { id: true },
    });
    if (!link) throw notFound(); // same answer as "no such user": never reveal other accounts
  }
  return { id: user.id, countryId: user.student?.countryId ?? null };
}

function assertPriceForBeneficiary(price: PlanPriceView, beneficiary: Beneficiary): void {
  if (price.countryId !== null && price.countryId !== beneficiary.countryId) {
    throw AppError.notFound("This price is not available in your country. Please choose again.");
  }
  if (price.amountMinor <= 0) throw new AppError("BAD_REQUEST", "This option is free, so no payment is needed.");
}

/**
 * A plan price: a ONE_OFF price is a one-off purchase (PLAN_PURCHASE; refused when the beneficiary already owns lifetime
 * access to the plan), any other interval a subscription period.
 */
async function resolvePlanItem(planPriceId: string, beneficiary: Beneficiary, now: Date): Promise<CheckoutItem> {
  const { price, plan } = await getCheckoutPrice(planPriceId, now);
  if (plan === null) throw AppError.validation({ planPriceId: ["This price is not for a plan."] });
  if (plan.audience !== "INDIVIDUAL" || price.perSeat) {
    throw new AppError("BAD_REQUEST", "School plans are arranged with our team. Please see the schools page.");
  }
  assertPriceForBeneficiary(price, beneficiary);
  if (price.interval === "ONE_OFF") {
    if (await ownsLifetimePlan(beneficiary.id, plan.id, { now })) throw AppError.conflict(ALREADY_OWNED_MESSAGE);
    return {
      purpose: "PLAN_PURCHASE",
      itemId: plan.id,
      planId: plan.id,
      studyPackId: null,
      price,
      description: (price.periodDays === null ? `${APP_NAME} ${plan.name}` : `${APP_NAME} ${plan.name} - ${describePeriod(price)}`).slice(0, 100),
    };
  }
  return {
    purpose: "SUBSCRIPTION",
    itemId: plan.id,
    planId: plan.id,
    studyPackId: null,
    price,
    description: `${APP_NAME} ${plan.name} - ${describePeriod(price)}`.slice(0, 100),
  };
}

const PRICE_ROW_SELECT = {
  id: true,
  currency: true,
  amountMinor: true,
  interval: true,
  intervalCount: true,
  periodDays: true,
  perSeat: true,
  minSeats: true,
  label: true,
  countryId: true,
  validFrom: true,
  validTo: true,
  isActive: true,
} as const satisfies Prisma.PlanPriceSelect;

async function resolveStudyPackItem(
  studyPackId: string,
  planPriceId: string | undefined,
  beneficiary: Beneficiary,
  now: Date,
): Promise<CheckoutItem> {
  const pack = await db.studyPack.findUnique({
    where: { id: studyPackId },
    select: { id: true, title: true, status: true, _count: { select: { scopes: true } } },
  });
  // A pack without scope would unlock nothing (fail closed): not for sale.
  if (!pack || pack.status !== "PUBLISHED" || pack._count.scopes === 0) throw AppError.notFound("This study pack is not available.");

  let price: PlanPriceView;
  if (planPriceId !== undefined) {
    const checkout = await getCheckoutPrice(planPriceId, now);
    if (checkout.studyPackId !== pack.id) throw AppError.validation({ planPriceId: ["This price is not for this study pack."] });
    price = checkout.price;
  } else {
    // PlanPrice(studyPackId, isActive, currency) index.
    const rows = await db.planPrice.findMany({ where: { studyPackId: pack.id, isActive: true }, select: PRICE_ROW_SELECT });
    const current = rows.filter(
      (row) => isPriceCurrent(row, now) && (row.countryId === null || row.countryId === beneficiary.countryId),
    );
    const only = current[0];
    if (!only) throw AppError.notFound("This study pack has no price yet.");
    if (current.length > 1) throw AppError.validation({ planPriceId: ["Choose one of the prices for this study pack."] });
    price = only;
  }
  assertPriceForBeneficiary(price, beneficiary);

  const owned = await db.entitlementGrant.findFirst({
    where: { userId: beneficiary.id, studyPackId: pack.id, revokedAt: null, startsAt: { lte: now }, endsAt: null },
    select: { id: true },
  });
  if (owned) throw AppError.conflict("This study pack is already unlocked for this account.");
  return {
    purpose: "STUDY_PACK",
    itemId: pack.id,
    planId: null,
    studyPackId: pack.id,
    price,
    description: `${APP_NAME} ${pack.title}`.slice(0, 100),
  };
}

// =====================================================================================================================
// Payment preparation (serialised per payer + beneficiary + item)
// =====================================================================================================================

const PENDING_SELECT = {
  id: true,
  status: true,
  purpose: true,
  provider: true,
  method: true,
  planPriceId: true,
  studyPackId: true,
  beneficiaryUserId: true,
  createdAt: true,
  metadata: true,
} as const satisfies Prisma.PaymentSelect;

type PendingRow = Prisma.PaymentGetPayload<{ select: typeof PENDING_SELECT }>;

type Prepared =
  | { kind: "existing"; result: StartCheckoutResult }
  | { kind: "new"; paymentId: string };

interface PrepareContext {
  payerId: string;
  beneficiary: Beneficiary;
  item: CheckoutItem;
  provider: PaymentProvider;
  method: PaymentMethod | null;
  phone: string | null;
  idempotencyKey: string | undefined;
  env: ServerEnv;
  now: Date;
}

/** Absolute URL of the signed-in result page for a payment. */
function resultUrl(appUrl: string, paymentId: string): string {
  return `${appUrl}${CHECKOUT_RESULT_PATH}?paymentId=${encodeURIComponent(paymentId)}`;
}

/** The stored provider checkout of a pending payment, or `null` while the provider call has not completed. */
function reuse(row: PendingRow): StartCheckoutResult | null {
  const stored = storedCheckout(row.metadata);
  if (stored === null) return null;
  return stored.kind === "redirect"
    ? { kind: "redirect", url: stored.url, paymentId: row.id, reused: true }
    : { kind: "mobile", instructions: stored.instructions, paymentId: row.id, reused: true };
}

function sameItem(row: PendingRow, ctx: PrepareContext): boolean {
  return (
    row.purpose === ctx.item.purpose &&
    row.beneficiaryUserId === ctx.beneficiary.id &&
    row.planPriceId === ctx.item.price.id &&
    row.studyPackId === ctx.item.studyPackId &&
    row.provider === ctx.provider.id &&
    (row.method ?? null) === ctx.method
  );
}

const PLAN_END_DATE = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: DEFAULT_TIMEZONE });

async function subscriptionFor(tx: Tx, ctx: PrepareContext): Promise<string> {
  const holderUserId = ctx.beneficiary.id;
  const planId = ctx.item.planId as string;
  // Subscription(holderUserId, status) index.
  const live = await tx.subscription.findFirst({
    where: { holderUserId, status: { in: [...LIVE_SUBSCRIPTION_STATUSES] } },
    select: { id: true, planId: true, status: true, currentPeriodEnd: true },
  });
  if (live) {
    // Renewal of the same plan; another plan only once the current plan's prepaid period is over (PAY-2: it would
    // otherwise take over the time already paid for at the current plan's price).
    const blockedUntil = live.planId === planId ? null : planChangeBlockedUntil(live, ctx.now);
    if (blockedUntil !== null) {
      throw AppError.conflict(
        `The current plan is paid up until ${PLAN_END_DATE.format(blockedUntil)}. You can renew it now, or choose a different plan once that period ends.`,
      );
    }
    return live.id;
  }
  const payerUserId = ctx.payerId === holderUserId ? null : ctx.payerId;
  const pending = await tx.subscription.findFirst({
    where: { holderUserId, status: "PENDING", planId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  if (pending) {
    await tx.subscription.update({ where: { id: pending.id }, data: { planPriceId: ctx.item.price.id, payerUserId } });
    return pending.id;
  }
  const created = await tx.subscription.create({
    data: { planId, planPriceId: ctx.item.price.id, holderUserId, payerUserId, status: "PENDING", source: "CHECKOUT" },
    select: { id: true },
  });
  return created.id;
}

async function prepare(ctx: PrepareContext): Promise<Prepared> {
  const lockKey = `billing.checkout:${ctx.payerId}:${ctx.beneficiary.id}:${ctx.item.purpose}:${ctx.item.itemId}`;
  try {
    return await db.$transaction(
      async (tx): Promise<Prepared> => {
        await tx.$queryRaw`SELECT 1 AS locked FROM (SELECT pg_advisory_xact_lock(hashtextextended(${lockKey}, 0))) l`;

        if (ctx.idempotencyKey !== undefined) {
          const existing = await tx.payment.findUnique({
            where: { payerUserId_idempotencyKey: { payerUserId: ctx.payerId, idempotencyKey: ctx.idempotencyKey } },
            select: PENDING_SELECT,
          });
          if (existing) {
            if (!sameItem(existing, ctx)) {
              throw AppError.conflict("This checkout was already used for a different purchase. Please refresh and try again.");
            }
            if (existing.status !== "PENDING") {
              return { kind: "existing", result: { kind: "redirect", url: resultUrl(ctx.env.APP_URL, existing.id), paymentId: existing.id, reused: true } };
            }
            const reused = reuse(existing);
            if (reused === null) {
              throw AppError.conflict("Your checkout is being prepared. Please try again in a moment.");
            }
            return { kind: "existing", result: reused };
          }
        }

        // Payment(payerUserId, idempotencyKey) / (beneficiaryUserId, createdAt) indexes; a handful of rows per payer.
        const pending = await tx.payment.findMany({
          where: {
            payerUserId: ctx.payerId,
            beneficiaryUserId: ctx.beneficiary.id,
            purpose: ctx.item.purpose,
            status: "PENDING",
            ...(ctx.item.purpose === "STUDY_PACK" ? { studyPackId: ctx.item.studyPackId } : { planPrice: { planId: ctx.item.planId } }),
          },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: PENDING_SELECT,
        });
        for (const row of pending) {
          const ageMinutes = (ctx.now.getTime() - row.createdAt.getTime()) / MINUTE_MS;
          if (sameItem(row, ctx) && ageMinutes < reuseWindowMinutes(row.method)) {
            const reused = reuse(row);
            if (reused !== null) return { kind: "existing", result: reused };
            if (ageMinutes < PREPARING_STALE_MINUTES) {
              throw AppError.conflict("Your checkout is being prepared. Please try again in a moment.");
            }
          }
          // Older, different provider/method/price, or never reached the provider: superseded by this checkout.
          await applyLocalPaymentAction(row.id, "SUPERSEDED", { tx, now: ctx.now, reason: "new checkout started" });
        }

        // Lifetime access confirmed since the item was resolved (e.g. a double tap after the payment went through).
        if (
          ctx.item.purpose === "PLAN_PURCHASE" &&
          ctx.item.price.periodDays === null &&
          (await ownsLifetimePlan(ctx.beneficiary.id, ctx.item.itemId, { now: ctx.now, client: tx }))
        ) {
          throw AppError.conflict(ALREADY_OWNED_MESSAGE);
        }

        const subscriptionId = ctx.item.purpose === "SUBSCRIPTION" ? await subscriptionFor(tx, ctx) : null;
        const price = ctx.item.price;
        const payment = await tx.payment.create({
          data: {
            purpose: ctx.item.purpose,
            status: "PENDING",
            provider: ctx.provider.id,
            method: ctx.method,
            payerUserId: ctx.payerId,
            beneficiaryUserId: ctx.beneficiary.id,
            subscriptionId,
            studyPackId: ctx.item.studyPackId,
            planPriceId: price.id,
            amountMinor: price.amountMinor,
            currency: price.currency,
            listAmountMinor: price.amountMinor,
            discountMinor: 0,
            quantity: 1,
            idempotencyKey: ctx.idempotencyKey ?? randomUUID(),
            expiresAt: new Date(ctx.now.getTime() + PENDING_PAYMENT_TTL_HOURS * 60 * MINUTE_MS),
            createdAt: ctx.now,
            // Duplicate-payer checks (referrals, fraud) without storing the wallet number (ARCHITECTURE §7.6).
            payerFingerprint: ctx.phone === null ? null : hmacSha256(`payment:payer:msisdn:${ctx.phone}`, ctx.env.SESSION_SECRET),
            ...(ctx.phone === null ? {} : { metadata: { maskedMsisdn: maskMsisdn(ctx.phone) } }),
          },
          select: { id: true },
        });
        return { kind: "new", paymentId: payment.id };
      },
      { maxWait: 10_000, timeout: 20_000 },
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      throw AppError.conflict("This checkout was already started. Please refresh and try again.");
    }
    throw error;
  }
}

async function saveProviderCheckout(paymentId: string, checkout: CheckoutResult): Promise<void> {
  await db.$transaction(async (tx) => {
    await tx.$queryRaw`SELECT "id" FROM "Payment" WHERE "id" = ${paymentId}::uuid FOR UPDATE`;
    const current = await tx.payment.findUniqueOrThrow({ where: { id: paymentId }, select: { metadata: true, providerPollUrl: true } });
    const metadata = mergePaymentMetadata(
      current.metadata,
      checkout.kind === "redirect"
        ? { checkoutKind: "redirect", checkoutUrl: checkout.url }
        : { checkoutKind: "mobile_prompt", instructions: checkout.instructions, ...(checkout.metadata ?? {}) },
    );
    await tx.payment.update({
      where: { id: paymentId },
      data: {
        providerReference: checkout.providerRef.slice(0, 255),
        ...(current.providerPollUrl === null && checkout.pollUrl ? { providerPollUrl: checkout.pollUrl.slice(0, 1024) } : {}),
        metadata,
      },
    });
  });
}

// =====================================================================================================================
// Entry point
// =====================================================================================================================

/**
 * Starts (or resumes) a checkout for a plan price or a study pack.
 *
 * @returns where to send the payer: a provider redirect URL, or mobile-money instructions (approve on the phone);
 *          plus the payment id to poll on the result page.
 * @throws AppError VALIDATION (input), BAD_REQUEST (provider unavailable / unsupported currency / free option),
 *         NOT_FOUND (price, pack or beneficiary unavailable), FORBIDDEN (payer inactive), CONFLICT (already owned,
 *         checkout being prepared), RATE_LIMITED
 */
export async function startCheckout(input: StartCheckoutInput, options: CheckoutOptions = {}): Promise<StartCheckoutResult> {
  const parsed = startCheckoutSchema.safeParse(input);
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const data = parsed.data;
  const env = options.env ?? getEnv();
  const now = options.now ?? new Date();

  if (data.provider === "sandbox" && env.NODE_ENV === "production") throw new AppError("BAD_REQUEST", UNAVAILABLE);
  // Feature flags gate dormant providers (Stripe): refused here exactly like a disabled provider while switched off.
  const features = options.features ?? (await getFeatures());
  const provider = options.env ? getProvider(data.provider, { env, features }) : getProvider(data.provider, { features });
  if (data.paynowMethod && provider.id === "stripe") {
    throw new AppError("BAD_REQUEST", "EcoCash and OneMoney are paid through Paynow. Please choose Paynow.");
  }
  const method: PaymentMethod | null = data.paynowMethod ?? (provider.id === "stripe" ? "card" : null);

  await assertRateLimit(
    rateLimits.checkout(data.userId),
    "Too many checkout attempts. Please wait a few minutes and try again.",
  );

  const payer = await db.user.findUnique({ where: { id: data.userId }, select: { id: true, status: true, emailNormalized: true } });
  if (!payer || payer.status !== "ACTIVE") throw AppError.forbidden("Your account can't make payments right now.");
  const beneficiary = await loadBeneficiary(payer.id, data.beneficiaryUserId ?? payer.id);

  const item =
    data.purpose === "STUDY_PACK"
      ? await resolveStudyPackItem(data.studyPackId as string, data.planPriceId, beneficiary, now)
      : await resolvePlanItem(data.planPriceId as string, beneficiary, now);
  if (item.purpose === "PLAN_PURCHASE" && !PLAN_PURCHASE_PROVIDERS.has(provider.id)) {
    throw new AppError("BAD_REQUEST", "Full access is paid through Paynow: EcoCash, OneMoney or a card. Please choose one of those.");
  }
  if (!provider.supports(item.price.currency, method ?? undefined)) {
    throw new AppError("BAD_REQUEST", `This payment method can't take ${item.price.currency} payments. Please choose another one.`);
  }

  let phone: string | null = null;
  if (method !== null && MOBILE_MONEY_METHODS.has(method)) {
    phone = normaliseZimbabweMobile(data.phone);
    if (phone === null) throw AppError.validation({ phone: ["Enter a valid Zimbabwe mobile number, e.g. 0771234567."] });
  }

  const prepared = await prepare({
    payerId: payer.id,
    beneficiary,
    item,
    provider,
    method,
    phone,
    idempotencyKey: data.idempotencyKey,
    env,
    now,
  });
  if (prepared.kind === "existing") return prepared.result;
  const { paymentId } = prepared;

  let checkout: CheckoutResult;
  try {
    checkout = await provider.createCheckout({
      paymentId,
      amountMinor: item.price.amountMinor,
      currency: item.price.currency,
      description: item.description,
      payer: { ...(payer.emailNormalized ? { email: payer.emailNormalized } : {}), ...(phone ? { phone } : {}) },
      ...(method !== null ? { method } : {}),
      returnUrl: `${env.APP_URL}${CHECKOUT_RETURN_PATH}?paymentId=${paymentId}&provider=${provider.id}`,
      webhookUrl: `${env.APP_URL}${PAYMENT_WEBHOOK_PATH_PREFIX}/${provider.id}`,
    });
  } catch (error) {
    logger.error("billing: provider could not start a checkout", { provider: provider.id, paymentId, err: error });
    try {
      await applyLocalPaymentAction(paymentId, "CHECKOUT_FAILED", { now, reason: "provider error" });
    } catch (markError) {
      logger.error("billing: could not mark a failed checkout", { paymentId, err: markError });
    }
    throw new AppError("BAD_REQUEST", "We couldn't start the payment. Please try again or choose another payment method.", {
      cause: error,
    });
  }

  await saveProviderCheckout(paymentId, checkout);
  logger.info("billing: checkout started", { provider: provider.id, paymentId, kind: checkout.kind, purpose: item.purpose });
  return checkout.kind === "redirect"
    ? { kind: "redirect", url: checkout.url, paymentId, reused: false }
    : { kind: "mobile", instructions: checkout.instructions, paymentId, reused: false };
}

// =====================================================================================================================
// Sandbox confirmation page (development only; ARCHITECTURE §7.1)
// =====================================================================================================================

/** What the dev-only sandbox confirmation page shows. */
export interface SandboxCheckoutView {
  paymentId: string;
  status: PaymentStatus;
  amountMinor: number;
  currency: string;
  /** Plan name or study pack title (catalogue data). */
  itemLabel: string;
  method: string | null;
}

/** Outcomes the sandbox page can simulate (PENDING = "the payer has not finished yet"). */
export const SANDBOX_PAGE_OUTCOMES = ["PAID", "FAILED", "CANCELLED", "PENDING"] as const satisfies readonly SandboxOutcome[];
export type SandboxPageOutcome = (typeof SANDBOX_PAGE_OUTCOMES)[number];

function assertSandboxAllowed(env: ServerEnv): void {
  // Same answer as a missing payment: the page and its action do not exist in production.
  if (env.NODE_ENV === "production" || isProd()) throw AppError.notFound();
}

async function loadSandboxPayment(userId: string, paymentId: string) {
  if (!z.uuid().safeParse(paymentId).success || !z.uuid().safeParse(userId).success) return null;
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    select: {
      id: true,
      provider: true,
      payerUserId: true,
      status: true,
      amountMinor: true,
      currency: true,
      method: true,
      planPrice: { select: { plan: { select: { name: true } } } },
      studyPack: { select: { title: true } },
    },
  });
  // Only the payer may confirm, and only sandbox payments.
  if (!payment || payment.provider !== "sandbox" || payment.payerUserId !== userId) return null;
  return payment;
}

/** The sandbox payment for the confirmation page, or `null` (unknown, not sandbox, or not the caller's). */
export async function getSandboxCheckoutView(userId: string, paymentId: string, options: CheckoutOptions = {}): Promise<SandboxCheckoutView | null> {
  assertSandboxAllowed(options.env ?? getEnv());
  const payment = await loadSandboxPayment(userId, paymentId);
  if (!payment) return null;
  return {
    paymentId: payment.id,
    status: payment.status,
    amountMinor: payment.amountMinor,
    currency: payment.currency,
    itemLabel: payment.studyPack?.title ?? payment.planPrice?.plan?.name ?? "Payment",
    method: payment.method,
  };
}

/**
 * Simulates the payer's choice on the fake gateway: produces the SIGNED sandbox webhook and delivers it through the
 * real webhook path (`handleWebhook`: signature check, PaymentEvent, state machine, fulfilment), exactly like a real
 * provider callback. Returns the app-relative return URL to send the browser to.
 *
 * @throws AppError NOT_FOUND (production, unknown payment, not the payer's, not a sandbox payment)
 */
export async function simulateSandboxCheckout(
  userId: string,
  paymentId: string,
  outcome: SandboxPageOutcome,
  options: CheckoutOptions = {},
): Promise<{ returnPath: string; delivered: boolean }> {
  const env = options.env ?? getEnv();
  assertSandboxAllowed(env);
  const payment = await loadSandboxPayment(userId, paymentId);
  if (!payment) throw AppError.notFound("This sandbox payment does not exist.");
  const returnPath = `${CHECKOUT_RETURN_PATH}?paymentId=${payment.id}&provider=sandbox`;
  if (payment.status !== "PENDING") return { returnPath, delivered: false };

  const failureCode = outcome === "FAILED" ? "insufficient_funds" : outcome === "CANCELLED" ? "user_cancelled" : undefined;
  const { request } = simulateSandboxPayment(
    { paymentId: payment.id, outcome, amountMinor: payment.amountMinor, currency: payment.currency, ...(failureCode ? { failureCode } : {}) },
    { appUrl: env.APP_URL, signingSecret: env.SESSION_SECRET, production: env.NODE_ENV === "production", ...(options.now ? { now: () => options.now as Date } : {}) },
  );
  const delivery = new Request(`${env.APP_URL}${PAYMENT_WEBHOOK_PATH_PREFIX}/sandbox`, {
    method: "POST",
    headers: request.headers,
    body: request.rawBody,
  });
  const result = await handleWebhook("sandbox", delivery, { env, ...(options.now ? { now: options.now } : {}) });
  if (result.status !== 200) {
    logger.error("billing: sandbox webhook was not accepted", { paymentId: payment.id, status: result.status });
    throw new AppError("INTERNAL", "The sandbox could not deliver the payment result.");
  }
  return { returnPath, delivered: true };
}
