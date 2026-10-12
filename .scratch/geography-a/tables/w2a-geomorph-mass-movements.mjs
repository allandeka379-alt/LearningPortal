import { chk, table, sum } from "../lib.mjs";
const rain = [14, 31, 96, 188, 142];
const tot3 = [0, 1, 2].map((i) => rain[i] + rain[i + 1] + rain[i + 2]);
console.log(table(["Day", "1", "2", "3", "4", "5"], [["Rainfall (mm)", ...rain]]));
console.log("3-day totals", tot3);
// hazard scoring: weights slope 3, rainfall 2, bare ground 2, geology 3; scores 1-3
const w = [3, 2, 2, 3];
const cells = [["A", [3, 3, 3, 2]], ["B", [2, 3, 1, 2]], ["C", [1, 2, 1, 1]], ["D", [3, 2, 2, 3]]];
console.log(table(["Cell", "Slope (×3)", "Rainfall (×2)", "Bare ground (×2)", "Weak geology (×3)", "Score"], cells.map(([n, s]) => [n, ...s, sum(s.map((x, i) => x * w[i]))])));
console.log("max", sum(w.map((x) => x * 3)), "min", sum(w));
