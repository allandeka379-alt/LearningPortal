// W2b lesson numbers: amaths.numerical.trapezium-errors
import { trapezium, integrate, chk } from "../lib.mjs";
const { sqrt, log, exp } = Math;
const e1 = trapezium((x) => sqrt(1 + x ** 3), 0, 2, 4); console.log("ex1", e1, e1.ys.map((y) => y.toFixed(4)), "true", integrate((x) => sqrt(1 + x ** 3), 0, 2));
const e2 = trapezium(log, 1, 3, 4); console.log("ex2", e2.value, e2.ys.map((y) => y.toFixed(4)), "exact", 3 * log(3) - 2);
// rectangles for 1/x on [1,2], 4 strips
const h = 0.25, xs = [1, 1.25, 1.5, 1.75, 2];
const upper = h * xs.slice(0, 4).reduce((s, x) => s + 1 / x, 0), lower = h * xs.slice(1).reduce((s, x) => s + 1 / x, 0);
console.log("ex3", lower, upper, log(2), "trap", trapezium((x) => 1 / x, 1, 2, 4).value, (lower + upper) / 2);
console.log("ex4", 12.4 * 7.6, 12.45 * 7.65, 12.35 * 7.55, (12.45 * 7.65 - 12.4 * 7.6), (12.45 * 7.65 - 12.4 * 7.6) / (12.4 * 7.6));
