// Checks the worked examples of lessons/series/binomial-rational.md.
import { chk, same } from "../lib.mjs";

/** Generalised binomial coefficient n(n − 1)…(n − k + 1)/k! for rational n. */
const co = (n, k) => { let c = 1; for (let i = 0; i < k; i++) c *= (n - i) / (i + 1); return c; };
const series = (n, b, terms) => Array.from({ length: terms }, (_, k) => co(n, k) * b ** k); // (1 + bx)^n
const near = (a, e) => a.forEach((v, i) => chk(v, e[i], 1e-12));
// Ex1 (1 + x)^−2
near(series(-2, 1, 4), [1, -2, 3, -4]);
// Ex2 (1 − 4x)^½ = 1 − 2x − 2x² − 4x³, |x| < ¼
near(series(0.5, -4, 4), [1, -2, -2, -4]);
// Ex3 (2 − ½x)^−1 = ½(1 − x/4)^−1 = ½ + x/8 + x²/32 + x³/128, |x| < 4
near(series(-1, -0.25, 4).map((c) => c / 2), [0.5, 1 / 8, 1 / 32, 1 / 128]);
// Ex4 √0.96 ≈ 1 − 0.02 − 0.0002 − 0.000004
chk(1 - 0.02 - 0.0002 - 0.000004, 0.979796, 1e-12); chk(Math.round(Math.sqrt(0.96) * 1e7) / 1e7, 0.9797959);
// Ex5 (4 + 5x)/((1 + 2x)(1 − x)) = 3/(1 − x) + 1/(1 + 2x) = 4 + x + 7x² − 5x³
for (const x of [0.1, -0.2, 0.3]) chk((4 + 5 * x) / ((1 + 2 * x) * (1 - x)), 3 / (1 - x) + 1 / (1 + 2 * x), 1e-12);
near(series(-1, -1, 4).map((c, k) => 3 * c + series(-1, 2, 4)[k]), [4, 1, 7, -5]);
// Ex6 (1 + ax)^n = 1 − 6x + 24x² … → a = 2, n = −3; x³ coefficient −80
near(series(-3, 2, 4), [1, -6, 24, -80]);
console.log("binomial-rational lesson OK");
