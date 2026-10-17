// usage: node w3a-cut.mjs lesson.md  "line-prefix" ["line-prefix"...]  removes whole lines starting with a prefix; "=prefix=>new text" replaces the line
import fs from "node:fs";
const [f, ...ps] = process.argv.slice(2);
let lines = fs.readFileSync(f, "utf8").split("\n");
for (const p of ps) {
  const [pre, rep] = p.includes("=>") ? p.split("=>") : [p, null];
  const idx = lines.findIndex((l) => l.startsWith(pre));
  if (idx < 0) { console.error("not found:", pre); continue; }
  if (rep === null) { lines.splice(idx, 1); if (lines[idx] === "" && lines[idx - 1] === "") lines.splice(idx, 1); }
  else lines[idx] = rep;
}
fs.writeFileSync(f, lines.join("\n"));
