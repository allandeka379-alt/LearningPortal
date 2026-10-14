import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { heroSupportingLine } from "@/components/marketing/copy";
import { FaqList } from "@/components/marketing/FaqList";
import { FinalCta } from "@/components/marketing/FinalCta";
import { BoardsSection, joinNames, SubjectsSection } from "@/components/marketing/home/Curriculum";
import { AiTutorSection, SchoolsBand } from "@/components/marketing/home/Features";
import { FreeTools } from "@/components/marketing/home/FreeTools";
import { Hero } from "@/components/marketing/home/Hero";
import { HowItWorks } from "@/components/marketing/home/HowItWorks";
import { ExamCandidatesBand, FormsSection, LearningLoop } from "@/components/marketing/home/Learning";
import { ExamRescuePack } from "@/components/marketing/home/ExamRescuePack";
import { PricingTeaser } from "@/components/marketing/home/PricingTeaser";
import { Section } from "@/components/marketing/Section";
import { Testimonials } from "@/components/marketing/Testimonials";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";
import { getFeatures } from "@/server/features";
import { getHomePageData } from "@/server/marketing/home";
import { marketingMetadata } from "@/server/marketing/metadata";

/** Static, revalidated hourly (ARCHITECTURE §3.4): catalogue, plans, content counts and FAQs change rarely. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { ai } = await getFeatures();
  return marketingMetadata({ title: `${APP_NAME}: ${APP_TAGLINE}`, description: heroSupportingLine(ai), path: "/", absoluteTitle: true });
}

/**
 * Home page (§45; owner brief 2026-10-12: a learning platform for Form 3 to Form 6 that also prepares exam candidates,
 * with no free tier). Hero with the one paid offer and real content counts, public samples, the school years, the
 * learning loop, the exam-candidate band, subjects, the journey, boards, schools, pricing, testimonials, FAQ and a
 * closing call to action. Everything variable comes from the database; testimonials and FAQ disappear when there is
 * nothing real to show. While AI features are switched off (the default) the page makes no AI claim.
 */
export default async function HomePage() {
  const [{ catalogue, pricing, testimonials, faqs, forms, stats }, features] = await Promise.all([getHomePageData(), getFeatures()]);
  const boardNames = catalogue.boards.map((board) => board.shortName);
  const levelNames = catalogue.levels.map((level) => level.name);
  const eyebrow = boardNames.length > 0 ? [joinNames(boardNames), joinNames(levelNames)].filter(Boolean).join(" · ") : null;
  const offer = pricing.offer;
  const priceLabel = offer?.price.priceLabel ?? null;
  const offerPlan = offer ? (pricing.plans.find((plan) => plan.id === offer.plan.id) ?? null) : null;

  return (
    <>
      <Hero eyebrow={eyebrow} priceLabel={priceLabel} forms={forms} stats={stats} aiEnabled={features.ai} />
      <ExamRescuePack />
      <FreeTools />
      <FormsSection forms={forms} />
      <LearningLoop />
      <ExamCandidatesBand />
      <SubjectsSection categories={catalogue.subjectsByCategory} />
      {features.ai && <AiTutorSection />}
      <HowItWorks aiEnabled={features.ai} priceLabel={priceLabel} />
      <BoardsSection boards={catalogue.boards} />
      <SchoolsBand />
      <PricingTeaser offer={offer} plan={offerPlan} demoPrices={pricing.hasDemoPrices} />
      <Testimonials testimonials={testimonials} />
      {faqs.length > 0 && (
        <Section
          id="faq"
          eyebrow="FAQ"
          title="Questions, answered"
          action={
            <Link href="/faq" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline">
              All questions
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        >
          <FaqList items={faqs} className="max-w-3xl" />
        </Section>
      )}
      <FinalCta priceLabel={priceLabel} />
    </>
  );
}
