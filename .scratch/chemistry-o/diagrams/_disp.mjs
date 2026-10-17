// Displayed-formula helpers for chemistry-o diagrams (my own, not the shared kit).
import * as D from "../../tools/diagram-kit.mjs";
import { C } from "./_h.mjs";

/** An atom label centred on (x, y) with a white backing so bonds stop at the label. */
export const atom = (x, y, s, o = {}) => {
  const size = o.size ?? 16;
  const w = Math.max(14, String(s).length * size * 0.62 + 4);
  return D.rect(x - w / 2, y - size * 0.62, w, size * 1.2, { fill: "#fff", stroke: "none" }) + D.text(x, y + size * 0.35, s, { anchor: "middle", size, weight: o.weight ?? 600, fill: o.fill });
};
/** A bond between (x1,y1) and (x2,y2), trimmed by `t` px at each end; order 1 or 2. */
export const bond = (x1, y1, x2, y2, o = {}) => {
  const t = o.trim ?? 11;
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L;
  const a = [x1 + ux * (o.t1 ?? t), y1 + uy * (o.t1 ?? t)];
  const b = [x2 - ux * (o.t2 ?? t), y2 - uy * (o.t2 ?? t)];
  const st = { stroke: o.stroke ?? C.ink, width: o.width ?? 2 };
  if ((o.order ?? 1) === 2) {
    const px = -uy * 3.2, py = ux * 3.2;
    return D.line(a[0] + px, a[1] + py, b[0] + px, b[1] + py, st) + D.line(a[0] - px, a[1] - py, b[0] - px, b[1] - py, st);
  }
  return D.line(a[0], a[1], b[0], b[1], st);
};
const S = 46; // bond length in px
/** Two carbons side by side (C1 at x,y; C2 at x+S) with four groups [topLeft, bottomLeft, topRight, bottomRight]; order of the C-C bond. */
export const twoCarbon = (x, y, groups, order = 1, o = {}) => {
  const [tl, bl, tr, br] = groups;
  let s = bond(x, y, x + S, y, { order });
  const put = (cx, cy, g) => (g ? bond(cx, y, cx, cy, { t1: 11, t2: 11 }) + atom(cx, cy, g, { size: o.size }) : "");
  s += put(x, y - S, tl) + put(x, y + S, bl) + put(x + S, y - S, tr) + put(x + S, y + S, br);
  s += atom(x, y, "C") + atom(x + S, y, "C");
  return s;
};
/** Square brackets with open bonds and subscript n around a two-carbon unit placed at (x, y). */
export const repeatBrackets = (x, y, o = {}) => {
  const top = y - 62, bot = y + 62, l = x - 24, r = x + S + 24, serif = 8;
  return D.polyline([[l + serif, top], [l, top], [l, bot], [l + serif, bot]], { width: 2.2 }) +
    D.polyline([[r - serif, top], [r, top], [r, bot], [r - serif, bot]], { width: 2.2 }) +
    D.line(l - 22, y, x - 11, y, { width: 2 }) + D.line(x + S + 11, y, r + 22, y, { width: 2 }) +
    D.text(r + 4, bot + 4, "n", { size: 16, weight: 700, italic: true });
};
