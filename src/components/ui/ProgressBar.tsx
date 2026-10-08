import { useId } from "react";
import { cn } from "@/lib/cn";
import { formatPercent } from "@/lib/format";

export type ProgressTone = "primary" | "accent" | "success" | "warning" | "danger";

const FILL: Record<ProgressTone, string> = {
  primary: "bg-primary",
  accent: "bg-accent",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

const HEIGHT = { sm: "h-1.5", md: "h-2", lg: "h-3" } as const;

export interface ProgressBarProps {
  /** Current value, or `null` when unknown (renders an empty track and "No data yet" — never a fake number). */
  value: number | null;
  max?: number;
  /** Accessible name; also the visible label unless `labelHidden`. */
  label: string;
  labelHidden?: boolean;
  /** Show the value text at the end of the label row. Defaults to true. */
  showValue?: boolean;
  /** Human text for the value (also `aria-valuetext`), e.g. "12 of 30 topics". Defaults to a percentage. */
  valueText?: string;
  tone?: ProgressTone;
  size?: keyof typeof HEIGHT;
  className?: string;
}

/** Linear progress with `role="progressbar"`. Server-compatible. */
export function ProgressBar({
  value,
  max = 100,
  label,
  labelHidden = false,
  showValue = true,
  valueText,
  tone = "primary",
  size = "md",
  className,
}: ProgressBarProps) {
  const labelId = useId();
  const known = value !== null && Number.isFinite(value) && max > 0;
  const clamped = known ? Math.min(max, Math.max(0, value)) : 0;
  const percent = known ? (clamped / max) * 100 : 0;
  const text = known ? (valueText ?? formatPercent(percent)) : "No data yet";
  const showRow = !labelHidden || showValue;

  return (
    <div className={className}>
      {showRow && (
        <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
          <span id={labelId} className={cn("min-w-0 font-medium break-words text-text", labelHidden && "sr-only")}>
            {label}
          </span>
          {showValue && (
            <span aria-hidden="true" className="shrink-0 text-muted tabular-nums">
              {text}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-labelledby={showRow ? labelId : undefined}
        aria-label={showRow ? undefined : label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={known ? clamped : undefined}
        aria-valuetext={text}
        className={cn("w-full overflow-hidden rounded-full bg-track", HEIGHT[size])}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-300", FILL[tone])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
