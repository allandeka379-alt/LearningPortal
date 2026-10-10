// Titration curve tables for the lesson (25.0 cm3 of 0.100 mol/dm3 acid or base in the flask, 0.100 mol/dm3 titrant).
import { pH, pHStrongBase, pHWeakAcid, pKa, KW, molesFromSolution, dpStr, table } from "../lib.mjs";
export function saSb(vA, cA, cB, v) { const nA = molesFromSolution(vA, cA), nB = molesFromSolution(v, cB), V = (vA + v) / 1000;
  if (Math.abs(nA - nB) < 1e-12) return 7; return nA > nB ? pH((nA - nB) / V) : pHStrongBase((nB - nA) / V); }
export function waSb(vA, cA, cB, v, Ka) { const nA = molesFromSolution(vA, cA), nB = molesFromSolution(v, cB), V = (vA + v) / 1000;
  if (v === 0) return pHWeakAcid(Ka, cA);
  if (nB < nA - 1e-12) return pKa(Ka) + Math.log10(nB / (nA - nB));
  if (Math.abs(nA - nB) < 1e-12) { const cs = nA / V; return pHStrongBase(Math.sqrt((KW / Ka) * cs)); }
  return pHStrongBase((nB - nA) / V); }
// strong acid (HCl in flask) titrated with weak base NH3 (Kb)
export function saWb(vA, cA, cB, v, Kb) { const nA = molesFromSolution(vA, cA), nB = molesFromSolution(v, cB), V = (vA + v) / 1000;
  if (nB < nA - 1e-12) return pH((nA - nB) / V);
  if (Math.abs(nA - nB) < 1e-12) { const cs = nA / V; return pH(Math.sqrt((KW / Kb) * cs)); }
  const pOH = -Math.log10(Kb) + Math.log10(nA / (nB - nA)); return 14 - pOH; }
if (process.argv[1].endsWith("w2a-titration-curves-indicators.mjs")) {
  const vs = [0, 5, 12.5, 20, 24, 24.9, 25, 25.1, 26, 30, 40];
  console.log(table(["NaOH added / cm³", "HCl with NaOH", "CH₃COOH with NaOH", "HCl with NH₃"], vs.map((v) => [dpStr(v, v % 1 ? 1 : 1), dpStr(saSb(25, 0.1, 0.1, v), 2), dpStr(waSb(25, 0.1, 0.1, v, 1.74e-5), 2), dpStr(saWb(25, 0.1, 0.1, v, 1.8e-5), 2)])));
}
