// Small shared helpers for the business-commerce-o diagram scripts (own helpers; the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";

export const FAM = "business-commerce-o";
export const L = (p) => `content/subjects/${FAM}/lessons/${p}`;

/** Box with a bold title line and muted detail lines, left aligned. */
export function card(x, y, w, h, title, detail = "", o = {}) {
  let s = D.rect(x, y, w, h, { fill: o.fill ?? D.C.fillBlue, r: 8, stroke: o.stroke ?? D.C.ink, width: o.width ?? 1.6 });
  s += D.text(x + 10, y + 20, title, { size: o.size ?? 14, weight: 700 });
  if (detail) s += D.text(x + 10, y + 20 + (o.size ?? 14) * 1.35, detail, { size: o.dsize ?? 13, fill: D.C.muted });
  return s;
}

/** Bar chart with multi-line labels; bars: [{label, value, fill, text?}] ; negative values allowed. */
export function bars(bs, { w = 560, h = 380, yMin = 0, yMax, yTicks, yLabel, fmt = (v) => v.toLocaleString("en-GB"), pad = {}, labelGap = 22 }) {
  const ax = D.axes({ x: [0, bs.length], y: [yMin, yMax], w, h, yLabel, xTicks: [], origin: yMin < 0, arrows: false, yTicks, pad: { b: 70, ...pad } });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.56;
  bs.forEach((e, i) => {
    const cx = ax.X(i + 0.5);
    const top = ax.Y(Math.max(e.value, e.base ?? 0)), bot = ax.Y(Math.min(e.value, e.base ?? 0));
    const y0 = e.from === undefined ? ax.Y(Math.max(0, yMin)) : ax.Y(e.from);
    const yA = Math.min(ax.Y(e.value), y0), yB = Math.max(ax.Y(e.value), y0);
    b += D.rect(cx - bw / 2, yA, bw, yB - yA, { fill: e.fill ?? D.C.teal, stroke: D.C.ink, width: 1 });
    const above = e.value >= (e.from ?? 0);
    b += D.text(cx, above ? yA - 6 : yB + 16, e.text ?? fmt(e.value), { anchor: "middle", size: 13, weight: 700 });
    b += D.text(cx, ax.Y(yMin) + labelGap, e.label, { anchor: "middle", size: 13 });
  });
  return { svg: D.svg(w, h, b), ax };
}

import fs from "node:fs";
/** Like D.insertAfter but never places the figure inside a ::: block: if the matched line is in (or opens) a block, the figure goes after the block's closing ::: line. */
export function insertAfterBlock(lessonPath, after, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof after === "string" ? l.includes(after) : after.test(l)));
  if (i < 0) throw new Error(`${lessonPath}: no line matches ${after}`);
  let open = false;
  for (let k = 0; k <= i; k += 1) if (/^:::/.test(lines[k])) open = lines[k].trim() !== ":::";
  if (!open) return D.insertAfter(lessonPath, after, figureMd);
  let j = i + 1;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}
