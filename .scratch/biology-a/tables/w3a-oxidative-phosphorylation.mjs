// W3a lesson numbers for respiration/oxidative-phosphorylation.md
import { table, chk, dpStr } from "../lib.mjs";
// Worked 1: theoretical ATP yield per glucose with given values
const nad = 10, fad = 2, sub = 4, perNad = 2.5, perFad = 1.5;
const ox = nad * perNad + fad * perFad;
console.log("from NAD", nad * perNad, "from FAD", fad * perFad, "oxphos", ox, "total", ox + sub);
chk(ox + sub, 32);
// Worked 2: oxygen electrode trace as table, inhibitor added at 4 min
const time = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const o2 = [250, 220, 190, 160, 130, 128, 127, 127, 127];
console.log(table(["Time / min", ...time.map(String)], [["Oxygen concentration / µmol dm⁻³", ...o2.map(String)]]));
const rate = (o2[0] - o2[4]) / 4;
console.log("rate before", rate);
chk(rate, 30);
const after = (o2[5] - o2[8]) / 3;
console.log("rate after", dpStr(after, 2));
