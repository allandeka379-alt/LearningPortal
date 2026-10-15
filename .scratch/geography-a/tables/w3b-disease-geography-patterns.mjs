import { per1000, rnd, chk } from "../lib.mjs";
// worked examples
const deaths = 1240, pop = 160000;
console.log("death rate", per1000(deaths, pop));
console.log("IMR", per1000(930, 24000));
console.log("prevalence %", (4800 / 60000) * 100, "incidence per 1000", per1000(900, 60000));
console.log("CFR", (45 / 1500) * 100);
// three-country table
const C = [["A", 1.9, 54, 51, 0.1, 62], ["B", 4.5, 20, 83, 1.2, 28], ["C", 7.8, 4, 3200, 3.4, 7]];
console.log(C);
