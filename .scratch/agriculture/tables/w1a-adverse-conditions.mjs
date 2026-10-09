import { waterVolume, field, fmtNum } from "../lib.mjs";
// Worked example 1: watering a nursery bed 8 m x 1.5 m with 20 mm
const bed = field(8, 1.5);
console.log(bed, waterVolume({ areaM2: bed.m2, depthMm: 20 }), waterVolume({ areaM2: bed.m2, depthMm: 20 }).litres / 20);
// Worked example 2: a tied-ridge basin 2.0 m x 0.9 m holding 60 mm
const basin = field(2, 0.9);
console.log(basin, waterVolume({ areaM2: basin.m2, depthMm: 60 }));
