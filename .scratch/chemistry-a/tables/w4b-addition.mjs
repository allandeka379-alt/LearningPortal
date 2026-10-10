import { Mr, sfStr, dpStr, chk, moles, VM_RTP } from "../lib.mjs";
const m = Mr("C2H3Cl");
console.log("Mr C2H3Cl", m, "C2H4", Mr("C2H4"), "C3H6", Mr("C3H6"));
const chain = 1.5e5; console.log("units in 1.50e5 PVC", chain / m);
console.log("%Cl in PVC", sfStr(35.5 / m * 100, 3));
// burning 1.00 kg PVC -> HCl moles and volume
const n = 1000 / m; console.log("mol units in 1 kg", sfStr(n, 3), "HCl vol dm3", sfStr(n * VM_RTP, 3));
