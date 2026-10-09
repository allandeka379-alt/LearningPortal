// Worked-example checks for lessons/calculus/small-increments.md
import { chk, sfStr } from "../lib.mjs";
chk(3 * 4 * 0.01, 0.12); console.log("exact", 2.01 ** 3 - 8);
chk(4 * Math.PI * 100 * 0.2, 80 * Math.PI); console.log("80pi", sfStr(80 * Math.PI), "exact", (4 / 3) * Math.PI * (10.2 ** 3 - 1000));
// square 3% -> 6%; exact 1.03^2 - 1
console.log("sq exact %", (1.03 ** 2 - 1) * 100);
chk(Math.sqrt(25) + 0.3 / 10, 5.03); console.log("sqrt25.3", Math.sqrt(25.3));
// y = 16/x from 4 to 4+p: dy/dx = -16/x^2 = -1 -> dy = -p
chk(-16 / 16, -1); for (const p of [0.001, 0.0001]) console.log(16 / (4 + p) - 4, -p);
console.log("ok");
