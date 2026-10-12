// usage: node w3a-clash2.mjs <lesson rel e.g. company/cash-flow-statement> <questions file rel e.g. exam/w3a-zimp2> <qNN>
import fs from "node:fs";
const [lessonRel, qRel, qn] = process.argv.slice(2);
const les = fs.readFileSync(`content/subjects/accounting-a/lessons/${lessonRel}.md`, "utf8");
const qs = JSON.parse(fs.readFileSync(`content/subjects/accounting-a/questions/${qRel}.json`, "utf8"));
const q = qs.find((x) => x.key.endsWith("." + qn));
const stem = (o) => (o.stem ?? "") + "\n" + (o.parts ?? []).map(stem).join("\n");
const norm = (l) => l.replace(/(\d)[ ,](\d{3})(?!\d)/g, "$1$2");
const nums = (t) => new Set(norm(t).match(/\d+(?:\.\d+)?/g) ?? []);
const L = nums(les);
for (const line of stem(q).split("\n")) {
  const hit = [...nums(line)].filter((n) => L.has(n) && Number(n) > 12 && !["31", "2025", "2024"].includes(n));
  if (hit.length) console.log(hit.join(","), "::", line.slice(0, 120));
}
