import { Mr, moles, sfStr, percentYield } from "../lib.mjs";
const n = moles(0.785, Mr("CH3COCl")); console.log(Mr("CH3COCl"), n, "NaOH cm3 at 0.500", 2*n/0.5*1000);
// phenyl benzoate yield: 2.35 g phenol, product 3.96 g
const p = moles(2.35, Mr("C6H5OH")); const th = p*Mr("C6H5COOC6H5"); console.log(Mr("C6H5COOC6H5"), sfStr(th,3), sfStr(percentYield(3.96, th),3));
