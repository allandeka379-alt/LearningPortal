// W3b lesson numbers: amaths.discrete.poisson
import { poisson, chk, sfStr, mean, freqStats } from "../lib.mjs";
const p = (l, r) => poisson.pmf(l, r);
// Ex1: 4.2 calls per hour
console.log("ex1 P(X=3)", p(4.2, 3), "P(X<=2)", poisson.cdf(4.2, 2), "P(X>=2)", 1 - poisson.cdf(4.2, 1));
// Ex2: 1.5 per week -> fortnight 3.0; P(at least 2) and P(fewer than 4 in 3 weeks 4.5)
console.log("ex2 P(Y>=2) l=3", 1 - poisson.cdf(3, 1), "P(Z<4) l=4.5", poisson.cdf(4.5, 3));
// Ex3: P(X=0)=0.2 -> lambda = ln 5
const l3 = Math.log(5); console.log("ex3 lambda", l3, "P(X=2)", p(l3, 2), "P(X>=2)", 1 - poisson.cdf(l3, 1));
// recurrence ex: Po(2.6)
for (let r = 0; r <= 5; r++) console.log(" Po2.6", r, p(2.6, r).toFixed(4));
// data check
const tbl = [[0, 18], [1, 31], [2, 26], [3, 15], [4, 7], [5, 3]];
const fs = freqStats(tbl); console.log("data", fs.n, fs.mean, fs.variance);
// mode example: P(X=2)=P(X=3) gives lambda 3
console.log(p(3, 2), p(3, 3));
