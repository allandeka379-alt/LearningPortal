import { Mr, VM_RTP, sfStr } from "../lib.mjs";
const mass = 2000 * 2.0 / 1000; const n = mass / Mr("Cl2");
console.log("Cl2 g", mass, "Mr", Mr("Cl2"), "n", n, "vol dm3", n * VM_RTP);
