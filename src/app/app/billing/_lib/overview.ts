import type { EntitlementSource } from "@/generated/prisma/client";
import { GRANT_SOURCE_LABELS } from "@/components/billing/format";
import { isOfferedCurrency } from "@/lib/billing/offer";
import type { CheckoutItemGroup, CheckoutPriceOption } from "@/components/billing/checkout-state";
import type { AppliedEntitlementSource } from "@/server/billing/entitlements";
import type { PlanPriceView, PlanView } from "@/server/billing/plans";

/**
 * Pure view-model builders for the student billing pages (§31): where the student's access comes from, and which
 * plan prices can be bought. Unit-tested; the loaders live in ./service.ts.
 */

export type AccessSourceKind = "OWN" | "PARENT" | "SCHOOL" | "GRANT" | "FREE";

export interface AccessSourceView {
  key: string;
  kind: AccessSourceKind;
  /** Plan name from the catalogue, when the source carries a plan. */
  planName: string | null;
  /** Student-facing origin: "Your subscription", "Paid by your parent or guardian", "Through your school"… */
  label: string;
  /** When this source stops applying (`null` = open-ended). */
  endsAt: Date | null;
  grantSource: EntitlementSource | null;
}

const KIND_ORDER: Readonly<Record<AccessSourceKind, number>> = { OWN: 0, PARENT: 0, SCHOOL: 1, GRANT: 2, FREE: 3 };

/**
 * Where the student's (unscoped) access comes from: their own subscription (or one a parent pays for), their school,
 * grants (promotions, referral rewards, staff credit) and the default plan (no access since 2026-10-12). Study packs are scoped to subjects and are
 * listed separately, so scoped grants are left out here.
 */
export function describeAccessSources(input: {
  sources: readonly AppliedEntitlementSource[];
  userId: string;
  ownSubscription: { id: string; payerUserId: string | null; currentPeriodEnd?: Date | null } | null;
  planNames: ReadonlyMap<string, string>;
  now?: Date;
}): AccessSourceView[] {
  const now = input.now ?? new Date();
  const views: AccessSourceView[] = [];
  for (const source of input.sources) {
    if (source.scoped) continue;
    const planName = source.planCode ? (input.planNames.get(source.planCode) ?? null) : null;
    const base = { key: `${source.kind}:${source.id ?? "free"}`, planName, endsAt: source.endsAt, grantSource: source.grantSource };
    switch (source.kind) {
      case "SUBSCRIPTION": {
        const own = input.ownSubscription?.id === source.id ? input.ownSubscription : null;
        const payer = own ? own.payerUserId : null;
        const paidByOther = payer !== null && payer !== input.userId;
        // While the paid period runs, show its end (the date "paid until" states), not the grace-extended access end
        // the entitlement resolver reports; inside the grace window the access end is the honest date.
        const paidUntil = own?.currentPeriodEnd ?? null;
        const endsAt = paidUntil !== null && paidUntil > now ? paidUntil : source.endsAt;
        views.push({ ...base, endsAt, kind: paidByOther ? "PARENT" : "OWN", label: paidByOther ? "Paid by your parent or guardian" : "Your subscription" });
        break;
      }
      case "SCHOOL_SUBSCRIPTION":
      case "SCHOOL_GRANT":
        views.push({ ...base, kind: "SCHOOL", label: "Through your school" });
        break;
      case "GRANT":
        views.push({ ...base, kind: "GRANT", label: source.grantSource ? GRANT_SOURCE_LABELS[source.grantSource] : "Extra access" });
        break;
      case "FREE_PLAN":
        views.push({ ...base, kind: "FREE", label: "Default plan" });
        break;
    }
  }
  return views.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
}

/**
 * Prices a student can pay for: non-zero, not per-seat (schools) and in an offered currency (USD for now, owner decision
 * 2026-10-07; other rows stay hidden). A ONE_OFF price without an end date is a lifetime purchase ("Full access", or a
 * study pack kept for good).
 */
export function purchasablePrices(prices: readonly PlanPriceView[]): CheckoutPriceOption[] {
  return prices
    .filter((price) => price.amountMinor > 0 && !price.perSeat && isOfferedCurrency(price.currency))
    .map((price) => ({
      planPriceId: price.id,
      currency: price.currency,
      amountMinor: price.amountMinor,
      interval: price.interval,
      intervalCount: price.intervalCount,
      periodDays: price.periodDays,
      label: price.label,
    }));
}

export interface PlanOfferView extends CheckoutItemGroup {
  code: string;
  /** The default (free) plan: nothing to buy. */
  isFree: boolean;
}

/** Public individual plans for the billing page, with what can be bought now (prices from the database only). */
export function planOffers(plans: readonly PlanView[], currentPlanCode: string | null): PlanOfferView[] {
  return plans
    .filter((plan) => plan.audience === "INDIVIDUAL" && plan.isActive)
    .map((plan) => {
      const prices = purchasablePrices(plan.prices);
      return {
        id: plan.id,
        code: plan.code,
        name: plan.name,
        tagline: plan.tagline,
        highlights: plan.highlights,
        prices,
        current: plan.code === currentPlanCode,
        isFree: plan.isDefault || (prices.length === 0 && plan.prices.length > 0 && plan.prices.every((price) => price.amountMinor === 0)),
      };
    });
}
