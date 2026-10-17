// Shared helpers for biology-o diagram scripts (own file; the kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "biology-o";
export const LES = (p) => `content/subjects/${FAMILY}/lessons/${p}.md`;
export const C = D.C;
/** Label text at (tx,ty) with a leader line from the text edge to (x,y). anchor start|end|middle. */
export function call(tx, ty, label, x, y, o = {}) {
  const anchor = o.anchor ?? "start";
  const size = o.size ?? 14;
  const sx = anchor === "start" ? tx - 4 : anchor === "end" ? tx + 4 : tx;
  const sy = o.fromY ?? ty - size * 0.35;
  return D.line(sx, sy, x, y, { stroke: o.stroke ?? C.muted, width: 1.3 }) + D.dot(x, y, { r: 2.4, fill: C.ink, stroke: C.ink }) + D.text(tx, ty, label, { anchor, size, fill: o.fill });
}
export const title = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, weight: 700, ...o });
export const ell = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"${o.rotate ? ` transform="rotate(${o.rotate} ${cx} ${cy})"` : ""}/>`;

import fs from "node:fs";
/**
 * Like D.insertAfter, but when the matched paragraph is the last thing inside a ::: directive block (worked solution,
 * example, key fact), the figure goes after the closing ::: line so it is never inside the block. Idempotent.
 */
export function place(lessonPath, after, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof after === "string" ? l.includes(after) : after.test(l)));
  if (i < 0) throw new Error(`${lessonPath}: no line matches ${after}`);
  let j = i + 1;
  if (/^#{1,6}\s/.test(lines[i])) while (j < lines.length && lines[j].trim() === "") j += 1;
  while (j < lines.length && lines[j].trim() !== "" && !/^#{1,6}\s/.test(lines[j]) && !/^:::/.test(lines[j])) j += 1;
  if (lines[j] !== undefined && /^:::\s*$/.test(lines[j]) && !/^:::\s*$/.test(lines[i])) {
    // we are inside a block: move past the closing line
    j += 1;
  }
  lines.splice(j, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
