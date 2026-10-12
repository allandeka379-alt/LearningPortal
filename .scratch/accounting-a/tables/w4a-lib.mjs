// W4a helpers shared by the W4a slices and lesson generators.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fmt, money, r2 } from "../lib.mjs";

export const ROOT = fileURLToPath(new URL("../../../content/subjects/accounting-a/", import.meta.url));
export const F = fmt;
export const usd = money;
export const p0 = (v) => String(Math.round(v));
export const p1 = (v) => (Math.round((v + Number.EPSILON) * 10) / 10).toFixed(1);
export const p2 = (v) => (Math.round((v + Number.EPSILON) * 100) / 100).toFixed(2);

/** Shorthand MCQ: ok = [content, rationale]; bad = three [content, rationale]. The build rebalances the key position. */
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}

/** Writes a lesson file: front matter JSON + body; prints the word count outside tables and block syntax. */
export function writeLesson(relPath, front, body) {
  const path = ROOT + "lessons/" + relPath;
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, "---\n" + JSON.stringify(front, null, 2) + "\n---\n" + body.trim() + "\n");
  const words = body.split("\n").filter((l) => !l.startsWith("|") && !l.startsWith(":::")).join(" ").split(/\s+/).filter(Boolean).length;
  console.log(`${relPath}: ${words} words (excluding tables)`);
  return words;
}
export const front = (key, title, summary, concept, minutes, free = false) => {
  const o = { key, title, summary, concepts: [concept], estimatedMinutes: minutes };
  if (free) o.freePreview = true;
  o.level = "core";
  return o;
};
export { r2 };
