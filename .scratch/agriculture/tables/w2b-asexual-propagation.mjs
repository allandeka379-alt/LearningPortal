// Lesson numbers for plants/asexual-propagation.
import { plantPopulation, round, check } from "../lib.mjs";
// Worked example 1: sweet potato vine cuttings, ridges 90 cm apart, 30 cm in the row, 0.25 ha.
const sp = plantPopulation({ rowCm: 90, inRowCm: 30, areaHa: 0.25 });
console.log("sp per ha", sp.perHa, "total", sp.total, "rounded", Math.round(sp.total));
// Worked example 2: seed potatoes, 75 x 30 cm, 0.1 ha, mean seed tuber 60 g.
const ip = plantPopulation({ rowCm: 75, inRowCm: 30, areaHa: 0.1 });
const kg = ip.total * 60 / 1000;
console.log("ip per ha", ip.perHa, "total", ip.total, "kg", kg, round(kg, 0));
check(Math.abs(ip.total - 4444.44) < 0.01, "ip");
