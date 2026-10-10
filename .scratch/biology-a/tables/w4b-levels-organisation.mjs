import { table, simpson, sfStr, sum } from "../lib.mjs";
const sp = ["*Brachystegia spiciformis* (msasa)", "*Julbernardia globiflora*", "*Brachystegia boehmii*", "*Combretum molle*", "*Terminalia sericea*"];
const A = [21, 19, 23, 18, 19];
const B = [86, 3, 5, 2, 4];
console.log(sum(A), sum(B));
console.log(table(["Tree species", "Site A: number of trees", "Site B: number of trees"], sp.map((s, i) => [s, A[i], B[i]])));
console.log("D", sfStr(simpson(A).D, 3), sfStr(simpson(B).D, 3));
