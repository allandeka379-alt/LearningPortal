// W4b shared helpers for slices (display strings and number blanks). Not a slice: lives in tables/.
import { sf, rnd, sfStr, dpStr, dpFor, halfUnit } from "../lib.mjs";

/** 3 s.f. display string (throws on a rounding boundary). */
export const f3 = (x) => sfStr(x, 3);
/** 3 s.f. string, throwing on a rounding boundary (keys). */
export const k3 = (x) => { sf(x, 3); return sfStr(x, 3); };
/** 4 s.f. working string. */
export const f4 = (x) => sfStr(x, 4);
/** n d.p. display string (throws on a rounding boundary). */
export const fd = (x, n = 1) => { if (Math.abs(x - Math.round(x * 10 ** n) / 10 ** n) > 1e-9) rnd(x, n); return dpStr(x, n); };
/** Number blank to 3 s.f. (or exact integer). */
export function NB(id, x, wrong, marks) {
  const isInt = Math.abs(x - Math.round(x)) < 1e-9;
  const o = { id, input: "number", accepted: [isInt ? String(Math.round(x)) : k3(x)], tolerance: isInt ? 0 : Number(halfUnit(dpFor(x, 3)).toPrecision(3)) };
  if (wrong !== undefined) o.wrong = String(wrong);
  if (marks) o.marks = marks;
  return o;
}
/** Number blank to n d.p. */
export function NBd(id, x, n, wrong, marks) {
  const o = { id, input: "number", accepted: [fd(x, n)], tolerance: Number(halfUnit(n).toPrecision(3)) };
  if (wrong !== undefined) o.wrong = String(wrong);
  if (marks) o.marks = marks;
  return o;
}
/** Number blank with explicit tolerance. */
export function NBt(id, x, tol, wrong, marks) {
  const o = { id, input: "number", accepted: [String(x)], tolerance: tol };
  if (wrong !== undefined) o.wrong = String(wrong);
  if (marks) o.marks = marks;
  return o;
}
/** Choice blank. */
export const CB = (id, choices, answer, marks) => ({ id, choices, accepted: [answer], ...(marks ? { marks } : {}) });
