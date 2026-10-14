import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { CalendarCheck, CircleCheck, Flame } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnswerRunner } from "@/components/questions/AnswerRunner";
import { WhatsAppGroupShare } from "@/components/share/WhatsAppGroupShare";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { APP_NAME } from "@/lib/config";
import { formatCount } from "@/lib/format";
import type { Actor } from "@/server/auth/actor";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { absoluteUrl } from "@/server/lib/env";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getDailyOverview, getSessionState, type DailySubjectItem } from "@/server/practice";
import { reportProblemAction } from "../_actions/report-problem";
import { answerQuestionAction, revealHintAction, selfAssessAction } from "../practice/actions";
import { StartDailyForm } from "./_components/StartDailyForm";
import { startDailyQuestionAction } from "./actions";

export const metadata: Metadata = { title: "Daily question" };

/**
 * The daily question for signed-in students (§46): one question a day per subject, instant feedback, and it counts as
 * practice for the streak (§19). Several subjects → one tab each. The signed-out public page is part of the
 * marketing site.
 */
export default async function DailyQuestionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const actor = await requireOnboardedStudent({ next: "/app/daily" });
  const { subjectId } = await searchParams;
  const overview = await getDailyOverview(actor);
  const available = overview.items.filter((item) => item.dailyQuestionId !== null);
  const selected =
    available.find((item) => item.subject.id === subjectId) ??
    available.find((item) => item.entitled && (item.attempt === null || item.attempt.status === "IN_PROGRESS")) ??
    available[0] ??
    null;

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title="Daily question"
        description="One question a day for each of your subjects. A few minutes that keep your revision going."
        actions={<StreakBadge streak={overview.streak} />}
      />

      {overview.items.length === 0 ? (
        <EmptyState
          motif
          icon={<CalendarCheck aria-hidden="true" />}
          title="Add a subject to get daily questions"
          action={<ButtonLink href="/app/subjects/manage">Choose subjects</ButtonLink>}
        />
      ) : !selected ? (
        <EmptyState
          icon={<CalendarCheck aria-hidden="true" />}
          title="No daily question today yet"
          description="Today's questions haven't been published for your subjects. You can still practise any topic."
          action={<ButtonLink href="/app/practice">Practise now</ButtonLink>}
        />
      ) : (
        <div className="space-y-6">
          {available.length > 1 && <SubjectTabs items={available} selectedId={selected.subject.id} />}
          <DailyBody actor={actor} item={selected} />
        </div>
      )}
    </Container>
  );
}

function StreakBadge({ streak }: { streak: number }) {
  return (
    <p className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent-soft px-3.5 text-sm font-semibold text-on-accent-soft">
      <Flame aria-hidden="true" className="size-4" />
      {streak > 0 ? `${formatCount(streak, "day")} streak` : "No streak yet"}
    </p>
  );
}

function SubjectTabs({ items, selectedId }: { items: DailySubjectItem[]; selectedId: string }) {
  return (
    <nav aria-label="Subjects">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => {
          const current = item.subject.id === selectedId;
          const done = item.attempt !== null && item.attempt.status !== "IN_PROGRESS";
          return (
            <li key={item.subject.id}>
              <Link
                href={`/app/daily?subjectId=${item.subject.id}`}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
                  current ? "border-primary bg-primary-soft text-on-primary-soft" : "border-border bg-surface text-text hover:border-border-strong",
                )}
              >
                {done && <CircleCheck aria-hidden="true" className="size-4 text-success-text" />}
                {item.subject.name}
                {done && <span className="sr-only"> (answered)</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

async function DailyBody({ actor, item }: { actor: Actor; item: DailySubjectItem }) {
  // "Ask the tutor" only while AI is switched on (`features.ai`, owner decision 2026-10-07).
  const askTutor = await isFeatureEnabled("ai");
  const practiceHref = `/app/practice?subjectId=${item.subject.id}`;
  if (!item.attempt) {
    if (!item.entitled) {
      return (
        <Alert
          tone="accent"
          title="The daily question isn't included in your plan"
          action={
            <UpgradeButton variant="accent" />
          }
        >
          You can still practise {item.subject.name} on the practice page.
        </Alert>
      );
    }
    return (
      <Card>
        <CardBody className="space-y-4">
          <p className="text-sm font-semibold text-primary">
            {item.subject.name} · {item.qualificationName}
          </p>
          <p className="text-base text-text">Today&apos;s question is ready. You&apos;ll see the answer and an explanation straight after you answer.</p>
          <StartDailyForm subjectId={item.subject.id} subjectName={item.subject.name} upgradeHref={UPGRADE_PATH} action={startDailyQuestionAction} />
        </CardBody>
      </Card>
    );
  }

  const state = await getSessionState(actor, item.attempt.id, { withLastAnswered: true });
  const slot = state.current ?? state.lastAnswered;
  if (!slot || !slot.question) {
    return (
      <EmptyState
        icon={<CalendarCheck aria-hidden="true" />}
        title="Today's question is no longer available"
        description="It was withdrawn after you opened it. A new question will be ready tomorrow."
        action={<ButtonLink href={practiceHref}>Practise {item.subject.name}</ButtonLink>}
      />
    );
  }
  const answered = state.current === null;
  const joinUrl = absoluteUrl("/register");

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold text-primary">
        {item.subject.name} · {item.qualificationName}
      </p>
      <AnswerRunner
        key={`${state.attemptId}:${slot.position}:${answered ? "done" : "open"}`}
        attemptId={state.attemptId}
        position={slot.position}
        question={slot.question}
        heading="Today's question"
        initialResponse={slot.response}
        initialFeedback={answered ? slot.feedback : null}
        initialHints={answered ? [] : slot.hints}
        answerAction={answerQuestionAction}
        hintAction={revealHintAction}
        selfAssessAction={selfAssessAction}
        reportAction={reportProblemAction}
        askTutor={askTutor}
        completion={{ href: practiceHref, label: `Practise more ${item.subject.name}` }}
        upgradeHref={UPGRADE_PATH}
      />
      {answered && (
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted">Come back tomorrow for a new question.</p>
          <WhatsAppGroupShare
            url={joinUrl}
            message={`I just did today's ${item.subject.name} daily question on ${APP_NAME}. Join our class/group here: ${joinUrl}`}
          />
        </div>
      )}
    </div>
  );
}
