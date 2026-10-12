// lists MCQs (and MCQ parts) of w4a files whose key is the unique longest option: node w4a-longest.mjs <json-glob-substring>...
import fs from "node:fs"; import path from "node:path";
const root = "content/subjects/computer-science-a/questions";
const subs = process.argv.slice(2);
function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]); }
for (const f of walk(root).filter((f) => subs.some((s) => f.split(path.sep).join("/").includes(s)))) {
  const qs = JSON.parse(fs.readFileSync(f, "utf8"));
  const chk = (id, opts) => {
    if (!opts || opts.filter((o) => o.correct).length !== 1) return;
    const k = opts.find((o) => o.correct); const lens = opts.map((o) => o.content.length);
    const max = Math.max(...lens);
    if (k.content.length === max && lens.filter((l) => l === max).length === 1) console.log(`${id}  key ${k.content.length} vs ${lens.filter((_, i) => opts[i] !== k).join("/")}`);
  };
  for (const q of qs) { if (q.type === "MULTIPLE_CHOICE") chk(q.key, q.options); for (const p of q.parts ?? []) { if (p.type === "MULTIPLE_CHOICE") chk(q.key + p.label, p.options); } }
}
