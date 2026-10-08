import { statement } from "../lib.mjs";
import { ratios, d2, sum } from "./w4b-lib.mjs";
const ca = [["Inventory", 18600], ["Trade receivables", 9400], ["Other receivables (prepaid insurance)", 600], ["Bank", 3400]];
const cl = [["Trade payables", 12300], ["Other payables (wages owing)", 500]];
const tca = sum(ca.map(x=>x[1])), tcl = sum(cl.map(x=>x[1]));
console.log(statement("Extract from the statement of financial position at 31 December 2025", [["**Current assets**", null, null], ...ca.map(([l,a])=>[l,a,null]), ["", null, tca], ["**Current liabilities**", null, null], ...cl.map(([l,a])=>[l,a,null]), ["", null, tcl], ["Net current assets (working capital)", null, tca - tcl]], { checks: [["ca", tca, 32000], ["cl", tcl, 12800]] }));
console.log(d2(ratios.current(tca, tcl)), d2(ratios.acidTest(tca, 18600, tcl)), ratios.acidTest(tca, 18600, tcl));
const steps = [[24000, 12000, "Start"], [20000, 8000, "Pay supplier 4,000"], [23000, 11000, "then buy inventory 3,000 on credit"]];
for (const [a, l, s] of steps) console.log(s, d2(ratios.current(a, l)));
