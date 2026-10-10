import { binom, poisson, normalProb, criticalRegion, Phi } from "../lib.mjs";
const cr = criticalRegion((k) => binom.cdf(20, 0.4, k), 0.05, "lower"); console.log("ex1", cr, binom.cdf(20, 0.4, cr.c + 1));
console.log("ex1 typeII p=0.2", 1 - binom.cdf(20, 0.2, cr.c));
const c = 120 + 1.645 * 2; console.log("ex2", c, normalProb(124, 2, -Infinity, c));
const crp = criticalRegion((k) => poisson.cdf(4, k), 0.05, "upper"); console.log("ex3", crp, "typeII lam 7", poisson.cdf(7, crp.c - 1));
console.log("n=100", Phi(121.645 - 124));
