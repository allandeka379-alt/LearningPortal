import { ArrowRight, BookOpen, CalendarRange, ChartColumn, CircleCheck, FileText, Lightbulb, ListTree, Sigma, WifiOff } from "lucide-react";
import type { Metadata } from "next";
import { HOW_IT_WORKS_HREF, SIGN_UP_HREF } from "@/components/marketing/site-nav";
import { joinLabel } from "@/components/marketing/copy";
import { FinalCta } from "@/components/marketing/FinalCta";
import { MockExamsSection, PracticeSection } from "@/components/marketing/home/Features";
import { HowItWorks } from "@/components/marketing/home/HowItWorks";
import { LearningLoop } from "@/components/marketing/home/Learning";
import { ProductPreview } from "@/components/marketing/home/ProductPreview";
import { PageHero } from "@/components/marketing/PageHero";
import { FeatureItem, Section } from "@/components/marketing/Section";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { getFullAccessOffer } from "@/server/billing/offer";
import { getFeatures } from "@/server/features";
import { marketingMetadata } from "@/server/marketing/metadata";

/** Static, revalidated hourly (the price is data). */
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "How it works",
    description: `How ${APP_NAME} works for Form 3 to Form 6: courses in syllabus order, lessons with quick checks, instantly marked practice, flashcards, study plans and timed mock exams.`,
    path: HOW_IT_WORKS_HREF,
  });
}

/**
 * /how-it-works (owner brief 2026-10-12): the learning platform explained. The course structure, the five-step
 * learning loop, what is inside a lesson, practice, planning and progress, mock exams, and the sign-up journey. UI
 * copy only; the one price comes from the database.
 */
export default async function HowItWorksPage() {
  const [offer, { ai }] = await Promise.all([getFullAccessOffer(), getFeatures()]);
  const priceLabel = offer?.price.amountLabel ?? null;

  return (
    <>
      <PageHero
        id="how-heading"
        eyebrow="How it works"
        title="A full course for every subject, one topic at a time"
        description={
          <p>
            {APP_NAME} turns each subject into a course that follows your board&apos;s syllabus, topic by topic. Learn it, check it, practise it, remember it and test it,
            then walk into the exam knowing you have covered everything.
          </p>
        }
        actions={
          <>
            <ButtonLink href={SIGN_UP_HREF} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
              {joinLabel(priceLabel)}
            </ButtonLink>
            <ButtonLink href="/subjects" size="lg" variant="outline">
              Browse subjects
            </ButtonLink>
          </>
        }
        aside={<ProductPreview className="hidden lg:block" />}
      />

      <Section
        id="courses"
        eyebrow="Courses"
        title="Each subject is a course in syllabus order"
        description="Pick your board, your form and your subjects once. Every subject then opens as a course whose topics follow the official syllabus you are examined on."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem icon={<ListTree />} title="Topics in the order you are taught">
            Work through the syllabus from the first topic to the last, or jump to the one your class is on this week.
          </FeatureItem>
          <FeatureItem icon={<CircleCheck />} title="Always know where you are">
            Lessons you have finished are ticked, and &ldquo;Continue&rdquo; takes you straight to the next one.
          </FeatureItem>
          <FeatureItem icon={<FileText />} title="ZIMSEC and Cambridge, kept apart">
            Each board has its own syllabus and its own course, so you never study material that is not on your papers.
          </FeatureItem>
        </ul>
      </Section>

      <LearningLoop id="loop" tone="surface" />

      <Section id="lessons" eyebrow="Lessons" title="Inside a lesson" description="Short enough to finish in one sitting, complete enough to learn the topic from.">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem icon={<BookOpen />} title="Clear explanations">
            Plain language, key terms in bold and a summary of what to remember at the end.
          </FeatureItem>
          <FeatureItem icon={<Lightbulb />} title="Worked examples">
            Problems solved step by step, in the style you will meet in the exam.
          </FeatureItem>
          <FeatureItem icon={<Sigma />} title="Formulas that read well">
            Mathematics and science notation is typeset properly, on any phone.
          </FeatureItem>
          <FeatureItem icon={<CircleCheck />} title="A quick check at the end">
            A few questions, marked straight away, show whether the lesson went in before you move on.
          </FeatureItem>
          <FeatureItem icon={<WifiOff />} title="Light on data">
            Pages are small and quick to load, and lessons you have opened stay readable when the connection drops.
          </FeatureItem>
          <FeatureItem icon={<ChartColumn />} title="Progress that adds up">
            Every lesson and question feeds your mastery of each topic, across the whole course.
          </FeatureItem>
        </ul>
      </Section>

      <PracticeSection />

      <Section
        id="planning"
        eyebrow="Planning"
        title="A plan that fits your school year"
        description="Tell us how many minutes a day you can study and when you write. The plan spreads the course over the weeks you have and moves weak topics forward."
      >
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem icon={<CalendarRange />} title="Weekly study plan">
            What to learn, practise and revise each week, built around your exam date.
          </FeatureItem>
          <FeatureItem icon={<ChartColumn />} title="Progress by topic">
            Mastery for every topic of every subject, so you can see what is secure and what is not.
          </FeatureItem>
          <FeatureItem icon={<CircleCheck />} title="Streaks and daily goals">
            A daily goal in minutes and a streak that rewards steady work, not cramming.
          </FeatureItem>
        </ul>
      </Section>

      <MockExamsSection />

      <HowItWorks id="journey" tone="surface" aiEnabled={ai} priceLabel={priceLabel} />

      <FinalCta priceLabel={priceLabel} />
    </>
  );
}
