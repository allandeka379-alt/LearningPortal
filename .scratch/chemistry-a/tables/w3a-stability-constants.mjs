import { sciStr, sfStr, chk } from "../lib.mjs";
// lesson example 2: ratio [Cu(NH3)4(H2O)2]2+ / [Cu(H2O)6]2+ at [NH3] = 0.10, Kstab = 1.3e13 (data, log 13.1)
const K = 1.3e13; const r = K * 0.1 ** 4; console.log("ratio", sciStr(r, 2));
// with [NH3] = 0.010
console.log("ratio 0.010", sciStr(K * 0.01 ** 4, 2));
// log K values
for (const lk of [13.1, 5.6, 18.8, 7.2]) console.log(lk, sciStr(10 ** lk, 2));
// ratio CuEDTA vs Cu ammine competing: K(EDTA)/K(NH3)
console.log("K EDTA / K NH3", sciStr(6.3e18 / 1.3e13, 2));
