// usage: node w3a-batch.mjs edits.json  where edits = [[file, old, new], ...]; each old must occur exactly once in its file.
import fs from "node:fs";
const edits = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
for (const [f, a, b] of edits) {
  const s = fs.readFileSync(f, "utf8");
  const n = s.split(a).length - 1;
  if (n !== 1) { console.error(`${f}: ${n} occurrences of: ${a}`); continue; }
  fs.writeFileSync(f, s.replace(a, () => b));
}
