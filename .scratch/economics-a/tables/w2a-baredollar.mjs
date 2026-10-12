// Reports bare US$ (no backslash between US and $) in files. Usage: node w2a-baredollar.mjs <files...>
import { readFileSync } from "node:fs";
let n = 0;
for (const f of process.argv.slice(2)) {
  const s = readFileSync(f, "utf8");
  let i = -1;
  while ((i = s.indexOf("US$", i + 1)) >= 0) {
    n++;
    console.log(f, JSON.stringify(s.slice(Math.max(0, i - 30), i + 15)));
  }
}
console.log("# bare US$:", n);
