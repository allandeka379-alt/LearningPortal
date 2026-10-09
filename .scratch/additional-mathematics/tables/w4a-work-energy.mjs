// Checks for lessons/mechanics/work-energy.md
import { chk, rad } from "../lib.mjs";
const g = 9.8;
console.log("ex1", 60 * 25 * Math.cos(rad(35)));
chk(0.5 * 1200 * 15 ** 2, 135000); chk(70 * g * 200, 137200, 1e-6);
console.log("ex3", Math.sqrt(2 * g * 20));
const loss = 0.5 * 800 * (400 - 144); chk(loss, 102400); chk(loss / 160, 640);
const pe = 50 * g * 18, wr = 25 * 300, ke0 = 0.5 * 50 * 16, ke1 = ke0 + pe - wr; chk(pe, 8820, 1e-9); chk(ke1, 1720, 1e-9);
console.log("ex5", Math.sqrt(2 * ke1 / 50));
