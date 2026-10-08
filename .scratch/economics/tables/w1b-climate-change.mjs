// Numbers for lessons/supply/climate-change.md (W1b).
import { pctChange, table } from "../lib.mjs";
const ha = 5, normal = 4, drought = 1.5, sorghum = 2.5;
console.log("maize normal", ha * normal, "drought", ha * drought, "pct", pctChange(ha * normal, ha * drought), "sorghum", ha * sorghum, "pct vs normal maize", pctChange(ha * normal, ha * sorghum));
console.log(table(["Crop and season", "Yield (tonnes per hectare)", "Output from 5 hectares (tonnes)"], [["Maize, normal rains", normal, ha * normal], ["Maize, drought", drought, ha * drought], ["Sorghum, drought", sorghum, ha * sorghum]]));
