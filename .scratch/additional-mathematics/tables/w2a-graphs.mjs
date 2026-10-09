// Worked-example checks for lessons/logs/graphs.md
import { chk, sfStr, ln, logb, table, round } from "../lib.mjs";
const f1 = (x) => 3 * Math.exp(2 * x) - 4;
chk(f1(0), -1); const x1 = 0.5 * ln(4 / 3); chk(f1(x1), 0); console.log("ex1 x-int", x1, sfStr(x1), "f1(-3)", f1(-3), "f1(1)", f1(1));
const f2 = (x) => 2 * ln(x + 3);
chk(f2(-2), 0); console.log("ex2 y-int", f2(0), sfStr(f2(0)), "f2(5)", f2(5));
const f3 = (x) => ln(2 * x - 1), g3 = (x) => (Math.exp(x) + 1) / 2;
for (const x of [0.7, 1, 3, 10]) chk(g3(f3(x)), x);
chk(f3(1), 0); chk(g3(0), 1);
console.log(table(["x", "-2", "-1", "0", "1", "2", "3"], [["2^x", ...[-2, -1, 0, 1, 2, 3].map((x) => 2 ** x)]]));
console.log(table(["x", "0.25", "0.5", "1", "2", "4", "8"], [["log2 x", ...[0.25, 0.5, 1, 2, 4, 8].map((x) => logb(2, x))]]));
console.log("ok");
