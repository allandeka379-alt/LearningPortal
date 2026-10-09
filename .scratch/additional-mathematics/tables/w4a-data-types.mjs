// Checks for lessons/statistics/data-types.md (tally example)
import { same, sum } from "../lib.mjs";
// ways 30 learners travel to school: walk, kombi, bus, bicycle, car
const raw = "WWKBWCWKWWBWKWWCWBWWKWBWWKWWCW".split("");
const count = (c) => raw.filter((x) => x === c).length;
const f = { W: count("W"), K: count("K"), B: count("B"), C: count("C") };
console.log(raw.length, f, sum(Object.values(f)));
same(sum(Object.values(f)), 30);
