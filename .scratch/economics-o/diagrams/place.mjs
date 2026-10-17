// Block-aware placement: puts a figure after the paragraph of the anchor line, or after the closing ::: of the
// directive block that contains it (a figure must never sit inside a ::: block). Idempotent.
import fs from "node:fs";
import { D, FAMILY, lesson } from "./common.mjs";

export function placeOutsideBlock(lessonRel, anchor, figureMd) {
  const p = lesson(lessonRel);
  const text = fs.readFileSync(p, "utf8");
  const ref = /\(media:([^ )]+)/.exec(figureMd)?.[1];
  if (ref && text.includes(`media:${ref}`)) return false;
  const lines = text.split("\n");
  const i = lines.findIndex((l) => (typeof anchor === "string" ? l.includes(anchor) : anchor.test(l)));
  if (i < 0) throw new Error(`${p}: no line matches ${anchor}`);
  let depth = 0;
  for (let k = 0; k <= i; k += 1) {
    if (/^:::\S/.test(lines[k])) depth += 1;
    else if (/^:::\s*$/.test(lines[k])) depth -= 1;
  }
  let j = i + 1;
  if (depth > 0) {
    while (j < lines.length && depth > 0) {
      if (/^:::\S/.test(lines[j])) depth += 1;
      else if (/^:::\s*$/.test(lines[j])) depth -= 1;
      j += 1;
    }
  } else {
    while (j < lines.length && lines[j].trim() !== "" && !/^#{1,6}\s/.test(lines[j]) && !/^:::/.test(lines[j])) j += 1;
  }
  lines.splice(j, 0, "", figureMd, "");
  fs.writeFileSync(p, lines.join("\n").replace(/\n{3,}/g, "\n\n"));
  return true;
}

/** Write the figure and place it (block-aware). */
export async function putB(name, svg, alt, caption, lessonRel, anchor) {
  await D.figure(FAMILY, name, svg, { alt, caption });
  placeOutsideBlock(lessonRel, anchor, D.md(name, alt, caption));
  console.log("ok", name);
}
