import "server-only";
import { z } from "zod";
import type { BillingInterval, PlanAudience } from "@/generated/prisma/client";
import type { Entitlements } from "@/lib/billing/entitlements";
import { db } from "@/server/db";
import { memoizeAsync } from "@/server/lib/cache";
import { AppError } from "@/server/lib/errors";
import { logger } from "@/server/lib/logger";
import { normalizeEntitlementDocument } from "./entitlements";

/**
 * Plans and prices for /pricing, /schools and checkout (§31: prices are NOT hard-coded; admins configure them).
 *
 * Plans and PlanPrice rows are data. A plan with no current price in the requested currency has `prices: []`: the UI
 * must show "price not set" (never an invented number, CLAUDE.md rule 6). Prices are immutable rows; a "change" is a
 * new row plus deactivation of the old one, so only rows that are active AND inside their validity window are listed.
 *
 * The public catalogue is cached per instance for {@link PLAN_CACHE_TTL_MS}; validity windows are evaluated per call,
 * so a scheduled price change takes effect on time even from cache. Call {@link invalidatePlanCache} after admin edits.
 */

export const PLAN_CACHE_TTL_MS = 60_000;

const CURRENCY_PATTERN = /^[A-Z]{3}$/;
const PLAN_CODE_PATTERN = /^[A-Z][A-Z0-9_]{1,31}$/;

/** A price as shown to buyers (no internal flags). */
export interface PlanPriceView {
  id: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  /** Explicit period length (TERM prices; ONE_OFF access windows). */
  periodDays: number | null;
  /** School seat pricing: `amountMinor` per seat per period. */
  perSeat: boolean;
  minSeats: number | null;
  /** Admin label, e.g. "Term 1 2027" or "Launch price". */
  label: string | null;
  /** `null` = available in every country. */
  countryId: string | null;
  /** When this price stops being offered (`null` = open-ended). */
  validTo: Date | null;
}

/** A plan with its current prices and parsed entitlements (for comparison tables). */
export interface PlanView {
  id: string;
  code: string;
  name: string;
  tagline: string | null;
  /** Markdown, CMS-managed. Render with the content renderer, never as raw HTML. */
  description: string | null;
  highlights: string[];
  audience: PlanAudience;
  trialDays: number;
  isDefault: boolean;
  isPublic: boolean;
  isActive: boolean;
  sortOrder: number;
  entitlements: Entitlements;
  /** Current prices; empty when none is configured ("price not set"). */
  prices: PlanPriceView[];
}

/** A PlanPrice row as loaded (pure selection input). */
export interface PriceRow extends PlanPriceView {
  planId: string | null;
  isActive: boolean;
  validFrom: Date;
  sortOrder: number;
}

export interface PriceSelection {
  now: Date;
  /** ISO 4217; omit for every currency. */
  currency?: string;
  /** Buyer's country: its country-specific prices replace global ones with the same terms. Omit for global only. */
  countryId?: string | null;
}

const INTERVAL_ORDER: Readonly<Record<BillingInterval, number>> = { WEEK: 0, MONTH: 1, TERM: 2, YEAR: 3, ONE_OFF: 4 };

function termsKey(p: PriceRow): string {
  return [p.currency, p.interval, p.intervalCount, p.periodDays ?? "", p.perSeat ? "seat" : "flat"].join("|");
}

/** True when a price row is purchasable at `now` (active and inside its validity window). */
export function isPriceCurrent(price: Pick<PriceRow, "isActive" | "validFrom" | "validTo">, now: Date): boolean {
  return (
    price.isActive &&
    price.validFrom.getTime() <= now.getTime() &&
    (price.validTo === null || now.getTime() < price.validTo.getTime())
  );
}

/**
 * Pure price selection: current rows, optionally one currency; global prices plus (when `countryId` is given) that
 * country's prices, a country price replacing the global price with the same terms. Sorted by admin order, then
 * interval (week, month, term, year, one-off), then amount.
 */
export function selectCurrentPrices(prices: readonly PriceRow[], selection: PriceSelection): PlanPriceView[] {
  const candidates = prices.filter(
    (p) =>
      isPriceCurrent(p, selection.now) &&
      (selection.currency === undefined || p.currency === selection.currency) &&
      (p.countryId === null || (selection.countryId !== undefined && selection.countryId !== null && p.countryId === selection.countryId)),
  );
  const countryTerms = new Set(candidates.filter((p) => p.countryId !== null).map(termsKey));
  return candidates
    .filter((p) => p.countryId !== null || !countryTerms.has(termsKey(p)))
    .sort(
      (a, b) =>
        a.sortOrder - b.sortOrder ||
        INTERVAL_ORDER[a.interval] - INTERVAL_ORDER[b.interval] ||
        a.intervalCount - b.intervalCount ||
        a.amountMinor - b.amountMinor,
    )
    .map(toPriceView);
}

function toPriceView(p: PlanPriceView): PlanPriceView {
  return {
    id: p.id,
    currency: p.currency,
    amountMinor: p.amountMinor,
    interval: p.interval,
    intervalCount: p.intervalCount,
    periodDays: p.periodDays,
    perSeat: p.perSeat,
    minSeats: p.minSeats,
    label: p.label,
    countryId: p.countryId,
    validTo: p.validTo,
  };
}

const PLAN_SELECT = {
  id: true,
  code: true,
  name: true,
  tagline: true,
  description: true,
  highlights: true,
  audience: true,
  trialDays: true,
  isDefault: true,
  isPublic: true,
  isActive: true,
  sortOrder: true,
  entitlements: true,
} as const;

const PRICE_SELECT = {
  id: true,
  planId: true,
  currency: true,
  amountMinor: true,
  interval: true,
  intervalCount: true,
  periodDays: true,
  perSeat: true,
  minSeats: true,
  label: true,
  countryId: true,
  isActive: true,
  validFrom: true,
  validTo: true,
  sortOrder: true,
} as const;

type PlanRow = { id: string; code: string; entitlements: unknown } & Omit<PlanView, "entitlements" | "prices">;

function toPlanView(plan: PlanRow, prices: PlanPriceView[]): PlanView {
  const { entitlements, issues } = normalizeEntitlementDocument(plan.entitlements);
  if (issues.length > 0) logger.warn("billing: plan entitlements have problems", { plan: plan.code, issues });
  return {
    id: plan.id,
    code: plan.code,
    name: plan.name,
    tagline: plan.tagline,
    description: plan.description,
    highlights: plan.highlights,
    audience: plan.audience,
    trialDays: plan.trialDays,
    isDefault: plan.isDefault,
    isPublic: plan.isPublic,
    isActive: plan.isActive,
    sortOrder: plan.sortOrder,
    entitlements,
    prices,
  };
}

const loadPublicCatalogue = memoizeAsync(
  async (): Promise<{ plans: PlanRow[]; prices: PriceRow[] }> => {
    // Plan(isActive, isPublic, audience, sortOrder) index.
    const plans = await db.plan.findMany({
      where: { isActive: true, isPublic: true },
      orderBy: [{ sortOrder: "asc" }, { code: "asc" }],
      select: PLAN_SELECT,
    });
    // PlanPrice(planId, isActive, currency) index. Validity windows are checked per call (cache-safe).
    const prices =
      plans.length === 0
        ? []
        : await db.planPrice.findMany({ where: { planId: { in: plans.map((p) => p.id) }, isActive: true }, select: PRICE_SELECT });
    return { plans, prices };
  },
  { ttlMs: PLAN_CACHE_TTL_MS, maxEntries: 1 },
);

function parseCurrency(currency: string | undefined): string | undefined {
  if (currency === undefined) return undefined;
  const upper = currency.trim().toUpperCase();
  if (!CURRENCY_PATTERN.test(upper)) throw AppError.validation({ currency: ["Use a 3-letter currency code, e.g. USD."] });
  return upper;
}

const uuidSchema = z.uuid();

function parseCountryId(countryId: string | null | undefined): string | null | undefined {
  if (countryId === undefined || countryId === null) return countryId;
  if (!uuidSchema.safeParse(countryId).success) throw AppError.validation({ countryId: ["Invalid id."] });
  return countryId;
}

export interface ListPlansOptions {
  /** Only plans for this audience (INDIVIDUAL for /pricing, SCHOOL for /schools). */
  audience?: PlanAudience;
  /** Buyer's country for country-specific prices. */
  countryId?: string | null;
  now?: Date;
}

/**
 * Public, active plans in display order with their current prices (optionally in one currency). Plans without a price
 * are still listed with `prices: []`.
 *
 * @throws AppError VALIDATION for a malformed currency or country id
 */
export async function listPublicPlans(currency?: string, options: ListPlansOptions = {}): Promise<PlanView[]> {
  const selection: PriceSelection = { now: options.now ?? new Date() };
  const cur = parseCurrency(currency);
  if (cur !== undefined) selection.currency = cur;
  const countryId = parseCountryId(options.countryId);
  if (countryId !== undefined) selection.countryId = countryId;

  const { plans, prices } = await loadPublicCatalogue();
  return plans
    .filter((plan) => options.audience === undefined || plan.audience === options.audience)
    .map((plan) => toPlanView(plan, selectCurrentPrices(prices.filter((p) => p.planId === plan.id), selection)));
}

/**
 * One plan by code (case-insensitive), including non-public plans (pilots, staff-assigned) and, with
 * `includeInactive`, retired ones. `null` when unknown.
 */
export async function getPlanByCode(
  code: string,
  options: { currency?: string; countryId?: string | null; includeInactive?: boolean; now?: Date } = {},
): Promise<PlanView | null> {
  const normalized = code.trim().toUpperCase();
  if (!PLAN_CODE_PATTERN.test(normalized)) return null;
  const selection: PriceSelection = { now: options.now ?? new Date() };
  const cur = parseCurrency(options.currency);
  if (cur !== undefined) selection.currency = cur;
  const countryId = parseCountryId(options.countryId);
  if (countryId !== undefined) selection.countryId = countryId;

  const plan = await db.plan.findUnique({
    where: { code: normalized },
    select: { ...PLAN_SELECT, prices: { where: { isActive: true }, select: PRICE_SELECT } },
  });
  if (!plan || (!plan.isActive && !options.includeInactive)) return null;
  const { prices, ...row } = plan;
  return toPlanView(row, selectCurrentPrices(prices, selection));
}

/** A price validated for checkout, with what it buys. */
export interface CheckoutPrice {
  price: PlanPriceView;
  /** Set for subscription prices. */
  plan: { id: string; code: string; name: string; audience: PlanAudience } | null;
  /** Set for study pack prices (§24). */
  studyPackId: string | null;
}

/**
 * Loads a price for checkout and checks it is purchasable now: active, inside its window, and (for plans) on an active
 * plan. Amount and currency for the Payment row MUST come from here, never from the client.
 *
 * @throws AppError NOT_FOUND when the price is unknown or no longer on sale
 */
export async function getCheckoutPrice(planPriceId: string, now: Date = new Date()): Promise<CheckoutPrice> {
  if (!uuidSchema.safeParse(planPriceId).success) throw AppError.validation({ planPriceId: ["Invalid id."] });
  const row = await db.planPrice.findUnique({
    where: { id: planPriceId },
    select: {
      ...PRICE_SELECT,
      studyPackId: true,
      plan: { select: { id: true, code: true, name: true, audience: true, isActive: true } },
    },
  });
  if (!row || !isPriceCurrent(row, now) || (row.plan !== null && !row.plan.isActive)) {
    throw AppError.notFound("This price is no longer available. Please choose again.");
  }
  const { plan } = row;
  return {
    price: toPriceView(row),
    plan: plan ? { id: plan.id, code: plan.code, name: plan.name, audience: plan.audience } : null,
    studyPackId: row.studyPackId,
  };
}

/** Drops this instance's cached public catalogue (call after plan/price edits in the admin). */
export function invalidatePlanCache(): void {
  loadPublicCatalogue.clear();
}
