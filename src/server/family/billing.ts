import "server-only";
import { z } from "zod";
import type { BillingInterval, PaymentPurpose, PaymentStatus } from "@/generated/prisma/client";
import { isOfferedCurrency } from "@/lib/billing/offer";
import type { FeatureFlags } from "@/lib/features";
import { CHECKOUT_RESULT_PATH, PLAN_PURCHASE_PROVIDERS, startCheckout, type CheckoutOptions } from "@/server/billing/checkout";
import { listPublicPlans, type PlanView } from "@/server/billing/plans";
import { pollPayment } from "@/server/billing/reconcile";
import { listAvailableProviders } from "@/server/billing/providers/registry";
import type { PaymentMethod, PaymentProviderId } from "@/server/billing/providers/types";
import { getPurchasedAccess, ownsLifetimePlan } from "@/server/billing/purchases";
import { getCurrentSubscription } from "@/server/billing/subscriptions";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import { getEnv, type ServerEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { assertFamilyRateLimits, assertParent, personName, type FamilyActor } from "./common";
import { requireLinkedChild } from "./queries";

/**
 * "Subscribe for this child" (§21, §31, §32; ARCHITECTURE §7): a linked parent pays for a child's plan. Payer and
 * beneficiary differ; the shared checkout service (`startCheckout`) re-checks the ACTIVE link, takes the amount from
 * the database and talks to the provider. This module only:
 * - lists what can be bought (public INDIVIDUAL plans with a current, non-zero price in an offered currency for the
 *   CHILD's country; a one-off plan the child already owns for good is left out) and the payment methods that are
 *   enabled (EcoCash / OneMoney / InnBucks through Paynow, other Paynow options, dev sandbox; one-off "Full access"
 *   is paid through Paynow only, owner decision 2026-10-07);
 * - maps the parent's method choice to `startCheckout` arguments;
 * - reads the parent's own payments (payer = the parent) and their status.
 *
 * Fulfilment never happens here: only a verified webhook or a provider poll moves a payment.
 */

export const PARENT_PAYMENT_RESULT_PATH = "/parent/billing/result";

export const CHECKOUT_METHOD_IDS = [
  "paynow_ecocash",
  "paynow_onemoney",
  "paynow_innbucks",
  "paynow_web",
  "stripe_card",
  "sandbox_web",
  "sandbox_ecocash",
] as const;
export type CheckoutMethodId = (typeof CHECKOUT_METHOD_IDS)[number];

interface MethodDefinition {
  id: CheckoutMethodId;
  provider: PaymentProviderId;
  /** Paynow mobile express checkout method (also simulated by the sandbox). */
  paynowMethod: "ecocash" | "onemoney" | "innbucks" | null;
  /** Method key used for `provider.supports()`. */
  method: PaymentMethod | undefined;
  label: string;
  description: string;
  needsPhone: boolean;
}

const METHOD_DEFINITIONS: readonly MethodDefinition[] = [
  {
    id: "paynow_ecocash",
    provider: "paynow",
    paynowMethod: "ecocash",
    method: "ecocash",
    label: "EcoCash",
    description: "You approve the payment on your phone.",
    needsPhone: true,
  },
  {
    id: "paynow_onemoney",
    provider: "paynow",
    paynowMethod: "onemoney",
    method: "onemoney",
    label: "OneMoney",
    description: "You approve the payment on your phone.",
    needsPhone: true,
  },
  {
    id: "paynow_innbucks",
    provider: "paynow",
    paynowMethod: "innbucks",
    method: "innbucks",
    label: "InnBucks",
    description: "Get an InnBucks authorization code, then approve it in the app or with *569#.",
    needsPhone: true,
  },
  {
    id: "paynow_web",
    provider: "paynow",
    paynowMethod: null,
    method: undefined,
    label: "Other Paynow options",
    description: "ZimSwitch, Visa or Mastercard on the Paynow payment page.",
    needsPhone: false,
  },
  {
    id: "stripe_card",
    provider: "stripe",
    paynowMethod: null,
    method: "card",
    label: "Card",
    description: "Visa or Mastercard on a secure payment page.",
    needsPhone: false,
  },
  {
    id: "sandbox_web",
    provider: "sandbox",
    paynowMethod: null,
    method: undefined,
    label: "Test payment page",
    description: "Development only. No real money moves.",
    needsPhone: false,
  },
  {
    id: "sandbox_ecocash",
    provider: "sandbox",
    paynowMethod: "ecocash",
    method: "ecocash",
    label: "Test mobile-money prompt",
    description: "Development only. Simulates an EcoCash approval.",
    needsPhone: true,
  },
];

export interface CheckoutMethodOption {
  id: CheckoutMethodId;
  label: string;
  description: string;
  needsPhone: boolean;
  /** Currencies (among the offered prices) this method can take. */
  currencies: string[];
}

export interface CheckoutPriceOption {
  planPriceId: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  label: string | null;
}

export interface CheckoutPlanOption {
  planId: string;
  name: string;
  tagline: string | null;
  highlights: string[];
  prices: CheckoutPriceOption[];
}

export interface ChildCheckoutOptions {
  child: { studentUserId: string; name: string };
  plans: CheckoutPlanOption[];
  methods: CheckoutMethodOption[];
  currentSubscription: {
    planName: string;
    status: string;
    accessEndsAt: Date | null;
    cancelAtPeriodEnd: boolean;
    paidByYou: boolean;
  } | null;
  /** Access the child already bought once ("Full access since …"; lifetime when `endsAt` is null), or `null`. */
  purchase: { planName: string; since: Date; endsAt: Date | null; paidByYou: boolean } | null;
}

export interface CheckoutOptionsInput {
  now?: Date;
  /** Inject an environment (tests); default `getEnv()`. */
  env?: ServerEnv;
  /** Inject the plan catalogue (tests; the public catalogue is cached and shared); default `listPublicPlans`. */
  listPlans?: (countryId: string | null, now: Date) => Promise<PlanView[]>;
  /** Feature flags (dormant providers such as Stripe need theirs on); default `getFeatures()`. */
  features?: FeatureFlags;
}

/** Plans, prices and payment methods a parent can use for one linked child. NOT_FOUND unless the link is ACTIVE. */
export async function getChildCheckoutOptions(
  actor: FamilyActor,
  studentUserId: unknown,
  options: CheckoutOptionsInput = {},
): Promise<ChildCheckoutOptions> {
  const child = await requireLinkedChild(actor, studentUserId);
  const now = options.now ?? new Date();
  const student = await db.student.findUnique({ where: { userId: child.studentUserId }, select: { countryId: true } });
  const listPlans = options.listPlans ?? ((countryId: string | null, at: Date) => listPublicPlans(undefined, { audience: "INDIVIDUAL", countryId, now: at }));
  const [plans, current, bought] = await Promise.all([
    listPlans(student?.countryId ?? null, now),
    getCurrentSubscription(child.studentUserId),
    getPurchasedAccess(child.studentUserId, { now }),
  ]);
  const priced: CheckoutPlanOption[] = plans
    .filter((plan) => plan.audience === "INDIVIDUAL" && plan.isActive)
    .map((plan) => ({
      planId: plan.id,
      name: plan.name,
      tagline: plan.tagline,
      highlights: plan.highlights,
      prices: plan.prices
        // Free options need no payment; seat prices are for schools; offered currencies only (USD for now).
        .filter((price) => price.amountMinor > 0 && !price.perSeat && isOfferedCurrency(price.currency))
        .map((price) => ({
          planPriceId: price.id,
          currency: price.currency,
          amountMinor: price.amountMinor,
          interval: price.interval,
          intervalCount: price.intervalCount,
          periodDays: price.periodDays,
          label: price.label,
        })),
    }))
    .filter((plan) => plan.prices.length > 0);
  // A one-off plan the child already owns for good is not offered again (checkout would refuse it anyway).
  const owned = await Promise.all(
    priced.map((plan) =>
      plan.prices.every((price) => price.interval === "ONE_OFF" && price.periodDays === null)
        ? ownsLifetimePlan(child.studentUserId, plan.planId, { now })
        : Promise.resolve(false),
    ),
  );
  const offers = priced.filter((_, index) => !owned[index]);
  const oneOffOnly = offers.length > 0 && offers.every((plan) => plan.prices.every((price) => price.interval === "ONE_OFF"));

  const currencies = [...new Set(offers.flatMap((plan) => plan.prices.map((price) => price.currency)))];
  // Dormant providers (Stripe) are offered only while their feature flag is on.
  const providers = listAvailableProviders({ ...(options.env ? { env: options.env } : {}), features: options.features ?? (await getFeatures()) });
  const methods: CheckoutMethodOption[] = [];
  for (const definition of METHOD_DEFINITIONS) {
    if (oneOffOnly && !PLAN_PURCHASE_PROVIDERS.has(definition.provider)) continue;
    const provider = providers.find((candidate) => candidate.id === definition.provider);
    if (!provider) continue;
    const supported = currencies.filter((currency) => provider.supports(currency, definition.method));
    if (supported.length === 0) continue;
    methods.push({
      id: definition.id,
      label: definition.label,
      description: definition.description,
      needsPhone: definition.needsPhone,
      currencies: supported,
    });
  }

  return {
    child: { studentUserId: child.studentUserId, name: child.name },
    plans: offers,
    methods,
    currentSubscription: current
      ? {
          planName: current.plan.name,
          status: current.status,
          accessEndsAt: current.accessEndsAt,
          cancelAtPeriodEnd: current.cancelAtPeriodEnd,
          paidByYou: current.payerUserId === actor.userId,
        }
      : null,
    purchase: bought
      ? { planName: bought.plan.name, since: bought.since, endsAt: bought.endsAt, paidByYou: bought.payment?.payerUserId === actor.userId }
      : null,
  };
}

/**
 * Which of the parent's linked children already own a one-off plan for good (Full access): parent pages show that
 * instead of a pay button, because checkout would offer them nothing. Scoped to the actor's ACTIVE links whatever ids
 * are passed. One query over the EntitlementGrant(userId, endsAt) index.
 */
export async function childrenWithLifetimeAccess(
  actor: FamilyActor,
  studentUserIds: readonly string[],
  options: { now?: Date } = {},
): Promise<Set<string>> {
  assertParent(actor);
  if (studentUserIds.length === 0) return new Set();
  const now = options.now ?? new Date();
  const rows = await db.entitlementGrant.findMany({
    where: {
      userId: { in: [...studentUserIds] },
      user: { parentLinksAsStudent: { some: { parentUserId: actor.userId, status: "ACTIVE" } } },
      revokedAt: null,
      startsAt: { lte: now },
      endsAt: null,
      plan: { prices: { some: { interval: "ONE_OFF", periodDays: null } } },
    },
    distinct: ["userId"],
    select: { userId: true },
  });
  return new Set(rows.flatMap((row) => (row.userId === null ? [] : [row.userId])));
}

const childCheckoutSchema = z.object({
  planPriceId: z.uuid({ error: "Choose a plan." }),
  methodId: z.enum(CHECKOUT_METHOD_IDS, { error: "Choose how to pay." }),
  phone: z.string().trim().max(32).optional(),
  idempotencyKey: z.string().trim().min(16).max(64).optional(),
});

export type ChildCheckoutResult =
  | { kind: "redirect"; url: string; paymentId: string }
  | {
      kind: "mobile";
      instructions: string;
      paymentId: string;
      mobilePromptKind: "phone_prompt" | "innbucks_code";
      innbucksAuthorizationCode: string | null;
      innbucksAuthorizationExpires: string | null;
      innbucksDeepLinkUrl: string | null;
    };

function parentResultPath(paymentId: string): string {
  return `${PARENT_PAYMENT_RESULT_PATH}?paymentId=${encodeURIComponent(paymentId)}`;
}

/**
 * Only http(s) URLs leave the app (never `javascript:`); our own student result page becomes the parent's.
 * Exported for unit tests.
 */
export function safeCheckoutRedirect(url: string, paymentId: string, appUrl: string): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new AppError("INTERNAL", "We couldn't open the payment page. Please try again.");
  }
  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    throw new AppError("INTERNAL", "We couldn't open the payment page. Please try again.");
  }
  if (parsed.origin === new URL(appUrl).origin && parsed.pathname === CHECKOUT_RESULT_PATH) return parentResultPath(paymentId);
  return parsed.toString();
}

/**
 * Starts (or resumes) a subscription checkout that the parent pays for the child. The parent's method choice maps to
 * a provider (+ Paynow mobile method); everything else (amount, link check, idempotency, rate limit) is the shared
 * checkout service's job.
 */
export async function startChildCheckout(
  actor: FamilyActor,
  input: { studentUserId: unknown; planPriceId: unknown; methodId: unknown; phone?: unknown; idempotencyKey?: unknown },
  options: CheckoutOptions = {},
): Promise<ChildCheckoutResult> {
  const child = await requireLinkedChild(actor, input.studentUserId);
  const parsed = childCheckoutSchema.safeParse({
    planPriceId: input.planPriceId,
    methodId: input.methodId,
    phone: typeof input.phone === "string" && input.phone.trim() !== "" ? input.phone : undefined,
    idempotencyKey: typeof input.idempotencyKey === "string" && input.idempotencyKey !== "" ? input.idempotencyKey : undefined,
  });
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const definition = METHOD_DEFINITIONS.find((candidate) => candidate.id === parsed.data.methodId);
  if (!definition) throw AppError.validation({ methodId: ["Choose how to pay."] });
  if (definition.needsPhone && !parsed.data.phone) {
    throw AppError.validation({ phone: ["Enter the mobile number to charge, e.g. 0771234567."] });
  }

  const result = await startCheckout(
    {
      userId: actor.userId,
      beneficiaryUserId: child.studentUserId,
      purpose: "SUBSCRIPTION",
      planPriceId: parsed.data.planPriceId,
      provider: definition.provider,
      ...(definition.paynowMethod ? { paynowMethod: definition.paynowMethod, phone: parsed.data.phone } : {}),
      ...(parsed.data.idempotencyKey ? { idempotencyKey: parsed.data.idempotencyKey } : {}),
    },
    options,
  );
  if (result.kind === "mobile") {
    const stored = await db.payment.findUnique({ where: { id: result.paymentId }, select: { metadata: true } });
    return {
      kind: "mobile",
      instructions: result.instructions,
      paymentId: result.paymentId,
      mobilePromptKind: metadataString(stored?.metadata, "mobilePromptKind") === "innbucks_code" || definition.paynowMethod === "innbucks" ? "innbucks_code" : "phone_prompt",
      innbucksAuthorizationCode: metadataString(stored?.metadata, "innbucksAuthorizationCode"),
      innbucksAuthorizationExpires: metadataString(stored?.metadata, "innbucksAuthorizationExpires"),
      innbucksDeepLinkUrl: metadataString(stored?.metadata, "innbucksDeepLinkUrl"),
    };
  }
  const appUrl = (options.env ?? getEnv()).APP_URL;
  return { kind: "redirect", url: safeCheckoutRedirect(result.url, result.paymentId, appUrl), paymentId: result.paymentId };
}

// =====================================================================================================================
// The parent's payments
// =====================================================================================================================

export interface ParentPaymentRow {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  amountMinor: number;
  currency: string;
  /** Plan name or study pack title (catalogue data). */
  itemName: string | null;
  childName: string;
  beneficiaryUserId: string | null;
  receiptNumber: string | null;
  createdAt: Date;
  paidAt: Date | null;
}

const PAYMENT_SELECT = {
  id: true,
  status: true,
  purpose: true,
  amountMinor: true,
  currency: true,
  method: true,
  receiptNumber: true,
  createdAt: true,
  paidAt: true,
  beneficiaryUserId: true,
  metadata: true,
  beneficiary: { select: { profile: { select: { displayName: true, firstName: true, lastName: true } } } },
  planPrice: { select: { plan: { select: { name: true } } } },
  studyPack: { select: { title: true } },
} as const;

type PaymentRowRaw = {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  amountMinor: number;
  currency: string;
  method: string | null;
  receiptNumber: string | null;
  createdAt: Date;
  paidAt: Date | null;
  beneficiaryUserId: string | null;
  beneficiary: { profile: { displayName: string | null; firstName: string | null; lastName: string | null } | null } | null;
  planPrice: { plan: { name: string } | null } | null;
  studyPack: { title: string } | null;
};

function toPaymentRow(row: PaymentRowRaw): ParentPaymentRow {
  return {
    id: row.id,
    status: row.status,
    purpose: row.purpose,
    amountMinor: row.amountMinor,
    currency: row.currency,
    itemName: row.planPrice?.plan?.name ?? row.studyPack?.title ?? null,
    childName: personName(row.beneficiary?.profile, "Your child"),
    beneficiaryUserId: row.beneficiaryUserId,
    receiptNumber: row.receiptNumber,
    createdAt: row.createdAt,
    paidAt: row.paidAt,
  };
}

/** Payments this parent made for children, newest first (a parent makes a handful; capped). */
export async function listParentPayments(actor: FamilyActor, options: { limit?: number } = {}): Promise<ParentPaymentRow[]> {
  assertParent(actor);
  const take = Math.min(50, Math.max(1, Math.floor(options.limit ?? 20)));
  // Payment(payerUserId, idempotencyKey) unique: "my payments" prefix scan.
  const rows = await db.payment.findMany({
    where: { payerUserId: actor.userId, beneficiaryUserId: { not: actor.userId } },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take,
    select: PAYMENT_SELECT,
  });
  return rows.map(toPaymentRow);
}

export interface ParentPaymentResult extends ParentPaymentRow {
  /** Mobile-money instructions while the payment waits for approval on the phone. */
  instructions: string | null;
  mobilePromptKind: "phone_prompt" | "innbucks_code" | null;
  innbucksAuthorizationCode: string | null;
  innbucksAuthorizationExpires: string | null;
  innbucksDeepLinkUrl: string | null;
  /** "+263 77* *** 567" for mobile money (never the full number). */
  maskedMsisdn: string | null;
}

const paymentIdSchema = z.uuid();

function metadataString(metadata: unknown, key: string): string | null {
  if (typeof metadata !== "object" || metadata === null || Array.isArray(metadata)) return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

/** One of the parent's own payments; NOT_FOUND for anyone else's (payer-scoped query). */
export async function getParentPayment(actor: FamilyActor, paymentId: unknown): Promise<ParentPaymentResult> {
  assertParent(actor);
  const id = paymentIdSchema.safeParse(paymentId);
  if (!id.success) throw AppError.notFound("We couldn't find that payment.");
  const row = await db.payment.findFirst({ where: { id: id.data, payerUserId: actor.userId }, select: PAYMENT_SELECT });
  if (!row) throw AppError.notFound("We couldn't find that payment.");
  const mobilePending = row.status === "PENDING" && metadataString(row.metadata, "checkoutKind") === "mobile_prompt";
  const mobilePromptKind =
    mobilePending && (metadataString(row.metadata, "mobilePromptKind") === "innbucks_code" || row.method === "innbucks")
      ? "innbucks_code"
      : mobilePending
        ? "phone_prompt"
        : null;
  return {
    ...toPaymentRow(row),
    instructions: mobilePending ? metadataString(row.metadata, "instructions") : null,
    mobilePromptKind,
    innbucksAuthorizationCode: mobilePromptKind === "innbucks_code" ? metadataString(row.metadata, "innbucksAuthorizationCode") : null,
    innbucksAuthorizationExpires: mobilePromptKind === "innbucks_code" ? metadataString(row.metadata, "innbucksAuthorizationExpires") : null,
    innbucksDeepLinkUrl: mobilePromptKind === "innbucks_code" ? metadataString(row.metadata, "innbucksDeepLinkUrl") : null,
    maskedMsisdn: metadataString(row.metadata, "maskedMsisdn"),
  };
}

/**
 * "Check again": asks the provider about one of the parent's PENDING payments (the same verified path as webhooks;
 * a poll can confirm, the browser never does). Rate-limited per parent; provider errors leave the status as is.
 */
export async function refreshParentPayment(actor: FamilyActor, paymentId: unknown): Promise<ParentPaymentResult> {
  const payment = await getParentPayment(actor, paymentId);
  if (payment.status !== "PENDING") return payment;
  await assertFamilyRateLimits([{ name: "paymentPoll", subject: actor.userId }], "Please wait a moment before checking again.");
  try {
    await pollPayment(payment.id);
  } catch (error) {
    logger.warn("family: payment status poll failed", { paymentId: payment.id, err: error });
  }
  return getParentPayment(actor, payment.id);
}
