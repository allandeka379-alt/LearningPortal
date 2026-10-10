import { ecell, gibbsFromE, Mr, VM_RTP, sfStr } from "../lib.mjs";
console.log("PbO2/Cl-", ecell(1.47, 1.36), "Sn2+/Fe3+", ecell(0.77, 0.15));
console.log("Mr PbO2", Mr("PbO2"), "PbO", Mr("PbO"), "SnCl4", Mr("SnCl4"), "PbCl2", Mr("PbCl2"));
const n = 4.78 / Mr("PbO2"); console.log("PbO2 4.78", n, "O2 dm3", n / 2 * VM_RTP, "PbO g", n * Mr("PbO"));
