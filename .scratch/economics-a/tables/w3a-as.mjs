import { chk, fmt, table, pctChange } from "../lib.mjs";
console.log(0.6*10 + 0.3*(-5), "weighted cost change");
const p = 4.0e6*12500; console.log(p/1e9, p*1.02*1.03/1e9, pctChange(p, p*1.02*1.03));
console.log(table(["Price level (index)", "Real output supplied before (US\$ million)", "Real output supplied after (US\$ million)"], [[80,9000,9600],[90,9800,10400],[100,10500,11100],[110,11000,11500],[120,11300,11500]]));
