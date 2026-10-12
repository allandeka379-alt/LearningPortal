import { ArrowRight, BookOpen, Clock, Lock } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatCount } from "@/lib/format";
import type { LessonListItem, LessonPreview } from "@/server/seo/pages";

export interface LessonPreviewListProps {
  previews: readonly LessonPreview[];
  lessons: readonly LessonListItem[];
  /** Every published lesson in the topic (the lists may be shorter). */
  total: number;
  signUpHref: string;
  pricingHref: string;
}

/**
 * Lessons of a topic on its public page (§44). PUBLIC lessons may show a short plain-text excerpt (an open sample)
 * and link to their public guide page; every other lesson shows its TITLE ONLY, locked behind Full access (owner
 * decision 2026-10-12: no free tier, so FREE and PREMIUM lessons both need the one payment). Lesson bodies of locked lessons never reach this component (the
 * loader does not select them). Server component.
 */
export function LessonPreviewList({ previews, lessons, total, signUpHref, pricingHref }: LessonPreviewListProps) {
  const listed = previews.length + lessons.length;
  const more = Math.max(0, total - listed);
  return (
    <div className="space-y-5">
      {previews.length > 0 && (
        <ul role="list" className="grid gap-4 md:grid-cols-2">
          {previews.map((preview) => (
            <li key={preview.id} className="flex flex-col rounded-card border border-border bg-surface p-4 sm:p-5">
              <div className="flex items-center gap-2">
                <Badge tone="primary" size="sm" icon={<BookOpen aria-hidden="true" />}>
                  Open to read
                </Badge>
                <span className="inline-flex items-center gap-1 text-xs text-muted">
                  <Clock aria-hidden="true" className="size-3.5" />
                  {formatCount(preview.estimatedMinutes, "min", "min")}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-text">{preview.title}</h3>
              {preview.excerpt && <p className="mt-1.5 text-sm text-muted">{preview.excerpt}</p>}
              {preview.href && (
                <Link
                  href={preview.href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1.5 pt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Read the guide
                  <span className="sr-only">: {preview.title}</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}

      {lessons.length > 0 && (
        <ul role="list" className="divide-y divide-border overflow-hidden rounded-card border border-border bg-surface">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-5">
              <div className="min-w-0">
                {lesson.href ? (
                  <Link href={lesson.href} className="-my-2.5 inline-flex min-h-11 items-center font-medium text-text underline-offset-4 hover:text-primary hover:underline">
                    {lesson.title}
                  </Link>
                ) : (
                  <p className="font-medium text-text">{lesson.title}</p>
                )}
                <p className="text-xs text-muted">{formatCount(lesson.estimatedMinutes, "min", "min")}</p>
              </div>
              {lesson.lockReason === null ? (
                <Badge tone="primary" size="sm">
                  Free to read
                </Badge>
              ) : (
                <Badge tone="neutral" appearance="outline" size="sm" icon={<Lock aria-hidden="true" />}>
                  Full access
                </Badge>
              )}
            </li>
          ))}
        </ul>
      )}

      {(more > 0 || lessons.some((lesson) => lesson.lockReason !== null)) && (
        <p className="text-sm text-muted">
          {more > 0 && `${formatCount(more, "more lesson", "more lessons")} in this topic. `}
          <Link href={signUpHref} className="font-medium text-primary underline underline-offset-4">
            Join
          </Link>{" "}
          to read every lesson, or{" "}
          <Link href={pricingHref} className="font-medium text-primary underline underline-offset-4">
            see what one payment includes
          </Link>
          .
        </p>
      )}
    </div>
  );
}
