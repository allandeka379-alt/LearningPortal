// Lists single-answer MCQs (top level and structured parts) whose key is the UNIQUE longest option (milder form of
// the length cue checked by length-cue.mjs). Chance level with four options is 25%.
// Usage (repo root): node .scratch/tools/longest-key.mjs <family> [--list] [path-substring ...]
// Prints per-folder counts and the overall share; with --list also prints each item (* = key) for editing.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const family = args[0];
const list = args.includes("--list");
const filters = args.slice(1).filter((a) => a !== "--list");
const files = [];
const walk = (dir) => {
  for (const name of fs.readdirSync(dir)) {
    const p = path.posix.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p);
    else if (name.endsWith(".json")) files.push(p);
  }
};
walk(`content/subjects/${family}/questions`);
files.sort();
let total = 0;
let flagged = 0;
const byFolder = new Map();
for (const f of files) {
  if (filters.length && !filters.some((x) => f.includes(x))) continue;
  const folder = f.split("/questions/")[1].split("/")[0];
  for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) {
    for (const m of [q, ...(q.parts ?? [])]) {
      if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
      total += 1;
      const key = m.options.find((o) => o.correct);
      const k = key.content.length;
      const unique = m.options.filter((o) => !o.correct).every((o) => o.content.length < k);
      const row = byFolder.get(folder) ?? { n: 0, flagged: 0 };
      row.n += 1;
      if (unique) {
        row.flagged += 1;
        flagged += 1;
        if (list) {
          console.log(`## ${q.key}${m === q ? "" : m.label} (${f})`);
          for (const o of m.options) console.log(`  ${o.correct ? "*" : "-"} [${o.content.length}] ${JSON.stringify(o.content)}`);
        }
      }
      byFolder.set(folder, row);
    }
  }
}
for (const [folder, r] of [...byFolder].sort()) console.log(`${folder.padEnd(22)} ${String(r.flagged).padStart(4)} / ${String(r.n).padStart(4)}  ${((100 * r.flagged) / r.n).toFixed(0)}%`);
console.log(`# ${flagged} of ${total} single-answer MCQs have the key as the unique longest option (${((100 * flagged) / Math.max(1, total)).toFixed(0)}%)`);
