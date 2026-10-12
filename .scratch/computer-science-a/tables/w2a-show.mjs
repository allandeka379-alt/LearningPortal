// node w2a-show.mjs key1 key2 ... : prints the options of the given MCQ keys (e.g. os.functions-utilities.q03)
import fs from "node:fs"; import path from "node:path";
const root = "content/subjects/computer-science-a/questions";
const walk = (d) => fs.readdirSync(d).flatMap((n) => (fs.statSync(path.join(d, n)).isDirectory() ? walk(path.join(d, n)) : [path.join(d, n)]));
const want = process.argv.slice(2);
for (const f of walk(root)) for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) for (const m of [q, ...(q.parts ?? [])]) {
  const id = q.key + (m.label ?? ""); if (!want.includes(id) || m.type !== "MULTIPLE_CHOICE") continue;
  console.log(id, "|", m.stem.slice(0, 90)); for (const o of m.options) console.log(`  ${o.correct ? "*" : "-"} (${o.content.length}) ${o.content}`);
}
