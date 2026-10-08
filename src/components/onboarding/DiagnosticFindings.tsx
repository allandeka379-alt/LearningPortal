import { Target, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { formatPercent } from "@/lib/format";
import { GAP_BELOW_PERCENT, STRENGTH_MIN_PERCENT, type DiagnosticTopicRow } from "@/server/onboarding/report";

function FindingCard({ id, title, icon, topics, empty }: { id: string; title: string; icon: ReactNode; topics: readonly DiagnosticTopicRow[]; empty: string }) {
  return (
    <Card as="section" aria-labelledby={id}>
      <CardHeader
        titleAs="h3"
        title={
          <span id={id} className="inline-flex items-center gap-2">
            {icon}
            {title}
          </span>
        }
      />
      <CardBody className="pt-3">
        {topics.length === 0 ? (
          <p className="text-sm text-muted">{empty}</p>
        ) : (
          <ul className="divide-y divide-border">
            {topics.map((topic) => (
              <li key={topic.topicId} className="flex items-baseline justify-between gap-3 py-2.5 text-sm">
                <span className="min-w-0 font-medium break-words text-text">{topic.name}</span>
                <span className="shrink-0 text-muted tabular-nums">{formatPercent(topic.percent)}</span>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}

/**
 * §52 strengths and gaps from the diagnostic: topics at {@link STRENGTH_MIN_PERCENT}% or more, and topics below
 * {@link GAP_BELOW_PERCENT}%. Short tests are a first read, and the copy says so. Server component.
 */
export function DiagnosticFindings({ strengths, gaps }: { strengths: readonly DiagnosticTopicRow[]; gaps: readonly DiagnosticTopicRow[] }) {
  return (
    <section aria-labelledby="diagnostic-findings-heading" className="space-y-3">
      <div className="space-y-1">
        <h2 id="diagnostic-findings-heading" className="text-lg font-semibold text-text">
          Strengths and gaps
        </h2>
        <p className="text-sm text-muted">A first read from a short test. Practice will confirm or change it.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FindingCard
          id="diagnostic-strengths-heading"
          title="Strengths"
          icon={<TrendingUp aria-hidden="true" className="size-5 text-primary" />}
          topics={strengths}
          empty={`No clear strengths yet: no topic reached ${STRENGTH_MIN_PERCENT}% in this diagnostic.`}
        />
        <FindingCard
          id="diagnostic-gaps-heading"
          title="Gaps to work on"
          icon={<Target aria-hidden="true" className="size-5 text-accent-text" />}
          topics={gaps}
          empty={`No gaps found: every topic you were asked about scored ${GAP_BELOW_PERCENT}% or more.`}
        />
      </div>
    </section>
  );
}
