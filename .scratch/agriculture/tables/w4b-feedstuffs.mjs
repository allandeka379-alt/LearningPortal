// Lesson numbers for nutrition/feedstuffs.
import { round, check } from "../lib.mjs";
const soya = round(0.66 / 0.44, 2), sun = round(0.36 / 0.30, 2);
check(soya === 1.5 && sun === 1.2, "cp cost");
console.log("cost per kg CP soya", soya, "sunflower", sun);
const vol = 12 * 4 * 2, mass = vol * 650, daily = 20 * 25;
console.log("pit m3", vol, "kg", mass, "t", mass / 1000, "daily kg", daily, "days", mass / daily, Math.floor(mass / daily));
