// W3b lesson numbers: amaths.rv.linear-combinations
import { normalProb, Phi, poisson, sfStr } from "../lib.mjs";
const s = (x) => sfStr(x, 4);
console.log("ex2 lift", normalProb(576, Math.sqrt(8 * 81), -Infinity, 600), (600 - 576) / Math.sqrt(648));
console.log("ex3 diff", normalProb(3, 5, 0, Infinity));
console.log("ex4 poisson", s(poisson.cdf(3.5, 2)));
// ex5: S = 3X - 2Y, X~N(20,2^2), Y~N(25,3^2): mean 10, var 9*4+4*9 = 72 ; P(S<0)
console.log("ex5", normalProb(10, Math.sqrt(72), -Infinity, 0), -10 / Math.sqrt(72), Phi(-10 / Math.sqrt(72)));
