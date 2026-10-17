// Checks that every media.json entry appears in exactly one lesson with identical alt and caption. Run: node .scratch/geography-a/diagrams/check-sync.mjs
import fs from "node:fs";
import path from "node:path";
import * as D from "../../tools/diagram-kit.mjs";
const root = "content/subjects/geography-a";
const media = JSON.parse(fs.readFileSync(`${root}/media/media.json`, "utf8"));
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) walk(p); else if (p.endsWith(".md")) files.push(p); } };
walk(`${root}/lessons`);
const all = files.map((f) => fs.readFileSync(f, "utf8")).join("\n");
let bad = 0;
for (const m of media) {
  const name = m.file.replace("diagrams/", "").replace(".png", "");
  const n = all.split(`media:${m.file}`).length - 1;
  if (!all.includes(D.md(name, m.alt, m.caption))) { bad += 1; console.log("MISMATCH", name); }
  if (n !== 1) console.log("COUNT", name, n);
}
console.log(media.length, "media entries;", bad, "mismatches");
