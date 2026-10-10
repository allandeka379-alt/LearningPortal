import { Mr, sfStr, dpStr, sciStr, VM_RTP } from "../lib.mjs";
console.log("ore t for 1 kg", sfStr(1000 / (3.5 * 0.8), 3));
const c = Mr("Pt(NH3)2Cl2"); console.log("cisplatin", c, "%Pt", sfStr(195.1 / c * 100, 3), "Pt in 60 mg", sfStr(60 * 195.1 / c, 3));
const h = Mr("(NH4)2PtCl6"); console.log("hexachloroplatinate", h, "Pt from 2.00 g", sfStr(2 * 195.1 / h, 3));
// CO + NO: 2CO + 2NO -> 2CO2 + N2; 1.20 dm3 NO -> N2 0.600 dm3; mass CO
console.log("CO mol for 1.20 dm3 NO", sfStr(1.2 / VM_RTP, 3), "mass CO", sfStr(1.2 / VM_RTP * 28, 3));
