import { stats, table, chk, r2 } from "../lib.mjs";
const x=[42,38,45,38,50,41,38,47,51,40];
const m=stats.mean(x); console.log(m, stats.median(x), stats.mode(x), stats.range(x), stats.stdDev(x));
console.log(table(["Day","x","x − mean","(x − mean)²"],x.map((v,i)=>[`Day ${i+1}`,v,v-m,(v-m)**2])));
console.log(x.reduce((s,v)=>s+(v-m)**2,0));
// pie
const resp=[["Chocolate",96],["Strawberry",72],["Vanilla",48],["Other",24]]; const t=resp.reduce((s,r)=>s+r[1],0); console.log(t, resp.map(([n,v])=>[n,v,v/t*100,v/t*360]));
