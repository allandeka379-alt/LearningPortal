// W3b lesson numbers: amaths.discrete.poisson-approximations
import { poisson, binom, normalProb, Phi, sfStr } from "../lib.mjs";
const s = (x) => sfStr(x, 4);
console.log("ex1 B(200,0.015) P<=2 exact", s(binom.cdf(200, 0.015, 2)), "Po(3)", s(poisson.cdf(3, 2)));
const e2 = normalProb(22, Math.sqrt(22), 24.5, Infinity);
console.log("ex2 Po22 P(X>=25) normal", e2, "z", (24.5 - 22) / Math.sqrt(22), "exact", s(1 - poisson.cdf(22, 24)));
// ex3: seeds 1 in 400 fail; packet of 1000 -> lambda 2.5 ; P(more than 4)
console.log("ex3a", s(1 - poisson.cdf(2.5, 4)), "binom", s(1 - binom.cdf(1000, 1 / 400, 4)));
const e3 = normalProb(18, Math.sqrt(18), 14.5, 20.5);
console.log("ex3b Po18 P(15<=X<=20)", e3, "z", (14.5 - 18) / Math.sqrt(18), (20.5 - 18) / Math.sqrt(18), "exact", s(poisson.cdf(18, 20) - poisson.cdf(18, 14)));
