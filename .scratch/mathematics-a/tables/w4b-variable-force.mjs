import { checkDeriv, checkAntideriv, integrate } from "../lib.mjs";
const { exp, log, sqrt } = Math;
// Ex1 a = 6 - 2t from rest at O
checkAntideriv((t) => 6 * t - t * t, (t) => 6 - 2 * t, 0, 4); checkAntideriv((t) => 3 * t * t - t ** 3 / 3, (t) => 6 * t - t * t, 0, 5);
console.log("Ex1 vmax", 6 * 3 - 9, "x(6)", 3 * 36 - 216 / 3, "x(3)", 27 - 9);
// Ex2 a = 3/x^2, x=1 v=2
console.log("Ex2 v(3)", sqrt(10 - 6 / 3), "limit", sqrt(10));
// Ex3 boat 400 kg, R = 10 v^2, u = 6
const v3 = (x) => 6 * exp(-x / 40); checkDeriv(v3, (x) => -v3(x) / 40, [1, 10, 30]);
console.log("Ex3 x to 2", 40 * log(3), "t to 2", 40 * (1 / 2 - 1 / 6));
// Ex4 car 800 kg, D = 2400, R = 60 v
const v4 = (t) => 40 * (1 - exp((-3 * t) / 40)); checkDeriv(v4, (t) => (2400 - 60 * v4(t)) / 800, [1, 5, 20]);
console.log("Ex4 t to 30", (40 / 3) * log(4), "dist in that time", integrate(v4, 0, (40 / 3) * log(4)));
