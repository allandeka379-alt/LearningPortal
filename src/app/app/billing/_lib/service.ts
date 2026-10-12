import "server-only";
import { z } from "zod";
import type { PaymentPurpose, PaymentStatus, SubscriptionStatus } from "@/generated/prisma/client";
import {
  CHECKOUT_METHOD_IDS,
  paymentResultHref,
  type CheckoutItemGroup,
  type CheckoutMethodView,
  type CheckoutOutcome,
  type PaymentStatusView,
} from "@/components/billing/checkout-state";
import { includedLines, type EntitlementLine } from "@/components/billing/entitlement-summary";
import { paymentFailureMessage, paymentMethodLabel } from "@/components/billing/format";
import type { Entitlements } from "@/lib/billing/entitlements";
import type { Actor } from "@/server/auth/actor";
import { assertOnboardedStudent } from "@/server/auth/guards";
import { PLAN_PURCHASE_PROVIDERS, startCheckout, type CheckoutOptions } from "@/server/billing/checkout";
import { getEntitlements, normalizeEntitlementDocument } from "@/server/billing/entitlements";
import { selectFullAccessOffer, studentCheckoutHref } from "@/server/billing/offer";
import { getPlanByCode, isPriceCurrent, listPublicPlans, type PlanView } from "@/server/billing/plans";
import { sandboxCheckoutPath } from "@/server/billing/providers/sandbox";
import { getPurchasedAccess, ownsLifetimePlan } from "@/server/billing/purchases";
import { pollPayment } from "@/server/billing/reconcile";
import { cancelSubscription, getCurrentSubscription, resumeSubscription, type SubscriptionStateView } from "@/server/billing/subscriptions";
import { db } from "@/server/db";
import { getFeatures, isFeatureEnabled } from "@/server/features";
import { decodeCursor, encodeCursor } from "@/server/lib/api";
import { getEnv } from "@/server/lib/env";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { RATE_LIMIT_PRESETS, rateLimit } from "@/server/lib/rate-limit";
import { availableCheckoutMethods, methodDefinition, testMethodsAllowed } from "./methods";
import { describeAccessSources, planOffers, purchasablePrices, type AccessSourceView, type PlanOfferView } from "./overview";

/**
 * Student billing (§31 subscriptions, §32 payments, §24 study packs; ARCHITECTURE §7): the reads behind /app/billing
 * and the student's checkout, composed from the billing services. Every function takes the authenticated actor; the
 * student is always both payer and beneficiary of their own checkouts (parents pay through /parent), and only sees
 * payments where they are the payer or the beneficiary.
 *
 * TODO(shared): this is service code living next to its route because this workflow may only touch its own area;
 * it belongs in `src/server/billing/account.ts` (then the REST API `GET /payments/{id}` can reuse it).
 */

const uuid = z.uuid();
const PAYMENTS_PAGE_SIZE = 10;

function requireStudent(actor: Actor): void {
  assertOnboardedStudent(actor);
}

function metadataString(metadata: unknown, key: string): string | null {
  if (typeof metadata !== "object" || metadata === null || Array.isArray(metadata)) return null;
  const value = (metadata as Record<string, unknown>)[key];
  return typeof value === "string" && value.trim() !== "" ? value : null;
}

// =====================================================================================================================
// Overview (/app/billing)
// =====================================================================================================================

export interface StudentSubscriptionView {
  id: string;
  status: SubscriptionStatus;
  planName: string;
  cancelAtPeriodEnd: boolean;
  /** End of the paid period. */
  currentPeriodEnd: Date | null;
  /** When access actually ends (period end + grace); `null` while waiting for a first payment. */
  accessEndsAt: Date | null;
  paidByParent: boolean;
  /** Live (not a pending checkout) and therefore cancellable / resumable. */
  live: boolean;
}

export interface StudentPaymentRow {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  /** Plan name or study pack title (catalogue data). */
  itemName: string | null;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
  methodLabel: string;
  receiptNumber: string | null;
  createdAt: Date;
  paidAt: Date | null;
  paidByYou: boolean;
}

export interface OwnedPackView {
  grantId: string;
  packId: string;
  title: string;
  slug: string;
  startsAt: Date;
  endsAt: Date | null;
  state: "active" | "upcoming" | "ended";
}

/** Access the student bought with a one-off payment (owner decision 2026-10-07: "Full access", pay once, keep it). */
export interface PurchasedAccessSummary {
  planName: string;
  /** When the access started (the confirmed payment). */
  since: Date;
  /** `null` = lifetime. */
  endsAt: Date | null;
  receiptNumber: string | null;
  /** Result / receipt page of the payment, when the student may open it. */
  receiptHref: string | null;
  paidByParent: boolean;
}

/** The one-off offer for students who do not own it yet (price from the database). */
export interface BillingOfferView {
  planName: string;
  tagline: string | null;
  highlights: string[];
  /** "US$1". */
  amountLabel: string;
  lifetime: boolean;
  checkoutHref: string;
}

export interface BillingOverview {
  /** Name of the plan that best describes the student's access. */
  planName: string;
  sources: AccessSourceView[];
  subscription: StudentSubscriptionView | null;
  entitlements: Entitlements;
  plans: PlanOfferView[];
  /** Bought one-off access (lifetime first), or `null`. */
  purchase: PurchasedAccessSummary | null;
  /** What to buy next ("Unlock everything for US$1"), or `null` when owned or nothing is on sale. */
  offer: BillingOfferView | null;
  payments: { items: StudentPaymentRow[]; nextCursor: string | null };
  packs: OwnedPackView[];
}

const paymentCursorSchema = z.object({ t: z.iso.datetime(), id: z.uuid() });

const PAYMENT_ROW_SELECT = {
  id: true,
  status: true,
  purpose: true,
  amountMinor: true,
  currency: true,
  refundedAmountMinor: true,
  provider: true,
  method: true,
  receiptNumber: true,
  createdAt: true,
  paidAt: true,
  payerUserId: true,
  planPrice: { select: { plan: { select: { name: true } } } },
  studyPack: { select: { title: true } },
} as const;

/**
 * The student's payments (they are the beneficiary: their own, or ones a parent made for them), newest first,
 * cursor-paginated on (createdAt, id) over the Payment(beneficiaryUserId, createdAt) index.
 */
export async function listStudentPayments(
  actor: Actor,
  options: { cursor?: string | null; limit?: number } = {},
): Promise<{ items: StudentPaymentRow[]; nextCursor: string | null }> {
  requireStudent(actor);
  const limit = Math.min(50, Math.max(1, Math.floor(options.limit ?? PAYMENTS_PAGE_SIZE)));
  const after = options.cursor ? decodeCursor(options.cursor, paymentCursorSchema) : null;
  const rows = await db.payment.findMany({
    where: {
      beneficiaryUserId: actor.userId,
      ...(after
        ? { OR: [{ createdAt: { lt: new Date(after.t) } }, { createdAt: new Date(after.t), id: { lt: after.id } }] }
        : {}),
    },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: limit + 1,
    select: PAYMENT_ROW_SELECT,
  });
  const page = rows.slice(0, limit);
  const last = page.at(-1);
  return {
    items: page.map((row) => ({
      id: row.id,
      status: row.status,
      purpose: row.purpose,
      itemName: row.planPrice?.plan?.name ?? row.studyPack?.title ?? null,
      amountMinor: row.amountMinor,
      currency: row.currency,
      refundedAmountMinor: row.refundedAmountMinor,
      methodLabel: paymentMethodLabel(row.provider, row.method),
      receiptNumber: row.receiptNumber,
      createdAt: row.createdAt,
      paidAt: row.paidAt,
      paidByYou: row.payerUserId === actor.userId,
    })),
    nextCursor: rows.length > limit && last ? encodeCursor({ t: last.createdAt.toISOString(), id: last.id }) : null,
  };
}

/** Study packs the student holds (purchased or granted), newest first. */
export async function listOwnedPacks(actor: Actor, now: Date = new Date()): Promise<OwnedPackView[]> {
  requireStudent(actor);
  // EntitlementGrant(userId, endsAt) index; a student holds a handful of packs.
  const grants = await db.entitlementGrant.findMany({
    where: { userId: actor.userId, studyPackId: { not: null }, revokedAt: null },
    orderBy: [{ createdAt: "desc" }, { id: "desc" }],
    take: 50,
    select: { id: true, startsAt: true, endsAt: true, studyPack: { select: { id: true, title: true, slug: true } } },
  });
  return grants.flatMap((grant) =>
    grant.studyPack
      ? [
          {
            grantId: grant.id,
            packId: grant.studyPack.id,
            title: grant.studyPack.title,
            slug: grant.studyPack.slug,
            startsAt: grant.startsAt,
            endsAt: grant.endsAt,
            state:
              grant.endsAt !== null && grant.endsAt.getTime() <= now.getTime()
                ? ("ended" as const)
                : grant.startsAt.getTime() > now.getTime()
                  ? ("upcoming" as const)
                  : ("active" as const),
          },
        ]
      : [],
  );
}

async function studentCountryId(userId: string): Promise<string | null> {
  const student = await db.student.findUnique({ where: { userId }, select: { countryId: true } });
  return student?.countryId ?? null;
}

function individualPlans(countryId: string | null, now: Date): Promise<PlanView[]> {
  return listPublicPlans(undefined, { audience: "INDIVIDUAL", countryId, now });
}

/** Catalogue names for plan codes (public catalogue first; others, e.g. pilot or school plans, by code). */
async function planNamesFor(codes: readonly string[], publicPlans: readonly PlanView[]): Promise<Map<string, string>> {
  const names = new Map(publicPlans.map((plan) => [plan.code, plan.name]));
  const missing = [...new Set(codes)].filter((code) => !names.has(code));
  // Bounded by the number of distinct sources (own, school, grant, free): at most a few lookups.
  const found = await Promise.all(missing.map((code) => getPlanByCode(code, { includeInactive: true })));
  for (const plan of found) if (plan) names.set(plan.code, plan.name);
  return names;
}

export async function getBillingOverview(actor: Actor, options: { paymentsCursor?: string | null; now?: Date } = {}): Promise<BillingOverview> {
  requireStudent(actor);
  const now = options.now ?? new Date();
  const [resolution, own, countryId] = await Promise.all([
    getEntitlements(actor.userId),
    getCurrentSubscription(actor.userId),
    studentCountryId(actor.userId),
  ]);
  const plans = await individualPlans(countryId, now);
  const codes = resolution.sources.flatMap((source) => (source.planCode ? [source.planCode] : []));
  const fullAccess = selectFullAccessOffer(plans);
  const [names, payments, packs, bought, ownsOffer] = await Promise.all([
    planNamesFor(resolution.planCode ? [...codes, resolution.planCode] : codes, plans),
    listStudentPayments(actor, { cursor: options.paymentsCursor ?? null }),
    listOwnedPacks(actor, now),
    getPurchasedAccess(actor.userId, { now }),
    fullAccess ? ownsLifetimePlan(actor.userId, fullAccess.plan.id, { now }) : Promise.resolve(false),
  ]);

  return {
    planName: (resolution.planCode ? names.get(resolution.planCode) : undefined) ?? "No access yet",
    // A purchase is shown on its own ("Full access since …, receipt …"), not again in the list of sources.
    sources: describeAccessSources({ sources: resolution.sources, userId: actor.userId, ownSubscription: own, planNames: names, now }).filter(
      (source) => source.grantSource !== "PURCHASE",
    ),
    purchase: bought
      ? {
          planName: bought.plan.name,
          since: bought.since,
          endsAt: bought.endsAt,
          receiptNumber: bought.payment?.receiptNumber ?? null,
          receiptHref: bought.payment ? paymentResultHref(bought.payment.id) : null,
          paidByParent: bought.payment !== null && bought.payment.payerUserId !== actor.userId,
        }
      : null,
    offer:
      fullAccess && !ownsOffer
        ? {
            planName: fullAccess.plan.name,
            tagline: fullAccess.plan.tagline,
            highlights: fullAccess.plan.highlights,
            amountLabel: fullAccess.price.amountLabel,
            lifetime: fullAccess.price.lifetime,
            checkoutHref: studentCheckoutHref(fullAccess.price.id),
          }
        : null,
    subscription: own
      ? {
          id: own.id,
          status: own.status,
          planName: own.plan.name,
          cancelAtPeriodEnd: own.cancelAtPeriodEnd,
          currentPeriodEnd: own.currentPeriodEnd,
          accessEndsAt: own.accessEndsAt,
          paidByParent: own.payerUserId !== null && own.payerUserId !== actor.userId,
          live: own.accessEndsAt !== null,
        }
      : null,
    entitlements: resolution.entitlements,
    plans: planOffers(plans, resolution.planCode),
    payments,
    packs,
  };
}

// =====================================================================================================================
// Checkout choices (/app/billing/checkout)
// =====================================================================================================================

export type CheckoutChoices =
  | { kind: "plans"; items: CheckoutItemGroup[]; methods: CheckoutMethodView[] }
  | { kind: "pack"; pack: { id: string; title: string; subtitle: string | null }; items: CheckoutItemGroup[]; methods: CheckoutMethodView[] }
  | { kind: "pack-owned"; pack: { id: string; title: string } }
  /** Every plan on sale is one the student already owns for good (one-off "Full access"): nothing to pay. */
  | { kind: "owned"; planName: string }
  | { kind: "unavailable" };

const PACK_PRICE_SELECT = {
  id: true,
  currency: true,
  amountMinor: true,
  interval: true,
  intervalCount: true,
  periodDays: true,
  perSeat: true,
  label: true,
  countryId: true,
  isActive: true,
  validFrom: true,
  validTo: true,
  sortOrder: true,
} as const;

function currenciesOf(items: readonly CheckoutItemGroup[]): string[] {
  return [...new Set(items.flatMap((item) => item.prices.map((price) => price.currency)))];
}

/** What the student can buy: every public plan price, or one study pack's prices. Prices come from the database. */
export async function getCheckoutChoices(
  actor: Actor,
  input: { studyPackId?: string | null; now?: Date } = {},
  options: CheckoutOptions = {},
): Promise<CheckoutChoices> {
  requireStudent(actor);
  const now = input.now ?? new Date();
  const countryId = await studentCountryId(actor.userId);
  // Feature flags decide whether dormant providers (Stripe) are offered; without them they never are.
  const methodOptions = { ...(options.env ? { env: options.env } : {}), features: options.features ?? (await getFeatures()) };

  if (input.studyPackId) {
    if (!uuid.safeParse(input.studyPackId).success) return { kind: "unavailable" };
    const pack = await db.studyPack.findFirst({
      where: { id: input.studyPackId, status: "PUBLISHED", draftOfId: null },
      select: { id: true, title: true, subtitle: true, _count: { select: { scopes: true } } },
    });
    if (!pack || pack._count.scopes === 0) return { kind: "unavailable" };
    const owned = await db.entitlementGrant.findFirst({
      where: { userId: actor.userId, studyPackId: pack.id, revokedAt: null, startsAt: { lte: now }, endsAt: null },
      select: { id: true },
    });
    if (owned) return { kind: "pack-owned", pack: { id: pack.id, title: pack.title } };
    // PlanPrice(studyPackId, isActive, currency) index.
    const rows = await db.planPrice.findMany({ where: { studyPackId: pack.id, isActive: true }, select: PACK_PRICE_SELECT });
    const current = rows
      .filter((row) => isPriceCurrent(row, now) && (row.countryId === null || row.countryId === countryId))
      .sort((a, b) => a.sortOrder - b.sortOrder || a.amountMinor - b.amountMinor)
      .map((row) => ({ ...row, minSeats: null }));
    const items: CheckoutItemGroup[] = [
      { id: pack.id, name: pack.title, tagline: pack.subtitle, highlights: [], prices: purchasablePrices(current), current: false },
    ];
    if (items[0]?.prices.length === 0) return { kind: "unavailable" };
    return { kind: "pack", pack: { id: pack.id, title: pack.title, subtitle: pack.subtitle }, items, methods: availableCheckoutMethods(currenciesOf(items), methodOptions) };
  }

  const [resolution, plans] = await Promise.all([getEntitlements(actor.userId), individualPlans(countryId, now)]);
  const priced = planOffers(plans, resolution.planCode).filter((plan) => plan.prices.length > 0);
  // A plan the student already owns for good (one-off lifetime purchase or staff credit) is not offered again.
  const owned = await Promise.all(
    priced.map((plan) =>
      plan.prices.every((price) => price.interval === "ONE_OFF" && price.periodDays === null)
        ? ownsLifetimePlan(actor.userId, plan.id, { now })
        : Promise.resolve(false),
    ),
  );
  const items = priced
    .filter((_, index) => !owned[index])
    .map(({ id, name, tagline, highlights, prices, current }) => ({ id, name, tagline, highlights, prices, current }));
  if (items.length === 0) {
    const ownedPlan = priced.find((_, index) => owned[index]);
    return ownedPlan ? { kind: "owned", planName: ownedPlan.name } : { kind: "unavailable" };
  }
  // One-off "Full access" is paid through Paynow only (owner decision 2026-10-07; the sandbox outside production).
  const oneOffOnly = items.every((item) => item.prices.every((price) => price.interval === "ONE_OFF"));
  return {
    kind: "plans",
    items,
    methods: availableCheckoutMethods(currenciesOf(items), { ...methodOptions, ...(oneOffOnly ? { onlyProviders: PLAN_PURCHASE_PROVIDERS } : {}) }),
  };
}

// =====================================================================================================================
// Start checkout
// =====================================================================================================================

const checkoutInputSchema = z
  .object({
    // SUBSCRIPTION and PLAN_PURCHASE both mean "a plan price"; the checkout service decides by the price's interval.
    purpose: z.enum(["SUBSCRIPTION", "PLAN_PURCHASE", "STUDY_PACK"], { error: "Choose what to buy." }),
    planPriceId: z.uuid({ error: "Choose a price." }).optional(),
    studyPackId: z.uuid({ error: "Choose a study pack." }).optional(),
    methodId: z.enum(CHECKOUT_METHOD_IDS, { error: "Choose how to pay." }),
    phone: z.string().trim().max(32).optional(),
    idempotencyKey: z.string().trim().min(16).max(64).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.purpose !== "STUDY_PACK" && !value.planPriceId) ctx.addIssue({ code: "custom", path: ["planPriceId"], message: "Choose a plan." });
    if (value.purpose === "STUDY_PACK" && !value.studyPackId) ctx.addIssue({ code: "custom", path: ["studyPackId"], message: "Choose a study pack." });
  });

/** Blank form fields are "not given" (lets the schema report the missing choice instead of a format error). */
function present(value: unknown): unknown {
  return typeof value === "string" && value.trim() === "" ? undefined : value;
}

/** Only http(s) URLs leave the app (never `javascript:`); anything else is a provider bug. */
function safeProviderUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") return parsed.toString();
  } catch {
    // fall through
  }
  logger.error("billing: provider returned an unusable checkout URL");
  throw new AppError("INTERNAL", "We couldn't open the payment page. Please try again.");
}

/**
 * Starts (or resumes) the student's own checkout. The amount, payer and beneficiary are never client input: the
 * student pays for themselves, and `startCheckout` takes the amount from the price row, applies the idempotency key
 * (a retry returns the same payment) and talks to the provider.
 *
 * @throws AppError VALIDATION | BAD_REQUEST | NOT_FOUND | CONFLICT | RATE_LIMITED | FORBIDDEN (from startCheckout)
 */
export async function startStudentCheckout(
  actor: Actor,
  raw: { purpose?: unknown; planPriceId?: unknown; studyPackId?: unknown; methodId?: unknown; phone?: unknown; idempotencyKey?: unknown },
  options: CheckoutOptions = {},
): Promise<CheckoutOutcome> {
  requireStudent(actor);
  const parsed = checkoutInputSchema.safeParse({
    purpose: present(raw.purpose),
    planPriceId: present(raw.planPriceId),
    studyPackId: present(raw.studyPackId),
    methodId: present(raw.methodId),
    phone: present(raw.phone),
    idempotencyKey: present(raw.idempotencyKey),
  });
  if (!parsed.success) throw AppError.fromZod(parsed.error);
  const input = parsed.data;
  const env = options.env ?? getEnv();
  const definition = methodDefinition(input.methodId);
  if (!definition || (definition.test && !testMethodsAllowed(env))) {
    throw AppError.validation({ methodId: ["That payment method is not available. Please choose another one."] });
  }
  if (definition.needsPhone && !input.phone) {
    throw AppError.validation({ phone: ["Enter the mobile money number to charge, e.g. 0771 234 567."] });
  }

  const result = await startCheckout(
    {
      userId: actor.userId,
      purpose: input.purpose,
      ...(input.planPriceId ? { planPriceId: input.planPriceId } : {}),
      ...(input.purpose === "STUDY_PACK" && input.studyPackId ? { studyPackId: input.studyPackId } : {}),
      provider: definition.provider,
      ...(definition.paynowMethod ? { paynowMethod: definition.paynowMethod, phone: input.phone } : {}),
      ...(input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : {}),
    },
    options,
  );

  if (result.kind === "redirect") return { kind: "redirect", url: safeProviderUrl(result.url), paymentId: result.paymentId };
  const stored = await db.payment.findUnique({ where: { id: result.paymentId }, select: { metadata: true } });
  return {
    kind: "mobile",
    paymentId: result.paymentId,
    instructions: result.instructions,
    methodLabel: definition.label,
    maskedMsisdn: metadataString(stored?.metadata, "maskedMsisdn"),
    resultHref: paymentResultHref(result.paymentId),
    sandboxHref: definition.provider === "sandbox" && testMethodsAllowed(env) ? sandboxCheckoutPath(result.paymentId) : null,
  };
}

// =====================================================================================================================
// One payment: status (polling) and result page
// =====================================================================================================================

const PAYMENT_DETAIL_SELECT = {
  id: true,
  status: true,
  purpose: true,
  provider: true,
  method: true,
  amountMinor: true,
  currency: true,
  refundedAmountMinor: true,
  receiptNumber: true,
  failureCode: true,
  createdAt: true,
  paidAt: true,
  servicePeriodEnd: true,
  payerUserId: true,
  beneficiaryUserId: true,
  metadata: true,
  planPrice: { select: { plan: { select: { name: true, entitlements: true } } } },
  studyPack: { select: { id: true, title: true, slug: true, entitlements: true } },
} as const;

/** The payment if the student paid it or it was for them; NOT_FOUND otherwise (same answer as "no such payment"). */
async function loadOwnPayment(actor: Actor, paymentId: unknown) {
  requireStudent(actor);
  const id = uuid.safeParse(paymentId);
  if (!id.success) throw AppError.notFound("We couldn't find that payment.");
  const payment = await db.payment.findFirst({
    where: { id: id.data, OR: [{ payerUserId: actor.userId }, { beneficiaryUserId: actor.userId }] },
    select: PAYMENT_DETAIL_SELECT,
  });
  if (!payment) throw AppError.notFound("We couldn't find that payment.");
  return payment;
}

function statusView(payment: { id: string; status: PaymentStatus; failureCode: string | null }): PaymentStatusView {
  return {
    paymentId: payment.id,
    status: payment.status,
    message: payment.status === "FAILED" || payment.status === "CANCELLED" ? paymentFailureMessage(payment.status, payment.failureCode) : null,
    resultHref: paymentResultHref(payment.id),
  };
}

/** Provider status polls requested from the browser, per student (same budget as provider-return polls). */
function statusPollLimit(userId: string) {
  return { ...RATE_LIMIT_PRESETS.billingReturnPoll, key: `billingStatusPoll:${userId}`, preset: "billingReturnPoll" as const };
}

/**
 * The payment's stored status (only a verified webhook or our own provider poll ever changes it). With `refresh`,
 * a PENDING payment is first checked with the provider (rate-limited per student; failures leave the status as is).
 */
export async function getStudentPaymentStatus(actor: Actor, paymentId: unknown, options: { refresh?: boolean } = {}): Promise<PaymentStatusView> {
  const payment = await loadOwnPayment(actor, paymentId);
  if (!options.refresh || payment.status !== "PENDING") return statusView(payment);
  const limit = await rateLimit(statusPollLimit(actor.userId));
  if (!limit.allowed) return statusView(payment);
  try {
    await pollPayment(payment.id);
  } catch (error) {
    logger.warn("billing: student status poll failed", { paymentId: payment.id, err: error });
    return statusView(payment);
  }
  const fresh = await db.payment.findUnique({ where: { id: payment.id }, select: { id: true, status: true, failureCode: true } });
  return statusView(fresh ?? payment);
}

export interface StudentPaymentResult {
  id: string;
  status: PaymentStatus;
  purpose: PaymentPurpose;
  itemName: string | null;
  amountMinor: number;
  currency: string;
  refundedAmountMinor: number;
  methodLabel: string;
  receiptNumber: string | null;
  createdAt: Date;
  paidAt: Date | null;
  /** Subscriptions: end of the period this payment bought. */
  servicePeriodEnd: Date | null;
  paidByYou: boolean;
  /** Mobile money while waiting, for the payer only. */
  instructions: string | null;
  /** "+263 77* *** 567", for the payer only. */
  maskedMsisdn: string | null;
  failureMessage: string | null;
  /** What a successful payment unlocked (from the plan / pack entitlement document). */
  unlocked: EntitlementLine[] | null;
  studyPack: { id: string; title: string; slug: string } | null;
}

export async function getStudentPaymentResult(actor: Actor, paymentId: unknown): Promise<StudentPaymentResult> {
  const payment = await loadOwnPayment(actor, paymentId);
  const paidByYou = payment.payerUserId === actor.userId;
  let unlocked: EntitlementLine[] | null = null;
  if (payment.status === "SUCCESSFUL") {
    // AI entitlements are listed only while AI features are switched on (`features.ai`, owner decision 2026-10-07).
    const summary = { ai: await isFeatureEnabled("ai") };
    if (payment.studyPack) {
      // A study pack always unlocks full content in its scope (§24), plus its own document.
      const { entitlements } = normalizeEntitlementDocument(payment.studyPack.entitlements);
      unlocked = includedLines({ ...entitlements, lessonAccess: "ALL" }, summary);
    } else if (payment.planPrice?.plan) {
      unlocked = includedLines(normalizeEntitlementDocument(payment.planPrice.plan.entitlements).entitlements, summary);
    }
  }
  const mobilePending = payment.status === "PENDING" && metadataString(payment.metadata, "checkoutKind") === "mobile_prompt";
  return {
    id: payment.id,
    status: payment.status,
    purpose: payment.purpose,
    itemName: payment.planPrice?.plan?.name ?? payment.studyPack?.title ?? null,
    amountMinor: payment.amountMinor,
    currency: payment.currency,
    refundedAmountMinor: payment.refundedAmountMinor,
    methodLabel: paymentMethodLabel(payment.provider, payment.method),
    receiptNumber: payment.receiptNumber,
    createdAt: payment.createdAt,
    paidAt: payment.paidAt,
    servicePeriodEnd: payment.servicePeriodEnd,
    paidByYou,
    instructions: paidByYou && mobilePending ? metadataString(payment.metadata, "instructions") : null,
    maskedMsisdn: paidByYou ? metadataString(payment.metadata, "maskedMsisdn") : null,
    failureMessage:
      payment.status === "FAILED" || payment.status === "CANCELLED" ? paymentFailureMessage(payment.status, payment.failureCode) : null,
    unlocked,
    studyPack: payment.studyPack ? { id: payment.studyPack.id, title: payment.studyPack.title, slug: payment.studyPack.slug } : null,
  };
}

// =====================================================================================================================
// Cancel at period end / resume
// =====================================================================================================================

/**
 * Stops the student's plan at the end of the paid period (nothing renews automatically anyway: plans are prepaid;
 * this also drops the grace period and renewal reminders). The subscriptions service checks the student holds it.
 */
export async function cancelStudentPlan(actor: Actor, subscriptionId: unknown): Promise<SubscriptionStateView> {
  requireStudent(actor);
  const id = uuid.safeParse(subscriptionId);
  if (!id.success) throw AppError.notFound("Subscription not found.");
  return cancelSubscription(actor, id.data, { reason: "Cancelled by the student" });
}

/** Undoes a cancel-at-period-end while the plan is still running. */
export async function resumeStudentPlan(actor: Actor, subscriptionId: unknown): Promise<SubscriptionStateView> {
  requireStudent(actor);
  const id = uuid.safeParse(subscriptionId);
  if (!id.success) throw AppError.notFound("Subscription not found.");
  return resumeSubscription(actor, id.data);
}
