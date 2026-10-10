import { sfStr, parallelR } from "../lib.mjs";
const Rp = parallelR(6, 12); console.log("WE1 Rp", Rp, "I", 12 / (Rp + 2), "Vp", 12 / (Rp + 2) * Rp, "I6", 8 / 6, "I12", 8 / 12);
// WE2: 10 ohm in series with (20 || 30) then all parallel with 40? simple: 5 + (10||(10+5))
console.log("WE2", parallelR(16, 16) + 4, parallelR(30, 20));
console.log("current divider 2.4 A into 15 and 5:", 2.4 * 5 / 20, 2.4 * 15 / 20);
