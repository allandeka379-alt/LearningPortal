import { ArrowRight, Check, Smartphone } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import type { FullAccessOffer } from "@/server/billing/offer";
import type { PricingPlan } from "@/server/marketing/pricing";
import { joinLabel, PAYMENT_METHODS_LINE } from "../copy";
import { DemoPricesNote } from "../pricing/DemoPricesNote";
import { PRICING_COMING_SOON } from "../pricing/PlanCard";
import { Section } from "../Section";
import { SIGN_UP_HREF } from "../site-nav";

export interface PricingTeaserProps {
  /** The one-off Full access offer with its DATABASE price, or null when nothing is on sale. */
  offer: FullAccessOffer | null;
  /** The offer's plan as shown on /pricing (its admin highlights or entitlement-derived features). */
  plan: PricingPlan | null;
  /** Development only: the prices are dev-seed demo data (flagged, rule 6). */
  demoPrices?: boolean;
}

/** What Full access includes: the plan's admin highlights, else the features derived from its entitlements. */
export function offerBullets(plan: PricingPlan | null, max = 6): string[] {
  if (!plan) return [];
  return (plan.highlights.length > 0 ? plan.highlights : plan.features).slice(0, max);
}

/**
 * Pricing on the home page (owner decisions 2026-10-12: no free tier; one monthly price unlocks everything). One offer card
 * with the database price, what it includes and how to pay, or an honest "Pricing coming soon".
 */
export function PricingTeaser({ offer, plan, demoPrices = false }: PricingTeaserProps) {
  const bullets = offerBullets(plan);
  return (
    <Section
      id="pricing"
      tone="surface"
      eyebrow="Pricing"
      title="One price. Every subject."
      description="No tiers: one monthly price opens every course at every level, ZIMSEC and Cambridge, O-Level and A-Level."
      action={
        <Link href="/pricing" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
          Pricing details
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      }
    >
      {demoPrices && <DemoPricesNote className="mb-5" />}
      {!offer ? (
        <p className="rounded-card border border-dashed border-border bg-bg p-6 text-center text-lg font-semibold text-muted">{PRICING_COMING_SOON}</p>
      ) : (
        <article className="grid overflow-hidden rounded-card border border-primary bg-bg shadow-md md:grid-cols-[0.9fr_1.1fr]">
          <div className="flex flex-col justify-between gap-6 bg-primary-soft p-6 text-on-primary-soft sm:p-8">
            <div>
              <h3 className="text-lg font-bold tracking-tight">{offer.plan.name}</h3>
              {offer.plan.tagline && <p className="mt-1 text-sm">{offer.plan.tagline}</p>}
              <p className="mt-6 flex flex-wrap items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight tabular-nums">{offer.price.amountLabel}</span>
                <span className="text-base font-medium">{offer.price.periodText}</span>
              </p>
            </div>
            <div className="space-y-3">
              <ButtonLink href={SIGN_UP_HREF} size="lg" fullWidth iconEnd={<ArrowRight aria-hidden="true" />}>
                {joinLabel(offer.price.priceLabel)}
              </ButtonLink>
              <p className="flex items-start gap-2 text-sm">
                <Smartphone aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                {PAYMENT_METHODS_LINE}
              </p>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="text-sm font-semibold tracking-wide text-muted uppercase">Everything is included</p>
            {bullets.length > 0 ? (
              <ul className="mt-4 grid gap-3">
                {bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-base text-text">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-base text-text">Every lesson, practice question, flashcard, topic test and mock exam in every subject.</p>
            )}
          </div>
        </article>
      )}
    </Section>
  );
}
