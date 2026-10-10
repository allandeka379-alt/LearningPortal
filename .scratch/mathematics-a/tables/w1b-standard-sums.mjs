// Checks the worked examples of lessons/series/standard-sums-differences.md.
import { chk, sum } from "../lib.mjs";

const sig = (m, n, f) => sum(Array.from({ length: n - m + 1 }, (_, i) => f(m + i)));
const S1 = (n) => (n * (n + 1)) / 2, S2 = (n) => (n * (n + 1) * (2 * n + 1)) / 6, S3 = (n) => S1(n) ** 2;
for (const n of [1, 5, 12]) { chk(sig(1, n, (r) => r * r), S2(n)); chk(sig(1, n, (r) => r ** 3), S3(n)); }
// Ex1 Σ r(r + 1) = n(n + 1)(n + 2)/3; n = 10 → 440
for (const n of [1, 4, 10]) chk(sig(1, n, (r) => r * (r + 1)), (n * (n + 1) * (n + 2)) / 3);
chk(sig(1, 10, (r) => r * (r + 1)), 440);
// Ex2 Σ_{11}^{20} r² = 2870 − 385 = 2485
chk(S2(20), 2870); chk(S2(10), 385); chk(sig(11, 20, (r) => r * r), 2485);
// Ex3 Σ (2r − 1)² = n(2n − 1)(2n + 1)/3
for (const n of [1, 3, 9]) chk(sig(1, n, (r) => (2 * r - 1) ** 2), (n * (2 * n - 1) * (2 * n + 1)) / 3);
// Ex4 Σ 1/(r(r + 1)) = 1 − 1/(n + 1)
for (const n of [1, 6, 50]) chk(sig(1, n, (r) => 1 / (r * (r + 1))), 1 - 1 / (n + 1), 1e-12);
// Ex5 Σ 1/(r(r + 2)) = ½(3/2 − 1/(n + 1) − 1/(n + 2)) → 3/4
for (const n of [1, 6, 50]) chk(sig(1, n, (r) => 1 / (r * (r + 2))), 0.5 * (1.5 - 1 / (n + 1) - 1 / (n + 2)), 1e-12);
// Ex6 Σ_{n+1}^{2n} r = n(3n + 1)/2
for (const n of [1, 4, 9]) chk(sig(n + 1, 2 * n, (r) => r), (n * (3 * n + 1)) / 2);
console.log("standard sums lesson OK");
