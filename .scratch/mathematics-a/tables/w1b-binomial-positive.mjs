// Checks the worked examples of lessons/series/binomial-positive.md.
import { chk, same, nCr, binomialCoeffs, poly, rnd } from "../lib.mjs";

// Ex1 (2 + x)^4
same(binomialCoeffs(2, 1, 4), [16, 32, 24, 8, 1]);
// Ex2 coefficient of x³ in (3 − 2x)^7
chk(binomialCoeffs(3, -2, 7)[3], -22680); chk(nCr(7, 3) * 81 * -8, -22680);
// Ex3 term independent of x in (x² + 2/x)^6: r = 4 → 15 × 16 = 240
chk(nCr(6, 4) * 2 ** 4, 240); chk(12 - 3 * 4, 0);
// Ex4 coefficient of x² in (1 + 2x)(3 − x)^5
const c = binomialCoeffs(3, -1, 5);
same(c.slice(0, 3), [243, -405, 270]);
const prod = poly.mul([2, 1], [...c].reverse()); // highest power first
chk(prod[prod.length - 3], -540);
// Ex5 (1 + ax)^6, coefficient of x² = 135 → a = ±3
chk(nCr(6, 2) * 9, 135);
// Ex6 1.02^8 ≈ 1 + 16x + 112x², x = 0.01
const approx = 1 + 16 * 0.01 + 112 * 0.0001;
chk(approx, 1.1712); rnd(1.02 ** 8, 4, 1.1717);
console.log("binomial-positive lesson OK");
