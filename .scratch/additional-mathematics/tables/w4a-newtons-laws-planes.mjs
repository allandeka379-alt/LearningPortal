// Checks for lessons/mechanics/newtons-laws-planes.md
import { chk, rad, suvat } from "../lib.mjs";
const { sin, cos, tan } = Math;
const g = 9.8;
console.log("ex1", 40 * cos(rad(25)) / 8);
const R2 = 78.4 - 40 * sin(rad(25)); console.log("ex2", R2, 0.3 * R2, 40 * cos(rad(25)), (40 * cos(rad(25)) - 0.3 * R2) / 8);
const a3 = g * (sin(rad(30)) - 0.2 * cos(rad(30))); const m3 = suvat({ u: 0, a: a3, t: 4 }); console.log("ex3", a3, m3.v, m3.s);
const d4 = g * (sin(rad(20)) + 0.3 * cos(rad(20))); console.log("ex4", d4, 64 / (2 * d4), tan(rad(20)), g * (sin(rad(20)) - 0.3 * cos(rad(20))), g * sin(rad(20)), 0.3 * g * cos(rad(20)));
const a5 = 2 * 3 / 2.25; console.log("ex5", a5, g * sin(rad(25)), g * cos(rad(25)), (g * sin(rad(25)) - a5) / (g * cos(rad(25))));
