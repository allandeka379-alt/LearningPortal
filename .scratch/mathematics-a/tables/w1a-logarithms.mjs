import { chk, sfStr } from "../lib.mjs";
chk(2 * Math.log10(3) + Math.log10(4) - Math.log10(6), Math.log10(6), 1e-12);
const x2 = Math.log(10) / Math.log(8 / 5); chk((x2 + 1) * Math.log(5), (3 * x2 - 1) * Math.log(2), 1e-9); console.log("ex2", x2, sfStr(x2), Math.log(10), Math.log(1.6));
const n3 = Math.log(0.1) / Math.log(0.8); console.log("ex3", n3, 0.8 ** 10, 0.8 ** 11);
chk(Math.log2(6 + 2) + Math.log2(6 - 2), 5);
console.log("ex5", Math.log(20) / Math.log(3), sfStr(Math.log(20) / Math.log(3)));
