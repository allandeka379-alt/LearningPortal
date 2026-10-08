// Tables for lessons/production/factor-demand.md (W2b).
import { table, check, money } from "../lib.mjs";
// Worked example 1: two ways to produce 1,000 bags of cement a day in a fictional country.
const methods = [
  { name: "Labour-intensive", workers: 60, wage: 12, machineCost: 200 },
  { name: "Capital-intensive", workers: 15, wage: 12, machineCost: 680 },
];
const rows = methods.map((m) => [m.name, m.workers, m.workers * m.wage, m.machineCost, m.workers * m.wage + m.machineCost]);
console.log(table(["Method", "Workers", "Daily wage bill (US\\$)", "Daily cost of machinery (US\\$)", "Total daily cost (US\\$)"], rows));
check("li", rows[0][4], 920);
check("ci", rows[1][4], 860);
// If wages fall to 8:
const r2 = methods.map((m) => m.workers * 8 + m.machineCost);
console.log(r2); // 680, 800
console.log(money(920 / 1000, 2), money(860 / 1000, 2));
