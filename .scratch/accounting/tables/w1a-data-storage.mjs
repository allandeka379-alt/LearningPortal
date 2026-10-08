// Figures for lessons/technology/data-storage.md (W1a).
import { check } from "../lib.mjs";
const drives = 2 * 75, cloud = 6 * 36, paper = 180 + 9 * 36;
console.log({ drives, cloud, paper, cloudMinusDrives: cloud - drives, paperMinusCloud: paper - cloud });
check("paper", paper, 504);
