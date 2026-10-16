import { table, chk } from "../lib.mjs";
const workers = 25, oldW = 150, newW = 180, months = 12, revenue = 360000, profitBefore = 30000;
const oldBill = workers * oldW * months, newBill = workers * newW * months, extra = newBill - oldBill;
chk(extra, 9000, 0);
const profitAfter = profitBefore - extra;
console.log(table(["", "Before the rise (US\$)", "After the rise (US\$)", "Change (US\$)"], [
  ["Monthly pay per worker", oldW, newW, newW - oldW],
  ["Yearly wage bill (25 workers)", oldBill, newBill, extra],
  ["Yearly profit (other things equal)", profitBefore, profitAfter, -extra]]));
console.log("extra as % of revenue", (extra / revenue) * 100, "wage bill % rise", (extra / oldBill) * 100, "profit fall %", (extra / profitBefore) * 100);
console.log("price rise needed to restore profit, % of revenue", (extra / revenue) * 100);
