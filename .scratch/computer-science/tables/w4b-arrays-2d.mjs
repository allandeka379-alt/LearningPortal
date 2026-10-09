// Tables for lessons/prog/arrays-2d.md, computed.
import { array2Md, recordTrace, mdTable, sum } from "../slices/w4b-0-kit.mjs";
const Sales = [[34, 28, 41, 37], [22, 30, 19, 25], [45, 38, 50, 42]];
console.log(array2Md("Sales", Sales) + "\n");
const t = recordTrace(["Shop", "Week", "ShopTotal", "OUTPUT"], (rec) => {
  const s = {};
  for (let r = 1; r <= 3; r++) {
    s.Shop = r; s.ShopTotal = 0; s.Week = undefined; rec(s);
    for (let c = 1; c <= 4; c++) { s.Week = c; s.ShopTotal += Sales[r - 1][c - 1]; rec(s); }
    s.OUTPUT = `Shop ${r}: ${s.ShopTotal}`; rec(s); s.OUTPUT = undefined;
  }
});
console.log(t.md + "\n");
const colTotals = [0, 1, 2, 3].map((c) => sum(Sales.map((r) => r[c])));
console.log("col totals", colTotals, "grand", sum(colTotals), "best week", colTotals.indexOf(Math.max(...colTotals)) + 1);
