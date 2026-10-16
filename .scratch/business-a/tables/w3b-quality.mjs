import { table, chk, r2, sum } from "../lib.mjs";
const n = 200, d = 9, batch = 5000, rep = 4;
const rate = d / n * 100; chk(rate, 4.5, 1e-9);
const exp = batch * d / n; chk(exp, 225, 1e-9);
console.log(rate, exp, exp * rep, batch * 0.3);
const before = [["Prevention (training, maintenance)", 0, 8000], ["Inspection and testing", 6000, 3000], ["Failure: rework, returns, scrap", 30000, 12000]];
const tb = sum(before.map(r => r[1])), ta = sum(before.map(r => r[2]));
console.log(table(["Quality cost (US\$ a year)", "Before", "After"], [...before, ["**Total**", tb, ta]]));
console.log(tb - ta, (tb - ta) / tb * 100);
