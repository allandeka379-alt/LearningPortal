// Checks the worked examples of lessons/discrete/binomial.md.
import { binom, sfStr, chk, nCr } from "../lib.mjs";
const S = (x) => sfStr(x, 3);
console.log("Ex1 P(X=8)", binom.pmf(10, 0.85, 8), S(binom.pmf(10, 0.85, 8)), "nCr", nCr(10, 8));
console.log("    P(X>=9)", 1 - binom.cdf(10, 0.85, 8), S(1 - binom.cdf(10, 0.85, 8)), "P9", binom.pmf(10, 0.85, 9), "P10", binom.pmf(10, 0.85, 10));
console.log("Ex2 n12 p.3 P(X<=2)", binom.cdf(12, 0.3, 2), S(binom.cdf(12, 0.3, 2)), [0, 1, 2].map((r) => binom.pmf(12, 0.3, r)));
console.log("    P(X>=3)", S(1 - binom.cdf(12, 0.3, 2)), "P(2<=X<=4)", binom.cdf(12, 0.3, 4) - binom.cdf(12, 0.3, 1), S(binom.cdf(12, 0.3, 4) - binom.cdf(12, 0.3, 1)), [3, 4].map((r) => binom.pmf(12, 0.3, r)));
for (let n = 12; n <= 15; n++) console.log("Ex3 n", n, 1 - 0.8 ** n);
console.log("ln", Math.log(0.05) / Math.log(0.8));
chk(20 * 0.35, 7); chk(20 * 0.35 * 0.65, 4.55);
chk(4.2 / 6, 0.7); chk(6 / 0.3, 20);
