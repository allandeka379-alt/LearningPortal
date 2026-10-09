// Lesson numbers for livestock/birth-young-stock.
import { dailyGain, pct, round, check } from "../lib.mjs";
const calfKg = 36, colPct = 10;
const colL = calfKg * colPct / 100; // assume 1 kg colostrum is about 1 L
check(colL === 3.6, "col");
console.log("colostrum", colL, "per feed", colL / 2);
const adg = dailyGain({ startKg: 36, endKg: 186, days: 210 });
console.log("ADG", adg, round(adg, 2), "gain", 186 - 36);
const weaned = pct(46, 50); console.log("weaning %", weaned);
