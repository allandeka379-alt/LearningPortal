// Lesson numbers for soil/temperature.
import { mean, round, table } from "../lib.mjs";
const times = ["06:00", "10:00", "14:00", "18:00"];
const bare = [12, 24, 41, 27];
const mulch = [15, 21, 29, 24];
console.log(table(["Time", ...times], [["Bare soil (°C)", ...bare], ["Mulched soil (°C)", ...mulch]]));
const r = (a) => Math.max(...a) - Math.min(...a);
console.log("range bare", r(bare), "range mulch", r(mulch), "mean bare", round(mean(bare), 1), "mean mulch", round(mean(mulch), 1));
