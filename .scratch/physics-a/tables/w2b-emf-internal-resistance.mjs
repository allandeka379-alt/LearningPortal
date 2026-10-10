import { sfStr, dpStr, table, linFit } from "../lib.mjs";
const E = 1.5, r = 0.8, R = 4.0; const I = E / (R + r); console.log("WE1 I", I, "V", I * R, "lost", I * r);
console.log("WE2 r", (2.76 - 2.40) / (0.75 - 0.30), "E", 2.76 + 0.30 * 0.8);
console.log("WE3 V", 12.6 - 150 * 0.020);
console.log("max P", 6 * 6 * 2 / (4 * 4));
// graph table: E=4.50, r=1.20 with scatter
const Is = [0.20, 0.40, 0.60, 0.80, 1.00, 1.20]; const nz = [0.02, -0.01, 0.01, -0.02, 0.00, 0.01];
const Vs = Is.map((i, k) => Math.round((4.5 - 1.2 * i + nz[k]) * 100) / 100);
console.log(table(["$I\,/\,\text{A}$", "$V\,/\,\text{V}$"], Is.map((i, k) => [dpStr(i, 2), dpStr(Vs[k], 2)])));
console.log(linFit(Is, Vs));
