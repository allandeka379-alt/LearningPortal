// Checks for lessons/probability/set-language.md
import { chk, F, same } from "../lib.mjs";
// Ex1: die, A = even, B = more than 3
const S = [1, 2, 3, 4, 5, 6];
const A = S.filter((x) => x % 2 === 0), B = S.filter((x) => x > 3);
const U = S.filter((x) => A.includes(x) || B.includes(x)), I = A.filter((x) => B.includes(x));
same(U, [2, 4, 5, 6]); same(I, [4, 6]);
same(F(U.length, 6).s, "2/3"); same(F(I.length, 6).s, "1/3"); same(F(6 - A.length, 6).s, "1/2");
// Ex2: 40 learners, G 23, H 18, both 7
const gOnly = 23 - 7, hOnly = 18 - 7, neither = 40 - (gOnly + hOnly + 7);
same([gOnly, hOnly, neither], [16, 11, 6]);
same(F(neither, 40).s, "3/20"); same(F(gOnly + hOnly, 40).s, "27/40"); same(F(23 + 18 - 7, 40).s, "17/20");
// Ex3: 60 households, three events
const all = 5, cg = 7, gk = 4, ck = 6;
const cOnly = 30 - all - cg - ck, gOnly3 = 25 - all - cg - gk, kOnly = 28 - all - gk - ck;
same([cOnly, gOnly3, kOnly], [12, 9, 13]);
const union = cOnly + gOnly3 + kOnly + cg + gk + ck + all;
same(union, 56); same(60 - union, 4);
same(F(cg + gk + ck, 60).s, "17/60"); same(F(cOnly + gOnly3 + kOnly, 60).s, "17/30");
// Ex4: probabilities in a Venn diagram
chk(0.45 - 0.12, 0.33); chk(0.3 - 0.12, 0.18); chk(1 - 0.33 - 0.18 - 0.12, 0.37);
chk(0.45 + 0.3 - 0.12, 0.63);
console.log("set-language lesson checks OK");
