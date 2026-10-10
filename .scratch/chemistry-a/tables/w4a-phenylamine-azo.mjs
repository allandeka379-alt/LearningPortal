import { Mr, moles, sfStr, percentYield } from "../lib.mjs";
const n = moles(12.3, Mr("C6H5NO2")); console.log(Mr("C6H5NO2"), n, Mr("C6H5NH2"), sfStr(n*Mr("C6H5NH2"),3), "yield 6.51", sfStr(percentYield(6.51, n*Mr("C6H5NH2")),3));
