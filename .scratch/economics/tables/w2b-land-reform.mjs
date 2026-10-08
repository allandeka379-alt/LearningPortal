// Tables for lessons/production/land-reform.md (W2b). Fictional district data only.
import { table, pctChange, fmt, check } from "../lib.mjs";
const rows = [
  ["Households farming in the district", 1200, 3000],
  ["Maize output (tonnes)", 18000, 12600],
  ["Tobacco output (tonnes)", 900, 1080],
  ["Permanent farm workers employed", 2400, 1500],
];
console.log(table(["Indicator (fictional district)", "Year 1", "Year 6"], rows));
for (const [n, a, c] of rows) console.log(n, fmt(pctChange(a, c), 1));
check("maize", pctChange(18000, 12600), -30);
check("tob", pctChange(900, 1080), 20);
// Example 2: output per household
console.log(18000 / 1200, 12600 / 3000);
