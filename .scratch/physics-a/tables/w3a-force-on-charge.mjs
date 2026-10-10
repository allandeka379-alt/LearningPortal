import { DATA, sfStr, sciTex } from "../lib.mjs";
const e = DATA.e, me = DATA.me, u = DATA.u;
console.log("WE1 F", sciTex(0.40 * e * 2.0e6), "a", sciTex(0.40 * e * 2.0e6 / DATA.mp));
const r = me * 3.0e7 / (e * 2.0e-3); console.log("WE2 r", sfStr(r, 3), "T", sciTex(2 * Math.PI * me / (e * 2.0e-3)));
const v = 2.4e4 / 0.060; console.log("WE3 v", v);
const r20 = 20 * u * v / (e * 0.10), r22 = 22 * u * v / (e * 0.10);
console.log("r20", sfStr(r20, 3), "r22", sfStr(r22, 3), "sep", sfStr(2 * (r22 - r20), 3));
