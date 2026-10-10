// Checks the worked examples of lessons/counting/permutations.md (brute force where practical).
import { chk, fact, nPr } from "../lib.mjs";
function perms(a) { if (a.length <= 1) return [a]; const out = []; a.forEach((x, i) => { for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]); }); return out; }
const distinct = (w) => new Set(perms([...w]).map((p) => p.join(""))).size;
chk(fact(7), 5040); chk(nPr(8, 3), 336);
chk(distinct("CHINHOYI"), 10080); chk(fact(8) / 4, 10080);
// together / apart: 6 people, A and B
const pp = perms(["A", "B", "C", "D", "E", "F"]);
const tog = pp.filter((p) => Math.abs(p.indexOf("A") - p.indexOf("B")) === 1).length;
chk(tog, 240); chk(720 - tog, 480);
// CHINHOYI with the two H's together: treat HH as one block: 7!/2! = 2520
chk(new Set(perms([..."CHINHOYI"]).map((p) => p.join(""))).size, 10080);
const hh = [...new Set(perms([..."CHINHOYI"]).map((p) => p.join("")))].filter((s) => s.includes("HH")).length;
chk(hh, 2520);
// 4-digit numbers > 5000 from 1..7 no repetition
let c = 0; for (const p of perms([1, 2, 3, 4, 5, 6, 7])) { }
const digits = [1, 2, 3, 4, 5, 6, 7];
let cnt = 0;
for (const a of digits) for (const b of digits) for (const d of digits) for (const e of digits) { if (new Set([a, b, d, e]).size === 4 && a * 1000 + b * 100 + d * 10 + e > 5000) cnt++; }
chk(cnt, 360);
// 4-digit odd numbers > 5000: first in {5,6,7}, last odd
let odd = 0;
for (const a of digits) for (const b of digits) for (const d of digits) for (const e of digits) { if (new Set([a, b, d, e]).size === 4 && a >= 5 && e % 2 === 1) odd++; }
console.log("odd > 5000", odd);
// rows: 8 people in a front row of 3 and a back row of 5; Tendai must be in the front row
const rows = 3 * fact(7);
console.log("rows", rows, "total", fact(8));
console.log("OK");
