// Checks the worked examples of lessons/proof/induction.md.
import { chk, same, sum, mat } from "../lib.mjs";

const sig = (n, f) => sum(Array.from({ length: n }, (_, i) => f(i + 1)));
// Ex1 Σ r² = n(n + 1)(2n + 1)/6
for (const n of [1, 2, 7, 20]) chk(sig(n, (r) => r * r), (n * (n + 1) * (2 * n + 1)) / 6);
// Ex2 3^(2n) + 7 divisible by 8; f(k + 1) = 9 f(k) − 56
for (let n = 1; n <= 10; n++) chk((3 ** (2 * n) + 7) % 8, 0);
for (let k = 1; k <= 6; k++) chk(3 ** (2 * k + 2) + 7, 9 * (3 ** (2 * k) + 7) - 56);
// Ex3 A = [[2, 1], [0, 1]], A^n = [[2^n, 2^n − 1], [0, 1]]
const A = [[2, 1], [0, 1]];
for (const n of [1, 2, 5, 8]) same(mat.pow(A, n), [[2 ** n, 2 ** n - 1], [0, 1]]);
// Ex4 u1 = 2, u(n+1) = 3u(n) − 2 → u(n) = 3^(n−1) + 1
let u = 2; for (let n = 1; n <= 8; n++) { chk(u, 3 ** (n - 1) + 1); u = 3 * u - 2; }
// Ex5 Σ 1/(r(r + 1)) = n/(n + 1)
for (const n of [1, 2, 3, 10]) chk(sig(n, (r) => 1 / (r * (r + 1))), n / (n + 1), 1e-12);
console.log("induction lesson OK");
