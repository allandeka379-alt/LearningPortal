import { ArrowRight, BookOpen, ClipboardCheck, Layers, Target } from "lucide-react";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@/components/ui/Card";
import { recommendationTarget } from "../labels";

export interface StudyRecommendation {
  kind: "LESSON" | "PRACTICE" | "TOPIC_TEST" | "FLASHCARDS";
  topicName: string | null;
  lessonTitle: string | null;
  questionCount: number | null;
  /** Plain-language reason (null when the engine's reason has no student-facing wording). */
  reason: string | null;
  href: string;
}

const ICON = { LESSON: BookOpen, PRACTICE: Target, TOPIC_TEST: ClipboardCheck, FLASHCARDS: Layers } as const;

/**
 * §12 "Recommended study" — "Probability → Lesson 4", "Statistics → Practice test" — each a working link (lesson,
 * practice builder deep link, topic tests). Only recommendations with a destination are listed. Server component.
 */
export function RecommendedStudy({ items }: { items: readonly StudyRecommendation[] }) {
  if (items.length === 0) return null;
  return (
    <Card as="section" aria-labelledby="study-heading">
      <CardHeader titleAs="h2" title={<span id="study-heading">Recommended study</span>} description="Based on the questions you found hardest in this attempt." />
      <CardBody>
        <ul className="divide-y divide-border">
          {items.map((item, index) => {
            const Icon = ICON[item.kind];
            const target = recommendationTarget(item);
            return (
              <li key={`${item.kind}-${item.href}-${index}`} className="relative flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span aria-hidden="true" className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-on-primary-soft">
                  <Icon className="size-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <Link href={item.href} className="font-semibold break-words text-text underline-offset-4 after:absolute after:inset-0 hover:underline">
                    {target.topic}
                    <ArrowRight aria-hidden="true" className="mx-1.5 inline size-4 align-[-0.125em] text-muted" />
                    <span className="sr-only">: </span>
                    {target.action}
                  </Link>
                  {item.reason && <p className="mt-0.5 text-sm text-muted">{item.reason}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      </CardBody>
    </Card>
  );
}
