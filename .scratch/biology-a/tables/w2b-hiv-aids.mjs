// W2b lesson numbers: HIV (hypothetical patient data).
import { chk, dpStr, table, pctChange } from "../lib.mjs";
const months = [0, 3, 6, 12, 24];
const cd4 = [180, 260, 330, 420, 560];
const vl = [85000, 900, 200, 0, 0];
console.log(table(["Months after starting ART", ...months.map(String)], [["CD4 count / cells per mm³", ...cd4.map(String)], ["Viral load / copies per cm³", "85 000", "900", "200", "undetectable", "undetectable"]]));
const inc = pctChange(cd4[0], cd4[4]);
console.log("CD4 % increase 0->24", inc, dpStr(inc, 1));
// Worked: CD4 fall without treatment
const start = 950, end = 190, years = 8;
console.log("fall per year", (start - end) / years, "pct fall", -pctChange(start, end));
