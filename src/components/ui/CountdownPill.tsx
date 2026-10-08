import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatCount } from "@/lib/format";

export interface CountdownPillProps {
  /**
   * Whole days until the event, computed in SERVER code from the student's examination session and time zone
   * (§17). `null` or a negative number renders nothing: no exam date set, or the session has passed.
   */
  days: number | null;
  /**
   * What is being counted down to, as a noun phrase from data (e.g. "your exams", "ZIMSEC November 2027").
   * Read by screen readers ("126 days until your exams"); shown visibly when `showLabel`.
   */
  event?: string;
  showLabel?: boolean;
  /** Optional link, e.g. to the exam timetable or study plan. */
  href?: string;
  className?: string;
}

/** Compact exam countdown ("126 days") for headers and dashboards. Accent-toned, so use one per view. */
export function CountdownPill({ days, event = "your exams", showLabel = false, href, className }: CountdownPillProps) {
  if (days === null || !Number.isFinite(days) || days < 0) return null;
  const whole = Math.floor(days);
  const classes = cn(
    "inline-flex min-h-8 max-w-full items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-on-accent-soft",
    href && "relative ring-accent/60 transition-shadow after:absolute after:inset-x-0 after:-inset-y-1.5 hover:ring-1",
    className,
  );
  const content = (
    <>
      <CalendarClock aria-hidden="true" className="size-4 shrink-0" />
      <span className="whitespace-nowrap tabular-nums">{whole === 0 ? "Today" : formatCount(whole, "day")}</span>
      <span className={showLabel ? "min-w-0 font-medium" : "sr-only"}>{whole === 0 ? event : `until ${event}`}</span>
    </>
  );
  return href ? (
    <Link href={href} className={classes}>
      {content}
    </Link>
  ) : (
    <span className={classes}>{content}</span>
  );
}
