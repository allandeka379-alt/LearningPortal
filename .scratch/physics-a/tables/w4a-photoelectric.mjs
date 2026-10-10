import { DATA, sfStr, sciTex, table, dpStr } from "../lib.mjs";
const { h, c, e, me } = DATA;
// graph: sodium-like phi = 2.28 eV; f from 5.0 to 9.0 e14
const phi = 2.28;
const fs = [5.0, 6.0, 7.0, 8.0, 9.0];
console.log(table(["f / 10^14 Hz", "E_k max / eV", "V_s / V"], fs.map((f) => { const Ek = (h * f * 1e14) / e - phi; return [f.toFixed(1), Ek > 0 ? dpStr(Ek, 2) : "0 (no emission)", Ek > 0 ? dpStr(Ek, 2) : "—"]; })));
console.log("f0", sciTex(phi * e / h));
// WE1: zinc phi 4.3 eV
const f0 = 4.3 * e / h; console.log("WE1 f0", sciTex(f0), "lambda0", sciTex(c / f0), sfStr(c / f0 * 1e9, 3));
// WE2: 200 nm on zinc
const E = h * c / 200e-9, Ek = E - 4.3 * e; console.log("WE2 E", sciTex(E), sfStr(E / e, 3), "Ek", sciTex(Ek), sfStr(Ek / e, 3), "v", sciTex(Math.sqrt(2 * Ek / me)), "Vs", sfStr(Ek / e, 3));
// WE3 from graph: gradient between points
console.log("grad eV/Hz", h / e, "h", h);
