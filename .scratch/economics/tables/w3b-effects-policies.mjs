// Figures for lessons/inflation/effects-policies.md (W3b).
import { table, prices, check, fmt } from "../lib.mjs";
// WE1: saver.
const dep = 1000, i = 5, inf = 12;
const nominal = dep * (1 + i / 100), real = prices.realValue(nominal, 100 + inf);
check("real", real, 937.5);
console.log({ nominal, real: fmt(real, 2), loss: fmt(dep - real, 2) });
// WE2: borrower and pensioner.
const loan = 2000, r = 8, inf2 = 15;
const repay = loan * (1 + r / 100), realRepay = prices.realValue(repay, 100 + inf2);
console.log({ repay, realRepay: fmt(realRepay, 2) });
const pension = 150, inf3 = 20, realPension = prices.realValue(pension, 100 + inf3);
check("rp", realPension, 125);
console.log(table(["Person", "Money amount (US\\$)", "Price index (start of year = 100)", "Real value at start-of-year prices (US\\$)"], [["Sipho (savings plus interest)", fmt(nominal), 112, fmt(real, 2)], ["Borrower (repayment)", fmt(repay), 115, fmt(realRepay, 2)], ["Pensioner (monthly pension)", pension, 120, fmt(realPension)]]));
