import fs from "node:fs"; import path from "node:path";
const root = "content/subjects/computer-science-a/questions";
const dirs = ["asm/assembly-programs", "asm/bit-manipulation", "os/functions-utilities", "os/process-scheduling", "os/memory-management", "translation/translators-ide", "translation/compilation-stages", "translation/bnf-syntax-diagrams", "translation/rpn", "ai/graphs-search", "ai/machine-learning", "ethics/ai-impact", "ds/graphs-dictionaries", "exam/w2a-theory"];
let n = 0, bad = 0; const pos = { A: 0, B: 0, C: 0, D: 0 };
for (const d of dirs) for (const q of JSON.parse(fs.readFileSync(`${root}/${d}.json`, "utf8"))) for (const m of [q, ...(q.parts ?? []), ...((q.parts ?? []).flatMap((p) => p.parts ?? []))]) {
  if (m.type !== "MULTIPLE_CHOICE") continue; n++;
  const ok = m.options.filter((o) => o.correct); if (ok.length !== 1) { bad++; console.log("not one correct", q.key); continue; }
  pos[ok[0].key]++;
  for (const o of m.options) { if (!o.correct && /^correct/i.test(o.rationale ?? "")) { bad++; console.log("distractor says Correct", q.key, o.content); } if (o.correct && o.rationale && !/^(correct|[A-Z0-9])/i.test(o.rationale)) console.log("key rationale", q.key, o.rationale); }
  if (/\b(all|none) of the above\b/i.test(JSON.stringify(m.options))) { bad++; console.log("all/none", q.key); }
}
console.log("mcq", n, "problems", bad, pos);
