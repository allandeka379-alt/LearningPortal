// Checks for lessons/probability/addition-product-rules.md
import { chk, F, same, Fr } from "../lib.mjs";
// Ex1: mutually exclusive: P(A) = 0.35, P(B) = 0.4
chk(0.35 + 0.4, 0.75);
// Ex2: general rule: P(A) = 0.6, P(B) = 0.45, P(A ∪ B) = 0.8
chk(0.6 + 0.45 - 0.8, 0.25); chk(0.6 * 0.45, 0.27);
// Ex3: two dice
const pairs = [];
for (let i = 1; i <= 6; i++) for (let j = 1; j <= 6; j++) pairs.push([i, j]);
same(pairs.filter(([a, b]) => a + b === 8).length, 5);
same(pairs.filter(([a, b]) => a + b >= 10).length, 6);
same(pairs.filter(([a, b]) => a === b).length, 6);
// Ex4: independent: P(rain) = 0.3 and P(late) = 0.2 independent (product), with replacement two draws
chk(0.7 * 0.8, 0.56); chk(1 - 0.56, 0.44);
// Ex5: without replacement 4 red 6 white, two drawn
const rr = Fr.mul(F(4, 10), F(3, 9)), ww = Fr.mul(F(6, 10), F(5, 9));
same(rr.s, "2/15"); same(ww.s, "1/3"); same(Fr.add(rr, ww).s, "7/15"); same(Fr.sub(F(1), ww).s, "2/3");
// with replacement comparison
same(Fr.add(Fr.mul(F(4, 10), F(4, 10)), Fr.mul(F(6, 10), F(6, 10))).s, "13/25");
console.log("addition-product lesson checks OK");
