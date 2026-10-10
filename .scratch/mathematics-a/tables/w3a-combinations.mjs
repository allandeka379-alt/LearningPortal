// Checks the worked examples of lessons/counting/combinations.md by brute force.
import { chk, nCr, fact } from "../lib.mjs";
function subsets(items, r) { if (r === 0) return [[]]; if (items.length < r) return []; const [h, ...rest] = items; return [...subsets(rest, r - 1).map((s) => [h, ...s]), ...subsets(rest, r)]; }
const range = (p, n) => Array.from({ length: n }, (_, i) => `${p}${i + 1}`);
chk(subsets(range("x", 11), 4).length, 330);
const men = range("M", 7), women = range("W", 6);
chk(subsets([...men, ...women], 5).filter((s) => s.filter((x) => x[0] === "W").length === 2).length, 525);
const tch = range("T", 5), lrn = range("L", 8);
chk(subsets([...tch, ...lrn], 4).filter((s) => s.some((x) => x[0] === "T")).length, 645);
chk(nCr(13, 4) - nCr(8, 4), 645);
const squad = range("P", 12);
chk(subsets(squad, 6).filter((s) => s.includes("P1") && !s.includes("P2")).length, 252);
chk(nCr(8, 3) * fact(3), 336);
chk(nCr(3, 2) * nCr(5, 3) * fact(5), 3600);
// at most 1 woman of 6 in a group of 4 from 7 men 6 women
console.log("at most one woman", nCr(7, 4) + nCr(6, 1) * nCr(7, 3));
console.log("OK");
