// Figures for lessons/unemployment/effects-policies.md (W2a).
import { money, table, check } from "../lib.mjs";
// WE1: cost of unemployment in a fictional country.
const unemployed = 150000, wage = 300, months = 12, taxRate = 0.15;
const lostIncome = unemployed * wage * months, lostTax = lostIncome * taxRate;
check("lostIncome", lostIncome, 540e6); check("lostTax", lostTax, 81e6);
console.log({ lostIncome: money(lostIncome), lostTax: money(lostTax) });
// WE1b: spending lost in local economy if each worker would have spent 80% of after-tax income.
const afterTax = lostIncome * (1 - taxRate), spend = afterTax * 0.8;
console.log({ afterTax: money(afterTax), spend: money(spend) });
// WE2: comparing two programmes (cost per job).
const progs = [["Public works road programme", 24e6, 8000, "1 year"], ["Training and apprenticeships", 9e6, 2500, "Permanent jobs"]];
console.log(table(["Programme", "Cost (US\$ million)", "Jobs created", "Length of jobs"], progs.map(([n, c, j, l]) => [n, c / 1e6, j, l])));
console.log(progs.map(([n, c, j]) => [n, c / j]));
