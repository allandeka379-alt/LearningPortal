// Tables for lessons/firms/size-mergers.md (W3a).
import { table, check } from "../lib.mjs";
// WE1: measuring the size of three fictional firms.
const f = [["Firm P (supermarket chain)", 900, 12, 54], ["Firm Q (mining company)", 400, 85, 70], ["Firm R (software firm)", 60, 3, 9]];
console.log(table(["Firm", "Employees", "Capital employed (US\\$ million)", "Annual sales revenue (US\\$ million)"], f));
// WE2: market shares before and after a horizontal merger (sales in US$ million).
const sales = { A: 63, B: 45, C: 40, D: 32 };
const tot = Object.values(sales).reduce((s, x) => s + x, 0);
check("tot", tot, 180);
const sh = Object.fromEntries(Object.entries(sales).map(([k, v]) => [k, (v / tot) * 100]));
console.log(table(["Firm", "Sales (US\\$ million)", "Market share (%)"], [...Object.entries(sales).map(([k, v]) => [`Firm ${k}`, v, (v / tot) * 100]), ["**Total**", `**${tot}**`, "**100**"]], { dp: [0, 0, 1] }));
console.log("B+C", sh.B + sh.C, "A", sh.A);
