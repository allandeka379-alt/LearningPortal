import { fxRateDates, type RevenueUsdEquivalent } from "@/lib/billing/fx";
import { formatLocalDate, formatMoneyMinor } from "../format";

/**
 * The USD-equivalent revenue line under per-currency revenue (§32, §35; src/lib/billing/fx.ts). Shows the converted
 * total only when every currency has a configured rate, always with the rate date(s) and the rates used, and says
 * plainly when a rate is missing instead of adding up part of the money. Renders nothing for USD-only revenue.
 * Server component.
 */
export function UsdEquivalentNote({ equivalent, className }: { equivalent: RevenueUsdEquivalent | null; className?: string }) {
  if (!equivalent) return null;
  if (!equivalent.complete) {
    return (
      <p className={className ?? "text-sm text-muted"}>
        No USD total: no exchange rate is set for {equivalent.missingCurrencies.join(", ")}. A super admin can add one under Settings, &ldquo;Exchange rates
        for revenue reports&rdquo;; until then each currency is reported on its own.
      </p>
    );
  }
  const dates = fxRateDates(equivalent).map((date) => formatLocalDate(date));
  return (
    <p className={className ?? "text-sm text-muted"}>
      <span className="font-semibold text-text">USD equivalent: {formatMoneyMinor(equivalent.netUsdMinor, "USD")} net</span> (
      {formatMoneyMinor(equivalent.grossUsdMinor, "USD")} gross, {formatMoneyMinor(equivalent.refundsUsdMinor, "USD")} refunded) at the rate
      {dates.length === 1 ? "" : "s"} of {dates.join(" and ")}:{" "}
      {equivalent.rates
        .map((rate) => `1 ${rate.currency} = ${rate.usdPerUnit} USD${rate.source ? ` (${rate.source})` : ""}`)
        .join("; ")}
      . One rate per currency is applied to the whole range, not to each payment&apos;s date.
    </p>
  );
}
