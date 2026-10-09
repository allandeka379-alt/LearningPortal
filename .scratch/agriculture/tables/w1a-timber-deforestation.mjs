import { pct, pctChange, plantPopulation } from "../lib.mjs";
// Worked example 1: seasoning a plank: fresh 12.6 kg, after air drying 9.1 kg, oven-dry 8.4 kg
const dry = 8.4;
console.log("fresh MC", pct(12.6 - dry, dry), "seasoned MC", pct(9.1 - dry, dry));
// Worked example 2: ward woodland 1,500 ha -> 1,050 ha; replant 30 ha at 2.5 m x 2.5 m
console.log(pctChange(1500, 1050), 1500 - 1050);
const pop = plantPopulation({ rowCm: 250, inRowCm: 250, areaHa: 30 });
console.log(pop);
