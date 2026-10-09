// Worked-example checks for lessons/circular/radians.md
import { chk, rad, deg, sfStr, dpStr, quad, same } from "../lib.mjs";
// Ex1
chk(rad(75), 5 * Math.PI / 12); console.log("75deg", rad(75), sfStr(rad(75), 4), "2.4rad", deg(2.4), dpStr(deg(2.4), 1));
// Ex2 r = 8, θ = 1.2
chk(8 * 1.2, 9.6); chk(0.5 * 64 * 1.2, 38.4); chk(16 + 9.6, 25.6);
// Ex3 r = 6, θ = 2π/3
chk(6 * 2 * Math.PI / 3, 4 * Math.PI); chk(0.5 * 36 * 2 * Math.PI / 3, 12 * Math.PI);
// Ex4 perimeter 30, r = 9
chk((30 - 18) / 9, 4 / 3); chk(0.5 * 81 * 4 / 3, 54);
// Ex5 area 50, arc 10 -> r = 10, θ = 1
chk(0.5 * 10 * 10, 50);
// Ex6 r = 60, θ = 2.5
chk(0.5 * 3600 * 2.5, 4500); chk(60 * 2.5, 150);
// Ex7 minute hand 15 cm, 10 minutes
chk(10 / 60 * 2 * Math.PI, Math.PI / 3); chk(15 * Math.PI / 3, 5 * Math.PI); chk(0.5 * 225 * Math.PI / 3, 37.5 * Math.PI);
console.log("ok", same(quad.roots(1, 0, -1), [-1, 1]));
