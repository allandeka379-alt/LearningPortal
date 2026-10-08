// Tables for lessons/trade/international-trade.md (W4b).
import { table, fmt, pct, check } from "../lib.mjs";
const ex = [["Gold", 1200], ["Tobacco", 900], ["Other minerals", 600], ["Manufactured goods", 300]];
const tot = ex.reduce((s, x) => s + x[1], 0); check("tot", tot, 3000);
console.log(table(["Export", "Value (US\$ million)", "Share of total exports (%)"], [...ex.map(([n, v]) => [n, v, fmt((v / tot) * 100, 1)]), ["**Total**", `**${fmt(tot)}**`, "**100.0**"]]));
console.log("top2", ((1200 + 900) / tot) * 100);
// gold price falls 25%: loss
console.log("loss", 1200 * 0.25, (1200 * 0.25 / tot) * 100);
