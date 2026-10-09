// Values for lessons/prog/operators.md, computed.
import { DIV, MOD, ROUND, mdTable } from "../slices/w4b-0-kit.mjs";
import { truthTableMd, L } from "../lib.mjs";
const rows = [
  ["`17 + 4`", 17 + 4], ["`17 - 4`", 17 - 4], ["`17 * 4`", 17 * 4], ["`17 / 4`", 17 / 4], ["`2 ^ 5`", 2 ** 5],
  ["`DIV(17, 4)`", DIV(17, 4)], ["`MOD(17, 4)`", MOD(17, 4)],
];
console.log(mdTable(["Expression", "Result"], rows.map((r) => [r[0], String(r[1])])) + "\n");
// precedence
console.log("3 + 4 * 2 ^ 2 =", 3 + 4 * 2 ** 2, "; (3 + 4) * 2 ^ 2 =", (3 + 4) * 2 ** 2, "; 20 - 6 / 2 =", 20 - 6 / 2, "; (20 - 6) / 2 =", (20 - 6) / 2);
// WE: seconds to minutes and seconds
const secs = 437;
console.log("437 s:", DIV(secs, 60), "min", MOD(secs, 60), "s");
// WE: digits of 2958
const n = 2958;
console.log("units", MOD(n, 10), "tens", MOD(DIV(n, 10), 10), "rest", DIV(n, 100));
// ROUND
console.log(ROUND(3.14159, 2), ROUND(7.6, 0), ROUND(12.345, 1), ROUND(2.5, 0));
console.log(truthTableMd(["A", "B"], [["A AND B", L.and], ["A OR B", L.or], ["NOT A", (a) => L.not(a)]]));
// Worked expression evaluation with Mark = 64, Paid = FALSE
const Mark = 64, Paid = false;
console.log(Mark >= 50 && Mark <= 100, Mark < 50 || Paid, !Paid && Mark > 70);
