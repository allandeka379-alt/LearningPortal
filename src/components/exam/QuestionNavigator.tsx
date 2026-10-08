"use client";

import { CircleCheck, Flag, Lock } from "lucide-react";
import { useId } from "react";
import { cn } from "@/lib/cn";

export interface NavigatorItem {
  position: number;
  answered: boolean;
  flagged: boolean;
  /** Its paper has not started, or is finished / out of time. */
  locked: boolean;
}

export interface NavigatorGroup {
  key: string;
  /** Paper title; null for a single unnamed group. */
  title: string | null;
  /** "Not started", "In progress", "Finished", "Time is up" ("" for untimed). */
  statusLabel: string;
  items: NavigatorItem[];
}

export interface QuestionNavigatorProps {
  groups: readonly NavigatorGroup[];
  current: number;
  onJump: (position: number) => void;
  /** Heading level of the paper titles (the navigator's own heading is the caller's). */
  headingLevel?: 2 | 3;
  className?: string;
  /** id of the current question's button, so the caller can move focus to it (keyboard shortcut Q). */
  currentButtonId?: string;
}

/** Accessible name of a question button: "Question 3, answered, flagged for review, current question". */
export function navigatorItemLabel(item: NavigatorItem, current: boolean): string {
  const parts = [`Question ${item.position}`, item.answered ? "answered" : "not answered"];
  if (item.flagged) parts.push("flagged for review");
  if (item.locked) parts.push("locked");
  if (current) parts.push("current question");
  return parts.join(", ");
}

/**
 * Question navigator grid (§13 "navigation", "flag question", "review unanswered questions"). Every state is carried
 * by text and an icon, never by colour alone: answered questions show a tick and a filled tile, flagged ones a flag,
 * locked papers a padlock, the current question a heavy outline and `aria-current`. Each button's accessible name
 * spells the state out. A legend explains the icons. Buttons are at least 44px (touch targets).
 */
export function QuestionNavigator({ groups, current, onJump, headingLevel = 3, className, currentButtonId }: QuestionNavigatorProps) {
  const legendId = useId();
  const Heading = `h${headingLevel}` as "h2" | "h3";
  const titled = groups.length > 1 || groups.some((group) => group.title !== null);

  return (
    <div className={cn("space-y-5", className)}>
      {groups.map((group) => (
        <section key={group.key} aria-label={titled ? undefined : "Questions"} aria-labelledby={titled ? `${legendId}-${group.key}` : undefined}>
          {titled && (
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
              <Heading id={`${legendId}-${group.key}`} className="text-sm font-semibold text-text">
                {group.title ?? "Questions"}
              </Heading>
              {group.statusLabel && <span className="text-xs font-medium text-muted">{group.statusLabel}</span>}
            </div>
          )}
          <ol className="grid grid-cols-[repeat(auto-fill,minmax(2.75rem,1fr))] gap-2" aria-describedby={legendId}>
            {group.items.map((item) => {
              const isCurrent = item.position === current;
              return (
                <li key={item.position}>
                  <button
                    type="button"
                    id={isCurrent ? currentButtonId : undefined}
                    onClick={() => onJump(item.position)}
                    aria-label={navigatorItemLabel(item, isCurrent)}
                    aria-current={isCurrent ? "step" : undefined}
                    data-state={item.answered ? "answered" : "unanswered"}
                    data-flagged={item.flagged || undefined}
                    className={cn(
                      "relative flex size-11 w-full items-center justify-center rounded-control border text-sm font-semibold tabular-nums transition-colors",
                      item.answered
                        ? "border-primary/50 bg-primary-soft text-on-primary-soft hover:bg-primary-soft-hover"
                        : "border-border-strong bg-surface text-text hover:bg-subtle",
                      item.locked && "border-dashed text-muted",
                      isCurrent && "outline-2 outline-offset-2 outline-primary",
                    )}
                  >
                    <span aria-hidden="true">{item.position}</span>
                    {item.answered && <CircleCheck aria-hidden="true" className="absolute bottom-0.5 left-0.5 size-3" />}
                    {item.flagged && <Flag aria-hidden="true" className="absolute top-0.5 right-0.5 size-3 fill-current text-accent-text" />}
                    {item.locked && <Lock aria-hidden="true" className="absolute bottom-0.5 right-0.5 size-3" />}
                  </button>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
      <ul id={legendId} aria-label="Key" className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
        <li className="inline-flex items-center gap-1.5">
          <CircleCheck aria-hidden="true" className="size-3.5 text-on-primary-soft" /> Answered
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-3.5 rounded-sm border border-border-strong" /> Not answered
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Flag aria-hidden="true" className="size-3.5 fill-current text-accent-text" /> Flagged for review
        </li>
        <li className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-3.5 rounded-sm outline-2 outline-primary" /> Current question
        </li>
      </ul>
    </div>
  );
}
