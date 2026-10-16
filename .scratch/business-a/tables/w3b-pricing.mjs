import { table, costing, ratios, chk, r2, elasticity } from "../lib.mjs";
// Example 1: cost-plus
const direct = 0.42, overhead = 1800, loaves = 6000, markup = 50;
const oh = overhead / loaves; const cost = direct + oh; const price = costing.priceFromMarkUp(cost, markup);
chk(oh, 0.3); chk(cost, 0.72); chk(price, 1.08);
const profit = price - cost; chk(profit, 0.36);
const margin = ratios.marginFromMarkUp(markup); chk(margin, 33.333, 0.001);
console.log(table(["Item", "US\$ per loaf"], [["Direct costs (flour, yeast, labour)", direct.toFixed(2)], ["Overheads: 1,800 ÷ 6,000", oh.toFixed(2)], ["**Full cost per loaf**", cost.toFixed(2)], ["Mark-up 50% of cost", profit.toFixed(2)], ["**Selling price**", price.toFixed(2)]]));
console.log("margin", (profit/price*100).toFixed(1));
// Example 2: pricing a new product: skimming vs penetration, 12 month revenue table
const rows = [["Skimming", 25, 2000, 25*2000],["Penetration", 15, 5200, 15*5200]];
console.log(table(["Strategy","Price (US\$)","Units sold in month 1","Revenue (US\$)"], rows));
const vc = 9; console.log(rows.map(([n,p,u])=>[n,(p-vc)*u]));
