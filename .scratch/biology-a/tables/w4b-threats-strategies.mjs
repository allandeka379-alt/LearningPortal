import { pctChange, dpStr, table } from "../lib.mjs";
// seed bank germination test
const sown = 50, germ = [46, 44, 41, 33];
const yrs = [0, 10, 20, 30];
console.log(table(["Years in storage", ...yrs.map(String)], [["Seeds germinating (out of 50)", ...germ.map(String)], ["Germination / %", ...germ.map((g) => dpStr(g / sown * 100, 0))]]));
console.log(dpStr(pctChange(germ[0], germ[3]), 1));
