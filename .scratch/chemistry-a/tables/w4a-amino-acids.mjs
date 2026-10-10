import { Mr, sfStr, dpStr, molesFromSolution } from "../lib.mjs";
console.log("Gly", Mr("C2H5NO2"), "Ala", Mr("C3H7NO2"), "GlyAla", Mr("C2H5NO2")+Mr("C3H7NO2")-Mr("H2O"), Mr("C5H10N2O3"));
console.log("pI", dpStr((2.34+9.60)/2,2));
// titration: 20.0 cm3 of 0.100 glycine hydrochloride (H3N+CH2COOH) with 0.100 NaOH
const n = molesFromSolution(20,0.1); console.log(n, "first eq cm3", n/0.1*1000, "second", 2*n/0.1*1000);
// Approximate pH at the start (0.100 mol/dm3 H3N+CH2COOH, pKa1 2.34) and at the second equivalence point
// (0.0333 mol/dm3 H2NCH2COO-, pKb = 14 - 9.60), for the "about" values in the lesson table.
const h0 = Math.sqrt(10 ** -2.34 * 0.1);
const oh2 = Math.sqrt(10 ** -(14 - 9.6) * (0.002 / 0.06));
console.log("start pH", dpStr(-Math.log10(h0), 2), "second eq pH", dpStr(14 + Math.log10(oh2), 2));
