import { actualSize, chk } from "../lib.mjs";
console.log("alveolus", chk(actualSize(42, "mm", 200), 210));
// Fick: relative rate = (SA x diff) / thickness
const r = (sa, d, x) => (sa * d) / x;
console.log("relative rate (SA 0.6, diff 1, thickness 1.5)", r(0.6, 1, 1.5), "as %", r(0.6, 1, 1.5) * 100);
