// Tables for lessons/supply/shifts.md (W1b).
import { schedule } from "../lib.mjs";
const p = [200, 250, 300, 350], s1 = [800, 1000, 1200, 1400];
const s2 = s1.map((q) => q - 300);
console.log(schedule({ prices: p, qs: s1, priceHeader: "Price of maize (US\\$ per tonne)", qsHeader: "S1: normal season (tonnes)", extra: [{ header: "S2: drought season (tonnes)", values: s2 }] }).md);
schedule({ prices: p, qs: s2 });
console.log(s2, "at 300:", s1[2], s2[2], "pct fall", ((s1[2] - s2[2]) / s1[2]) * 100);
