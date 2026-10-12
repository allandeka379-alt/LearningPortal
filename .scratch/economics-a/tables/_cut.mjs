// helper (not a slice): node _cut.mjs <slice> <substring> [...]  removes the statement that contains the substring on its first line.
// A statement ends at the first line (from the start line) whose trimmed text ends with "});" or "]]);" or "});".
import fs from "node:fs";
const [f, ...starts] = process.argv.slice(2);
const lines = fs.readFileSync(f, "utf8").split("\n");
for (const st of starts) {
  let i = lines.findIndex((l) => l.includes(st));
  if (i < 0) throw new Error("not found: " + st);
  // walk back to the statement start (a line starting with b. or mc( at any indent)
  while (!/^\s*(b\.|mc\()/.test(lines[i])) i--;
  let j = i;
  while (!/(\}\);|\]\]\);)\s*$/.test(lines[j])) j++;
  lines.splice(i, j - i + 1);
  console.log("cut", st, j - i + 1, "lines");
}
fs.writeFileSync(f, lines.join("\n"));
