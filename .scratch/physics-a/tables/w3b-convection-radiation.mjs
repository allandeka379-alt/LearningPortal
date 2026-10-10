import { DATA } from "../lib.mjs";
const s = DATA.sigma;
console.log("plate emit", s * 1.5 * 340 ** 4, "absorb", s * 1.5 * 300 ** 4, "net", s * 1.5 * (340 ** 4 - 300 ** 4));
console.log("filament A for 60 W at 2800K", 60 / (s * 2800 ** 4), "P with 2.0e-5", s * 2.0e-5 * 2800 ** 4);
console.log("T doubles factor", 2 ** 4);
