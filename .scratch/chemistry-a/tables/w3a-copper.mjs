import { ecell, Mr, molesFromSolution, massLiberated, charge, sfStr, dpStr, sciStr } from "../lib.mjs";
const E = { CupCu: 0.52, Cu2Cup: 0.15, Cu2Cu: 0.34, I2: 0.54, Cu2CuI: 0.86 };
console.log("disprop", dpStr(ecell(E.CupCu, E.Cu2Cup), 2), "Cu2+/Cu+ vs I2", dpStr(ecell(E.Cu2Cup, E.I2), 2), "Cu2+/CuI vs I2", dpStr(ecell(E.Cu2CuI, E.I2), 2));
const M = Mr("CuSO4.5H2O"); const n = molesFromSolution(19.70, 0.05); console.log("Mr", M, "n per 25", sciStr(n), "total", sciStr(n*10), "mass", sfStr(n*10*M,3), "%", sfStr(n*10*M/2.5*100,3));
const m = massLiberated(charge(2.5, 3600), 63.5, 2); console.log("Cu 2.50 A 1 h", sfStr(m, 3));
console.log("Mr CuFeS2", Mr("CuFeS2"), "%Cu", sfStr(63.5/Mr("CuFeS2")*100, 3));
