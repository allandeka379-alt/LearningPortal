// usage: node w3a-clash.mjs <area/name> <qNN>   -> shows, for the question stem, each number that also occurs in the lesson, with its line
import fs from "node:fs";
const [rel, qn] = process.argv.slice(2);
const les = fs.readFileSync(`content/subjects/accounting-a/lessons/${rel}.md`, "utf8");
const qs = JSON.parse(fs.readFileSync(`content/subjects/accounting-a/questions/${rel}.json`, "utf8"));
const q = qs.find((x) => x.key.endsWith("." + qn));
const stem = (o) => (o.stem ?? "") + "\n" + (o.parts ?? []).map(stem).join("\n");
const norm = (l) => l.replace(/(\d)[ ,](\d{3})(?!\d)/g, "$1$2");
const nums = (t) => new Set(norm(t).match(/\d+(?:\.\d+)?/g) ?? []);
const L = nums(les);
for (const line of stem(q).split("\n")) {
  const hit = [...nums(line)].filter((n) => L.has(n) && Number(n) > 12 && n !== "31" && !["2025", "2024"].includes(n));
  if (hit.length) console.log(hit.join(","), "::", line.slice(0, 110));
}
