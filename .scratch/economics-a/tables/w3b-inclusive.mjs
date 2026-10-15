import { table, fmt, growthRate, roundTo, lorenz } from "../lib.mjs";
const y1=[40,70,100,150,340], y2=[44,76,110,168,422];
const t1=y1.reduce((a,b)=>a+b),t2=y2.reduce((a,b)=>a+b);
console.log(t1,t2,growthRate(t1,t2));
console.log(table(["Income group (fifth of households)","Year 1 (US$ per person per month)","Year 6","Change (%)","Share of total, year 1 (%)","Share, year 6 (%)"],y1.map((a,i)=>[["Poorest 20%","Second","Middle","Fourth","Richest 20%"][i],a,y2[i],fmt(roundTo(growthRate(a,y2[i]),1),1),fmt(roundTo(a/t1*100,1),1),fmt(roundTo(y2[i]/t2*100,1),1)])));
console.log(y1.map((a,i)=>growthRate(a,y2[i])));
console.log(lorenz(y1).gini, lorenz(y2).gini);
console.log("poorest share",40/700*100,44/820*100);
// green adjustment
const gdp=[5000,5300], dep=[250,330], dmg=[120,180];
const adj=gdp.map((g,i)=>g-dep[i]-dmg[i]); console.log(adj, growthRate(gdp[0],gdp[1]), growthRate(adj[0],adj[1]));
