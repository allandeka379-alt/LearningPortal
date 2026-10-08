// Applies rebalanceQuestions (rebalance-mcq.mjs) in place to the question files of a family that has no generator
// (mathematics-o, biology-o). Keeps each file's indentation, line endings and final newline.
// Run: node .scratch/tools/rebalance-files.mjs <family> [--write]
import fs from "node:fs";
import path from "node:path";
import { rebalanceQuestions } from "./rebalance-mcq.mjs";

const [family, flag] = process.argv.slice(2);
const root = path.join("content/subjects", family, "questions");
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const total = { files: 0, changed: 0, moved: 0, reordered: 0, skipped: {}, before: {}, after: {} };
for (const file of walk(root).filter((f) => f.endsWith(".json")).sort()) {
  const text = fs.readFileSync(file, "utf8");
  const crlf = text.includes("\r\n");
  const indent = /^\[\r?\n( +)/.exec(text)?.[1].length ?? 2;
  const finalNewline = /\n$/.test(text);
  const questions = JSON.parse(text);
  const fileId = path.relative(root, file).replace(/\\/g, "/").replace(/\.json$/, "");
  const r = rebalanceQuestions(questions, fileId);
  total.files += 1;
  total.moved += r.moved;
  total.reordered += r.reordered;
  for (const k of ["skipped", "before", "after"]) for (const [L, v] of Object.entries(r[k])) total[k][L] = (total[k][L] ?? 0) + v;
  let out = JSON.stringify(questions, null, indent) + (finalNewline ? "\n" : "");
  if (crlf) out = out.replace(/\n/g, "\r\n");
  if (out !== text) {
    total.changed += 1;
    if (flag === "--write") fs.writeFileSync(file, out);
  }
}
console.log(JSON.stringify(total));
if (flag !== "--write") console.log("dry run: pass --write to save");
