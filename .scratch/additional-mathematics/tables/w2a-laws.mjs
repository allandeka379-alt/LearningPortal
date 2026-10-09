// Worked-example checks for lessons/logs/laws.md
import { chk, logb, lg, ln, sfStr } from "../lib.mjs";
// Ex1
chk(logb(3, 243), 5); chk(logb(27, 9), 2 / 3); chk(logb(2, 1 / 64), -6); chk(logb(49, 7), 0.5);
// Ex2: 2 lg 5 + lg 12 - lg 3 = lg 100 = 2
chk(2 * lg(5) + lg(12) - lg(3), 2);
// Ex3: lg 2 = p, lg 3 = q: lg 72 = 3p + 2q, lg 1.5 = q - p, lg 600 = p + q + 2
const p = lg(2), q = lg(3);
chk(lg(72), 3 * p + 2 * q); chk(lg(1.5), q - p); chk(lg(600), p + q + 2);
// Ex4: log_9 27 = 3/2; log_4 7
chk(logb(9, 27), 1.5);
console.log("log4 7", ln(7) / ln(4), sfStr(ln(7) / ln(4)));
// Ex5: log_4 x = 1/2 log_2 x
for (const x of [3, 10, 0.2]) chk(logb(4, x), 0.5 * logb(2, x));
console.log("ok");
