// Applies literal string replacements: node w3a-apply.mjs <edits-module.mjs>  (module exports default [[file, old, new], ...] using String.raw)
import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";
const edits = (await import(pathToFileURL(resolve(process.argv[2])).href)).default;
const cache = new Map();
for (const [file, oldS, newS] of edits) {
  const path = resolve(file);
  let s = cache.get(path) ?? readFileSync(path, "utf8");
  if (!s.includes(oldS)) { console.log("MISSING in", file, ":", oldS.slice(0, 70)); continue; }
  s = s.split(oldS).join(newS);
  cache.set(path, s);
}
for (const [path, s] of cache) writeFileSync(path, s);
console.log("applied", edits.length, "edits");
