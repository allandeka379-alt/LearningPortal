import { sciTex, sfStr } from "../lib.mjs";
const a = 0.5e-3, D = 1.8, x = 21.6e-3 / 10; console.log("lambda", sciTex(a * x / D), a * x / D);
const lam = 340 / 680; console.log("lam", lam, "pd", 3.75 - 3.0, (3.75 - 3.0) / lam);
console.log("x for 450 nm same setup", 450e-9 * D / a);
