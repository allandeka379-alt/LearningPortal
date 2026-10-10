// W2b lesson numbers: amaths.de.separable
import { chk, deriv } from "../lib.mjs";
const { exp, log, sqrt } = Math;
// ex1 dy/dx = xy, y(0) = 2 → y = 2e^{x²/2}
const y1 = (x) => 2 * exp((x * x) / 2);
for (const x of [0.3, 1, 1.7]) chk(deriv(y1, x), x * y1(x), 1e-5);
// ex2 cooling
const k = log(7 / 4) / 5, T = (t) => 20 + 70 * exp(-k * t);
chk(T(5), 60); const t40 = log(3.5) / k; chk(T(t40), 40);
for (const t of [1, 4, 9]) chk(deriv(T, t), -k * (T(t) - 20), 1e-6);
console.log("k", k, "t40", t40, "T(10)", T(10));
// ex3 tank dh/dt = -k sqrt(h), h(0)=4, h(10)=1 → 2√h = 4 − 0.2t
const h = (t) => ((4 - 0.2 * t) / 2) ** 2; chk(h(0), 4); chk(h(10), 1); chk(h(20), 0);
for (const t of [2, 7, 15]) chk(deriv(h, t), -0.2 * sqrt(h(t)), 1e-6);
