import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  const t = fs.readFileSync(f, "utf8").split("\n---\n").slice(1).join(" ");
  const w = t.split("\n").filter((l) => !l.startsWith("|")).join(" ").split(/\s+/).filter(Boolean).length;
  const ex = (t.match(/:::example/g) || []).length;
  console.log(w, "ex" + ex, f.split("lessons/")[1]);
}
