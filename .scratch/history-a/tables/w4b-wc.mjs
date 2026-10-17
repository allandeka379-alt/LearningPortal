import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  const t = fs.readFileSync(f, "utf8").replace(/^---[\s\S]*?\n---\n/, "").split("\n").filter((l) => !l.startsWith("|")).join(" ");
  console.log(f.split("/").pop(), t.split(/\s+/).filter(Boolean).length);
}
