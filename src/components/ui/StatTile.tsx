import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EMPTY_VALUE, formatNumber } from "@/lib/format";

export interface StatDelta {
  /** Preformatted change, e.g. "+12%" or "3 more". */
  value: string;
  direction: "up" | "down" | "flat";
  /**
   * Whether the change is good. Defaults: up → positive, down → negative. Set explicitly when "down" is good
   * (e.g. average time per question).
   */
  sentiment?: "positive" | "negative" | "neutral";
  /** Comparison context, e.g. "vs last week". */
  label?: string;
}

export interface StatTileProps {
  label: string;
  /**
   * The value. Numbers are formatted with `formatNumber`; strings/nodes are rendered as-is (preformat percentages
   * with `formatPercent`). `null`/`undefined` renders an em dash with "No data yet" for screen readers — dashboards
   * must never invent a value.
   */
  value: ReactNode | number | null | undefined;
  /** Small suffix after the value ("%", "days"). Hidden when the value is empty. */
  unit?: string;
  hint?: ReactNode;
  icon?: ReactNode;
  delta?: StatDelta;
  /** Screen-reader text for an empty value. */
  emptyLabel?: string;
  className?: string;
}

const SENTIMENT_CLASS = {
  positive: "text-success-text",
  negative: "text-danger-text",
  neutral: "text-muted",
} as const;

/** A single metric (questions attempted, accuracy, streak). Server-compatible. */
export function StatTile({ label, value, unit, hint, icon, delta, emptyLabel = "No data yet", className }: StatTileProps) {
  const isEmpty = value === null || value === undefined || (typeof value === "number" && !Number.isFinite(value));
  const display = typeof value === "number" ? formatNumber(value) : value;

  return (
    <div className={cn("rounded-card border border-border bg-surface p-4", className)}>
      <p className="flex items-start gap-2 text-sm font-medium text-muted [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0">
        {icon}
        <span className="min-w-0">{label}</span>
      </p>
      <p className="mt-1.5 text-2xl font-semibold tracking-tight text-text tabular-nums sm:text-3xl">
        {isEmpty ? (
          <>
            <span aria-hidden="true" className="text-muted">
              {EMPTY_VALUE}
            </span>
            <span className="sr-only">{emptyLabel}</span>
          </>
        ) : (
          <>
            {display}
            {unit && <span className="ml-1 text-base font-medium text-muted">{unit}</span>}
          </>
        )}
      </p>
      {delta && !isEmpty && <DeltaLine delta={delta} />}
      {hint && <p className="mt-1.5 text-sm text-muted">{hint}</p>}
    </div>
  );
}

function DeltaLine({ delta }: { delta: StatDelta }) {
  const sentiment = delta.sentiment ?? (delta.direction === "up" ? "positive" : delta.direction === "down" ? "negative" : "neutral");
  const Icon = delta.direction === "up" ? ArrowUpRight : delta.direction === "down" ? ArrowDownRight : Minus;
  const directionText = delta.direction === "up" ? "Up" : delta.direction === "down" ? "Down" : "No change";
  return (
    <p className={cn("mt-1.5 flex items-center gap-1 text-sm font-medium", SENTIMENT_CLASS[sentiment])}>
      <Icon aria-hidden="true" className="size-4 shrink-0" />
      <span className="sr-only">{directionText}</span>
      <span className="tabular-nums">{delta.value}</span>
      {delta.label && <span className="font-normal text-muted">{delta.label}</span>}
    </p>
  );
}
