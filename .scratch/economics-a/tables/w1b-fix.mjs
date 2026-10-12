import fs from "node:fs";
import path from "node:path";
const needle = String.raw`\text{US\$}`;
for (const d of ["market", "utility", "intervention", "skills"]) {
  const dir = "content/subjects/economics-a/lessons/" + d;
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const s = fs.readFileSync(p, "utf8");
    const n = s.split(needle).join("");
    if (n !== s) { fs.writeFileSync(p, n); console.log("fixed", p); }
  }
}
