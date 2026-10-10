// W3a lesson numbers for homeostasis/kidney.md
import { table, chk, sfStr, dpStr } from "../lib.mjs";
const gfr = 125, urine = 1.0;
const reab = (gfr - urine) / gfr * 100;
console.log("reabsorbed %", reab, "per day filtrate dm3", gfr * 60 * 24 / 1000);
chk(reab, 99.2);
const rows = [["Protein", "8.00", "0.00", "0.00"], ["Glucose", "0.10", "0.10", "0.00"], ["Urea", "0.03", "0.03", "2.00"], ["Sodium ions", "0.32", "0.32", "0.35"]];
console.log(table(["Substance", "Blood plasma / g per 100 cm³", "Filtrate in Bowman's capsule / g per 100 cm³", "Urine / g per 100 cm³"], rows));
console.log("urea factor", sfStr(2.0 / 0.03, 3));
