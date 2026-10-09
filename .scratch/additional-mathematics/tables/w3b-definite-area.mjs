// Checks for lessons/calculus/definite-integrals-area.md
import { chk, integrate, quad, same } from "../lib.mjs";
const { cos, exp, PI } = Math;
chk(integrate((x) => 3 * x * x - 2 * x, 1, 3), 18, 1e-9, "ex1");
chk(integrate((x) => x * x - 4 * x, 0, 4), -32 / 3, 1e-9, "ex2");
same(quad.roots(1, -4, 0), [0, 4]);
// ex3: y = x³ − x² − 2x = x(x − 2)(x + 1)
const f3 = (x) => x ** 3 - x * x - 2 * x;
chk(integrate(f3, -1, 0), 5 / 12, 1e-9, "ex3a");
chk(integrate(f3, 0, 2), -8 / 3, 1e-9, "ex3b");
chk(5 / 12 + 8 / 3, 37 / 12);
chk(integrate(f3, -1, 2), 5 / 12 - 8 / 3, 1e-9, "net");
// ex4: line y = 2x + 3 and y = x²
same(quad.roots(1, -2, -3), [-1, 3]);
chk(integrate((x) => 2 * x + 3 - x * x, -1, 3), 32 / 3, 1e-9, "ex4");
// ex5: ∫_0^{π/6} (cos 3x + 2) dx = 1/3 + π/3
chk(integrate((x) => cos(3 * x) + 2, 0, PI / 6), (1 + PI) / 3, 1e-9, "ex5");
// ex6: ∫_0^{ln 2} e^{2x} dx = 3/2 ; ∫_1^4 1/x = ln 4
chk(integrate((x) => exp(2 * x), 0, Math.log(2)), 1.5, 1e-9);
console.log("definite-area lesson checks OK", (1 + PI) / 3, -(5 / 12 - 8 / 3));
