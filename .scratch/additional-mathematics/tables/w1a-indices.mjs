import { chk, F, quad, simplifySurd } from "../lib.mjs";
// indices.indices lesson
chk(27 ** (2 / 3) * 16 ** (-3 / 4), 9 / 8, 1e-12, "ex1");
// ex2: (6x^3y^-2)(2x^-1y^5)/(4x^2y) = 3 y^2 at x=1.7,y=0.6
{ const x = 1.7, y = 0.6; chk((6 * x ** 3 * y ** -2) * (2 * x ** -1 * y ** 5) / (4 * x ** 2 * y), 3 * y ** 2, 1e-9, "ex2"); }
chk(9 ** (2 + 1), 27 ** 2, 0, "ex3 x=2");
console.log("ex4 roots u", quad.roots(1, -12, 27));
chk(2 ** (3 + 3) + 2 ** 3, 72, 0, "ex5");
// surds lesson
console.log(simplifySurd(72), simplifySurd(48), simplifySurd(12), simplifySurd(75));
// ex: sqrt72 + sqrt50 - 2sqrt18 = 6r2+5r2-6r2 = 5r2
chk(Math.sqrt(72) + Math.sqrt(50) - 2 * Math.sqrt(18), 5 * Math.SQRT2, 1e-12, "s1");
// (3+2r5)(4-r5) = 12 -3r5 +8r5 -10 = 2+5r5
chk((3 + 2 * Math.sqrt(5)) * (4 - Math.sqrt(5)), 2 + 5 * Math.sqrt(5), 1e-12, "s2");
// 14/(3 - r2) = 14(3+r2)/7 = 6 + 2r2
chk(14 / (3 - Math.SQRT2), 6 + 2 * Math.SQRT2, 1e-12, "s3");
// (1+r3)/(2-r3) = (1+r3)(2+r3)/1 = 2 + r3 + 2r3 + 3 = 5 + 3r3
chk((1 + Math.sqrt(3)) / (2 - Math.sqrt(3)), 5 + 3 * Math.sqrt(3), 1e-12, "s4");
// show-that: rectangle sides (2+r3) and (4 - r3): area = 8 -2r3 +4r3 -3 = 5 + 2r3 ; diag^2 = (2+r3)^2+(4-r3)^2 = 7+4r3 + 19 - 8r3 = 26 - 4r3
chk((2 + Math.sqrt(3)) * (4 - Math.sqrt(3)), 5 + 2 * Math.sqrt(3), 1e-12, "s5a");
chk((2 + Math.sqrt(3)) ** 2 + (4 - Math.sqrt(3)) ** 2, 26 - 4 * Math.sqrt(3), 1e-12, "s5b");
// 6/r3 = 2r3
chk(6 / Math.sqrt(3), 2 * Math.sqrt(3), 1e-12, "s6");
console.log("ok");
