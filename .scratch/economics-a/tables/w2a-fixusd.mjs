// Normalises "US$" in w2a slice sources to the JS-source form US\\$ (two backslashes), reporting what it changed.
import { readFileSync, writeFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
  const s = readFileSync(f, "utf8");
  let n = 0;
  const out = s.replace(/US\\*\$/g, (m) => {
    if (m === "US\\\\$") return m;
    n++;
    return "US\\\\$";
  });
  writeFileSync(f, out);
  console.log(f, "fixed", n);
}
