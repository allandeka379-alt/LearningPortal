import "server-only";
import {
  FALLBACK_UPGRADE_OFFER,
  isLifetimePrice,
  isOfferedCurrency,
  unlockEverythingLabel,
  type UpgradeOffer,
} from "@/lib/billing/offer";
import { db } from "@/server/db";
import { formatMoneyMinor } from "@/server/marketing/pricing-format";
import { listPublicPlans, type PlanPriceView, type PlanView } from "./plans";
import { ownsLifetimePlan } from "./purchases";

/**
 * The one-off "Full access" offer as the database defines it (owner decision 2026-10-07; src/lib/billing/offer.ts).
 *
 * Which plan is "the offer" is data, not a hard-coded code: the first public, active INDIVIDUAL plan (admin sort order)
 * that is not the free default and has a current one-off price in an offered currency (USD for now). The seed creates
 * FULL_ACCESS at USD 1.00; admins change the price in /admin/plans and every surface (pricing, billing, upgrade prompts)
 * follows within the catalogue cache TTL. Reads go through the cached public catalogue (`listPublicPlans`).
 */

export interface FullAccessOffer {
  plan: Pick<PlanView, "id" | "code" | "name" | "tagline" | "highlights" | "entitlements">;
  price: PlanPriceView & {
    /** "US$1". */
    amountLabel: string;
    /** No access window: pay once, keep it. */
    lifetime: boolean;
  };
}

/** The one-off price buyers are offered for a plan: current, non-zero, flat (not per seat), offered currency. */
export function oneOffOfferPrice(plan: Pick<PlanView, "prices">): PlanPriceView | null {
  return (
    plan.prices.find((price) => price.interval === "ONE_OFF" && price.amountMinor > 0 && !price.perSeat && isOfferedCurrency(price.currency)) ??
    null
  );
}

/** Pure selection of the offer among public plans (exported for tests). */
export function selectFullAccessOffer(plans: readonly PlanView[]): FullAccessOffer | null {
  for (const plan of plans) {
    if (plan.audience !== "INDIVIDUAL" || plan.isDefault || !plan.isActive) continue;
    const price = oneOffOfferPrice(plan);
    if (!price) continue;
    return {
      plan: { id: plan.id, code: plan.code, name: plan.name, tagline: plan.tagline, highlights: plan.highlights, entitlements: plan.entitlements },
      price: { ...price, amountLabel: formatMoneyMinor(price.amountMinor, price.currency), lifetime: isLifetimePrice(price) },
    };
  }
  return null;
}

/**
 * The current one-off offer for a buyer in `countryId` (country prices replace global ones), or `null` when no
 * one-off price is on sale (surfaces then fall back to "Get full access" on the unlock page / "Pricing coming soon").
 */
export async function getFullAccessOffer(options: { countryId?: string | null; now?: Date } = {}): Promise<FullAccessOffer | null> {
  const plans = await listPublicPlans(undefined, {
    audience: "INDIVIDUAL",
    ...(options.countryId !== undefined ? { countryId: options.countryId } : {}),
    ...(options.now ? { now: options.now } : {}),
  });
  return selectFullAccessOffer(plans);
}

/** Checkout page of a one-off price in the student area. */
export function studentCheckoutHref(planPriceId: string): string {
  return `/app/billing/checkout?price=${encodeURIComponent(planPriceId)}`;
}

/** Upgrade prompt for an offer: "Unlock everything for US$1" straight to checkout, else the honest fallback. */
export function upgradeOfferFor(offer: FullAccessOffer | null): UpgradeOffer {
  if (!offer) return FALLBACK_UPGRADE_OFFER;
  return { href: studentCheckoutHref(offer.price.id), label: unlockEverythingLabel(offer.price.amountLabel) };
}

/** The upgrade prompt for a buyer in `countryId` (link + label built from the database price). */
export async function getUpgradeOffer(options: { countryId?: string | null; now?: Date } = {}): Promise<UpgradeOffer> {
  return upgradeOfferFor(await getFullAccessOffer(options));
}

/**
 * The upgrade prompt one student sees in the app: the offer for their country, or the neutral fallback when they
 * already own it for good (nothing more to buy) or nothing is on sale. Two small indexed reads.
 */
export async function getStudentUpgradeOffer(userId: string, options: { now?: Date } = {}): Promise<UpgradeOffer> {
  const now = options.now ?? new Date();
  const student = await db.student.findUnique({ where: { userId }, select: { countryId: true } });
  const offer = await getFullAccessOffer({ countryId: student?.countryId ?? null, now });
  if (offer && offer.price.lifetime && (await ownsLifetimePlan(userId, offer.plan.id, { now }))) return upgradeOfferFor(null);
  return upgradeOfferFor(offer);
}
