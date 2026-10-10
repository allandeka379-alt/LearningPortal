import { chk, poly, quad, F } from "../lib.mjs";
// Ex1: 27^(2/3) * 9^(-1/2) / 81^(-3/4)
const e1 = (27 ** (2 / 3) * 9 ** -0.5) / 81 ** -0.75;
console.log("ex1", e1); chk(e1, 81, 1e-9);
// Ex2: 9^x = 27^(x-1) -> 2x = 3x - 3 -> x = 3
chk(9 ** 3, 27 ** 2); console.log("ex2 x=3");
// Ex3: 2^(2x+1) - 9*2^x + 4 = 0
console.log("ex3 y roots", quad.roots(2, -9, 4));
for (const x of [-1, 2]) chk(2 ** (2 * x + 1) - 9 * 2 ** x + 4, 0);
// Ex4: C = a + k d ; 45 at 60, 73 at 130
const k4 = (73 - 45) / (130 - 60), a4 = 45 - 60 * k4;
console.log("ex4", k4, a4, a4 + 200 * k4); chk(k4, 0.4); chk(a4, 21); chk(a4 + 200 * k4, 101);
// Ex5: y = k x^2 / sqrt z, y=12, x=2, z=9
const k5 = 12 / (4 / 3); chk(k5, 9);
console.log("ex5 y(3,16)", (k5 * 9) / 4); chk((k5 * 9) / 4, 20.25);
console.log("ex5 factor", 1.2 ** 2 / Math.sqrt(1.44)); chk(1.2 ** 2 / Math.sqrt(1.44), 1.2, 1e-12);
