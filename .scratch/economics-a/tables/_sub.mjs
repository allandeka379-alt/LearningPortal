// helper: node _sub.mjs <file> <json-array of [from,to] pairs file>
import fs from "node:fs";
const [f, pf] = process.argv.slice(2);
let s = fs.readFileSync(f, "utf8");
for (const [a, b] of JSON.parse(fs.readFileSync(pf, "utf8"))) {
  if (!s.includes(a)) throw new Error("missing: " + a.slice(0, 70));
  s = s.split(a).join(b);
}
fs.writeFileSync(f, s);
console.log("patched", f);
