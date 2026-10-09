// Lesson numbers for soil/constituents.
import { pct, round } from "../lib.mjs";
// Worked example 1: moisture content (dry basis) and organic matter by burning.
const tin = 20, wetPlusTin = 70, dryPlusTin = 62, burntPlusTin = 59.6;
const wet = wetPlusTin - tin, dry = dryPlusTin - tin, water = wet - dry;
console.log({ wet, dry, water, mc: round(pct(water, dry), 1), om: round(dryPlusTin - burntPlusTin, 1), omPct: round(pct(dryPlusTin - burntPlusTin, dry), 1) });
// Worked example 2: available water from FC and PWP (% by mass) for a layer.
const fc = 32, pwp = 18; console.log({ avail: fc - pwp });
