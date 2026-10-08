import { journal, sum, check, money } from "../lib.mjs";
import { suspense } from "./w2b-lib.mjs";
// Example 1: Tendai, credits exceed debits by 885
const e1 = [
  { lines: [["Suspense", 90, null], ["Rent", null, 90]], narrative: `Rent of ${money(450)} posted to the rent account as ${money(540)}` },
  { lines: [["Discount allowed", 65, null], ["Suspense", null, 65]], narrative: "Discount allowed total not posted to the discount allowed account" },
  { lines: [["Sales", 300, null], ["Suspense", null, 300]], narrative: "Sales journal overcast" },
  { lines: [["Gumbo Hardware", 610, null], ["Suspense", null, 610]], narrative: "Payment to Gumbo Hardware not posted to its account" },
];
const diff1 = sum([65, 300, 610]) - 90;
check("diff1", diff1, 885);
console.log("@@J1");
console.log(journal(e1.map((e) => ({ date: "31 Dec", ...e }))));
console.log("@@S1");
console.log(suspense("Suspense account", [["31 Dec", "Difference on trial balance", diff1], ["31 Dec", "Rent", 90]], [["31 Dec", "Discount allowed", 65], ["31 Dec", "Sales", 300], ["31 Dec", "Gumbo Hardware", 610]]));
// Example 2: Rudo, debits exceed credits by 555
const dr2 = [["31 Dec", "Sales", 1000], ["31 Dec", "Interest received", 760]];
const cr2 = [["31 Dec", "Kariba Fabrics", 480], ["31 Dec", "Wages", 725]];
const diff2 = sum(dr2.map((x) => x[2])) - sum(cr2.map((x) => x[2]));
check("diff2", diff2, 555);
console.log("@@S2");
console.log(suspense("Suspense account", dr2, [["31 Dec", "Difference on trial balance", diff2], ...cr2]));
console.log("@@J2");
console.log(journal([
  { date: "31 Dec", lines: [["Kariba Fabrics", 480, null], ["Suspense", null, 480]], narrative: `Returns outwards of ${money(240)} credited instead of debited to Kariba Fabrics` },
  { date: "31 Dec", lines: [["Suspense", 1000, null], ["Sales", null, 1000]], narrative: "Sales journal undercast" },
  { date: "31 Dec", lines: [["Suspense", 760, null], ["Interest received", null, 760]], narrative: `Interest received of ${money(380)} debited instead of credited to interest received` },
  { date: "31 Dec", lines: [["Wages", 725, null], ["Suspense", null, 725]], narrative: "Wages paid not posted to the wages account" },
  { date: "31 Dec", lines: [["Moyo", 430, null], ["Mlambo", null, 430]], narrative: "Credit sale to Moyo debited to Mlambo (no suspense entry)" },
]));
