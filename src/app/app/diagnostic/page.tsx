import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { randomUUID } from "node:crypto";
import { ArrowRight, BookOpenCheck, ClipboardCheck, Lock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { diagnosticSizeText } from "@/components/onboarding/copy";
import { DiagnosticStartForm, type DiagnosticSubjectOption } from "@/components/onboarding/DiagnosticStartForm";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { formatPercent } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { getDiagnosticHub, type DiagnosticSubject } from "@/server/onboarding/diagnostic";
import { DIAGNOSTIC_MINUTES_PER_SUBJECT, diagnosticMinutes, diagnosticReportHref, diagnosticRoomHref } from "@/server/onboarding/report";
import { startDiagnosticsAction } from "./actions";

export const metadata: Metadata = { title: "Diagnostic test" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function statusText(subject: DiagnosticSubject, timeZone: string): string {
  if (subject.questionsAvailable === 0) return "Not available yet";
  if (subject.status === "IN_PROGRESS") return "In progress";
  if (subject.completed) {
    const score = subject.completed.percentage === null ? "" : ` · ${formatPercent(subject.completed.percentage)}`;
    return `Taken ${formatInstantDate(subject.completed.completedAt, timeZone)}${score}`;
  }
  return "Not taken yet";
}

function detailText(subject: DiagnosticSubject): string {
  const parts = [subject.qualificationName, subject.syllabusLabel];
  parts.push(
    subject.questionsAvailable === 0
      ? "Questions for this subject are still being added"
      : diagnosticSizeText(subject.plannedQuestions, diagnosticMinutes(subject.plannedQuestions)),
  );
  return parts.filter(Boolean).join(" · ");
}

/**
 * The free diagnostic (§46, §52 step 5): what it is (about ten minutes per subject, no penalty), subjects to choose,
 * diagnostics in progress to continue and earlier reports. Starting opens the first diagnostic in the exam room;
 * nothing is marked or shown until it is submitted.
 */
export default async function DiagnosticPage({ searchParams }: { searchParams: SearchParams }) {
  const actor = await requireOnboardedStudent({ next: "/app/diagnostic" });
  const [{ from }, hub] = await Promise.all([searchParams, getDiagnosticHub(actor)]);
  const fromOnboarding = from === "onboarding";
  const inProgress = hub.subjects.filter((s) => s.status === "IN_PROGRESS" && s.openAttemptId);
  const completed = hub.subjects.filter((s) => s.completed);
  const options: DiagnosticSubjectOption[] = hub.subjects.map((subject) => ({
    subjectId: subject.subjectId,
    name: subject.name,
    detail: detailText(subject),
    statusText: statusText(subject, actor.timeZone),
    available: subject.questionsAvailable > 0,
    defaultChecked: subject.status !== "COMPLETED",
  }));

  return (
    <Container size="reading" className="space-y-6 pb-12">
      <PageHeader
        eyebrow="Free diagnostic"
        title="Find your starting point"
        description={`A short test for each subject, about ${DIAGNOSTIC_MINUTES_PER_SUBJECT} minutes each. It checks what you already know, so your study plan starts in the right place.`}
        className="pb-0"
      />

      {fromOnboarding && (
        <Alert tone="success" title="Your account is set up">
          Your subjects are saved. Take the diagnostic now, or come back to it later from your dashboard.
        </Alert>
      )}

      {hub.subjects.length === 0 ? (
        <EmptyState
          icon={<BookOpenCheck aria-hidden="true" />}
          title="Add a subject first"
          description="The diagnostic tests the subjects you study."
          action={<ButtonLink href="/app/subjects/manage">Add subjects</ButtonLink>}
        />
      ) : !hub.included ? (
        <EmptyState
          icon={<Lock aria-hidden="true" />}
          title="The diagnostic isn't part of your current plan"
          description="You can still practise and take topic tests that your plan includes."
          action={
            <>
              <UpgradeButton />
              <ButtonLink href="/app/practice" variant="outline">
                Practise now
              </ButtonLink>
            </>
          }
        />
      ) : (
        <>
          {inProgress.length > 0 && (
            <Card as="section" aria-labelledby="continue-heading">
              <CardHeader titleAs="h2" title={<span id="continue-heading">Continue where you left off</span>} />
              <CardBody className="pt-3">
                <ul className="space-y-2">
                  {inProgress.map((subject) => (
                    <li key={subject.subjectId}>
                      <ButtonLink
                        href={diagnosticRoomHref(subject.openAttemptId as string)}
                        variant="secondary"
                        fullWidth
                        iconEnd={<ArrowRight aria-hidden="true" />}
                        className="justify-between"
                      >
                        {subject.name} diagnostic
                      </ButtonLink>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}

          <Card as="section" aria-labelledby="how-heading" variant="sunken">
            <CardBody className="space-y-3">
              <h2 id="how-heading" className="flex items-center gap-2 text-base font-semibold text-text">
                <ClipboardCheck aria-hidden="true" className="size-5 text-primary" />
                How it works
              </h2>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-text marker:text-muted">
                <li>One question at a time. You can go back and change answers before you submit.</li>
                <li>Answers and marks are shown after you submit, in a report by topic.</li>
                <li>There&rsquo;s no penalty. It doesn&rsquo;t count towards anything, and you can skip a question you don&rsquo;t know.</li>
                <li>Your results set your starting level for each topic, so practice starts at the right difficulty.</li>
              </ul>
            </CardBody>
          </Card>

          <Card as="section" aria-labelledby="choose-heading">
            <CardHeader
              titleAs="h2"
              title={<span id="choose-heading">Choose your subjects</span>}
              description="Pick one or more. They run one after another; you can stop between subjects."
            />
            <CardBody>
              <DiagnosticStartForm
                subjects={options}
                idempotencyKey={randomUUID().replaceAll("-", "")}
                fromOnboarding={fromOnboarding}
                action={startDiagnosticsAction}
                upgradeHref={UPGRADE_PATH}
              />
            </CardBody>
          </Card>

          {completed.length > 0 && (
            <Card as="section" aria-labelledby="reports-heading">
              <CardHeader titleAs="h2" title={<span id="reports-heading">Your reports</span>} />
              <CardBody className="pt-3">
                <ul className="divide-y divide-border">
                  {completed.map((subject) => (
                    <li key={subject.subjectId} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2">
                      <span className="min-w-0 text-sm">
                        <span className="font-medium text-text">{subject.name}</span>
                        <span className="text-muted"> · {statusText(subject, actor.timeZone)}</span>
                      </span>
                      <Link
                        href={diagnosticReportHref(subject.completed?.attemptId as string)}
                        className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        aria-label={`View report for ${subject.name}`}
                      >
                        View report
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          )}
        </>
      )}

      {fromOnboarding && (
        <p className="text-center">
          <Link href="/app" className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline">
            Skip for now and go to my dashboard
          </Link>
        </p>
      )}
    </Container>
  );
}
