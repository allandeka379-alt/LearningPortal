import { Mr, sfStr, moles, percentYield } from "../lib.mjs";
const n = moles(15.6, Mr("C6H6")); const th = n * Mr("C6H5NH2");
console.log("Mr", Mr("C6H6"), Mr("C6H5NO2"), Mr("C6H5NH2"), "n", n, "theo", th, "yield", sfStr(percentYield(11.2, th),3), "step2 if step1 80%", sfStr(percentYield(11.2, th)/80*100,3));
