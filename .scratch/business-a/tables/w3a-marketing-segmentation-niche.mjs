import { table, chk, r2 } from "../lib.mjs";
// Example 1: choosing a segment for a fictional gym in Harare
const seg=[["Students (18-24)",6000,0.05,15],["Young professionals (25-40)",4000,0.10,30],["Retired people (60+)",1500,0.20,20]];
const rows=seg.map(([n,size,pen,fee])=>{const members=size*pen;const rev=members*fee*12;return [n,size,pen*100+"%",members,fee,rev]});
console.log(table(["Segment","People in area","Expected sign-up rate","Members","Monthly fee (US\$)","Annual revenue (US\$)"],rows));
for(const r of rows) console.log(r[0], r[3], r[5]);
