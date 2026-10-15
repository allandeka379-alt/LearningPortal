import { chk, pctChange, table, money } from "../lib.mjs";
// Differential
const a = 12, g = 4;
console.log("diff %", (a - g) / g * 100, "ratio", a / g);
// Training
const X = 40 * 6000;
const Y = 37 * 9500 - 9000;
console.log("X", X, "Y", Y, "net", Y - X);
const cost = 3 * 6000 + 9000; const extra = 9500 - 6000;
console.log("cost", cost, "extra", extra, "payback", cost / extra);
// supply elasticity
console.log("spec", pctChange(20, 26), pctChange(100, 110), pctChange(100, 110) / pctChange(20, 26));
console.log("gen", pctChange(5, 5.5), pctChange(1000, 1300), pctChange(1000, 1300) / pctChange(5, 5.5));
// compensating: monthly pay incl risk
console.log("pay gap", (540 - 400) / 400 * 100, "hourly", 540 / 160, 400 / 160);
