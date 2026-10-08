import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatCount, formatNumber, pluralize } from "@/lib/format";

/** The countdown facts the UI needs (computed on the server in the student's time zone, §17). */
export interface CountdownView {
  daysUntil: number;
  /** Session name from data, e.g. "November 2026". */
  name: string;
  isProvisional: boolean;
  isDemo: boolean;
}

export interface ExamCountdownPillProps {
  countdown: CountdownView | null;
  /** Where the pill leads (the dashboard countdown explains provisional dates). */
  href?: string;
  className?: string;
}

/** Below this viewport width the pill is COMPACT: calendar icon + number only ("📅 126"), so the 360px header fits. */
export const COUNTDOWN_COMPACT_BELOW_PX = 380;

/**
 * Header exam countdown ("126 days"). Below {@link COUNTDOWN_COMPACT_BELOW_PX} it collapses to the calendar icon and
 * the number (the student header holds logo, streak, this pill, the notification bell and the avatar at 360px); the
 * link keeps its 44px target. Provisional dates (not yet confirmed against the board's official timetable) carry a
 * visible marker: an asterisk on narrow phones, "provisional" from `sm` up; screen readers always hear the full
 * sentence. Renders nothing without an upcoming session. Server component.
 */
export function ExamCountdownPill({ countdown, href = "/app#exam-countdown", className }: ExamCountdownPillProps) {
  if (!countdown || !Number.isFinite(countdown.daysUntil) || countdown.daysUntil < 0) return null;
  const days = Math.floor(countdown.daysUntil);
  const spoken = [
    days === 0 ? "Your examination starts today" : `${formatCount(days, "day")} until your examination`,
    countdown.isProvisional ? "provisional date" : null,
    countdown.isDemo ? "demo date for development" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Link href={href} data-compact-below={COUNTDOWN_COMPACT_BELOW_PX} className={cn("inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-full", className)}>
      <span className="inline-flex min-h-8 items-center gap-1 rounded-full bg-accent-soft px-2 py-1 text-sm font-semibold text-on-accent-soft min-[380px]:gap-1.5 min-[380px]:px-3">
        <CalendarClock aria-hidden="true" data-part="icon" className="size-4 shrink-0" />
        <span aria-hidden="true" className="whitespace-nowrap tabular-nums">
          {days === 0 ? (
            "Today"
          ) : (
            <>
              {formatNumber(days)}
              {/* The unit is dropped on the narrowest phones (compact variant); the icon still says "date". */}
              <span data-part="unit" className="max-[380px]:hidden">
                {` ${pluralize(days, "day")}`}
              </span>
            </>
          )}
          {countdown.isProvisional && <span className="sm:hidden">*</span>}
        </span>
        {countdown.isProvisional && (
          <span aria-hidden="true" className="hidden font-medium whitespace-nowrap sm:inline">
            · provisional
          </span>
        )}
        <span className="sr-only">{spoken}</span>
      </span>
    </Link>
  );
}
