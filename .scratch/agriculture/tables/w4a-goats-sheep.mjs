// Lesson numbers for livestock/goats-sheep.
import { pct, dailyGain, round } from "../lib.mjs";
const mated = 40, kidded = 36, kids = 58, weaned = 52;
console.log("kidding % (kids born / does mated)", pct(kids, mated), "does kidding %", pct(kidded, mated), "weaned %", pct(weaned, mated), "kid losses %", round(pct(kids - weaned, kids), 1));
console.log("Boer kid ADG", dailyGain({ startKg: 3.5, endKg: 24.5, days: 120 }));
console.log("bucks for 40 does at 1:25", Math.ceil(40 / 25));
