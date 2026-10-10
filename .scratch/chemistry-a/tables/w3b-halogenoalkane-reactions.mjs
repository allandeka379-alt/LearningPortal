import { Mr, moles, percentYield, sfStr, dpStr } from "../lib.mjs";
const n = moles(7.4, Mr("C4H10O")); const th = n * Mr("C4H9Br"); console.log(Mr("C4H10O"), Mr("C4H9Br"), n, th, percentYield(10.4, th));
// questions: ethanol -> bromoethane ; 2-methylpropan-2-ol -> 2-chloro-2-methylpropane
const n2 = moles(5.55, Mr("C4H10O")); const th2 = n2*Mr("C4H9Cl"); console.log("tbuCl", Mr("C4H9Cl"), n2, th2, percentYield(5.2, th2));
const n3 = moles(3.45, Mr("C2H6O")); console.log("EtBr", Mr("C2H5Br"), n3, n3*Mr("C2H5Br"), percentYield(5.9, n3*Mr("C2H5Br")));
const n4 = moles(4.36, Mr("C2H5Br")); console.log("nitrile", n4, n4*Mr("C2H5CN"));
