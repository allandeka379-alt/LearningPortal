import { Flame } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { streakDescription } from "./format";

export interface StreakIndicatorProps {
  current: number;
  status: "INACTIVE" | "AT_RISK" | "DONE_TODAY";
  href?: string;
  className?: string;
}

/**
 * Header streak (§19): flame + day count, linking to the progress page. Amber once today's goal is met, muted
 * otherwise; the status is always in the accessible text, never colour alone. Server component.
 */
export function StreakIndicator({ current, status, href = "/app/progress", className }: StreakIndicatorProps) {
  const done = status === "DONE_TODAY" && current > 0;
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1 rounded-control px-1.5 text-sm font-semibold tabular-nums transition-colors hover:bg-subtle",
        done ? "text-accent-text" : "text-muted",
        className,
      )}
    >
      <Flame aria-hidden="true" className="size-4.5 shrink-0" fill={done ? "currentColor" : "none"} />
      <span aria-hidden="true">{formatNumber(Math.max(0, current))}</span>
      <span className="sr-only">{streakDescription(current, status)}</span>
    </Link>
  );
}
