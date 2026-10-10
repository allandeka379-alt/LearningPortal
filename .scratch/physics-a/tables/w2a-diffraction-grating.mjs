import { sfStr, deg, rad } from "../lib.mjs";
const d = 1e-3 / 500, lam = 589e-9;
for (const n of [1, 2, 3]) console.log(n, sfStr(deg(Math.asin((n * lam) / d)), 3), (n * lam) / d);
console.log("nmax", d / lam);
const d2 = 1e-3 / 600, th = 38.0 / 2; console.log("lam", d2 * Math.sin(rad(th)), sfStr(d2 * Math.sin(rad(th)) * 1e9, 3), "sin", Math.sin(rad(th)));
