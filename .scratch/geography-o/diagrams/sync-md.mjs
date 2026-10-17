// Re-writes every figure line in the geography-o lessons from media.json (keeps alt text and caption in step after a re-draw).
// Run from repo root: node .scratch/geography-o/diagrams/sync-md.mjs
import fs from "node:fs";
import path from "node:path";
import * as D from "../../tools/diagram-kit.mjs";
const root = "content/subjects/geography-o";
const media = JSON.parse(fs.readFileSync(`${root}/media/media.json`, "utf8"));
const byName = new Map(media.map((e) => [e.file.replace(/^diagrams\//, "").replace(/\.png$/, ""), e]));
function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)])); }
let changed = 0;
for (const f of walk(`${root}/lessons`).filter((x) => x.endsWith(".md"))) {
  const t = fs.readFileSync(f, "utf8");
  const out = t.replace(/^!\[[^\n]*\]\(media:diagrams\/([a-z0-9-]+)\.png[^\n]*\)$/gm, (m, name) => {
    const e = byName.get(name);
    return e ? D.md(name, e.alt, e.caption) : m;
  });
  if (out !== t) { fs.writeFileSync(f, out); changed += 1; }
}
console.log("lessons updated:", changed);
