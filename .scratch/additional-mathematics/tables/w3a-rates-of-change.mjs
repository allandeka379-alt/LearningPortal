// Worked-example checks for lessons/calculus/rates-of-change.md
import { chk, checkDeriv, sfStr } from "../lib.mjs";
checkDeriv((t) => 40 * t + 3 * t * t, (t) => 40 + 6 * t, [1, 5]); chk(40 + 30, 70);
// ripple: dA/dt = 2 pi r * 3 at r = 10
chk(2 * Math.PI * 10 * 3, 60 * Math.PI); console.log("60pi", sfStr(60 * Math.PI));
// balloon
const drdt = 100 / (4 * Math.PI * 25); chk(drdt, 1 / Math.PI); console.log("1/pi", sfStr(drdt));
// cone r = h/2: V = pi h^3/12
checkDeriv((h) => (Math.PI * h ** 3) / 12, (h) => (Math.PI * h * h) / 4, [1, 4]);
for (const h of [1, 3]) chk((1 / 3) * Math.PI * (h / 2) ** 2 * h, (Math.PI * h ** 3) / 12);
const dhdt = 2 / ((Math.PI * 16) / 4); chk(dhdt, 1 / (2 * Math.PI)); console.log("1/(2pi)", sfStr(dhdt));
// y = ln(2x+1), dx/dt = 0.5 at x = 2
chk((2 / 5) * 0.5, 0.2);
console.log("ok");
