// Lesson numbers for livestock/beef-cattle.
import { dailyGain, fcr, dressingPct, round } from "../lib.mjs";
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
console.log("bulls in 2026-01-01 -> calving from", addDays("2026-01-01", 283), "bulls out 2026-03-31 -> last calves", addDays("2026-03-31", 283));
console.log("ADG", dailyGain({ startKg: 300, endKg: 450, days: 100 }), "FCR", fcr({ feedKg: 1050, gainKg: 150 }), "dressing", dressingPct({ carcassKg: 252, liveKg: 450 }));
console.log("bulls for 120 cows at 1:30", 120 / 30);
