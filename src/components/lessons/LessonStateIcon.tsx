import { CircleCheck, CircleDot, Lock } from "lucide-react";
import { cn } from "@/lib/cn";
import { lessonStateLabel } from "./labels";

export interface LessonStateIconProps {
  state: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  locked: boolean;
  /** 1-based position, shown for lessons not started. */
  position: number;
  className?: string;
}

/**
 * The marker before a lesson in a list: its number, a half-filled dot while in progress, a tick when completed, or a
 * lock when the plan does not cover it. Every state has screen-reader text (never colour or shape alone, §43).
 */
export function LessonStateIcon({ state, locked, position, className }: LessonStateIconProps) {
  const base = "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold tabular-nums [&_svg]:size-4.5";
  if (locked) {
    return (
      <span className={cn(base, "border border-border bg-subtle text-muted", className)}>
        <Lock aria-hidden="true" />
        <span className="sr-only">Locked</span>
      </span>
    );
  }
  if (state === "COMPLETED") {
    return (
      <span className={cn(base, "bg-success-soft text-success-text", className)}>
        <CircleCheck aria-hidden="true" />
        <span className="sr-only">{lessonStateLabel(state)}</span>
      </span>
    );
  }
  if (state === "IN_PROGRESS") {
    return (
      <span className={cn(base, "bg-primary-soft text-on-primary-soft", className)}>
        <CircleDot aria-hidden="true" />
        <span className="sr-only">{lessonStateLabel(state)}</span>
      </span>
    );
  }
  return (
    <span className={cn(base, "border border-border-strong text-muted", className)}>
      <span aria-hidden="true">{position}</span>
      <span className="sr-only">{lessonStateLabel(state)}</span>
    </span>
  );
}
