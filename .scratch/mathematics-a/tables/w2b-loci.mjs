// W2b lesson numbers: amaths.complex.loci
import { cx, chk } from "../lib.mjs";
const { atan2, asin, hypot } = Math;
// |z - 2i| = |z + 4| → y = -2x - 3
for (const x of [-3, 0, 2]) { const y = -2 * x - 3; chk(hypot(x, y - 2), hypot(x + 4, y)); }
// |z - 4 - 3i| <= 2
const c = [-3, 4], r = 1, d = cx.mod(c);
console.log("|c|", d, "max", d + r, "min", d - r, "arg c", atan2(4, -3), "asin", asin(r / d), "max arg", atan2(4, -3) + asin(r / d), "min arg", atan2(4, -3) - asin(r / d));
console.log("nearest point", c.map((v) => (v * (d - r)) / d));
