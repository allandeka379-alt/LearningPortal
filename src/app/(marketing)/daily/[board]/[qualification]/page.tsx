import { CalendarCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { formatLongDate } from "@/components/marketing/countdown";
import { DailyQualificationNav } from "@/components/marketing/DailyQualificationNav";
import { PublicDailyQuestion } from "@/components/marketing/PublicDailyQuestion";
import { DAILY_SIGN_UP_HREF, SIGN_IN_HREF } from "@/components/marketing/site-nav";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getDailyIndex, getPublicDailyPage, listDailyQualificationParams } from "@/server/marketing/daily";
import { marketingMetadata } from "@/server/marketing/metadata";
import { answerPublicDailyAction } from "../../actions";

/** Short revalidation: the question changes at midnight (Africa/Harare); answers stay valid for a day after. */
export const revalidate = 300;

type Params = Promise<{ board: string; qualification: string }>;

export async function generateStaticParams(): Promise<{ board: string; qualification: string }[]> {
  return listDailyQualificationParams();
}

/** One load per render, shared by `generateMetadata` and the page. */
const loadPage = cache((board: string, qualification: string) => getPublicDailyPage(board, qualification));

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { board, qualification } = await params;
  const page = await loadPage(board, qualification);
  if (!page) return { title: "Daily question", robots: { index: false, follow: false } };
  return marketingMetadata({
    title: `Today's ${page.qualification.label} question`,
    description: `Answer today's free ${page.qualification.label} question and see the marking and explanation straight away. No account needed.`,
    path: `/daily/${board}/${qualification}`,
  });
}

/**
 * /daily/[board]/[qualification] (§46): today's public question(s) for one qualification, answered without an account.
 * Each question is an island that posts the answer to a Server Action; the page is static and revalidated.
 */
export default async function DailyQualificationPage({ params }: { params: Params }) {
  const { board, qualification } = await params;
  const [page, index] = await Promise.all([loadPage(board, qualification), getDailyIndex()]);
  if (!page) notFound();

  return (
    <Container size="reading" className="pb-14 sm:pb-20">
      <PageHeader
        eyebrow={formatLongDate(page.date)}
        title={`Today's ${page.qualification.label} question`}
        description="Answer it, check it and read the explanation. Nothing is saved unless you have an account."
        breadcrumbs={[{ label: "Daily question", href: "/daily" }, { label: page.qualification.label }]}
      />
      <div className="mb-8">
        <DailyQualificationNav options={index.options} currentId={page.qualification.id} />
      </div>

      {page.items.length === 0 ? (
        <EmptyState
          icon={<CalendarCheck aria-hidden="true" />}
          title={`No ${page.qualification.label} question today`}
          description="Try another qualification above, or join to learn and practise your own subjects."
          action={<ButtonLink href={DAILY_SIGN_UP_HREF}>Join now</ButtonLink>}
        />
      ) : (
        <div className="space-y-12">
          {page.items.map((item) => (
            <article key={item.dailyQuestionId} className="rounded-card border border-border bg-surface p-4 sm:p-6">
              {item.isDemo && (
                <Badge tone="warning" className="mb-3">
                  Demo question (development data)
                </Badge>
              )}
              <PublicDailyQuestion
                answerId={item.dailyQuestionId}
                question={item.question}
                heading={item.subjectName ?? "Today's question"}
                headingLevel={2}
                action={answerPublicDailyAction}
                signUpHref={DAILY_SIGN_UP_HREF}
                signInHref={`${SIGN_IN_HREF}?next=/app/daily`}
              />
            </article>
          ))}
        </div>
      )}

      <p className="mt-10 text-sm text-muted">
        Signed in already?{" "}
        <Link href="/app/daily" className="font-medium text-primary underline underline-offset-4">
          Go to your daily questions
        </Link>{" "}
        to keep your streak.
      </p>
    </Container>
  );
}
