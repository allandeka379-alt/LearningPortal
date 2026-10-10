// Lesson numbers for measurement.scalars-vectors (W1a).
import { DATA, deg, rad } from "../lib.mjs";
console.log("ex1", Math.hypot(12, 5), deg(Math.atan(5 / 12)));
const R2 = Math.sqrt(40 ** 2 + 30 ** 2 + 2 * 40 * 30 * Math.cos(rad(60)));
console.log("ex2", R2, "alpha", deg(Math.asin((30 * Math.sin(rad(120))) / R2)), "cosine-rule angle 120 between tail-to-head");
console.log("ex3", 250 * Math.cos(rad(35)), 250 * Math.sin(rad(35)));
const W = 60 * DATA.g;
console.log("ex4 W", W, "along", W * Math.sin(rad(20)), "perp", W * Math.cos(rad(20)));
console.log("dv", Math.hypot(8, 6), deg(Math.atan(6 / 8)));
