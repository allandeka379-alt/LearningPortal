import { chk, mdTable, round } from "../lib.mjs";
// Instructions per second
const hz = 2.5e9, cpi = 4;
const ips = hz / cpi;
chk(ips, 625e6);
// Average memory access time
const tCache = 2, tMem = 50;
const amat = (h) => h * tCache + (1 - h) * tMem;
chk(round(amat(0.9), 2), 6.8);
const amatTable = mdTable(
  ["Hit rate", "Miss rate", "Average access time (ns)"],
  [0.8, 0.9, 0.95, 0.99].map((h) => [`${Math.round(h * 100)}%`, `${Math.round((1 - h) * 100)}%`, round(amat(h), 2)]),
);
// Cores with a serial fraction
const base = 8, serial = 0.25;
const t = (n) => base * (serial + (1 - serial) / n);
const coreTable = mdTable(["Cores", "Time (s)", "Speed-up"], [1, 2, 4, 8].map((n) => [n, round(t(n), 3), round(base / t(n), 2)]));
chk(t(4), 3.5);
// Clock doubling when memory waits
const total = 10, compute = 6, wait = 4;
const newTotal = compute / 2 + wait;
chk(newTotal, 7);
export const snips = {
  ips: String(ips),
  amat90: String(round(amat(0.9), 2)),
  amatTable,
  coreTable,
  t4: String(t(4)),
  newTotal: String(newTotal),
  speedup: String(round(total / newTotal, 2)),
};
if (process.argv[1].endsWith("w1b-performance.mjs")) console.log(snips);
