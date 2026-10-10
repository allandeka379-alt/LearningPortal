import { DATA, sfStr, sciTex, table, dpStr, linFit, rad } from "../lib.mjs";
console.log("WE1", 0.25 * 3.0 * 0.12, 0.25 * 3.0 * 0.12 * Math.sin(rad(30)));
console.log("WE2 B", sfStr(0.82e-3 * DATA.g / (4.0 * 0.040), 3));
console.log("WE3 F", 50 * 0.2 * 0.5 * 0.04, "torque", sciTex(50 * 0.2 * 0.5 * 0.04 * 0.03));
// graph: current balance L = 5.0 cm, B = 0.060 T; mass reading change vs I, with scatter
const I = [1.0, 2.0, 3.0, 4.0, 5.0];
const noise = [0.01, -0.01, 0.00, 0.02, -0.01];
const m = I.map((x, i) => Math.round((0.060 * x * 0.050 / DATA.g * 1000 + noise[i]) * 100) / 100);
console.log(table(["I / A", "Δm / g"], I.map((x, i) => [dpStr(x, 1), dpStr(m[i], 2)])));
const fit = linFit(I, m); console.log("grad g/A", fit.m, "B", sfStr(fit.m / 1000 * DATA.g / 0.050, 3), "c", fit.c);
