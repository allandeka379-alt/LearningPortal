// Checks for lessons/calculus/volumes-of-revolution.md
import { chk, integrate } from "../lib.mjs";
const { PI, exp, sqrt } = Math;
const V = (f, a, b) => PI * integrate((x) => f(x) ** 2, a, b, 4000);
chk(V((x) => 2 * x, 0, 3), 36 * PI, 1e-8, "ex1 cone");
chk((1 / 3) * PI * 36 * 3, 36 * PI);
chk(V((x) => x * x + 1, 0, 2), (206 * PI) / 15, 1e-8, "ex2");
chk(32 / 5 + 16 / 3 + 2, 206 / 15);
chk(V((x) => sqrt(x), 1, 4), (15 * PI) / 2, 1e-8, "ex3");
chk(V((x) => exp(x), 0, 1), (PI * (exp(2) - 1)) / 2, 1e-8, "ex4");
chk(V((x) => 4 - x * x, -2, 2), (512 * PI) / 15, 1e-8, "ex5");
// sphere r = 3
chk(V((x) => sqrt(9 - x * x), -3, 3), 36 * PI, 1e-6, "sphere");
console.log("volumes lesson checks OK", (PI * (exp(2) - 1)) / 2, (206 * PI) / 15, (512 * PI) / 15);
