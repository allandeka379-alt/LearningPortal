/**
 * Pure geometry for the admin charts (no DOM): "nice" axis maxima and ticks, linear scales and line paths that
 * break at missing values. Missing data is a GAP, never a zero (§50 honesty).
 */

/** Smallest "nice" number (1, 2, 2.5, 5 × 10^n) ≥ `value`; 1 for non-positive input. */
export function niceCeil(value: number): number {
  if (!Number.isFinite(value) || value <= 0) return 1;
  const exponent = Math.floor(Math.log10(value));
  const base = 10 ** exponent;
  for (const step of [1, 2, 2.5, 5, 10]) {
    const candidate = step * base;
    if (candidate >= value - base * 1e-9) return Number(candidate.toPrecision(12));
  }
  return 10 * base;
}

/**
 * Evenly spaced ticks from 0 to a nice maximum covering `max` (about `count + 1` ticks, all clean numbers). The last
 * tick is the axis maximum. `integer` (counts) keeps every tick a whole number.
 */
export function niceTicks(max: number, count = 4, integer = false): number[] {
  const top = niceCeil(max);
  let step = niceCeil(top / count);
  if (integer) step = Math.max(1, Math.ceil(step));
  const ticks: number[] = [];
  for (let value = 0; value <= top + step * 1e-9; value += step) ticks.push(Number(value.toPrecision(12)));
  if (ticks[ticks.length - 1]! < max) ticks.push(Number((ticks[ticks.length - 1]! + step).toPrecision(12)));
  return ticks;
}

/** Maps `value` in [0, domainMax] to [rangeStart, rangeEnd]. */
export function linear(value: number, domainMax: number, rangeStart: number, rangeEnd: number): number {
  if (domainMax <= 0) return rangeStart;
  return rangeStart + (value / domainMax) * (rangeEnd - rangeStart);
}

/** x position of point `index` of `count` points across [left, right] (a single point sits in the middle). */
export function pointX(index: number, count: number, left: number, right: number): number {
  if (count <= 1) return (left + right) / 2;
  return left + (index / (count - 1)) * (right - left);
}

export interface PathPoint {
  x: number;
  y: number | null;
}

/** SVG path data through the points, starting a new sub-path after every gap (null y). */
export function linePath(points: readonly PathPoint[]): string {
  let path = "";
  let drawing = false;
  for (const point of points) {
    if (point.y === null || !Number.isFinite(point.y)) {
      drawing = false;
      continue;
    }
    path += `${drawing ? "L" : "M"}${round(point.x)},${round(point.y)}`;
    drawing = true;
  }
  return path;
}

/** Closed area path(s) under each continuous run of points down to `baseline`. */
export function areaPath(points: readonly PathPoint[], baseline: number): string {
  const runs: PathPoint[][] = [];
  let current: PathPoint[] = [];
  for (const point of points) {
    if (point.y === null || !Number.isFinite(point.y)) {
      if (current.length > 0) runs.push(current);
      current = [];
    } else {
      current.push(point);
    }
  }
  if (current.length > 0) runs.push(current);
  return runs
    .filter((run) => run.length > 1)
    .map((run) => {
      const first = run[0]!;
      const last = run[run.length - 1]!;
      const top = run.map((point, index) => `${index === 0 ? "M" : "L"}${round(point.x)},${round(point.y as number)}`).join("");
      return `${top}L${round(last.x)},${round(baseline)}L${round(first.x)},${round(baseline)}Z`;
    })
    .join("");
}

/** Index of the point nearest to `x` (crosshair snapping). */
export function nearestIndex(x: number, count: number, left: number, right: number): number {
  if (count <= 1) return 0;
  const ratio = (x - left) / (right - left);
  return Math.min(count - 1, Math.max(0, Math.round(ratio * (count - 1))));
}

/** Indices of up to `max` evenly spaced labels, always including the first and last point. */
export function labelIndices(count: number, max = 5): number[] {
  if (count <= 0) return [];
  if (count <= max) return Array.from({ length: count }, (_, index) => index);
  const result = new Set<number>([0, count - 1]);
  const step = (count - 1) / (max - 1);
  for (let i = 1; i < max - 1; i += 1) result.add(Math.round(i * step));
  return [...result].sort((a, b) => a - b);
}

function round(value: number): number {
  return Math.round(value * 10) / 10;
}
