// usage: node w2b-_rm.mjs <slice file> <marker substring> ... removes the whole b.xxx( / mc( statement containing the marker line
import fs from "node:fs";
const [f, ...marks] = process.argv.slice(2);
const START = /^  (b\.|mc\()/;
let lines = fs.readFileSync(f, "utf8").split("\n");
for (const m of marks) {
  const i = lines.findIndex((l) => l.includes(m));
  if (i < 0) { console.log("not found", m); continue; }
  let i0 = i;
  while (i0 > 0 && !START.test(lines[i0])) i0--;
  let j = i + 1;
  while (j < lines.length && !START.test(lines[j]) && !/^  \/\//.test(lines[j]) && lines[j].trim() !== "") j++;
  lines.splice(i0, j - i0);
  console.log("removed", m, j - i0, "lines");
}
fs.writeFileSync(f, lines.join("\n"));
