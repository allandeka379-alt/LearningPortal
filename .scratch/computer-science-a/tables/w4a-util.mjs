// Shared helpers for the w4a tables scripts and slices (not a slice: lives in tables/).
import { mdTable } from "../lib.mjs";

/** Trace-table recorder in mark-scheme style: a cell is blank when its value did not change; OUTPUT cells always show. */
export class Trace {
  constructor(cols) {
    this.cols = cols;
    this.rows = [];
    this.last = {};
  }
  row(vals) {
    const cells = this.cols.map((c) => {
      if (!(c in vals)) return "";
      const v = vals[c];
      if (c === "OUTPUT") return String(v);
      if (this.last[c] === v) return "";
      this.last[c] = v;
      return String(v);
    });
    this.rows.push(cells);
    return this;
  }
  md() {
    return mdTable(this.cols, this.rows);
  }
}

/** Markdown table with a header row but every cell the full value (no blanks): rows is an array of arrays. */
export const table = mdTable;

/** Pseudocode-style display of an array value list, e.g. [4, 9] → "4, 9". */
export const list = (a) => a.join(", ");

/** Array as a Markdown table with 1-based index row: | Index | 1 | 2 |… then | Value | .. |. */
export function arrayMd(arr, { start = 1, name = "Value" } = {}) {
  const idx = arr.map((_, i) => i + start);
  return `| Index | ${idx.join(" | ")} |\n|:-:|${idx.map(() => ":-:").join("|")}|\n| ${name} | ${arr.join(" | ")} |`;
}

/** Floor division and modulus for non-negative integers (DIV and MOD of the pseudocode guide). */
export const DIV = (a, b) => Math.floor(a / b);
export const MOD = (a, b) => ((a % b) + b) % b;

/** 1-based binary search mirror of the pseudocode: { found, mid, comparisons, steps:[{low,high,mid,value}] } (Mid ← (Low + High) DIV 2). */
export function bsearch1(arr, target) {
  let low = 1, high = arr.length, mid = 0, found = false;
  const steps = [];
  while (!found && low <= high) {
    mid = Math.floor((low + high) / 2);
    steps.push({ low, high, mid, value: arr[mid - 1] });
    if (arr[mid - 1] === target) found = true;
    else if (arr[mid - 1] < target) low = mid + 1;
    else high = mid - 1;
  }
  return { found, mid, comparisons: steps.length, steps };
}
