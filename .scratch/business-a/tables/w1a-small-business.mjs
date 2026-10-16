import { chk, r2 } from "../lib.mjs";
const sp = 15, small = 12, large = 10.2;
chk(large, small * 0.85);
console.log(sp - small, sp - large, ((sp - small) / sp) * 100, ((sp - large) / sp) * 100);
console.log(5000 * 0.14, 5000 * 0.08, 5000 * 0.14 - 5000 * 0.08);
