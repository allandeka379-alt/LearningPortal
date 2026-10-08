import { Check, Package, Star } from "lucide-react";
import Link from "next/link";
import { describeBillingPeriod, formatMoney } from "@/components/billing/format";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import type { PackOwnership, PackPriceOption } from "@/server/study-packs/core";
import type { StudyPackCard as StudyPackCardData } from "@/server/study-packs/catalogue";

/**
 * Study-pack presentation (§24): one catalogue card plus the shared wording of prices and ownership. Server
 * components; every value comes from the database through `src/server/study-packs`.
 */

/** "US$9.00 one-off", "US$4.00 for 90 days" (the price's own terms). */
export function packPriceText(price: PackPriceOption): string {
  return `${formatMoney(price.amountMinor, price.currency)} ${describeBillingPeriod(price)}`;
}

/** "From US$9.00 · From ZWG 230.00", or null when the pack has no current price. */
export function fromPriceText(prices: readonly PackPriceOption[]): string | null {
  if (prices.length === 0) return null;
  return prices.map((price) => `From ${formatMoney(price.amountMinor, price.currency)}`).join(" · ");
}

/** "Unlocked", "Unlocked until 3 Mar 2027", "Starts 1 Jan 2027", or null. */
export function ownershipText(ownership: PackOwnership, timeZone: string): string | null {
  switch (ownership.state) {
    case "none":
      return null;
    case "active":
      return ownership.endsAt ? `Unlocked until ${formatInstantDate(ownership.endsAt, timeZone)}` : "Unlocked";
    case "upcoming":
      return `Starts ${formatInstantDate(ownership.startsAt, timeZone)}`;
  }
}

/** Unlock lines shown on a card (the landing page lists them all). */
const CARD_UNLOCK_LINES = 4;

export function StudyPackCard({ pack, timeZone }: { pack: StudyPackCardData; timeZone: string }) {
  const headingId = `pack-${pack.id}`;
  const owned = ownershipText(pack.ownership, timeZone);
  const from = fromPriceText(pack.fromPrices);
  return (
    <article aria-labelledby={headingId} className="flex h-full flex-col rounded-card border border-border bg-surface p-4 shadow-xs sm:p-5">
      <div className="flex items-start gap-3">
        <Package aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
        <div className="min-w-0 flex-1">
          <h2 id={headingId} className="text-base font-semibold break-words text-text">
            <Link href={pack.href} className="underline-offset-4 hover:underline">
              {pack.title}
            </Link>
          </h2>
          {pack.subtitle && <p className="mt-0.5 text-sm text-muted">{pack.subtitle}</p>}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {owned && (
          <Badge tone="primary" size="sm" icon={<Check aria-hidden="true" />}>
            {owned}
          </Badge>
        )}
        {pack.forYourSubjects && (
          <Badge tone="neutral" size="sm">
            For your subjects
          </Badge>
        )}
        {pack.isFeatured && (
          <Badge tone="accent" size="sm" icon={<Star aria-hidden="true" />}>
            Featured
          </Badge>
        )}
        {pack.isDemo && (
          <Badge tone="info" size="sm">
            Demo data
          </Badge>
        )}
      </div>

      <p className="mt-3 text-sm text-muted">
        <span className="font-medium text-text">Covers:</span> {pack.scopes.map((scope) => scope.label).join("; ")}
      </p>

      {pack.unlocks.length > 0 && (
        <ul className="mt-3 space-y-1 text-sm text-text">
          {pack.unlocks.slice(0, CARD_UNLOCK_LINES).map((line) => (
            <li key={line.key} className="flex items-start gap-2">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{line.label}</span>
            </li>
          ))}
          {pack.unlocks.length > CARD_UNLOCK_LINES && <li className="pl-6 text-muted">and more</li>}
        </ul>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <p className="text-sm font-semibold text-text tabular-nums">{owned ? null : from}</p>
        <Link
          href={pack.href}
          className="inline-flex min-h-11 items-center rounded-control px-3 text-sm font-semibold text-primary hover:bg-subtle"
        >
          {owned ? "Open pack" : "See what's inside"}
          <span className="sr-only">: {pack.title}</span>
        </Link>
      </div>
    </article>
  );
}
