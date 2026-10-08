import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";
import type { ProgressTone } from "./ProgressBar";

const STROKE: Record<ProgressTone, string> = {
  primary: "stroke-primary",
  accent: "stroke-accent",
  success: "stroke-success",
  warning: "stroke-warning",
  danger: "stroke-danger",
};

const SIZE = {
  sm: { box: "size-12", text: "text-xs" },
  md: { box: "size-16", text: "text-sm" },
  lg: { box: "size-24", text: "text-lg" },
} as const;

// r = 100 / 2π gives a circumference of exactly 100, so the dash array is simply the percentage.
const RADIUS = 15.9155;

export interface ProgressRingProps {
  /** 0–`max`, or `null` when unknown (renders an empty ring and "—"). */
  value: number | null;
  max?: number;
  /** Accessible name, e.g. "Syllabus progress". */
  label: string;
  /** Text for `aria-valuetext` and the default centre content. Defaults to a percentage. */
  valueText?: string;
  /** Custom centre content (decorative; the accessible value comes from `valueText`). */
  children?: ReactNode;
  tone?: ProgressTone;
  size?: keyof typeof SIZE;
  className?: string;
}

/** Circular progress (SVG) with `role="progressbar"`. Sized in rem so it follows font scaling. */
export function ProgressRing({
  value,
  max = 100,
  label,
  valueText,
  children,
  tone = "primary",
  size = "md",
  className,
}: ProgressRingProps) {
  const known = value !== null && Number.isFinite(value) && max > 0;
  const clamped = known ? Math.min(max, Math.max(0, value)) : 0;
  const percent = known ? (clamped / max) * 100 : 0;
  const text = known ? (valueText ?? formatPercent(percent)) : "No data yet";

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={known ? clamped : undefined}
      aria-valuetext={text}
      className={cn("relative inline-grid shrink-0 place-items-center", SIZE[size].box, className)}
    >
      <svg viewBox="0 0 36 36" aria-hidden="true" className="absolute inset-0 size-full -rotate-90">
        <circle cx="18" cy="18" r={RADIUS} fill="none" strokeWidth="3.5" className="stroke-track" />
        {percent > 0 && (
          <circle
            cx="18"
            cy="18"
            r={RADIUS}
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={`${percent} 100`}
            className={cn("transition-[stroke-dasharray] duration-300", STROKE[tone])}
          />
        )}
      </svg>
      <span aria-hidden="true" className={cn("relative font-semibold text-text tabular-nums", SIZE[size].text)}>
        {children ?? (known ? formatPercent(percent) : "—")}
      </span>
    </div>
  );
}
