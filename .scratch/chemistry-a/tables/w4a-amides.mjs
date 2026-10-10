import { Mr, molesFromSolution, sfStr, percentPurity } from "../lib.mjs";
const nHCl = molesFromSolution(50, 0.5), nOH = molesFromSolution(25, 0.4); const nNH3 = nHCl - nOH;
console.log(nHCl, nOH, nNH3, Mr("CH3CONH2"), sfStr(nNH3*Mr("CH3CONH2"),3), sfStr(percentPurity(nNH3*Mr("CH3CONH2"), 0.9),3));
