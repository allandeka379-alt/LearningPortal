import { Mr, moles, sfStr, dpStr, pHWeakAcid, pKa, sciStr } from "../lib.mjs";
// lesson: pH of 0.100 mol/dm3 phenol, Ka 1.3e-10
const h = Math.sqrt(1.3e-10 * 0.1); console.log("H", sciStr(h,3), "pH", dpStr(pHWeakAcid(1.3e-10, 0.1),2), "pKa", dpStr(pKa(1.3e-10),2));
// lesson: 0.470 g phenol + bromine water -> tribromophenol
const n = moles(0.470, Mr("C6H5OH")); console.log(Mr("C6H5OH"), n, Mr("C6H2Br3OH"), sfStr(n*Mr("C6H2Br3OH"),3), "Br2 mass", sfStr(3*n*Mr("Br2"),3));
