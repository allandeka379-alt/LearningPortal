import Link from "next/link";
import type { ReactNode } from "react";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { MasteryBar } from "@/components/ui/MasteryBar";
import { practiceHref } from "./links";

export interface TopicMasteryRow {
  topicId: string;
  name: string;
  subjectId: string;
  subjectName: string;
  score: number;
}

export interface TopicMasteryListProps {
  /** Section heading id (unique per page). */
  id: string;
  title: string;
  description?: string;
  topics: readonly TopicMasteryRow[];
  /** Weak lists get a "Practise" link per topic (§11: more practice where it is weak). */
  variant: "weak" | "strong";
  empty: ReactNode;
  className?: string;
}

/**
 * Weak / strong topics with their mastery bars (§6, §11). Bands are always written out next to the colour
 * (MasteryBar). Topic names link to the topic page; weak topics also offer a targeted practice session.
 * Server component.
 */
export function TopicMasteryList({ id, title, description, topics, variant, empty, className }: TopicMasteryListProps) {
  return (
    <Card as="section" aria-labelledby={id} className={className}>
      <CardHeader titleAs="h2" title={<span id={id}>{title}</span>} description={description} />
      <CardBody>
        {topics.length === 0 ? (
          <div className="text-sm text-muted">{empty}</div>
        ) : (
          <ul className="space-y-4">
            {topics.map((topic) => (
              <li key={topic.topicId}>
                <MasteryBar label={topic.name} score={topic.score} href={`/app/subjects/${topic.subjectId}/topics/${topic.topicId}`} />
                <div className="mt-1 flex items-center justify-between gap-3 text-xs text-muted">
                  <span className="min-w-0 truncate">{topic.subjectName}</span>
                  {variant === "weak" && (
                    <Link
                      href={practiceHref({ subjectId: topic.subjectId, topicId: topic.topicId, count: 10 })}
                      className="-my-3 inline-flex min-h-11 shrink-0 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      Practise<span className="sr-only"> {topic.name}</span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardBody>
    </Card>
  );
}
