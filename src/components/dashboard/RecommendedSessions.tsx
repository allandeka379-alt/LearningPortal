import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { reasonLabel, recommendationActivity, recommendationSize } from "./links";

export interface RecommendedSession {
  kind: string;
  subjectId: string;
  subjectName: string;
  topicId: string;
  topicName: string | null;
  lessonTitle: string | null;
  questionCount?: number;
  minutes?: number;
  reason: string;
  href: string;
}

export interface RecommendedSessionsProps {
  items: readonly RecommendedSession[];
  /** Heading level that fits the page outline. */
  headingId?: string;
  title?: string;
  emptyDescription?: string;
  className?: string;
}

/**
 * §6 "Recommended study session" cards: subject, topic, activity and size ("20 questions", a lesson title), each a
 * single link into practice, a lesson or a test. Recommendations and their links (adaptive practice,
 * `recommendationHref`) come from the adaptive engine via the progress service. Server component.
 */
export function RecommendedSessions({
  items,
  headingId = "recommended-title",
  title = "Recommended for you",
  emptyDescription = "Recommendations appear as soon as your subjects have topics to study.",
  className,
}: RecommendedSessionsProps) {
  return (
    <section aria-labelledby={headingId} className={className}>
      <h2 id={headingId} className="mb-3 text-lg font-semibold text-text">
        {title}
      </h2>
      {items.length === 0 ? (
        <EmptyState titleAs="h3" icon={<Sparkles aria-hidden="true" />} title="No recommendations yet" description={emptyDescription} />
      ) : (
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const activity = recommendationActivity(item.kind);
            const topic = item.topicName ?? item.subjectName;
            return (
              <li key={`${item.subjectId}:${item.topicId}:${item.kind}`}>
                <Card as="article" interactive className="flex h-full flex-col gap-2 p-4">
                  <p className="text-xs font-semibold tracking-wide text-primary uppercase">{item.subjectName}</p>
                  <h3 className="text-base font-semibold text-text">
                    <Link href={item.href} className="after:absolute after:inset-0 focus-visible:outline-none">
                      {topic}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted">
                    {activity} · {recommendationSize(item)}
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                    <Badge tone="neutral" size="sm">
                      {reasonLabel(item.reason)}
                    </Badge>
                    <ArrowRight aria-hidden="true" className="size-4 text-muted" />
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
