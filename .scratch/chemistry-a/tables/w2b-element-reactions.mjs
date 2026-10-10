import { Mr, AR, VM_RTP, sfStr, sf } from "../lib.mjs";
const nMg = 1.2 / AR.Mg;
console.log("Mg 1.20 g n", nMg, "MgO", Mr("MgO"), "mass", nMg * Mr("MgO"), sf(nMg * Mr("MgO"), 3));
const nNa = 0.46 / AR.Na;
console.log("Na 0.46 n", nNa, "H2 cm3", (nNa / 2) * VM_RTP * 1000);
const nP = 0.62 / Mr("P4");
console.log("P4 0.62 g n", nP, "P4O10", Mr("P4O10"), nP * Mr("P4O10"));
