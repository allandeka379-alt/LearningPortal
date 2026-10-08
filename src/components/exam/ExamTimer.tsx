"use client";

import { Hourglass, Timer } from "lucide-react";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { remainingText, type ExamClockStore } from "./exam-clock";
import { formatClock } from "./exam-model";

export interface ExamTimerProps {
  store: ExamClockStore;
  /** Paper titles, so a paper's countdown is named ("Paper 2 time left"). */
  sectionTitles?: Readonly<Record<number, string>>;
  /** The exam has separately timed papers: with none running, say so instead of "No time limit". */
  hasPaperTimers?: boolean;
  className?: string;
}

/**
 * Time remaining (§13), counted down on this device towards the SERVER deadline. The first render (server and
 * hydration) shows the server's own remaining time. Colour is reinforcement only: the text always says how much time
 * is left, an icon marks the last five minutes, and the 10 / 5 / 1-minute warnings and "Time is up" are announced in a
 * polite live region once each (never every second).
 */
export function ExamTimer({ store, sectionTitles = {}, hasPaperTimers = false, className }: ExamTimerProps) {
  const tick = useSyncExternalStore(store.subscribe, store.getTick, store.getServerTick);
  const remaining = tick.remainingSeconds;
  const scopeLabel =
    tick.active?.scope === "SECTION" ? `${sectionTitles[tick.active.sectionNumber] ?? "Paper"}: time left` : "Time left";

  return (
    <>
      {remaining === null ? (
        <span className={cn("inline-flex min-h-9 items-center rounded-full px-3 text-sm font-medium whitespace-nowrap text-muted", className)}>
          {hasPaperTimers ? "No paper running" : "No time limit"}
        </span>
      ) : (
        <div
          role="timer"
          aria-label={scopeLabel}
          title={scopeLabel}
          data-level={remaining <= 60 ? "critical" : remaining <= 300 ? "low" : "normal"}
          className={cn(
            "inline-flex min-h-9 items-center gap-1.5 rounded-full border px-3 text-sm font-semibold whitespace-nowrap tabular-nums",
            remaining <= 60
              ? "border-danger/40 bg-danger-soft text-danger-text"
              : remaining <= 300
                ? "border-warning/40 bg-warning-soft text-warning-text"
                : "border-border bg-subtle text-text",
            className,
          )}
        >
          {remaining <= 300 ? <Hourglass aria-hidden="true" className="size-4 shrink-0" /> : <Timer aria-hidden="true" className="size-4 shrink-0" />}
          <span aria-hidden="true">{remaining <= 0 ? "Time is up" : formatClock(remaining)}</span>
          <span className="sr-only">{remainingText(remaining)}</span>
        </div>
      )}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {tick.announcement}
      </p>
    </>
  );
}
