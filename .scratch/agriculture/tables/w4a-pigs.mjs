// Lesson numbers for livestock/pigs.
import { dailyGain, fcr, dressingPct, round } from "../lib.mjs";
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
console.log("served 4 May 2026 + 114 =", addDays("2026-05-04", 114));
const cycle = 114 + 35 + 7; console.log("cycle", cycle, "litters/yr", 365 / cycle, round(365 / cycle, 2), "weaned/yr at 10", round(365 / cycle * 10, 1));
console.log("ADG", dailyGain({ startKg: 25, endKg: 90, days: 110 }), "FCR", fcr({ feedKg: 195, gainKg: 65 }), "dressing", dressingPct({ carcassKg: 68.4, liveKg: 90 }));
