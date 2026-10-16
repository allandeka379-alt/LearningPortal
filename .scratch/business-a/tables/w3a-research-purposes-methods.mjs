import { stats, table, chk } from "../lib.mjs";
const strata=[["Under 25",600],["25 to 44",360],["45 and over",240]];
const s=stats.stratified(strata,60); console.log(s);
console.log(table(["Age group","Customers","Calculation","Sample"],s.map(x=>[x.name,x.size,`${x.size} ÷ 1,200 × 60`,x.sample])));
console.log(1200/60);
