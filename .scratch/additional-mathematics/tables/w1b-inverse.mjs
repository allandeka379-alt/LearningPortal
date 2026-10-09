// Worked-example checks for lessons/functions/inverse.md
import { chk } from "../lib.mjs";

const inv = (f, fi, xs, label) => xs.forEach((x) => { chk(fi(f(x)), x, 1e-9, `${label} fi(f(${x}))`); });
inv((x) => 4 * x - 7, (x) => (x + 7) / 4, [-3, 0, 2.5, 10], "ex1");
inv((x) => (2 * x + 1) / (x - 3), (x) => (3 * x + 1) / (x - 2), [-4, 0, 2.5, 5, 10], "ex2");
inv((x) => (x - 1) ** 2 + 4, (x) => 1 + Math.sqrt(x - 4), [1, 2, 3.5, 8], "ex3");
inv((x) => Math.exp(2 * x) + 3, (x) => 0.5 * Math.log(x - 3), [-2, 0, 1, 1.7], "ex4a");
inv((x) => Math.log(x + 1), (x) => Math.exp(x) - 1, [-0.5, 0, 3, 10], "ex4b");
// Ex5: f(x) = x^2 - 6, x >= 0; f(x) = x -> x = 3
chk(3 * 3 - 6, 3); chk(Math.sqrt(3 + 6), 3);
console.log("ok");
