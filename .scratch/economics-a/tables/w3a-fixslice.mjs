// Normalises every "US$" / "US\$" in w3a slices to "US\\$" (two backslashes), except UNITS keys (unit: "US$ ..."). Usage: node w3a-fixslice.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
const dir = ".scratch/economics-a/slices/";
for (const f of readdirSync(dir).filter((x) => x.startsWith("w3a-"))) {
  const s = readFileSync(dir + f, "utf8");
  const t = s.replace(/US(\\*)\$/g, (m, bs, off) => {
    if (s.slice(Math.max(0, off - 7), off) === 'unit: "') return m;
    if (s[off + m.length] === "{") return m;
    return "US\\\\$";
  });
  if (t !== s) { writeFileSync(dir + f, t); console.log("fixed", f); }
}
