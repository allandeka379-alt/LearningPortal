import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  let t = fs.readFileSync(f, "utf8").replace(/^---[\s\S]*?\n---\n/, "").split("\n").filter((l) => !l.startsWith("|") && !l.startsWith(":::")).join(" ");
  t = t.replace(/[#>*_`]/g, " ");
  const n = t.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;
  console.log(f.split("/").slice(-2).join("/").padEnd(40), n);
}
