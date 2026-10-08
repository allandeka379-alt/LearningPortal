// Figures for lessons/firms/business-organisations.md (W3a).
import { table, check } from "../lib.mjs";
// WE1: partnership profit shared in the ratio 3 : 2 : 1.
const profit = 36000, ratio = [3, 2, 1], names = ["Tendai", "Rudo", "Sipho"];
const tot = ratio.reduce((s, x) => s + x, 0);
const shares = ratio.map((r) => (profit * r) / tot);
check("sum", shares.reduce((s, x) => s + x, 0), profit);
console.log(table(["Partner", "Ratio", "Share of profit (US\\$)"], [...names.map((n, i) => [n, ratio[i], shares[i]]), ["**Total**", `**${tot}**`, `**${profit.toLocaleString("en-GB")}**`]]));
// WE2: limited vs unlimited liability. Debts 50,000; owner put in 20,000; personal assets 35,000.
const debts = 50000, capital = 20000, personal = 35000;
console.log("sole trader loses capital + personal needed:", capital + Math.min(personal, debts - capital), "shareholder loses", capital);
