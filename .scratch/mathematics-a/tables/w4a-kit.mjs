// W4a shared helpers for slices (kept in tables/ so the build never treats it as a slice).
import { sf, sfStr, dpStr, dpFor, halfUnit, rnd } from "../lib.mjs";


// Display only: typed answers are guarded by the builders (num/calc) and by S()/A() blanks.
export const f3 = (x, n = 3) => sfStr(x, n);
/** 1 d.p. display string. */
export const d1 = (x, dp = 1) => dpStr(x, dp);
const extra = (wrong, marks) => ({ ...(wrong !== undefined ? { wrong: String(wrong) } : {}), ...(marks ? { marks } : {}) });
/** Exact number blank. */
export const N = (id, x, wrong, marks) => ({ id, input: "number", accepted: [String(x)], ...extra(wrong, marks) });
/** Number blank to n s.f. (tolerance half a unit in the last figure). */
export const S = (id, x, wrong, marks, n = 3) => {
  if (Math.abs(x - Math.round(x)) < 1e-12) return N(id, Math.round(x), wrong, marks);
  sf(x, n);
  return { id, input: "number", accepted: [sfStr(x, n)], tolerance: Number(halfUnit(dpFor(x, n)).toPrecision(3)), ...extra(wrong, marks) };
};
/** Number blank to dp decimal places (angles: 1 d.p.). */
export const A = (id, x, wrong, marks, dp = 1) => {
  rnd(x, dp);
  return { id, input: "number", accepted: [dpStr(x, dp)], tolerance: Number(halfUnit(dp).toPrecision(3)), ...extra(wrong, marks) };
};
/** 3 s.f. display string without the boundary guard (for wrong values and distractors only). */
export const g3 = (x, n = 3) => sfStr(x, n);
