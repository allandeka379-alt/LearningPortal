import { solutionEnthalpy, sfStr } from "../lib.mjs";
const r = { Mg: 0.065, Ca: 0.099, Sr: 0.113, Ba: 0.135 };
for (const [k, v] of Object.entries(r)) console.log(k, "charge/radius", (2 / v).toFixed(1));
// Lesson WE: values given in the question (kJ/mol)
const hyd = { Mg: -1920, Ba: -1360 }, so4 = -1100;
const LE = { MgSO4: -2870, BaSO4: -2470 };
console.log("MgSO4 dHsol", solutionEnthalpy(LE.MgSO4, [hyd.Mg, so4]));
console.log("BaSO4 dHsol", solutionEnthalpy(LE.BaSO4, [hyd.Ba, so4]));
const oh = -460; const LH = { Mg: -2995, Ba: -2320 };
console.log("Mg(OH)2", solutionEnthalpy(LH.Mg, [hyd.Mg, oh, oh]), "Ba(OH)2", solutionEnthalpy(LH.Ba, [hyd.Ba, oh, oh]));
