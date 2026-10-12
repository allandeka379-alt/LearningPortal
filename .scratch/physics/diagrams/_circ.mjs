// Shared circuit helpers for physics-o diagrams (own helpers; the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
const { C, line, rect, circle, text, polyline, dot, arrow } = D;

export const S = {
  varRes: (x, y) => D.sym.resistor(x, y) + arrow(x - 20, y + 18, x + 20, y - 18, { width: 1.8 }),
  heater: (x, y) => D.sym.resistor(x, y) + line(x - 7, y - 9, x - 7, y + 9, { width: 1.5 }) + line(x + 7, y - 9, x + 7, y + 9, { width: 1.5 }),
  thermistor: (x, y) => D.sym.resistor(x, y) + polyline([[x - 14, y + 14], [x + 8, y - 14], [x + 16, y - 14]], { width: 1.8 }),
  ldr: (x, y) => line(x - 30, y, x - 22, y) + line(x + 22, y, x + 30, y) + circle(x, y, 26, { fill: "#fff", width: 1.6 }) + rect(x - 14, y - 8, 28, 16, { fill: "#fff", width: 1.8 }) + line(x - 22, y, x - 14, y, { width: 1.8 }) + line(x + 14, y, x + 22, y, { width: 1.8 }) +
    arrow(x - 36, y - 36, x - 16, y - 14, { width: 1.6 }) + arrow(x - 24, y - 40, x - 4, y - 18, { width: 1.6 }),
  fuse: (x, y) => D.sym.resistor(x, y) + line(x - 22, y, x + 22, y, { width: 1.5 }),
  pot: (x, y) => D.sym.resistor(x, y) + arrow(x, y - 34, x, y - 10, { width: 1.8 }),
  led: (x, y) => D.sym.diode(x, y) + arrow(x - 2, y - 14, x + 12, y - 30, { width: 1.5 }) + arrow(x + 8, y - 10, x + 22, y - 26, { width: 1.5 }),
  battery: (x, y) => line(x - 30, y, x - 17, y) + line(x - 17, y - 16, x - 17, y + 16, { width: 2.5 }) + line(x - 7, y - 9, x - 7, y + 9, { width: 5 }) + line(x - 7, y, x + 7, y) + line(x + 7, y - 16, x + 7, y + 16, { width: 2.5 }) + line(x + 17, y - 9, x + 17, y + 9, { width: 5 }) + line(x + 17, y, x + 30, y),
  dcSupply: (x, y) => line(x - 30, y, x - 16, y) + circle(x - 9, y, 7, { fill: "#fff", width: 1.8 }) + circle(x + 9, y, 7, { fill: "#fff", width: 1.8 }) + line(x + 16, y, x + 30, y) + text(x - 9, y - 12, "+", { anchor: "middle", size: 13, weight: 700 }) + text(x + 9, y - 12, "−", { anchor: "middle", size: 13, weight: 700 }),
};
export const W = (...pts) => D.sym.wire(pts);
export const J = (x, y) => D.sym.junction(x, y);
/** Label centred at (x, y). */
export const lab = (x, y, s, o = {}) => text(x, y, s, { anchor: "middle", size: 15, ...o });
/** Voltmeter in parallel with a horizontal component spanning [x1, x2] at y, drawn above at y - up. */
export function vAcross(x1, x2, y, up, letter = "V") {
  const xm = (x1 + x2) / 2, ym = y - up;
  return W([x1, y], [x1, ym], [xm - 30, ym]) + W([xm + 30, ym], [x2, ym], [x2, y]) + D.sym.meter(xm, ym, letter) + J(x1, y) + J(x2, y);
}
