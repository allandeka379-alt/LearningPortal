// Lists single-answer MCQs (top level and structured parts) whose key is "clearly the longest option": at least 1.3
// times and 12 characters longer than EVERY distractor, so a student could guess it by length. One distractor of
// comparable length clears the flag. Multi-select items are skipped.
// Usage (repo root): node .scratch/tools/length-cue.mjs <family> [path-substring ...]
//   e.g. node .scratch/tools/length-cue.mjs biology-o questions/enzymes/
// Prints each flagged item (* = key) with its rationales, then "# N flagged". Fix flagged items with
// .scratch/tools/apply-option-edits.mjs and re-run until it reports 0.
import fs from "node:fs";
import { execSync } from "node:child_process";
const [family, ...filters] = process.argv.slice(2);
const files = execSync(`find content/subjects/${family}/questions -name "*.json"`).toString().trim().split("\n").sort();
let n = 0;
for (const f of files) {
  if (filters.length && !filters.some((x) => f.includes(x))) continue;
  for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) {
    for (const m of [q, ...(q.parts ?? [])]) {
      if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
      const k = m.options.find((o) => o.correct).content.length;
      const d = m.options.filter((o) => !o.correct).map((o) => o.content.length);
      if (!d.every((x) => k >= 1.3 * x && k >= x + 12)) continue;
      n++;
      console.log(`## ${q.key}${m === q ? "" : m.label} | ${(m.stem || "").replace(/\s+/g, " ").slice(0, 220)}${m !== q ? " [ctx: " + q.stem.replace(/\s+/g, " ").slice(0, 120) + "]" : ""}`);
      for (const o of m.options) console.log(`  ${o.correct ? "*" : "-"} ${JSON.stringify(o.content)} || ${JSON.stringify(o.rationale ?? "")}`);
    }
  }
}
console.log(`# ${n} flagged`);
