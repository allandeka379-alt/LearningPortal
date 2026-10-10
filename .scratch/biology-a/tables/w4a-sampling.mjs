// Lesson numbers for biodiversity/sampling.
import { lincoln, mean, sum, table, dpStr } from "../lib.mjs";
const counts = [6, 2, 0, 4, 7, 3, 0, 5, 1, 2];
console.log("quadrat counts", counts, "sum", sum(counts), "mean per quadrat", mean(counts), "density per m2 (0.25 m2)", mean(counts) / 0.25, "frequency %", counts.filter((c) => c > 0).length / counts.length * 100);
console.log("area 40 m x 25 m =", 40 * 25, "estimated population", mean(counts) / 0.25 * 1000);
console.log("Lincoln", lincoln(48, 52, 12));
