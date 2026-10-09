// Lesson numbers for plants/photosynthesis.
import { round, pctChange, check, table } from "../lib.mjs";
// Worked example: pondweed bubbles counted over 2 minutes at lamp distances.
const rows = [[10, 64], [20, 40], [30, 22], [40, 12]];
console.log(table(["Distance of lamp (cm)", "Bubbles in 2 min", "Bubbles per min"], rows.map(([d, n]) => [d, n, n / 2])));
console.log("change 10->40", round(pctChange(64, 12), 1));
// Second: greenhouse CO2 limiting example (descriptive) — no numbers.
