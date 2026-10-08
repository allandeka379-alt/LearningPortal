import { Award, Clock } from "lucide-react";
import type { ReactNode } from "react";
import { Alert } from "@/components/ui/Alert";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody } from "@/components/ui/Card";
import { StatTile } from "@/components/ui/StatTile";
import { formatPercent } from "@/lib/format";
import type { ExamResults } from "@/server/exams/service";
import { marksLine, scoreHeadline, submitReasonNote } from "../labels";

export interface ScoreSummaryProps {
  results: Pick<ExamResults, "score" | "nothingAnswered" | "pendingMarks" | "grade" | "nextGrade" | "submitReason" | "lateSync">;
  /**
   * Result actions next to the headline. The "Share result" button (§46 ShareableResult) arrives in a later phase:
   * pass it here (see `ShareResultSlot`); nothing is rendered until then.
   */
  actions?: ReactNode;
}

/**
 * §12 results headline: "You scored 68%.", marks, percentage, answered and correct counts, the grade ESTIMATE with its
 * scheme's disclaimer (never an official grade), and honest notices for answers still being marked, time-up
 * submission and late syncs. Server component.
 */
export function ScoreSummary({ results, actions }: ScoreSummaryProps) {
  const { score, grade } = results;
  const reason = submitReasonNote(results.submitReason);
  return (
    <section aria-labelledby="score-heading" className="space-y-4">
      <Card>
        <CardBody className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <h2 id="score-heading" className="text-2xl font-bold tracking-tight text-text sm:text-3xl">
                {scoreHeadline(score, results.nothingAnswered)}
              </h2>
              {score && !results.nothingAnswered && <p className="text-base text-muted">{marksLine(score.marksAwarded, score.totalMarks, results.pendingMarks)}</p>}
            </div>
            {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
          </div>

          {grade && !results.nothingAnswered && (
            <div className="rounded-control border border-border bg-subtle p-4">
              <p className="flex flex-wrap items-center gap-2 text-base font-semibold text-text">
                <Award aria-hidden="true" className="size-5 text-primary" />
                Estimated grade: {grade.grade}
                <Badge tone="neutral" size="sm">
                  Estimate
                </Badge>
                {score?.isProvisional && (
                  <Badge tone="warning" size="sm">
                    Provisional
                  </Badge>
                )}
              </p>
              <p className="mt-1 text-sm text-muted">
                This estimate comes from this attempt only. It is not an official grade and does not use official exam board grade
                thresholds.
                {grade.disclaimer ? ` ${grade.disclaimer}` : ""}
                {grade.schemeName ? ` Scheme: ${grade.schemeName}.` : ""}
              </p>
              {results.nextGrade && (
                <p className="mt-2 text-sm text-text">
                  {results.nextGrade.marks} more {results.nextGrade.marks === 1 ? "mark" : "marks"} would have reached {results.nextGrade.grade} (estimate).
                </p>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {score && !results.nothingAnswered && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="Percentage" value={score.percentage === null ? null : formatPercent(score.percentage)} emptyLabel="Not marked yet" />
          <StatTile label="Marks" value={`${score.marksAwarded} / ${score.totalMarks}`} />
          <StatTile label="Answered" value={`${score.answeredCount} / ${score.questionCount}`} />
          <StatTile label="Correct" value={`${score.correctCount} / ${score.answeredCount}`} />
        </div>
      )}

      {score?.isProvisional && (
        <Alert tone="info" icon={<Clock aria-hidden="true" />} title="Some answers are still being marked">
          {results.pendingMarks > 0
            ? `Written answers worth ${results.pendingMarks} ${results.pendingMarks === 1 ? "mark are" : "marks are"} waiting for marking, so they are not in your score yet.`
            : "Some marks are provisional until a reviewer checks them."}{" "}
          Your score and grade estimate will update when marking is finished.
        </Alert>
      )}
      {reason && <Alert tone="neutral">{reason}</Alert>}
      {results.lateSync && (
        <Alert tone="neutral">Some answers reached us after the time limit. They were made before time ran out, so they were accepted.</Alert>
      )}
    </section>
  );
}
