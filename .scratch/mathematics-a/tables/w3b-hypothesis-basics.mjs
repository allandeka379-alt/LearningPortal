import { binom, normalProb, Phi } from "../lib.mjs";
console.log("ex1 P(X>=8) B(15,0.3)", 1 - binom.cdf(15, 0.3, 7));
console.log("ex2 z", (31.2 - 30) / (4 / Math.sqrt(40)), 1 - Phi((31.2 - 30) / (4 / Math.sqrt(40))));
console.log("ex3 B(20,0.5) P(X<=5)", binom.cdf(20, 0.5, 5), "P(X>=15)", 1 - binom.cdf(20, 0.5, 14));
console.log("ex1' B(15,0.3) P(X>=9)", 1 - binom.cdf(15, 0.3, 8), "P(X>=8)", 1 - binom.cdf(15, 0.3, 7));
console.log("B(18,0.3) P(X>=9)", 1 - binom.cdf(18, 0.3, 8));
