// lists MCQs (top-level and parts) in a questions file where the key is the unique longest option
import fs from "node:fs";
for (const f of process.argv.slice(2)) {
  const q = JSON.parse(fs.readFileSync(`content/subjects/geography-a/questions/${f}.json`, "utf8"));
  for (const x of q) for (const m of [x, ...(x.parts ?? [])]) {
    if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
    const k = m.options.find((o) => o.correct).content.length;
    const d = Math.max(...m.options.filter((o) => !o.correct).map((o) => o.content.length));
    if (k > d) console.log(x.key + (m === x ? "" : m.label), k, d, JSON.stringify(m.options.find((o) => o.correct).content));
  }
}
