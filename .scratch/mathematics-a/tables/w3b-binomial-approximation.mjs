// W3b lesson numbers: amaths.normal.binomial-approximation
import { binom, normalProb, invPhi, Phi, sfStr } from "../lib.mjs";
const s = (x) => sfStr(x, 4);
const z = (x, m, sd) => (x - m) / sd;
// Ex1 B(60,0.4) P(X>=30)
let m = 24, v = 14.4, sd = Math.sqrt(v);
console.log("ex1", normalProb(m, sd, 29.5, Infinity), z(29.5, m, sd), "exact", s(1 - binom.cdf(60, 0.4, 29)));
// Ex2 B(100,0.35) P(30<=X<40)
m = 35; v = 22.75; sd = Math.sqrt(v);
console.log("ex2", normalProb(m, sd, 29.5, 39.5), z(29.5, m, sd), z(39.5, m, sd), "exact", s(binom.cdf(100, 0.35, 39) - binom.cdf(100, 0.35, 29)));
// Ex3: 80 seeds, p=0.85 germinate: (a) P(fewer than 65 germinate) (b) smallest k with P(X>=k)<0.05 approx
m = 68; v = 80 * 0.85 * 0.15; sd = Math.sqrt(v);
console.log("ex3a", v, sd, normalProb(m, sd, -Infinity, 64.5), z(64.5, m, sd), "exact", s(binom.cdf(80, 0.85, 64)));
for (let k = 68; k <= 80; k++) { const p = normalProb(m, sd, k - 0.5, Infinity).exact; console.log(" k", k, p.toFixed(4)); }
console.log("1.645 bound", m + 0.5 + 1.645 * sd);
