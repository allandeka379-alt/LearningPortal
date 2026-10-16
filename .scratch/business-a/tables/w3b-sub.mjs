// Usage: node w3b-sub.mjs <file> <pairsFile.json>   pairs = [[old,new],...]; each old must occur exactly once.
import fs from "node:fs";
const [f, p] = process.argv.slice(2);
let s = fs.readFileSync(f, "utf8");
for (const [a, b] of JSON.parse(fs.readFileSync(p, "utf8"))) {
  const n = s.split(a).length - 1;
  if (n !== 1) throw new Error(`"${a.slice(0, 50)}" occurs ${n} times`);
  s = s.replace(a, () => b);
}
fs.writeFileSync(f, s);
console.log("ok");
