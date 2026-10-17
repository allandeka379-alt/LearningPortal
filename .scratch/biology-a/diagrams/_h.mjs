// Local helpers for biology-a diagram scripts (not part of the shared kit).
import * as D from "../../tools/diagram-kit.mjs";
export const { C } = D;
export const F = "biology-a";
export const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
/** Smooth monotone cubic (Fritsch-Carlson) path through pixel points with increasing x: never overshoots the data. */
export function smooth(pts, o = {}) {
  const n = pts.length, dx = [], m = [], t = new Array(n).fill(0);
  for (let i = 0; i < n - 1; i += 1) { dx.push(pts[i + 1][0] - pts[i][0]); m.push((pts[i + 1][1] - pts[i][1]) / dx[i]); }
  t[0] = m[0]; t[n - 1] = m[n - 2];
  for (let i = 1; i < n - 1; i += 1) t[i] = m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2;
  for (let i = 0; i < n - 1; i += 1) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i], b = t[i + 1] / m[i], h = Math.hypot(a, b);
    if (h > 3) { t[i] = (3 * a * m[i]) / h; t[i + 1] = (3 * b * m[i]) / h; }
  }
  let d = `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n - 1; i += 1) {
    const [x1, y1] = pts[i], [x2, y2] = pts[i + 1], h = dx[i] / 3;
    d += ` C${(x1 + h).toFixed(1)},${(y1 + t[i] * h).toFixed(1)} ${(x2 - h).toFixed(1)},${(y2 - t[i + 1] * h).toFixed(1)} ${x2.toFixed(1)},${y2.toFixed(1)}`;
  }
  return D.path_(d, { stroke: C.blue, width: 2.6, ...o });
}
/** Smooth curve through DATA points of an axes object. */
export const curve = (ax, pts, o = {}) => smooth(pts.map(([a, b]) => [ax.X(a), ax.Y(b)]), o);
/** Ellipse. */
export const ellipse = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.dash ? ' stroke-dasharray="6 5"' : ""}${o.rotate ? ` transform="rotate(${o.rotate} ${cx} ${cy})"` : ""}/>`;
/** Label with a leader line: text at (tx,ty), line to (px,py). */
export function callout(tx, ty, s, px, py, o = {}) {
  const anchor = o.anchor ?? (tx < px ? "end" : "start");
  const lines = String(s).split("\n").length;
  const sx = anchor === "end" ? tx + 3 : tx - 3;
  return D.line(sx, ty - 4 - (lines - 1) * 6, px, py, { stroke: C.muted, width: 1.2 }) + D.text(tx, ty, s, { anchor, size: o.size ?? 13 });
}
export const fig = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(F, name, svg, { alt, caption: cap });
  const r = D.insertAfter(L(lesson), after, D.md(name, alt, cap));
  console.log(name, r ? "inserted" : "already present");
};
