import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount } from "@/lib/format";
import type { DiagnosticTopicRow } from "@/server/onboarding/report";
import { evidenceText } from "./copy";

export interface DiagnosticTopicResultsProps {
  topics: readonly DiagnosticTopicRow[];
  notCovered: readonly { id: string; name: string }[];
}

/**
 * §52 "performance report" by topic: marks in the diagnostic per top-level topic, how many questions that rests on,
 * and the starting mastery band the diagnostic seeded (written out, never colour alone). Topics the diagnostic did
 * not ask about are listed honestly. Server component.
 */
export function DiagnosticTopicResults({ topics, notCovered }: DiagnosticTopicResultsProps) {
  return (
    <Card as="section" aria-labelledby="diagnostic-topics-heading">
      <CardHeader
        titleAs="h2"
        title={<span id="diagnostic-topics-heading">By topic</span>}
        description="Your marks on each topic, and the mastery level they give you to start with."
      />
      <CardBody>
        {topics.length === 0 ? (
          <p className="text-sm text-muted">No topic results yet.</p>
        ) : (
          <ul className="space-y-5">
            {topics.map((topic) => (
              <li key={topic.topicId} className="space-y-2">
                <ProgressBar
                  label={topic.name}
                  value={topic.percent}
                  valueText={topic.percent === null ? "Being marked" : `${topic.marksAwarded} of ${formatCount(topic.marksAvailable, "mark")}`}
                  size="sm"
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-muted">
                  <span>{evidenceText(topic.questionCount, topic.pendingCount)}</span>
                  {topic.mastery && (
                    <span className="inline-flex items-center gap-1.5">
                      <span>Starting mastery:</span>
                      <MasteryBadge band={topic.mastery.band} size="sm" />
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        {notCovered.length > 0 && (
          <p className="mt-6 border-t border-border pt-4 text-sm text-muted">
            <span className="font-medium text-text">Not in this diagnostic yet:</span> {notCovered.map((t) => t.name).join(", ")}. Practising them
            fills in the rest of your picture.
          </p>
        )}
      </CardBody>
    </Card>
  );
}
