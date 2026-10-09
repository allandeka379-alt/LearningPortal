// Checks for lessons/vectors/geometry.md. Vectors in terms of a, b are stored as [coef of a, coef of b].
import { chk, same, vec } from "../lib.mjs";
// ex2: P divides AB in ratio 2:3, A(−2, 4), B(8, −1) → P(2, 2)
const A = [-2, 4], B = [8, -1];
same(vec.add(A, vec.scale(2 / 5, vec.sub(B, A))).map((v) => Math.round(v * 1e9) / 1e9), [2, 2]);
same(vec.add(vec.scale(3 / 5, A), vec.scale(2 / 5, B)).map((v) => Math.round(v * 1e9) / 1e9), [2, 2]);
// ex3: collinear A(1, 2), B(4, 8), C(6, 12)
same(vec.sub([4, 8], [1, 2]), [3, 6]);
same(vec.sub([6, 12], [4, 8]), [2, 4]);
// ex4: P midpoint of OA, Q on AB with AQ:QB = 1:2; OQ and BP meet at R; λ = 3/5, μ = 4/5
const lam = 3 / 5, mu = 4 / 5;
const OQ = [2 / 3, 1 / 3];
const viaOQ = vec.scale(lam, OQ);
const BP = [1 / 2, -1];
const viaBP = vec.add([0, 1], vec.scale(mu, BP));
chk(viaOQ[0], viaBP[0], 1e-12); chk(viaOQ[1], viaBP[1], 1e-12);
chk(viaOQ[0], 2 / 5, 1e-12); chk(viaOQ[1], 1 / 5, 1e-12);
// numeric check with arbitrary non-parallel a, b
const a = [3, 1], b = [1, 4];
const pt = (c) => vec.add(vec.scale(c[0], a), vec.scale(c[1], b));
const O = [0, 0], Pp = pt([0.5, 0]), Q = pt([2 / 3, 1 / 3]), Bv = pt([0, 1]);
const R = pt([0.4, 0.2]);
// R on OQ and BP
const cross = (u, v) => u[0] * v[1] - u[1] * v[0];
chk(cross(vec.sub(R, O), vec.sub(Q, O)), 0, 1e-12);
chk(cross(vec.sub(R, Bv), vec.sub(Pp, Bv)), 0, 1e-12);
console.log("vectors geometry lesson checks OK");
