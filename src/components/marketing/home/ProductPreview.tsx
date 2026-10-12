import { Check, CirclePlay, Clock, Flag } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * Decorative preview of the student experience for the home hero: a course card (topics in syllabus order, the next
 * lesson), a lesson quick check that has just been marked, and a mock-exam timer. Built from tokens so it follows the
 * theme and stays sharp at any size; it is one image to assistive technology (role="img" + label), and its sample
 * topics are generic syllabus headings, not claims.
 */
export function ProductPreview({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Preview: a Mathematics course with its topics in order and the next lesson, a quick-check question marked correct, and a mock exam timer"
      className={cn("relative mx-auto w-full max-w-md select-none lg:max-w-none", className)}
    >
      <div aria-hidden="true" className="relative">
        {/* Course card */}
        <div className="rounded-card border border-border bg-surface p-5 shadow-lg sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold tracking-wide text-primary uppercase">Course · Form 3</p>
              <p className="mt-1 text-lg font-bold tracking-tight text-text">Mathematics</p>
            </div>
            <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold text-on-primary-soft">O-Level</span>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-subtle">
            <div className="h-full w-2/5 rounded-full bg-primary" />
          </div>
          <ol className="mt-5 space-y-2.5 text-sm">
            <TopicRow state="done">Number and sets</TopicRow>
            <TopicRow state="done">Algebraic expressions</TopicRow>
            <TopicRow state="current">Simultaneous equations</TopicRow>
            <TopicRow state="todo">Quadratic equations</TopicRow>
            <TopicRow state="todo" className="hidden sm:flex">
              Graphs of functions
            </TopicRow>
          </ol>
          <div className="mt-5 flex items-center justify-between gap-3 rounded-control bg-primary px-4 py-3 text-on-primary">
            <span className="min-w-0 truncate text-sm font-semibold">Continue: Solving by elimination</span>
            <CirclePlay className="size-5 shrink-0" />
          </div>
        </div>

        {/* Quick check, marked */}
        <div className="relative -mt-6 ml-6 mr-[-0.5rem] rounded-card border border-border bg-surface p-4 shadow-md sm:ml-14 sm:mr-[-1.5rem]">
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">Quick check</p>
          <p className="mt-1.5 text-sm font-medium text-text">Solve: 2x + y = 7 and x − y = 2</p>
          <div className="mt-3 flex items-center gap-2 rounded-control bg-success-soft px-3 py-2 text-sm text-success-text">
            <Check className="size-4 shrink-0" />
            <span className="font-semibold">Correct: x = 3, y = 1</span>
          </div>
        </div>

        {/* Mock exam timer */}
        <div className="absolute -top-4 right-3 flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text shadow-md sm:-right-4">
          <Clock className="size-3.5 text-accent-text" />
          <span>Mock exam · Paper 1</span>
          <span className="text-muted tabular-nums">1:12:40</span>
          <Flag className="size-3.5 text-muted" />
        </div>
      </div>
    </div>
  );
}

function TopicRow({ state, className, children }: { state: "done" | "current" | "todo"; className?: string; children: string }) {
  return (
    <li className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
          state === "done" && "border-primary bg-primary text-on-primary",
          state === "current" && "border-primary bg-primary-soft text-on-primary-soft",
          state === "todo" && "border-border bg-bg text-muted",
        )}
      >
        {state === "done" ? <Check className="size-3.5" /> : state === "current" ? <span className="size-2 rounded-full bg-primary" /> : null}
      </span>
      <span className={cn("min-w-0 truncate", state === "todo" ? "text-muted" : "text-text", state === "current" && "font-semibold")}>{children}</span>
    </li>
  );
}
