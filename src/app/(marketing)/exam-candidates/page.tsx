import { ArrowRight, Brain, CalendarClock, Hourglass, Target, Timer, UserRound } from "lucide-react";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { EXAM_CANDIDATE_POINTS, joinLabel } from "@/components/marketing/copy";
import { ExamCountdown } from "@/components/marketing/ExamCountdown";
import { FinalCta } from "@/components/marketing/FinalCta";
import { MockExamsSection } from "@/components/marketing/home/Features";
import { PageHero } from "@/components/marketing/PageHero";
import { FeatureItem, Section } from "@/components/marketing/Section";
import { EXAM_CANDIDATES_HREF, SIGN_UP_HREF } from "@/components/marketing/site-nav";
import { ButtonLink } from "@/components/ui/Button";
import { APP_NAME } from "@/lib/config";
import { getFullAccessOffer } from "@/server/billing/offer";
import { getCountdownCatalogue } from "@/server/marketing/countdown";
import { marketingMetadata } from "@/server/marketing/metadata";

/** Static, revalidated hourly (sessions and the price are data; the day count runs in the browser). */
export const revalidate = 3600;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "For exam candidates",
    description: `Writing ZIMSEC or Cambridge O-Level or A-Level exams this year? ${APP_NAME} gives you a plan to your exam date, exam-style questions and timed mock papers with a grade estimate.`,
    path: EXAM_CANDIDATES_HREF,
  });
}

const POINT_ICONS: Record<(typeof EXAM_CANDIDATE_POINTS)[number]["key"], ReactNode> = {
  countdown: <Hourglass />,
  plan: <CalendarClock />,
  questions: <Brain />,
  mocks: <Timer />,
  gaps: <Target />,
};

/** The run-in to an exam, as stages of revision (UI guidance on how the tools fit together, no claims). */
const STAGES: readonly { when: string; title: string; body: string }[] = [
  {
    when: "Six months or more",
    title: "Finish and secure the course",
    body: "Complete the lessons you have not covered yet and use topic tests to find the topics that are not secure.",
  },
  {
    when: "Three to six months",
    title: "Repair the weak topics",
    body: "Your plan moves weak topics forward. Relearn them, practise until the marks come, and keep flashcards going every day.",
  },
  {
    when: "The last two months",
    title: "Rehearse under exam conditions",
    body: "Sit timed mock papers, read the mark-scheme style answers and spend the days in between on what each mock showed up.",
  },
];

/**
 * /exam-candidates (owner brief 2026-10-12: target students writing their exams): Form 4, Upper Sixth and private
 * candidates. What changes in the run-in to the exam, the countdown tool (sessions from the database), revision stages
 * and mock exams. The price comes from the database.
 */
export default async function ExamCandidatesPage() {
  const [offer, boards] = await Promise.all([getFullAccessOffer(), getCountdownCatalogue()]);
  const priceLabel = offer?.price.priceLabel ?? null;
  const hasSessions = boards.some((board) => board.qualifications.some((qualification) => qualification.sessions.length > 0));

  return (
    <>
      <PageHero
        id="candidates-heading"
        eyebrow="For exam candidates"
        title="Writing your exams this year? Make every week count."
        description={
          <p>
            For Form 4 and Upper Sixth students and private candidates sitting ZIMSEC or Cambridge papers: a plan to your exam date, exam-style questions and
            timed mock papers, with every result pointing to what to fix next.
          </p>
        }
        actions={
          <>
            <ButtonLink href={SIGN_UP_HREF} size="lg" iconEnd={<ArrowRight aria-hidden="true" />}>
              {joinLabel(priceLabel)}
            </ButtonLink>
            <ButtonLink href={hasSessions ? "#countdown" : "/exam-countdown"} size="lg" variant="outline">
              Count down to your exams
            </ButtonLink>
          </>
        }
      />

      <Section id="tools" eyebrow="Exam preparation" title="Everything in the course, plus what matters when the papers are close">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_CANDIDATE_POINTS.map((point) => (
            <FeatureItem key={point.key} icon={POINT_ICONS[point.key]} title={point.title}>
              {point.body}
            </FeatureItem>
          ))}
          <FeatureItem icon={<UserRound />} title="Private candidates welcome">
            Studying on your own? Choose your board, subjects and session and follow the same courses and plan.
          </FeatureItem>
        </ul>
      </Section>

      <Section
        id="stages"
        tone="surface"
        eyebrow="Your run-in"
        title="How to use the months you have"
        description="The plan adapts to the time you have left. Roughly, the months before an exam fall into three stages."
      >
        <ol className="grid gap-5 md:grid-cols-3">
          {STAGES.map((stage, index) => (
            <li key={stage.when} className="relative rounded-card border border-border bg-bg p-5 sm:p-6">
              <p className="text-sm font-semibold text-accent-text">{stage.when}</p>
              <h3 className="mt-2 text-lg font-bold tracking-tight text-text">
                <span className="sr-only">Stage {index + 1}: </span>
                {stage.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stage.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {hasSessions && (
        <Section
          id="countdown"
          eyebrow="Exam countdown"
          title="How long until your exams?"
          description="Choose your board, qualification and session. Dates marked provisional are still to be confirmed against the official timetable."
        >
          <div className="max-w-2xl">
            <ExamCountdown boards={boards} />
          </div>
        </Section>
      )}

      <MockExamsSection />

      <FinalCta
        title="Start your run-in today"
        description="Create your account, choose your exam session and get a plan for the weeks you have left."
        priceLabel={priceLabel}
      />
    </>
  );
}
