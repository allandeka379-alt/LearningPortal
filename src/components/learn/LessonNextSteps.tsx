import { ArrowRight, BookOpen, CircleCheck, ListChecks, Lock, Target } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LESSON_PRACTICE_ANCHOR, lessonHref } from "@/components/lessons/labels";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { cn } from "@/lib/cn";
import { formatCount, formatPercent } from "@/lib/format";
import { lessonsProgressText } from "./format";

export interface LessonNextStepsProps {
  /** The lesson's practice questions ("quick check"); null when the lesson has none. */
  check: { status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED"; questionCount: number; answeredCount?: number; percentage?: number | null } | null;
  /** Practice in the lesson's topic. */
  practise: { href: string; topicName: string };
  /** The lesson after this one in the course (or in the topic when the course context is unknown). */
  next: { id: string; title: string; topicId: string; locked: boolean; unitName?: string; newUnit?: boolean } | null;
  /** Progress over the lessons of the course topic the lesson belongs to. */
  unit: { name: string; completed: number; total: number } | null;
  /** The course page (shown when the course is finished, i.e. there is no next lesson). */
  courseHref: string;
  /** Extra action (e.g. "Ask the tutor" while AI is on). */
  extra?: ReactNode;
  className?: string;
}

function checkText(check: NonNullable<LessonNextStepsProps["check"]>): { title: string; detail: string } {
  const questions = formatCount(check.questionCount, "question");
  if (check.status === "COMPLETED") {
    return { title: "Quick check done", detail: check.percentage == null ? `${questions} answered` : `You scored ${formatPercent(check.percentage)}. Try it again any time.` };
  }
  if (check.status === "IN_PROGRESS") return { title: "Finish the quick check", detail: `${check.answeredCount ?? 0} of ${questions} answered` };
  return { title: "Take the quick check", detail: `${questions} on this lesson, marked instantly` };
}

const STEP =
  "group flex min-h-16 items-center gap-3 rounded-card border border-border bg-surface p-3 transition-colors hover:border-border-strong hover:bg-subtle motion-reduce:transition-none sm:p-4";

function Step({ href, icon, title, detail, emphasis = false }: { href: string; icon: ReactNode; title: ReactNode; detail: ReactNode; emphasis?: boolean }) {
  return (
    <li>
      <Link href={href} className={cn(STEP, emphasis && "border-primary bg-primary-soft hover:bg-primary-soft-hover")}>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full [&_svg]:size-5",
            emphasis ? "bg-primary text-on-primary" : "bg-subtle text-primary group-hover:bg-surface",
          )}
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className={cn("block font-semibold break-words", emphasis ? "text-on-primary-soft" : "text-text")}>{title}</span>
          <span className={cn("mt-0.5 block text-sm", emphasis ? "text-on-primary-soft" : "text-muted")}>{detail}</span>
        </span>
        <ArrowRight aria-hidden="true" className={cn("size-5 shrink-0", emphasis ? "text-on-primary-soft" : "text-muted")} />
      </Link>
    </li>
  );
}

/**
 * End-of-lesson "Next steps" (design brief: lesson -> quick check -> practice -> next lesson): progress through the
 * course topic, then the quick check (the lesson's own questions), practice in the topic, and the next lesson in the
 * course. Server component.
 */
export function LessonNextSteps({ check, practise, next, unit, courseHref, extra, className }: LessonNextStepsProps) {
  const quick = check ? checkText(check) : null;
  return (
    <section aria-labelledby="lesson-next-steps-title" className={cn("space-y-4 print:hidden", className)}>
      <div className="space-y-3">
        <h2 id="lesson-next-steps-title" className="text-lg font-semibold text-text">
          Next steps
        </h2>
        {unit && unit.total > 0 && (
          <ProgressBar
            label={unit.name}
            value={unit.completed}
            max={unit.total}
            valueText={lessonsProgressText(unit.completed, unit.total)}
            tone={unit.completed >= unit.total ? "success" : "primary"}
            size="sm"
          />
        )}
      </div>
      <ol className="space-y-3">
        {quick && check && (
          <Step
            href={`#${LESSON_PRACTICE_ANCHOR}`}
            icon={check.status === "COMPLETED" ? <CircleCheck aria-hidden="true" /> : <ListChecks aria-hidden="true" />}
            title={quick.title}
            detail={quick.detail}
          />
        )}
        <Step href={practise.href} icon={<Target aria-hidden="true" />} title={`Practise ${practise.topicName}`} detail="Questions at your level, with feedback on every answer" />
        {next ? (
          <Step
            href={lessonHref(next.id, { topicId: next.topicId })}
            icon={next.locked ? <Lock aria-hidden="true" /> : <BookOpen aria-hidden="true" />}
            title={
              <>
                <span className="sr-only">Next lesson: </span>
                {next.title}
                {next.locked && <span className="sr-only"> (locked)</span>}
              </>
            }
            detail={next.newUnit && next.unitName ? `Next lesson · starts ${next.unitName}` : "Next lesson"}
            emphasis
          />
        ) : (
          <Step href={courseHref} icon={<CircleCheck aria-hidden="true" />} title="Back to the course" detail="This is the last lesson in the course so far" emphasis />
        )}
      </ol>
      {extra}
    </section>
  );
}
