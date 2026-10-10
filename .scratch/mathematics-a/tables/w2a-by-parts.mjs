// W2a lesson numbers: integ.by-parts
import { chk, checkAntideriv, integrate } from "../lib.mjs";
const { exp, log, sin, cos, atan, E } = Math;
checkAntideriv((x) => -(x / 2) * cos(2 * x) + sin(2 * x) / 4, (x) => x * sin(2 * x), 0, 2, "ex1");
checkAntideriv((x) => x * log(x) - x, log, 1, 3, "ex2");
chk(integrate(log, 1, E), 1, 1e-9, "ex2 def");
checkAntideriv((x) => -exp(-x) * (x * x + 2 * x + 2), (x) => x * x * exp(-x), 0, 3, "ex3");
checkAntideriv((x) => 0.5 * (x * x + 1) * atan(x) - x / 2, (x) => x * atan(x), 0, 2, "ex4");
chk(integrate((x) => x * exp(2 * x), 0, 1), (E * E + 1) / 4, 1e-9, "ex5");
console.log("ex5", (E * E + 1) / 4);
checkAntideriv((x) => 0.5 * exp(x) * (sin(x) - cos(x)), (x) => exp(x) * sin(x), 0, 2, "cyclic"); console.log("cyclic ok");
