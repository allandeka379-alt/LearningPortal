import { Mr, sfStr, dpStr, sciStr, VM_RTP } from "../lib.mjs";
const S = 1e6 * 0.018; const n = S / 32.1; console.log("S g", S, "mol", sfStr(n, 4), "SO2 g", sciStr(n * Mr("SO2")), "kg", sfStr(n * Mr("SO2") / 1000, 3), "CaCO3 g", sciStr(n * Mr("CaCO3")), "kg", sfStr(n * Mr("CaCO3") / 1000, 3));
console.log("Mr SO2", Mr("SO2"), "CaCO3", Mr("CaCO3"), "CaSO4", Mr("CaSO4"), "gypsum", Mr("CaSO4.2H2O"));
console.log("CO2 from 1 t coal 80% C t", sfStr(0.8 * 44 / 12, 3));
