import { ArrowRight, School } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PAYMENT_METHODS_LINE } from "@/components/marketing/copy";
import { FaqList } from "@/components/marketing/FaqList";
import { FinalCta } from "@/components/marketing/FinalCta";
import { PricingTeaser } from "@/components/marketing/home/PricingTeaser";
import { PageHero } from "@/components/marketing/PageHero";
import { BILLING_HREF } from "@/components/marketing/site-nav";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import type { FullAccessOffer } from "@/server/billing/offer";
import { listPublishedFaqs } from "@/server/marketing/faq";
import { marketingMetadata } from "@/server/marketing/metadata";
import { getPricingData } from "@/server/marketing/pricing";

/** Static, revalidated hourly; admins' price changes also apply on the next regeneration. */
export const revalidate = 3600;

/** Headline of the page: the one-off offer with its DATABASE price, or a neutral title when nothing is on sale. */
function pricingTitle(offer: FullAccessOffer | null): string {
  if (!offer) return "Pricing";
  return offer.price.lifetime ? `Everything for ${offer.price.amountLabel}. Pay once, keep it.` : `Everything for ${offer.price.priceLabel}`;
}

export async function generateMetadata(): Promise<Metadata> {
  return marketingMetadata({
    title: "Pricing",
    description: `One monthly price unlocks every ${APP_NAME} course for Form 3 to Form 6: lessons, practice questions, flashcards, topic tests and timed mock exams.`,
    path: "/pricing",
  });
}

/**
 * Answers about the monthly price, shown while no pricing FAQ is published in the CMS. Facts about how the product
 * works (owner decisions 2026-10-07 and 2026-10-12), no claims.
 */
const PAYMENT_FACTS: readonly { question: string; answer: string }[] = [
  {
    question: "How does the monthly price work?",
    answer:
      "Each payment gives you a month of full access. Pay again before it ends to keep going: early payments are added on to the end, so you never lose days. Paynow cannot take money from EcoCash, OneMoney or a card by itself, so nothing is ever charged without you.",
  },
  { question: "Can I stop?", answer: "Yes. Simply do not renew. Your progress stays on your account, ready for when you come back." },
  {
    question: "What does it cover?",
    answer: "Every course at every level we offer, for both boards: lessons, practice questions, flashcards, topic tests, mock exams, your study plan and progress.",
  },
  { question: "How do I pay?", answer: "Through Paynow with EcoCash, OneMoney or a Visa or Mastercard card, from your account after you sign up." },
  { question: "Can a parent or guardian pay?", answer: "Yes. A parent can link to your account and pay for you from their own account." },
  { question: "My school uses it. Do I need to pay?", answer: "If your school gives you a place, your access comes through the school and you do not pay yourself." },
];

/**
 * /pricing (§31; owner decision 2026-10-12: no free tier). The one-off Full access offer with its DATABASE price and
 * what it includes, the payment facts, the school offer and pricing FAQs. Without a price the page says "Pricing
 * coming soon". The page never reads the session: signed-in visitors follow the Plan & billing link.
 */
export default async function PricingPage() {
  const [pricing, faqs] = await Promise.all([getPricingData(), listPublishedFaqs({ categories: ["pricing", "billing"], limit: 12 })]);
  const { offer, schoolPlans } = pricing;
  const offerPlan = offer ? (pricing.plans.find((plan) => plan.id === offer.plan.id) ?? null) : null;

  return (
    <>
      <PageHero
        id="pricing-heading"
        eyebrow="Pricing"
        title={pricingTitle(offer)}
        description={
          <p>
            One price, no tiers. {offer ? PAYMENT_METHODS_LINE : "The price will be published here before sign-ups open."}{" "}
            <Link href={BILLING_HREF} className="font-medium text-primary underline underline-offset-4">
              Already have an account? Pay in Plan &amp; billing
            </Link>
            .
          </p>
        }
      />

      <PricingTeaser offer={offer} plan={offerPlan} demoPrices={pricing.hasDemoPrices} />

      {(offer || faqs.length > 0) && (
      <section aria-labelledby="payment-facts-heading" className="py-12 sm:py-16">
        <Container size="reading">
          <h2 id="payment-facts-heading" className="text-2xl font-bold tracking-tight text-text">
            {faqs.length > 0 ? "Pricing questions" : "About the payment"}
          </h2>
          {faqs.length > 0 ? (
            <FaqList items={faqs} className="mt-6" />
          ) : (
            <dl className="mt-6 divide-y divide-border rounded-card border border-border bg-surface">
              {PAYMENT_FACTS.map((fact) => (
                <div key={fact.question} className="p-5">
                  <dt className="font-semibold text-text">{fact.question}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">{fact.answer}</dd>
                </div>
              ))}
            </dl>
          )}
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
                    : "School places with teacher dashboards, assignments and school analytics are arranged directly with us."}
                </p>
              </div>
            </div>
            <ButtonLink href="/schools" variant="outline" iconEnd={<ArrowRight aria-hidden="true" />}>
              For schools
            </ButtonLink>
          </div>
        </Container>
      </section>

      <FinalCta priceLabel={offer?.price.priceLabel ?? null} />
    </>
  );
}
