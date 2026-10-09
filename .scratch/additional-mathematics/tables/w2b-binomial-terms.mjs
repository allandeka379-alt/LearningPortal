// Worked-example checks for lessons/series/binomial-terms.md
import { chk, same, nCr, binomialCoeffs, quad } from "../lib.mjs";
chk(binomialCoeffs(2, 3, 8)[5], 108864); chk(nCr(8, 5) * 2 ** 3 * 3 ** 5, 108864);
chk(nCr(10, 5) * 2 ** 5, 8064);
chk(nCr(6, 4) * (-2) ** 4, 240);
const c = binomialCoeffs(2, -1, 6); same(c.slice(0, 3), [64, -192, 240]); chk(c[2] + 3 * c[1], -336);
same(quad.roots(1, -1, -90), [-9, 10]); chk(nCr(10, 2) * 4, 180);
chk(Math.cbrt(-8), -2); chk(nCr(5, 3) * (-2) ** 3, -80);
console.log("ok");
