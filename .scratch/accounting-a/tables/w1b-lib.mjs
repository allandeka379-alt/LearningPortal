// Shared helpers for the W1b lessons and slices (not imported by the build unless a slice imports it).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const U = "US\\$";
/** Multiple choice with the correct option written first: right = [content, rationale]; wrong = [[content, rationale], ...]. The build rebalances the key positions. */
export const mc = (b, o) => b.mcq({ ...o, options: [o.right, ...o.wrong], answer: "A" });

/** Writes a lesson file: front matter (JSON) + body. Reports the prose word count (tables, block markers excluded). */
export function writeLesson(rel, front, body) {
  const path = `content/subjects/accounting-a/lessons/${rel}.md`;
  mkdirSync(dirname(path), { recursive: true });
  const text = `---\n${JSON.stringify({ ...front, level: "core" }, null, 2)}\n---\n${body.trim()}\n`;
  writeFileSync(path, text);
  const prose = body.split("\n").filter((l) => !l.trim().startsWith("|") && !l.startsWith(":::")).join(" ");
  const words = prose.split(/\s+/).filter(Boolean).length;
  const workedEx = (body.match(/:::worked-solution/g) ?? []).length;
  console.log(`${rel}: ${words} prose words, ${workedEx} worked solutions`);
  if (words < 900 || words > 1600) console.log(`  WARNING word count outside 900-1600`);
}
