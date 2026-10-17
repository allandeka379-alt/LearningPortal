// Shared helpers for the geography-o second diagram pass (new file; the shared kit is untouched).
import * as D from "../../tools/diagram-kit.mjs";
export const FAMILY = "geography-o";
export const L = `content/subjects/${FAMILY}/lessons`;
export const { C } = D;
export const SAND = "#e9d29a", ROCK = "#bcb6ae", SOIL = "#e9d5b8", SEA = "#cfeaf3", GRASS = "#cfe8c4", CLOUD = "#eef2f4", DCLOUD = "#cfd6db";
export const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 13, ...o });
/** Draw figure, write PNG + media entry, and insert it into the lesson after `after`. */
export async function fig(name, svgText, alt, caption, lesson, after) {
  await D.figure(FAMILY, name, svgText, { alt, caption });
  const done = D.insertAfter(`${L}/${lesson}.md`, after, D.md(name, alt, caption));
  console.log(name, done ? "inserted" : "already in lesson");
}
/** A cloud centred on (x, y), width about 70*s. */
export function cloud(x, y, s = 1, fill = CLOUD, stroke = C.muted) {
  const c = (dx, dy, r) => D.circle(x + dx * s, y + dy * s, r * s, { fill, stroke, width: 1.6 });
  return c(-22, 6, 13) + c(-6, -6, 17) + c(14, -2, 15) + c(26, 7, 11) + D.rect(x - 24 * s, y + 4 * s, 52 * s, 13 * s, { fill, stroke: "none" }) + D.line(x - 22 * s, y + 17 * s, x + 26 * s, y + 17 * s, { stroke, width: 1.6 });
}
/** Short rain strokes starting at (x, y). */
export function rain(x, y, n = 5, gap = 12, len = 16, stroke = C.blue) {
  let s = "";
  for (let i = 0; i < n; i++) s += D.line(x + i * gap, y, x + i * gap - 4, y + len, { stroke, width: 1.8 });
  return s;
}
export const sun = (x, y, r = 14) => {
  let s = D.circle(x, y, r, { fill: "#fbd779", stroke: C.amber, width: 2 });
  for (let k = 0; k < 8; k++) {
    const a = (k * Math.PI) / 4;
    s += D.line(x + (r + 4) * Math.cos(a), y + (r + 4) * Math.sin(a), x + (r + 11) * Math.cos(a), y + (r + 11) * Math.sin(a), { stroke: C.amber, width: 2 });
  }
  return s;
};
export const tree = (x, y, h = 30) => D.rect(x - 2, y - h * 0.4, 4, h * 0.4, { fill: "#8a6a3b", stroke: "none" }) + D.circle(x, y - h * 0.62, h * 0.32, { fill: "#8fc58a", stroke: C.green, width: 1.4 });
/** Filled polygon from points. */
export const poly = (pts, o = {}) => D.polyline(pts, { close: true, ...o });
import fs from "node:fs";
/** Like fig(), but inserts the figure as its own paragraph just BEFORE the first line containing `before` (a heading). */
export async function figBefore(name, svgText, alt, caption, lesson, before) {
  await D.figure(FAMILY, name, svgText, { alt, caption });
  const p = `${L}/${lesson}.md`;
  const t = fs.readFileSync(p, "utf8");
  if (t.includes(`media:diagrams/${name}.png`)) { console.log(name, "already in lesson"); return; }
  const lines = t.split("\n");
  const i = lines.findIndex((l) => l.includes(before));
  if (i < 0) throw new Error(`${p}: no line matches ${before}`);
  lines.splice(i, 0, D.md(name, alt, caption), "");
  fs.writeFileSync(p, lines.join("\n"));
  console.log(name, "inserted (before)");
}
/** Point where a ray from the centre of a w x h box at (cx, cy) towards (tx, ty) leaves the box (plus pad). */
export function edge(cx, cy, w, h, tx, ty, pad = 3) {
  const dx = tx - cx, dy = ty - cy;
  const t = Math.min(dx ? w / 2 / Math.abs(dx) : Infinity, dy ? h / 2 / Math.abs(dy) : Infinity);
  const d = Math.hypot(dx, dy);
  return [cx + dx * t + (dx / d) * pad, cy + dy * t + (dy / d) * pad];
}
