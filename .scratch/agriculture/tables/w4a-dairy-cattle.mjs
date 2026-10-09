// Lesson numbers for livestock/dairy-cattle.
import { nutrientKg, round } from "../lib.mjs";
const addDays = (iso, n) => { const d = new Date(`${iso}T00:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };
const lact = 18 * 305; console.log("lactation kg", lact, "fat kg at 4.5%", nutrientKg(lact, 4.5));
console.log("meal for 20 kg milk", (20 - 5) / 2.5);
console.log("dry off 60 days before 10 Dec 2026", addDays("2026-12-10", -60));
