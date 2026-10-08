import { Bot } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDateTime } from "@/components/admin/format";
import { Container } from "@/components/layout/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { QuestionView } from "@/components/questions/QuestionView";
import { MARKING_STATUS_LABELS, percentText } from "@/components/teacher/labels";
import { MarkAnswerForm } from "@/components/teacher/MarkAnswerForm";
import { MarkSchemePanel } from "@/components/teacher/MarkSchemePanel";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { requireRole } from "@/server/auth/guards";
import { isUuid } from "@/server/teaching/access";
import { getAttemptForMarking } from "@/server/teaching/marking";
import { orNotFound } from "../../_lib/page";
import { markAnswerAction } from "../actions";

export const metadata: Metadata = { title: "Mark answers" };

const SOURCE_LABELS: Record<string, string> = { AI: "AI marker", TEACHER: "Teacher", REVIEWER: "Content reviewer", SELF: "Student", AUTO: "System" };

/**
 * Marking one student's handed-in work (§22): each answer with the question, the student's answer (read-only), the
 * mark scheme / model answer and the AI's suggestion when there is one. Answers that wait for a person come first.
 */
export default async function MarkAttemptPage({ params }: { params: Promise<{ attemptId: string }> }) {
  const { attemptId } = await params;
  if (!isUuid(attemptId)) notFound();
  const actor = await requireRole("TEACHER", { next: `/teacher/review/${attemptId}` });
  const view = await orNotFound(getAttemptForMarking(actor, attemptId));
  const answers = [...view.answers].sort((a, b) => Number(b.needsMarking) - Number(a.needsMarking) || a.position - b.position);
  const closed = view.attempt.status !== "IN_PROGRESS";

  return (
    <Container className="space-y-6 pb-10">
      <PageHeader
        breadcrumbs={[
          { label: "Marking", href: "/teacher/review" },
          { label: view.class.name, href: `/teacher/classes/${view.class.id}` },
          { label: view.student.name },
        ]}
        eyebrow={`${view.class.name} · ${view.assignment.title}`}
        title={view.student.name}
        description={view.attempt.submittedAt ? `Handed in ${formatDateTime(view.attempt.submittedAt, actor.timeZone)}.` : "Not handed in yet."}
        className="pb-0"
      />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatTile label="Score" value={view.attempt.percentage === null ? null : percentText(view.attempt.percentage)} hint={view.attempt.pendingReviewCount > 0 ? "Provisional" : "Final"} />
        <StatTile label="Marks" value={view.attempt.totalMarks === null ? null : `${view.attempt.marksAwarded ?? 0}/${view.attempt.totalMarks}`} />
        <StatTile label="Answers to mark" value={view.attempt.pendingReviewCount} />
      </div>
      {!closed && <Alert tone="info">The student is still working on this. You can mark it once it is handed in.</Alert>}

      <ol className="space-y-6">
        {answers.map((answer) => (
          <li key={answer.position}>
            <Card as="article" aria-labelledby={`q-${answer.position}`}>
              <CardHeader
                titleAs="h2"
                title={<span id={`q-${answer.position}`}>Question {answer.position}</span>}
                description={`${answer.marksAwarded ?? "–"}/${answer.marksAvailable} marks`}
                action={<Badge tone={answer.needsMarking ? "accent" : "neutral"}>{MARKING_STATUS_LABELS[answer.markingStatus]}</Badge>}
              />
              <CardBody className="space-y-5">
                {answer.question ? (
                  <QuestionView question={answer.question} mode="review" response={answer.response} disabled heading="Question and the student's answer" headingLevel={3} />
                ) : (
                  <p className="text-sm text-muted">This question is no longer available to display.</p>
                )}
                {!answer.answered && <p className="text-sm font-medium text-muted">The student did not answer this question.</p>}
                {answer.reveal && (
                  <details className="rounded-card border border-border bg-subtle p-4" open={answer.needsMarking}>
                    <summary className="cursor-pointer font-semibold text-text">Mark scheme and answer</summary>
                    <div className="mt-3">
                      <MarkSchemePanel reveal={answer.reveal} />
                    </div>
                  </details>
                )}
                {answer.aiSuggestion && (
                  <div className="rounded-card border border-info/30 bg-info-soft p-4 text-sm">
                    <p className="flex items-center gap-2 font-semibold text-info-text">
                      <Bot aria-hidden="true" className="size-4" />
                      AI suggestion: {answer.aiSuggestion.marksAwarded}/{answer.marksAvailable} marks
                      {answer.aiSuggestion.confidence !== null && ` (confidence ${Math.round(answer.aiSuggestion.confidence * 100)}%)`}
                    </p>
                    {answer.aiSuggestion.comment && <p className="mt-1 text-text">{answer.aiSuggestion.comment}</p>}
                    {answer.aiSuggestion.points.length > 0 && (
                      <ul className="mt-2 list-disc pl-5 text-text">
                        {answer.aiSuggestion.points.map((point) => (
                          <li key={point.pointId}>
                            {point.pointId}: {point.awarded} {point.awarded === 1 ? "mark" : "marks"}
                            {point.evidence ? ` — “${point.evidence}”` : ""}
                          </li>
                        ))}
                      </ul>
                    )}
                    <p className="mt-2 text-xs text-muted">A suggestion only. Your mark is the one that counts.</p>
                  </div>
                )}
                {answer.history.length > 0 && (
                  <details className="text-sm">
                    <summary className="cursor-pointer text-muted">Marking history</summary>
                    <ul className="mt-2 space-y-1">
                      {answer.history.map((entry, index) => (
                        <li key={index}>
                          {formatDateTime(entry.createdAt, actor.timeZone)} · {SOURCE_LABELS[entry.source] ?? entry.source}
                          {entry.by ? ` (${entry.by})` : ""}: {entry.previousMarksAwarded ?? "–"} → {entry.marksAwarded}
                          {entry.reason ? ` — ${entry.reason}` : ""}
                        </li>
                      ))}
                    </ul>
                  </details>
                )}
                {closed && answer.answered && (
                  <MarkAnswerForm
                    attemptId={view.attempt.id}
                    position={answer.position}
                    marksAvailable={answer.marksAvailable}
                    suggestedMarks={answer.needsMarking ? (answer.aiSuggestion?.marksAwarded ?? null) : answer.marksAwarded}
                    isFinal={answer.isFinal}
                    currentComment={answer.comment}
                    action={markAnswerAction}
                  />
                )}
              </CardBody>
            </Card>
          </li>
        ))}
      </ol>
    </Container>
  );
}
