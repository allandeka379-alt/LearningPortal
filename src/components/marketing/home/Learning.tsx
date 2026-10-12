import { ArrowRight, BookOpen, Brain, CalendarClock, CircleCheck, ClipboardList, Hourglass, Layers, ListChecks, Route, Target, Timer } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronPattern } from "@/components/brand/ChevronPattern";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { MarketingForm } from "@/server/marketing/learning-core";
import { EXAM_CANDIDATE_POINTS, LEARNING_LOOP } from "../copy";
import { Section } from "../Section";
import { EXAM_CANDIDATES_HREF } from "../site-nav";

const STAGE_COPY: Record<MarketingForm["stage"], { title: string; body: (level: string) => string; icon: ReactNode }> = {
  course: {
    title: "Learn the course",
    body: (level) =>
      `Start ${level} the right way: work through each subject topic by topic as it is taught at school, with a lesson, a quick check and practice until it sticks.`,
    icon: <Route aria-hidden="true" />,
  },
  exam: {
    title: "Your exam year",
    body: (level) =>
      `Finish the ${level} syllabus, close the gaps your practice shows up, and sit timed mock papers before the real thing.`,
    icon: <Target aria-hidden="true" />,
  },
};

/** Form 3 to Form 6 (owner brief 2026-10-12): one card per school year from the database, with its level and stage. */
export function FormsSection({ forms }: { forms: readonly MarketingForm[] }) {
  if (forms.length === 0) return null;
  return (
    <Section
      id="forms"
      eyebrow="Form 3 to Form 6"
      title="A course for every year, from Form 3 to Upper Sixth"
      description="Tell us your form once. Your courses, practice and mock exams follow your level and your board's syllabus, and move with you into the next year."
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {forms.map((form) => {
          const stage = STAGE_COPY[form.stage];
          return (
            <li
              key={form.code}
              id={`form-${form.code.toLowerCase()}`}
              className={cn(
                "flex scroll-mt-24 flex-col rounded-card border bg-surface p-5 target:border-primary target:ring-2 target:ring-primary/30",
                form.stage === "exam" ? "border-border-strong" : "border-border",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-xl font-bold tracking-tight text-text">{form.name}</h3>
                <Badge tone={form.stage === "exam" ? "accent" : "primary"} size="sm">
                  {form.level.name}
                </Badge>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary [&_svg]:size-4">
                {stage.icon}
                {stage.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{stage.body(form.level.name)}</p>
              {form.qualifications.length > 0 && (
                <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t border-border pt-4 text-sm" aria-label={`${form.name} qualifications`}>
                  {form.qualifications.map((qualification) => (
                    <li key={qualification.id}>
                      {qualification.href && !qualification.comingSoon ? (
                        <Link href={qualification.href} className="inline-flex min-h-11 items-center gap-1 font-medium text-primary underline-offset-4 hover:underline sm:pointer-fine:min-h-8">
                          {qualification.label}
                        </Link>
                      ) : (
                        <span className="inline-flex min-h-11 items-center text-muted sm:pointer-fine:min-h-8">
                          {qualification.label}
                          {qualification.comingSoon && " (soon)"}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

const LOOP_ICONS: Record<(typeof LEARNING_LOOP)[number]["key"], ReactNode> = {
  learn: <BookOpen aria-hidden="true" />,
  check: <CircleCheck aria-hidden="true" />,
  practise: <ListChecks aria-hidden="true" />,
  remember: <Layers aria-hidden="true" />,
  test: <ClipboardList aria-hidden="true" />,
};

/** The learning loop every topic follows: learn, check, practise, remember, test. */
export function LearningLoop({ id = "learning", tone = "surface", headingLevel = "h2" }: { id?: string; tone?: "plain" | "surface" | "subtle"; headingLevel?: "h2" | "h3" }) {
  return (
    <Section
      id={id}
      tone={tone}
      eyebrow="How you learn"
      title="Every topic, the same five steps"
      description="Lessons are written for your board's syllabus, so what you learn matches the papers you will sit. Each topic takes you from first meeting it to knowing you can answer it."
    >
      <ol className="relative grid gap-4 md:grid-cols-5 md:gap-3">
        <span aria-hidden="true" className="absolute top-7 right-[10%] left-[10%] hidden h-px bg-border md:block" />
        {LEARNING_LOOP.map((step, index) => {
          const Title = headingLevel === "h2" ? "h3" : "h4";
          return (
            <li key={step.key} className="relative flex gap-4 rounded-card border border-border bg-bg p-4 md:flex-col md:items-center md:gap-3 md:border-0 md:bg-transparent md:p-0 md:text-center">
              <span
                aria-hidden="true"
                className="relative flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-xs [&_svg]:size-6"
              >
                {LOOP_ICONS[step.key]}
              </span>
              <div className="min-w-0">
                <Title className="font-semibold text-text">
                  <span className="mr-1.5 text-sm text-muted tabular-nums">{index + 1}.</span>
                  {step.title}
                </Title>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

const EXAM_ICONS: Record<(typeof EXAM_CANDIDATE_POINTS)[number]["key"], ReactNode> = {
  countdown: <Hourglass aria-hidden="true" />,
  plan: <CalendarClock aria-hidden="true" />,
  questions: <Brain aria-hidden="true" />,
  mocks: <Timer aria-hidden="true" />,
  gaps: <Target aria-hidden="true" />,
};

/** Exam-candidate band (Form 4, Upper Sixth, private candidates): what changes when the exam is close. */
export function ExamCandidatesBand({ showLink = true }: { showLink?: boolean }) {
  return (
    <section aria-labelledby="exam-candidates-heading" className="relative overflow-hidden bg-primary text-on-primary">
      <ChevronPattern variant="field" tone="primary" className="absolute inset-0 h-full mix-blend-soft-light" opacity={0.15} />
      <Container className="relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="text-sm font-semibold tracking-wide uppercase opacity-80">Writing exams this year?</p>
          <h2 id="exam-candidates-heading" className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Turn the months before your exam into a plan
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed opacity-90 sm:text-lg">
            For Form 4 and Upper Sixth students and private candidates: everything in the course, plus the tools that matter when the papers are close.
          </p>
          {showLink && (
            <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
              <ButtonLink href={EXAM_CANDIDATES_HREF} size="lg" variant="secondary" iconEnd={<ArrowRight aria-hidden="true" />}>
                Exam preparation
              </ButtonLink>
              <Link
                href="/exam-countdown"
                className="inline-flex min-h-11 items-center justify-center rounded-control px-4 text-sm font-semibold underline-offset-4 hover:underline"
              >
                How long until my exams?
              </Link>
            </div>
          )}
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {EXAM_CANDIDATE_POINTS.map((point, index) => (
            <li
              key={point.key}
              className={cn("rounded-card border border-on-primary/15 bg-on-primary/[0.06] p-4 sm:p-5", index === EXAM_CANDIDATE_POINTS.length - 1 && "sm:col-span-2")}
            >
              <p className="flex items-center gap-2.5 font-semibold [&_svg]:size-5 [&_svg]:shrink-0">
                {EXAM_ICONS[point.key]}
                {point.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed opacity-85">{point.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
