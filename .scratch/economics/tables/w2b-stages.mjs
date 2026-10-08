// Tables for lessons/production/stages.md (W2b). Value added along a fictional cotton chain.
import { table, check } from "../lib.mjs";
const chain = [
  ["Farmer grows seed cotton", "Primary", 0, 120],
  ["Ginnery separates lint from seed", "Secondary", 120, 200],
  ["Spinning mill makes yarn and cloth", "Secondary", 200, 340],
  ["Clothing factory makes shirts", "Secondary", 340, 560],
  ["Retailer sells shirts to consumers", "Tertiary", 560, 700],
];
const va = chain.map((r) => r[3] - r[2]);
const tot = va.reduce((a, b) => a + b, 0);
check("total VA = final price", tot, 700);
console.log(table(["Stage", "Sector", "Cost of inputs bought (US\\$)", "Value of output sold (US\\$)", "Value added (US\\$)"], [...chain.map((r, i) => [r[0], r[1], r[2], r[3], va[i]]), ["**Total**", "", "", "", `**${tot}**`]], { align: ["l", "l", "r", "r", "r"] }));
// Example 2: raw vs processed export (fictional, per tonne).
const raw = 900, processed = 2600;
console.log(processed - raw, (processed / raw).toFixed(2));
