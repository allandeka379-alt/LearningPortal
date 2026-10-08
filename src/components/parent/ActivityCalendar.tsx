import { formatLocalDate } from "@/components/student/format";
import { isoWeekday } from "@/lib/dates";
import { cn } from "@/lib/cn";
import { formatCount, formatDuration } from "@/lib/format";

export interface ActivityCalendarDay {
  date: string;
  active: boolean;
  studyMinutes: number;
  questionsAttempted: number;
  streakFreezeUsed: boolean;
}

export interface ActivityCalendarProps {
  days: readonly ActivityCalendarDay[];
  /** The child's local "today" (labelled). */
  today: string;
  className?: string;
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

/** Intensity step for a day (0 = no study). Thresholds in minutes: 1-15, 16-45, 46+. */
export function activityLevel(day: Pick<ActivityCalendarDay, "active" | "studyMinutes">): 0 | 1 | 2 | 3 {
  if (!day.active) return 0;
  if (day.studyMinutes > 45) return 3;
  if (day.studyMinutes > 15) return 2;
  return 1;
}

const LEVEL_CLASS = ["bg-subtle ring-1 ring-border ring-inset", "bg-primary/30", "bg-primary/60", "bg-primary"] as const;
const LEVEL_TEXT = ["No study", "Up to 15 minutes", "16 to 45 minutes", "More than 45 minutes"] as const;

/**
 * §21 "attendance / study activity": a month calendar (weeks start on Monday), one square per day shaded by minutes
 * studied, with a written legend; every day's numbers are also in the list read by screen readers (colour is never
 * the only carrier). Days that used a streak freeze have a dashed outline. Server component, no client JS.
 */
export function ActivityCalendar({ days, today, className }: ActivityCalendarProps) {
  const first = days[0];
  const leading = first ? isoWeekday(first.date) - 1 : 0;
  const activeDays = days.filter((day) => day.active).length;
  return (
    <figure className={cn("space-y-3", className)}>
      <figcaption className="text-sm text-muted">
        Active on {formatCount(activeDays, "day")} of the last {days.length}.
      </figcaption>
      <div className="max-w-sm">
        <div aria-hidden="true" className="mb-1 grid grid-cols-7 gap-1.5 text-center text-xs text-muted">
          {WEEKDAYS.map((weekday) => (
            <span key={weekday}>{weekday.slice(0, 1)}</span>
          ))}
        </div>
        <ol className="grid grid-cols-7 gap-1.5" aria-label={`Study activity, last ${days.length} days`}>
          {Array.from({ length: leading }, (_, index) => (
            <li key={`pad-${index}`} aria-hidden="true" />
          ))}
          {days.map((day) => {
            const level = activityLevel(day);
            const label = `${day.date === today ? "Today" : formatLocalDate(day.date, "weekday")}: ${
              day.active ? `${formatDuration(day.studyMinutes, { style: "long" })}, ${formatCount(day.questionsAttempted, "question")}` : "no study"
            }${day.streakFreezeUsed ? " (streak freeze used)" : ""}`;
            return (
              <li key={day.date} className="aspect-square">
                <span
                  aria-hidden="true"
                  title={label}
                  className={cn(
                    "block size-full rounded-sm",
                    LEVEL_CLASS[level],
                    day.streakFreezeUsed && "border border-dashed border-accent",
                    day.date === today && "outline-2 outline-offset-1 outline-border-strong",
                  )}
                />
                <span className="sr-only">{label}</span>
              </li>
            );
          })}
        </ol>
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted" aria-label="Legend">
        {LEVEL_TEXT.map((text, level) => (
          <li key={text} className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className={cn("inline-block size-3 rounded-sm", LEVEL_CLASS[level])} />
            {text}
          </li>
        ))}
        <li className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-3 rounded-sm border border-dashed border-accent" />
          Streak freeze
        </li>
      </ul>
    </figure>
  );
}
