// Shared helpers for the w4b slices and lesson scripts (in tables/ so the build does not import it as a slice).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { P, codeBlock, mdTable, py, same, chk } from "../lib.mjs";

export function mc(b, d, skill, stem, right, wrongs, explanation, extra = {}) {
  if (wrongs.length !== 3) throw new Error(`mc needs 3 distractors: ${stem.slice(0, 50)}`);
  return b.mcq({ d, skill, stem, options: [right, ...wrongs], answer: "A", explanation, ...extra });
}
export function pm(label, stem, right, wrongs, explanation, marks = 1) {
  if (wrongs.length !== 3) throw new Error(`pm needs 3 distractors: ${stem.slice(0, 50)}`);
  const w = (x) => (Array.isArray(x) ? x : [x, undefined]);
  return P.mcq({ label, marks, stem, options: [right, ...wrongs].map(w), answer: "A", explanation });
}
export const code = (s) => codeBlock(s);
export const pyb = (s) => codeBlock(s, "python");
export { mdTable, py, same, chk, P, codeBlock };

/** Python code shown with its real output: returns { show (code block + output block), out }. */
export function run(codeText, stdin = "") {
  const out = py(codeText, stdin);
  return { out, code: codeBlock(codeText, "python"), outBlock: codeBlock(out), both: `${codeBlock(codeText, "python")}\n\nOutput:\n\n${codeBlock(out)}` };
}

const ROOT = new URL("../../../content/subjects/computer-science-a/lessons/", import.meta.url);

/** Counts words outside fenced code, tables and directive lines. */
export function wordCount(md) {
  const noCode = md.replace(/```[\s\S]*?```/g, " ");
  const lines = noCode.split("\n").filter((l) => !l.trim().startsWith("|") && !l.trim().startsWith(":::"));
  return lines.join(" ").replace(/[#*`_]/g, " ").split(/\s+/).filter(Boolean).length;
}

/** Writes lessons/<area>/<name>.md. meta: { key, title, summary, concept, minutes, free }. */
export function writeLesson(meta, body) {
  const [area, name] = meta.key.split(".");
  const fm = { key: meta.key, title: meta.title, summary: meta.summary, concepts: [meta.concept], estimatedMinutes: meta.minutes, level: "core" };
  if (meta.free) fm.freePreview = true;
  const text = `---\n${JSON.stringify(fm, null, 2)}\n---\n${body.trim()}\n`;
  const file = fileURLToPath(new URL(`${area}/${name}.md`, ROOT));
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, text);
  console.log(`${meta.key}: ${wordCount(body)} words`);
}

/** Like run(), but the program executes in a fresh temporary folder (for programs that create files); the shown code is unchanged. */
export function runTmp(codeText, stdin = "") {
  const wrapped = `import os, tempfile\nos.chdir(tempfile.mkdtemp())\n${codeText}`;
  const out = py(wrapped, stdin);
  return { out, code: codeBlock(codeText, "python"), outBlock: codeBlock(out), both: `${codeBlock(codeText, "python")}\n\nOutput:\n\n${codeBlock(out)}` };
}
/** Python output of a program run in a temporary folder, as text (no blocks). */
export const pyTmp = (codeText, stdin = "") => py(`import os, tempfile\nos.chdir(tempfile.mkdtemp())\n${codeText}`, stdin);
