import { nernst, gibbsFromE, ecell, dpStr, sfStr } from "../lib.mjs";
console.log("Cu 0.010", nernst(0.34, 2, 0.010));
console.log("Fe ratio 0.50/0.050", nernst(0.77, 1, 0.50, 0.050));
console.log("dG ZnCu", gibbsFromE(2, 1.10));
const eCu = nernst(0.34, 2, 0.010); console.log("cell Zn(1)/Cu(0.010)", ecell(eCu, -0.76));
