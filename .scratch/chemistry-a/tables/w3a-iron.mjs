import { ecell, Mr, molesFromSolution, sfStr, dpStr, sciStr } from "../lib.mjs";
const E = { Fe3Fe2: 0.77, CN: 0.36, FeOH: -0.56, O2acid: 1.23, O2alk: 0.40, I2: 0.54, Fe2Fe: -0.44, Zn: -0.76, Sn: -0.14, Mg: -2.38 };
console.log("O2 acid Fe2+", dpStr(ecell(E.O2acid, E.Fe3Fe2), 2), "O2 alk Fe(OH)2", dpStr(ecell(E.O2alk, E.FeOH), 2), "O2 acid CN", dpStr(ecell(E.O2acid, E.CN), 2));
console.log("Fe3+ + I-", dpStr(ecell(E.Fe3Fe2, E.I2), 2), "[Fe(CN)6]3- + I-", dpStr(ecell(E.CN, E.I2), 2));
console.log("rust cell", dpStr(ecell(E.O2alk, E.Fe2Fe), 2));
const MFe2O3 = Mr("Fe2O3"); console.log("Mr Fe2O3", MFe2O3, "Fe from 800 kg", sfStr(800 * 111.6 / MFe2O3, 3));
console.log("Mr Fe3O4", Mr("Fe3O4"), "%Fe", sfStr(3*55.8/Mr("Fe3O4")*100,3));
const n = molesFromSolution(18.40, 0.0100); const fe = 5*n*10/5; console.log("tablets: MnO4", sciStr(n), "Fe per 25", sciStr(5*n), "per 250", sciStr(5*n*10), "per tablet", sciStr(fe), "mg", sfStr(fe*55.8*1000,3));
