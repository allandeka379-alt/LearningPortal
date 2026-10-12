import { ChevronDown, Target } from "lucide-react";
import Link from "next/link";
import { practiceHref } from "@/components/dashboard/links";
import { codedName, lessonHref, lessonKindLabel, lessonStateLabel, topicHref } from "@/components/lessons/labels";
import { LessonStateIcon } from "@/components/lessons/LessonStateIcon";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";
import { formatDuration, formatNumber } from "@/lib/format";
import { lessonsPercent } from "./format";

export interface OutlineLesson {
  id: string;
  title: string;
  kind: string;
  estimatedMinutes: number;
  topicId: string;
  locked: boolean;
  state: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
}

export interface OutlineUnit {
  id: string;
  name: string;
  code: string | null;
  kind: string;
  isOptional: boolean;
  section: { id: string; name: string; code: string | null } | null;
  lessons: readonly OutlineLesson[];
  completed: number;
  total: number;
}

export interface CourseOutlineProps {
  subjectId: string;
  units: readonly OutlineUnit[];
  /** The lesson "Continue" opens: its topic starts expanded and the lesson is marked "Up next". */
  nextLessonId: string | null;
  className?: string;
}

/** "3 of 5 lessons" / "No lessons yet" for a topic summary. */
export function unitProgressText(unit: Pick<OutlineUnit, "completed" | "total">): string {
  if (unit.total === 0) return "No lessons yet";
  if (unit.completed >= unit.total) return `All ${formatNumber(unit.total)} ${unit.total === 1 ? "lesson" : "lessons"} completed`;
  return `${formatNumber(unit.completed)} of ${formatNumber(unit.total)} ${unit.total === 1 ? "lesson" : "lessons"} completed`;
}

/**
 * The course page's syllabus: topics in syllabus order (under their section headings when the board groups them), each
 * an expandable panel (native `<details>`, no client JavaScript) listing its lessons with their completion state, plus
 * the topic page and a practice link. The topic holding the next lesson starts open. Server component.
 */
export function CourseOutline({ subjectId, units, nextLessonId, className }: CourseOutlineProps) {
  const openUnitId = nextLessonId ? (units.find((unit) => unit.lessons.some((lesson) => lesson.id === nextLessonId))?.id ?? null) : null;
  const blocks: { section: OutlineUnit["section"]; units: OutlineUnit[] }[] = [];
  for (const unit of units) {
    const last = blocks.at(-1);
    if (last && (last.section?.id ?? null) === (unit.section?.id ?? null)) last.units.push(unit);
    else blocks.push({ section: unit.section, units: [unit] });
  }

  return (
    <div className={cn("space-y-6", className)}>
      {blocks.map((block, blockIndex) => (
        <div key={`${block.section?.id ?? "none"}-${blockIndex}`} className="space-y-3">
          {block.section && <h3 className="text-sm font-semibold tracking-wide text-muted uppercase">{codedName(block.section.name, block.section.code)}</h3>}
          <ol className="space-y-3">
            {block.units.map((unit) => {
              const done = unit.total > 0 && unit.completed >= unit.total;
              return (
                <li key={unit.id}>
                  <details
                    open={unit.id === openUnitId}
                    className="group rounded-card border border-border bg-surface open:shadow-xs"
                    data-unit-id={unit.id}
                  >
                    <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 rounded-card px-4 py-3 hover:bg-subtle sm:px-5 [&::-webkit-details-marker]:hidden">
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold break-words text-text">{codedName(unit.name, unit.code)}</span>
                        <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
                          <span>{unitProgressText(unit)}</span>
                          {unit.isOptional && (
                            <Badge tone="neutral" size="sm">
                              Optional
                            </Badge>
                          )}
                        </span>
                        {unit.total > 0 && (
                          <span aria-hidden="true" className="mt-2 block h-1.5 overflow-hidden rounded-full bg-subtle group-hover:bg-surface">
                            <span className={cn("block h-full rounded-full", done ? "bg-success" : "bg-primary")} style={{ width: `${lessonsPercent(unit.completed, unit.total)}%` }} />
                          </span>
                        )}
                      </span>
                      <ChevronDown aria-hidden="true" className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>

                    <div className="border-t border-border px-4 pt-2 pb-4 sm:px-5">
                      {unit.lessons.length === 0 ? (
                        <p className="py-2 text-sm text-muted">Lessons for this topic are being added. You can still practise it.</p>
                      ) : (
                        <ol className="divide-y divide-border">
                          {unit.lessons.map((lesson, index) => {
                            const isNext = lesson.id === nextLessonId;
                            return (
                              <li key={lesson.id} className="flex items-center gap-3 py-2.5">
                                <LessonStateIcon state={lesson.state} locked={lesson.locked} position={index + 1} />
                                <div className="min-w-0 flex-1">
                                  <Link
                                    href={lessonHref(lesson.id, { topicId: lesson.topicId })}
                                    className={cn(
                                      "inline-flex min-h-11 items-center rounded-sm font-medium break-words underline-offset-4 hover:underline",
                                      lesson.state === "COMPLETED" ? "text-muted" : "text-text",
                                    )}
                                    aria-describedby={isNext ? `up-next-${lesson.id}` : undefined}
                                  >
                                    {lesson.title}
                                  </Link>
                                  <p className="-mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                                    <span>{formatDuration(lesson.estimatedMinutes)}</span>
                                    {lesson.kind !== "LESSON" && <span>· {lessonKindLabel(lesson.kind)}</span>}
                                    <span className="sr-only">· {lesson.locked ? "Locked" : lessonStateLabel(lesson.state)}</span>
                                  </p>
                                </div>
                                {isNext && (
                                  <Badge id={`up-next-${lesson.id}`} tone="accent" size="sm" className="shrink-0">
                                    Up next
                                  </Badge>
                                )}
                              </li>
                            );
                          })}
                        </ol>
                      )}
                      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-2">
                        <Link
                          href={practiceHref({ subjectId, topicId: unit.id, count: 10 })}
                          className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          <Target aria-hidden="true" className="size-4" />
                          Practise<span className="sr-only"> {unit.name}</span>
                        </Link>
                        <Link
                          href={topicHref(subjectId, unit.id)}
                          className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          Topic overview<span className="sr-only">: {unit.name}</span>
                        </Link>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
