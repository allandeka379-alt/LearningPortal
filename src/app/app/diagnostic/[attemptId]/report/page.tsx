import { ArrowRight, CalendarDays, ClipboardList, LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect, unstable_rethrow } from "next/navigation";
import { cache } from "react";
import { ClearExamDraft } from "@/components/exam/ClearExamDraft";
import { ScoreSummary } from "@/components/exam/results/ScoreSummary";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { DiagnosticFindings } from "@/components/onboarding/DiagnosticFindings";
import { DiagnosticTopicResults } from "@/components/onboarding/DiagnosticTopicResults";
import { StartingTopics } from "@/components/onboarding/StartingTopics";
import { ReviewList } from "@/components/questions/ReviewList";
import { SelfMarkingNotice } from "@/components/questions/SelfMarkingNotice";
import { formatInstantDate } from "@/components/student/format";
import { Alert } from "@/components/ui/Alert";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { isAppError } from "@/server/lib/errors";
import { reportProblemAction } from "../../../_actions/report-problem";
import { selfAssessExamAnswerAction } from "../../../exams/actions";
import { getDiagnosticReport } from "@/server/onboarding/diagnostic";
import { diagnosticRoomHref } from "@/server/onboarding/report";
import { isUuid } from "../../_lib/params";

type Params = Promise<{ attemptId: string }>;

/** One read per request, shared by generateMetadata and the page. */
const loadReport = cache(async (attemptId: string) => {
  const actor = await requireOnboardedStudent({ next: `/app/diagnostic/${attemptId}/report` });
  try {
    return { actor, loaded: await getDiagnosticReport(actor, attemptId) };
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
});

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) return { title: "Diagnostic report" };
  try {
    const { loaded } = await loadReport(attemptId);
    return { title: loaded.kind === "REPORT" ? `Diagnostic report: ${loaded.report.subject.name}` : "Diagnostic report" };
  } catch (error) {
    unstable_rethrow(error);
    return { title: "Diagnostic report" };
  }
}

/**
 * The diagnostic's performance report (§52 step 6): score, performance by topic with the mastery band the diagnostic
 * seeded, strengths and gaps, recommended starting topics with working links, then "Create my study plan" (§52 step 7)
 * and "Go to dashboard", and finally every question with the student's answer, the correct answer and the
 * explanation. A diagnostic is a starting point: no grade estimate is shown for it.
 */
export default async function DiagnosticReportPage({ params }: { params: Params }) {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) notFound();
  const { actor, loaded } = await loadReport(attemptId);
  if (loaded.kind === "REDIRECT") redirect(loaded.href);
  const report = loaded.report;
  // "Ask the tutor" only while AI is switched on (`features.ai`, owner decision 2026-10-07).
  const askTutor = await isFeatureEnabled("ai");
  const waiting = report.otherDiagnostics.filter((d) => d.openAttemptId !== null);
  const notStarted = report.otherDiagnostics.filter((d) => d.openAttemptId === null);
  const nextDiagnostic = waiting[0];

  return (
    <Container size="reading" className="space-y-8 pb-12">
      <ClearExamDraft attemptId={report.attemptId} />
      <PageHeader
        eyebrow={`Diagnostic · ${report.subject.name}`}
        title="Your diagnostic report"
        description={report.submittedAt ? `Taken ${formatInstantDate(report.submittedAt, actor.timeZone, "long")}` : undefined}
        breadcrumbs={[{ label: "Diagnostic", href: "/app/diagnostic" }, { label: "Report" }]}
        className="pb-0"
      />

      {nextDiagnostic && (
        <Alert
          tone="info"
          title={`Your ${nextDiagnostic.name} diagnostic is ready`}
          action={
            <ButtonLink href={diagnosticRoomHref(nextDiagnostic.openAttemptId as string)} iconEnd={<ArrowRight aria-hidden="true" />}>
              Continue with {nextDiagnostic.name}
            </ButtonLink>
          }
        >
          Do it now so your study plan covers every subject from the start.
        </Alert>
      )}

      {report.nothingAnswered ? (
        <EmptyState
          icon={<ClipboardList aria-hidden="true" />}
          title="No answers were saved in this diagnostic"
          description="There is nothing to mark, so there is no report. You can take the diagnostic again whenever you're ready."
          action={
            <>
              <ButtonLink href="/app/diagnostic">Take it again</ButtonLink>
              <ButtonLink href="/app" variant="outline">
                Go to dashboard
              </ButtonLink>
            </>
          }
        />
      ) : (
        <>
          <ScoreSummary
            results={{
              score: report.score,
              nothingAnswered: report.nothingAnswered,
              pendingMarks: report.pendingMarks,
              grade: null,
              nextGrade: null,
              submitReason: report.submitReason,
              lateSync: report.lateSync,
            }}
          />
          <SelfMarkingNotice count={report.selfAssessableCount} />
          <Alert tone="neutral" title="A starting point, not a grade">
            These answers set your starting mastery for each topic. After a short test it starts carefully, and it grows as you
            practise.
          </Alert>

          <DiagnosticTopicResults topics={report.topics} notCovered={report.notCovered} />
          <DiagnosticFindings strengths={report.strengths} gaps={report.gaps} />
          <StartingTopics subjectId={report.subject.id} topics={report.startingTopics} />

          <Card as="section" aria-labelledby="next-step-heading" className="border-primary/40">
            <CardBody className="space-y-4">
              <div className="space-y-1.5">
                <h2 id="next-step-heading" className="text-lg font-semibold text-text">
                  {report.hasActivePlan ? "Update your study plan" : "Turn this into a study plan"}
                </h2>
                <p className="text-sm text-muted">
                  {report.hasActivePlan
                    ? "Your plan adapts to these results the next time it updates."
                    : "Your plan puts your gaps first, covers the rest of the syllabus and fits the time you have each day."}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={report.planHref} size="lg" iconStart={<CalendarDays aria-hidden="true" />}>
                  {report.hasActivePlan ? "Open my study plan" : "Create my study plan"}
                </ButtonLink>
                <ButtonLink href="/app" variant="outline" size="lg" iconStart={<LayoutDashboard aria-hidden="true" />}>
                  Go to dashboard
                </ButtonLink>
              </div>
              {notStarted.length > 0 && (
                <p className="text-sm text-muted">
                  Still without a diagnostic: {notStarted.map((d) => d.name).join(", ")}.{" "}
                  <Link href="/app/diagnostic" className="font-semibold text-primary underline-offset-4 hover:underline">
                    Take the next one
                  </Link>
                </p>
              )}
            </CardBody>
          </Card>
        </>
      )}

      {report.review.length > 0 && (
        <section aria-labelledby="review-heading" className="space-y-3">
          <div className="space-y-1">
            <h2 id="review-heading" className="text-lg font-semibold text-text">
              Review your answers
            </h2>
            <p className="text-sm text-muted">Open a question to see your answer, the correct answer and the explanation.</p>
          </div>
          <ReviewList
            items={report.review}
            headingLevel={3}
            selfAssess={{ attemptId: report.attemptId, action: selfAssessExamAnswerAction }}
            report={{ attemptId: report.attemptId, action: reportProblemAction }}
            askTutor={askTutor}
          />
        </section>
      )}
    </Container>
  );
}
