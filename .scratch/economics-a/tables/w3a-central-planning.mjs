import { chk, fmt, table, pieAngles, pctChange, round } from "../lib.mjs";
const rows = [["Maize (thousand tonnes)", 1800, 1530], ["Cement (thousand tonnes)", 900, 1050], ["Electricity (GWh)", 9000, 8100], ["Cotton (thousand tonnes)", 200, 150]];
for (const [n,t,a] of rows) console.log(n, t, a, (a/t*100).toFixed(1), a-t);
console.log(table(["Item (Country X plan)", "Target", "Actual", "Actual as % of target", "Difference"], rows.map(([n,t,a])=>[n,t,a,fmt(round(a/t*100,1),1),fmt(a-t)])));
const bud = [["Education", 5.0], ["Health", 2.5], ["Roads and energy", 3.0], ["Agriculture", 1.5], ["Debt service", 2.0], ["Other", 6.0]];
const tot = bud.reduce((s,x)=>s+x[1],0); console.log(tot);
const ang = pieAngles(bud.map(x=>x[1]));
console.log(table(["Spending area", "Allocation (US\$ billion)", "Share (%)", "Pie angle (degrees)"], bud.map(([n,v],i)=>[n,fmt(v,1),fmt(round(v/tot*100,1),1),fmt(round(ang[i],0),0)])));
console.log(ang.reduce((s,x)=>s+x,0));
// price: planner sets price 4 where eq 6: shortage
