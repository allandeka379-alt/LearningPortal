import { Mr, moles, sfStr, dpStr, sciStr, pOH, kaFromPKa } from "../lib.mjs";
const Kb = kaFromPKa(3.27); const oh = Math.sqrt(Kb*0.15); console.log("Kb", sciStr(Kb,3), "OH", sciStr(oh,3), "pOH", dpStr(pOH(oh),2), "pH", dpStr(14-pOH(oh),2));
// Ex: ethylamine from 3.27 g bromoethane? -> mass of ethylamine; from ethanenitrile 4.10 g with LiAlH4
const n = moles(4.10, Mr("CH3CN")); console.log(Mr("CH3CN"), n, Mr("C2H5NH2"), sfStr(n*Mr("C2H5NH2"),3));
