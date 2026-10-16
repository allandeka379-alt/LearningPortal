// Usage: node w3b-fixmoney.mjs <slice file>  -> turns a bare "US$<digit>" inside a plain JS string into "US\\$<digit>" (slice source form)
import fs from "node:fs";
const f = process.argv[2];
let s = fs.readFileSync(f, "utf8");
const bs = String.fromCharCode(92);
let n = 0;
s = s.replace(/(^|[^\\])US\$(?=\d)/g, (m, p) => { n += 1; return p + "US" + bs + bs + "$"; });
fs.writeFileSync(f, s);
console.log("fixed", n);
