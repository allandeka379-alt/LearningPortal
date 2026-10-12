// usage: node w1b-fixdollar.mjs <file> <fromLine> <toLine>  (1-based, inclusive): turns a single-backslash US\$ into US\\$ in a slice file
import fs from "node:fs";
const [file, from, to] = process.argv.slice(2);
const single = String.raw`US\$`;
const dbl = String.raw`US\\$`;
const lines = fs.readFileSync(file, "utf8").split("\n");
let n = 0;
for (let i = Number(from) - 1; i < Number(to); i++) {
  const fixed = lines[i].split(dbl).join("\u0000").split(single).join(dbl).split("\u0000").join(dbl);
  if (fixed !== lines[i]) n++;
  lines[i] = fixed;
}
fs.writeFileSync(file, lines.join("\n"));
console.log("fixed lines", n);
