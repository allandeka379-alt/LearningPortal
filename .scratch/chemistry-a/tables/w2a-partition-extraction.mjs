import { partitionK, remainingAfterExtractions, sfStr } from "../lib.mjs";
const org = (0.2 - 0.005) / 0.05, aq = 0.005 / 0.1;
console.log("I2 org g/dm3", org, "aq", aq, "Kpc", partitionK(org, aq));
const r1 = remainingAfterExtractions(2.0, 4.0, 100, 60, 1), r2 = remainingAfterExtractions(2.0, 4.0, 100, 30, 2), r3 = remainingAfterExtractions(2.0, 4.0, 100, 20, 3);
console.log("one 60:", r1, 2 - r1, "two 30:", r2, 2 - r2, "three 20:", r3, 2 - r3);
