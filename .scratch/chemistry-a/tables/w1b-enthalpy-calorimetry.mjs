import { heatQ, deltaHFromQ, molesFromSolution, moles, Mr, sfStr, dpStr, pctDifference } from "../lib.mjs";
// Ex1 neutralisation
{ const q = heatQ(100.0, 6.7); const n = molesFromSolution(50.0, 1.00); console.log("neut q", q, "n", n, "dH", deltaHFromQ(q, n), sfStr(deltaHFromQ(q, n), 3)); }
// Ex2 combustion of ethanol
{ const M = Mr("C2H5OH"); const mb = 0.92; const n = moles(mb, M); const q = heatQ(150.0, 24.0); console.log("comb M", M, "n", n, "q", q, "dH", deltaHFromQ(q, n), sfStr(deltaHFromQ(q, n), 3), "pct of 1367", (deltaHFromQ(q,n)/-1367*100)); }
// Ex3 displacement Zn + CuSO4, extrapolated dT
{ const n = molesFromSolution(25.0, 0.400); const q = heatQ(25.0, 19.6); console.log("disp n", n, "q", q, "dH", deltaHFromQ(q, n), sfStr(deltaHFromQ(q, n), 3)); }
