// W2b lesson numbers: vaccination coverage (hypothetical ward).
import { chk, dpStr, table } from "../lib.mjs";
const children = 1360, dose1 = 1258, dose2 = 1142;
console.log("cov1", dose1 / children * 100, "cov2", dose2 / children * 100, "dropout", (dose1 - dose2) / dose1 * 100);
const yrs = ["Year 1", "Year 2", "Year 3", "Year 4"];
const cov = [92, 88, 79, 74];
const cases = [3, 5, 21, 64];
console.log(table(["Year", ...yrs], [["Measles vaccination coverage / %", ...cov.map(String)], ["Measles cases", ...cases.map(String)]]));
