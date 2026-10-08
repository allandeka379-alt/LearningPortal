// Figures for lessons/population/hiv-aids.md (W4a).
import { table, dependencyRatio, fmt, check } from "../lib.mjs";
// WE1: dependency ratio in a fictional district before and after a fall in the working-age population.
const young = 52000, work0 = 80000, old = 6000, work1 = 72000;
const d0 = dependencyRatio(young + old, work0), d1 = dependencyRatio(young + old, work1);
console.log(table(["", "Before", "After"], [["Children (under 15)", young, young], ["Working age", work0, work1], ["Elderly", old, old]]));
console.log({ d0, d1 });
check("d0", d0, 72.5);
// WE2: workplace programme.
const cost = 30000, daysSaved = 1500, perDay = 24, training = 9000;
const benefit = daysSaved * perDay + training;
console.log({ benefit, net: benefit - cost });
check("net", benefit - cost, 15000);
