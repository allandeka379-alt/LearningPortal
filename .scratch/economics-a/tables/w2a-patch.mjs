// usage: node w2a-patch.mjs <file> <patchfile.json>  where the JSON is [[from, to], ...] (exact strings, each must occur once)
import { readFileSync, writeFileSync } from "node:fs";
const [file, patch] = process.argv.slice(2);
let s = readFileSync(file, "utf8");
const list = JSON.parse(readFileSync(patch, "utf8"));
let bad = 0;
for (const [from, to] of list) {
  const n = s.split(from).length - 1;
  if (n !== 1) { console.log(`!! ${n} matches: ${from.slice(0, 70)}`); bad++; continue; }
  s = s.replace(from, () => to);
}
writeFileSync(file, s);
console.log(bad ? `${bad} failed` : `patched ${list.length}`);
