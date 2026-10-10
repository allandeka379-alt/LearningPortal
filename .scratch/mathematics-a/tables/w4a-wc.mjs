// Rough lesson word count (prose only: front matter, display maths and tables removed).
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  let s = fs.readFileSync(f, "utf8").split(/^---$/m).slice(2).join("---");
  s = s.replace(/\$\$[\s\S]*?\$\$/g, " ").replace(/^\|.*$/gm, " ").replace(/^:::.*$/gm, " ");
  const words = s.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  console.log(String(words).padStart(5), f);
}
