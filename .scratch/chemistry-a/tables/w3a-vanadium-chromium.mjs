import { ecell, Mr, sfStr, dpStr } from "../lib.mjs";
const E = { VO2p: 1.00, VO2: 0.34, V3: -0.26, V2: -1.20, Zn: -0.76, Cr2O7: 1.33, Fe3: 0.77, SO4SO2: 0.17, Cr3Cr2: -0.41 };
console.log("Zn: VO2+->VO2+", dpStr(ecell(E.VO2p, E.Zn), 2), "VO2+->V3+", dpStr(ecell(E.VO2, E.Zn), 2), "V3+->V2+", dpStr(ecell(E.V3, E.Zn), 2));
console.log("Fe2+ reduce VO2+?", dpStr(ecell(E.VO2p, E.Fe3), 2), "Fe2+ reduce VO2+ to V3+", dpStr(ecell(E.VO2, E.Fe3), 2));
console.log("dichromate + Fe2+", dpStr(ecell(E.Cr2O7, E.Fe3), 2), "dichromate + SO2", dpStr(ecell(E.Cr2O7, E.SO4SO2), 2));
const M = Mr("FeCr2O4"); console.log("Mr FeCr2O4", M, "%Cr", sfStr(104 / M * 100, 3));
console.log("Zn reduce Cr3+ to Cr2+", dpStr(ecell(E.Cr3Cr2, E.Zn), 2));
