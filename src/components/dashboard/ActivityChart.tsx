import { formatLocalDate } from "@/components/student/format";
import { cn } from "@/lib/cn";
import { formatDuration, formatNumber } from "@/lib/format";

export interface ActivityChartDay {
  date: string;
  studyMinutes: number;
  questionsAttempted: number;
  goalMet: boolean;
}

export interface ActivityChartProps {
  days: readonly ActivityChartDay[];
  /** Today's local date (labelled "Today"). */
  today: string;
  className?: string;
}

/** A clean axis maximum (multiples of 15 / 30 / 60 minutes) so the top tick reads as a round number. */
export function axisMaxMinutes(maxMinutes: number): number {
  if (!Number.isFinite(maxMinutes) || maxMinutes <= 0) return 30;
  const step = maxMinutes <= 60 ? 15 : maxMinutes <= 180 ? 30 : 60;
  return Math.ceil(maxMinutes / step) * step;
}

/**
 * Study minutes per day for the last 30 days (§6 activity, §21 "attendance/study activity"). One series in the
 * primary colour, thin bars with rounded tops from a single baseline and a 2px gap; days the daily goal was met get
 * an amber marker (named in the legend, and in the table, never colour alone). A per-day tooltip shows on hover;
 * the full numbers are in the table below the chart. Server-rendered HTML: no chart library, no client JS.
 */
export function ActivityChart({ days, today, className }: ActivityChartProps) {
  const max = axisMaxMinutes(Math.max(0, ...days.map((d) => d.studyMinutes)));
  const first = days[0];
  const middle = days[Math.floor(days.length / 2)];
  return (
    <figure className={cn("space-y-3", className)}>
      <div className="flex items-center gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block h-3 w-1.5 rounded-t-sm bg-primary" />
          Minutes studied
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
          Daily goal met
        </span>
      </div>
      <div aria-hidden="true" className="flex gap-2">
        <div className="flex w-12 shrink-0 flex-col justify-between pb-6 text-right text-xs text-muted tabular-nums">
          <span>{formatDuration(max)}</span>
          <span>0</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="relative flex h-40 items-end gap-0.5 border-b border-border">
            <div className="pointer-events-none absolute inset-x-0 top-0 border-t border-border/60" />
            {days.map((day) => {
              const height = day.studyMinutes > 0 ? Math.max(2, (day.studyMinutes / max) * 100) : 0;
              return (
                <div key={day.date} className="group relative flex h-full min-w-0 flex-1 items-end justify-center">
                  {height > 0 && <div className="w-full max-w-6 rounded-t-sm bg-primary" style={{ height: `${height}%` }} />}
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden w-max -translate-x-1/2 rounded-control border border-border bg-surface-raised px-2 py-1 text-xs text-text shadow-md group-hover:block">
                    <span className="font-semibold">{day.date === today ? "Today" : formatLocalDate(day.date, "short")}</span>
                    <br />
                    {formatDuration(day.studyMinutes)} · {formatNumber(day.questionsAttempted)} questions
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex h-3 gap-0.5 pt-1">
            {days.map((day) => (
              <div key={day.date} className="flex min-w-0 flex-1 justify-center">
                {day.goalMet && <span className="size-1.5 rounded-full bg-accent" />}
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-xs text-muted">
            <span>{first ? formatLocalDate(first.date, "short") : ""}</span>
            <span className="hidden sm:inline">{middle ? formatLocalDate(middle.date, "short") : ""}</span>
            <span>Today</span>
          </div>
        </div>
      </div>
      <details>
        <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm font-medium text-primary">Show as a table</summary>
        <div className="mt-2 max-h-80 overflow-y-auto rounded-control border border-border">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Study activity for the last {days.length} days</caption>
            <thead className="sticky top-0 bg-subtle text-xs text-muted">
              <tr>
                <th scope="col" className="px-3 py-2 font-medium">
                  Day
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Minutes
                </th>
                <th scope="col" className="px-3 py-2 text-right font-medium">
                  Questions
                </th>
                <th scope="col" className="px-3 py-2 font-medium">
                  Goal
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...days].reverse().map((day) => (
                <tr key={day.date}>
                  <th scope="row" className="px-3 py-2 font-normal text-text">
                    {day.date === today ? "Today" : formatLocalDate(day.date, "weekday")}
                  </th>
                  <td className="px-3 py-2 text-right tabular-nums">{formatNumber(day.studyMinutes)}</td>
                  <td className="px-3 py-2 text-right tabular-nums">{formatNumber(day.questionsAttempted)}</td>
                  <td className="px-3 py-2 text-muted">{day.goalMet ? "Met" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
