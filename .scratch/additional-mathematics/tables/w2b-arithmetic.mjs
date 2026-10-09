// Worked-example checks for lessons/series/arithmetic.md
import { chk, ap, quad } from "../lib.mjs";
chk(ap.nth(7, 4, 20), 83); chk(ap.sum(7, 4, 20), 900);
// Ex2: u5 = 17, u12 = 45
chk(ap.nth(1, 4, 5), 17); chk(ap.nth(1, 4, 12), 45); chk(ap.sum(1, 4, 30), 1770); chk(ap.nth(1, 4, 30), 117);
// Ex3 multiples of 7 between 100 and 300
chk(Math.ceil(100 / 7) * 7, 105); chk(Math.floor(300 / 7) * 7, 294); chk((294 - 105) / 7 + 1, 28); chk(ap.sum(105, 7, 28), 5586);
// Ex4 3 + 7 + 11 ... > 500
chk(ap.sum(3, 4, 15), 465); chk(ap.sum(3, 4, 16), 528); console.log("Ex4 root", quad.roots(2, 1, -500));
// Ex5 savings
chk(ap.nth(20, 5, 12), 75); chk(ap.sum(20, 5, 12), 570); console.log("Ex5 root", quad.roots(1, 7, -400), ap.sum(20, 5, 16), ap.sum(20, 5, 17));
console.log("ok");
