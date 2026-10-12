import fs from "node:fs";
const root = "content/subjects/computer-science-a";
const files = [["asm", "assembly-programs"], ["asm", "bit-manipulation"], ["os", "functions-utilities"], ["os", "process-scheduling"], ["os", "memory-management"], ["translation", "translators-ide"], ["translation", "compilation-stages"], ["translation", "bnf-syntax-diagrams"], ["translation", "rpn"], ["ai", "graphs-search"], ["ai", "machine-learning"], ["ethics", "ai-impact"], ["ds", "graphs-dictionaries"]];
const tot = {};
for (const [a, n] of files) {
  const qs = JSON.parse(fs.readFileSync(`${root}/questions/${a}/${n}.json`, "utf8"));
  const cards = JSON.parse(fs.readFileSync(`${root}/flashcards/${a}/${n}.json`, "utf8"));
  const types = {}; let daily = 0; const d = { low: 0, mid: 0, high: 0 }; const structs = [];
  for (const q of qs) { types[q.type] = (types[q.type] ?? 0) + 1; tot[q.type] = (tot[q.type] ?? 0) + 1; if (q.dailyEligible) daily++; if (q.difficulty <= 2) d.low++; else if (q.difficulty === 3) d.mid++; else d.high++; if (q.type === "STRUCTURED") structs.push(q.marks); }
  const lesson = fs.readFileSync(`${root}/lessons/${a}/${n}.md`, "utf8");
  console.log(`${a}/${n}: ${qs.length}q ${cards.length}c daily ${daily} d<=2:${d.low} d3:${d.mid} d4-5:${d.high} struct ${structs.join("/")} | ${JSON.stringify(types)}`);
}
console.log(tot);
const ex = JSON.parse(fs.readFileSync(`${root}/questions/exam/w2a-theory.json`, "utf8"));
console.log("exam", ex.map((q) => `${q.marks}:${q.skill}:${q.difficulty}:${q.paper}`).join(" | "));
for (const q of ex) { const parts = q.parts; const auto = parts.filter((p) => p.markingMode !== "MANUAL").reduce((s, p) => s + p.marks, 0); console.log(q.key, "auto marks", auto, "of", q.marks); }
