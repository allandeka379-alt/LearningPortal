// usage: node w3a-patch.mjs <file> <pairs.json>   pairs.json = [[old, new], ...] ; reports missing olds. "@BS@" placeholder in either side is replaced by a backslash.
import fs from "node:fs";
const BS = String.fromCharCode(92);
const [file, pairsFile] = process.argv.slice(2);
let s = fs.readFileSync(file, "utf8");
const pairs = JSON.parse(fs.readFileSync(pairsFile, "utf8"));
const fix = (x) => x.split("@BS@").join(BS);
for (const [a0, b0] of pairs) {
  const a = fix(a0);
  const b = fix(b0);
  if (!s.includes(a)) console.log("MISSING:", a.slice(0, 70));
  s = s.split(a).join(b);
}
fs.writeFileSync(file, s);
