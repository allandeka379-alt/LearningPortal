// Worked-example checks for lessons/quadratics/solving.md (run: node .scratch/additional-mathematics/tables/w1b-solving.mjs)
import { chk, same, poly, quad, sfStr } from "../lib.mjs";

// Example 1: 6x^2 - x - 15 = (2x + 3)(3x - 5)
same(poly.mul([2, 3], [3, -5]), [6, -1, -15], "ex1 factors");
same(poly.rationalRoots([6, -1, -15]), [-1.5, 5 / 3], "ex1 roots");

// Example 2: x^2 - 8x + 13 = (x - 4)^2 - 3 -> x = 4 ± √3
const cs2 = quad.completeSquare(1, -8, 13);
chk(cs2.p, -4); chk(cs2.q, -3);
const r2 = quad.roots(1, -8, 13);
chk(r2[0], 4 - Math.sqrt(3)); chk(r2[1], 4 + Math.sqrt(3));
console.log("ex2", r2.map((x) => sfStr(x)));

// Example 3: 2x^2 + 6x - 3 = 0 -> disc 60, x = (-3 ± √15)/2
chk(quad.disc(2, 6, -3), 60);
const r3 = quad.roots(2, 6, -3);
chk(r3[0], (-3 - Math.sqrt(15)) / 2); chk(r3[1], (-3 + Math.sqrt(15)) / 2);
console.log("ex3", r3.map((x) => sfStr(x)), Math.sqrt(15));

// Example 4: 4/x - 3/(x + 2) = 1 -> x^2 + x - 8 = 0
const r4 = quad.roots(1, 1, -8);
for (const x of r4) chk(4 / x - 3 / (x + 2), 1, 1e-9, "ex4 check");
console.log("ex4", r4.map((x) => sfStr(x)), Math.sqrt(33));

// Example 5: field w(w + 15) = 1750 -> (w + 50)(w - 35)
same(poly.rationalRoots([1, 15, -1750]), [-50, 35], "ex5");
console.log("ex5 perimeter", 2 * (35 + 50));
