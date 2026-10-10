import { table, pctChange, dpStr, sfStr } from "../lib.mjs";
const yr = [2000, 2004, 2008, 2012, 2016, 2020];
const rh = [64, 71, 58, 39, 47, 60];
const poached = [2, 3, 14, 22, 9, 4];
console.log(table(["Year", ...yr.map(String)], [["Rhinos counted", ...rh.map(String)], ["Carcasses of poached rhinos found that year", ...poached.map(String)]]));
console.log(dpStr(pctChange(rh[0], rh[3]), 1), dpStr(pctChange(rh[3], rh[5]), 1));
// elephant density
const n = 3600, area = 4500;
console.log("density", sfStr(n / area, 2));
