// W4a helper kit (not a slice: lives in tables/). Compact MCQ builder, level descriptors and a lesson writer.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const mcCount = new WeakMap();
export const mc = (b, [d, skill], stem, key, bad, explanation, extra = {}) => {
  const n = mcCount.get(b) ?? 0;
  mcCount.set(b, n + 1);
  const pos = (n * 3 + 1) % 4;
  const lens = bad.map((o) => o[0].length);
  if (lens.every((l) => l < key[0].length)) console.warn(`LONGEST-KEY: ${stem.slice(0, 60)}`);
  const options = [...bad];
  options.splice(pos, 0, key);
  return b.mcq({ d, skill, stem, options, answer: "ABCD"[pos], explanation, ...extra });
};
export const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV10 = [
  [3, 8, 10, "Two-sided, developed and applied to the question, with a supported judgement."],
  [2, 4, 7, "Some development and application; evaluation limited or judgement not supported."],
  [1, 1, 3, "Simple, undeveloped points with little application."],
];
export const LV12 = [
  [3, 9, 12, "Developed, balanced analysis applied to the question, with evaluation and a supported judgement."],
  [2, 5, 8, "Some analysis and application; evaluation limited or judgement not supported."],
  [1, 1, 4, "Simple, undeveloped points with little application."],
];
export const LV6 = [
  [3, 5, 6, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 3, 4, "Some development of one side or limited use of the data."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV7 = [
  [3, 5, 7, "Two-sided, developed and applied to the data, with a justified judgement."],
  [2, 3, 4, "Some development of one side or limited use of the data."],
  [1, 1, 2, "Simple, undeveloped points."],
];
export const LV14 = [
  [3, 10, 14, "Two-sided, developed and applied analysis with a justified judgement."],
  [2, 5, 9, "Some analysis and application; evaluation or conclusion limited."],
  [1, 1, 4, "Simple, undeveloped points."],
];
export const LV16 = [
  [3, 11, 16, "Two-sided, developed and applied analysis with a justified judgement."],
  [2, 6, 10, "Some analysis and application; evaluation or conclusion limited."],
  [1, 1, 5, "Simple, undeveloped points."],
];
export const L15 = [
  [3, 11, 15, "Two-sided, developed analysis applied to the question, with a justified conclusion."],
  [2, 6, 10, "Some analysis and application; evaluation is limited or the conclusion is not supported."],
  [1, 1, 5, "Simple, undeveloped points with little application."],
];
export const L20 = [
  [3, 14, 20, "Developed two-sided analysis and evaluation applied to the question, with a justified judgement."],
  [2, 7, 13, "Some developed analysis and some evaluation; judgement limited or not fully supported."],
  [1, 1, 6, "Simple, undeveloped points; little application or evaluation."],
];

const ROOT = fileURLToPath(new URL("../../../content/subjects/economics-a/lessons/", import.meta.url));
/** Writes lessons/<area>/<name>.md with JSON front matter; prints the word count (tables and directive lines excluded roughly). */
export function writeLesson(key, fm, body) {
  const [area, name] = key.split(".");
  const path = `${ROOT}${area}/${name}.md`;
  mkdirSync(dirname(path), { recursive: true });
  const front = { key, ...fm, level: "core" };
  const text = `---\n${JSON.stringify(front, null, 2)}\n---\n${body.trim()}\n`;
  writeFileSync(path, text);
  const words = body.split("\n").filter((l) => !l.startsWith("|")).join(" ").replace(/[:]{3}\S*/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`${key}: ${words} words -> ${path}`);
}
