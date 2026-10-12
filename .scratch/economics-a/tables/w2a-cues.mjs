// Lists MCQs of the w2a files whose key is the unique longest option, with the length-cue flag; prints counts.
// Usage: node .scratch/economics-a/tables/w2a-cues.mjs [--list]
import { readFileSync } from "node:fs";
const mine = [
  "costs/short-run-production", "costs/short-run-costs", "costs/long-run-costs-scale", "costs/revenue-curves", "costs/profit-types",
  "firms/objectives", "firms/structures-features", "firms/perfect-competition", "firms/monopoly", "firms/monopolistic-competition",
  "firms/oligopoly", "firms/collusion-game-theory", "firms/price-discrimination", "exam/w2a-zimsec", "exam/w2a-cambridge",
];
const list = process.argv.includes("--list");
let total = 0, uniq = 0, flagged = 0;
for (const f of mine) {
  const qs = JSON.parse(readFileSync(`content/subjects/economics-a/questions/${f}.json`, "utf8"));
  for (const q of qs) {
    for (const m of [q, ...(q.parts ?? [])]) {
      if (m.type !== "MULTIPLE_CHOICE" || m.payload?.selectMode === "multiple") continue;
      total++;
      const k = m.options.find((o) => o.correct).content.length;
      const d = m.options.filter((o) => !o.correct).map((o) => o.content.length);
      const u = d.every((x) => x < k);
      const fl = d.every((x) => k >= 1.3 * x && k >= x + 12);
      if (u) uniq++;
      if (fl) flagged++;
      if (list && u) console.log(`${fl ? "FLAG " : "uniq "} ${q.key}${m === q ? "" : m.label} :: ${m.options.map((o) => `${o.correct ? "*" : "-"}[${o.content.length}] ${o.content}`).join(" | ")}`);
    }
  }
}
console.log(`# ${total} MCQs, unique-longest ${uniq} (${Math.round((100 * uniq) / total)}%), flagged ${flagged}`);
