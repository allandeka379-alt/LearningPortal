import { Mr, pH, pHStrongBase, sfStr, dpStr, molesFromSolution } from "../lib.mjs";
// WE1: 0.310 g Na2O in 250 cm3 water -> pH
const n = 0.31 / Mr("Na2O");
const oh = (2 * n) / 0.25;
console.log("Na2O Mr", Mr("Na2O"), "n", n, "OH", oh, "pH", pHStrongBase(oh), dpStr(pHStrongBase(oh), 2));
// WE2: 0.417 g PCl5 + water -> H3PO4 + 5HCl; NaOH 0.200 to neutralise all: 3 + 5 = 8 mol OH per PCl5
const nP = 0.417 / Mr("PCl5");
console.log("PCl5 Mr", Mr("PCl5"), "n", nP, "OH needed", 8 * nP, "vol cm3", (8 * nP) / 0.2 * 1000);
