"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cn } from "@/lib/cn";
import { formatNumber, formatPercent } from "@/lib/format";
import { ChartTable } from "./ChartTable";
import { areaPath, labelIndices, linear, linePath, nearestIndex, niceTicks, pointX } from "./scale";

/**
 * Time-series line chart for admin analytics (one axis, ≤ 3 series). Dataviz rules applied:
 * - 2px lines with round joins, a 10% area wash for a single series, a ≥ 8px end dot with a 2px surface ring;
 * - colours by entity in fixed order (primary, accent, then de-emphasis grey), never by rank;
 * - one y-axis with clean, thousands-separated ticks and solid hairline gridlines; missing days are GAPS, not zeros;
 * - a legend for ≥ 2 series (line keys), plus a selective end label per series that is dropped when labels collide;
 * - hover layer by default: a crosshair snaps to the nearest day and a tooltip lists every series (value first);
 *   the same readout on keyboard focus (←/→, Home/End) through a polite live region; tooltips never gate values,
 *   the table view lists them all.
 */

export type ChartValueKind = "count" | "percent" | "ratio" | "minutes";

export interface LineSeries {
  key: string;
  label: string;
  /** One value per date; `null` = no data for that day (drawn as a gap). */
  values: readonly (number | null)[];
}

export interface LineChartProps {
  /**
   * One label per point, formatted on the SERVER (e.g. "5 Oct 2026") so the client never re-formats dates with a
   * different ICU build (no hydration mismatch). Use `TimeSeriesChart` to build them from `YYYY-MM-DD` dates.
   */
  labels: readonly string[];
  /** Short axis labels per point ("5 Oct"); defaults to `labels`. */
  shortLabels?: readonly string[];
  series: readonly LineSeries[];
  /** Accessible name, e.g. "Daily active users". */
  title: string;
  valueKind?: ChartValueKind;
  height?: number;
  className?: string;
}

/**
 * Series colours from the brand ramps only (no invented colours). Validated with the dataviz palette script: light
 * zambezi-600 / msasa-600 and dark zambezi-500 / msasa-600 pass the lightness band, CVD separation (ΔE ≥ 15),
 * normal-vision floor and 3:1 contrast; the muted brand teal sits under the chroma floor by design, so identity is
 * always also carried by the legend, end labels and the table view. The third slot is the de-emphasis grey.
 */
const SERIES_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--color-border-strong)"] as const;
const PALETTE_CLASS =
  "[--chart-1:var(--color-zambezi-600)] [--chart-2:var(--color-msasa-600)] dark:[--chart-1:var(--color-zambezi-500)]";
const MARGIN = { top: 12, right: 64, bottom: 28, left: 48 };

function formatValue(value: number | null, kind: ChartValueKind): string {
  if (value === null) return "No data";
  switch (kind) {
    case "percent":
      return formatPercent(value, { maximumFractionDigits: 1 });
    case "ratio":
      return formatPercent(value, { input: "ratio", maximumFractionDigits: 1 });
    case "minutes":
      return `${formatNumber(value, { maximumFractionDigits: 0 })} min`;
    default:
      return formatNumber(value, { maximumFractionDigits: 1 });
  }
}

function formatTick(value: number, kind: ChartValueKind): string {
  if (kind === "ratio") return formatPercent(value, { input: "ratio" });
  if (kind === "percent") return formatPercent(value);
  return formatNumber(value, { compact: value >= 10_000 });
}

export function LineChart({ labels, shortLabels, series, title, valueKind = "count", height = 220, className }: LineChartProps) {
  const axisLabels = shortLabels ?? labels;
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(640);
  const [active, setActive] = useState<number | null>(null);
  const [announce, setAnnounce] = useState("");
  const descriptionId = useId();
  const shown = series.slice(0, 3);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      const next = Math.round(entries[0]?.contentRect.width ?? 0);
      if (next > 0) setWidth(next);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const count = labels.length;
  const left = MARGIN.left;
  const right = Math.max(left + 40, width - MARGIN.right);
  const top = MARGIN.top;
  const bottom = height - MARGIN.bottom;
  const allValues = shown.flatMap((s) => s.values.filter((v): v is number => v !== null && Number.isFinite(v)));
  const maxValue = allValues.length > 0 ? Math.max(...allValues) : 0;
  const ticks = niceTicks(valueKind === "ratio" ? Math.min(1, Math.max(maxValue, 0.01)) : maxValue, 4, valueKind === "count");
  const domainMax = ticks[ticks.length - 1] ?? 1;
  const y = (value: number) => linear(value, domainMax, bottom, top);
  const xs = labels.map((_, index) => pointX(index, count, left, right));

  const lastPoints = shown.map((s) => {
    for (let index = s.values.length - 1; index >= 0; index -= 1) {
      const value = s.values[index];
      if (value !== null && value !== undefined && Number.isFinite(value)) return { index, value };
    }
    return null;
  });
  const endLabelYs = lastPoints.map((point) => (point ? y(point.value) : null));
  const labelsCollide = endLabelYs.some((a, i) => a !== null && endLabelYs.some((b, j) => j !== i && b !== null && Math.abs(a - b) < 14));

  const readout = (index: number) =>
    `${labels[index] ?? ""}: ${shown.map((s) => `${s.label} ${formatValue(s.values[index] ?? null, valueKind)}`).join(", ")}`;

  const onPointerMove = (event: PointerEvent<SVGRectElement>) => {
    const rect = event.currentTarget.ownerSVGElement?.getBoundingClientRect();
    if (!rect) return;
    setActive(nearestIndex(event.clientX - rect.left, count, left, right));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (count === 0) return;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = Math.min(count - 1, (active ?? -1) + 1);
    else if (event.key === "ArrowLeft") next = Math.max(0, (active ?? count) - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else if (event.key === "Escape") {
      setActive(null);
      return;
    }
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    setAnnounce(readout(next));
  };

  const activeX = active === null ? null : xs[active] ?? null;
  const tooltipLeft = activeX === null ? 0 : Math.min(Math.max(activeX + 12, 0), Math.max(0, width - 200));

  return (
    <div className={cn("min-w-0", PALETTE_CLASS, className)}>
      {shown.length >= 2 && (
        <ul className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted" aria-label="Legend">
          {shown.map((s, index) => (
            <li key={s.key} className="flex items-center gap-2">
              <svg aria-hidden="true" width="16" height="4">
                <line x1="0" y1="2" x2="16" y2="2" stroke={SERIES_COLORS[index]} strokeWidth="2" strokeLinecap="round" />
              </svg>
              {s.label}
            </li>
          ))}
        </ul>
      )}
      <div
        ref={containerRef}
        className="relative rounded-control focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
        tabIndex={count > 0 ? 0 : -1}
        role="group"
        aria-roledescription="chart"
        aria-label={`${title}. Use the left and right arrow keys to read values by day.`}
        aria-describedby={descriptionId}
        onKeyDown={onKeyDown}
        onBlur={() => setActive(null)}
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block h-auto max-w-full overflow-visible"
          aria-hidden="true"
        >
          {ticks.map((tick) => (
            <g key={tick}>
              <line x1={left} x2={right} y1={y(tick)} y2={y(tick)} stroke="var(--color-border)" strokeWidth="1" />
              <text x={left - 8} y={y(tick)} dy="0.32em" textAnchor="end" className="fill-muted text-[11px] tabular-nums">
                {formatTick(tick, valueKind)}
              </text>
            </g>
          ))}
          {labelIndices(count, width < 480 ? 3 : 5).map((index) => (
            <text
              key={index}
              x={xs[index]}
              y={bottom + 18}
              textAnchor={index === 0 ? "start" : index === count - 1 ? "end" : "middle"}
              className="fill-muted text-[11px]"
            >
              {axisLabels[index]}
            </text>
          ))}
          {shown.map((s, seriesIndex) => {
            const points = s.values.map((value, index) => ({ x: xs[index] ?? 0, y: value === null ? null : y(value) }));
            const color = SERIES_COLORS[seriesIndex];
            return (
              <g key={s.key}>
                {shown.length === 1 && <path d={areaPath(points, bottom)} fill={color} fillOpacity={0.1} />}
                <path d={linePath(points)} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                {/* Isolated single days (no neighbours) would be invisible as a line: draw them as dots. */}
                {points.map((point, index) =>
                  point.y !== null && (points[index - 1]?.y ?? null) === null && (points[index + 1]?.y ?? null) === null ? (
                    <circle key={index} cx={point.x} cy={point.y} r={3} fill={color} />
                  ) : null,
                )}
              </g>
            );
          })}
          {shown.map((s, seriesIndex) => {
            const last = lastPoints[seriesIndex];
            if (!last) return null;
            const cx = xs[last.index] ?? 0;
            const cy = y(last.value);
            return (
              <g key={`${s.key}-end`}>
                <circle cx={cx} cy={cy} r={4} fill={SERIES_COLORS[seriesIndex]} stroke="var(--color-surface)" strokeWidth={2} />
                {!labelsCollide && (
                  <text x={cx + 8} y={cy} dy="0.32em" className="fill-text text-[11px] font-semibold tabular-nums">
                    {formatValue(last.value, valueKind)}
                  </text>
                )}
              </g>
            );
          })}
          {activeX !== null && (
            <g>
              <line x1={activeX} x2={activeX} y1={top} y2={bottom} stroke="var(--color-border-strong)" strokeWidth={1} />
              {shown.map((s, seriesIndex) => {
                const value = active === null ? null : s.values[active] ?? null;
                return value === null ? null : (
                  <circle key={s.key} cx={activeX} cy={y(value)} r={4} fill={SERIES_COLORS[seriesIndex]} stroke="var(--color-surface)" strokeWidth={2} />
                );
              })}
            </g>
          )}
          <rect
            x={left}
            y={top}
            width={Math.max(0, right - left)}
            height={Math.max(0, bottom - top)}
            fill="transparent"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setActive(null)}
          />
        </svg>
        {active !== null && activeX !== null && (
          <div
            className="pointer-events-none absolute top-2 z-10 w-48 rounded-control border border-border bg-surface-raised p-2.5 text-xs shadow-md"
            style={{ left: tooltipLeft }}
          >
            <p className="mb-1 text-muted">{labels[active]}</p>
            <ul className="space-y-1">
              {shown.map((s, index) => (
                <li key={s.key} className="flex items-center gap-2">
                  <svg aria-hidden="true" width="12" height="4" className="shrink-0">
                    <line x1="0" y1="2" x2="12" y2="2" stroke={SERIES_COLORS[index]} strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-semibold text-text tabular-nums">{formatValue(s.values[active] ?? null, valueKind)}</span>
                  <span className="truncate text-muted">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p id={descriptionId} className="sr-only">
          {lastPoints.some(Boolean)
            ? shown
                .map((s, index) => {
                  const last = lastPoints[index];
                  return last ? `${s.label}: latest ${formatValue(last.value, valueKind)} on ${labels[last.index] ?? ""}.` : `${s.label}: no data.`;
                })
                .join(" ")
            : "No data for this range."}
        </p>
        <p className="sr-only" aria-live="polite">
          {announce}
        </p>
      </div>
      <ChartTable
        className="mt-2"
        caption={title}
        columns={["Date", ...shown.map((s) => s.label)]}
        rows={labels.map((label, index) => [label, ...shown.map((s) => formatValue(s.values[index] ?? null, valueKind))])}
      />
    </div>
  );
}
