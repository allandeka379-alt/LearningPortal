import "server-only";
import type { PlanAudience } from "@/generated/prisma/client";
import type { Entitlements } from "@/lib/billing/entitlements";
import { isOfferedCurrency } from "@/lib/billing/offer";
import type { SanitizedHtml } from "@/lib/content/types";
import { selectFullAccessOffer, type FullAccessOffer } from "@/server/billing/offer";
import { listPublicPlans, type PlanView } from "@/server/billing/plans";
import { renderContent } from "@/server/content/render";
import { db } from "@/server/db";
import { getFeatures } from "@/server/features";
import { isProd } from "@/server/lib/env";
import { advertisedGroups, buildComparison, keyFeatures, type ComparisonGroup } from "./plan-features";
import { currenciesOf, groupPricesByCurrency, type PriceOption } from "./pricing-core";

/**
 * Plans and prices for the public pricing surfaces (§31, ARCHITECTURE §7.5), read through `billing/plans` (public,
 * active plans; current prices only). Nothing is hard-coded: names, taglines, highlights, descriptions, entitlements
 * and prices are all admin-managed data. Only offered currencies are shown (USD for now, owner decision 2026-10-07:
 * other price rows stay in the database, hidden), and `offer` is the one-off "Full access" offer (billing/offer.ts).
 * While AI features are switched off (`features.ai`, owner decision 2026-10-07) the AI entitlements are left out of
 * every feature list and comparison.
 */

export interface PricingPlan {
  id: string;
  code: string;
  name: string;
  tagline: string | null;
  /** CMS Markdown description, rendered and sanitised. */
  descriptionHtml: SanitizedHtml | null;
  /** Admin bullet points. */
  highlights: string[];
  audience: PlanAudience;
  /** The fallback plan for users without a paid source (FREE). */
  isDefault: boolean;
  trialDays: number;
  entitlements: Entitlements;
  /** What the plan includes, phrased from its entitlements (used when there are no admin highlights). */
  features: string[];
  /** Current prices by currency, in admin order. Empty when none is configured. */
  prices: Record<string, PriceOption[]>;
}

export interface PricingData {
  /** Currencies with at least one price (USD and ZWG first). Empty when no price is configured at all. */
  currencies: string[];
  /** INDIVIDUAL plans (students and parents), display order. */
  plans: PricingPlan[];
  /** SCHOOL plans (B2B / B2B2C seats), display order. */
  schoolPlans: PricingPlan[];
  /** Feature comparison of the INDIVIDUAL plans, generated from their entitlements. */
  comparison: ComparisonGroup[];
  /** Development only: some listed prices are dev-seed demo prices (flagged on the page, rule 6). */
  hasDemoPrices: boolean;
  /** The one-off "Full access" offer (plan + DB price), or `null` when no one-off price is on sale. */
  offer: FullAccessOffer | null;
}

function toPricingPlan(plan: PlanView, aiEnabled: boolean): PricingPlan {
  const description = plan.description?.trim();
  return {
    id: plan.id,
    code: plan.code,
    name: plan.name,
    tagline: plan.tagline?.trim() || null,
    descriptionHtml: description ? renderContent(description, { idPrefix: `plan-${plan.code.toLowerCase().replace(/[^a-z0-9]/g, "")}-`, baseHeadingLevel: 4 }).html : null,
    highlights: plan.highlights.map((h) => h.trim()).filter(Boolean),
    audience: plan.audience,
    isDefault: plan.isDefault,
    trialDays: plan.trialDays,
    entitlements: plan.entitlements,
    features: keyFeatures(plan.entitlements, {
      max: 6,
      groups: advertisedGroups(
        aiEnabled,
        plan.audience === "SCHOOL" ? ["For schools", "Learning", "AI help"] : ["Learning", "Tests and exams", "Study tools", "AI help", "Reports"],
      ),
    }),
    prices: groupPricesByCurrency(plan.prices),
  };
}

async function anyDemoPrice(priceIds: readonly string[]): Promise<boolean> {
  // Demo prices cannot exist in production (database trigger), so skip the query there.
  if (isProd() || priceIds.length === 0) return false;
  return (await db.planPrice.count({ where: { id: { in: [...priceIds] }, isDemo: true } })) > 0;
}

/** Everything /pricing needs: plans per audience, currencies, the comparison and the demo-price flag. */
export async function getPricingData(now: Date = new Date()): Promise<PricingData> {
  const [listed, { ai }] = await Promise.all([listPublicPlans(undefined, { now }), getFeatures()]);
  const plans = listed.map((plan) => ({ ...plan, prices: plan.prices.filter((price) => isOfferedCurrency(price.currency)) }));
  const individual = plans.filter((plan) => plan.audience === "INDIVIDUAL");
  const school = plans.filter((plan) => plan.audience === "SCHOOL");
  const pricingPlans = individual.map((plan) => toPricingPlan(plan, ai));
  return {
    currencies: currenciesOf(plans),
    plans: pricingPlans,
    schoolPlans: school.map((plan) => toPricingPlan(plan, ai)),
    comparison: buildComparison(pricingPlans, { groups: advertisedGroups(ai) }),
    hasDemoPrices: await anyDemoPrice(plans.flatMap((plan) => plan.prices.map((price) => price.id))),
    offer: selectFullAccessOffer(individual),
  };
}
