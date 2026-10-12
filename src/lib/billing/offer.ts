import type { BillingInterval } from "@/generated/prisma/enums";
import { UNLOCK_PATH } from "./paywall";

/**
 * The one-off "Full access" offer (owner decisions 2026-10-07 and 2026-10-12): a single payment unlocks every non-AI
 * feature for good ("pay once, keep it"); there is no free tier. Pure and isomorphic: shared by /pricing, /app/billing, the parent
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

/**
 * Used when no one-off price can be linked directly (nothing on sale, the offer could not load, or outside the
 * provider): the in-app unlock page, which explains Full access and says honestly when it is not on sale.
 */
export const FALLBACK_UPGRADE_OFFER: UpgradeOffer = { href: UNLOCK_PATH, label: "Get full access" };

/** Upgrade paths that mean "the general offer" (replaced by the one-off checkout): the unlock page and /pricing. */
export const GENERAL_UPGRADE_PATHS: readonly string[] = [UNLOCK_PATH, "/pricing"];

/** Label of a prompt that keeps its own destination (e.g. `/schools` for school-only tools). */
export const OTHER_UPGRADE_LABEL = "Learn more";

/** "Unlock everything for US$1": the upgrade call to action, built from the formatted DATABASE price. */
export function unlockEverythingLabel(amountLabel: string): string {
  return `Unlock everything for ${amountLabel}`;
}
