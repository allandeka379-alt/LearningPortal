import { table, chk, r2 } from "../lib.mjs";
// time rate with overtime
const rate = 4.5, hours = 46, base = 40, ot = 1.5;
const time = rate * base + rate * ot * (hours - base);
// piece rate
const piece = 0.8 * 260;
// commission
const comm = 120 + 0.04 * 3500;
// profit sharing
const ps = 0.10 * 18000 / 24;
console.log({ time, piece, comm, ps });
// Example 2: unit labour cost: time rate vs piece rate
// Worker A time rate 180/week makes 240 units -> 0.75; Worker B piece rate 0.80 per unit makes 260 units -> 208; unit cost 0.80
console.log(180 / 240, 208 / 260);
console.log(table(["Method", "Working", "Weekly pay (US$)"], [["Time rate with overtime", "40 × 4.50 + 6 × (4.50 × 1.5)", time], ["Piece rate", "260 × 0.80", piece], ["Commission", "120 + 4% × 3,500", comm]]));
