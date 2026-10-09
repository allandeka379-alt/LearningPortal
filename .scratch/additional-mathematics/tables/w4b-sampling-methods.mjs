// Checks for lessons/sampling/methods.md
import { chk, same } from "../lib.mjs";
// Ex1: systematic: 600 learners, sample 30 -> every 20th; start 7 -> 7, 27, 47, ...
chk(600 / 30, 20);
same(Array.from({ length: 5 }, (_, i) => 7 + 20 * i), [7, 27, 47, 67, 87]);
same(7 + 20 * 29, 587);
// Ex2: stratified: school 1200 learners: F1 360, F2 330, F3 270, F4 240; sample 80
const strata = [360, 330, 270, 240];
same(strata.reduce((a, b) => a + b), 1200);
same(strata.map((n) => (n / 1200) * 80), [24, 22, 18, 16]);
// Ex3: random numbers: population numbered 001-250, digits stream
const stream = "385 102 917 044 250 102 663 198 007";
const picks = [];
for (const s of stream.split(" ")) { const n = Number(s); if (n >= 1 && n <= 250 && !picks.includes(n)) picks.push(n); if (picks.length === 5) break; }
same(picks, [102, 44, 250, 198, 7]);
// Ex4: quota: 40 men 60 women interviews from 100 -> 40/60
console.log("sampling methods lesson checks OK");
