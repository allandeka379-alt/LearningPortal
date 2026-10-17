// Mechanism drawing helpers for chemistry-a (local; not the shared kit).
import * as D from "../../tools/diagram-kit.mjs";
export const { C } = D;
export const F = "chemistry-a";
export const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
/** Curly arrow (full-headed, two electrons) from (x1,y1) via control (cx,cy) to (x2,y2). */
export const curly = (x1, y1, cx, cy, x2, y2, o = {}) => D.path_(`M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, { stroke: o.stroke ?? C.blue, width: o.width ?? 2.2, arrow: true });
/** Group label centred at (x, cy) with optional charge shown as superscript. */
export function grp(x, cy, s, charge, o = {}) {
  const size = o.size ?? 17;
  let r = D.text(x, cy + 6, s, { anchor: "middle", size, weight: o.weight, fill: o.fill });
  if (charge) r += D.text(x + (o.cx ?? s.length * size * 0.3 + 2), cy - 5, charge, { anchor: "start", size: 13, weight: 700, fill: o.fill });
  return r;
}
export const bond = (x1, y1, x2, y2, o = {}) => D.line(x1, y1, x2, y2, { width: 2, ...o });
/** Double bond (horizontal or vertical offset) */
export function dbl(x1, y1, x2, y2, gap = 4) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = (-dy / l) * gap, ny = (dx / l) * gap;
  return D.line(x1 + nx, y1 + ny, x2 + nx, y2 + ny, { width: 2 }) + D.line(x1 - nx, y1 - ny, x2 - nx, y2 - ny, { width: 2 });
}
/** Lone pair dots above (a='up'), below, left, right of an atom centre. */
export function lp(x, y, side = "up", r = 17) {
  const o = { up: [0, -r, 5, 0], down: [0, r, 5, 0], left: [-r, 0, 0, 5], right: [r, 0, 0, 5] }[side];
  return D.dot(x + o[0] - o[2], y + o[1] - o[3], { r: 2.4 }) + D.dot(x + o[0] + o[2], y + o[1] + o[3], { r: 2.4 });
}
/** Reaction arrow with an optional label above. */
export const rxn = (x1, y, x2, label) => D.arrow(x1, y, x2, y, { width: 2.2 }) + (label ? D.text((x1 + x2) / 2, y - 8, label, { anchor: "middle", size: 13, fill: C.muted }) : "");
export const note = (x, y, s, o = {}) => D.text(x, y, s, { size: 14, fill: C.muted, ...o });
export async function fig(name, w, h, body, alt, cap, lesson, after) {
  await D.figure(F, name, D.svg(w, h, body), { alt, caption: cap });
  const ok = D.insertAfter(L(lesson), after, D.md(name, alt, cap));
  console.log(name, ok ? "inserted" : "already there");
}
/** Pointy-top hexagon vertices, angle 90 first then clockwise. */
export const hexV = (cx, cy, r) => [90, 30, -30, -90, -150, 150].map((a) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)]);
/** Benzene ring: hexagon with delocalised circle. */
export const ring = (cx, cy, r = 45) => D.polyline(hexV(cx, cy, r), { close: true, width: 2 }) + D.circle(cx, cy, r * 0.58, { width: 1.8 });
/** Intermediate ring: hexagon plus a horseshoe arc over the five carbons (open at the top) and a + inside. */
export function cation(cx, cy, r = 45) {
  const q = r * 0.62, p = (a) => [cx + q * Math.cos((a * Math.PI) / 180), cy - q * Math.sin((a * Math.PI) / 180)];
  const [x1, y1] = p(50), [x2, y2] = p(130);
  return D.polyline(hexV(cx, cy, r), { close: true, width: 2 }) + D.path_(`M${x1},${y1} A${q},${q} 0 1 1 ${x2},${y2}`, { width: 1.8 }) + D.text(cx, cy + 6, "+", { anchor: "middle", size: 17, weight: 700 });
}
