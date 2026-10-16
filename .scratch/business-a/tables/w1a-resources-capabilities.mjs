import { table, chk, r2 } from "../lib.mjs";
const cost = 6000, maint = 300, hire = 1400;
const rows = [];
for (const n of [3, 5, 8]) {
  const buy = cost + maint * n, h = hire * n;
  rows.push([`${n} years`, buy, h, buy < h ? "Purchase" : "Hire"]);
}
console.log(table(["Years of use", "Purchase: price + upkeep (US\\$)", "Hire (US\\$)", "Cheaper"], rows, ["l", "r", "r", "l"]));
chk(cost / (hire - maint), 5.4545, 0.001);
console.log(cost / (hire - maint));
