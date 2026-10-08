import { trialBalance, sum, r2, check } from "../lib.mjs";
// Example 1: Nyasha's tuck shop
const dr = [["Drawings", 2400], ["Equipment", 5600], ["Motor vehicle", 8500], ["Inventory at 1 January 2025", 1850], ["Purchases", 23400], ["Returns inwards", 420], ["Carriage inwards", 260], ["Wages", 6300], ["Rent", 3600], ["Electricity", 940], ["Discount allowed", 150], ["Trade receivables", 1730], ["Bank", 3210], ["Cash", 380]];
const crOther = [["Sales", 38900], ["Returns outwards", 310], ["Discount received", 230], ["Trade payables", 2480], ["Loan from Chinhoyi Building Society", 5000]];
const capital = r2(sum(dr.map((x) => x[1])) - sum(crOther.map((x) => x[1])));
console.log("@@DBG0");
console.log("capital", capital);
const rows = [["Capital", null, capital], ...dr.map(([a, v]) => [a, v, null]), ...crOther.map(([a, v]) => [a, null, v])];
const order = ["Capital", "Drawings", "Equipment", "Motor vehicle", "Loan from Chinhoyi Building Society", "Inventory at 1 January 2025", "Purchases", "Sales", "Returns inwards", "Returns outwards", "Carriage inwards", "Wages", "Rent", "Electricity", "Discount allowed", "Discount received", "Trade receivables", "Trade payables", "Bank", "Cash"];
rows.sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
console.log("@@TB1");
console.log(trialBalance("Nyasha Moyo: Trial balance at 31 December 2025", rows).md + "\n");
// Example 2: Tatenda's wrongly drafted TB
const wrong = [["Capital", null, 12490], ["Drawings", null, 3100], ["Fixtures and fittings", 7200, null], ["Purchases", 18650, null], ["Sales", null, 29400], ["Returns inwards", null, 540], ["Discount received", 360, null], ["General expenses", 4820, null], ["Inventory at 1 January 2025", 2240, null], ["Trade receivables", 2960, null], ["Trade payables", 1870, null], ["Bank", 4610, null]];
const w = trialBalance("Draft trial balance (with errors)", wrong, { allowDifference: true });
console.log("@@DBG");
console.log(w.debit, w.credit, w.difference);
console.log("@@TB2");
console.log(w.md + "\n");
const fixed = [["Capital", null, 12490], ["Drawings", 3100, null], ["Fixtures and fittings", 7200, null], ["Purchases", 18650, null], ["Sales", null, 29400], ["Returns inwards", 540, null], ["Discount received", null, 360], ["General expenses", 4820, null], ["Inventory at 1 January 2025", 2240, null], ["Trade receivables", 2960, null], ["Trade payables", null, 1870], ["Bank", 4610, null]];
console.log("@@TB3");
console.log(trialBalance("Tatenda Chuma: Trial balance at 31 December 2025", fixed).md);
