// Tables for lessons/demand/shifts.md (W1b).
import { schedule } from "../lib.mjs";
const p = [3, 4, 5, 6], d1 = [500, 400, 300, 200];
const d2 = d1.map((q) => q + 150);
console.log(schedule({ prices: p, qd: d1, priceHeader: "Price of chicken (US\\$ per kg)", qdHeader: "D1: before (kg per week)", extra: [{ header: "D2: after the pay rise (kg per week)", values: d2 }] }).md);
console.log("at 5:", d1[2], "->", d2[2], "; old q at 4 =", d1[1], "D2 at 5 =", d2[2]);
