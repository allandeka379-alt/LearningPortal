import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowRight, BookOpenCheck, CalendarCheck, History } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getPracticeBuilder, PRACTICE_SESSION_SIZES, type OpenPracticeSession, type PracticeAllowance } from "@/server/practice";
import { PracticeBuilder } from "./_components/PracticeBuilder";
import { SubjectPicker } from "./_components/SubjectPicker";
import { parseBuilderParams, sessionSizes, type SearchParams } from "./_lib/params";
import { startPracticeAction } from "./actions";

export const metadata: Metadata = { title: "Practice" };

/**
 * Practice builder (§10): subject (from enrolments), topics (pinned syllabus tree), number of questions and
 * difficulty (adaptive by default, §11). Honours dashboard / plan / results deep links
 * (`?subjectId=&topicId=&count=&difficulty=&mode=RETEST`). Shows today's allowance on limited plans and unfinished
 * sessions to resume.
 */
export default async function PracticePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = parseBuilderParams(await searchParams);
  const actor = await requireOnboardedStudent({ next: "/app/practice" });
  const data = await getPracticeBuilder(actor, { subjectId: params.subjectId });
  const subject = data.subjects.find((s) => s.id === data.selectedSubjectId) ?? null;
  const isRetest = params.mode === "RETEST";
  const blocked = data.allowance?.remaining === 0;

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        title={isRetest ? "Re-test" : "Practice"}
        description={
          isRetest
            ? "Check that what you learned has stuck. Questions come from topics that are due for a re-test."
            : "Choose a subject and topics. You get the answer, an explanation and the key idea after every question."
        }
        actions={
          <ButtonLink href="/app/daily" variant="outline" iconStart={<CalendarCheck aria-hidden="true" />}>
            Daily question
          </ButtonLink>
        }
      />

      {data.openSessions.length > 0 && <OpenSessions sessions={data.openSessions} />}

      {!subject ? (
        <EmptyState
          motif
          icon={<BookOpenCheck aria-hidden="true" />}
          title="Add a subject to start practising"
          description="Practice questions come from the syllabus of the subjects you study."
          action={<ButtonLink href="/app/subjects/manage">Choose subjects</ButtonLink>}
        />
      ) : (
        <div className="space-y-8">
          <SubjectPicker
            subjects={data.subjects.map((s) => ({ id: s.id, label: `${s.name} · ${s.qualificationName}${s.paused ? " (paused)" : ""}` }))}
            selectedId={subject.id}
            keep={{ ...(isRetest ? { mode: "RETEST" } : {}), count: String(params.count), difficulty: params.difficulty }}
          />

          {data.allowance && <AllowanceNotice allowance={data.allowance} />}

          <PracticeBuilder
            key={subject.id}
            subject={{ id: subject.id, name: subject.name }}
            topics={data.topics}
            defaults={{ topicIds: params.topicIds, count: params.count, difficulty: params.difficulty, mode: params.mode, origin: params.origin }}
            sizes={sessionSizes(PRACTICE_SESSION_SIZES, params.count)}
            blocked={blocked}
            upgradeHref={UPGRADE_PATH}
            startAction={startPracticeAction}
          />
        </div>
      )}
    </Container>
  );
}

function AllowanceNotice({ allowance }: { allowance: PracticeAllowance }) {
  if (allowance.limit === null || allowance.remaining === null) return null;
  if (allowance.remaining === 0) {
    return (
      <Alert
        tone="accent"
        title="You've used today's practice questions"
        action={
          <UpgradeButton variant="accent" />
        }
      >
        Your plan includes {formatCount(allowance.limit, "practice question")} a day. Come back tomorrow, or unlock full access for unlimited practice.
      </Alert>
    );
  }
  return (
    <div className="space-y-2">
      <ProgressBar
        label="Today's practice questions"
        value={allowance.used}
        max={allowance.limit}
        valueText={`${allowance.used} of ${allowance.limit} used`}
        tone="accent"
        size="sm"
      />
      <p className="text-sm text-muted">
        {formatCount(allowance.remaining, "question")} left today on your plan. A longer session is shortened to fit.
      </p>
    </div>
  );
}

function OpenSessions({ sessions }: { sessions: OpenPracticeSession[] }) {
  return (
    <Card as="section" aria-labelledby="open-sessions-heading" className="mb-8">
      <CardHeader titleAs="h2" title={<span id="open-sessions-heading">Continue where you left off</span>} />
      <CardBody className="pt-3">
        <ul className="divide-y divide-border">
          {sessions.map((session) => (
            <li key={session.attemptId} className="flex flex-col gap-3 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="flex items-center gap-2 font-medium text-text">
                  <History aria-hidden="true" className="size-4 shrink-0 text-muted" />
                  <span className="truncate">
                    {session.subjectName}
                    {session.topicName ? ` · ${session.topicName}` : ""}
                    {session.mode === "RETEST" ? " · Re-test" : ""}
                  </span>
                </p>
                <p className="text-sm text-muted tabular-nums">
                  {session.answered} of {formatCount(session.total, "question")} answered
                </p>
              </div>
              <ButtonLink href={`/app/practice/${session.attemptId}`} variant="secondary" iconEnd={<ArrowRight aria-hidden="true" />}>
                Continue<span className="sr-only"> {session.subjectName} session</span>
              </ButtonLink>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
