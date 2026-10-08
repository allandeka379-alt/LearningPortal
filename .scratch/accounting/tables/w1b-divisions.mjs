// Tables for lessons/ledger/divisions.md (W1b).
import { tAccount, check, sum } from "../lib.mjs";
// Example 2: Rudo's Stationers, Masvingo, credit sales June 2025
const inv = [["3 Jun", "Chinhoyi High School", 1460], ["11 Jun", "Tendai Mhlanga", 385], ["19 Jun", "Chinhoyi High School", 720], ["26 Jun", "Gweru Print Centre", 940]];
const total = sum(inv.map((x) => x[2]));
console.log("| Date | Customer | Invoice | US\$ |\n| --- | --- | --- | ---: |");
inv.forEach((x, i) => console.log(`| ${x[0]} | ${x[1]} | ${301 + i} | ${x[2].toLocaleString("en-GB")} |`));
console.log(`| 30 Jun | **Total to sales account** |  | **${total.toLocaleString("en-GB")}** |`);
console.log();
const custs = {};
for (const [d, c, a] of inv) (custs[c] ??= []).push([d, "Sales", a]);
let custTotal = 0;
for (const [c, dr] of Object.entries(custs)) { console.log(tAccount(`${c} account`, dr, [], { balance: false })); console.log(); custTotal += sum(dr.map((x) => x[2])); }
check("sales ledger = total", custTotal, total);
console.log(tAccount("Sales account", [], [["30 Jun", "Sundry trade receivables (sales journal)", total]], { balance: false }));
console.log("total", total);
