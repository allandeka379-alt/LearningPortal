// Lesson numbers for soil/erosion: runoff plots.
import { field, yieldPerHa, pct, pctChange, round } from "../lib.mjs";
const plot = field(20, 5);
const bare = yieldPerHa({ kg: 6, areaHa: plot.ha });
const grass = yieldPerHa({ kg: 0.9, areaHa: plot.ha });
console.log(plot, bare, grass, "reduction %", round(-pctChange(bare.kgPerHa, grass.kgPerHa), 1));
