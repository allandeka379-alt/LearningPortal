import { table, check, r2, money, sum } from "../lib.mjs";
// Example 1: bakery
const price = 1.2, mat = 0.55, loaves = 400;
const va = r2(price - mat);
console.log("E1 va/loaf", va, "per day", r2(va * loaves), money(r2(va*loaves)));
// Example 2: chain
const stages = [
  ["Cotton farmer (primary)", 0.6, 2.0],
  ["Spinning and weaving mill (secondary)", 2.0, 5.0],
  ["Shirt maker (secondary)", 5.5, 9.0],
  ["Clothing retailer (tertiary)", 9.0, 14.0],
];
const rows = stages.map(([s, c, p]) => [s, c.toFixed(2), p.toFixed(2), r2(p - c).toFixed(2)]);
const tot = sum(stages.map(([, c, p]) => p - c));
check("total va", tot, 14 - 0.6 - 0.5);
rows.push(["**Total value added**", "", "", `**${tot.toFixed(2)}**`]);
console.log(table(["Stage", "Cost of bought-in materials US\$", "Selling price US\$", "Value added US\$"], rows));
