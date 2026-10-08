import { ChevronDown, TrendingDown, TrendingUp } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { MasteryBadge } from "@/components/ui/MasteryBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { formatCount } from "@/lib/format";
import type { TopicResultView } from "@/server/attempts";

function TopicRows({ topics }: { topics: readonly TopicResultView[] }) {
  return (
    <ul className="space-y-4">
      {topics.map((topic) => (
        <li key={topic.topicId} className="space-y-1.5">
          <ProgressBar
            label={topic.topicName ?? "Topic"}
            value={topic.percent}
            valueText={`${topic.marksAwarded} of ${formatCount(topic.marksAvailable, "mark")}`}
            size="sm"
          />
          {topic.band && <MasteryBadge band={topic.band} size="sm" />}
        </li>
      ))}
    </ul>
  );
}

function AreaCard({ id, title, icon, topics, empty }: { id: string; title: string; icon: ReactNode; topics: readonly TopicResultView[]; empty: string }) {
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
      <CardBody>{topics.length > 0 ? <TopicRows topics={topics} /> : <p className="text-sm text-muted">{empty}</p>}</CardBody>
    </Card>
  );
}

/**
 * §12 "Strong areas / Weak areas" and the per-topic breakdown. A topic is only called strong or weak when the attempt
 * had enough questions on it (the analysis decides); otherwise the lists say so instead of guessing. Bands are
 * always written out (never colour alone). Server component.
 */
export function TopicAreas({ strong, weak, all }: { strong: readonly TopicResultView[]; weak: readonly TopicResultView[]; all: readonly TopicResultView[] }) {
  if (all.length === 0) return null;
  const notEnough = "This attempt didn't have enough questions on any one topic to say.";
  return (
    <section aria-labelledby="areas-heading" className="space-y-4">
      <h2 id="areas-heading" className="text-lg font-semibold text-text">
        Strong and weak areas
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        <AreaCard id="strong-areas" title="Strong areas" icon={<TrendingUp aria-hidden="true" className="size-4 text-primary" />} topics={strong} empty={notEnough} />
        <AreaCard id="weak-areas" title="Areas to work on" icon={<TrendingDown aria-hidden="true" className="size-4 text-accent-text" />} topics={weak} empty={notEnough} />
      </div>
      <details className="group/topics rounded-card border border-border bg-surface">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 font-semibold text-text [&::-webkit-details-marker]:hidden">
          Every topic in this attempt ({all.length})
          <ChevronDown aria-hidden="true" className="size-4 shrink-0 text-muted transition-transform motion-reduce:transition-none group-open/topics:rotate-180" />
        </summary>
        <div className="border-t border-border p-4">
          <TopicRows topics={all} />
        </div>
      </details>
    </section>
  );
}
