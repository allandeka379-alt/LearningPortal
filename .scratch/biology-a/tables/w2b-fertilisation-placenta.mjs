// W2b lesson numbers: fertilisation and placenta (illustrative).
import { chk, table } from "../lib.mjs";
const po2 = [2, 4, 6, 8, 10];
const adult = [20, 55, 80, 90, 95];
const fetal = [40, 75, 90, 95, 97];
console.log(table(["Partial pressure of oxygen / kPa", ...po2.map(String)], [["Adult haemoglobin saturation / %", ...adult.map(String)], ["Fetal haemoglobin saturation / %", ...fetal.map(String)]]));
// Worked: oxygen released: at 4 kPa (placenta) adult 55%, fetal 75%
console.log("diff at 4 kPa", fetal[1] - adult[1]);
// hCG doubling: 50 units on day 10 after ovulation doubling every 2 days -> day 18
const d0 = 50; const days = 8; console.log("hCG", d0 * 2 ** (days / 2));
