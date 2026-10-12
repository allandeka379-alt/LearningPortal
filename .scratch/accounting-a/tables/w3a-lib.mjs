// W3a helpers shared by the W3a slices and lesson generators (not part of the kit; imported by w3a- files only).
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { fmt } from "../lib.mjs";

export const ROOT = fileURLToPath(new URL("../../../content/subjects/accounting-a/", import.meta.url));
export const F = fmt;
export const US = "US\\$";

/** Shorthand MCQ: ok = [content, rationale]; bad = [[content, rationale] x3]. Key placed first (the build rebalances). Warns on a length cue. */
const cueWarnings = [];
export function mc(b, { ok, bad, ...rest }) {
  if (bad.length !== 3) throw new Error("mc needs three distractors: " + rest.stem);
  const k = ok[0].length;
  const d = bad.map((x) => x[0].length);
  if (d.every((x) => k >= 1.25 * x && k >= x + 10)) cueWarnings.push(rest.stem.slice(0, 70));
  return b.mcq({ ...rest, options: [ok, ...bad], answer: "A" });
}
export const lengthWarnings = () => cueWarnings;

/** Writes a lesson file: front matter JSON + body. Reports words outside tables and block syntax. */
export function writeLesson(relPath, front, body) {
  const path = ROOT + "lessons/" + relPath;
  mkdirSync(dirname(path), { recursive: true });
  const text = "---\n" + JSON.stringify(front, null, 2) + "\n---\n" + body.trim() + "\n";
  writeFileSync(path, text);
  const words = body
    .split("\n")
    .filter((l) => !l.startsWith("|") && !l.startsWith(":::"))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  console.log(`${relPath}: ${words} words (excluding tables)`);
  if (words < 900 || words > 1600) console.log(`  !! word count outside 900-1,600`);
  return words;
}

const row = (cells) => `| ${cells.join(" | ")} |`;

/** Three-line bold heading. */
export const heading = (biz, name, when) => `**${biz}**  \n**${name}**  \n**${when}**`;

/** Table with no title; rows [label, ...vals]; null = blank row; strings pass through; numbers formatted. */
export function grid(rows, cols = ["US\\$", "US\\$"]) {
  const lines = [row(["", ...cols]), row(["---", ...cols.map(() => "---:")])];
  for (const r of rows) {
    if (!r) {
      lines.push(row(["", ...cols.map(() => "")]));
      continue;
    }
    const [label, ...vals] = r;
    lines.push(row([label, ...cols.map((_, i) => fmt(vals[i]))]));
  }
  return lines.join("\n");
}

/** Lesson front matter helper. */
export const front = (key, title, summary, concepts, minutes, extra = {}) => ({ key, title, summary, concepts, estimatedMinutes: minutes, ...extra, level: "core" });
