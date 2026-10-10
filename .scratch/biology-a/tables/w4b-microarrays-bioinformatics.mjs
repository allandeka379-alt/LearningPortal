import { table, sfStr, dpStr } from "../lib.mjs";
const genes = ["Gene 1", "Gene 2", "Gene 3", "Gene 4"];
const red = [4800, 600, 2100, 150];
const green = [1200, 2400, 2000, 160];
console.log(table(["Spot", "Red (tumour) intensity", "Green (normal) intensity", "Ratio red : green"], genes.map((g, i) => [g, red[i], green[i], dpStr(red[i] / green[i], 2)])));
// sequence identity
const a = "ATGGCTTACGATCCAGTA", b = "ATGGCATACGATCGAGTA";
let same = 0; for (let i = 0; i < a.length; i++) if (a[i] === b[i]) same++;
console.log(a.length, same, dpStr(same / a.length * 100, 1));
