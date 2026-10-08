// Tables for lessons/concepts/applied-concepts.md (W1b).
import { statement, check, sum, r2 } from "../lib.mjs";
// Example 1: matching — Rudo's Salon electricity and rent
const elecPaid = 1140, elecOwing = 175, rentPaid = 4200, rentPrepaid = 350;
const elecExp = r2(elecPaid + elecOwing), rentExp = r2(rentPaid - rentPrepaid);
console.log("| Expense | Paid in 2025 US\$ | Adjustment US\$ | Expense for 2025 US\$ |\n| --- | ---: | ---: | ---: |");
console.log(`| Electricity | ${elecPaid.toLocaleString("en-GB")} | add owing ${elecOwing} | ${elecExp.toLocaleString("en-GB")} |`);
console.log(`| Rent | ${rentPaid.toLocaleString("en-GB")} | less prepaid (${rentPrepaid}) | ${rentExp.toLocaleString("en-GB")} |`);
console.log({ elecExp, rentExp });
// Example 2: Tatenda's Hardware draft profit corrections
const draft = 13480;
const deposit = 900;       // realisation: deposit for goods not yet delivered included in sales
const invCost = 2600, invNrv = 1750; // prudence: damaged inventory at cost
const writeDown = r2(invCost - invNrv);
const stapler = 0; // materiality — capitalised calculator? -> expense 45 included as asset
const calc = 45;
const corrected = r2(draft - deposit - writeDown - calc);
console.log(statement("Tatenda's Hardware: corrected profit for the year ended 31 December 2025", [
  ["Draft profit", null, draft],
  ["Less: customer's deposit for goods not yet delivered (realisation)", deposit, null],
  ["Less: write-down of damaged inventory to net realisable value (prudence)", writeDown, null],
  ["Less: calculator recorded as a non-current asset (materiality)", calc, null],
  [null, null, -r2(deposit + writeDown + calc)],
  ["**Corrected profit**", null, corrected],
], { checks: [["c", corrected, draft - 1795]] }));
console.log({ writeDown, corrected });
