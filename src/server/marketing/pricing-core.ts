/**
 * Pure shaping of plans and prices for /pricing, /schools and the home pricing teaser (§31). Prices are PlanPrice rows
 * (admin-configured); a plan without a price shows "Pricing coming soon" — never an invented number (CLAUDE.md rule 6).
 * Only the default (fallback) plan, or a price of zero, is presented as free. Unit tested.
 */
import type { BillingInterval } from "@/generated/prisma/enums";
import { describePeriod, formatMoneyMinor, intervalAdjective, orderCurrencies } from "./pricing-format";

/** The price fields this module needs (a subset of `PlanPriceView`). */
export interface PriceInput {
  id: string;
  currency: string;
  amountMinor: number;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat: boolean;
  minSeats: number | null;
  label: string | null;
}

export interface PriceOption {
  id: string;
  currency: string;
  amountMinor: number;
  /** "US$5". */
  amountLabel: string;
  /** "per month", "per learner per term". */
  periodLabel: string;
  /** "Monthly", "Termly", "Yearly". */
  intervalLabel: string;
  /** Admin label, e.g. "Launch price" or "Term 1 2027". */
  label: string | null;
  perSeat: boolean;
  minSeats: number | null;
}

export type PlanPriceStatus = "free" | "priced" | "coming_soon";

export function toPriceOption(price: PriceInput): PriceOption {
  return {
    id: price.id,
    currency: price.currency,
    amountMinor: price.amountMinor,
    amountLabel: price.amountMinor === 0 ? "Free" : formatMoneyMinor(price.amountMinor, price.currency),
    periodLabel: describePeriod(price),
    intervalLabel: intervalAdjective(price.interval, price.intervalCount),
    label: price.label?.trim() || null,
    perSeat: price.perSeat,
    minSeats: price.minSeats,
  };
}

/** Prices grouped by currency (input order kept within a currency, which is the admin display order). */
export function groupPricesByCurrency(prices: readonly PriceInput[]): Record<string, PriceOption[]> {
  const out: Record<string, PriceOption[]> = {};
  for (const price of prices) (out[price.currency] ??= []).push(toPriceOption(price));
  return out;
}

/** Every currency that has at least one price, preferred currencies first. */
export function currenciesOf(plans: readonly { prices: readonly { currency: string }[] }[]): string[] {
  return orderCurrencies(plans.flatMap((plan) => plan.prices.map((price) => price.currency)));
}

/**
 * How a plan's price reads in one currency: "free" (the default plan with no price, or a zero price), "priced", or
 * "coming_soon" (a paid plan whose prices are not configured in that currency yet).
 */
export function planPriceStatus(plan: { isDefault: boolean; prices: Readonly<Record<string, readonly PriceOption[]>> }, currency: string): PlanPriceStatus {
  const prices = plan.prices[currency] ?? [];
  if (prices.length > 0) return prices.every((price) => price.amountMinor === 0) ? "free" : "priced";
  const anyPrice = Object.values(plan.prices).some((list) => list.length > 0);
  return plan.isDefault && !anyPrice ? "free" : "coming_soon";
}

/** The headline price of a plan in a currency: its first (admin-ordered) non-zero price, or null. */
export function headlinePrice(prices: readonly PriceOption[] | undefined): PriceOption | null {
  return prices?.find((price) => price.amountMinor > 0) ?? null;
}
