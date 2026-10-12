// Renders w4a lessons: node tables/w4a-render.mjs [name...]  (tpl.md + snips -> content/subjects/computer-science-a/lessons/<area>/<name>.md)
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../../../content/subjects/computer-science-a/lessons");
const only = process.argv.slice(2);
const tpls = fs.readdirSync(here).filter((f) => f.startsWith("w4a-") && f.endsWith(".tpl.md") && (!only.length || only.some((o) => f.includes(o))));
for (const f of tpls) {
  const base = f.replace(/\.tpl\.md$/, "");
  let snips = {};
  const mod = path.join(here, base + ".mjs");
  if (fs.existsSync(mod)) snips = (await import(pathToFileURL(mod).href)).snips ?? {};
  let text = fs.readFileSync(path.join(here, f), "utf8");
  text = text.replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in snips)) throw new Error(`${f}: no snip ${k}`);
    return String(snips[k]);
  });
  const key = /"key":\s*"([^"]+)"/.exec(text)[1];
  const [area, name] = key.split(".");
  const out = path.join(root, area, name + ".md");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, text);
  const body = text.slice(text.indexOf("\n---\n", 4) + 5);
  const prose = body.replace(/```[\s\S]*?```/g, "").split("\n").filter((l) => !l.trim().startsWith("|")).join("\n");
  const words = prose.replace(/[:#>*`_-]/g, " ").split(/\s+/).filter(Boolean).length;
  console.log(`${key.padEnd(40)} ${words} words`);
}
