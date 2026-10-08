// Figures for lessons/macro/supply-side-policy.md (W3b).
import { table, productivity, pctChange, check, fmt, pct } from "../lib.mjs";
// WE1: training raises output per worker.
const w = 25, out0 = 1000, out1 = 1150;
const p0 = productivity.perWorker(out0, w), p1 = productivity.perWorker(out1, w);
check("p0", p0, 40); check("p1", p1, 46);
console.log(table(["", "Before training", "After training"], [["Workers", w, w], ["Output (units per day)", out0, out1], ["Output per worker (units per day)", p0, p1]]));
console.log({ change: pct(pctChange(p0, p1), 1) });
// WE2: corporate tax cut from 30% to 25% on profit of US$200,000.
const profit = 200000, after0 = profit * 0.7, after1 = profit * 0.75;
console.log({ tax0: profit * 0.3, tax1: profit * 0.25, after0, after1, extra: after1 - after0, pctRise: pct(pctChange(after0, after1), 1) });
