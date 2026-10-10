import { Mr, empiricalFormula, sfStr, dpStr } from "../lib.mjs";
// Worked example 1: ethyl propanoate CH3CH2COOCH2CH3 = C5H10O2
console.log("C5H10O2", Mr("C5H10O2"), "%C", dpStr(5*12/Mr("C5H10O2")*100,1));
// Worked example 2: 2-methylbutanal? use butanedioic? Use CH3CH(CH3)CH2CHO = C5H10O ; and hex-2-ene C6H12 empirical CH2
console.log("C6H12", Mr("C6H12"), "C5H10O", Mr("C5H10O"));
// Percentage composition example: compound C 54.5 H 9.1 O 36.4 -> C2H4O ; Mr 88 -> C4H8O2
const e = empiricalFormula({ C: 54.5, H: 9.1, O: 36.4 }); console.log(e, Mr("C2H4O"), Mr("C4H8O2"));
