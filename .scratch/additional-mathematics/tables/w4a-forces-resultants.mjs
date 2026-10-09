// Checks for lessons/mechanics/forces-resultants.md
import { chk, resultant, rad, deg } from "../lib.mjs";
const { cos, sin, sqrt, atan, asin } = Math;
// Ex1 20 N at 30°
console.log("ex1", 20 * cos(rad(30)), 20 * sin(rad(30)));
// Ex2 8 N east, 6 N north
const r2 = resultant([[8, 0], [6, 90]]); chk(r2.mag, 10); console.log("ex2", r2.angle);
// Ex3 three forces 10 N at 0°, 12 N at 60°, 7 N at 150°
const r3 = resultant([[10, 0], [12, 60], [7, 150]]); console.log("ex3", r3, 12 * cos(rad(60)), 12 * sin(rad(60)), 7 * cos(rad(150)), 7 * sin(rad(150)));
// Ex4 5 N and 8 N at 60° between them
const R4 = sqrt(25 + 64 + 2 * 5 * 8 * cos(rad(60))); const r4 = resultant([[5, 0], [8, 60]]); chk(r4.mag, R4, 1e-9);
console.log("ex4", R4, r4.angle, deg(asin(8 * sin(rad(120)) / R4)));
// Ex5 weight of 4 kg, g = 9.8
console.log("ex5", 4 * 9.8);
