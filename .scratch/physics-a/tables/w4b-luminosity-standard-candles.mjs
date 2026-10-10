import { fluxIntensity, sciTex, sfStr } from "../lib.mjs";
const F = fluxIntensity(3.83e26, 1.5e11); console.log("Fsun", F);
const d = Math.sqrt(1.2e30 / (4 * Math.PI * 2.5e-12)); console.log("d", d, "ly", d / 9.46e15);
// table F at 1,2,3,4 AU relative
for (const k of [1, 2, 3, 5, 10]) console.log(k, F / k ** 2);
// Type Ia comparison: two supernovae same L; F1/F2 = 16 → d2/d1 = 4
