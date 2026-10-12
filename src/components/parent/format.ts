import type { BillingInterval, PaymentStatus } from "@/generated/prisma/client";
import { DEFAULT_LOCALE } from "@/lib/config";
import { EMPTY_VALUE, formatCount } from "@/lib/format";

/** Display helpers for the parent area. Pure and isomorphic. */

const moneyFormats = new Map<string, Intl.NumberFormat>();

function moneyFormat(currency: string): Intl.NumberFormat | null {
  let format = moneyFormats.get(currency);
  if (!format) {
    try {
      format = new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency });
    } catch {
      return null;
    }
    moneyFormats.set(currency, format);
  }
  return format;
}

/** Minor units → "US$5.00" / "ZWG 120.00", using the currency's own number of decimals. */
export function formatMoney(amountMinor: number, currency: string): string {
  if (!Number.isFinite(amountMinor)) return EMPTY_VALUE;
  const format = moneyFormat(currency);
  if (!format) return `${currency} ${(amountMinor / 100).toFixed(2)}`;
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return format.format(amountMinor / 10 ** digits);
}

/** "per month", "every 3 months", "per term", "for 90 days". */
export function describeBillingPeriod(price: { interval: BillingInterval; intervalCount: number; periodDays: number | null }): string {
  const every = (unit: string) => (price.intervalCount === 1 ? `per ${unit}` : `every ${formatCount(price.intervalCount, unit)}`);
  switch (price.interval) {
    case "WEEK":
      return every("week");
    case "MONTH":
      return every("month");
    case "YEAR":
      return every("year");
    case "TERM":
      return every("term");
    case "ONE_OFF":
      if (price.periodDays === null) return "one-off";
      // A 28-31 day pass is "a month" (owner decision 2026-10-12: US$1 a month, renewed through Paynow).
      return price.periodDays >= 28 && price.periodDays <= 31 ? "for a month" : `for ${formatCount(price.periodDays, "day")}`;
  }
}

export const PAYMENT_STATUS_LABELS: Readonly<Record<PaymentStatus, string>> = {
  PENDING: "Waiting for payment",
  SUCCESSFUL: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
  CANCELLED: "Cancelled",
};

export const PAYMENT_STATUS_TONES: Readonly<Record<PaymentStatus, "neutral" | "success" | "danger" | "info" | "warning">> = {
  PENDING: "info",
  SUCCESSFUL: "success",
  FAILED: "danger",
  REFUNDED: "neutral",
  CANCELLED: "neutral",
};
