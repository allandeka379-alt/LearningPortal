import { table, chk, r2, operations, pctChange } from "../lib.mjs";
const y = [{ out: 18000, emp: 30, lab: 54000, cap: 120000 }, { out: 21600, emp: 32, lab: 59400, cap: 144000 }];
const rows = [
 ["Output (shirts)", y[0].out, y[1].out],
 ["Employees", y[0].emp, y[1].emp],
 ["Labour cost (US\$)", y[0].lab, y[1].lab],
 ["Capital employed (US\$)", y[0].cap, y[1].cap],
 ["Labour productivity (shirts per employee)", operations.labourProductivity(y[0].out, y[0].emp), operations.labourProductivity(y[1].out, y[1].emp)],
 ["Capital productivity (shirts per US\$1,000 of capital)", (y[0].out / y[0].cap) * 1000, (y[1].out / y[1].cap) * 1000],
 ["Unit labour cost (US\$ per shirt)", operations.unitLabourCost(y[0].lab, y[0].out).toFixed(2), operations.unitLabourCost(y[1].lab, y[1].out).toFixed(2)],
];
console.log(table(["Measure", "Year 1", "Year 2"], rows));
const lp = y.map(v => v.out / v.emp); console.log(lp, pctChange(lp[0], lp[1]));
const ulc = y.map(v => v.lab / v.out); console.log(ulc, pctChange(ulc[0], ulc[1]));
console.log("cap", y.map(v => v.out / v.cap * 1000));
