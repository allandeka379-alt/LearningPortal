"use client";

import { CircleCheck } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface WeekDayTab {
  /** `YYYY-MM-DD` (student-local). */
  date: string;
  /** "Wed". */
  day: string;
  /** "7". */
  dayNumber: string;
  /** Full accessible label, e.g. "Wednesday 7 October, today, 45 minutes planned". */
  label: string;
  /** "45 min", "Rest", "—". */
  minutesText: string;
  isToday: boolean;
  isPast: boolean;
  /** Every planned item is done. */
  complete: boolean;
}

export interface WeekDaysProps {
  days: readonly WeekDayTab[];
  /** Server-rendered content of each day, keyed by date. */
  panels: Readonly<Record<string, ReactNode>>;
  /** Day selected first (today when it is in the week). */
  initialDate: string;
  /** Accessible name of the day list. */
  label?: string;
}

/**
 * Day selector for the week view (§16, §29 mobile-first): a horizontally scrollable row of day chips (WAI-ARIA tabs,
 * ←/→/Home/End move and select) above the chosen day's sessions. The strip scrolls on its own, so the page never
 * scrolls sideways at 360px. Panels are server-rendered and stay in the HTML (hidden), so nothing is fetched.
 */
export function WeekDays({ days, panels, initialDate, label = "Days of this week" }: WeekDaysProps) {
  const baseId = useId();
  const [selected, setSelected] = useState(days.some((d) => d.date === initialDate) ? initialDate : (days[0]?.date ?? ""));
  const listRef = useRef<HTMLDivElement>(null);

  const select = (date: string, focus: boolean) => {
    setSelected(date);
    const tab = listRef.current?.querySelector<HTMLButtonElement>(`[data-date="${date}"]`);
    if (!tab) return;
    if (focus) tab.focus();
    tab.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const index = days.findIndex((d) => d.date === selected);
    if (index === -1) return;
    const next =
      event.key === "ArrowRight"
        ? days[(index + 1) % days.length]
        : event.key === "ArrowLeft"
          ? days[(index - 1 + days.length) % days.length]
          : event.key === "Home"
            ? days[0]
            : event.key === "End"
              ? days[days.length - 1]
              : undefined;
    if (!next) return;
    event.preventDefault();
    select(next.date, true);
  };

  const tabId = (date: string) => `${baseId}-tab-${date}`;
  const panelId = (date: string) => `${baseId}-panel-${date}`;

  return (
    <div className="min-w-0">
      <div
        ref={listRef}
        role="tablist"
        aria-label={label}
        onKeyDown={onKeyDown}
        className="no-scrollbar relative -mx-1 flex gap-2 overflow-x-auto px-1 py-1 [scroll-padding-inline:0.25rem]"
      >
        {days.map((day) => {
          const isSelected = day.date === selected;
          return (
            <button
              key={day.date}
              type="button"
              role="tab"
              id={tabId(day.date)}
              data-date={day.date}
              aria-selected={isSelected}
              aria-controls={panelId(day.date)}
              aria-label={day.label}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => select(day.date, false)}
              className={cn(
                "relative flex min-h-[4.5rem] min-w-[4.25rem] flex-1 shrink-0 flex-col items-center justify-center gap-0.5 rounded-control border px-2 py-1.5 text-center transition-colors motion-reduce:transition-none",
                isSelected
                  ? "border-primary bg-primary text-on-primary"
                  : day.isToday
                    ? "border-primary bg-primary-soft text-on-primary-soft hover:bg-primary-soft-hover"
                    : "border-border bg-surface text-text hover:bg-subtle",
                day.isPast && !isSelected && "text-muted",
              )}
            >
              <span aria-hidden="true" className="text-xs font-medium">
                {day.isToday ? "Today" : day.day}
              </span>
              <span aria-hidden="true" className="text-lg leading-none font-semibold">
                {day.dayNumber}
              </span>
              <span aria-hidden="true" className={cn("text-xs", isSelected ? "text-on-primary" : "text-muted")}>
                {day.minutesText}
              </span>
              {day.complete && (
                <CircleCheck aria-hidden="true" className={cn("absolute top-1 right-1 size-3.5", isSelected ? "text-on-primary" : "text-success-text")} />
              )}
            </button>
          );
        })}
      </div>
      {days.map((day) => (
        <div
          key={day.date}
          role="tabpanel"
          id={panelId(day.date)}
          aria-labelledby={tabId(day.date)}
          hidden={day.date !== selected}
          tabIndex={0}
          className="pt-4 focus-visible:outline-offset-4"
        >
          {panels[day.date]}
        </div>
      ))}
    </div>
  );
}
