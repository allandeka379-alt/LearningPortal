import { cashForecast, table, r2 } from "../lib.mjs";
const months = ["Jan","Feb","Mar","Apr","May","Jun"];
const sales = [8000, 9000, 10000, 12000, 11000, 9500], dec = 7000;
const periods = months.map((m,i)=>({
  label: m,
  receipts: [["Cash sales (50%)", sales[i]*0.5], ["Credit sales received (50% of last month)", (i===0?dec:sales[i-1])*0.5]],
  payments: [["Materials (40% of sales)", sales[i]*0.4], ["Wages", 3000], ["Rent", 800], ["Electricity and transport", 350], ["Loan repayment", 500], ...(i===2?[["New equipment", 6000]]:[])],
}));
const r = cashForecast({ opening: 4000, periods, title: "Cash flow forecast, January to June" });
console.log(r.md); console.log(r.rows.map(x=>[x.label,x.rec,x.pay,x.net,x.open,x.close].join(" ")).join("\n"));
// Example 2: customers pay after two months; Nov sales 6,500
const prev = [6500, 7000];
const all = [...prev, ...sales];
const p2 = months.map((m,i)=>({
  label: m,
  receipts: [["Cash sales (50%)", sales[i]*0.5], ["Credit sales received (50% of sales two months ago)", all[i]*0.5]],
  payments: [["Materials (40% of sales)", sales[i]*0.4], ["Wages", 3000], ["Rent", 800], ["Electricity and transport", 350], ["Loan repayment", 500], ...(i===2?[["New equipment", 6000]]:[])],
}));
const r2b = cashForecast({ opening: 4000, periods: p2, title: "Amended forecast" });
console.log(r2b.md);
console.log(r2b.rows.map(x=>[x.label,x.rec,x.net,x.close].join(" ")).join("\n"));
// Example 3: lease instead of buying (450 a month from March), amended forecast
let bal = 4000; const out=[]; 
for (let i=0;i<6;i++){ const pay = r2b.rows[i].pay - (i===2?6000:0) + (i>=2?450:0); const net = r2b.rows[i].rec - pay; bal += net; out.push([months[i], net, bal]); }
console.log(out.map(o=>o.join(" ")).join("\n"));
