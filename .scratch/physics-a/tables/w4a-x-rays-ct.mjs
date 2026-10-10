import { DATA, sfStr, sciTex, table, dpStr, attenuate } from "../lib.mjs";
const { h, c, e } = DATA;
console.log("lmin 80kV", sciTex(h * c / (e * 80e3)));
console.log("Ek max J", sciTex(e * 80e3));
const muT = 20, muB = 100; const x = 0.030;
console.log("tissue 3cm", sfStr(attenuate(1, muT, x), 3), "bone 3cm", sfStr(attenuate(1, muB, x), 3), attenuate(1, muB, x));
const muAl = 95; console.log("hvt Al mm", sfStr(Math.log(2) / muAl * 1000, 3));
console.log(table(["x / mm", "I/I0"], [0, 2, 4, 6, 8, 10, 12].map((mm) => [mm, dpStr(attenuate(1, muAl, mm / 1000), 3)])));
// 1% efficiency: 100 kV, 5.0 mA -> P, X-ray power, heat
console.log("P", 100e3 * 5e-3);
