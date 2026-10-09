import { grossMargin, money, fmtNum, yieldPerHa } from "../lib.mjs";
// Worked example 1: maize alone vs maize-bean intercrop on 1 ha (assumed prices)
const mono = grossMargin({ output: [["Maize", 4000, 0.3]], variable: [] });
const inter = grossMargin({ output: [["Maize", 3200, 0.3], ["Sugar beans", 500, 1.0]], variable: [] });
console.log("mono", mono.grossOutput, money(mono.grossOutput), "inter", inter.grossOutput, money(inter.grossOutput), inter.outputRows);
console.log("diff", inter.grossOutput - mono.grossOutput);
// Worked example 2: intensive vs extensive output per ha
const intensive = yieldPerHa({ kg: 36000, areaHa: 4 });
const extensive = yieldPerHa({ kg: 24000, areaHa: 20 });
console.log(intensive, extensive, intensive.kgPerHa / extensive.kgPerHa);
