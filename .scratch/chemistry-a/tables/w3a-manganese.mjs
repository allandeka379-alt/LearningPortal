import { ecell, Mr, molesFromSolution, sfStr, dpStr, sciStr, rnd, sf } from "../lib.mjs";
const E = { MnO4Mn2: 1.52, Fe3: 0.77, Cl2: 1.36, MnO2Mn2: 1.23, MnO4MnO42: 0.56, MnO42MnO2: 2.26, O2: 1.23, H2O2O2: 0.68 };
console.log("MnO4- + Fe2+", dpStr(ecell(E.MnO4Mn2, E.Fe3), 2));
console.log("MnO4- + Cl-", dpStr(ecell(E.MnO4Mn2, E.Cl2), 2));
console.log("MnO2 + Cl- (std)", dpStr(ecell(E.MnO2Mn2, E.Cl2), 2));
console.log("disprop MnO4 2-", dpStr(ecell(E.MnO42MnO2, E.MnO4MnO42), 2));
const M = Mr("MnO2"); console.log("Mr MnO2", M);
// worked example: pyrolusite back titration
const nOx = molesFromSolution(50.0, 0.100), nMn7 = molesFromSolution(24.20, 0.0200), excess = nMn7 * 5 / 2, reacted = nOx - excess, mass = reacted * M;
console.log("nOx", sciStr(nOx), "nMnO4", sciStr(nMn7), "excess", sciStr(excess), "reacted", sciStr(reacted), "mass", sfStr(mass, 3), "%", sfStr(mass / 0.500 * 100, 3));
// Fe2+ titration example
const n = molesFromSolution(21.60, 0.0200); console.log("MnO4", sciStr(n), "Fe", sciStr(5*n), "c", sfStr(5*n/0.025, 3));
console.log("Mr KMnO4", Mr("KMnO4"), "mass for 250 cm3 0.0200", sfStr(0.25*0.02*Mr("KMnO4"),3));
