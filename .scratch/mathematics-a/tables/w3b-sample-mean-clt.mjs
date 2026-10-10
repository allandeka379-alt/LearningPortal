import { normalProb, sfStr } from "../lib.mjs";
// Ex1: X ~ N(65, 8^2), n = 16, P(Xbar > 68)
console.log("ex1", normalProb(65, 8 / 4, 68, Infinity));
// Ex2: X mean 2.4 var 1.96 (skewed), n = 49, P(Xbar < 2.2)
console.log("ex2", 1.4 / 7, normalProb(2.4, 0.2, -Infinity, 2.2));
// Ex3: total of 20 bags N(25, 0.5^2): P(T > 502)
console.log("ex3", Math.sqrt(20 * 0.25), normalProb(500, Math.sqrt(5), 502, Infinity));
// Ex4: smallest n with P(|Xbar - mu| < 0.5) >= 0.95, sigma = 3
console.log("ex4", (1.96 * 3 / 0.5) ** 2);
