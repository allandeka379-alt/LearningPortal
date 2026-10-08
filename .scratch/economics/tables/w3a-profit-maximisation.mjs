// Tables for lessons/costs/profit-maximisation.md (W3a).
import { table, check, fmt } from "../lib.mjs";
// WE1: a fictional furniture maker; price falls to sell more (tables per week).
const q = [0, 1, 2, 3, 4, 5, 6], p = [30, 28, 26, 24, 22, 20, 18], tc = [20, 40, 54, 66, 80, 100, 126];
const tr = q.map((x, i) => x * p[i]);
const rows = q.map((x, i) => [x, p[i], tr[i], tc[i], i ? tr[i] - tr[i - 1] : "–", i ? tc[i] - tc[i - 1] : "–", tr[i] - tc[i]]);
console.log(table(["Output (tables)", "Price (US\\$)", "TR (US\\$)", "TC (US\\$)", "MR (US\\$)", "MC (US\\$)", "Profit (US\\$)"], rows));
const prof = tr.map((t, i) => t - tc[i]);
const best = prof.indexOf(Math.max(...prof));
check("best", best, 4);
console.log("max profit", prof[best]);
// WE2: three firms, AR vs ATC.
const f = [["Firm X", 200, 15, 12], ["Firm Y", 150, 10, 10], ["Firm Z", 300, 8, 9]];
console.log(table(["Firm", "Output (units)", "AR (US\\$)", "ATC (US\\$)", "TR (US\\$)", "TC (US\\$)", "Profit (US\\$)"], f.map(([n, o, ar, atc]) => [n, o, ar, atc, ar * o, atc * o, ar * o - atc * o])));
