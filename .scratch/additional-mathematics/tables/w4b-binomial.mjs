// Checks for lessons/distributions/binomial.md
import { chk, binom, nCr, sf } from "../lib.mjs";
// Ex1: X ~ B(8, 0.3), P(X = 3)
const p1 = binom.pmf(8, 0.3, 3);
chk(nCr(8, 3), 56); console.log("P(X=3)", p1, sf(p1, 3), 0.3 ** 3, 0.7 ** 5);
// Ex2: X ~ B(10, 0.15): P(X ≤ 1), P(X ≥ 2), P(2 ≤ X ≤ 3)
const c1 = binom.cdf(10, 0.15, 1);
console.log("P0", binom.pmf(10, 0.15, 0), "P1", binom.pmf(10, 0.15, 1), "P(X<=1)", c1, sf(c1, 3), "P(X>=2)", 1 - c1, sf(1 - c1, 3));
const b23 = binom.pmf(10, 0.15, 2) + binom.pmf(10, 0.15, 3);
console.log("P2", binom.pmf(10, 0.15, 2), "P3", binom.pmf(10, 0.15, 3), "P(2..3)", b23, sf(b23, 3));
// Ex3: mean 6, variance 4.2 -> q = 0.7, p = 0.3, n = 20
chk(4.2 / 6, 0.7); chk(6 / 0.3, 20); chk(binom.mean(20, 0.3), 6); chk(binom.variance(20, 0.3), 4.2);
// Ex4: n with P(at least one) > 0.95, p = 0.2: 0.8^n < 0.05
let n = 1; while (0.8 ** n >= 0.05) n++;
console.log("n", n, 0.8 ** (n - 1), 0.8 ** n);
// Ex5 modelling: B(12, 0.25) mean and sd
chk(binom.mean(12, 0.25), 3); chk(binom.variance(12, 0.25), 2.25);
console.log("binomial lesson checks OK");
