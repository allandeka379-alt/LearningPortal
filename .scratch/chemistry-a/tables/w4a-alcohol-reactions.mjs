import { Mr, moles, VM_RTP, sfStr, percentYield } from "../lib.mjs";
const n = moles(2.30, Mr("C2H5OH")); console.log("Na:", n, n/2, (n/2)*VM_RTP*1000);
const p = moles(1.50, Mr("C3H7OH")); const mi = p*Mr("CHI3"); console.log("CHI3", Mr("CHI3"), p, sfStr(mi,3));
const e = moles(4.60, Mr("C2H5OH")); const th = e*Mr("CH3COOC2H5"); console.log("ester", Mr("CH3COOC2H5"), e, th, sfStr(percentYield(5.28, th),3));
