// Local helpers for the mathematics-o diagram pass (the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "mathematics-o";
export const LESSONS = `content/subjects/${FAMILY}/lessons`;
export const rad = (d) => (d * Math.PI) / 180;
/** Plot-style helper: svg point on a pixel plane where y grows upward (maths convention) inside box. */
export function plane(w, h, { ox = 0, oy = 0, s = 1 } = {}) {
  return { P: (x, y) => [ox + x * s, h - oy - y * s] };
}
/** Arc around (cx,cy) radius r from angle a1 to a2 (degrees, anticlockwise from east, SVG y flipped). */
export function arc(cx, cy, r, a1, a2, o = {}) {
  const p = (a) => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
  const [x1, y1] = p(a1), [x2, y2] = p(a2);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  const sweep = a2 > a1 ? 0 : 1;
  return D.path_(`M${x1.toFixed(2)},${y1.toFixed(2)} A${r},${r} 0 ${large} ${sweep} ${x2.toFixed(2)},${y2.toFixed(2)}`, { stroke: o.stroke ?? D.C.amber, width: o.width ?? 2, arrow: o.arrow });
}
/** Label at angle (degrees) and distance d from (cx,cy). */
export function polarText(cx, cy, d, a, s, o = {}) {
  return D.text(cx + d * Math.cos(rad(a)), cy - d * Math.sin(rad(a)) + 5, s, { anchor: "middle", ...o });
}
/** Small right-angle marker at vertex (x,y) with arms along directions a1, a2 (degrees). */
export function rightAngle(x, y, a1, a2, size = 12) {
  const u = [Math.cos(rad(a1)), -Math.sin(rad(a1))], v = [Math.cos(rad(a2)), -Math.sin(rad(a2))];
  const p1 = [x + u[0] * size, y + u[1] * size], p2 = [x + (u[0] + v[0]) * size, y + (u[1] + v[1]) * size], p3 = [x + v[0] * size, y + v[1] * size];
  return D.polyline([p1, p2, p3], { width: 1.6 });
}
/** Vertex label placed away from the centroid of the polygon. */
export function vlabels(pts, names, centre, d = 16, o = {}) {
  return pts.map(([x, y], i) => {
    const vx = x - centre[0], vy = y - centre[1], L = Math.hypot(vx, vy) || 1;
    return D.text(x + (vx / L) * d, y + (vy / L) * d + 5, names[i], { anchor: "middle", weight: 700, size: 16, ...o });
  }).join("");
}
export const dotp = (x, y, o) => D.dot(x, y, o);
export async function fig(name, body, w, h, alt, caption) {
  const svg = D.svg(w, h, body);
  await D.figure(FAMILY, name, svg, { alt, caption });
  return D.md(name, alt, caption);
}
export function put(lesson, after, name, alt, caption) {
  const ok = D.insertAfter(`${LESSONS}/${lesson}.md`, after, D.md(name, alt, caption));
  console.log(ok ? "inserted" : "present", lesson, name);
}

import fs from "node:fs";
/** Insert a figure on its own paragraph BEFORE the first line containing `before` (e.g. a ":::worked-solution[Example 3" opener). */
export function putBefore(lesson, before, name, alt, caption) {
  const file = `${LESSONS}/${lesson}.md`;
  const text = fs.readFileSync(file, "utf8");
  const fm = D.md(name, alt, caption);
  const ref = `media:diagrams/${name}.png`;
  if (text.includes(ref)) { console.log("present", lesson, name); return; }
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.includes(before));
  if (i < 0) throw new Error(`${file}: no line contains ${before}`);
  lines.splice(i, 0, fm, "");
  fs.writeFileSync(file, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  console.log("inserted", lesson, name);
}
