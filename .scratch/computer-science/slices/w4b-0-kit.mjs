// Shared helpers for the w4b- slices and tables scripts (no concept modules here; importing it registers nothing).
// JS mirrors of the 0478 library routines and string functions, so every printed value is computed.
import { traceTable } from "../lib.mjs";

export const fence = (s) => "```\n" + s + "\n```";
export const C = (k) => `comp.${k}`;
export const sum = (a) => a.reduce((s, x) => s + x, 0);

/** 0478 routines (positions start at 1). */
export const LENGTH = (s) => s.length;
export const SUBSTRING = (s, start, len) => {
  if (start < 1 || len < 0 || start - 1 + len > s.length) throw new Error(`SUBSTRING("${s}", ${start}, ${len}) out of range`);
  return s.substr(start - 1, len);
};
export const UCASE = (s) => s.toUpperCase();
export const LCASE = (s) => s.toLowerCase();
export const DIV = (a, b) => {
  if (a < 0 || b <= 0) throw new Error("DIV: keep to non-negative operands");
  return Math.floor(a / b);
};
export const MOD = (a, b) => {
  if (a < 0 || b <= 0) throw new Error("MOD: keep to non-negative operands");
  return a % b;
};
/** ROUND(x, places), half away from zero, computed on a decimal string to avoid binary surprises. */
export const ROUND = (x, places) => {
  const f = 10 ** places;
  const v = Math.sign(x) * Math.round(Math.abs(x) * f + 1e-9) / f;
  return Number(v.toFixed(places));
};

/**
 * Runs `run(rec)`; each rec(state) call adds one row (state holds every column; OUTPUT undefined when nothing is
 * output). Returns traceTable's { md, rows } plus the raw snapshots. Blank cells = value unchanged.
 */
export function recordTrace(cols, run) {
  const snaps = [];
  run((s) => snaps.push({ ...s }));
  let i = 0;
  const t = traceTable(cols, snaps[0], () => (++i < snaps.length ? { ...snaps[i] } : null));
  return { ...t, snaps };
}

export const mdTable = (head, rows) => [`| ${head.join(" | ")} |`, `|${head.map(() => ":-:").join("|")}|`, ...rows.map((r) => `| ${r.join(" | ")} |`)].join("\n");
/** 1D array shown as an index/value table. */
export const arrayMd = (name, a) => mdTable(["Index", ...a.map((_, i) => String(i + 1))], [[name, ...a.map(String)]]);
/** 2D array shown with row and column indexes. */
export const array2Md = (name, a) => mdTable([`${name}`, ...a[0].map((_, j) => `Column ${j + 1}`)], a.map((row, i) => [`Row ${i + 1}`, ...row.map(String)]));
/** Characters of a string with their positions. */
export const charsMd = (s) => mdTable(["Position", ...[...s].map((_, i) => String(i + 1))], [["Character", ...[...s].map((c) => (c === " " ? "(space)" : c))]]);
