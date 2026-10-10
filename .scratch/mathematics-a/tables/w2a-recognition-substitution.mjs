// W2a lesson numbers: integ.recognition-substitution
import { chk, checkAntideriv, integrate } from "../lib.mjs";
const { log, sin, cos, tan, sqrt, PI } = Math;
checkAntideriv((x) => 0.5 * log(x * x + 1), (x) => x / (x * x + 1), 0, 2, "ex1");
chk(integrate(tan, 0, PI / 3), log(2), 1e-9, "ex2");
checkAntideriv((x) => (x * x + 3) ** 5 / 10, (x) => x * (x * x + 3) ** 4, 0, 1, "ex3");
chk(integrate((x) => sin(2 * x) ** 2 * cos(x), 0, PI / 2), 8 / 15, 1e-9, "ex4");
chk(integrate((x) => x / sqrt(2 * x - 1), 1, 5), 16 / 3, 1e-9, "ex5");
console.log("ok");
