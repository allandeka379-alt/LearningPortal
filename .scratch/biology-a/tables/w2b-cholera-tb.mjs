// W2b lesson numbers: cholera-tb (hypothetical district data).
import { chk, sfStr, dpStr, table, pctChange } from "../lib.mjs";
// Worked: case fatality rate in a hypothetical outbreak
const cases = 1250, deaths = 45;
const cfr = (deaths / cases) * 100;
console.log("CFR", cfr, dpStr(cfr, 1));
// After ORS corners opened: 830 cases, 8 deaths
const c2 = 830, d2 = 8;
const cfr2 = (d2 / c2) * 100;
console.log("CFR2", cfr2, dpStr(cfr2, 2), sfStr(cfr2, 2));
// TB treatment completion example
const started = [240, 260], completed = [192, 247];
const pc = started.map((s, i) => (completed[i] / s) * 100);
console.log(table(["Clinic", "Patients starting treatment", "Patients completing 6 months", "Completion / %"], [["Self-administered", 240, 192, dpStr(pc[0], 1)], ["DOTS", 260, 247, dpStr(pc[1], 1)]]));
