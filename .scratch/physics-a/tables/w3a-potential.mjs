import { DATA, sfStr, sciTex, gPotential } from "../lib.mjs";
const G = DATA.G, ME = 5.97e24, RE = 6.37e6;
console.log("phi surface", sciTex(gPotential(ME, RE)));
for (const k of [1, 2, 3, 4, 6.6]) console.log(k, sfStr(k * RE / 1e6, 3), sciTex(gPotential(ME, k * RE)), "->", sfStr(gPotential(ME, k * RE) / 1e7, 3));
// Ex2: 1200 kg satellite raised from r1 = 6.37e6+3.0e5 to 4.22e7
const m = 1200, r1 = 6.67e6, r2 = 4.22e7; const dE = G * ME * m * (1 / r1 - 1 / r2);
console.log("dEp", sciTex(dE), "phi1", sciTex(gPotential(ME, r1)), "phi2", sciTex(gPotential(ME, r2)));
// Ex3: escape speed Earth
console.log("vesc", sfStr(Math.sqrt(2 * G * ME / RE), 3));
// Ex4: mgh vs exact for 100 km
const h = 1.0e5; console.log("exact", sciTex(G * ME * 1 * (1 / RE - 1 / (RE + h))), "mgh", sciTex(9.81 * h));
