// Checks for lessons/vectors/velocity.md
import { chk, same, vec, quad, deg, sf } from "../lib.mjs";
const { atan, asin, sqrt } = Math;
// ex1: v = 6i + 8j km/h: speed 10, angle 53.1° above i → bearing 036.9°
chk(vec.mag([6, 8]), 10);
console.log("angle", deg(atan(8 / 6)), "bearing", 90 - deg(atan(8 / 6)));
// ex2: r = (2i + 3j) + t(4i − 2j): t = 2.5 → 12i − 2j; due east of O when j = 0: t = 1.5
same(vec.add([2, 3], vec.scale(2.5, [4, -2])), [12, -2]);
chk(3 - 2 * 1.5, 0); same(vec.add([2, 3], vec.scale(1.5, [4, -2])), [8, 0]);
// ex3: P: (1 + 2t, 3 + t), Q: (10 − t, −3 + 3t): collide t = 3 at (7, 6)
same([1 + 2 * 3, 3 + 3], [7, 6]); same([10 - 3, -3 + 9], [7, 6]);
// ex4: distance apart. P: r = (0, 0) + t(3, 4); Q: r = (10, 0) + t(0, 4)?? use: Q starts (14, 2) velocity (−1, 5)
// PQ = (14 − 4t, 2 + t): |PQ| = 10 → (14 − 4t)² + (2 + t)² = 100 → 17t² − 108t + 100 = 0
console.log("ex4 roots", quad.roots(17, -108, 100));
// alternative: P r = t(5i + 2j), Q r = (13i + 5j) + t(-i + 2j)... PQ = (13 − 6t, 5) → |PQ| = 13 → (13−6t)² = 144 → t = 1/6 or 25/6
// choose PQ = (16 − 4t) i + (−12 + 3t) j = (4 − t)(4i − 3j) → |PQ| = 5|4 − t|; = 10 → t = 2 or 6
// P: r = (2i + j) + t(3i + 2j); Q: r = (18i − 11j) + t(−i + 5j) → PQ = (16 − 4t)i + (−12 + 3t)j
same(vec.sub(vec.add([18, -11], vec.scale(2, [-1, 5])), vec.add([2, 1], vec.scale(2, [3, 2]))), [8, -6]);
chk(vec.mag([8, -6]), 10);
same(vec.sub(vec.add([18, -11], vec.scale(6, [-1, 5])), vec.add([2, 1], vec.scale(6, [3, 2]))), [-8, 6]);
// ex5: river 120 m, current 1.5, boat 2.5 relative to water
chk(120 / 2.5, 48); chk(48 * 1.5, 72);
console.log("resultant", sqrt(2.5 ** 2 + 1.5 ** 2), "angle upstream", deg(asin(1.5 / 2.5)));
chk(sqrt(2.5 ** 2 - 1.5 ** 2), 2); chk(120 / 2, 60);
// ex6: speed 26 in direction 5i + 12j → 10i + 24j
same(vec.scale(26 / 13, [5, 12]), [10, 24]);
