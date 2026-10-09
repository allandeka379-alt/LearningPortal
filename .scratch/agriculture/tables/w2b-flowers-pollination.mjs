// Lesson numbers for plants/flowers-pollination.
import { pct, round, check } from "../lib.mjs";
// Kernel set on a cob: 16 rows x 40 ovules = 640 ovules; 576 kernels.
const ovules = 16 * 40, kernels = 576;
check(ovules === 640, "ovules");
console.log("set %", pct(kernels, ovules), "unfilled", ovules - kernels);
// Weed seeds: one plant 2,400 seeds; 5% establish => plants
console.log("weed seedlings", 2400 * 5 / 100);
