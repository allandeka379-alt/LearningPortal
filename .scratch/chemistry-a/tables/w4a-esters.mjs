import { kEq, sfStr, Mr, moles } from "../lib.mjs";
// Ex1: Kc: 1.00 mol acid + 1.00 mol ethanol, eqm acid 0.340
const a=0.34, e=1-0.34; console.log("Kc", sfStr(kEq([[1,e],[1,e]],[[1,a],[1,a]]),3), e);
// Ex2: soap: glyceryl tristearate (C57H110O6) mass of NaOH for 10.0 g fat
const M = Mr("C57H110O6"); const n = moles(10.0, M); console.log(M, n, "NaOH g", sfStr(3*n*40,3), "soap g", sfStr(3*n*Mr("C17H35COONa"),3), Mr("C17H35COONa"));
