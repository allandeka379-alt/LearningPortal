import { table, dpStr } from "../lib.mjs";
const cycle = 20; // hours
const counts = { G1: 180, S: 140, G2: 60, M: 20 };
const tot = Object.values(counts).reduce((a,b)=>a+b,0);
console.log(tot, table(["Phase","Number of cells","Fraction","Estimated duration / h"], Object.entries(counts).map(([k,v])=>[k,v,dpStr(v/tot,2),dpStr(v/tot*cycle,1)])));
