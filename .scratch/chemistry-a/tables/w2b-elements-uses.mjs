import { Mr, AR, VM_RTP, sfStr } from "../lib.mjs";
const n = 1000 / Mr("SiO2");
console.log("SiO2", Mr("SiO2"), "n", n, "Si g", n * AR.Si, "C g", 2 * n * AR.C, "CO dm3", 2 * n * VM_RTP);
// solder 63% Sn 37% Pb in 100 g: mole ratio
console.log("Sn/Pb mol ratio 60:40", (60 / AR.Sn) / (40 / AR.Pb));
const cu = 88 / AR.Cu, sn = 12 / AR.Sn;
console.log("bronze Cu mol", cu, "Sn mol", sn, "ratio", cu / sn);
