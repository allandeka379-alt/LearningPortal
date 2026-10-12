// Local shorthand for the w3a slices (kept in tables/ so the build does not import it as a slice).
// mc(b, d, skill, stem, [right, why], [[wrong, why] x3], explanation, extra) -> four-option MCQ, key first (the build rebalances).
// pm(...) is the same for a part inside b.struct. needs(lesson, [strings]) asserts a lesson contains every computed value.
import { readFileSync } from "node:fs";
import { P } from "../lib.mjs";
export function mc(b, d, skill, stem, right, wrongs, explanation, extra = {}) {
  if (wrongs.length !== 3) throw new Error(`mc needs 3 distractors: ${stem.slice(0, 50)}`);
  return b.mcq({ d, skill, stem, options: [right, ...wrongs], answer: "A", explanation, ...extra });
}
export function pm(label, stem, right, wrongs, explanation, marks = 1) {
  if (wrongs.length !== 3) throw new Error(`pm needs 3 distractors: ${stem.slice(0, 50)}`);
  return P.mcq({ label, marks, stem, options: [right, ...wrongs], answer: "A", explanation });
}
export function needs(lessonRel, strings) {
  const text = readFileSync(new URL(`../../../content/subjects/computer-science-a/lessons/${lessonRel}.md`, import.meta.url), "utf8");
  // Table alignment rows (|:-:|---|) are cosmetic: ignore them on both sides.
  const norm = (s) => s.split("\n").filter((l) => !/^\|[\s:|-]+\|$/.test(l.trim())).join("\n");
  const body = norm(text);
  const missing = strings.filter((s) => !body.includes(norm(s)));
  if (missing.length) throw new Error(`${lessonRel}: lesson is missing computed values ${JSON.stringify(missing)}`);
  return true;
}
