import { sfStr, sciTex, rad, table, dpStr } from "../lib.mjs";
const phi = 0.12 * 2.0e-3 * Math.cos(rad(30)); console.log("WE1 phi", sciTex(phi), "link", sciTex(200 * phi));
console.log("WE2 E", 0.060 * 0.50 * 4.0);
console.log("WE3 E", sfStr(150 * 0.40 * 3.0e-3 / 0.25, 3));
// graph: B rises then constant then falls; N=500, A=4.0e-4
const N = 500, A = 4.0e-4;
const ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const Bt = [0, 0.05, 0.10, 0.10, 0.10, 0.05, 0];
console.log(table(["t / s", "NΦ / Wb"], ts.map((x, i) => [dpStr(x, 1), sciTex(N * A * Bt[i], 2)])));
console.log("emf rise", N * A * 0.5, "fall", -N * A * 0.5);
