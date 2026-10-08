import { table, money, fmt, check } from "../lib.mjs";
// Worked example 2: farmer, 10 ha; maize 6 t/ha, soya 2.5 t/ha; switch 4 ha to soya.
const maize = 6, soya = 2.5, ha = 4;
console.log("Farm: soya gained", ha * soya, "t; maize forgone", ha * maize, "t; per tonne soya", fmt(maize / soya, 1), "t maize");
console.log(table(["Crop", "Yield per hectare (tonnes)", "Output from 4 hectares (tonnes)"], [["Maize", maize, ha * maize], ["Soya beans", soya, ha * soya]]));
// Worked example 3: government 1,200,000: clinic or classroom blocks at 400,000.
const budget = 1200000, block = 400000;
console.log("blocks", budget / block, money(budget), money(block));
// Worked example 4: Nyasha vendor 12/day, 5-day course fee 25.
const wage = 12, days = 5, fee = 25;
console.log("forgone earnings", money(wage * days), "total sacrifice incl fee", money(wage * days + fee));
