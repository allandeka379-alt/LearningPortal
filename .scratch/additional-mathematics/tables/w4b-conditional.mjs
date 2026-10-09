// Checks for lessons/probability/conditional.md
import { chk, F, same, Fr, sf } from "../lib.mjs";
// Ex1: two-way table, 120 learners: boarders/day by uses library
// boarders 50 (uses library 32), day 70 (uses 28)
const tot = 120, bL = 32, bN = 18, dL = 28, dN = 42;
same(bL + bN + dL + dN, tot);
same(F(bL, bL + bN).s, "16/25"); same(F(bL, bL + dL).s, "8/15"); same(F(bL + dL, tot).s, "1/2");
// independence: P(L | B) = 0.64 vs P(L) = 0.5 -> not independent
// Ex2: Venn probabilities P(A) = 0.5, P(B) = 0.4, P(A ∩ B) = 0.2
chk(0.2 / 0.4, 0.5); chk(0.2 / 0.5, 0.4); // P(A|B) = P(A) -> independent
// Ex3: seeds: supplier A 70% germ 0.9, B 30% germ 0.8
const pG = 0.7 * 0.9 + 0.3 * 0.8;
chk(pG, 0.87); same(Fr.div(F(63, 100), F(87, 100)).s, "21/29"); console.log("P(A|G)", 0.63 / 0.87, sf(0.63 / 0.87, 3));
// P(B | not G) = 0.06 / 0.13
chk(0.3 * 0.2, 0.06); chk(1 - pG, 0.13); same(F(6, 13).s, "6/13"); console.log("P(B|G')", 6 / 13);
// Ex4: without replacement: 5 red 3 blue, two drawn; P(first red | second red)
const rr = Fr.mul(F(5, 8), F(4, 7)), br = Fr.mul(F(3, 8), F(5, 7));
same(rr.s, "5/14"); same(br.s, "15/56"); same(Fr.add(rr, br).s, "5/8"); same(Fr.div(rr, Fr.add(rr, br)).s, "4/7");
console.log("conditional lesson checks OK");
