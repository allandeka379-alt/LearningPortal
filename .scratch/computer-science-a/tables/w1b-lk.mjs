// Lists MCQs (top level and parts) whose key is the unique longest option: node tables/w1b-lk.mjs <folder-substring>...
import fs from "node:fs";
import path from "node:path";
const root = "content/subjects/computer-science-a/questions";
const filters = process.argv.slice(2);
const walk = (d) => fs.readdirSync(d).flatMap((n) => (fs.statSync(path.join(d, n)).isDirectory() ? walk(path.join(d, n)) : [path.join(d, n)]));
let mcq = 0, longest = 0;
for (const f of walk(root).map((x) => x.replace(/\\/g, "/"))) {
  if (filters.length && !filters.some((x) => f.includes(x))) continue;
  for (const q of JSON.parse(fs.readFileSync(f, "utf8"))) {
    for (const m of [q, ...(q.parts ?? [])]) {
      if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
      mcq++;
      const k = m.options.find((o) => o.correct).content.length;
      const d = m.options.filter((o) => !o.correct).map((o) => o.content.length);
      if (d.every((x) => k > x)) {
        longest++;
        console.log(`${q.key}${m.label ?? ""}: key ${k} vs ${d.join(",")}`);
      }
    }
  }
}
console.log(`# ${longest}/${mcq} unique longest (${mcq ? Math.round((100 * longest) / mcq) : 0}%)`);
