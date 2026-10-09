// Worked-example checks for lessons/series/binomial-expansion.md
import { chk, same, nCr, binomialCoeffs } from "../lib.mjs";
same([0, 1, 2, 3, 4, 5].map((r) => nCr(5, r)), [1, 5, 10, 10, 5, 1]);
same(binomialCoeffs(2, 1, 4), [16, 32, 24, 8, 1]);
same(binomialCoeffs(2, -3, 5).slice(0, 3), [32, -240, 720]);
// (x + 2/x)^4: term k: C(4,k) x^(4-k) (2/x)^k = C(4,k) 2^k x^(4-2k)
same([0, 1, 2, 3, 4].map((k) => nCr(4, k) * 2 ** k), [1, 8, 24, 32, 16]);
same(binomialCoeffs(1, 2, 6).slice(0, 4), [1, 12, 60, 160]);
const est = 1 + 12 * 0.01 + 60 * 0.0001 + 160 * 0.000001; chk(est, 1.12616); console.log(1.02 ** 6);
console.log("ok");
