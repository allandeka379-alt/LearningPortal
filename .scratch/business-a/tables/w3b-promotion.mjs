import { table, chk, r2, pctChange } from "../lib.mjs";
// Example 1: budget and campaign effect
const sales = 240000, pct = 3; const budget = sales * pct / 100; chk(budget, 7200);
console.log("budget", budget);
const before = 4000, during = 5200, price = 8, vc = 5, cost = 2400;
const extra = during - before, contrib = price - vc, extraC = extra * contrib, net = extraC - cost, cpe = cost / extra;
chk(extra, 1200); chk(extraC, 3600); chk(net, 1200); chk(cpe, 2); chk(pctChange(before, during), 30);
console.log(table(["Item", "Figure"], [["Average monthly sales before the campaign (units)", before], ["Sales in the campaign month (units)", during], ["Extra units sold", extra], ["Contribution per unit (US\$)", contrib], ["Extra contribution (US\$)", extraC], ["Cost of campaign (US\$)", cost], ["**Net gain (US\$)**", net], ["Cost per extra unit sold (US\$)", cpe]]));
console.log(pctChange(before, during));
