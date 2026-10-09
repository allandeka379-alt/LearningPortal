// Lesson numbers for livestock/layers-indigenous.
import { layingPct, round } from "../lib.mjs";
const hens = 400, days = 7, eggs = 2520;
console.log("hen-day %", layingPct({ eggs, hens, days }), "trays", eggs / 30, "dozens", eggs / 12);
const feedWeek = 46 * 7; console.log("feed/week", feedWeek, "kg per dozen", round(feedWeek / (eggs / 12), 2), feedWeek / (eggs / 12));
