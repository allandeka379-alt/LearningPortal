import { ClipboardCheck } from "lucide-react";
import Link from "next/link";
import { formatInstantDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatPercent } from "@/lib/format";
import { practiceHref } from "./links";

export interface DiagnosticSummaryView {
  subjectId: string;
  subjectName: string;
  attemptId: string;
  completedAt: Date;
  percentage: number | null;
  gradeEstimate: string | null;
  isProvisional: boolean;
  strongTopics: readonly { topicId: string; name: string; percent: number | null }[];
  weakTopics: readonly { topicId: string; name: string; percent: number | null }[];
}

export interface DiagnosticSummaryCardProps {
  summaries: readonly DiagnosticSummaryView[];
  timeZone: string;
  className?: string;
}

function TopicLine({ name, percent }: { name: string; percent: number | null }) {
  return (
    <>
      <span className="min-w-0 break-words">{name}</span>
      {percent !== null && <span className="shrink-0 text-muted tabular-nums">{formatPercent(percent)}</span>}
    </>
  );
}

/**
 * §52 "receive a performance report": the diagnostic result per subject (score, grade estimate, strongest topics and
 * the topics to work on first, each with a practice link). Shown for a couple of weeks after the diagnostic so the
 * first visits feel purposeful; later, live mastery takes over. Server component.
 */
export function DiagnosticSummaryCard({ summaries, timeZone, className }: DiagnosticSummaryCardProps) {
  if (summaries.length === 0) return null;
  return (
    <Card as="section" aria-labelledby="diagnostic-title" className={className}>
      <CardHeader
        titleAs="h2"
        title={
          <span id="diagnostic-title" className="flex items-center gap-2">
            <ClipboardCheck aria-hidden="true" className="size-5 text-primary" />
            Your diagnostic results
          </span>
        }
        description="Where you started. Your study plan and recommendations build on this."
      />
      <CardBody>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {summaries.map((summary) => (
            <li key={summary.attemptId} className="rounded-control border border-border p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-text">{summary.subjectName}</h3>
                <p className="text-sm text-muted">{formatInstantDate(summary.completedAt, timeZone)}</p>
              </div>
              <p className="mt-1 text-2xl font-semibold text-text">
                {summary.percentage === null ? "Not scored" : `You scored ${formatPercent(summary.percentage)}`}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {summary.gradeEstimate && (
                  <Badge tone="primary" size="sm">
                    Estimated grade {summary.gradeEstimate}
                  </Badge>
                )}
                {summary.isProvisional && (
                  <Badge tone="warning" size="sm">
                    Some answers are still being marked
                  </Badge>
                )}
              </div>
              {summary.strongTopics.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-text">Strongest</h4>
                  <ul className="mt-1 space-y-1 text-sm text-text">
                    {summary.strongTopics.map((topic) => (
                      <li key={topic.topicId} className="flex justify-between gap-3">
                        <TopicLine name={topic.name} percent={topic.percent} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {summary.weakTopics.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-text">Work on first</h4>
                  <ul className="mt-1 space-y-1 text-sm">
                    {summary.weakTopics.map((topic) => (
                      <li key={topic.topicId} className="flex items-center justify-between gap-3">
                        <Link
                          href={practiceHref({ subjectId: summary.subjectId, topicId: topic.topicId, count: 10, origin: "RECOMMENDATION" })}
                          className="-my-1 inline-flex min-h-11 min-w-0 items-center gap-3 py-1 font-medium text-primary underline-offset-4 hover:underline"
                        >
                          <span className="min-w-0 break-words">Practise {topic.name}</span>
                        </Link>
                        {topic.percent !== null && <span className="shrink-0 text-muted tabular-nums">{formatPercent(topic.percent)}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href={`/app/diagnostic/${summary.attemptId}/report`}
                className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
              >
                See the full report<span className="sr-only"> for {summary.subjectName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
