// W2b lesson numbers: menstrual cycle hormone data (illustrative arbitrary units).
import { chk, table } from "../lib.mjs";
const day = [1, 5, 9, 12, 14, 16, 21, 25, 28];
const fsh = [6, 7, 5, 6, 12, 4, 2, 3, 6];
const lh = [5, 5, 6, 14, 60, 8, 4, 4, 5];
const oest = [2, 4, 9, 20, 12, 8, 12, 7, 2];
const prog = [1, 1, 1, 1, 2, 6, 18, 9, 1];
console.log(table(["Day", ...day.map(String)], [["FSH", ...fsh.map(String)], ["LH", ...lh.map(String)], ["Oestrogen", ...oest.map(String)], ["Progesterone", ...prog.map(String)]]));
console.log("LH surge fold day12->14", lh[4] / lh[3], "from day 9", lh[4] / lh[2]);
// worked: ovulation day for a 32-day cycle (luteal phase ~14 days)
console.log("ovulation day for 32-day cycle", 32 - 14);
