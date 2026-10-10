import { sfStr, dpStr, table } from "../lib.mjs";
const V = [1, 2, 4, 6, 8, 10, 12]; const I = [0.62, 0.95, 1.30, 1.58, 1.80, 1.98, 2.10];
console.log(table(["$V\,/\,\text{V}$", "$I\,/\,\text{A}$", "$R = V/I\,/\,\Omega$"], V.map((v, i) => [dpStr(v, 1), dpStr(I[i], 2), sfStr(v / I[i], 3)])));
const Vd = [-1.0, 0, 0.2, 0.4, 0.55, 0.60, 0.65, 0.70, 0.75]; const Id = [0, 0, 0, 0.01, 0.3, 1.2, 5.0, 18, 55];
console.log(table(["$V\,/\,\text{V}$", "$I\,/\,\text{mA}$"], Vd.map((v, i) => [dpStr(v, 2), String(Id[i])])));
console.log("diode R .70", 0.70 / 0.018, "R .60", 0.60 / 0.0012);
console.log("lamp R6", 6 / 1.58, "R12", 12 / 2.10, "1/grad between 10 and 12", (12 - 10) / (2.10 - 1.98));
