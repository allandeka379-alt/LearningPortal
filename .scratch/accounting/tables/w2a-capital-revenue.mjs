import { statement, sum, check } from "../lib.mjs";
import { table } from "./w2a-lib.mjs";
const U = String.raw`US\$`;
const items = [["Purchase price of the minibus", 28500, "Capital"], ["Delivery from Harare", 650, "Capital"], ["Registration and number plates", 320, "Capital"], ["Fitting extra seats", 1400, "Capital"], ["Insurance for the first year", 980, "Revenue"], ["Fuel for the first week", 240, "Revenue"], ["Driver's wages for the first month", 1100, "Revenue"]];
console.log(table(["Payment", U, "Type"], items.map(i=>[i[0], i[1], i[2]])));
const cap = sum(items.filter(i=>i[2]==="Capital").map(i=>i[1])), rev = sum(items.filter(i=>i[2]==="Revenue").map(i=>i[1]));
console.log(cap, rev);
// Example 2: Rudo's bakery extracts
const oven = 7200 + 450;
console.log("\n**Rudo's Bakery**\n\n**Income statement (extract)**\n");
console.log(statement("for the year ended 31 December 2025", [["Gross profit", null, 24600], ["Add: Rent received", null, 1800], [null, null, 26400], ["Less: Expenses", null, null], ["Electricity", 1240, null], ["Repairs to oven", 380, null], ["Wages", 9600, null], [null, null, -11220], ["**Profit for the year**", null, "**15,180**"]], { checks: [["gp+rent", 24600+1800, 26400], ["exp", 1240+380+9600, 11220], ["profit", 26400-11220, 15180]] }));
console.log("\n**Rudo's Bakery**\n\n**Statement of financial position (extract)**\n");
console.log(statement("at 31 December 2025", [["Non-current assets", null, null], ["Bakery equipment at cost", null, oven], [null, null, null], ["Non-current liabilities", null, null], ["Loan from Mutapa Finance", null, 5000]], { checks: [["oven", oven, 7650]] }));
