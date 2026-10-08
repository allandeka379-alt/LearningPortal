import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { FormAction } from "@/components/student/action-state";
import { formatLocalDate } from "@/components/student/format";
import { buttonStyles } from "@/components/ui/button-styles";
import { cn } from "@/lib/cn";
import { formatDuration } from "@/lib/format";
import type { PlanDay, WeekPlan } from "@/server/studyplan/service";
import { PlanItemRow } from "./PlanItemRow";
import { WeekDays, type WeekDayTab } from "./WeekDays";
import { shortDayLabel } from "./plan-copy";

export interface WeekPlanSectionProps {
  week: WeekPlan;
  planStart: string;
  planEnd: string;
  itemAction: FormAction;
}

function minutesText(day: PlanDay): string {
  if (!day.inPlan) return "—";
  if (day.plannedMinutes > 0) return formatDuration(day.plannedMinutes);
  return day.availableMinutes === 0 ? "Rest" : "—";
}

function dayTab(day: PlanDay): WeekDayTab {
  const { day: short, number } = shortDayLabel(day.date);
  const planned = day.inPlan && day.plannedMinutes > 0 ? `${formatDuration(day.plannedMinutes, { style: "long" })} planned` : day.inPlan && day.availableMinutes === 0 ? "rest day" : "nothing planned";
  const done = day.items.length > 0 && day.items.every((i) => i.status === "DONE");
  return {
    date: day.date,
    day: short,
    dayNumber: number,
    label: [formatLocalDate(day.date, "weekday"), day.isToday ? "today" : null, planned, done ? "all done" : null].filter(Boolean).join(", "),
    minutesText: minutesText(day),
    isToday: day.isToday,
    isPast: day.isPast,
    complete: done,
  };
}

function DayPanel({ day, planStart, planEnd, itemAction }: { day: PlanDay; planStart: string; planEnd: string; itemAction: FormAction }) {
  const heading = formatLocalDate(day.date, "weekday");
  let empty: string | null = null;
  if (!day.inPlan) {
    empty =
      day.date < planStart
        ? `Your plan starts on ${formatLocalDate(planStart, "weekday")}.`
        : `Not planned yet: your plan runs to ${formatLocalDate(planEnd, "weekday")}. Updating your plan plans four weeks ahead from today.`;
  } else if (day.items.length === 0) {
    empty = day.availableMinutes === 0 ? "A rest day: no study time on this day in your plan." : "Nothing planned for this day.";
  }
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h3 className="text-base font-semibold text-text">
          {heading}
          {day.isToday && <span className="font-normal text-muted"> (today)</span>}
        </h3>
        {day.inPlan && day.items.length > 0 && (
          <p className="text-sm text-muted">
            {formatDuration(day.plannedMinutes)} planned of {formatDuration(day.availableMinutes)}
            {day.doneMinutes > 0 ? ` · ${formatDuration(day.doneMinutes)} done` : ""}
          </p>
        )}
      </div>
      {empty ? (
        <p className="rounded-control bg-subtle p-4 text-sm text-muted">{empty}</p>
      ) : (
        <>
          {day.isToday && (
            <p className="text-sm text-muted">
              <a href="#today" className="inline-flex min-h-11 items-center font-semibold text-primary underline-offset-4 hover:underline">
                Start or tick today&rsquo;s sessions in Today
              </a>
            </p>
          )}
          <ol className="divide-y divide-border rounded-control border border-border" aria-label={`Sessions on ${heading}`}>
            {day.items.map((item) => (
              <PlanItemRow key={item.id} item={item} interactive={!day.isToday} itemAction={itemAction} />
            ))}
          </ol>
        </>
      )}
    </div>
  );
}

/**
 * The week view (§16 "Monday: Mathematics 45 min, Physics 30 min …"): Monday to Sunday with today highlighted, a
 * scrollable day selector, the chosen day's sessions, and links to the previous / next week of the plan.
 */
export function WeekPlanSection({ week, planStart, planEnd, itemAction }: WeekPlanSectionProps) {
  const today = week.days.find((d) => d.isToday);
  const firstPlanned = week.days.find((d) => d.inPlan && d.items.length > 0);
  const initial = today?.date ?? firstPlanned?.date ?? week.weekStart;
  const panels = Object.fromEntries(
    week.days.map((day) => [day.date, <DayPanel key={day.date} day={day} planStart={planStart} planEnd={planEnd} itemAction={itemAction} />]),
  );
  const weekPlanned = week.days.reduce((sum, d) => sum + d.plannedMinutes, 0);
  const weekDone = week.days.reduce((sum, d) => sum + d.doneMinutes, 0);
  const navClass = buttonStyles({ variant: "outline", iconOnly: true });
  const isCurrentWeek = today !== undefined;

  return (
    <section aria-labelledby="plan-week-title" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 id="plan-week-title" className="text-lg font-semibold text-text">
            Week of {formatLocalDate(week.weekStart)}
          </h2>
          <p className="text-sm text-muted">
            {weekPlanned > 0 ? `${formatDuration(weekPlanned)} planned · ${formatDuration(weekDone)} done` : "Nothing planned this week."}
          </p>
        </div>
        <nav aria-label="Plan weeks" className="flex items-center gap-2">
          {!isCurrentWeek && (
            <Link href="/app/plan" scroll={false} className={buttonStyles({ variant: "ghost" })}>
              This week
            </Link>
          )}
          {week.previousWeekStart ? (
            <Link href={`/app/plan?week=${week.previousWeekStart}`} className={navClass} aria-label="Previous week" scroll={false}>
              <ChevronLeft aria-hidden="true" />
            </Link>
          ) : (
            <span className={cn(navClass, "opacity-40")} aria-hidden="true">
              <ChevronLeft aria-hidden="true" />
            </span>
          )}
          {week.nextWeekStart ? (
            <Link href={`/app/plan?week=${week.nextWeekStart}`} className={navClass} aria-label="Next week" scroll={false}>
              <ChevronRight aria-hidden="true" />
            </Link>
          ) : (
            <span className={cn(navClass, "opacity-40")} aria-hidden="true">
              <ChevronRight aria-hidden="true" />
            </span>
          )}
        </nav>
      </div>
      <WeekDays key={week.weekStart} days={week.days.map(dayTab)} panels={panels} initialDate={initial} />
    </section>
  );
}
