import { chk, fmt, table, linearMarket, linearAt } from "../lib.mjs";
const m = { a: 90, b: 0.5, c: 10, d: 0.5 };
const eq = linearMarket(m); console.log(eq);
const quota = 60; const pDemand = 90 - 0.5 * quota; const pSupply = 10 + 0.5 * quota;
console.log({ pDemand, pSupply, gap: pDemand - pSupply, wl: 0.5 * (pDemand - pSupply) * (eq.quantity - quota), rentTotal: (pDemand - pSupply) * quota });
// consumer surplus before/after: before 0.5*(90-50)*80 = 1600 ; after 0.5*(90-60)*60 = 900
console.log(0.5*(90-eq.price)*eq.quantity, 0.5*(90-pDemand)*quota);
// permits
const firms = [["A", 10], ["B", 20], ["C", 40]];
const rows = firms.map(([n, c]) => [n, 100, 60, c, 40 * c]);
console.log(table(["Firm", "Emissions now (tonnes)", "Permits issued (tonnes)", "Cost of cutting 1 tonne (US\$)", "Cost of cutting 40 tonnes (US\$)"], rows));
console.log("no trade", 40*10+40*20+40*40, "trade", 100*10 + 20*20, "saving", 2800-1400);
