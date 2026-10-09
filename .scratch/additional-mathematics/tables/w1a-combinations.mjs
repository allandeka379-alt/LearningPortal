import { nCr, chk } from "../lib.mjs";
chk(nCr(7, 3), 35); chk(nCr(7, 4), 35); chk(nCr(9, 4), 126);
chk(nCr(10, 5), 252); chk(nCr(4, 2) * nCr(6, 3), 120); chk(nCr(10, 5) - nCr(6, 5), 246); chk(nCr(9, 4), 126);
chk(nCr(6, 5) + nCr(4, 1) * nCr(6, 4), 66);
chk(nCr(8, 2), 28);
console.log("ok");
