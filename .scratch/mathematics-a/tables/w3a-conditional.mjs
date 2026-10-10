// Checks the worked examples of lessons/probability/conditional.md.
import { chk, same, F, nCr } from "../lib.mjs";
// Ex1 sweets 8 orange 4 lemon, two without replacement
same(F(8 * 7 + 4 * 3, 12 * 11).s, "17/33");
same(F(8 * 4 + 4 * 3, 132).s, "1/3"); // second lemon: OL + LL = 32/132 + 12/132 = 44/132
same(F(8 * 4 * 2, 132).s, "16/33");
// Ex2 kombi
const late = 0.7 * 0.1 + 0.3 * 0.4; chk(late, 0.19);
console.log("P(E|L)", 0.07 / late, F(7, 19).s);
// Ex3 table 200: boys 120 girls 80; glasses boys 30 girls 20
chk(20 / 200, (80 / 200) * (50 / 200));
// Ex4 5 boys 4 girls choose 3
const atl = nCr(9, 3) - nCr(5, 3); chk(atl, 74);
const ex1 = nCr(4, 1) * nCr(5, 2); chk(ex1, 40);
same(F(ex1, atl).s, "20/37"); console.log(40 / 74);
// with replacement contrast: P(both orange) = (2/3)^2
same(F(64, 144).s, "4/9"); same(F(56, 132).s, "14/33");
console.log("OK");
