import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import type { PricingPlan } from "@/server/marketing/pricing";
import { DemoPricesNote } from "../pricing/DemoPricesNote";
import { PlanCard, PRICING_COMING_SOON } from "../pricing/PlanCard";
import { Section } from "../Section";

export interface PricingTeaserProps {
  plans: readonly PricingPlan[];
  /** Currency to show (the first configured one), or null when no price is configured at all. */
  currency: string | null;
  /** Development only: the prices are dev-seed demo data (flagged, rule 6). */
  demoPrices?: boolean;
}

/**
 * Pricing (§45; owner decision 2026-10-07: free preview + one-off "Full access"): the individual plans from the database
 * with their headline price (never a hard-coded amount), or "Pricing coming soon".
 */
export function PricingTeaser({ plans, currency, demoPrices = false }: PricingTeaserProps) {
  return (
    <Section
      id="pricing"
      tone="surface"
      eyebrow="Pricing"
      title="Start free. Unlock everything with one payment."
      description="Try the free preview for as long as you like. Full access is a single payment through Paynow: no subscription, nothing renews."
      action={
        <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          See what is included
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      }
    >
      {demoPrices && <DemoPricesNote className="mb-5" />}
      {plans.length === 0 ? (
        <p className="rounded-card border border-dashed border-border bg-bg p-6 text-center text-lg font-semibold text-muted">{PRICING_COMING_SOON}</p>
      ) : (
        <ul className={cn("grid gap-5", plans.length === 2 && "md:grid-cols-2", plans.length >= 3 && "md:grid-cols-2 lg:grid-cols-3")}>
          {plans.map((plan) => (
            <li key={plan.id}>
              <PlanCard plan={plan} currency={currency} maxFeatures={4} />
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
