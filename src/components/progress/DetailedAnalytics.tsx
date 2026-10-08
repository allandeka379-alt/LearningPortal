import { UpgradeButton } from "@/components/billing/UpgradeOffer";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChartNoAxesCombined, Lock } from "lucide-react";
import { formatLocalDate } from "@/components/student/format";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatTile } from "@/components/ui/StatTile";
import { formatCount, formatDuration, formatNumber, formatPercent } from "@/lib/format";
import { DETAILED_WEEKS, type DetailedAnalytics as DetailedAnalyticsData, type TopicTrend } from "@/server/progress/detailed-analytics-core";

/**
 * "Detailed analytics" on /app/progress (§6, §11; the `advancedAnalytics` entitlement, §31): weekly trend, per-topic
 * trends, accuracy by difficulty and time per question. Server-rendered HTML (tables, labelled progress bars, text):
 * no chart library and no client JS (§29). Every number is computed from the student's own rows; anything without
 * enough evidence says so (§50).
 */

/** "45 s", "1 min 20 s", or an em dash. */
export function formatSecondsPerQuestion(seconds: number | null): string {
  if (seconds === null || !Number.isFinite(seconds)) return "—";
  const total = Math.max(0, Math.round(seconds));
  if (total < 60) return `${total} s`;
  const minutes = Math.floor(total / 60);
  const rest = total % 60;
  return rest === 0 ? `${minutes} min` : `${minutes} min ${rest} s`;
}

function TrendBadge({ topic }: { topic: TopicTrend }) {
  if (topic.direction === null || topic.change === null) {
    return (
      <Badge size="sm" tone="neutral" appearance="outline">
        Not enough answers yet
      </Badge>
    );
  }
  const points = formatCount(Math.abs(Math.round(topic.change)), "point");
  if (topic.direction === "up") {
    return (
      <Badge size="sm" tone="primary" icon={<ArrowUpRight aria-hidden="true" />}>
        Up {points}
      </Badge>
    );
  }
  if (topic.direction === "down") {
    return (
      <Badge size="sm" tone="accent" icon={<ArrowDownRight aria-hidden="true" />}>
        Down {points}
      </Badge>
    );
  }
  return (
    <Badge size="sm" tone="neutral" icon={<ArrowRight aria-hidden="true" />}>
      Steady
    </Badge>
  );
}

function SectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h3 id={id} className="text-base font-semibold text-text">
      {children}
    </h3>
  );
}

/** The section for a student whose plan includes detailed analytics. */
export function DetailedAnalytics({ data }: { data: DetailedAnalyticsData }) {
  const halfWeeks = Math.floor(data.window.weeks / 2);
  return (
    <Card as="section" aria-labelledby="detailed-analytics-title">
      <CardHeader
        titleAs="h2"
        title={
          <span id="detailed-analytics-title" className="flex items-center gap-2">
            <ChartNoAxesCombined aria-hidden="true" className="size-5 text-primary" />
            Detailed analytics
          </span>
        }
        description={`Your last ${formatNumber(data.window.weeks)} weeks (${formatLocalDate(data.window.from, "short")} to today), from every marked answer.`}
      />
      <CardBody className="space-y-8">
        {!data.hasAnswers ? (
          <EmptyState
            appearance="plain"
            titleAs="p"
            title="No marked answers in the last few weeks"
            description="Topic trends, accuracy by difficulty and time per question appear here once you practise or take a test."
            action={<ButtonLink href="/app/practice">Start practising</ButtonLink>}
          />
        ) : (
          <>
            <section aria-labelledby="da-topics" className="space-y-3">
              <SectionTitle id="da-topics">Topic trends</SectionTitle>
              <p className="text-sm text-muted">
                Your most-practised topics: accuracy in the last {formatCount(halfWeeks, "week")} compared with the {formatCount(halfWeeks, "week")} before.
              </p>
              <ul className="divide-y divide-border">
                {data.topics.map((topic) => (
                  <li key={topic.topicId} className="flex flex-col gap-2 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium break-words text-text">{topic.topicName}</p>
                      <p className="text-sm text-muted">
                        {topic.subjectName ? `${topic.subjectName} · ` : ""}
                        {formatCount(topic.answered, "answer")} · {formatPercent(topic.accuracyPercent)} correct
                      </p>
                      <p className="text-sm text-muted">
                        Recent: {topic.recent.answered > 0 ? `${formatPercent(topic.recent.accuracyPercent)} of ${formatCount(topic.recent.answered, "answer")}` : "no answers"}
                        {" · "}
                        Before: {topic.earlier.answered > 0 ? `${formatPercent(topic.earlier.accuracyPercent)} of ${formatCount(topic.earlier.answered, "answer")}` : "no answers"}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <TrendBadge topic={topic} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="da-difficulty" className="space-y-3">
              <SectionTitle id="da-difficulty">Accuracy by difficulty</SectionTitle>
              <ul className="space-y-4">
                {data.difficulty.map((row) => (
                  <li key={row.difficulty}>
                    <ProgressBar
                      label={`${row.label} · ${formatCount(row.answered, "answer")}`}
                      value={row.accuracyPercent}
                      valueText={row.accuracyPercent === null ? undefined : `${formatPercent(row.accuracyPercent)} correct`}
                    />
                    {row.secondsPerQuestion !== null && (
                      <p className="mt-1 text-xs text-muted">About {formatSecondsPerQuestion(row.secondsPerQuestion)} per question</p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="da-time" className="space-y-3">
              <SectionTitle id="da-time">Time per question</SectionTitle>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <StatTile
                  label="Average time per question"
                  value={data.time.secondsPerQuestion === null ? null : formatSecondsPerQuestion(data.time.secondsPerQuestion)}
                  emptyLabel="Not measured yet"
                  hint={data.time.timedAnswers > 0 ? `From ${formatCount(data.time.timedAnswers, "timed answer")}` : "Time is measured while a question is on screen"}
                />
              </div>
              {data.time.bySubject.length > 1 && (
                <ul className="space-y-1 text-sm">
                  {data.time.bySubject.map((row) => (
                    <li key={row.subjectId} className="flex justify-between gap-3">
                      <span className="min-w-0 text-text">{row.subjectName || "Subject"}</span>
                      <span className="shrink-0 text-muted tabular-nums">{formatSecondsPerQuestion(row.secondsPerQuestion)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}

        <section aria-labelledby="da-weeks" className="space-y-3">
          <SectionTitle id="da-weeks">Week by week</SectionTitle>
          <div className="relative overflow-x-auto">
            <table className="w-full min-w-[18rem] text-left text-sm">
              <caption className="sr-only">Study time, questions answered and accuracy per week, oldest first</caption>
              <thead className="text-xs text-muted">
                <tr>
                  <th scope="col" className="py-1 pr-3 font-medium">
                    Week
                  </th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">
                    Study
                  </th>
                  <th scope="col" className="py-1 pr-3 text-right font-medium">
                    Questions
                  </th>
                  <th scope="col" className="py-1 text-right font-medium">
                    Accuracy
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {data.weeks.map((week) => (
                  <tr key={week.index}>
                    <th scope="row" className="py-2 pr-3 font-normal whitespace-nowrap text-text">
                      {week.index === 0 ? "Last 7 days" : `${formatLocalDate(week.from, "short")} – ${formatLocalDate(week.to, "short")}`}
                    </th>
                    <td className="py-2 pr-3 text-right tabular-nums">{formatDuration(week.studyMinutes)}</td>
                    <td className="py-2 pr-3 text-right tabular-nums">{formatNumber(week.questionsAnswered)}</td>
                    <td className="py-2 text-right tabular-nums">{formatPercent(week.accuracyPercent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </CardBody>
    </Card>
  );
}

/** What a student without the entitlement sees: what the section offers, and where plans are (no data is loaded). */
export function DetailedAnalyticsLocked() {
  return (
    <Card as="section" aria-labelledby="detailed-analytics-title" variant="sunken">
      <CardHeader
        titleAs="h2"
        title={
          <span id="detailed-analytics-title" className="flex items-center gap-2">
            <Lock aria-hidden="true" className="size-5 text-primary" />
            Detailed analytics
          </span>
        }
        description={`Topic-by-topic trends over the last ${formatNumber(DETAILED_WEEKS)} weeks, accuracy by difficulty and time per question come with full access.`}
      />
      <CardBody>
        <UpgradeButton variant="outline" />
      </CardBody>
    </Card>
  );
}
