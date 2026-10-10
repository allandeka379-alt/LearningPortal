import { DATA, sfStr, sciTex, table, rad } from "../lib.mjs";
const { u, e, k_e } = DATA;
// Rutherford relative counts ∝ 1/sin^4(θ/2), normalised to 10^6 at 10°
const angles = [10, 20, 30, 45, 60, 90, 120, 150];
const f = (th) => 1 / Math.sin(rad(th / 2)) ** 4;
const N0 = 1e6 / f(10);
console.log(table(["θ / °", "relative number per unit time"], angles.map((a) => [a, sfStr(N0 * f(a), 2)])));
// WE1: U-235 composition, charge, mass
console.log("U235 Q", sciTex(92 * e, 3), "m", sciTex(235 * u, 3));
// WE2: gold nucleus density: A=197, r = 7.0e-15
const m = 197 * u, r = 7.0e-15, V = (4 / 3) * Math.PI * r ** 3;
console.log("Au m", sciTex(m), "V", sciTex(V), "rho", sciTex(m / V, 2));
// atom radius 1.4e-10 for gold: ratio
console.log("ratio radii", sfStr(1.4e-10 / r, 2), "vol", sciTex((1.4e-10 / r) ** 3, 1));
