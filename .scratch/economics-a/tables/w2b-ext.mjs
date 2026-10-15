import { linearMarket, table, chk } from "../lib.mjs";
// negative production externality: MPB P=100-0.5Q ; MPC P=10+0.25Q ; MEC 15
const m = linearMarket({ a: 100, b: 0.5, c: 10, d: 0.25 });
const s = linearMarket({ a: 100, b: 0.5, c: 25, d: 0.25 });
console.log(m.quantity, m.price, s.quantity, s.price, 0.5 * 15 * (m.quantity - s.quantity));
// positive consumption: MPB 94-0.5Q ; MPC 10+.25Q ; MEB 12
const p = linearMarket({ a: 94, b: 0.5, c: 10, d: 0.25 });
const q = linearMarket({ a: 106, b: 0.5, c: 10, d: 0.25 });
console.log(p.quantity, p.price, q.quantity, q.price, 0.5 * 12 * (q.quantity - p.quantity));
// schedule
const Q = [1,2,3,4,5,6,7,8], mpb = [40,36,32,28,24,20,16,12], mpc = [8,12,16,20,24,28,32,36];
console.log(table(["Output (units)", "MPB = price (US\$)", "MPC (US\$)", "MEC (US\$)", "MSC (US\$)"], Q.map((q,i)=>[q,mpb[i],mpc[i],4,mpc[i]+4])));
// A firm: tonnes 1..: fine
