// Shared helpers for the business-a diagram scripts (own file; the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export const C = D.C;
export const FAM = "business-a";
export const L = (p) => `content/subjects/business-a/lessons/${p}.md`;

/** Tree layout. tree = { label, children?, fill? }. Returns { body, width, height, nodes } (nodes carry cx, y, depth). */
export function tree(root, { bw = 112, bh = 56, gx = 10, gy = 44, x0 = 12, y0 = 12, size = 13 } = {}) {
  let cursor = x0;
  const nodes = [];
  const place = (t, depth) => {
    t.depth = depth;
    if (!t.children || !t.children.length) { t.cx = cursor + bw / 2; cursor += bw + gx; }
    else { t.children.forEach((c) => place(c, depth + 1)); t.cx = (t.children[0].cx + t.children.at(-1).cx) / 2; }
    nodes.push(t);
  };
  place(root, 0);
  const maxDepth = Math.max(...nodes.map((n) => n.depth));
  let body = "";
  for (const t of nodes) {
    t.y = y0 + t.depth * (bh + gy);
    for (const c of t.children ?? []) {
      const yy = y0 + c.depth * (bh + gy);
      const mid = t.y + bh + gy / 2;
      body += D.polyline([[t.cx, t.y + bh], [t.cx, mid], [c.cx, mid], [c.cx, yy]], { stroke: C.axis, width: 1.6 });
    }
  }
  for (const t of nodes) body += D.node(t.cx - bw / 2, t.y, bw, bh, t.label, { fill: t.fill ?? C.fillBlue, size });
  return { body, width: cursor - gx + x0, height: y0 + (maxDepth + 1) * bh + maxDepth * gy + 12, nodes };
}

import fs from "node:fs";
/** Like D.insertAfter but when the matched line sits inside a ::: block, the figure goes after the block's closing ::: line. */
export function insertAfterBlock(lessonPath, after, figureMd) {
  const text = fs.readFileSync(lessonPath, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof after === "string" ? l.includes(after) : after.test(l)));
  if (i < 0) throw new Error(`${lessonPath}: no line matches ${after}`);
  let j = i + 1;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", figureMd, "");
  fs.writeFileSync(lessonPath, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}

/** Idempotent placement that also refreshes alt/caption: replaces an existing figure line, else inserts (block-aware). */
export function place(lessonPath, after, figureMd, { block = false } = {}) {
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  const text = fs.readFileSync(lessonPath, "utf8");
  const lines = text.split("\n");
  const k = lines.findIndex((l) => l.startsWith("![") && l.includes(`(media:${ref}`));
  if (k >= 0) { lines[k] = figureMd; fs.writeFileSync(lessonPath, lines.join("\n")); return "replaced"; }
  return (block ? insertAfterBlock : D.insertAfter)(lessonPath, after, figureMd) ? "inserted" : "skipped";
}
