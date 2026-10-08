// Tables for lessons/ledger/closing-entries.md (W1b).
import { tAccount, journal, statement, check, sum, r2 } from "../lib.mjs";
// Tendai's Hardware, Gweru, year ended 31 December 2025
const sales = 48600, purchases = 31250, openInv = 4200, closeInv = 5150, wages = 6800, rent = 3600, elec = 1150, drawings = 7200, capOpen = 22000;
const cos = r2(openInv + purchases - closeInv);
const gp = r2(sales - cos);
const exp = sum([wages, rent, elec]);
const profit = r2(gp - exp);
console.log({ cos, gp, exp, profit });
console.log(journal([
  { date: "31 Dec", lines: [["Sales", sales, null], ["Income statement", null, sales]], narrative: "Sales for the year transferred to the income statement" },
  { date: "31 Dec", lines: [["Income statement", purchases, null], ["Purchases", null, purchases]], narrative: "Purchases for the year transferred to the income statement" },
  { date: "31 Dec", lines: [["Income statement", exp, null], ["Wages", null, wages], ["Rent", null, rent], ["Electricity", null, elec]], narrative: "Expenses for the year transferred to the income statement" },
], { title: "Journal" }));
console.log();
console.log(tAccount("Wages account", [["31 Mar", "Bank", 1700], ["30 Jun", "Bank", 1700], ["30 Sep", "Bank", 1700], ["31 Dec", "Bank", 1700]], [["31 Dec", "Income statement", wages]], { balance: "auto" }));
console.log();
console.log(tAccount("Sales account", [["31 Dec", "Income statement", sales]], [["31 Dec", "Balance (total for year)", sales]], {}));
console.log();
// Example 2: capital
console.log(journal([
  { date: "31 Dec", lines: [["Income statement", profit, null], ["Capital", null, profit]], narrative: "Profit for the year transferred to capital" },
  { date: "31 Dec", lines: [["Capital", drawings, null], ["Drawings", null, drawings]], narrative: "Drawings for the year transferred to capital" },
]));
console.log();
console.log(tAccount("Capital account", [["31 Dec", "Drawings", drawings]], [["1 Jan", "Balance b/d", capOpen], ["31 Dec", "Income statement (profit)", profit]], { cdDate: "31 Dec", bdDate: "1 Jan 2026" }));
console.log("closing capital", capOpen + profit - drawings);
console.log(statement("Capital section", [["Capital at 1 January 2025", null, capOpen], ["Add profit for the year", null, profit], [null], ["Less drawings", null, -drawings], ["Capital at 31 December 2025", null, capOpen + profit - drawings]], { checks: [["cap", capOpen + profit - drawings, r2(capOpen + profit - drawings)]] }));
console.log();
console.log(journal([
  { date: "31 Dec", lines: [["Income statement", openInv, null], ["Inventory", null, openInv]], narrative: "Opening inventory transferred to the income statement" },
  { date: "31 Dec", lines: [["Inventory", closeInv, null], ["Income statement", null, closeInv]], narrative: "Closing inventory brought into the books" },
]));
console.log();
console.log(statement("Tendai's Hardware<br>Income statement for the year ended 31 December 2025", [
  ["Revenue", null, sales], ["Less cost of sales", null, null], ["Opening inventory", openInv, null], ["Add purchases", purchases, null], ["", r2(openInv + purchases), null], ["Less closing inventory", -closeInv, null], [null, null, -cos], ["**Gross profit**", null, gp],
  ["Less expenses", null, null], ["Wages", wages, null], ["Rent", rent, null], ["Electricity", elec, null], [null, null, -exp], ["**Profit for the year**", null, profit],
], { checks: [["cos", cos, openInv + purchases - closeInv], ["gp", gp, sales - cos], ["exp", exp, wages + rent + elec], ["profit", profit, gp - exp]] }));
