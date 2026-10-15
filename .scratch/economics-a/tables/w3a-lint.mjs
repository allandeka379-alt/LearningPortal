// Lint for w3a slices: every dollar sign in a plain JS string must be written as two backslashes then $ (US\\$).
import { readdirSync, readFileSync } from "node:fs";
const dir = ".scratch/economics-a/slices/";
let n = 0;
for (const f of readdirSync(dir).filter((x) => x.startsWith("w3a-"))) {
  const lines = readFileSync(dir + f, "utf8").split("\n");
  lines.forEach((l, i) => {
    for (const m of l.matchAll(/(\\*)\$/g)) {
      const bs = m[1].length;
      if (bs === 2) continue;
      if (bs === 0 && l[m.index + 1] === "{") continue; // template interpolation
      if (bs === 0 && /unit: "US\$/.test(l.slice(Math.max(0, m.index - 12), m.index + 1))) continue; // UNITS key
      console.log(f, i + 1, `dollar with ${bs} backslashes:`, l.slice(Math.max(0, m.index - 20), m.index + 15));
      n++;
    }
  });
}
console.log("# lint findings", n);
