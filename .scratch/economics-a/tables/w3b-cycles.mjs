import { table, fmt, growthRate, roundTo } from "../lib.mjs";
const pot=[1000,1030,1061,1093,1126,1160], act=[990,1045,1089,1050,1070,1128];
const gap=act.map((a,i)=>(a-pot[i])/pot[i]*100);
console.log(gap.map(g=>g.toFixed(3)));
console.log(act.map((a,i)=>i?growthRate(act[i-1],a).toFixed(3):"-"));
console.log(pot.map((a,i)=>i?growthRate(pot[i-1],a).toFixed(3):"-"));
console.log(table(["Year","Actual real GDP (US$ billion)","Potential real GDP (US$ billion)"],act.map((a,i)=>[String(i+1),a,pot[i]])));
console.log(table(["Year","Actual growth (%)","Output gap (%)"],act.map((a,i)=>[String(i+1),i?fmt(roundTo(growthRate(act[i-1],a),1),1):"–",fmt(roundTo(gap[i],1),1)])));
