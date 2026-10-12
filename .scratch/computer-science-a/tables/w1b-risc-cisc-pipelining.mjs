import { chk, mdTable, round } from "../lib.mjs";
const stages = ["F", "D", "E"];
// Pipeline table: instruction i starts in cycle i (1-based). discard: map instr -> number of stages completed before discard.
function pipeTable(n, discard = {}, startOverride = {}) {
  const starts = Array.from({ length: n }, (_, i) => startOverride[i] ?? i + 1);
  const maxCycle = Math.max(...starts.map((s, i) => s + (discard[i] ?? stages.length) - 1));
  const head = ["Instruction", ...Array.from({ length: maxCycle }, (_, c) => String(c + 1))];
  const rows = starts.map((s, i) => {
    const row = [`I${i + 1}`];
    for (let c = 1; c <= maxCycle; c++) {
      const k = c - s;
      const lim = discard[i] ?? stages.length;
      row.push(k >= 0 && k < lim ? stages[k] : "");
    }
    return row;
  });
  return { md: mdTable(head, rows), cycles: maxCycle };
}
const p5 = pipeTable(5);
chk(p5.cycles, 7);
const unpiped = 5 * 3;
// branch: I3 is a taken jump; I4 and I5 are fetched but discarded; target T follows in cycle 6
const br = pipeTable(6, { 3: 2, 4: 1 }, { 5: 6 });
chk(br.cycles, 8);
const brMd = br.md.replace(/\| I6 /, "| T (jump target) ").replace(/\| I4 /, "| I4 (discarded) ").replace(/\| I5 /, "| I5 (discarded) ");
// big n
const n = 100, k = 5;
const un = n * k, pi = n + k - 1;
const sp = un / pi;
const comparison = mdTable(
  ["Feature", "CISC", "RISC"],
  [
    ["Instruction set", "Large, with powerful and complex instructions", "Small, with simple instructions"],
    ["Instruction length", "Varies", "Fixed"],
    ["Cycles per instruction", "Several, and different for each instruction", "Mostly one"],
    ["Instructions needed for a task", "Fewer", "More"],
    ["Registers", "Fewer", "Many"],
    ["Memory access", "Many instructions can work directly on memory", "Only load and store instructions access memory"],
    ["Hardware (control unit)", "Complex", "Simpler"],
    ["Pipelining", "Harder to do efficiently", "Designed for it"],
  ],
);
export const snips = {
  comparison,
  p5: p5.md,
  p5cycles: String(p5.cycles),
  unpiped: String(unpiped),
  br: brMd,
  brCycles: String(br.cycles),
  n: String(n), k: String(k), un: String(un), pi: String(pi), sp: String(round(sp, 2)),
};
if (process.argv[1].endsWith("w1b-risc-cisc-pipelining.mjs")) console.log(snips.p5 + "\n\n" + snips.br);
