import { Mr, moles, percentYield, sfStr, dpStr } from "../lib.mjs";
const n = moles(7.8, Mr("C6H6")); const th = n * Mr("C6H5NO2"); console.log(Mr("C6H6"), Mr("C6H5NO2"), n, th, percentYield(9.84, th));
// question data
const n2 = moles(4.6, Mr("C7H8")); console.log("toluene", Mr("C7H8"), n2, n2*Mr("C7H6O2"), percentYield(4.27, n2*Mr("C7H6O2")));
const n3 = moles(3.9, Mr("C6H6")); console.log("bromobenzene", Mr("C6H5Br"), n3*Mr("C6H5Br"), percentYield(5.5, n3*Mr("C6H5Br")));
