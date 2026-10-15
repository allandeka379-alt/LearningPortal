// Escapes bare "US$" as "US\$" in lesson markdown files: node w3a-fixdollar.mjs file...
import { readFileSync, writeFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
  const s = readFileSync(f, "utf8");
  const t = s.replace(/(?<!\\)US\$/g, "US\\$");
  if (s !== t) { writeFileSync(f, t); console.log("fixed", f, (s.match(/(?<!\\)US\$/g) || []).length); }
}
// report any remaining unescaped dollar signs
for (const f of process.argv.slice(2)) {
  const lines = readFileSync(f, "utf8").split("\n");
  lines.forEach((l, i) => { if (/(?<!\\)\$/.test(l)) console.log("bare $ at", f, i + 1, l.slice(0, 80)); });
}
