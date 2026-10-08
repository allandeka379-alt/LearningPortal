import { ArrowRight, School, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqList } from "@/components/marketing/FaqList";
import { FinalCta } from "@/components/marketing/FinalCta";
import { ComparisonTable } from "@/components/marketing/pricing/ComparisonTable";
import { CurrencyPanels } from "@/components/marketing/pricing/CurrencyPanels";
import { DemoPricesNote } from "@/components/marketing/pricing/DemoPricesNote";
import { PlanCard, PRICING_COMING_SOON } from "@/components/marketing/pricing/PlanCard";
import { BILLING_HREF, SIGN_UP_HREF } from "@/components/marketing/site-nav";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { studentCheckoutHref, type FullAccessOffer } from "@/server/billing/offer";
import { getFeatures } from "@/server/features";
import { listPublishedFaqs } from "@/server/marketing/faq";
import { marketingMetadata } from "@/server/marketing/metadata";
import { getPricingData, type PricingPlan } from "@/server/marketing/pricing";
import { headlinePrice } from "@/server/marketing/pricing-core";

/** Static, revalidated hourly; admins' price changes also apply on the next regeneration. */
export const revalidate = 3600;

const PRICING_INTRO =
  "Start with the free preview. When you are ready, one payment unlocks every lesson, unlimited practice and mock exams. No subscription: nothing renews.";

/** Page copy for the current AI switch (`features.ai`; no AI claim while it is off, owner decision 2026-10-07). */
function pricingCopy(aiEnabled: boolean): { metaDescription: string; intro: string } {
  return {
    metaDescription: aiEnabled
      ? "Free preview or full access with one payment for ZIMSEC and Cambridge O-Level and A-Level study: lessons, practice, mock exams and the AI tutor."
      : "Free preview or full access with one payment for ZIMSEC and Cambridge O-Level and A-Level study: lessons, practice questions and mock exams.",
    intro: PRICING_INTRO,
  };
}

/** Headline of the page: the one-off offer with its DATABASE price, or a neutral title when nothing is on sale. */
function pricingTitle(offer: FullAccessOffer | null): string {
  if (!offer) return "Plans and pricing";
  return offer.price.lifetime ? `Full access for ${offer.price.amountLabel}. Pay once, keep it.` : `Full access for ${offer.price.amountLabel}`;
}

export async function generateMetadata(): Promise<Metadata> {
  const { ai } = await getFeatures();
  return marketingMetadata({ title: "Plans and pricing", description: pricingCopy(ai).metaDescription, path: "/pricing" });
}

/** Sign-up first; a paid plan then continues straight to its checkout (the price id comes from the database). */
function signUpHref(plan: PricingPlan, currency: string | null): string {
  if (plan.isDefault) return SIGN_UP_HREF;
  const price = currency ? headlinePrice(plan.prices[currency]) : null;
  const next = price ? studentCheckoutHref(price.id) : `${BILLING_HREF}?plan=${plan.code}`;
  // /register validates `next` again.
  return `${SIGN_UP_HREF}?next=${encodeURIComponent(next)}`;
}

function PlanActions({ plan, currency }: { plan: PricingPlan; currency: string | null }) {
  return (
    <>
      <ButtonLink href={signUpHref(plan, currency)} variant={plan.isDefault ? "outline" : "primary"} fullWidth>
        {plan.isDefault ? "Start free" : `Get ${plan.name}`}
      </ButtonLink>
      {!plan.isDefault && (
        <Link href={BILLING_HREF} className="inline-flex min-h-11 items-center justify-center text-sm font-medium text-primary underline-offset-4 hover:underline">
          Already have an account? Pay in Plan &amp; billing
        </Link>
      )}
    </>
  );
}

function PlanGrid({ plans, currency, emphasisedId }: { plans: readonly PricingPlan[]; currency: string | null; emphasisedId: string | null }) {
  return (
    <ul className={cn("grid gap-5", plans.length === 2 && "md:grid-cols-2", plans.length >= 3 && "md:grid-cols-2 lg:grid-cols-3")}>
      {plans.map((plan) => (
        <li key={plan.id}>
          <PlanCard
            plan={plan}
            currency={currency}
            headingLevel="h3"
            emphasis={plan.id === emphasisedId}
            showDescription
            actions={<PlanActions plan={plan} currency={currency} />}
          />
        </li>
      ))}
    </ul>
  );
}

/** How the one payment is made (§32, owner decision 2026-10-07: Paynow only). UI copy, no provider logos. */
function PaymentNote() {
  return (
    <p className="mt-6 flex items-start gap-3 rounded-card border border-border bg-surface p-4 text-sm text-muted">
      <Smartphone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
      <span>
        Pay through <strong className="font-semibold text-text">Paynow</strong> with EcoCash, OneMoney or a Visa or Mastercard card. One payment, no
        subscription and nothing renews. A parent or guardian can also pay for a child from their own account.
      </span>
    </p>
  );
}

/**
 * /pricing (§31; owner decision 2026-10-07): the free preview next to "Full access" bought with ONE payment (pay once,
 * keep it), the feature comparison generated from the plans' entitlements (`server/marketing/plan-features`), how to
 * pay (Paynow), the school offer and pricing FAQs. Prices and features are data: the headline and the cards show the
 * database price, never a hard-coded amount; without a price the page says "Pricing coming soon". The page never reads
 * the session: signed-in visitors follow the Plan & billing link.
 */
export default async function PricingPage() {
  const [pricing, faqs, features] = await Promise.all([getPricingData(), listPublishedFaqs({ categories: ["pricing", "billing"], limit: 12 }), getFeatures()]);
  const { plans, currencies, comparison, schoolPlans, offer } = pricing;
  const emphasisedId = offer?.plan.id ?? null;

  return (
    <>
      <Container className="pb-4">
        <PageHeader eyebrow="Plans and pricing" title={pricingTitle(offer)} description={pricingCopy(features.ai).intro} />
        {pricing.hasDemoPrices && <DemoPricesNote className="mb-6" />}

        <h2 className="sr-only">Plans</h2>
        {plans.length === 0 ? (
          <p className="rounded-card border border-dashed border-border bg-surface p-8 text-center text-lg font-semibold text-muted">{PRICING_COMING_SOON}</p>
        ) : currencies.length <= 1 ? (
          <PlanGrid plans={plans} currency={currencies[0] ?? null} emphasisedId={emphasisedId} />
        ) : (
          <CurrencyPanels currencies={currencies} renderPanel={(currency) => <PlanGrid plans={plans} currency={currency} emphasisedId={emphasisedId} />} />
        )}
        {offer && <PaymentNote />}
      </Container>

      {comparison.length > 0 && (
        <section aria-labelledby="compare-heading" className="py-12 sm:py-16">
          <Container>
            <h2 id="compare-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
              What each option includes
            </h2>
            <p className="mt-2 max-w-2xl text-muted">The free preview is yours for as long as you like. Limits reset daily or weekly as shown.</p>
            <ComparisonTable className="mt-6" plans={plans} groups={comparison} caption="Features included in each option" />
          </Container>
        </section>
      )}

      <section aria-labelledby="schools-pricing-heading" className="pb-12 sm:pb-16">
        <Container>
          <div className="flex flex-col gap-5 rounded-card border border-border bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex gap-4">
              <span aria-hidden="true" className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft [&_svg]:size-6">
                <School />
              </span>
              <div>
                <h2 id="schools-pricing-heading" className="text-lg font-bold text-text">
                  For schools
                </h2>
                <p className="mt-1 max-w-xl text-sm text-muted">
                  {schoolPlans.length > 0
                    ? "Give your students access through the school, with teacher dashboards, assignments and school analytics."
                    : "School plans with teacher dashboards, assignments and school analytics are arranged directly with us."}
                </p>
              </div>
            </div>
            <ButtonLink href="/schools" variant="outline" iconEnd={<ArrowRight aria-hidden="true" />}>
              For schools
            </ButtonLink>
          </div>
        </Container>
      </section>

      {faqs.length > 0 && (
        <section aria-labelledby="pricing-faq-heading" className="pb-12 sm:pb-16">
          <Container size="reading">
            <h2 id="pricing-faq-heading" className="text-2xl font-bold tracking-tight text-text">
              Pricing questions
            </h2>
            <FaqList items={faqs} className="mt-6" />
          </Container>
        </section>
      )}

      <FinalCta description="Create a free account, choose your subjects and take the free diagnostic to see where you stand. Unlock everything whenever you are ready." />
    </>
  );
}
