// usage: node w2b-rep.mjs <slice file> <<< JSON array of [old,new] pairs on stdin
import fs from "node:fs";
const file = process.argv[2];
let s = fs.readFileSync(file, "utf8");
const pairs = JSON.parse(fs.readFileSync(0, "utf8"));
for (const [a, b] of pairs) {
  const n = s.split(a).length - 1;
  if (n !== 1) { console.error(`NOT UNIQUE (${n}): ${a.slice(0, 70)}`); continue; }
  s = s.replace(a, () => b);
}
fs.writeFileSync(file, s);
