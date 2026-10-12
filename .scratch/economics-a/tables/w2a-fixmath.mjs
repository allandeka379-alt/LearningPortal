// Fixes inline-math spacing in w2a lessons: "= $ US\$5" -> "=$ US\$5" and "$= $" -> "$=$".
import { readFileSync, writeFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
  let s = readFileSync(f, "utf8");
  const before = s;
  s = s.replace(/ \$ (US\\\$)/g, "$ $1");
  s = s.replace(/\$= \$/g, "$=$");
  s = s.replace(/\$([^$\n]*[^$\s]) \$(?= [A-Za-z(])/g, (m, a) => m); // leave others
  if (s !== before) { writeFileSync(f, s); console.log("fixed", f); }
}
