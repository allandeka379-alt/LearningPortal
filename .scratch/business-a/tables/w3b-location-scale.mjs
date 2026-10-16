import { table, chk, r2, sum, pctChange } from "../lib.mjs";
const sites = [["Site A (Harare)", 54000, 120000, 38000], ["Site B (Gweru)", 30000, 126000, 52000], ["Site C (Chinhoyi)", 24000, 132000, 46000]];
console.log(table(["Site", "Rent (US\$)", "Labour (US\$)", "Transport (US\$)", "Total yearly cost (US\$)"], sites.map(([n, a, b, c]) => [n, a, b, c, sum([a, b, c])])));
const sc = [[10000, 90000], [20000, 150000], [40000, 240000], [80000, 520000]];
console.log(table(["Output (units)", "Total cost (US\$)", "Cost per unit (US\$)", "Change in unit cost"], sc.map(([q, c], i) => [q, c, r2(c / q).toFixed(2), i ? (pctChange(sc[i-1][1]/sc[i-1][0], c/q)).toFixed(1) + "%" : "-"])));
