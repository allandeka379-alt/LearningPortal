// Worked-example checks for lessons/calculus/trig-exp-log.md
import { chk, checkDeriv } from "../lib.mjs";
const xs = [0.3, 0.9, 1.2];
checkDeriv((x) => Math.exp(3 * x - 1), (x) => 3 * Math.exp(3 * x - 1), xs);
checkDeriv((x) => Math.log(2 * x + 5), (x) => 2 / (2 * x + 5), xs);
checkDeriv((x) => Math.sin(3 * x), (x) => 3 * Math.cos(3 * x), xs);
checkDeriv((x) => Math.cos(x) ** 2, (x) => -2 * Math.sin(x) * Math.cos(x), xs);
checkDeriv((x) => Math.cos(x) ** 2, (x) => -Math.sin(2 * x), xs);
checkDeriv((x) => Math.tan(2 * x), (x) => 2 / Math.cos(2 * x) ** 2, [0.1, 0.3, 0.6]);
checkDeriv((x) => Math.log(x * x * (x + 1)), (x) => 2 / x + 1 / (x + 1), xs);
const g = (x) => Math.exp(2 * x) * (2 * Math.sin(x) + Math.cos(x));
checkDeriv((x) => Math.exp(2 * x) * Math.sin(x), g, xs);
chk(g(0), 1);
checkDeriv((x) => Math.log(Math.sin(x)), (x) => 1 / Math.tan(x), xs);
chk(1 / Math.tan(Math.PI / 4), 1);
// table row: 5 e^{-2x} -> -10 e^{-2x}; ln(4-x) -> -1/(4-x); cos(5x+1) -> -5 sin(5x+1)
checkDeriv((x) => 5 * Math.exp(-2 * x), (x) => -10 * Math.exp(-2 * x), xs);
checkDeriv((x) => Math.log(4 - x), (x) => -1 / (4 - x), xs);
checkDeriv((x) => Math.cos(5 * x + 1), (x) => -5 * Math.sin(5 * x + 1), xs);
checkDeriv((x) => Math.log(3 * x), (x) => 1 / x, xs);
console.log("ok");
