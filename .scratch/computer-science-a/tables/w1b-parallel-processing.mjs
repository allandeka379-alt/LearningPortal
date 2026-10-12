import { chk, mdTable, round } from "../lib.mjs";
const amdahl = (p, n) => 1 / ((1 - p) + p / n);
const p = 0.8;
const ns = [1, 2, 4, 8, 16, 64];
const table = mdTable(["Processors (n)", "Speed-up = 1 ÷ ((1 − p) + p ÷ n)"], [...ns.map((n) => [n, round(amdahl(p, n), 2)]), ["Unlimited", round(1 / (1 - p), 2)]]);
chk(round(amdahl(p, 4), 2), 2.5);
chk(1 / (1 - p), 5);
// example job time
const t1 = 60, pf = 0.75, procs = 5;
const tN = t1 * ((1 - pf) + pf / procs);
chk(tN, 24);
const spN = t1 / tN;
// SIMD pixels
const pixels = 1_000_000, lanes = 8;
const simdCycles = pixels / lanes;
export const snips = {
  table,
  s4: String(round(amdahl(p, 4), 2)),
  max: String(round(1 / (1 - p), 2)),
  tN: String(tN),
  spN: String(spN),
  pixels: "1 000 000",
  simdCycles: String(simdCycles),
  cmp: mdTable(
    ["Type", "Instruction streams", "Data streams", "Example"],
    [
      ["SISD", "One", "One", "A single-core processor running one program step by step"],
      ["SIMD", "One", "Many", "A graphics processor changing the brightness of many pixels with one instruction"],
      ["MISD", "Many", "One", "A fault-tolerant control system in which several units process the same data and their results are compared"],
      ["MIMD", "Many", "Many", "A multi-core processor or a cluster of computers working on different tasks"],
    ],
  ),
};
if (process.argv[1].endsWith("w1b-parallel-processing.mjs")) console.log(snips);
