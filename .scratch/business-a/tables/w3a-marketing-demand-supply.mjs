import { table, chk } from "../lib.mjs";
export function eq(prices, qd, qs) { const i = prices.findIndex((p, k) => qd[k] === qs[k]); return i < 0 ? null : { price: prices[i], qty: qd[i] }; }
export function sched(prices, qd, qs, qd2, qs2) {
  const h = ["Price per crate (US\$)", "Quantity demanded", "Quantity supplied", "Market position"];
  return table(h, prices.map((p, k) => [p.toFixed(2), qd[k], qs[k], qd[k] > qs[k] ? `Shortage of ${qd[k] - qs[k]}` : qd[k] < qs[k] ? `Surplus of ${qs[k] - qd[k]}` : "Equilibrium"]), ["l","r","r","l"]);
}
if (process.argv[1].endsWith("w3a-marketing-demand-supply.mjs")) {
const prices=[1,1.5,2,2.5,3];
const qd=[500,400,300,200,100], qs=[100,200,300,400,500];
console.log(sched(prices,qd,qs)); console.log(eq(prices,qd,qs));
const qd2=qd.map(x=>x+200); console.log(sched(prices,qd2,qs)); console.log(eq(prices,qd2,qs));
// drought: supply falls by 150 at each price from original
const qs3=qs.map(x=>x-100); console.log(sched(prices,qd,qs3), eq(prices,qd,qs3));
}
{
const prices=[1,1.5,2,2.5,3];
const qd=[500,400,300,200,100];
const qs4=[0,0,100,200,300];
if (process.argv[1].endsWith("w3a-marketing-demand-supply.mjs")) console.log(sched(prices,qd,qs4), eq(prices,qd,qs4));
}
