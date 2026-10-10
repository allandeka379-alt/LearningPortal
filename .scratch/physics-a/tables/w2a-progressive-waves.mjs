import { sfStr, dpStr, sciTex, chk, table } from "../lib.mjs";
// WE1: CRO
const tb = 0.5e-3, divs = 4.0, yg = 2.0, pp = 5.2;
const T = tb * divs, f = 1 / T, A = (pp / 2) * yg, v = 340, lam = v / f;
console.log("CRO T", T, "f", f, "A", A, "lambda", lam);
// WE2: intensity from point source
const P = 0.80, r1 = 5.0, r2 = 10.0;
const I1 = P / (4 * Math.PI * r1 ** 2), I2 = P / (4 * Math.PI * r2 ** 2);
console.log("I1", sciTex(I1), "I2", sciTex(I2));
// amplitude ratio I ∝ A^2: at 10 m amplitude halves
// WE3: phase difference
const dx = 0.17; console.log("phase deg", (dx / lam) * 360, "rad", (dx / lam) * 2 * Math.PI);
// graph table: y = 3.0 sin(2π x / 0.80) cm
const xs = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
console.log(table(["$x\,/\,\text{m}$", "$y\,/\,\text{cm}$"], xs.map((x) => [x.toFixed(1), dpStr(3.0 * Math.sin((2 * Math.PI * x) / 0.8), 1)])));
