import { cba, discount, table, fmt } from "../lib.mjs";
const costs = [500, 60, 60, 60, 60, 60], ben = [0, 150, 180, 200, 200, 200];
for (const r of [5, 10]) { const x = cba({ costs, benefits: ben, ratePct: r }); console.log(r, x.pvCosts, x.pvBenefits, x.npv, x.bcr); }
console.log("undiscounted", costs.reduce((a,b)=>a+b), ben.reduce((a,b)=>a+b));
console.log("PV of 1000 in 3y at 8%", discount(1000, 8, 3), discount(1000,10,2), discount(2000,5,2));
// table with discount factors at 10%
const rows = costs.map((c, i) => [i, c, ben[i], ben[i] - c, (1 / 1.1 ** i), discount(ben[i] - c, 10, i)]);
console.log(table(["Year","Costs","Benefits","Net","DF 10%","PV net"], rows, {dp:[0,0,0,0,3,1]}));
console.log(rows.reduce((a,r)=>a+r[5],0));
// project B
const B = cba({ costs: [300, 40, 40, 40, 40, 40], benefits: [0, 100, 110, 110, 110, 110], ratePct: 10 }); console.log(B);
