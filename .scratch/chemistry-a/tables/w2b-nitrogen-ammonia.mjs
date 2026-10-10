import { Mr, AR, VM_RTP, sfStr } from "../lib.mjs";
console.log("NH4NO3", Mr("NH4NO3"), "%N", 2 * AR.N / Mr("NH4NO3") * 100);
const n = 5.35 / Mr("NH4Cl"); console.log("NH4Cl", Mr("NH4Cl"), n, "NH3 dm3", n * VM_RTP);
console.log("(NH4)2SO4", Mr("(NH4)2SO4"), 2 * 14 / Mr("(NH4)2SO4") * 100);
