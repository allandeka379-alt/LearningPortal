// word count for lessons: node w1a-wc.mjs file...
import { readFileSync } from "node:fs";
for (const f of process.argv.slice(2)) {
  const t = readFileSync(f, "utf8").split("---\n").slice(2).join("---\n");
  const w = t.split("\n").filter((l) => !l.startsWith("|") && !l.startsWith(":::")).join(" ").split(/\s+/).filter(Boolean).length;
  console.log(w, f.split("/").pop());
}
