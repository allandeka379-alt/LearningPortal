// Lists MCQs whose key is the unique longest option, for the given file substrings. node w3b-chk.mjs ratios/profitability
import fs from "node:fs";
const root = "content/subjects/accounting-a/questions/";
let tot = 0, bad = 0;
for (const f of process.argv.slice(2)) {
  const qs = JSON.parse(fs.readFileSync(root + f + ".json", "utf8"));
  for (const q of qs) for (const m of [q, ...(q.parts ?? [])]) {
    if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
    tot++;
    const k = m.options.find((o) => o.correct).content.length;
    const d = m.options.filter((o) => !o.correct).map((o) => o.content.length);
    if (d.every((x) => k > x)) { bad++; console.log(`${q.key} ${m.label ?? ""} key ${k} vs ${d.join(",")} :: ${m.stem.slice(0, 60)}`); }
  }
}
console.log(`# ${bad} of ${tot} unique-longest`);
