import type { BillingInterval } from "@/generated/prisma/enums";

/**
 * The one-off "Full access" offer (owner decision 2026-10-07): a single payment unlocks every non-AI feature for good
 * ("pay once, keep it"), next to a free preview. Pure and isomorphic: shared by /pricing, /app/billing, the parent
 * checkout and every upgrade prompt. Amounts are NEVER held here: prices are PlanPrice rows (admin-managed), so the
 * wording is built from whatever price the database offers.
 */

/** Currencies offered to buyers for now (owner decision 2026-10-07: USD only; other price rows stay in the DB, hidden). */
export const OFFERED_CURRENCIES: readonly string[] = ["USD"];

/** True when buyers may see / pay prices in `currency` (see {@link OFFERED_CURRENCIES}). */
export function isOfferedCurrency(currency: string): boolean {
  return OFFERED_CURRENCIES.includes(currency.trim().toUpperCase());
}

/** A ONE_OFF price is bought once and never renews (Payment purpose PLAN_PURCHASE for plans). */
export function isOneOffPrice(price: { interval: BillingInterval }): boolean {
  return price.interval === "ONE_OFF";
}

/** A ONE_OFF price without an access window: the access is kept for good (lifetime). */
export function isLifetimePrice(price: { interval: BillingInterval; periodDays: number | null }): boolean {
  return price.interval === "ONE_OFF" && price.periodDays === null;
}

/** Plain-words promise of a lifetime price, used next to the amount. UI copy, not product data. */
export const LIFETIME_PRICE_NOTE = "pay once, keep it";

/** Where an upgrade prompt links to and what its button says. */
export interface UpgradeOffer {
  href: string;
  label: string;
}

/** Used when no one-off price is on sale (or outside the student area): the honest "see plans" prompt. */
export const FALLBACK_UPGRADE_OFFER: UpgradeOffer = { href: "/pricing", label: "See plans" };

/** "Unlock everything for US$1": the upgrade call to action, built from the formatted DATABASE price. */
export function unlockEverythingLabel(amountLabel: string): string {
  return `Unlock everything for ${amountLabel}`;
}
