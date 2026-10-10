import { Mr, sfStr, dpStr, AR } from "../lib.mjs";
for (const f of ["NH4NO3", "(NH4)2SO4", "CO(NH2)2", "NH3", "H2SO4", "S", "SO3", "H2S2O7"]) console.log(f, Mr(f));
const pctN = (f, nN) => (nN * AR.N / Mr(f)) * 100;
console.log("%N NH4NO3", pctN("NH4NO3", 2), "(NH4)2SO4", pctN("(NH4)2SO4", 2), "urea", pctN("CO(NH2)2", 2));
console.log("t H2SO4 from 1.00 t S", Mr("H2SO4") / Mr("S"));
// lab: 25.0 cm3 of 2.00 mol/dm3 NH3 neutralised by H2SO4 -> mass (NH4)2SO4
const nNH3 = 0.025 * 2.0; console.log("n NH3", nNH3, "mass salt", nNH3 / 2 * Mr("(NH4)2SO4"));
