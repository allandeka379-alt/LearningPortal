// Tables for lessons/forex/shortages.md (W4b).
import { table, fmt, check } from "../lib.mjs";
const src = [["Mineral exports", 3600], ["Farm exports (mainly tobacco)", 1500], ["Remittances", 1200], ["Tourism", 300], ["Foreign investment and loans", 400]];
const tot = src.reduce((s, x) => s + x[1], 0); check("tot", tot, 7000);
console.log(table(["Source", "Inflow (US\$ million)", "Share (%)"], [...src.map(([n, v]) => [n, v, fmt((v / tot) * 100, 1)]), ["**Total**", `**${fmt(tot)}**`, "**100.0**"]]));
const need = 7600; console.log("gap", need - tot, ((need - tot) / need) * 100);
// shock: mineral prices fall 20%
const fall = 0.2 * 3600; console.log("fall", fall, tot - fall, need - (tot - fall));
