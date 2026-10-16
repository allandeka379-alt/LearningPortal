import { table, chk, r2 } from "../lib.mjs";
const sales = 12000, cashSales = 3000, credit = sales - cashSales;
const mat = 5500, wages = 2400, rent = 600, costs = mat + wages + rent;
const profit = sales - costs; chk(profit, 3500);
const open = 2000, close = open + cashSales - costs; chk(close, -3500);
console.log(table(["Item", "Profit view (US\$)", "Cash view (US\$)"], [
 ["Sales (US\$3,000 cash, US\$9,000 on credit)", sales, cashSales],
 ["Materials", -mat, -mat], ["Wages", -wages, -wages], ["Rent", -rent, -rent],
 ["Profit for the month / net cash movement", profit, r2(cashSales - costs)],
 ["Opening cash", "", open], ["Closing cash (overdrawn)", "", close]]));
// second example: probability of debt etc not needed
