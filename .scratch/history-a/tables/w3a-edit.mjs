// usage: node w3a-edit.mjs file 'old' 'new'  (exact, single occurrence)
import fs from "node:fs";
const [f, a, b] = process.argv.slice(2);
let s = fs.readFileSync(f, "utf8");
const n = s.split(a).length - 1;
if (n !== 1) { console.error(`found ${n} occurrences of: ${a}`); process.exit(1); }
fs.writeFileSync(f, s.replace(a, () => b));
