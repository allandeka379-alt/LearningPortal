import { Mr, sfStr, dpStr, L } from "../lib.mjs";
console.log("CFCl3", Mr("CFCl3"), dpStr(3*35.5/Mr("CFCl3")*100,1), "molecules in 1.00 g", sfStr(1/Mr("CFCl3")*L,3), 1/Mr("CFCl3")*L);
console.log("CF2Cl2", Mr("CF2Cl2"), 2*35.5/Mr("CF2Cl2")*100);
console.log("C2F3Cl3", Mr("C2F3Cl3"), 3*35.5/Mr("C2F3Cl3")*100);
console.log("CF3CHBrCl", Mr("C2HF3BrCl"));
console.log("Cl atoms from 5.00 g CF2Cl2 (1 Cl each)", 5/Mr("CF2Cl2")*L);
