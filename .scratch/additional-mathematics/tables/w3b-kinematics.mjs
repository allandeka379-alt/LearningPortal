// Checks for lessons/calculus/kinematics.md
import { chk, same, checkDeriv, quad, integrate } from "../lib.mjs";
const { exp, sin, cos, PI, abs } = Math;
// ex1/2: s = t³ − 6t² + 9t
const s = (t) => t ** 3 - 6 * t * t + 9 * t;
const v = (t) => 3 * t * t - 12 * t + 9;
checkDeriv(s, v, [0, 1, 2, 4]);
checkDeriv(v, (t) => 6 * t - 12, [0, 2]);
same(quad.roots(3, -12, 9), [1, 3]);
same([s(0), s(1), s(3), s(4)], [0, 4, 0, 4]);
chk(integrate((t) => abs(v(t)), 0, 4, 40000), 12, 1e-5);
// ex3: v = 6 cos 2t, s(0) = 0 → s = 3 sin 2t; first rest t = π/4
checkDeriv((t) => 3 * sin(2 * t), (t) => 6 * cos(2 * t), [0, 0.5]);
chk(6 * cos(2 * (PI / 4)), 0, 1e-12);
chk(3 * sin(PI / 2), 3);
// ex4: a = 6t − 4, v(0) = 2, s(0) = 0 → v = 3t² − 4t + 2, s = t³ − 2t² + 2t, s(3) = 15
chk(quad.disc(3, -4, 2), -8);
const s4 = (t) => t ** 3 - 2 * t * t + 2 * t;
checkDeriv(s4, (t) => 3 * t * t - 4 * t + 2, [0, 1, 3]);
chk(s4(3), 15);
// ex5: v = 10 − 10e^{−0.2t}, s(0) = 0 → s = 10t + 50e^{−0.2t} − 50; s(5) = 50/e
const s5 = (t) => 10 * t + 50 * exp(-0.2 * t) - 50;
checkDeriv(s5, (t) => 10 - 10 * exp(-0.2 * t), [0, 2, 5]);
chk(s5(0), 0);
chk(s5(5), 50 / Math.E, 1e-12);
console.log("kinematics lesson checks OK", 50 / Math.E, 2 * exp(-1));
