import { molesFromSolution, Mr, sfStr, dpStr, AR } from "../lib.mjs";
{ const nMn = molesFromSolution(24.60, 0.0200); const nFe = 5 * nMn; const tot = nFe * 10; const m = tot * AR.Fe; console.log("Fe", nMn, nFe, tot, m, (m / 1.40) * 100); }
{ const nS = molesFromSolution(21.20, 0.0500); const tot = nS * 10; const m = tot * AR.Cu; console.log("Cu", nS, tot, m, (m / 1.10) * 100); }
{ const nMn = molesFromSolution(20.00, 0.0200); const nOx = 2.5 * nMn; const tot = nOx * 10; console.log("ox", nMn, nOx, tot, 1.26 / tot, Mr("H2C2O4"), (1.26 / tot - Mr("H2C2O4")) / Mr("H2O")); }
