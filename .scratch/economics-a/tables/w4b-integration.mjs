import { table, fmt, chk } from "../lib.mjs";
// trade creation / diversion example. Costs per unit of a good (US$), common external tariff 50%.
const goods = [
 ["Good P (clothing)", 14, 11, 20],
 ["Good Q (fertiliser)", 22, 11, 9],
];
const t = 0.5;
const rows = goods.map(([n,home,part,world])=>{
  const w = world*(1+t), p = part*(1+t);
  const before = Math.min(home,w,p); const src = before===home?"home":before===w?"rest of world":"partner";
  const after = Math.min(home, w, part); const src2 = after===home?"home":after===w?"rest of world":"partner";
  return [n, home, part, world, fmt(w,2), fmt(p,2), `${fmt(before,2)} (${src})`, `${fmt(after,2)} (${src2})`];
});
console.log(table(["Good","Home cost","Partner cost","World price","World + 50% tariff","Partner + 50% tariff","Cheapest source before union","Cheapest source after union"], rows));
