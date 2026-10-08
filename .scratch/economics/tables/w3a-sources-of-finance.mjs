// Figures for lessons/firms/sources-of-finance.md (W3a).
import { table, check } from "../lib.mjs";
// WE1: three ways to get a delivery truck with a cash price of US$18,000.
const cash = 18000;
const loanInt = cash * 0.1 * 2; // simple interest, 10% a year for 2 years
const loanTotal = cash + loanInt;
const hpDeposit = 3600, hpInst = 760, hpN = 24, hpTotal = hpDeposit + hpInst * hpN;
const lease = 600, leaseN = 24, leaseTotal = lease * leaseN;
check("loanTotal", loanTotal, 21600); check("hp", hpTotal, 21840); check("lease", leaseTotal, 14400);
console.log(table(["Method", "Total paid over 2 years (US\\$)", "Owns the truck at the end?"], [["Bank loan (10% a year simple interest)", loanTotal, "Yes"], ["Hire purchase (deposit + 24 instalments)", hpTotal, "Yes, after the last instalment"], ["Leasing (24 monthly payments)", leaseTotal, "No"]], { align: ["l", "r", "l"] }));
console.log({ loanInt, hpExtra: hpTotal - cash });
// WE2: debentures and shares.
const deb = 2000 * 100, debInt = deb * 0.09;
check("debInt", debInt, 18000);
console.log({ deb, debInt, div: 150000 * 0.12 });
