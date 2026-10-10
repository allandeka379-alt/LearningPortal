import { Mr, moles, sfStr, percentYield } from "../lib.mjs";
// Lesson: two-step synthesis: 5.80 g propanone -> hydroxynitrile 80%, -> acid 70%
const n = moles(5.80, Mr("C3H6O")); const hn = Mr("C4H7NO"); const acid = Mr("C4H8O3");
console.log(n, hn, acid, "overall %", 0.8*0.7*100, "mass acid", sfStr(n*0.8*0.7*acid,3));
