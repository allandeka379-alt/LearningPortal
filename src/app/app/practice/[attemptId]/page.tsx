import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnswerRunner } from "@/components/questions/AnswerRunner";
import { Alert } from "@/components/ui/Alert";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount } from "@/lib/format";
import { requireOnboardedStudent } from "@/server/auth/guards";
import { isFeatureEnabled } from "@/server/features";
import { UPGRADE_PATH } from "@/server/billing/entitlements";
import { isAppError } from "@/server/lib/errors";
import { getSessionState, type SessionState } from "@/server/practice";
import { EndSessionForm } from "../_components/EndSessionForm";
import { reportProblemAction } from "../../_actions/report-problem";
import { answerQuestionAction, endPracticeSessionAction, revealHintAction, selfAssessAction } from "../actions";

export const metadata: Metadata = { title: "Practice session" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function loadSession(attemptId: string): Promise<SessionState> {
  if (!UUID.test(attemptId)) notFound();
  const actor = await requireOnboardedStudent({ next: `/app/practice/${attemptId}` });
  try {
    return await getSessionState(actor, attemptId);
  } catch (error) {
    if (isAppError(error) && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}

/**
 * A practice session, one question at a time (§10): "Question 3 of 20", answer → instant feedback → next. The page
 * always shows the first unanswered question, so reloading or coming back later resumes the session.
 */
export default async function PracticeSessionPage({
  params,
  searchParams,
}: {
  params: Promise<{ attemptId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { attemptId } = await params;
  const { requested } = await searchParams;
  const session = await loadSession(attemptId);
  // "Ask the tutor" only while AI is switched on (`features.ai`, owner decision 2026-10-07).
  const askTutor = await isFeatureEnabled("ai");

  if (session.mode === "DAILY_QUESTION") redirect("/app/daily");
  if (!session.immediateFeedback) redirect(`/app/exams/attempt/${attemptId}`);
  if (!session.isOpen || !session.current) redirect(`/app/practice/${attemptId}/summary`);

  const current = session.current;
  const requestedCount = Number(typeof requested === "string" ? requested : NaN);
  const shortfall = Number.isInteger(requestedCount) && requestedCount > session.questionCount && session.markedCount === 0;

  return (
    <Container size="reading" className="pb-12">
      <PageHeader
        eyebrow={session.subject.name}
        title={session.mode === "RETEST" ? "Re-test" : "Practice session"}
        breadcrumbs={[{ label: "Practice", href: "/app/practice" }, { label: "Session" }]}
        className="pb-4"
      />

      <div className="space-y-6">
        <ProgressBar
          label="Session progress"
          value={session.markedCount}
          max={session.questionCount}
          valueText={`${session.markedCount} of ${session.questionCount} answered`}
          size="sm"
        />

        {shortfall && (
          <Alert tone="info">
            Only {formatCount(session.questionCount, "question")} matched your choices, so this session is shorter than the{" "}
            {requestedCount} you asked for.
          </Alert>
        )}

        {current.question ? (
          <AnswerRunner
            key={`${session.attemptId}:${current.position}`}
            attemptId={session.attemptId}
            position={current.position}
            question={current.question}
            heading={`Question ${current.position} of ${session.questionCount}`}
            initialResponse={current.response}
            initialHints={current.hints}
            answerAction={answerQuestionAction}
            hintAction={revealHintAction}
            selfAssessAction={selfAssessAction}
            reportAction={reportProblemAction}
            askTutor={askTutor}
            completion={{ href: `/app/practice/${session.attemptId}/summary`, label: "See your results" }}
            upgradeHref={UPGRADE_PATH}
          />
        ) : (
          <Alert tone="warning" title="This question is no longer available">
            It was withdrawn after your session started. End the session to see your results for the questions you
            answered.
          </Alert>
        )}

        <div className="border-t border-border pt-6">
          <EndSessionForm attemptId={session.attemptId} action={endPracticeSessionAction} answered={session.markedCount} />
        </div>
      </div>
    </Container>
  );
}
