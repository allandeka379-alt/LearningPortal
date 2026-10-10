import { kaFromPKa, pHWeakAcid, dpStr, sciStr, molesFromSolution, sfStr, Mr } from "../lib.mjs";
// Lesson ex1: pH of 0.100 mol/dm3 ethanoic (pKa 4.76) vs chloroethanoic (pKa 2.86)
for (const pk of [4.76, 2.86]) console.log(pk, sciStr(kaFromPKa(pk),3), sciStr(Math.sqrt(kaFromPKa(pk)*0.1),3), dpStr(pHWeakAcid(kaFromPKa(pk),0.1),2));
console.log("ratio", kaFromPKa(2.86)/kaFromPKa(4.76));
// Lesson ex2: ethanedioic acid titration: 25.0 cm3 of H2C2O4 needs 22.40 cm3 of 0.0200 KMnO4
const nMn = molesFromSolution(22.4, 0.02); const nOx = nMn*5/2; console.log(nMn, nOx, nOx/0.025, sfStr(nOx/0.025,3), Mr("H2C2O4.2H2O"));
