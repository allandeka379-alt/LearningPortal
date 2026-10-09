// Worked-example checks for lessons/series/sum-to-infinity.md
import { chk, gp, F } from "../lib.mjs";
chk(gp.sumInf(24, 0.5), 48);
chk(gp.sumInf(0.27, 0.01), 3 / 11); chk(F(27, 99).v, 3 / 11);
chk(1 - 15 / 25, 0.4); chk(gp.sumInf(15, 0.4), 25); chk(gp.nth(15, 0.4, 3), 2.4);
chk(8 + 2 * gp.sumInf(6, 0.75), 56);
for (const x of [0.01, 0.5, 0.99]) chk(Math.abs(2 * x - 1) < 1 ? 1 : 0, 1);
console.log(gp.sum(24, 0.5, 10), 48 - gp.sum(24, 0.5, 10));
console.log("ok");
