// Extra helpers for the second mathematics-o diagram pass (own file; shared kit untouched).
import { D, fig, put, putBefore, arc, rightAngle, polarText, vlabels, rad } from "./lib.mjs";
export { D, fig, put, putBefore, arc, rightAngle, polarText, vlabels, rad };
export const C = D.C;
export const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });
export const ln = (a, b, o = {}) => D.line(a[0], a[1], b[0], b[1], { width: 2.2, ...o });
export const dt = (p, o = {}) => D.dot(p[0], p[1], { r: 4, ...o });
export const poly = (pts, o = {}) => D.polyline(pts, { close: true, width: 2.4, ...o });
/** Horizontal number line at pixel y from data a..b mapped to x0..x1. Returns {svg, X}. */
export function numberLine(y, a, b, x0, x1, o = {}) {
  const X = (v) => x0 + ((v - a) / (b - a)) * (x1 - x0);
  let s = D.line(x0 - 10, y, x1 + 14, y, { stroke: C.axis, width: 1.8, arrow: true });
  for (let v = a; v <= b; v += 1) s += D.line(X(v), y - 5, X(v), y + 5, { stroke: C.axis, width: 1.4 }) + D.text(X(v), y + 22, String(v).replace("-", "\u2212"), { anchor: "middle", size: 13, fill: C.muted });
  return { svg: s, X };
}
import fs from "node:fs";
import { LESSONS } from "./lib.mjs";
/** Like put(), but if the figure is already in the lesson its Markdown line is refreshed (alt/caption edits). */
export function place(lesson, after, name, alt, caption, { before = false } = {}) {
  const file = `${LESSONS}/${lesson}.md`;
  const ref = `(media:diagrams/${name}.png`;
  const text = fs.readFileSync(file, "utf8");
  const md = D.md(name, alt, caption);
  if (text.includes(ref)) {
    const lines = text.split("\n").map((l) => (l.includes(ref) && l.startsWith("![") ? md : l));
    fs.writeFileSync(file, lines.join("\n"));
    console.log("refreshed", lesson, name);
  } else if (before) putBefore(lesson, after, name, alt, caption);
  else put(lesson, after, name, alt, caption);
}
