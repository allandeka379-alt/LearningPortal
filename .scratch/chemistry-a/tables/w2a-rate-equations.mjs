import { orderFrom, rateConstant, kFromHalfLife, firstOrderRemaining, sfStr, sciStr } from "../lib.mjs";
const e = [[0.1, 0.1, 2.0e-4], [0.2, 0.1, 8.0e-4], [0.1, 0.3, 6.0e-4]];
const m = orderFrom(e[0][2], e[1][2], e[0][0], e[1][0]), n = orderFrom(e[0][2], e[2][2], e[0][1], e[2][1]);
console.log("orders", m, n, "k", rateConstant(e[0][2], [[0.1, m], [0.1, n]]));
console.log("k from t1/2 345", kFromHalfLife(345), "remaining 1035 s", firstOrderRemaining(0.08, 1035, 345));
