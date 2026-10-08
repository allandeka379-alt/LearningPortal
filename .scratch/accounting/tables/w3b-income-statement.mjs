import { incomeStatement, TERMS } from "./w3b-lib.mjs";
const e1 = incomeStatement({
  name: "Tendai's Hardware", terms: TERMS.BOTH, revenue: 86400, salesReturns: 1400, openInv: 7250,
  cos: [["Purchases", 52300], ["Add: Carriage inwards", 860], ["Less: Purchases returns", -1110]], closeInv: 8900,
  otherIncome: [["Discount received", 420], ["Rent received", 1800]],
  expenses: [["Wages and salaries", 9600], ["Rent and rates", 4800], ["Electricity", 1350], ["Carriage outwards", 740], ["Discount allowed", 380], ["General expenses", 1165]],
});
console.log(e1.md); console.log(JSON.stringify({ ...e1, md: undefined }));
const e2 = incomeStatement({
  name: "Chipo's Hair Studio", terms: TERMS.BOTH, service: true, revenueLabel: "Fees from clients", revenue: 31500,
  otherIncome: [["Commission received", 640]],
  expenses: [["Wages", 10800], ["Rent", 4200], ["Hair products used", 3150], ["Electricity and water", 1480], ["Telephone and internet", 560], ["Depreciation: salon equipment", 900]],
});
console.log(e2.md); console.log(JSON.stringify({ ...e2, md: undefined }));
