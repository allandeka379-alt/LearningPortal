// Fills lesson templates: node --no-warnings .scratch/computer-science-a/tables/w2a-fill.mjs <short>
// Reads tables/w2a-<short>.tpl.md, replaces {{name}} with the strings exported as `snips` by tables/w2a-<short>.mjs
// (all computed in code), and writes content/subjects/computer-science-a/lessons/<area>/<name>.md from the front-matter key.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve, dirname } from "node:path";
const short = process.argv[2];
const dir = resolve(".scratch/computer-science-a/tables");
const { snips } = await import(pathToFileURL(`${dir}/w2a-${short}.mjs`).href);
let tpl = readFileSync(`${dir}/w2a-${short}.tpl.md`, "utf8");
const used = new Set();
tpl = tpl.replace(/\{\{(\w+)\}\}/g, (_, k) => {
  if (!(k in snips)) throw new Error(`missing snippet ${k}`);
  used.add(k);
  return String(snips[k]);
});
const unused = Object.keys(snips).filter((k) => !used.has(k));
const key = /"key":\s*"([^"]+)"/.exec(tpl)[1];
const [area, name] = key.split(".");
const out = resolve(`content/subjects/computer-science-a/lessons/${area}/${name}.md`);
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, tpl);
const body = tpl.replace(/^---[\s\S]*?---/, "").replace(/```[\s\S]*?```/g, "").replace(/^\|.*$/gm, "").replace(/:::\w[\w-]*(\{[^}]*\})?/g, "");
console.log(`${out}: ${body.split(/\s+/).filter(Boolean).length} words (excl. code/tables)${unused.length ? "; unused snippets: " + unused.join(",") : ""}`);
