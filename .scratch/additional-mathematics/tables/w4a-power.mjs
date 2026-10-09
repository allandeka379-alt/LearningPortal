// Checks for lessons/mechanics/power.md
import { chk } from "../lib.mjs";
const g = 9.8;
const W1 = 600 * g * 12; chk(W1, 70560, 1e-6); chk(W1 / 120, 588, 1e-9);
chk(70 * g * 12, 8232, 1e-9); console.log("stairs", 8232 / 15, 8232 / 60);
chk(1800 * 25, 45000); chk(30000 / 1200, 25);
console.log("ex4", 30000 / 15, (2000 - 1200) / 900);
console.log("ex5", 5000 * g / 25, 60000 / (2000 + 5000 * g / 25));
