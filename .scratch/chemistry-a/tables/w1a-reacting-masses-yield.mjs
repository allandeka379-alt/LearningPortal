import { Mr, moles, massOf, percentYield, percentPurity, VM_RTP, sfStr } from "../lib.mjs";
const n = moles(25.0, Mr("CaCO3")); const m = massOf(n, Mr("CaO")); console.log("CaCO3", Mr("CaCO3"), n, "CaO", Mr("CaO"), m, "yield", percentYield(12.6, m));
const nAl = moles(10.0, 27.0), nCl = moles(20.0, Mr("Cl2")); console.log("Al", nAl, "Cl2", nCl, "need", 1.5*nAl, "AlCl3", Mr("AlCl3"), nCl*2/3, nCl*2/3*Mr("AlCl3"));
const nCO2 = 1.08 / VM_RTP; const mC = massOf(nCO2, Mr("CaCO3")); console.log("purity", nCO2, mC, percentPurity(mC, 5.00));
