// Per-concept counts for the final report: node w1b-stats.mjs
import fs from "node:fs";
import path from "node:path";
const root = "content/subjects/computer-science-a";
const files = [
  ["hardware", ["io-devices", "secondary-storage", "primary-memory", "embedded-control", "electronic-components"]],
  ["cpu", ["architecture-registers", "buses-ports", "performance", "fetch-execute-interrupts", "risc-cisc-pipelining", "parallel-processing", "virtual-machines"]],
  ["asm", ["assembly-language", "addressing-modes"]],
  ["exam", ["w1b-theory", "w1b-zimsec"]],
];
let tq = 0, tc = 0;
for (const [area, names] of files) {
  for (const n of names) {
    const qf = path.join(root, "questions", area, n + ".json");
    const cf = path.join(root, "flashcards", area, n + ".json");
    const qs = JSON.parse(fs.readFileSync(qf, "utf8"));
    const cards = fs.existsSync(cf) ? JSON.parse(fs.readFileSync(cf, "utf8")) : [];
    const by = {};
    let daily = 0, d12 = 0, d3 = 0, d45 = 0;
    for (const q of qs) {
      const t = q.type === "MULTIPLE_CHOICE" ? "MCQ" : q.type === "TRUE_FALSE" ? "TF" : q.type === "MATCHING" ? "MATCH" : q.type === "FILL_IN_THE_BLANK" ? "FIB" : q.type === "SHORT_ANSWER" && q.markingMode === "MANUAL" ? "MANUAL" : q.type === "STRUCTURED" ? "STRUCT" : q.type === "NUMERICAL" || q.type === "CALCULATION" ? "NUM" : q.type === "SHORT_ANSWER" ? "SHORT" : q.type;
      by[t] = (by[t] ?? 0) + 1;
      if (q.dailyEligible) daily++;
      if (q.difficulty <= 2) d12++; else if (q.difficulty === 3) d3++; else d45++;
    }
    tq += qs.length; tc += cards.length;
    console.log(`${(area + "/" + n).padEnd(42)} Q ${String(qs.length).padStart(2)} C ${String(cards.length).padStart(2)} daily ${daily} d1-2 ${d12} d3 ${d3} d4-5 ${d45}  ${JSON.stringify(by)}`);
  }
}
console.log(`total questions ${tq}, cards ${tc}`);
