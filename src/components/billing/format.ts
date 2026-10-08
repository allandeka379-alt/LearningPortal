import type { BillingInterval, EntitlementSource, PaymentStatus } from "@/generated/prisma/client";
import { DEFAULT_LOCALE } from "@/lib/config";
import { EMPTY_VALUE, formatCount } from "@/lib/format";

/** Display helpers for billing (§31, §32). Pure and isomorphic; amounts are integer minor units + ISO currency. */

const moneyFormats = new Map<string, Intl.NumberFormat | null>();

function moneyFormat(currency: string): Intl.NumberFormat | null {
  if (!moneyFormats.has(currency)) {
    let format: Intl.NumberFormat | null;
    try {
      format = new Intl.NumberFormat(DEFAULT_LOCALE, { style: "currency", currency });
    } catch {
      format = null;
    }
    moneyFormats.set(currency, format);
  }
  return moneyFormats.get(currency) ?? null;
}

/** Minor units → "US$5.00" / "ZWG 130.00" using the currency's own decimals (unknown codes fall back to 2). */
export function formatMoney(amountMinor: number, currency: string): string {
  if (!Number.isFinite(amountMinor)) return EMPTY_VALUE;
  const format = moneyFormat(currency);
  if (!format) return `${currency} ${(amountMinor / 100).toFixed(2)}`;
  const digits = format.resolvedOptions().maximumFractionDigits ?? 2;
  return format.format(amountMinor / 10 ** digits);
}

export interface PeriodSpec {
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
}

/** "per month", "every 3 months", "per term", "for 90 days", "one-off". */
export function describeBillingPeriod(price: PeriodSpec): string {
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
      return price.periodDays === null ? "one-off" : `for ${formatCount(price.periodDays, "day")}`;
  }
}

/** "US$5.00 per month". */
export function formatPrice(price: PeriodSpec & { amountMinor: number; currency: string }): string {
  return `${formatMoney(price.amountMinor, price.currency)} ${describeBillingPeriod(price)}`;
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

/** Payer-facing reason for a failed / cancelled payment (`Payment.failureCode`, normalised by the providers). */
export function paymentFailureMessage(status: PaymentStatus, failureCode: string | null): string {
  switch (failureCode) {
    case "insufficient_funds":
      return "There wasn't enough money in the wallet or account. Top up, then try again.";
    case "declined":
      return "The payment was declined. Check the details or try another payment method.";
    case "user_cancelled":
      return "The payment was cancelled before it was completed.";
    case "expired":
      return "The payment wasn't approved in time, so it was cancelled. Nothing was charged.";
    case "superseded":
      return "You started a newer checkout, so this one was closed. Nothing was charged for it.";
    case "checkout_failed":
      return "We couldn't reach the payment provider, so nothing was charged. Please try again or choose another method.";
    case "amount_mismatch":
      return "The amount paid didn't match the price. Our team will check it and contact you.";
    default:
      return status === "CANCELLED"
        ? "This payment was cancelled. Nothing more will be charged for it."
        : "This payment didn't go through. You can try again with the same or another payment method.";
  }
}

const METHOD_LABELS: Readonly<Record<string, string>> = {
  ecocash: "EcoCash",
  onemoney: "OneMoney",
  zimswitch: "ZimSwitch",
  card: "Card",
  bank_transfer: "Bank transfer",
  sandbox: "Test payment",
};

/** "EcoCash", "Card", … from `Payment.method` / provider (the sandbox is labelled as a test). */
export function paymentMethodLabel(provider: string, method: string | null): string {
  if (provider === "sandbox") return method && method !== "sandbox" ? `Test ${METHOD_LABELS[method] ?? method}` : "Test payment";
  if (method && METHOD_LABELS[method]) return METHOD_LABELS[method];
  return provider === "paynow" ? "Paynow" : provider === "stripe" ? "Card" : provider;
}

/** Why a grant applies, in student terms. */
export const GRANT_SOURCE_LABELS: Readonly<Record<EntitlementSource, string>> = {
  STUDY_PACK: "Study pack",
  REFERRAL: "Referral reward",
  PROMO: "Promotion",
  ADMIN: "Given by our team",
  SCHOOL_SEAT: "Your school",
  COMPENSATION: "Credit from our team",
  PURCHASE: "Paid once, yours to keep",
};
