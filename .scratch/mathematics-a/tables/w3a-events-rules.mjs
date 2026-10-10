// Checks the worked examples of lessons/probability/events-rules.md.
import { chk, same, F, nCr, fact } from "../lib.mjs";
const dice = []; for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) dice.push([a, b]);
same(F(dice.filter(([a, b]) => a + b === 8).length, 36).s, "5/36");
same(F(dice.filter(([a, b]) => a + b >= 10).length, 36).s, "1/6");
// spinner 1..4 and coin? spinner A 1..4, spinner B 1..3: product even
const sp = []; for (let a = 1; a <= 4; a++) for (let b = 1; b <= 3; b++) sp.push(a * b);
console.log("spinner products", sp, "P(even)", F(sp.filter((x) => x % 2 === 0).length, 12).s, "P(>6)", F(sp.filter((x) => x > 6).length, 12).s);
// Venn: 30 learners, Bio 17, Chem 12, both 6
same(F(30 - (17 + 12 - 6), 30).s, "7/30"); same(F(17 + 12 - 6, 30).s, "23/30");
// combinations: bag 5 red 4 blue, 3 drawn, exactly 2 red
same(F(nCr(5, 2) * nCr(4, 1), nCr(9, 3)).s, "10/21");
same(F(nCr(4, 3), nCr(9, 3)).s, "1/21");
// arrangement: 7 people, two together
same(F(2 * fact(6), fact(7)).s, "2/7");
console.log("OK");
