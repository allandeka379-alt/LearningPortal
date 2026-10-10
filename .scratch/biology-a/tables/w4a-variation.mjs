// Lesson tables for evolution/variation: additive polygenes and a histogram.
import { table, sum } from "../lib.mjs";
const binom = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; };
const n = 4; // contributing-allele slots in AaBb x AaBb
console.log(table(["Contributing alleles", "Example genotypes", "Height / cm", "Fraction of offspring"], [0, 1, 2, 3, 4].map((k) => [k, ["aabb", "Aabb, aaBb", "AAbb, AaBb, aaBB", "AABb, AaBB", "AABB"][k], 100 + 5 * k, `${binom(n, k)}/16`])));
console.log("total", sum([0, 1, 2, 3, 4].map((k) => binom(n, k))));
const classes = ["0.30-0.39", "0.40-0.49", "0.50-0.59", "0.60-0.69", "0.70-0.79", "0.80-0.89", "0.90-0.99"];
const freq = [3, 11, 24, 37, 26, 12, 4];
console.log(table(["Seed mass / g", ...classes], [["Number of seeds", ...freq.map(String)]]), "N", sum(freq));
