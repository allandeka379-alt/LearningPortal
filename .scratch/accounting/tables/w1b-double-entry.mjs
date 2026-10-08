// Tables for lessons/ledger/double-entry.md (W1b).
import { tAccount, check, sum } from "../lib.mjs";

// Moyo Hardware, Gweru, March 2025
const tx = [
  ["1 Mar", "Tendai paid his savings into a business bank account", 8000, "Bank", "Capital"],
  ["3 Mar", "Bought goods on credit from Kwekwe Cement Suppliers", 2400, "Purchases", "Kwekwe Cement Suppliers"],
  ["5 Mar", "Bought shelving (fixtures) and paid by bank transfer", 1500, "Fixtures and fittings", "Bank"],
  ["8 Mar", "Sold goods for cash", 900, "Cash", "Sales"],
  ["12 Mar", "Sold goods on credit to Rudo Chikore", 650, "Rudo Chikore", "Sales"],
  ["15 Mar", "Paid rent by bank transfer", 300, "Rent", "Bank"],
  ["20 Mar", "Paid Kwekwe Cement Suppliers on account by bank transfer", 1000, "Kwekwe Cement Suppliers", "Bank"],
  ["26 Mar", "Rudo Chikore paid part of her debt in cash", 400, "Cash", "Rudo Chikore"],
];
console.log("| Date | Transaction | Account debited | Account credited | US\\$ |\n| --- | --- | --- | --- | ---: |");
for (const [d, t, a, dr, cr] of tx) console.log(`| ${d} | ${t} | ${dr} | ${cr} | ${a.toLocaleString("en-GB")} |`);
console.log();
const accts = {};
for (const [d, , a, dr, cr] of tx) {
  (accts[dr] ??= { dr: [], cr: [] }).dr.push([d, cr, a]);
  (accts[cr] ??= { dr: [], cr: [] }).cr.push([d, dr, a]);
}
const totalDr = sum(Object.values(accts).flatMap((x) => x.dr.map((y) => y[2])));
const totalCr = sum(Object.values(accts).flatMap((x) => x.cr.map((y) => y[2])));
check("double entry", totalDr, totalCr);
for (const name of ["Bank", "Capital", "Cash", "Sales", "Purchases", "Kwekwe Cement Suppliers", "Rudo Chikore", "Fixtures and fittings", "Rent"]) {
  console.log(tAccount(`${name} account`, accts[name].dr, accts[name].cr, { balance: false }));
  console.log();
}
console.log("total", totalDr);
