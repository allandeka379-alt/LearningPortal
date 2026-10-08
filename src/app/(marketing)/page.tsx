import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { heroSupportingLine } from "@/components/marketing/copy";
import { FaqList } from "@/components/marketing/FaqList";
import { FinalCta } from "@/components/marketing/FinalCta";
import { BoardsSection, joinNames, LevelsSection, SubjectsSection } from "@/components/marketing/home/Curriculum";
import { AiTutorSection, MockExamsSection, PracticeSection, SchoolsBand } from "@/components/marketing/home/Features";
import { FreeTools } from "@/components/marketing/home/FreeTools";
import { Hero } from "@/components/marketing/home/Hero";
import { HowItWorks } from "@/components/marketing/home/HowItWorks";
import { PricingTeaser } from "@/components/marketing/home/PricingTeaser";
import { Section } from "@/components/marketing/Section";
import { Testimonials } from "@/components/marketing/Testimonials";
import { APP_NAME, APP_TAGLINE } from "@/lib/config";
import { getFeatures } from "@/server/features";
import { getHomePageData } from "@/server/marketing/home";
import { marketingMetadata } from "@/server/marketing/metadata";

/** Static, revalidated hourly (ARCHITECTURE §3.4): catalogue, plans, testimonials and FAQs change rarely. */
export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const { ai } = await getFeatures();
  return marketingMetadata({ title: `${APP_NAME}: ${APP_TAGLINE}`, description: heroSupportingLine(ai), path: "/", absoluteTitle: true });
}

/**
 * Home page (§45): hero, free tools (§46), how it works, boards, levels, subjects, AI tutor, practice, mock exams,
 * schools, pricing, testimonials, FAQ and a closing call to action. Everything variable comes from the database; the
 * testimonial and FAQ sections disappear when there is nothing real to show. While AI features are switched off
 * (`features.ai`, the default since 2026-10-07) the page makes no AI claim: no AI tutor section, and the hero, steps
 * and plan features leave AI out.
 */
export default async function HomePage() {
  const [{ catalogue, pricing, testimonials, faqs }, features] = await Promise.all([getHomePageData(), getFeatures()]);
  const boardNames = catalogue.boards.map((board) => board.shortName);
  const levelNames = catalogue.levels.map((level) => level.name);
  const eyebrow = boardNames.length > 0 ? [joinNames(boardNames), joinNames(levelNames)].filter(Boolean).join(" · ") : null;

  return (
    <>
      <Hero eyebrow={eyebrow} hasFreePlan={pricing.plans.some((plan) => plan.isDefault)} aiEnabled={features.ai} />
      <FreeTools />
      <HowItWorks aiEnabled={features.ai} />
      <BoardsSection boards={catalogue.boards} />
      <LevelsSection levels={catalogue.levels} />
      <SubjectsSection categories={catalogue.subjectsByCategory} />
      {features.ai && <AiTutorSection />}
      <PracticeSection />
      <MockExamsSection />
      <SchoolsBand />
      <PricingTeaser plans={pricing.plans} currency={pricing.currencies[0] ?? null} demoPrices={pricing.hasDemoPrices} />
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
      <FinalCta />
    </>
  );
}
