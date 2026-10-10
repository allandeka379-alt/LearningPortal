// W4a lesson numbers: amaths.kinematics.calculus
import { poly, checkDeriv, checkAntideriv, integrate } from "../lib.mjs";
const s1 = [1, -6, 9, 2];
console.log("Ex1 v", poly.deriv(s1), "roots", poly.rationalRoots(poly.deriv(s1)), "s", [0, 1, 3, 4].map((x) => poly.eval(s1, x)));
console.log("Ex1 dist", integrate((t) => Math.abs(poly.eval(poly.deriv(s1), t)), 0, 4, 20000));
const v2 = (t) => 4 + 6 * t - t * t, s2 = (t) => 4 * t + 3 * t * t - t ** 3 / 3;
checkDeriv(v2, (t) => 6 - 2 * t, [0.5, 2, 4]); checkDeriv(s2, v2, [1, 3]);
console.log("Ex2 vmax", v2(3), "rest", 3 + Math.sqrt(13));
const v3 = (t) => 0.6 * t * t - 0.04 * t ** 3, S3 = (t) => 0.2 * t ** 3 - 0.01 * t ** 4;
checkAntideriv(S3, v3, 0, 15); checkDeriv(v3, (t) => 1.2 * t - 0.12 * t * t, [2, 9]);
console.log("Ex3", v3(10), v3(15), S3(15));
