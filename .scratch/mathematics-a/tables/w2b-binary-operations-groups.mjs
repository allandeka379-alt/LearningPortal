// W2b lesson numbers: amaths.groups.binary-operations-groups
import { chk, same } from "../lib.mjs";
const star = (a, b) => a + b + a * b;
for (const [a, b, c] of [[1, 2, 3], [-0.5, 4, 2.5], [3, -2, 7]]) chk(star(star(a, b), c), star(a, star(b, c)));
for (const a of [2, 5, -3]) chk(star(a, -a / (1 + a)), 0);
const S = [1, 2, 3, 4], mul5 = (a, b) => (a * b) % 5;
console.log("mod5 table"); for (const a of S) console.log(S.map((b) => mul5(a, b)).join(" "));
const inv = S.map((a) => S.find((b) => mul5(a, b) === 1)); console.log("inverses", inv); same(inv, [1, 3, 2, 4]);
const mul6 = (a, b) => (a * b) % 6; console.log("mod6 rows", [0, 1, 2, 3, 4, 5].map((a) => [0, 1, 2, 3, 4, 5].map((b) => mul6(a, b)).join("")));
