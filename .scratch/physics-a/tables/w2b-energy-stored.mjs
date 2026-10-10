import { sfStr, sciPlain, dpStr, table } from "../lib.mjs";
const W = 0.5 * 150e-6 * 330 ** 2; console.log("WE1 W", W, "P", W / 1e-3);
console.log("WE2 V", Math.sqrt(2 * 200 / 32e-6));
const b = 0.5 * 20e-6 * 81, a = 0.5 * 40e-6 * 4.5 ** 2; console.log("WE3", b, a);
const C = 2200e-6; const V = [0, 2, 4, 6, 8, 10, 12];
console.log(table(["$V\,/\,\text{V}$", "$Q\,/\,\text{mC}$", "$W = \tfrac{1}{2}QV\,/\,\text{mJ}$"], V.map((v) => [dpStr(v, 1), sfStr(C * v * 1000, 3), sfStr(0.5 * C * v * v * 1000, 3)])));
console.log("battery 12V Q", C * 12, "supplied", C * 144, "stored", 0.5 * C * 144);
