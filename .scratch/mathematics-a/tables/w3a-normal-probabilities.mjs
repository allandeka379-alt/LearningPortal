// Checks the worked examples of lessons/normal/probabilities.md.
import { Phi, phiTable, normalProb, sfStr, chk, binom } from "../lib.mjs";
const S = (x) => sfStr(x, 3);
const show = (l, mu, s, lo, hi) => { const r = normalProb(mu, s, lo, hi); console.log(l, "exact", r.exact, S(r.exact), "table", r.table.toFixed(4)); return r; };
console.log("Phi(1.25)", phiTable(1.25), "Phi(0.63)", phiTable(0.63), "Phi(1.88)", phiTable(1.88), "Phi(1.5)", phiTable(1.5), "Phi(0.75)", phiTable(0.75));
show("Ex1a P(X<175)", 165, 8, -Infinity, 175);
show("Ex1b P(X>155)", 165, 8, 155, Infinity);
show("Ex1c P(153<X<171)", 165, 8, 153, 171);
// Ex2: drink cans N(330, 2.5^2), P(X<326) ; 500 cans expected number
const r2 = show("Ex2 P(X<326)", 330, 2.5, -Infinity, 326); console.log("z", (326 - 330) / 2.5, "500*", 500 * r2.exact, 500 * r2.table);
// Ex3: P(|X-330|<3)
show("Ex3 P(327<X<333)", 330, 2.5, 327, 333); console.log("Phi(1.2)", phiTable(1.2));
// three cans all below 326
console.log("three", r2.exact ** 3, r2.table ** 3);
// exactly 2 of 5 underweight below 326
console.log("2 of 5", binom.pmf(5, r2.exact, 2), binom.pmf(5, r2.table, 2));
