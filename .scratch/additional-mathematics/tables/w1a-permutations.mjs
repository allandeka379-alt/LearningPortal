import { fact, nPr, chk } from "../lib.mjs";
chk(fact(6), 720); chk(fact(8) / fact(5), 336); chk(fact(0), 1);
chk(fact(5), 120); chk(nPr(7, 3), 210);
chk(fact(6), 720); chk(fact(4), 24); chk(fact(5) * 2, 240); chk(720 - 240, 480);
chk(nPr(6, 4), 360); chk(3 * nPr(5, 3), 180); chk(2 * nPr(5, 3), 120);
// nP2 = 56 -> n = 8
chk(nPr(8, 2), 56);
console.log("ok");
