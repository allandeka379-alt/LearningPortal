import { Mr, kspFromSolubility, solubilityFromKsp, solubilityCommonIon, sfStr, sciStr } from "../lib.mjs";
const s1 = 1.92e-3 / Mr("AgCl"); console.log("AgCl Mr", Mr("AgCl"), "s", s1, "Ksp", kspFromSolubility(s1));
console.log("PbI2 s 1.52e-3 Ksp", kspFromSolubility(1.52e-3, 1, 2));
console.log("Ag2CrO4 Ksp 1.1e-12 s", solubilityFromKsp(1.1e-12, 2, 1), "[Ag+]", 2 * solubilityFromKsp(1.1e-12, 2, 1));
console.log("IP mix", 1e-4 * 1e-4);
console.log("AgCl in 0.100 NaCl s", solubilityCommonIon(1.8e-10, 0.1), "pure", solubilityFromKsp(1.8e-10));
