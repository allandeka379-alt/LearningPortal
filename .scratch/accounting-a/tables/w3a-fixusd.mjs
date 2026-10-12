// usage: node w3a-fixusd.mjs file  -> in JS slice source: a single-backslash US\$12 or bare US$12 becomes US\\$12 (valid JS escape for the builder)
import fs from "node:fs";
const BS = String.fromCharCode(92);
const p = process.argv[2];
let s = fs.readFileSync(p, "utf8");
const before = s;
const out = [];
let i = 0;
while (i < s.length) {
  if (s.startsWith("US", i)) {
    // count backslashes after US
    let j = i + 2;
    let n = 0;
    while (s[j] === BS) { n += 1; j += 1; }
    if (s[j] === "$" && /\d/.test(s[j + 1] ?? "") && n < 2) {
      out.push("US" + BS + BS + "$");
      i = j + 1;
      continue;
    }
  }
  out.push(s[i]);
  i += 1;
}
s = out.join("");
fs.writeFileSync(p, s);
console.log(before === s ? "no change" : "fixed");
