import { lorenz } from "../lib.mjs";
for (const s of [[6,11,16,24,43],[4,9,14,25,48],[9,13,18,24,36]]) { const l=lorenz(s); console.log(s.join(","), l.gini, l.areaUnderLorenz); }
console.log(3000*0.04/0.2, 1800*0.09/0.2);
