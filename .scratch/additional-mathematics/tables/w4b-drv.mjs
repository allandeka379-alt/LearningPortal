// Checks for lessons/distributions/discrete-random-variables.md
import { chk, F, same, Fr } from "../lib.mjs";
const E = (xs, ps) => xs.reduce((s, x, i) => s + x * ps[i], 0);
const E2 = (xs, ps) => xs.reduce((s, x, i) => s + x * x * ps[i], 0);
// Ex1: P(X = x) = kx, x = 1..4
const k = 1 / 10;
const xs1 = [1, 2, 3, 4], ps1 = xs1.map((x) => k * x);
chk(ps1.reduce((a, b) => a + b), 1);
chk(E(xs1, ps1), 3); chk(E2(xs1, ps1), 10); chk(E2(xs1, ps1) - 9, 1);
chk(ps1[0] + ps1[1], 0.3); // P(X ≤ 2)
chk(1 - ps1[0], 0.9); // P(X ≥ 2)
// Ex2: x 0..3, P: 0.2, a, b, 0.1, E(X) = 1.4
const a = 0.3, b2 = 0.4;
chk(0.2 + a + b2 + 0.1, 1); chk(a + 2 * b2 + 0.3, 1.4);
const xs2 = [0, 1, 2, 3], ps2 = [0.2, a, b2, 0.1];
chk(E2(xs2, ps2), 2.8); chk(E2(xs2, ps2) - 1.4 ** 2, 0.84);
// Ex3: two counters without replacement from 3 red 5 blue, X = number of red
const p0 = Fr.mul(F(5, 8), F(4, 7)), p1 = Fr.mul(2, Fr.mul(F(3, 8), F(5, 7))), p2 = Fr.mul(F(3, 8), F(2, 7));
same([p0.s, p1.s, p2.s], ["5/14", "15/28", "3/28"]);
same(Fr.add(Fr.add(p0, p1), p2).s, "1");
same(Fr.add(p1, Fr.mul(2, p2)).s, "3/4");
const ex2 = Fr.add(p1, Fr.mul(4, p2)); same(ex2.s, "27/28");
same(Fr.sub(ex2, F(9, 16)).s, "45/112"); console.log("Var Ex3", 45 / 112);
console.log("drv lesson checks OK");
