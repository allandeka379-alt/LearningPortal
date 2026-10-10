import { pcrCopies, sfStr } from "../lib.mjs";
console.log(pcrCopies(1, 30), pcrCopies(1, 30).toExponential(3));
console.log(pcrCopies(50, 20), pcrCopies(50,20).toExponential(3));
// log-linear interpolation
const est = (d, [d1, s1], [d2, s2]) => 10 ** (Math.log10(s1) + (d - d1) * (Math.log10(s2) - Math.log10(s1)) / (d2 - d1));
console.log(sfStr(est(38, [32, 500], [44, 250]), 3));
