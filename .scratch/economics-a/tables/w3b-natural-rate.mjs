import { labourMarket, schedule, table, fmt } from "../lib.mjs";
const lm = labourMarket({ m: 20, n: 0.01, s: 4, k: 0.01, minimumWage: 14 });
console.log(JSON.stringify(lm));
const wages=[10,12,14,16], qd=wages.map(w=>(20-w)/0.01), qs=wages.map(w=>(w-4)/0.01);
console.log(table(["Hourly wage (US$)","Workers demanded","Workers supplied"],wages.map((w,i)=>[w,qd[i],qs[i]])));
const lf=12000, actual=0.085*lf, nat=0.06*lf; console.log(actual, nat, actual-nat, (actual-nat)/lf*100);
