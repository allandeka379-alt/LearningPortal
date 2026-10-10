import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  let s = fs.readFileSync(f, "utf8");
  s = s.replace(/^---[\s\S]*?\n---\n/, "");
  s = s.split("\n").filter((l) => !l.trim().startsWith("|")).join("\n");
  console.log(f, s.split(/\s+/).filter(Boolean).length);
}
