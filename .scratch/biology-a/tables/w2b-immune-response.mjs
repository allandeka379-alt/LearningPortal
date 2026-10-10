// W2b lesson numbers: primary and secondary response (arbitrary units, hypothetical).
import { chk, dpStr, table } from "../lib.mjs";
const days = [0, 7, 14, 21, 28, 35, 42, 49, 56];
// first exposure day 0, second exposure day 28
const conc = [0, 4, 20, 9, 3, 150, 380, 300, 210];
console.log(table(["Day", ...days.map(String)], [["Antibody concentration / arbitrary units", ...conc.map(String)]]));
const peak1 = Math.max(...conc.slice(0, 5)), peak2 = Math.max(...conc.slice(5));
console.log("peaks", peak1, peak2, "ratio", peak2 / peak1);
