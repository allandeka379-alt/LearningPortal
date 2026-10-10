import { bufferPH, pKa, pH, Mr, molesFromSolution, sfStr, dpStr } from "../lib.mjs";
const Ka = 1.74e-5;
console.log("pKa", pKa(Ka));
console.log("Ex1 0.100 acid/0.150 salt", bufferPH(Ka, 0.1, 0.15));
const nA = molesFromSolution(50, 0.2), nB = molesFromSolution(20, 0.2);
console.log("Ex2 partial neut acid left", nA - nB, "salt", nB, "pH", bufferPH(Ka, nA - nB, nB));
const salt = Ka * 0.1 / 1e-5; console.log("Ex3 salt conc", salt, "n in 500", salt * 0.5, "Mr", Mr("CH3COONa"), "mass", salt * 0.5 * Mr("CH3COONa"));
console.log("add 1.00 cm3 1.00 HCl to 100 cm3 0.100/0.100: before", bufferPH(Ka, 0.01, 0.01), "after", bufferPH(Ka, 0.011, 0.009), "water", pH(0.001 / 0.101));
const pKb = -Math.log10(1.8e-5); console.log("basic buffer pOH", pKb + Math.log10(0.1 / 0.2), "pH", 14 - (pKb + Math.log10(0.1 / 0.2)));
