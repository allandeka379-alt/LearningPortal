// usage: node w4b-sub.mjs <target file> <edits.mjs>   (edits.mjs default-exports [[old,new],...]; each old must occur exactly once)
// With no second argument, reads the JSON pairs from stdin.
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import path from "node:path";
const f = process.argv[2];
let t = fs.readFileSync(f, "utf8");
const pairs = process.argv[3] ? (await import(pathToFileURL(path.resolve(process.argv[3])).href)).default : JSON.parse(fs.readFileSync(0, "utf8"));
let n0 = 0;
for (const [a, b] of pairs) {
  const n = t.split(a).length - 1;
  if (n !== 1) { console.error(`NOT UNIQUE (${n}): ${a.slice(0, 70)}`); continue; }
  t = t.replace(a, () => b); n0++;
}
fs.writeFileSync(f, t);
console.log(`applied ${n0}/${pairs.length}`);
