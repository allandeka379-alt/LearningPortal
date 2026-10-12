// usage: node w2a-_sub.mjs <file> <pairs.json>  -- exact string replacements, each must match exactly once (or set all:true)
import fs from "node:fs";
const [file, pairsFile] = process.argv.slice(2);
let s = fs.readFileSync(file, "utf8");
const pairs = JSON.parse(fs.readFileSync(pairsFile, "utf8"));
for (const [a, b] of pairs) {
  const n = s.split(a).length - 1;
  if (n !== 1) { console.error(`MATCH COUNT ${n} for: ${a.slice(0, 80)}`); process.exit(1); }
  s = s.replace(a, () => b);
}
fs.writeFileSync(file, s);
console.log("ok", pairs.length);
