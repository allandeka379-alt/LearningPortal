import { orderFrom, rateConstant, rateFrom, sciStr, sfStr } from "../lib.mjs";
// iodination of propanone: rate = k[CH3COCH3][H+], zero order I2
const k = 2.8e-5;
const ex = [[0.4, 0.2, 0.002], [0.8, 0.2, 0.002], [0.4, 0.4, 0.002], [0.4, 0.2, 0.004]];
const r = ex.map(([p, h]) => rateFrom(k, [[p, 1], [h, 1]]));
console.log(r.map((x) => sciStr(x, 3)));
console.log("orders", orderFrom(r[0], r[1], 0.4, 0.8), orderFrom(r[0], r[2], 0.2, 0.4), orderFrom(r[0], r[3], 0.002, 0.004));
console.log("k", rateConstant(r[0], [[0.4, 1], [0.2, 1]]));
