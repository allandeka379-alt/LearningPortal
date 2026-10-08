import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDuration } from "@/lib/format";
import { lessonHref, lessonKindLabel, lessonStateLabel } from "./labels";
import { LessonStateIcon } from "./LessonStateIcon";

export interface LessonListItem {
  id: string;
  title: string;
  summary: string | null;
  kind: string;
  estimatedMinutes: number;
  locked: boolean;
  state: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  isDemo: boolean;
}

export interface LessonListProps {
  lessons: readonly LessonListItem[];
  /** Topic the lessons are opened in (keeps previous / next inside this topic). */
  topicId: string;
  /** Heading level of each lesson title in the page outline. */
  titleAs?: "h3" | "h4";
}

/**
 * A topic's lessons in order (§8): number or state marker, title, summary, reading time, kind and state in words, and
 * a lock for lessons the plan does not cover (they open to an upgrade prompt, never to the content). The whole row
 * is the link target (stretched link), the title is the link text. Server component.
 */
export function LessonList({ lessons, topicId, titleAs: Title = "h3" }: LessonListProps) {
  return (
    <ol className="divide-y divide-border">
      {lessons.map((lesson, index) => (
        <li key={lesson.id} className="relative flex items-start gap-3 py-4 first:pt-1 last:pb-1 focus-within:rounded-control">
          <LessonStateIcon state={lesson.state} locked={lesson.locked} position={index + 1} className="mt-0.5" />
          <div className="min-w-0 flex-1">
            <Title className="text-base leading-snug font-semibold text-text">
              <Link
                href={lessonHref(lesson.id, { topicId })}
                className="rounded-control underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline focus-visible:outline-none focus-visible:after:rounded-control focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-focus"
              >
                {lesson.title}
              </Link>
            </Title>
            {lesson.summary && <p className="mt-1 line-clamp-2 text-sm text-muted">{lesson.summary}</p>}
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
              <span>{formatDuration(lesson.estimatedMinutes)}</span>
              {lesson.kind !== "LESSON" && <span>{lessonKindLabel(lesson.kind)}</span>}
              {lesson.locked ? (
                <Badge tone="accent" size="sm">
                  Full course
                </Badge>
              ) : (
                lesson.state !== "NOT_STARTED" && <span aria-hidden="true">{lessonStateLabel(lesson.state)}</span>
              )}
              {lesson.isDemo && (
                <Badge tone="neutral" size="sm">
                  Demo
                </Badge>
              )}
            </p>
          </div>
          <ChevronRight aria-hidden="true" className="mt-1.5 size-4 shrink-0 text-muted" />
        </li>
      ))}
    </ol>
  );
}
