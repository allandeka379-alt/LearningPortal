// Checks for lessons/mechanics/equilibrium.md
import { chk, rad } from "../lib.mjs";
const { cos, sin, tan, sqrt } = Math;
const g = 9.8;
// Ex1 5 kg, strings at 30° and 60° to horizontal
const T1 = 49 / 2, T2 = sqrt(3) * T1;
chk(T1 * cos(rad(30)), T2 * cos(rad(60)), 1e-9); chk(T1 * sin(rad(30)) + T2 * sin(rad(60)), 49, 1e-9);
console.log("ex1", T1, T2);
// Ex2 3 kg on smooth 25° plane, horizontal force P
const P = 3 * g * tan(rad(25)), R = 3 * g / cos(rad(25));
chk(P * cos(rad(25)), 3 * g * sin(rad(25)), 1e-9); chk(R, 3 * g * cos(rad(25)) + P * sin(rad(25)), 1e-9);
console.log("ex2", P, R);
// Ex3 7, 24 perpendicular → 25; angle
console.log("ex3", sqrt(49 + 576), Math.atan(24 / 7) * 180 / Math.PI);
// Ex4 (2,5)+(-6,1)+(p,q)=0
chk(-(2 - 6), 4); chk(-(5 + 1), -6);
// Ex5 2 kg on smooth plane, string parallel tension 9.8 → sin α = 0.5
chk(9.8 / (2 * g), 0.5); console.log("ex5 R", 2 * g * cos(rad(30)));
