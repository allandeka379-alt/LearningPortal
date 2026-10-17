// Local helpers for the agriculture-o diagram scripts (the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export const { C } = D;
/** A label in a white box sized to its text; anchor start|middle|end; y is the text baseline. */
export function lab(x, y, s, o = {}) {
  const size = o.size ?? 13;
  const lines = String(s).split("\n");
  const w = Math.max(...lines.map((l) => l.length)) * size * 0.47 + 10;
  const h = size * 1.25 * lines.length + 6;
  const left = o.anchor === "end" ? x - w : o.anchor === "middle" ? x - w / 2 : x;
  return D.rect(left, y - size - 2, w, h, { fill: o.bg ?? "#ffffff", stroke: o.stroke ?? C.grid, width: 1, r: 4 }) + D.text(left + 5, y, s, { size, fill: o.fill, weight: o.weight });
}
export const L = (family) => `content/subjects/${family}/lessons`;
/** Inserts a figure after the closing ":::" of the directive block that contains the line matching `anchor` (idempotent). */
import fs from "node:fs";
export function insertAfterBlock(lessonPath, anchor, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.includes(anchor));
  if (i < 0) throw new Error(`${lessonPath}: no line matches ${anchor}`);
  let j = i;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
