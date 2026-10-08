// Tables for lessons/bop/imbalances-policies.md (W4b).
import { table, fmt, check } from "../lib.mjs";
const yrs = ["2024", "2025", "2026"], ca = [-0.8, -2.1, -3.6], gdp = [40, 42, 45];
const sh = ca.map((c, i) => (c / gdp[i]) * 100);
console.log(table(["Year", "Current account balance (US\$ billion)", "GDP (US\$ billion)", "Balance as % of GDP"], yrs.map((y, i) => [y, fmt(ca[i], 1), gdp[i], fmt(sh[i], 1)])));
check("s26", sh[2], -8);
// WE2: depreciation 20%: export price in foreign currency; import price in local currency.
const xLocal = 500, r0 = 10, r1 = 12; console.log("export $", xLocal / r0, xLocal / r1, "import local", 80 * r0, 80 * r1);
