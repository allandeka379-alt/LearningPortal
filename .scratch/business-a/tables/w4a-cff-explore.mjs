import { cashForecast, r2 } from "../lib.mjs";
const months = ["Jan","Feb","Mar","Apr","May"];
const rev = [5600, 6300, 6900, 7700, 6200], dec = 5400, nov = 5200;
const mk = (lag) => months.map((m,i)=>({
  label: m,
  receipts: [["Cash sales (60%)", rev[i]*0.6], ["Credit", ((lag===1 ? (i===0?dec:rev[i-1]) : [nov,dec,...rev][i])*0.4)]],
  payments: [["Wages", 2600], ["Detergent (15% of sales)", rev[i]*0.15], ["Rent", 850], ["Utilities", 550], ["Loan repayment", 400], ...(i===2?[["New washing machine", 5200]]:[])],
}));
for (const lag of [1,2]) { const r = cashForecast({ opening: 2300, periods: mk(lag) }); console.log(lag, r.rows.map(x=>[x.label,x.rec,x.pay,x.net,x.close].join(" ")).join(" | ")); }
