/**
 * Price display for the public pricing surfaces (§31: prices come from PlanPrice rows, never from code). Pure and
 * isomorphic: no DB, no `server-only`, so it is unit tested directly.
 */
import type { BillingInterval } from "@/generated/prisma/enums";
import { LIFETIME_PRICE_NOTE } from "@/lib/billing/offer";
import { DEFAULT_LOCALE } from "@/lib/config";

/** Currencies offered first on /pricing (Zimbabwe: US dollars and ZiG). Others found in the data follow, A–Z. */
export const PREFERRED_CURRENCIES: readonly string[] = ["USD", "ZWG"];

const CURRENCY_PATTERN = /^[A-Z]{3}$/;

const formats = new Map<string, Intl.NumberFormat>();
function currencyFormat(locale: string, currency: string, fractionDigits: number | null): Intl.NumberFormat {
  const key = `${locale}|${currency}|${fractionDigits ?? "auto"}`;
  let format = formats.get(key);
  if (!format) {
    format = new Intl.NumberFormat(
      locale,
      fractionDigits === null
        ? { style: "currency", currency }
        : { style: "currency", currency, minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits },
    );
    formats.set(key, format);
  }
  return format;
}

/** ISO 4217 minor-unit digits of a currency (2 for USD and ZWG, 0 for JPY), as Intl knows them. */
export function currencyMinorDigits(currency: string, locale: string = DEFAULT_LOCALE): number {
  return currencyFormat(locale, currency, null).resolvedOptions().maximumFractionDigits ?? 2;
}

/**
 * Formats a price stored in minor units: `formatMoneyMinor(500, "USD")` → `"US$5"`, `formatMoneyMinor(4850, "USD")` →
 * `"US$48.50"`. Whole amounts drop the decimals; other amounts show the currency's full minor unit.
 *
 * @throws RangeError for a malformed currency code or a non-integer / negative amount (data the DB CHECKs forbid).
 */
export function formatMoneyMinor(amountMinor: number, currency: string, locale: string = DEFAULT_LOCALE): string {
  if (!CURRENCY_PATTERN.test(currency)) throw new RangeError(`formatMoneyMinor: invalid currency "${currency}"`);
  if (!Number.isInteger(amountMinor) || amountMinor < 0) throw new RangeError(`formatMoneyMinor: invalid amount ${amountMinor}`);
  const digits = currencyMinorDigits(currency, locale);
  const major = amountMinor / 10 ** digits;
  const whole = amountMinor % 10 ** digits === 0;
  return currencyFormat(locale, currency, whole ? 0 : digits).format(major);
}

export interface PeriodInput {
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat: boolean;
}

function every(count: number, singular: string): string {
  return count === 1 ? `per ${singular}` : `every ${count} ${singular}s`;
}

/**
 * Human billing period for a price: "per month", "every 3 months", "per term", "per learner per term",
 * "one-off payment · 90 days' access", "pay once, keep it" (lifetime). Term length is data (`periodDays`), so it is
 * never assumed.
 */
export function describePeriod(price: PeriodInput): string {
  const count = Number.isInteger(price.intervalCount) && price.intervalCount > 0 ? price.intervalCount : 1;
  let base: string;
  switch (price.interval) {
    case "WEEK":
      base = every(count, "week");
      break;
    case "MONTH":
      base = every(count, "month");
      break;
    case "TERM":
      base = every(count, "term");
      break;
    case "YEAR":
      base = every(count, "year");
      break;
    case "ONE_OFF":
      // No access window = lifetime (owner decision 2026-10-07: "Full access", pay once, keep it).
      base = price.periodDays ? `one-off payment · ${price.periodDays} days' access` : LIFETIME_PRICE_NOTE;
      break;
  }
  return price.perSeat ? `per learner ${base}` : base;
}

/** Short tab label for an interval ("Monthly", "Termly", "Yearly"). */
export function intervalAdjective(interval: BillingInterval, intervalCount = 1): string {
  if (intervalCount !== 1) return describePeriod({ interval, intervalCount, periodDays: null, perSeat: false });
  switch (interval) {
    case "WEEK":
      return "Weekly";
    case "MONTH":
      return "Monthly";
    case "TERM":
      return "Termly";
    case "YEAR":
      return "Yearly";
    case "ONE_OFF":
      return "One-off";
  }
}

/** Orders currencies for display: {@link PREFERRED_CURRENCIES} first, then the rest alphabetically; de-duplicated. */
export function orderCurrencies(currencies: Iterable<string>): string[] {
  const unique = [...new Set([...currencies].map((c) => c.trim().toUpperCase()).filter((c) => CURRENCY_PATTERN.test(c)))];
  const rank = (currency: string) => {
    const index = PREFERRED_CURRENCIES.indexOf(currency);
    return index === -1 ? PREFERRED_CURRENCIES.length : index;
  };
  return unique.sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, "en"));
}

/** Display name of a currency ("US Dollar", "Zimbabwean Gold"); falls back to the code. */
export function currencyName(currency: string, locale: string = DEFAULT_LOCALE): string {
  try {
    const name = new Intl.DisplayNames([locale], { type: "currency" }).of(currency);
    return name && name !== currency ? name : currency;
  } catch {
    return currency;
  }
}
