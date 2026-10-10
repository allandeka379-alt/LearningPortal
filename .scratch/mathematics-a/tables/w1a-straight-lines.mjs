import { chk } from "../lib.mjs";
chk((-1 - 5) / (4 + 2), -1); chk(Math.hypot(6, 6), Math.sqrt(72));
// ex2 5x + 2y − 11 = 0 through (3, −2), perpendicular to 2x − 5y + 7 = 0
chk(5 * 3 + 2 * -2 - 11, 0); chk((2 / 5) * (-5 / 2), -1);
// ex3 3x − 2y − 2 = 0 through (4, 5); gradient 3/2 ⟂ −2/3
chk(3 * 4 - 2 * 5 - 2, 0); chk(Math.hypot(4 - 1, 5 - 7), Math.hypot(4 - 7, 5 - 3));
// ex4
chk(2 * 3 - 1, 5); chk(3 + 3 * 5, 18);
// triangle with y-axis: L1 meets y-axis at (0, −1), L2 at (0, 6); area = 1/2 × 7 × 3
console.log("area", 0.5 * 7 * 3);
console.log("dist", Math.abs(3 * 5 + 4 * 1 - 4) / 5);
