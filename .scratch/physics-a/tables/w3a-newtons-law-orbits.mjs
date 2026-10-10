import { DATA, sfStr, sciTex } from "../lib.mjs";
const G = DATA.G;
// Example 1: force between Earth and Moon
const ME = 5.97e24, Mm = 7.35e22, d = 3.84e8;
console.log("F E-M", sciTex(G * ME * Mm / d / d));
// Example 2: geostationary radius
const T = 24 * 3600; const r = Math.cbrt(G * ME * T * T / (4 * Math.PI ** 2));
console.log("geo r", sciTex(r), "height", sciTex(r - 6.37e6), "v", sfStr(2 * Math.PI * r / T, 3));
// Example 3: mass of Jupiter from Io: r=4.22e8 m, T=1.77 days
const rI = 4.22e8, TI = 1.77 * 86400; console.log("TI s", sciTex(TI), "MJ", sciTex(4 * Math.PI ** 2 * rI ** 3 / (G * TI * TI)));
// Example 4: low orbit 300 km speed and period
const r4 = 6.37e6 + 3.0e5; const v4 = Math.sqrt(G * ME / r4); console.log("v low", sfStr(v4, 3), "T min", sfStr(2 * Math.PI * r4 / v4 / 60, 3));
// table: orbital radius vs period for some orbits
for (const h of [3.0e5, 2.0e6, 2.02e7]) { const rr = 6.37e6 + h; const vv = Math.sqrt(G * ME / rr); console.log(h, sfStr(rr / 1e6, 3), sfStr(vv / 1000, 3), sfStr(2 * Math.PI * rr / vv / 3600, 3)); }
console.log("geo row", sfStr(r / 1e6, 3), sfStr(Math.sqrt(G * ME / r) / 1000, 3));
