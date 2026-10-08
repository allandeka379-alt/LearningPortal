import { ArrowLeft, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { lessonHref } from "./labels";

export interface PagerLesson {
  id: string;
  title: string;
  locked: boolean;
}

export interface LessonPagerProps {
  previous: PagerLesson | null;
  next: PagerLesson | null;
  topicId: string;
  className?: string;
}

function PagerLink({ lesson, direction, topicId }: { lesson: PagerLesson; direction: "previous" | "next"; topicId: string }) {
  const isNext = direction === "next";
  return (
    <Link
      href={lessonHref(lesson.id, { topicId })}
      rel={isNext ? "next" : "prev"}
      className={cn(
        "group flex min-h-16 flex-col justify-center gap-1 rounded-card border border-border bg-surface px-4 py-3 transition-colors hover:border-border-strong hover:bg-subtle motion-reduce:transition-none",
        isNext ? "items-end text-right sm:col-start-2" : "items-start",
      )}
    >
      <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
        {!isNext && <ArrowLeft aria-hidden="true" className="size-4" />}
        {isNext ? "Next lesson" : "Previous lesson"}
        {isNext && <ArrowRight aria-hidden="true" className="size-4" />}
      </span>
      <span className="inline-flex max-w-full items-center gap-1.5 font-semibold text-text group-hover:underline">
        {lesson.locked && <Lock aria-hidden="true" className="size-4 shrink-0 text-muted" />}
        <span className="min-w-0 break-words">{lesson.title}</span>
        {lesson.locked && <span className="sr-only"> (locked)</span>}
      </span>
    </Link>
  );
}

/** Previous / next lesson within the topic (§8). Stacks on phones; side by side from `sm`. Server component. */
export function LessonPager({ previous, next, topicId, className }: LessonPagerProps) {
  if (!previous && !next) return null;
  return (
    <nav aria-label="Lessons in this topic" className={cn("grid grid-cols-1 gap-3 sm:grid-cols-2 print:hidden", className)}>
      {previous && <PagerLink lesson={previous} direction="previous" topicId={topicId} />}
      {next && <PagerLink lesson={next} direction="next" topicId={topicId} />}
    </nav>
  );
}
