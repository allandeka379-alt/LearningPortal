import type { BillingInterval, PromoDiscountType } from "@/generated/prisma/enums";
import { formatMoneyMinor } from "@/components/admin/format";

/** Display labels for commerce values (UI copy; isomorphic and pure). */

function plural(count: number, unit: string): string {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

/** "per month", "every 3 months", "per term (120 days)", "one-off, 90 days of access", "one-off, lifetime access". */
export function periodLabel(price: { interval: BillingInterval; intervalCount: number; periodDays: number | null }): string {
  const days = price.periodDays === null ? "" : ` (${plural(price.periodDays * price.intervalCount, "day")})`;
  const every = (unit: string) => (price.intervalCount === 1 ? `per ${unit}` : `every ${plural(price.intervalCount, unit)}`);
  switch (price.interval) {
    case "WEEK":
      return `${every("week")}${days}`;
    case "MONTH":
      return `${every("month")}${days}`;
    case "TERM":
      return `${every("term")}${days}`;
    case "YEAR":
      return `${every("year")}${days}`;
    case "ONE_OFF":
      return price.periodDays === null ? "one-off, lifetime access" : `one-off, ${plural(price.periodDays * price.intervalCount, "day")} of access`;
  }
}

/** "USD 5.00 per month · per seat (min 20)". */
export function priceLabel(price: {
  amountMinor: number;
  currency: string;
  interval: BillingInterval;
  intervalCount: number;
  periodDays: number | null;
  perSeat?: boolean;
  minSeats?: number | null;
}): string {
  const seat = price.perSeat ? ` · per seat${price.minSeats ? ` (min ${price.minSeats})` : ""}` : "";
  return `${formatMoneyMinor(price.amountMinor, price.currency)} ${periodLabel(price)}${seat}`;
}

export const INTERVAL_OPTIONS: readonly { value: BillingInterval; label: string }[] = [
  { value: "WEEK", label: "Week" },
  { value: "MONTH", label: "Month" },
  { value: "TERM", label: "School term (set days)" },
  { value: "YEAR", label: "Year" },
  { value: "ONE_OFF", label: "One-off payment (blank days = lifetime access)" },
];

export const DISCOUNT_TYPE_LABELS: Readonly<Record<PromoDiscountType, string>> = {
  PERCENT: "Percentage off",
  FIXED_AMOUNT: "Fixed amount off",
  FREE_DAYS: "Free days of a plan",
};

/** "25% off", "USD 1.50 off", "14 free days of STUDENT". */
export function discountLabel(code: {
  discountType: PromoDiscountType;
  percentOff: number | null;
  amountOffMinor: number | null;
  currency: string | null;
  freeDays: number | null;
  grantPlanCode?: string | null;
}): string {
  switch (code.discountType) {
    case "PERCENT":
      return `${code.percentOff ?? "?"}% off`;
    case "FIXED_AMOUNT":
      return `${formatMoneyMinor(code.amountOffMinor, code.currency)} off`;
    case "FREE_DAYS":
      return `${plural(code.freeDays ?? 0, "free day")}${code.grantPlanCode ? ` of ${code.grantPlanCode}` : ""}`;
  }
}
