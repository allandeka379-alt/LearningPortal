// Shared helpers for the computer-science-a diagram scripts (own file; the shared kit is untouched).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAM = "computer-science-a";
export const L = (p) => `content/subjects/${FAM}/lessons/${p}.md`;
const { C, line, text, rect, circle, path_, polyline } = D;

/** Make a figure and insert it into a lesson (idempotent). */
export async function fig(name, svgText, alt, caption, lesson, after) {
  await D.figure(FAM, name, svgText, { alt, caption });
  const ok = D.insertAfter(L(lesson), after, D.md(name, alt, caption));
  console.log(name, ok ? "inserted" : "already there");
}

/**
 * Logic gate drawn with its left edge at x and vertical centre at y.
 * Returns { svg, in1, in2, in, out } (points to wire to).
 */
export function gate(type, x, y, o = {}) {
  const st = { fill: "#fff", width: 2 };
  let body = "", ox = x, bubble = false;
  const in1 = [x, y - 11], in2 = [x, y + 11];
  let stub = 0;
  switch (type) {
    case "AND": case "NAND":
      body = path_(`M${x},${y - 22} H${x + 26} A22 22 0 0 1 ${x + 26},${y + 22} H${x} Z`, st); ox = x + 48; bubble = type === "NAND"; break;
    case "OR": case "NOR":
      body = path_(`M${x},${y - 22} Q${x + 34},${y - 22} ${x + 54},${y} Q${x + 34},${y + 22} ${x},${y + 22} Q${x + 14},${y} ${x},${y - 22} Z`, st); ox = x + 54; bubble = type === "NOR"; stub = 5; break;
    case "XOR": case "XNOR":
      body = path_(`M${x + 7},${y - 22} Q${x + 41},${y - 22} ${x + 61},${y} Q${x + 41},${y + 22} ${x + 7},${y + 22} Q${x + 21},${y} ${x + 7},${y - 22} Z`, st) +
        path_(`M${x},${y - 22} Q${x + 14},${y} ${x},${y + 22}`, { width: 2 }); ox = x + 61; bubble = type === "XNOR"; stub = 5; break;
    case "NOT":
      body = polyline([[x, y - 18], [x, y + 18], [x + 38, y]], { ...st, close: true }) + circle(x + 43, y, 5, st); ox = x + 48; break;
    default: throw new Error(type);
  }
  let svg = body;
  if (stub) svg += line(x, y - 11, x + stub, y - 11) + line(x, y + 11, x + stub, y + 11);
  if (bubble) { svg += circle(ox + 5, y, 5, st); ox += 10; }
  return { svg, in1, in2, in: [x, y], out: [ox, y], right: ox };
}
/** Orthogonal wire through points. */
export const wire = (pts, o = {}) => polyline(pts, { width: 2, ...o });
export const dotAt = (x, y) => D.dot(x, y, { r: 4 });
export const lab = (x, y, s, o = {}) => text(x, y, s, { size: 15, ...o });
/** Boolean functions for truth tables. */
export const F = {
  AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b),
  XOR: (a, b) => a ^ b, XNOR: (a, b) => 1 - (a ^ b), NOT: (a) => 1 - a,
};
/** A small truth table drawn in SVG. cols: header names; rows: arrays; hi: column index to emphasise. */
export function table(x, y, cols, rows, o = {}) {
  const cw = o.cw ?? 30, rh = o.rh ?? 22, size = o.size ?? 14;
  const w = cols.length * cw;
  let s = rect(x, y, w, rh, { fill: C.fillGrey, stroke: C.axis, width: 1 });
  cols.forEach((c, i) => { s += text(x + i * cw + cw / 2, y + rh * 0.7, c, { anchor: "middle", size, weight: 700 }); });
  rows.forEach((r, j) => {
    s += rect(x, y + rh * (j + 1), w, rh, { fill: "#fff", stroke: C.axis, width: 1 });
    r.forEach((v, i) => { s += text(x + i * cw + cw / 2, y + rh * (j + 1.7), String(v), { anchor: "middle", size, weight: o.hi === i ? 700 : 400, fill: o.hi === i ? C.blue : C.ink }); });
  });
  for (let i = 1; i < cols.length; i += 1) s += line(x + i * cw, y, x + i * cw, y + rh * (rows.length + 1), { stroke: C.axis, width: 1 });
  return s;
}
export const bin2 = [[0, 0], [0, 1], [1, 0], [1, 1]];

import fs from "node:fs";
/** Like fig(), but inserts the figure as its own paragraph BEFORE the first line containing `before`. */
export async function figBefore(name, svgText, alt, caption, lesson, before) {
  await D.figure(FAM, name, svgText, { alt, caption });
  const p = L(lesson);
  const text = fs.readFileSync(p, "utf8");
  if (text.includes(`media:diagrams/${name}.png`)) { console.log(name, "already there"); return; }
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof before === "string" ? l.includes(before) : before.test(l)));
  if (i < 0) throw new Error(`${p}: no line matches ${before}`);
  lines.splice(i, 0, D.md(name, alt, caption), "");
  fs.writeFileSync(p, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  console.log(name, "inserted");
}
