// W2a lesson numbers: integ.standard-functions
import { chk, checkAntideriv, integrate } from "../lib.mjs";
const { exp, log, sin, cos, tan, atan, sqrt, PI, E } = Math;
checkAntideriv((x) => exp(3 * x - 1) / 3 + 2 * log(2 * x + 1), (x) => exp(3 * x - 1) + 4 / (2 * x + 1), 0, 2, "ex1");
chk(integrate((x) => sin(3 * x) + 2 * cos(x), 0, PI / 6), 4 / 3, 1e-9, "ex2");
chk(integrate((x) => sin(x) ** 2, 0, PI / 2), PI / 4, 1e-9, "ex3");
checkAntideriv((x) => tan(x) - x, (x) => tan(x) ** 2, 0, 1, "tan2");
checkAntideriv((x) => (1 / sqrt(6)) * atan(sqrt(1.5) * x), (x) => 1 / (2 + 3 * x * x), 0, 2, "ex4");
chk(integrate((x) => 3 / (2 * x + 1), 0, 2), 1.5 * log(5), 1e-9, "ex5");
console.log("ex5", 1.5 * log(5));
