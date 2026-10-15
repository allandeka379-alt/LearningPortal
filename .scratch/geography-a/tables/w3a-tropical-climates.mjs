import { mean, sum, range, chk, rnd, dpStr, sfStr } from "../lib.mjs";
import { tbl, MONTHS } from "./w3a-_q.mjs";
export const RT = [26.8, 27.0, 27.2, 27.1, 26.9, 26.4, 26.2, 26.6, 27.0, 27.2, 27.1, 26.9];
export const RP = [280, 270, 310, 320, 290, 200, 150, 120, 140, 190, 250, 290];
export const ST = [24.0, 23.8, 23.2, 21.5, 18.6, 16.4, 16.0, 18.2, 21.4, 23.8, 24.4, 24.2];
export const SP = [190, 165, 90, 30, 8, 2, 1, 2, 6, 38, 105, 170];
export const T = tbl(["Month", ...MONTHS], [["Temperature (°C)", ...RT.map((x) => x.toFixed(1))], ["Rainfall (mm)", ...RP]]);
export const T2 = tbl(["Month", ...MONTHS], [["Temperature (°C)", ...ST.map((x) => x.toFixed(1))], ["Rainfall (mm)", ...SP]]);
if (process.argv[1].endsWith("w3a-tropical-climates.mjs")) {
  console.log(T, "\n", T2);
  console.log("R total", sum(RP), "mean T", mean(RT), "range", range(RT));
  console.log("S total", sum(SP), "mean T", mean(ST), "range", range(ST));
  const wet = [10, 11, 0, 1, 2].map((i) => SP[i]); console.log("S wet Nov-Mar", sum(wet), sum(wet) / sum(SP) * 100);
  const dry = [4,5,6,7,8].map(i=>SP[i]); console.log("S May-Sep", sum(dry));
  console.log("R driest", Math.min(...RP));
}
