import { DATA, sfStr, sciTex } from "../lib.mjs";
const M = 0.018, rhoW = 1000;
const rhoS = (101325 * M) / (DATA.R * 373.15);
console.log("steam density", rhoS, "ratio", rhoW / rhoS, "spacing ratio", Math.cbrt(rhoW / rhoS));
const vW = M / (rhoW * DATA.NA); console.log("vol per molecule water", sciTex(vW), "spacing", sciTex(Math.cbrt(vW)));
const vS = M / (rhoS * DATA.NA); console.log("vol per molecule steam", sciTex(vS), "spacing", sciTex(Math.cbrt(vS)));
const L = 2.26e6; const e1 = (L * M) / DATA.NA; console.log("evap energy per molecule", sciTex(e1), "eV", e1 / DATA.e);
const ke = 1.5 * DATA.k * 373.15; console.log("mean KE at 373", sciTex(ke), "ratio", e1 / ke);
