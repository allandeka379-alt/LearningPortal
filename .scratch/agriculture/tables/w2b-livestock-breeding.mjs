// Lesson numbers for breeding/livestock-breeding.
import { pct, round, check, table } from "../lib.mjs";
// Upgrading: % exotic blood each generation when a purebred sire is used on the offspring.
let p = 0; const rows = [];
for (let g = 1; g <= 5; g++) { p = (p + 100) / 2; rows.push([g, p]); }
console.log(table(["Generation", "Exotic breed (%)"], rows.map(([g, v]) => [g, v])));
check(rows[4][1] === 96.875, "upgrade");
// Conception rate: 40 cows inseminated, 26 pregnant.
console.log("conception", pct(26, 40));
