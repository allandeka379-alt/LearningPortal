import { DATA, sfStr, sciTex } from "../lib.mjs";
const e = DATA.e;
const VH = (B, I, n, t) => (B * I) / (n * t * e);
console.log("WE1 copper", sciTex(VH(0.50, 5.0, 8.5e28, 0.10e-3)));
console.log("WE2 semi mV", sfStr(VH(0.10, 25e-3, 2.0e22, 0.20e-3) * 1e3, 3), "v drift", sciTex(25e-3 / (2.0e22 * 0.20e-3 * 4.0e-3 * e)));
// WE3: n from V_H = 4.8 mV, B 0.25 T, I 30 mA, t 0.50 mm
console.log("WE3 n", sciTex((0.25 * 30e-3) / (4.8e-3 * 0.50e-3 * e)));
// calibration table V_H vs B for probe (n=2e22,t=0.2mm,I=25mA)
for (const B of [0.05, 0.10, 0.15, 0.20]) console.log(B, sfStr(VH(B, 25e-3, 2.0e22, 0.20e-3) * 1e3, 3));
