// Local helpers for the economics-a diagram scripts (the shared kit is not edited).
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "economics-a";
export const LESSONS = `content/subjects/${FAMILY}/lessons`;
export const lesson = (p) => `${LESSONS}/${p}.md`;
export const { C } = D;
export const lab = (ax, x, y, s, o = {}) => ax.label(x, y, s, { weight: 700, ...o });
export const dotted = (ax, pts, o = {}) => ax.line(pts, o) + pts.map(([a, b]) => ax.point(a, b, { stroke: o.stroke ?? C.blue, r: 3.5 })).join("");
export const seg = (f, x0, x1) => [[x0, f(x0)], [x1, f(x1)]];
/** Write the figure and insert it after the anchor. */
export async function put(name, svg, alt, caption, lessonPath, anchor) {
  await D.figure(FAMILY, name, svg, { alt, caption });
  D.insertAfter(lesson(lessonPath), anchor, D.md(name, alt, caption));
  console.log("ok", name);
}
/** Dashed grey segment through data points. */
export const dash = (ax, pts, o = {}) => ax.line(pts, { stroke: C.muted, width: 1.4, dash: true, ...o });

/** Like put() but inserts the figure after the closing ::: of the block that contains (or follows) the anchor line. */
import fs from "node:fs";
export async function putAfterBlock(name, svg, alt, caption, lessonPath, anchor) {
  await D.figure(FAMILY, name, svg, { alt, caption });
  const file = lesson(lessonPath);
  const text = fs.readFileSync(file, "utf8");
  if (text.includes(`media:diagrams/${name}.png`)) { console.log("exists", name); return; }
  const lines = text.split("\n");
  const i = lines.findIndex((l) => l.includes(anchor));
  if (i < 0) throw new Error(`${file}: no line matches ${anchor}`);
  let j = i + 1;
  while (j < lines.length && lines[j].trim() !== ":::") j += 1;
  lines.splice(j + 1, 0, "", D.md(name, alt, caption), "");
  fs.writeFileSync(file, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  console.log("ok", name);
}
