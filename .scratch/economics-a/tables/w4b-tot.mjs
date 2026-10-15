import { table, fmt, termsOfTrade, roundTo, chk, pctChange } from "../lib.mjs";
const yrs=[1,2,3,4,5]; const xi=[100,110,120,108,120], mi=[100,105,110,120,125];
const t=xi.map((v,i)=>termsOfTrade(v,mi[i]));
console.log(table(["Year","Export price index","Import price index","Terms of trade"],yrs.map((y,i)=>[String(y),fmt(xi[i],1),fmt(mi[i],1),fmt(t[i],1)])));
console.log(t, pctChange(t[2],t[3]), pctChange(t[0],t[1]));
console.log(40000/8000, 40000/5000);
