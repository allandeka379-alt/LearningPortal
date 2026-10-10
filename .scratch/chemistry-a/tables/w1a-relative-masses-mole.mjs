import { arFromIsotopes, Mr, moles, L, sfStr, sciStr, chk } from "../lib.mjs";
console.log("Cu", arFromIsotopes([[63,69.2],[65,30.8]]));
console.log("Mg peaks", arFromIsotopes([[24,7.9],[25,1.0],[26,1.1]]));
const M = Mr("Al2(SO4)3"); const n = moles(17.1, M); console.log("Al2(SO4)3", M, n, sciStr(n*L), "ions", sciStr(n*5*L), "O atoms", sciStr(n*12*L));
console.log("Mr list", Mr("Ca(OH)2"), Mr("CuSO4.5H2O"), Mr("C6H12O6"), Mr("(NH4)2SO4"));
