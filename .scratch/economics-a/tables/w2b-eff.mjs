import { costTable, monopolyLinear, table, fmt, roundTo } from "../lib.mjs";
const ct = costTable({ output:[0,1,2,3,4,5,6,7,8], fc:60, vc:[0,36,60,78,96,118,150,196,260], marginal:true });
console.log(ct.md);
console.log(ct.rows.map(r=>[r.q,r.atc,r.mc].join(" ")).join("\n"));
console.log(JSON.stringify(monopolyLinear({a:80,b:2,c:20})));
