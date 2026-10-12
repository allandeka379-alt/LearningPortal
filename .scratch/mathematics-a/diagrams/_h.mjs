import fs from "node:fs";
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "mathematics-a";
export const LESSONS = `content/subjects/${FAMILY}/lessons`;
/** Draws, saves and places a figure. where: {block: "text in the ::: line"} (after that block) or {heading: "## ..."}. */
export async function fig(lesson, name, svgText, alt, caption, where) {
  await D.figure(FAMILY, name, svgText, { alt, caption });
  const p = `${LESSONS}/${lesson}.md`;
  const mdText = D.md(name, alt, caption);
  if (where.heading) return D.insertAfter(p, where.heading, mdText);
  const text = fs.readFileSync(p, "utf8");
  if (text.includes(`media:diagrams/${name}.png`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.startsWith(":::") && l.includes(where.block));
  if (i < 0) throw new Error(`${p}: no block line containing ${where.block}`);
  let j = i + 1;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", mdText, "");
  fs.writeFileSync(p, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
export const C = D.C;
export const open = (ax, a, b, stroke = C.red) => D.circle(ax.X(a), ax.Y(b), 5, { fill: "#fff", stroke });
export const PI = Math.PI;
/** Ticks at multiples of pi/k with labels. */
export const piTicks = (from, to, k) => { const out = []; for (let i = Math.ceil(from * k); i <= Math.floor(to * k + 1e-9); i += 1) out.push(i / k * PI); return out; };
export const piFmt = (v) => { const r = Math.round(v / PI * 12) / 12; const fr = { 0: "0", 1: "π", "-1": "−π", 2: "2π", "-2": "−2π", 0.5: "π/2", "-0.5": "−π/2", 1.5: "3π/2", "-1.5": "−3π/2", 0.25: "π/4", 0.75: "3π/4", 1.25: "5π/4", 1.75: "7π/4" }; return fr[r] ?? String(Math.round(v * 100) / 100); };
export const W = 540;
/** Height for equal x/y scale: ranges x, y, width w (pad r 44, l 64, t 24, b 44). */
export const eqH = (x, y, w) => Math.round(((y[1] - y[0]) * (w - 108)) / (x[1] - x[0]) + 68);
