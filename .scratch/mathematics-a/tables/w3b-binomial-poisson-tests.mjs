import { binom, poisson, criticalRegion, normalProb } from "../lib.mjs";
console.log("ex1 B(20,0.1) P(X>=5)", 1 - binom.cdf(20, 0.1, 4));
console.log("ex2 crit B(30,0.4) two", criticalRegion((k) => binom.cdf(30, 0.4, k), 0.025, "lower"), criticalRegion((k) => binom.cdf(30, 0.4, k), 0.025, "upper"));
console.log("   ", binom.cdf(30, 0.4, 7), binom.cdf(30, 0.4, 6), 1 - binom.cdf(30, 0.4, 17), 1 - binom.cdf(30, 0.4, 18));
console.log("ex3 Po(7.5) P(X>=13)", 1 - poisson.cdf(7.5, 12), poisson.cdf(7.5, 12));
console.log("ex4 normal B(200,0.25) P(X<=38)", normalProb(50, Math.sqrt(37.5), -Infinity, 38.5), 11.5 / Math.sqrt(37.5));
console.log("B30,.4 P(X>=17)", 1 - binom.cdf(30, 0.4, 16), "size", binom.cdf(30, 0.4, 6) + 1 - binom.cdf(30, 0.4, 17));
console.log("Po7.5 P(X>=12)", 1 - poisson.cdf(7.5, 11));
