import { Mr, moles, sfStr, dpStr, VM_RTP } from "../lib.mjs";
// Lesson WE1: 25.0 cm3 propane in 200 cm3 O2 (C3H8 + 5O2 -> 3CO2 + 4H2O)
const vP = 25.0, vO = 200; console.log("O2 used", 5*vP, "CO2", 3*vP, "O2 left", vO-5*vP, "after cooling", 3*vP + vO-5*vP, "after NaOH", vO-5*vP);
// Lesson WE2: 1.00 kg octane -> CO2
const n = moles(1000, Mr("C8H18")); console.log("Mr", Mr("C8H18"), "n", n, "nCO2", 8*n, "mass kg", 8*n*Mr("CO2")/1000, sfStr(n,3), sfStr(8*n,3), sfStr(8*n*Mr("CO2")/1000,3));
