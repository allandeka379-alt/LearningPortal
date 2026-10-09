// Shared helpers for the w4a- slices and tables scripts (no concept modules here; importing it registers nothing).
// JS mirrors of the standard algorithms, so every trace, pass and count printed is computed.
import { traceTable } from "../lib.mjs";

export const fence = (s) => "```\n" + s + "\n```";
export const C = (k) => `comp.${k}`;
export const list = (a) => a.join(", ");

/**
 * Runs `run(rec)`; each rec(state) call adds one row (state holds every column; OUTPUT undefined when nothing is
 * output). Returns traceTable's { md, rows } plus the raw snapshots. Blank cells = value unchanged, as in mark schemes.
 */
export function recordTrace(cols, run) {
  const snaps = [];
  run((s) => snaps.push({ ...s }));
  let i = 0;
  const t = traceTable(cols, snaps[0], () => (++i < snaps.length ? { ...snaps[i] } : null));
  return { ...t, snaps };
}

/** Bubble sort (ascending unless desc) with a Swapped flag. Returns the passes: { after, swaps, comparisons }. */
export function bubble(arr, { desc = false, flag = true, fixedPasses = false } = {}) {
  const a = [...arr];
  const n = a.length;
  const passes = [];
  for (let p = 0; p < n - 1; p++) {
    let swaps = 0;
    let comparisons = 0;
    const last = fixedPasses ? n - 1 : n - 1 - p; // fixedPasses: every pass compares all n-1 pairs
    for (let j = 0; j < last; j++) {
      comparisons++;
      if (desc ? a[j] < a[j + 1] : a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
      }
    }
    passes.push({ after: [...a], swaps, comparisons });
    if (flag && swaps === 0) break;
  }
  return passes;
}

/** Linear search with early exit: { index (1-based, 0 if absent), comparisons }. */
export function linear(arr, target) {
  for (let i = 0; i < arr.length; i++) if (arr[i] === target) return { index: i + 1, comparisons: i + 1 };
  return { index: 0, comparisons: arr.length };
}

export const sum = (a) => a.reduce((s, x) => s + x, 0);
export const mdTable = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => ":-:").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
/** Array shown as an index/value table. */
export const arrayMd = (name, a) => mdTable(["Index", ...a.map((_, i) => String(i + 1))], [[name, ...a.map(String)]]);
