import fs from "node:fs";
const p = ".scratch/economics-a/slices/w1b-indifference-curves.mjs";
const lines = fs.readFileSync(p, "utf8").split("\n");
const single = String.raw`US\$`;
const dbl = String.raw`US\\$`;
let n = 0;
for (let i = 80; i < 96; i++) {
  // only fix lines with a single backslash form (not already doubled)
  const fixed = lines[i].split(dbl).join("\u0000").split(single).join(dbl).split("\u0000").join(dbl);
  if (fixed !== lines[i]) n++;
  lines[i] = fixed;
}
fs.writeFileSync(p, lines.join("\n"));
console.log("fixed lines", n);
