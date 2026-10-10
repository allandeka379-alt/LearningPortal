// Checks the worked examples of lessons/probability/bayes.md.
import { chk, sfStr } from "../lib.mjs";
const pD = 0.5 * 0.02 + 0.3 * 0.03 + 0.2 * 0.05; chk(pD, 0.029);
console.log("Ex1 P(C|D)", 0.01 / pD, sfStr(0.01 / pD, 3), "P(A|D)", sfStr(0.01 / pD, 3), "P(B|D)", sfStr(0.009 / pD, 3));
const pPos = 0.04 * 0.95 + 0.96 * 0.08; chk(pPos, 0.1148);
console.log("Ex2 P(D|+)", 0.038 / pPos, sfStr(0.038 / pPos, 3), "P(D|-)", sfStr(0.04 * 0.05 / (1 - pPos), 3), 0.002 / (1 - pPos));
const pF = 0.3 * 0.8 + 0.7 * 0.25; chk(pF, 0.415);
console.log("Ex3 P(R|F)", sfStr(0.24 / pF, 3), "P(R|F')", sfStr(0.06 / (1 - pF), 3), 0.06 / 0.585);
