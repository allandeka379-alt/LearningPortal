// Lesson numbers for livestock/rabbits.
import { dressingPct, round } from "../lib.mjs";
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
console.log("mated 2 Mar 2026: nest box day 27", addDays("2026-03-02", 27), "kindle day 31", addDays("2026-03-02", 31));
console.log("weaned per doe-year", 7 * 5, "for 6 does", 7 * 5 * 6);
console.log("dressing", dressingPct({ carcassKg: 1.32, liveKg: 2.4 }));
