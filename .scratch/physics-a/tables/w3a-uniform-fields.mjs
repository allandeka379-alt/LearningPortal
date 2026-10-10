import { DATA, sfStr, sciTex } from "../lib.mjs";
const e = DATA.e, me = DATA.me;
const V = 600, d = 0.040; const E = V / d; const F = e * E; const a = F / me;
console.log("E", E, "F", sciTex(F), "a", sciTex(a));
const Va = 2000; const KE = e * Va; const v = Math.sqrt(2 * KE / me);
console.log("KE", sciTex(KE), "v", sciTex(v));
const L = 0.050; const tt = L / v; const y = 0.5 * a * tt * tt; const vy = a * tt;
console.log("t", sciTex(tt), "y mm", sfStr(y * 1000, 3), "vy", sciTex(vy), "angle", sfStr(Math.atan(vy / v) * 180 / Math.PI, 3));
// ink drop
const q = 1.5e-13, m = 2.0e-10, Vp = 1500, dp = 2.0e-3, Lp = 0.012, vd = 20;
const Ed = Vp / dp, ad = q * Ed / m, td = Lp / vd, yd = 0.5 * ad * td * td;
console.log("ink E", Ed, "a", sfStr(ad, 3), "t", td, "y mm", sfStr(yd * 1000, 3), "weight ratio", sciTex(q * Ed / (m * 9.81)));
