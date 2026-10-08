// Applies option rewrites to a family's question JSON files (content/subjects/<family>/questions/**/*.json), keeping
// the standard JSON.stringify(…, null, 2) layout (do not round-trip these files through Python: number formatting
// changes, e.g. 5e-06).
// Spec module:
//   export const E = [[old, new, rationale | null], ...]
//     old = the option's exact content, or [content, rationale] when the content alone is not unique in the family;
//     rationale = a replacement rationale, or null to keep the reviewed one.
//   export const STEM = [[questionKey, partLabel | null, field, oldText, newText], ...]   (optional)
// Every `old` must match exactly one MCQ option in the family; otherwise it is reported and skipped.
// Usage (repo root): node .scratch/tools/apply-option-edits.mjs <family> <spec.mjs>
// Then run: npm run content:validate -- <family> --strict
// Usage: node fixjson.mjs <family> <spec.mjs>
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
const [family, specPath] = process.argv.slice(2);
const spec = await import(path.resolve(specPath));
const files = execSync(`find content/subjects/${family}/questions -name "*.json"`).toString().trim().split("\n").sort();
const data = new Map(files.map((f) => [f, JSON.parse(fs.readFileSync(f, "utf8"))]));
const mcqs = (q) => {
  const out = [];
  const add = (n) => {
    if (n.type === "MULTIPLE_CHOICE" && n.options) out.push(n);
    for (const p of n.parts ?? []) add(p);
  };
  add(q);
  return out;
};
let bad = 0;
for (const [old, neu, rat] of spec.E ?? []) {
  const hits = [];
  for (const qs of data.values()) for (const q of qs) for (const m of mcqs(q)) for (const o of m.options) {
    if (Array.isArray(old) ? o.content === old[0] && o.rationale === old[1] : o.content === old) hits.push(o);
  }
  if (hits.length !== 1) { console.log("MATCH COUNT", hits.length, JSON.stringify(old)); bad++; continue; }
  hits[0].content = neu;
  if (rat !== null && rat !== undefined) hits[0].rationale = rat;
}
for (const [key, label, field, oldT, newT] of spec.STEM ?? []) {
  let q = null;
  for (const qs of data.values()) for (const x of qs) if (x.key === key) q = x;
  const node = q && (label === null ? q : (q.parts ?? []).find((p) => p.label === label));
  if (!node || typeof node[field] !== "string" || !node[field].includes(oldT)) { console.log("STEM MISS", key, label, field); bad++; continue; }
  node[field] = node[field].replace(oldT, newT);
}
let changed = 0;
for (const [f, qs] of data) {
  const out = JSON.stringify(qs, null, 2) + "\n";
  if (out !== fs.readFileSync(f, "utf8")) { fs.writeFileSync(f, out); changed++; }
}
console.log(`done, problems: ${bad}, files changed: ${changed}`);
