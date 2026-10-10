import { integrate, expo } from "../lib.mjs";
const { exp, log, sqrt } = Math;
console.log("Ex1 P>10", 5 / 15, "mean", 7.5, "var", 225 / 12, "sd", sqrt(225 / 12), "var by integral", integrate((x) => (x * x) / 15, 0, 15) - 7.5 ** 2);
const l = 0.25;
console.log("Ex2 P>6", expo.gt(l, 6), "P(2<T<5)", expo.gt(l, 2) - expo.gt(l, 5), exp(-0.5), exp(-1.25), "median", log(2) / l);
console.log("Ex3 mean", integrate((x) => x * expo.pdf(2, x), 0, 40, 40000), "E(X2)", integrate((x) => x * x * expo.pdf(2, x), 0, 40, 40000));
console.log("Ex4 lambda", -log(0.4) / 3, "mean", 3 / -log(0.4));
