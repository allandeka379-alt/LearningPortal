import { market, pctChange, table, chk } from "../lib.mjs";
const m0=4000000,m1=4400000,f0=560000,f1=594000;
const s0=market.share(f0,m0), s1=market.share(f1,m1), mg=market.growth(m0,m1), fg=pctChange(f0,f1);
chk(s0,14,1e-9); chk(s1,13.5,1e-9); chk(mg,10,1e-9); console.log(s0,s1,mg,fg);
console.log(table(["Measure","2025","2026","Change"],[["Market sales (US\$)",m0,m1,mg+"%"],["Firm sales (US\$)",f0,f1,fg.toFixed(1)+"%"],["Market share",s0+"%",s1+"%","−0.5 percentage points"]],["l","r","r","r"]));
// needed for 14%
console.log(0.14*m1);
