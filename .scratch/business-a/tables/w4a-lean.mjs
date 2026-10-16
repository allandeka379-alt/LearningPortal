import { operations, table, rd, r2, pctChange, chk } from "../lib.mjs";
// Garment factory Gweru: before/after cell production + JIT + kaizen
const before = { workers: 40, output: 12000, defective: 600, stock: 24000, rework: 1.10 };
const after = { workers: 40, output: 14400, defective: 288, stock: 9000 };
const lp0 = operations.labourProductivity(before.output, before.workers), lp1 = operations.labourProductivity(after.output, after.workers);
const d0 = before.defective / before.output * 100, d1 = after.defective / after.output * 100;
const rows = [
 ["Output (garments a month)", before.output, after.output],
 ["Workers", before.workers, after.workers],
 ["Output per worker", lp0, lp1],
 ["Defective garments a month", before.defective, after.defective],
 ["Defect rate (%)", rd(d0,1), rd(d1,1)],
 ["Average stock held (US\$)", before.stock, after.stock],
];
console.log(table(["Measure","Before","After"],rows));
console.log(pctChange(lp0,lp1), pctChange(before.stock,after.stock), pctChange(d0,d1));
// holding cost 20%/yr of stock
console.log((before.stock-after.stock)*0.2);
