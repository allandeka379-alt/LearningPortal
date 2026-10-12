import fs from "node:fs";
import * as D from "../../tools/diagram-kit.mjs";
export { D };
export const FAMILY = "additional-mathematics-o";
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
