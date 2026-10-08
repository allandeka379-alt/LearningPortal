import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/format";
import { ChartTable } from "./ChartTable";

/**
 * Ranked horizontal bars for one measure across categories (popular subjects, most attempted topics, AI by feature).
 * Dataviz rules applied: one series → one hue (primary) for every bar, never a value ramp on nominal categories;
 * bars thin (10px, under the 24px cap) with a 4px rounded data end and a square baseline; every value is a direct
 * label at the bar tip (text in text tokens, never the series colour), so nothing is gated behind hover; a table
 * view twin is always available. Server component, no client JS.
 */

export interface BarListItem {
  key: string;
  label: ReactNode;
  /** Plain-text label for the table view and the accessible description. */
  labelText: string;
  value: number;
  /** Preformatted value (default: grouped number). */
  valueLabel?: string;
  /** Secondary line under the label (e.g. the subject of a topic). */
  sublabel?: ReactNode;
  href?: string;
}

export interface BarListProps {
  items: readonly BarListItem[];
  /** What the values are, e.g. "Active student-days". Used as the table header and the list's accessible name. */
  measureLabel: string;
  /** Category column header in the table view, e.g. "Subject". */
  categoryLabel: string;
  /** Axis maximum (default: the largest value). */
  max?: number;
  className?: string;
  /** Hide the table-view twin (only when an equivalent table is already on the page). */
  hideTable?: boolean;
}

export function BarList({ items, measureLabel, categoryLabel, max, className, hideTable = false }: BarListProps) {
  const top = Math.max(max ?? 0, ...items.map((item) => item.value), 0);
  return (
    <div className={className}>
      <ol aria-label={measureLabel} className="space-y-3">
        {items.map((item) => {
          const width = top > 0 ? Math.max(item.value > 0 ? 0.5 : 0, (item.value / top) * 100) : 0;
          const valueText = item.valueLabel ?? formatNumber(item.value);
          return (
            <li key={item.key} className="group">
              <div className="flex items-baseline justify-between gap-3 text-sm">
                <span className="min-w-0">
                  {item.href ? (
                    <Link href={item.href} className="font-medium text-text underline-offset-4 hover:underline">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-text">{item.label}</span>
                  )}
                  {item.sublabel && <span className="block truncate text-xs text-muted">{item.sublabel}</span>}
                </span>
                <span className="shrink-0 font-semibold text-text tabular-nums">{valueText}</span>
              </div>
              <div aria-hidden="true" className="mt-1.5 h-2.5 w-full">
                <div
                  className="h-full rounded-r-[4px] bg-primary transition-opacity group-hover:opacity-80 motion-reduce:transition-none"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ol>
      {!hideTable && (
        <ChartTable
          className="mt-3"
          caption={`${measureLabel} by ${categoryLabel.toLowerCase()}`}
          columns={[categoryLabel, measureLabel]}
          rows={items.map((item) => [item.labelText, item.valueLabel ?? formatNumber(item.value)])}
        />
      )}
    </div>
  );
}

/**
 * The §35 funnel: ordered steps of one measure (users → active students → paid students) with the share of the
 * previous step. Ordered categories, one hue; the conversion text carries the relationship (not colour).
 */
export function FunnelBars({
  steps,
  className,
}: {
  steps: readonly { key: string; label: string; value: number | null; hint?: string }[];
  className?: string;
}) {
  const top = Math.max(0, ...steps.map((step) => step.value ?? 0));
  return (
    <div className={className}>
      <ol aria-label="Funnel" className="space-y-4">
        {steps.map((step, index) => {
          const previous = index > 0 ? steps[index - 1]?.value ?? null : null;
          const share =
            step.value !== null && previous !== null && previous > 0 ? `${formatNumber((step.value / previous) * 100, { maximumFractionDigits: 1 })}% of previous step` : null;
          const width = step.value !== null && top > 0 ? Math.max(step.value > 0 ? 0.5 : 0, (step.value / top) * 100) : 0;
          return (
            <li key={step.key}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 text-sm">
                <span className="font-medium text-text">{step.label}</span>
                <span className="font-semibold text-text tabular-nums">
                  {step.value === null ? (
                    <>
                      <span aria-hidden="true">—</span>
                      <span className="sr-only">No data yet</span>
                    </>
                  ) : (
                    formatNumber(step.value)
                  )}
                </span>
              </div>
              <div aria-hidden="true" className="mt-1.5 h-3 w-full rounded-r-[4px] bg-track/60">
                <div className="h-full rounded-r-[4px] bg-primary" style={{ width: `${width}%` }} />
              </div>
              {(share || step.hint) && <p className="mt-1 text-xs text-muted">{[share, step.hint].filter(Boolean).join(" · ")}</p>}
            </li>
          );
        })}
      </ol>
      <ChartTable
        className="mt-3"
        caption="Funnel steps"
        columns={["Step", "Value"]}
        rows={steps.map((step) => [step.label, step.value === null ? "No data yet" : formatNumber(step.value)])}
      />
    </div>
  );
}

/** Honest empty state inside a chart card ("No rolled-up data for this range yet"). */
export function ChartEmpty({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("rounded-control bg-subtle px-4 py-6 text-center text-sm text-muted", className)}>{children}</p>;
}
