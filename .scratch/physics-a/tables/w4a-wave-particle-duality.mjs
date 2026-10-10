import { DATA, sfStr, sciTex, table } from "../lib.mjs";
const { h, e, me, mp } = DATA;
const lamV = (V, m = me) => h / Math.sqrt(2 * m * e * V);
const Vs = [1000, 2000, 3000, 4000, 5000, 6000];
console.log(table(["V / kV", "λ / pm", "V^-1/2 / V^-1/2"], Vs.map((V) => [(V / 1000).toFixed(1), sfStr(lamV(V) * 1e12, 3), (1 / Math.sqrt(V)).toFixed(4)])));
console.log("WE1 p", sciTex(Math.sqrt(2 * me * e * 5000)), "lam", sciTex(lamV(5000)));
console.log("WE2 ball", sciTex(h / (0.16 * 35)));
const lam = 0.21e-9; const p = h / lam; console.log("WE3 p", sciTex(p), "V", sfStr(p * p / (2 * me * e), 3));
