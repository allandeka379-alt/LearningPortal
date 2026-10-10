import { biv, sum } from "../lib.mjs";
const x = [4.2, 5.0, 5.8, 6.1, 6.9, 7.4, 8.0, 8.6];
const y = [2.1, 2.6, 2.9, 3.4, 3.6, 4.1, 4.3, 4.8];
const r = biv(x, y);
console.log("Ex1", "Sx", sum(x), "Sy", sum(y), "Sxx raw", sum(x.map((v) => v * v)), "Syy raw", sum(y.map((v) => v * v)), "Sxy raw", sum(x.map((v, i) => v * y[i])), r, "pred 6.5", r.a + r.b * 6.5, "pred 11", r.a + r.b * 11);
// Ex2 summary: n = 10, Σx = 52, Σy = 412, Σx² = 300, Σy² = 17760, Σxy = 2224 (x = hours of revision, y = mark)
const n = 10, Sx = 52, Sy = 412, Sxx0 = 300, Syy0 = 17760, Sxy0 = 2220;
const Sxx = Sxx0 - Sx * Sx / n, Syy = Syy0 - Sy * Sy / n, Sxy = Sxy0 - Sx * Sy / n;
const b = Sxy / Sxx, a = Sy / n - b * Sx / n, bx = Sxy / Syy, ax = Sx / n - bx * Sy / n, rr = Sxy / Math.sqrt(Sxx * Syy);
console.log("Ex2", { Sxx, Syy, Sxy, b, a, bx, ax, rr, r2: rr * rr }, "x when y=50 (x on y)", ax + bx * 50);
