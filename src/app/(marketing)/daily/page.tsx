import { ArrowRight, CalendarCheck, Flame } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatLongDate } from "@/components/marketing/countdown";
import { DAILY_SIGN_UP_HREF } from "@/components/marketing/site-nav";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDailyIndex } from "@/server/marketing/daily";
import { marketingMetadata } from "@/server/marketing/metadata";

/** Short revalidation: the question changes at midnight (Africa/Harare). */
export const revalidate = 300;

export function generateMetadata(): Metadata {
  return marketingMetadata({
    title: "Daily question",
    description: "Answer today's free ZIMSEC or Cambridge exam-practice question and see the marking and explanation straight away. No account needed.",
    path: "/daily",
  });
}

/**
 * /daily (§46): today's free question per qualification for signed-out visitors. Choose a qualification to answer.
 * Signed-in students use /app/daily, which counts towards their streak.
 */
export default async function DailyIndexPage() {
  const { date, options } = await getDailyIndex();
  const withQuestions = options.filter((option) => option.questionCount > 0);

  return (
    <Container className="pb-14 sm:pb-20">
      <PageHeader
        eyebrow={formatLongDate(date)}
        title="Today's question"
        description="Pick your qualification, answer the question and see the marking and the explanation straight away. No account needed."
      />

      {withQuestions.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck aria-hidden="true" />}
          title="Today's questions are not published yet"
          description="Check back later today, or join to learn and practise your own subjects now."
          action={<ButtonLink href={DAILY_SIGN_UP_HREF}>Join now</ButtonLink>}
        />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {options.map((option) => (
            <li
              key={option.qualificationId}
              className="relative flex flex-col rounded-card border border-border bg-surface p-5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-focus"
            >
              <h2 className="text-lg font-bold text-text">
                {option.questionCount > 0 ? (
                  <Link href={option.href} className="outline-none after:absolute after:inset-0 after:rounded-card">
                    {option.label}
                  </Link>
                ) : (
                  option.label
                )}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {option.questionCount === 0
                  ? "No question today."
                  : option.subjects.length > 0
                    ? option.subjects.join(", ")
                    : option.questionCount === 1
                      ? "1 question"
                      : `${option.questionCount} questions`}
              </p>
              {option.questionCount > 0 && (
                <span aria-hidden="true" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Answer now
                  <ArrowRight className="size-4" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <Alert tone="accent" icon={<Flame aria-hidden="true" />} title="Keep a streak" className="mt-10">
        Answers here are marked but not saved. With an account, the daily question follows your own subjects and counts
        towards your study streak.{" "}
        <Link href="/app/daily" className="font-medium text-primary underline underline-offset-4">
          Signed in already? Go to your daily questions
        </Link>
        .
      </Alert>
    </Container>
  );
}
