import { schedule, table, money, check } from "../lib.mjs";
const prices = [4, 5, 6, 7, 8], qd1 = [900, 800, 700, 600, 500], qs = [500, 600, 700, 800, 900];
const qd2 = qd1.map((q) => q + 200);
const s1 = schedule({ prices, qd: qd1, qs, requireEquilibrium: true });
const s2 = schedule({ prices, qd: qd2, qs, requireEquilibrium: true, qdHeader: "Quantity demanded after (crates per day)", qsHeader: "Quantity supplied (crates per day)", extra: [{ header: "Quantity demanded before (crates per day)", values: qd1 }] });
console.log(s1.equilibrium, s2.equilibrium, "shortage at 6:", qd2[2] - qs[2]);
console.log(s2.md);
// how to produce
const meth = (w, workers, hire) => w * workers + hire;
for (const w of [8, 5]) console.log("wage", w, "A", meth(w, 10, 0), "B", meth(w, 3, 45));
console.log(table(["Price per crate (US\$)", "Quantity demanded before (crates per day)", "Quantity demanded after (crates per day)", "Quantity supplied (crates per day)"], prices.map((p, i) => [p, qd1[i], qd2[i], qs[i]])));
console.log(table(["Method", "Workers", "Wage cost (US\$)", "Machine hire (US\$)", "Total cost (US\$)"], [["A (by hand)", 10, 80, 0, 80], ["B (with a machine)", 3, 24, 45, 69]]));
console.log(table(["Method", "Wage cost (US\$)", "Machine hire (US\$)", "Total cost (US\$)"], [["A (by hand)", 50, 0, 50], ["B (with a machine)", 15, 45, 60]]));
