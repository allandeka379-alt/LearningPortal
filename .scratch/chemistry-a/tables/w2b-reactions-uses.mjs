import { Mr, VM_RTP, sfStr } from "../lib.mjs";
// WE1: 3.28 g Ca(NO3)2 decomposed: 2Ca(NO3)2 -> 2CaO + 4NO2 + O2 ; total gas volume
const M = Mr("Ca(NO3)2"); const n = 3.28 / M;
console.log("Ca(NO3)2 Mr", M, "n", n, "NO2", 2*n, "O2", n/2, "total gas dm3", 2.5*n*VM_RTP, "CaO mass", n*Mr("CaO"));
// WE2: antacid 0.500 g Mg(OH)2 neutralises HCl: mol HCl, volume of 0.100 HCl (stomach acid approx)
const nm = 0.5 / Mr("Mg(OH)2");
console.log("Mg(OH)2 Mr", Mr("Mg(OH)2"), "n", nm, "HCl", 2*nm, "vol 0.100 cm3", 2*nm/0.1*1000);
