// W4a: worked-example numbers for lessons/kinematics/vector-motion.md
import { vec, deg, sfStr, dpStr, chk, same } from "../lib.mjs";
const at = (r0, v, t) => vec.add(r0, vec.scale(t, v));
const bearing = ([e, n]) => ((90 - deg(Math.atan2(n, e))) % 360 + 360) % 360;
// Ex1
const r0 = [2, 3], v = [4, -3];
console.log("Ex1 speed", vec.mag(v), "bearing", dpStr(bearing(v), 1), "pos 2.5", at(r0, v, 2.5), "dist", sfStr(vec.mag(at(r0, v, 2.5)), 3));
// Ex2 paths cross
const P0 = [1, 5], vP = [3, 1], Q0 = [13, -5], vQ = [-2, 4];
same(at(P0, vP, 2), [7, 7]); same(at(Q0, vQ, 3), [7, 7]);
console.log("Ex2 same-time x", (Q0[0] - P0[0]) / (vP[0] - vQ[0]), "y", (Q0[1] - P0[1]) / (vP[1] - vQ[1]));
// Ex3 collide
const A0 = [-3, 4], vA = [4, 1], B0 = [3, -2], vB = [1, 4];
same(at(A0, vA, 2), at(B0, vB, 2)); console.log("Ex3 meet", at(A0, vA, 2));
// Ex4 closest approach
const C0 = [2, 1], vC = [3, 2], D0 = [10, -3], vD = [1, 4];
const rel = (t) => vec.sub(at(D0, vD, t), at(C0, vC, t));
for (const t of [0, 1, 2, 3, 4]) console.log("Ex4 t", t, rel(t), vec.mag(rel(t)) ** 2);
chk(vec.mag(rel(3)) ** 2, 8); console.log("min", sfStr(Math.sqrt(8), 3), "pos C", at(C0, vC, 3), "pos D", at(D0, vD, 3));
// Ex5 line intersection (2-D lines)
// r = (1,2)+s(1,3), r = (5,0)+t(-1,2): 1+s = 5-t, 2+3s = 2t
const s = (10 - 2) / 5; console.log("Ex5 s", s, "t", 4 - s, at([1, 2], [1, 3], s), at([5, 0], [-1, 2], 4 - s));
