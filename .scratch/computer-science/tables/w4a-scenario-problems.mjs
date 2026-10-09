// Tables for lessons/algorithms/scenario-problems.md, computed from JS mirrors.
import { recordTrace, mdTable } from "../slices/w4a-0-kit.mjs";

// WE2: row totals of a 3 × 3 array Points[1:3, 1:3] (three houses, three events).
const Points = [[8, 5, 7], [6, 9, 4], [5, 6, 9]];
console.log(mdTable(["House", "Event 1", "Event 2", "Event 3"], Points.map((r, i) => [String(i + 1), ...r.map(String)])) + "\n");
const t = recordTrace(["House", "Event", "HouseTotal", "OUTPUT"], (rec) => {
  const s = {};
  for (let h = 1; h <= 3; h++) {
    s.House = h; s.HouseTotal = 0; s.Event = undefined; rec(s);
    for (let e = 1; e <= 3; e++) { s.Event = e; s.HouseTotal += Points[h - 1][e - 1]; rec(s); }
    s.OUTPUT = `House ${h}: ${s.HouseTotal}`; rec(s); s.OUTPUT = undefined;
  }
});
console.log(t.md);
