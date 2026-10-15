import { discount, table } from "../lib.mjs";
const costs = [500, 60, 60, 60, 60, 60], ben = [0, 150, 180, 200, 200, 200];
const rows = costs.map((c, i) => [i, c, ben[i], 1/1.05**i, discount(c,5,i), discount(ben[i],5,i)]);
console.log(table(["Year","Costs (US$ thousand)","Benefits (US$ thousand)","Discount factor at 5%","PV of costs","PV of benefits"], rows, {dp:[0,0,0,3,1,1]}));
console.log(rows.reduce((a,r)=>a+r[4],0), rows.reduce((a,r)=>a+r[5],0));
