import { BookOpen, Lightbulb, Scale, ShieldCheck, Smartphone, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { FinalCta } from "@/components/marketing/FinalCta";
import { FeatureItem, Section } from "@/components/marketing/Section";
import { APP_NAME, SUPPORT_EMAIL, SUPPORT_EMAIL_CONFIGURED } from "@/lib/config";
import { getFeatures } from "@/server/features";
import { marketingMetadata } from "@/server/marketing/metadata";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "About us",
    description: `Why ${APP_NAME} exists, what we believe about learning, and how we build a study platform for Zimbabwean O-Level and A-Level students.`,
    path: "/about",
  });
}

/**
 * /about (§1 vision, §27 content integrity, §50 honesty). Mission and principles only: no team claims, user counts or
 * results that the platform cannot prove (CLAUDE.md rule 6). The AI tutor is mentioned only while AI features are switched
 * on (`features.ai`, owner decision 2026-10-07).
 */
export default async function AboutPage() {
  const { ai } = await getFeatures();
  return (
    <>
      <section aria-labelledby="about-heading" className="relative overflow-hidden border-b border-border">
        <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full" opacity={0.05} />
        <Container size="reading" className="relative py-14 sm:py-20">
          <p className="text-sm font-semibold text-primary">About {APP_NAME}</p>
          <h1 id="about-heading" className="mt-3 text-3xl font-bold tracking-tight text-text sm:text-4xl">
            Serious exam preparation, within reach of every student
          </h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
            <p>
              {APP_NAME} is a study platform for students preparing for ZIMSEC and Cambridge examinations: structured lessons, practice questions with instant marking, timed mock
              exams{ai ? ", a personal study plan and an AI tutor that explains rather than simply answers." : " and a personal study plan."}
            </p>
            <p>
              It is designed for the way students in Zimbabwe actually study: mostly on phones, often on slow or
              expensive data, and with exams that follow each board&apos;s own syllabus.
            </p>
          </div>
        </Container>
      </section>

      <Section id="principles" title="What we believe" description="These principles shape every feature we build.">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureItem icon={<Target />} title="Follow the syllabus you will sit">
            ZIMSEC and Cambridge are set up separately, each with its own syllabus versions, so revision matches your papers.
          </FeatureItem>
          <FeatureItem icon={<Lightbulb />} title="Teach, don't just tell">
            Explanations, hints and worked solutions come first.{" "}
            {ai ? "The AI tutor helps you think the problem through." : "They show you how to think the problem through, not just the answer."}
          </FeatureItem>
          <FeatureItem icon={<BookOpen />} title="Original, properly licensed content">
            We write our own lessons and questions or use material we are licensed to use. We do not copy textbooks or past
            papers.
          </FeatureItem>
          <FeatureItem icon={<Scale />} title="Honest numbers">
            Progress, scores and dashboards show real results. Where there is no data yet, we say so.
          </FeatureItem>
          <FeatureItem icon={<Smartphone />} title="Built for phones and slow data">
            Pages are light and load quickly, and lessons you have opened stay readable when the connection drops.
          </FeatureItem>
          <FeatureItem icon={<ShieldCheck />} title="Students' privacy first">
            Most secondary students are under 18, so we collect as little personal data as we need
            {ai ? " and never send names or contact details to the AI." : "."}
          </FeatureItem>
        </ul>
      </Section>

      <Section id="contact-us" tone="surface" title="Get in touch">
        <div className="max-w-2xl space-y-3 text-base text-muted">
          {SUPPORT_EMAIL_CONFIGURED ? (
            <p>
              Questions, feedback or corrections to our content are welcome. Email{" "}
              <a href={`mailto:${SUPPORT_EMAIL}`} className="font-medium text-primary underline underline-offset-4">
                {SUPPORT_EMAIL}
              </a>
              .
            </p>
          ) : (
            <p>Questions and feedback are welcome. Contact details will be published here before launch.</p>
          )}
          <p>
            Schools can use the{" "}
            <Link href="/schools#contact" className="font-medium text-primary underline underline-offset-4">
              school enquiry form
            </Link>
            .
          </p>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
