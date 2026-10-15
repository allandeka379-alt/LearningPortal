import { chk, fmt, table, pctChange, growthRate } from "../lib.mjs";
// Telecom before/after
const rows = [["Employees", 4800, 3600], ["Calls handled (million per year)", 288, 324], ["Operating cost (US\$ million per year)", 96, 81], ["Average price per call (US\$)", 0.5, 0.45]];
console.log(table(["Measure (fictional telecoms firm)", "State-owned (year before sale)", "Privately owned (3 years later)"], rows, {dp:[0,2,2]}));
const l0 = 288e6/4800, l1 = 324e6/3600; console.log("calls/worker", l0, l1, pctChange(l0,l1));
console.log("cost per call", 96/288, 81/324, pctChange(96/288,81/324));
console.log("jobs", pctChange(4800,3600));
console.log("price", pctChange(.5,.45));
// price cap
const infl = 6.5, X = 2.5; console.log("cap", infl - X);
// price after cap: 40 -> 
console.log(40*1.04);
// subsidies vs proceeds
console.log("subsidy 3m/yr; proceeds 20m; years", 20/3);
// dividends forgone: profit 4m/yr; sale 30m: payback
console.log(30/4);
