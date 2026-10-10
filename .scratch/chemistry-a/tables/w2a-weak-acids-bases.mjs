import { pH, hFromPH, pKa, kaFromPH, pHWeakAcid, sfStr, dpStr, sciStr, KW } from "../lib.mjs";
const Ka = 1.74e-5;
console.log("ethanoic 0.0500: H", Math.sqrt(Ka * 0.05), "pH", pHWeakAcid(Ka, 0.05), "pct", Math.sqrt(Ka * 0.05) / 0.05 * 100);
console.log("methanoic pH 2.38 c 0.100: Ka", kaFromPH(2.38, 0.1), "pKa", pKa(kaFromPH(2.38, 0.1)), "H", hFromPH(2.38));
for (const [n, k] of [["chloroethanoic", 1.38e-3], ["methanoic", 1.78e-4], ["benzoic", 6.3e-5], ["ethanoic", 1.74e-5], ["phenol", 1.3e-10]]) console.log(n, sciStr(k), dpStr(pKa(k), 2));
const Kb = 1.8e-5; const oh = Math.sqrt(Kb * 0.1);
console.log("NH3 0.100 OH", oh, "pOH", -Math.log10(oh), "pH", 14 + Math.log10(oh), "pKb", -Math.log10(Kb), "Ka NH4+", KW / Kb, "pKa", pKa(KW / Kb));
