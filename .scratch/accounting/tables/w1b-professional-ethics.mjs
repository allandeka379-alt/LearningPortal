// Tables for lessons/ethics/professional-ethics.md (W1b).
import { statement, check, r2 } from "../lib.mjs";
// Example 2: owner asks bookkeeper to leave out cash sales and to record private expenses as business expenses
const reported = 9150, omittedSales = 2400, privateExp = 780;
const honest = r2(reported + omittedSales + privateExp);
console.log(statement("Nyasha's Market Stall: profit for the year ended 31 December 2025", [
  ["Profit as the owner wanted it reported", null, reported],
  ["Add: cash sales left out of the records", omittedSales, null],
  ["Add: private expenses recorded as business expenses", privateExp, null],
  [null, null, r2(omittedSales + privateExp)],
  ["**Profit following the ethical principles**", null, honest],
], { checks: [["h", honest, 12330]] }));
console.log("understatement %", r2(((honest - reported) / honest) * 100));
