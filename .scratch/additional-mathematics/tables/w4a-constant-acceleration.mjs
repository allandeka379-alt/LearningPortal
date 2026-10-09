// Checks for lessons/mechanics/constant-acceleration.md
import { chk, suvat, quad, same } from "../lib.mjs";
// Ex1 u=8, a=1.5, t=6
const e1 = suvat({ u: 8, a: 1.5, t: 6 }); chk(e1.v, 17); chk(e1.s, 75);
// Ex2 u=30 to rest in 75 m
const e2 = suvat({ u: 30, v: 0, s: 75 }); chk(e2.a, -6); chk(e2.t, 5);
// Ex3 up at 14.7, g = 9.8
chk(14.7 ** 2 / (2 * 9.8), 11.025, 1e-9); chk(14.7 / 9.8, 1.5, 1e-12); chk(2 * 14.7 / 9.8, 3, 1e-12);
console.log("ex3 h", 14.7 ** 2 / 19.6);
// Ex4 A from rest a=2 as B passes at 16
same(quad.roots(1, -16, 0), [0, 16]); chk(16 * 16, 256); chk(2 * 16, 32);
// Ex5 20 m in first 2 s, 75 m in next 3 s
// 2u + 2a = 20, 5u + 12.5a = 95
const a = (95 - 50) / 7.5, u = 10 - a; chk(a, 6); chk(u, 4);
chk(u * 2 + 0.5 * a * 4, 20); chk(u * 5 + 0.5 * a * 25 - 20, 75);
console.log("constant-acceleration lesson checks OK");
