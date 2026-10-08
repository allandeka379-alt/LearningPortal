// Figures for lessons/fiscal/budget-fiscal-policy.md (W3b).
import { table, budgetBalance, check, fmt, pct } from "../lib.mjs";
const rev = [["Income tax", 2400], ["Value added tax (VAT)", 1800], ["Customs and excise duties", 600], ["Other revenue (fees, licences)", 300]];
const exp = [["Education", 1500], ["Health", 900], ["Infrastructure (roads, dams, power)", 1100], ["Social protection", 650], ["Defence and security", 500], ["Interest on government debt", 400], ["Other spending", 650]];
const R = rev.reduce((s, x) => s + x[1], 0), E = exp.reduce((s, x) => s + x[1], 0), bal = budgetBalance(R, E), gdp = 40000;
check("R", R, 5100); check("E", E, 5700); check("bal", bal, -600);
console.log(table(["Revenue", "US\\$ million"], [...rev, ["**Total revenue**", `**${fmt(R)}**`]]));
console.log(table(["Spending", "US\\$ million"], [...exp, ["**Total spending**", `**${fmt(E)}**`]]));
console.log({ R, E, bal, pctGdp: pct((-bal / gdp) * 100, 2) });
// WE2: VAT revenue +10%, infrastructure -200.
const R2 = R + 1800 * 0.1, E2 = E - 200, bal2 = budgetBalance(R2, E2);
console.log({ R2, E2, bal2, pctGdp2: pct((-bal2 / gdp) * 100, 2) });
check("bal2", bal2, -220);
