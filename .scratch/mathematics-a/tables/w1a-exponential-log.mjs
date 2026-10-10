import { chk, sfStr } from "../lib.mjs";
const x1 = (1 + Math.log(7)) / 2; chk(Math.exp(2 * x1 - 1), 7, 1e-9); console.log("ex1", x1, sfStr(x1));
const x2 = (Math.exp(4) - 2) / 3; chk(Math.log(3 * x2 + 2), 4, 1e-12); console.log("ex2", Math.exp(4), x2, sfStr(x2));
const k = Math.log(1.25) / 5; const t50 = Math.log(50000 / 24000) / k; console.log("ex4 k", k, sfStr(k), "t", t50, sfStr(t50), Math.log(1.25), Math.log(50 / 24));
const t5 = -Math.log(0.4) / 0.04; console.log("ex5", t5, sfStr(t5), Math.log(0.4));
