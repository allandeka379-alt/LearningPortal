import { table, r2, chk } from "../lib.mjs";
// HP vs lease vs cash
const cash = 15000, dep = 0.2*cash, inst = 560, n = 24; const hp = dep + inst*n; console.log(dep, hp, hp-cash, (hp-cash)/cash*100);
const lease = 400*36; console.log(lease);
console.log(table(["Option","Upfront (US\$)","Monthly (US\$)","Months","Total paid (US\$)","Owns the asset at the end?"],[
 ["Buy with cash", String(cash), "0", "0", String(cash), "Yes"],
 ["Hire purchase", String(dep), String(inst), String(n), String(hp), "Yes"],
 ["Leasing", "0", "400", "36", String(lease), "No"]],["l","r","r","r","r","l"]));
// debt vs equity
const need=60000, rate=0.09; const intr = need*rate;
const rows = [30000, 40000, 10000].map(p=>[p, r2(p - intr), r2(p*0.75)]); console.log(intr, rows);
console.log(table(["Profit before interest (US\$)","Owner keeps with loan (US\$)","Owner keeps with equity partner (US\$)"], [[40000,34600,30000],[10000,4600,7500]]));
console.log(40000-intr, 40000*.75, 10000-intr, 10000*.75, 6000-intr, 6000*.75);
