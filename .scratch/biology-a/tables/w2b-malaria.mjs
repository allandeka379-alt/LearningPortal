// W2b lesson numbers: malaria (hypothetical data).
import { chk, dpStr, table, pctChange } from "../lib.mjs";
const before = 3260, after = 1890;
const d = -pctChange(before, after);
console.log("decrease", d, dpStr(d, 1));
// Seasonal: monthly cases at a lowveld clinic and rainfall
const months = ["Jul", "Sep", "Nov", "Jan", "Mar", "May"];
const rain = [0, 5, 70, 160, 90, 10];
const cases = [12, 9, 35, 140, 210, 60];
console.log(table(["Month", ...months], [["Rainfall / mm", ...rain.map(String)], ["Malaria cases", ...cases.map(String)]]));
