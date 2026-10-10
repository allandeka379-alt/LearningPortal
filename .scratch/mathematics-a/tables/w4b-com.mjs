import { deg } from "../lib.mjs";
const { atan } = Math;
console.log("Ex1", (2 * 1 + 3 * 3 + 5 * 6) / 10, (2 * 4 + 3 * -1 + 5 * 2) / 10);
const xb = (96 * 6 - 16 * 10) / 80, yb = (96 * 4 - 16 * 6) / 80;
console.log("Ex2", xb, yb, "angle OA with vertical", deg(atan(yb / xb)));
console.log("Ex3 slide", deg(atan(0.5)), "topple", deg(atan(0.4 / 1.2)));
