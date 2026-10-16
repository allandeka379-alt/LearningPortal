import { table, chk, r2 } from "../lib.mjs";
const normal = 40 * 70, peak = 12 * 130, total = normal + peak;
const staffFT = Math.ceil(130 / 40);
const A = staffFT * 2080 * 6, B = total * 6, C = r2(total * 7.2);
console.log({ normal, peak, total, staffFT, A, B, C, saveB: A - B, saveC: A - C });
console.log(table(["Option", "Hours paid", "Rate (US$/hour)", "Annual labour cost (US$)"], [["A: 4 full-time staff (2,080 hours each)", 8320, 6, A], ["B: 2 staff on annualised hours", total, 6, B], ["C: zero-hours workers at 20% premium", total, 7.2, C]]));
