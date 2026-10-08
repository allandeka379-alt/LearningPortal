// Tables for lessons/money/banking.md (W2a).
import { table, money, check } from "../lib.mjs";
// WE1: credit creation, reserve ratio 20%, initial deposit US$5,000, three rounds.
const rr = 0.2;
let dep = 5000;
const rows = [];
let totDep = 0, totLoan = 0;
for (let i = 1; i <= 4; i++) {
  const reserve = dep * rr, loan = dep - reserve;
  rows.push([`Bank ${String.fromCharCode(64 + i)}`, dep, reserve, loan]);
  totDep += dep; totLoan += loan;
  dep = loan;
}
console.log(table(["Bank", "New deposit (US\\$)", "Kept as reserves, 20% (US\\$)", "Lent out (US\\$)"], rows));
console.log("after 4 rounds deposits", totDep, "max total deposits", 5000 / rr, "max new loans", 5000 / rr - 5000);
check("max", 5000 / rr, 25000);
// WE2: interest margin.
const deposits = 2400000, depRate = 0.04, loans = 1800000, loanRate = 0.13;
console.log("interest paid", money(deposits * depRate), "received", money(loans * loanRate), "margin", money(loans * loanRate - deposits * depRate));
