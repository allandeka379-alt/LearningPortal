// Lesson numbers for skills.evaluation-improvements (W1a).
import { mean, halfRange, pctUnc, pctDifference, sfStr, chk } from "../lib.mjs";
const t1 = [1.43, 1.51, 1.47];
const m1 = mean(t1), h1 = halfRange(t1);
console.log("mean", m1, "half-range", h1, "%t", pctUnc(h1, m1), "%t2", 2 * pctUnc(h1, m1), "%d", pctUnc(0.002, 0.8), "%k", 2 * pctUnc(h1, m1) + pctUnc(0.002, 0.8));
const t2 = [1.06, 1.12, 1.03];
const m2 = mean(t2), h2 = halfRange(t2);
console.log("mean2", m2, "half2", h2, "%t2", pctUnc(h2, m2));
const k1 = 0.8 / m1 ** 2, k2 = 0.4 / m2 ** 2;
console.log("k1", k1, sfStr(k1, 3), "k2", k2, sfStr(k2, 3), "pctdiff", pctDifference(k1, k2), "with rounded", pctDifference(Number(sfStr(k1, 3)), Number(sfStr(k2, 3))));
