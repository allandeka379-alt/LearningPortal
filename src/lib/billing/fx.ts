import { z } from "zod";

/**
 * Revenue normalisation to US dollars (§32, §35; STATUS "ZWG→USD revenue normalisation"). Isomorphic and pure.
 *
 * Rates are DATA, entered by a super admin in the `fx.rates` setting (/admin/settings), never built in:
 *
 *     { "ZWG": { "USD": 0.0373, "asOf": "2026-10-01", "source": "RBZ interbank mid-rate" } }
 *
 * meaning 1 ZWG = 0.0373 USD on 2026-10-01. USD needs no entry. With no rate for a currency, no USD total is shown at
 * all (revenue stays per currency); a partial total that silently drops a currency would be a fake number (§50).
 *
 * One rate per currency is applied to the whole reporting range (dated rates are not modelled): the UI labels the
 * total with the rate date so nobody reads it as "converted at each payment's date". Minor units are cents for every
 * currency, as everywhere else in the platform (amountMinor / 100).
 */

export const FX_BASE_CURRENCY = "USD";

const currencyCode = z.string().regex(/^[A-Z]{3}$/, { error: "Use a three-letter ISO currency code such as ZWG." });

export const fxRateSchema = z.looseObject({
  /** US dollars per ONE unit of the currency. */
  USD: z.number().positive().max(1_000_000),
  /** Date the rate applies to (YYYY-MM-DD). */
  asOf: z.iso.date(),
  /** Where the rate comes from (e.g. "RBZ interbank mid-rate"). */
  source: z.string().trim().min(1).max(120).optional(),
});
export type FxRate = z.output<typeof fxRateSchema>;

export const fxRatesSchema = z
  .record(currencyCode, fxRateSchema)
  .refine((rates) => !Object.hasOwn(rates, FX_BASE_CURRENCY), { error: "USD is the currency everything is converted to; it needs no rate." });
export type FxRates = z.output<typeof fxRatesSchema>;

/** Revenue of one currency over a range (minor units). */
export interface CurrencyRevenue {
  currency: string;
  amountMinor: number;
  refundsMinor: number;
  netMinor: number;
}

export interface RevenueUsdEquivalent {
  /** Every currency had a rate (or was USD): only then are the totals shown. */
  complete: boolean;
  grossUsdMinor: number;
  refundsUsdMinor: number;
  netUsdMinor: number;
  /** The rates used, one per non-USD currency with revenue. */
  rates: { currency: string; usdPerUnit: number; asOf: string; source: string | null }[];
  /** Non-USD currencies with revenue but no configured rate. */
  missingCurrencies: string[];
}

/**
 * USD equivalent of per-currency revenue, or null when there is nothing to convert (no revenue, or USD only). When a
 * currency has no rate the result is `complete: false` with zero totals: callers show per-currency figures only and
 * name the missing rates.
 */
export function revenueUsdEquivalent(rows: readonly CurrencyRevenue[], rates: FxRates): RevenueUsdEquivalent | null {
  const foreign = rows.filter((row) => row.currency !== FX_BASE_CURRENCY);
  if (foreign.length === 0) return null;
  const missingCurrencies = foreign.filter((row) => !rates[row.currency]).map((row) => row.currency).sort();
  const used = foreign
    .flatMap((row) => {
      const rate = rates[row.currency];
      return rate ? [{ currency: row.currency, usdPerUnit: rate.USD, asOf: rate.asOf, source: rate.source ?? null }] : [];
    })
    .sort((a, b) => a.currency.localeCompare(b.currency));
  if (missingCurrencies.length > 0) {
    return { complete: false, grossUsdMinor: 0, refundsUsdMinor: 0, netUsdMinor: 0, rates: used, missingCurrencies };
  }
  const factor = new Map(used.map((rate) => [rate.currency, rate.usdPerUnit]));
  const convert = (row: CurrencyRevenue, amount: number) => (row.currency === FX_BASE_CURRENCY ? amount : amount * (factor.get(row.currency) ?? 0));
  // Sum unrounded, round once: per-row rounding would drift by a cent per currency.
  const gross = rows.reduce((sum, row) => sum + convert(row, row.amountMinor), 0);
  const refunds = rows.reduce((sum, row) => sum + convert(row, row.refundsMinor), 0);
  const grossUsdMinor = Math.round(gross);
  const refundsUsdMinor = Math.round(refunds);
  return { complete: true, grossUsdMinor, refundsUsdMinor, netUsdMinor: grossUsdMinor - refundsUsdMinor, rates: used, missingCurrencies: [] };
}

/** "rates of 1 Oct 2026" style label input: the distinct rate dates, oldest first. */
export function fxRateDates(equivalent: Pick<RevenueUsdEquivalent, "rates">): string[] {
  return [...new Set(equivalent.rates.map((rate) => rate.asOf))].sort();
}
