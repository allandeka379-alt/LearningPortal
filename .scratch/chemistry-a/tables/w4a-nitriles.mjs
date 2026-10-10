import { Mr, moles, sfStr, percentYield } from "../lib.mjs";
// 1-bromobutane 6.85 g -> pentanenitrile, 65.0% ; then hydrolysis
const n = moles(6.85, Mr("C4H9Br")); console.log(Mr("C4H9Br"), n, Mr("C4H9CN"), sfStr(n*Mr("C4H9CN"),3), "actual at 65%", sfStr(0.65*n*Mr("C4H9CN"),3));
