// Tables for lessons/data/logical-shifts.md
import { shift, fromBase } from "../lib.mjs";
const d = (s) => fromBase(s, 2);
const row = (label, s) => `| ${label} | ${s.split("").join(" | ")} | ${d(s)} |`;
const head = "| | 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Denary |\n|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|";
for (const [s, p] of [["00011010", 2], ["10110100", -3], ["11000011", 2], ["00011010", 1]]) {
  const r = shift(s, p);
  console.log(`${s} shift ${p}: ${r}  ${d(s)} -> ${d(r)}  lost bits: ${p > 0 ? s.slice(0, p) : s.slice(s.length + p)}`);
  console.log(head); console.log(row("Before", s)); console.log(row(`After ${p > 0 ? "left" : "right"} ${Math.abs(p)}`, r));
}
console.log(180/8, 26*4, 195*4);
