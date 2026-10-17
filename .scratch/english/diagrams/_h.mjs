// Shared helpers for the English / RS / heritage diagram scripts (own helpers; the shared kit is not edited).
import fs from "node:fs";
import * as D from "../../tools/diagram-kit.mjs";

export const lessonPath = (fam, p) => `content/subjects/${fam}/lessons/${p}`;

/** Greedy word wrap to about `n` characters per line. */
export function wrap(s, n) {
  const out = []; let cur = "";
  for (const w of s.split(" ")) {
    if ((cur + " " + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) out.push(cur);
  return out.join("\n");
}
export const nlines = (s) => s.split("\n").length;

/** Card with bold title and wrapped detail; returns {svg, h}. detail wrapped at `chars` characters. */
export function card(x, y, w, title, detail, o = {}) {
  const chars = o.chars ?? Math.floor((w - 20) / 7);
  const body = detail ? wrap(detail, chars) : "";
  const h = o.h ?? (title ? 30 : 12) + (body ? nlines(body) * 17 + 6 : 0) + 8;
  let s = D.rect(x, y, w, h, { fill: o.fill ?? D.C.fillBlue, r: 8, width: 1.6, stroke: o.stroke ?? D.C.ink });
  let ty = y + 21;
  if (title) { s += D.text(x + 10, ty, title, { weight: 700, size: o.size ?? 14 }); ty += 21; }
  if (body) s += D.text(x + 10, title ? ty : ty, body, { size: 13, fill: o.dfill ?? D.C.ink });
  return { svg: s, h };
}

/** Same as D.insertAfter, but if the matching line is inside a ::: block the figure goes after the block's closing ::: line. */
export function insertAfterBlock(lessonPath_, after, figureMd) {
  const text = fs.readFileSync(lessonPath_, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof after === "string" ? l.includes(after) : after.test(l)));
  if (i < 0) throw new Error(`${lessonPath_}: no line matches ${after}`);
  let open = false;
  for (let k = 0; k <= i; k += 1) if (/^:::/.test(lines[k])) open = lines[k].trim() !== ":::";
  if (!open) return D.insertAfter(lessonPath_, after, figureMd);
  let j = i + 1;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath_, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}

/** Vertical stack of rows [{label, text, fill}] with arrows between; label column left, wrapped text right. */
export function stack(rows, { w = 560, labelW = 130, chars, gap = 24, arrows = true, top = 10 } = {}) {
  let y = top, s = "";
  rows.forEach((r0, i) => {
    const r = Array.isArray(r0) ? { label: r0[0], text: r0[1], fill: r0[2] } : r0;
    const body = wrap(r.text, chars ?? Math.floor((w - 40 - labelW - 10) / 7));
    const nl = nlines(r.label);
    const h = Math.max(nlines(body) * 17 + 18, nl * 18 + 20);
    s += D.rect(20, y, w - 40, h, { fill: r.fill ?? D.C.fillBlue, r: 8, width: 1.6 });
    s += D.text(30, y + h / 2 - ((nl - 1) * 17.5) / 2 + 5, r.label, { weight: 700, size: 14 });
    s += D.text(20 + labelW + 10, y + h / 2 - ((nlines(body) - 1) * 17) / 2 + 5, body, { size: 13 });
    if (arrows && i < rows.length - 1) s += D.arrow(20 + labelW / 2, y + h, 20 + labelW / 2, y + h + gap, { width: 2 });
    y += h + gap;
  });
  return { svg: D.svg(w, y - gap + top + 4, s), h: y };
}

/** Vertical timeline: items [{date, text, fill?}]; date column left (right-aligned), spine, wrapped text right. Returns svg string. */
export function vTimeline(items, { w = 580, dateW = 150, chars, note, top = 14 } = {}) {
  const tchars = chars ?? Math.floor((w - 30 - dateW - 30) / 7);
  let y = top, s = "", spineX = 20 + dateW + 14;
  const rowsH = items.map((it) => {
    const body = wrap(it.text, tchars), dl = nlines(wrap(it.date, Math.floor(dateW / 7.4)));
    return { body, h: Math.max(nlines(body) * 17, dl * 17) + 22 };
  });
  const total = rowsH.reduce((a, r) => a + r.h, 0);
  s += D.line(spineX, top, spineX, top + total - 10, { stroke: D.C.muted, width: 3 });
  items.forEach((it, i) => {
    const { body, h } = rowsH[i];
    const dateTxt = wrap(it.date, Math.floor(dateW / 7.4));
    s += D.circle(spineX, y + 10, 7, { fill: it.fill ?? D.C.blue, stroke: D.C.ink, width: 1.5 });
    s += D.text(20 + dateW, y + 15, dateTxt, { anchor: "end", weight: 700, size: 14 });
    s += D.text(spineX + 18, y + 15, body, { size: 13 });
    y += h;
  });
  if (note) { s += D.text(20, y + 14, note, { size: 13, fill: D.C.muted, italic: true }); y += 24; }
  return D.svg(w, y + 4, s);
}
