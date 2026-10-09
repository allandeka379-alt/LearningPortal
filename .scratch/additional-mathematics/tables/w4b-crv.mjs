// Checks for lessons/distributions/continuous-random-variables.md
import { chk, integrate, checkAntideriv } from "../lib.mjs";
// Ex1: f(x) = kx², 0 ≤ x ≤ 3 → k = 1/9
const k = 1 / 9;
chk(integrate((x) => k * x * x, 0, 3), 1, 1e-9);
chk(integrate((x) => k * x * x, 1, 2), 7 / 27, 1e-9);
const m = integrate((x) => x * k * x * x, 0, 3), m2 = integrate((x) => x * x * k * x * x, 0, 3);
chk(m, 9 / 4, 1e-9); chk(m2, 27 / 5, 1e-9); chk(m2 - m * m, 27 / 80, 1e-9);
console.log("var", 27 / 80);
// Ex2: f(x) = k(4 − x), 0 ≤ x ≤ 4 → k = 1/8
const k2 = 1 / 8;
chk(integrate((x) => k2 * (4 - x), 0, 4), 1, 1e-9);
chk(integrate((x) => k2 * (4 - x), 0, 1), 7 / 16, 1e-9);
chk(integrate((x) => x * k2 * (4 - x), 0, 4), 4 / 3, 1e-9);
checkAntideriv((x) => (4 * x - x * x / 2) / 8, (x) => (4 - x) / 8, 0, 1);
// Ex3: f(x) = (3/32)x(4 − x), 0 ≤ x ≤ 4: show k = 3/32, P(X > 3), E(X) = 2 by symmetry
const k3 = 3 / 32;
chk(integrate((x) => x * (4 - x), 0, 4), 32 / 3, 1e-9);
chk(integrate((x) => k3 * x * (4 - x), 3, 4), 5 / 32, 1e-9);
chk(integrate((x) => x * k3 * x * (4 - x), 0, 4), 2, 1e-9);
chk(integrate((x) => x * x * k3 * x * (4 - x), 0, 4), 24 / 5, 1e-9); // Var = 4.8 − 4 = 0.8
console.log("crv lesson checks OK");
