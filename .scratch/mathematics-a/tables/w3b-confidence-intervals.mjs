import { ciMean, ciProp, est } from "../lib.mjs";
console.log("ex1", ciMean(72.4, 5, 20, 95));
const e = est(100, 3450, 122000); console.log("ex2", e, ciMean(e.mean, Math.sqrt(e.s2), 100, 99));
console.log("ex3", ciProp(57 / 150, 150, 90));
console.log("ex4 n", (2 * 1.96 * 8 / 3) ** 2, (1.96 * 8 / 1.5) ** 2);
