import { chk, table, r2 } from "../lib.mjs";
const total = 100000, dps = 0.12;
const h = [["Tendai Moyo", 45000], ["Rudo Chari", 30000], ["Farai Sibanda", 15000], ["Employees' group", 10000]];
const rows = h.map(([n, s]) => [n, s, (s / total * 100).toFixed(1) + "%", r2(s * dps)]);
chk(h.reduce((a, x) => a + x[1], 0), total, 0);
console.log(table(["Shareholder", "Shares", "Share of votes", "Dividend (US\\$)"], [...rows, ["Total", total, "100.0%", r2(total * dps)]]));
// limited liability: company fails, debts 80,000, assets 55,000, shareholder invested 15,000 personal property 40,000
console.log(80000 - 55000);
