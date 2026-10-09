// Lesson numbers for pasture/grazing-management.
import { stockingRate, carryingCapacity } from "../lib.mjs";
const lu = 40 * 1 + 30 * 0.5;
console.log("LU", lu, stockingRate({ lu, areaHa: 220 }));
console.log("CC 600 ha at 5 ha/LU", carryingCapacity({ areaHa: 600, haPerLu: 5 }), "overstock if 150 LU by", 150 - 120);
console.log("paddocks 6 x 5 days: rest", 5 * (6 - 1), "cycle", 5 * 6);
