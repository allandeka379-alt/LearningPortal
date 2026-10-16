// Usage: node w3b-delblock.mjs <file> <marker>   removes the top-level "  b.xxx({ ... \n  });" block whose first lines contain <marker> (stem text)
import fs from "node:fs";
const [f, marker] = process.argv.slice(2);
const lines = fs.readFileSync(f, "utf8").split("\n");
const idx = lines.findIndex((l) => l.includes(marker));
if (idx < 0) throw new Error("marker not found");
let start = idx;
while (!/^  b\.\w+\(\{$/.test(lines[start])) start -= 1;
let end = idx;
while (lines[end] !== "  });") end += 1;
lines.splice(start, end - start + 1);
fs.writeFileSync(f, lines.join("\n"));
console.log("removed lines", start + 1, "to", end + 1);
