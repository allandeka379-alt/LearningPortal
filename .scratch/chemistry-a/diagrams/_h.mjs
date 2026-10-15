// Local helpers for chemistry-a diagram scripts (not part of the shared kit).
import * as D from "../../tools/diagram-kit.mjs";
export const { C } = D;
/** Atom label: white disc with element symbol. */
export const atom = (x, y, s, o = {}) => D.circle(x, y, o.r ?? 14, { fill: o.fill ?? "#fff", stroke: o.stroke ?? C.ink, width: 1.6 }) + D.text(x, y + 5, s, { anchor: "middle", size: o.size ?? 15, weight: 700, fill: o.color });
/** Solid wedge from (x1,y1) (point) to (x2,y2) (wide end). */
export function wedge(x1, y1, x2, y2, w = 9) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), nx = (-dy / l) * w, ny = (dx / l) * w;
  return D.polyline([[x1, y1], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny]], { fill: C.ink, close: true, width: 1 });
}
/** Hashed wedge. */
export function hash(x1, y1, x2, y2, w = 9, k = 6) {
  const dx = x2 - x1, dy = y2 - y1, l = Math.hypot(dx, dy), ux = dx / l, uy = dy / l;
  let s = "";
  for (let i = 1; i <= k; i += 1) {
    const t = i / k, px = x1 + dx * t, py = y1 + dy * t, ww = w * t;
    s += D.line(px - uy * ww, py + ux * ww, px + uy * ww, py - ux * ww, { width: 1.6 });
  }
  return s;
}
/** Point at distance r and angle a (deg, 0 = right, counter-clockwise on screen i.e. up positive). */
export const pol = (cx, cy, r, a) => [cx + r * Math.cos((a * Math.PI) / 180), cy - r * Math.sin((a * Math.PI) / 180)];
/** Pair of lone-pair dots at angle a around (cx, cy), distance r. */
export function lone(cx, cy, r, a) {
  const [x, y] = pol(cx, cy, r, a), nx = -Math.sin((a * Math.PI) / 180) * 4, ny = -Math.cos((a * Math.PI) / 180) * 4;
  return D.dot(x + nx, y + ny, { r: 2.6 }) + D.dot(x - nx, y - ny, { r: 2.6 });
}
export const L = (F) => (p) => `content/subjects/${F}/lessons/${p}.md`;
