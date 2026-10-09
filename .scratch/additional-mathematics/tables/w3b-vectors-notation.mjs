// Checks for lessons/vectors/notation-magnitude.md
import { chk, same, vec, quad } from "../lib.mjs";
chk(vec.mag([3, -4]), 5);
same(vec.sub([8, 7], [2, -1]), [6, 8]);
chk(vec.mag([6, 8]), 10);
chk(vec.mag([5, -12]), 13);
same(vec.scale(2, [5, -12]), [10, -24]);
// ex4: p(2i + 3j) + q(i − j) = 7i + 8j
const p = 3, q = 1;
same(vec.add(vec.scale(p, [2, 3]), vec.scale(q, [1, -1])), [7, 8]);
// ex5: 4i + kj parallel to 6i − 9j → k = −6
chk(4 / 6 * -9, -6);
// ex6: a = 2i − j, b = i + 3j; |a + λb| = 5 → (2 + λ)² + (3λ − 1)² = 25 → 10λ² − 2λ − 20 = 0 → 5λ² − λ − 10 = 0 ?
console.log(quad.roots(10, -2, -20));
// try a = 3i + j, b = i - 2j: |a + λb|² = (3+λ)² + (1-2λ)² = 5λ² + 2λ + 10 = 25 → 5λ² + 2λ − 15 = 0
console.log(quad.roots(5, 2, -15));
// a = 4i + 2j... |a + λb| with b = i + j?? (4+λ)² + (2+λ)² = 2λ² + 12λ + 20 = 26 → λ² + 6λ − 3 = 0
// a = 2i + 3j, b = i − j: (2+λ)² + (3−λ)² = 2λ² − 2λ + 13 = 25 → λ² − λ − 6 = 0 → λ = 3, −2
console.log(quad.roots(1, -1, -6));
same(vec.add([2, 3], vec.scale(3, [1, -1])), [5, 0]);
same(vec.add([2, 3], vec.scale(-2, [1, -1])), [0, 5]);
