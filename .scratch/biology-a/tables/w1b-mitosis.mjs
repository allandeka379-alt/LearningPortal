import { table, dpStr, mitoticIndex, sfStr } from "../lib.mjs";
// worked example 1: mitotic index
const counts = { interphase: 164, prophase: 18, metaphase: 7, anaphase: 4, telophase: 7 };
const tot = Object.values(counts).reduce((a,b)=>a+b,0);
const inM = tot - counts.interphase;
console.log(tot, inM, mitoticIndex(inM, tot), dpStr(mitoticIndex(inM,tot)*100,1));
// worked example 2: relative duration of stages, cycle 22 h
const cyc = 22*60;
console.log(table(["Stage","Number of cells","Estimated duration / min"], Object.entries(counts).map(([k,v])=>[k,v,dpStr(v/tot*cyc,0)])));
