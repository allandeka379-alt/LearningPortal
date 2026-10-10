// W3a lesson numbers for homeostasis/stomata.md
import { table, chk, sfStr, mean } from "../lib.mjs";
const r = 0.2; // mm field radius
const area = Math.PI * r * r;
const counts = [22, 25, 23, 24, 26];
const m = mean(counts);
console.log("area", sfStr(area, 3), "mean", m, "density", sfStr(m / area, 3));
chk(m, 24);
const time = ["04:00", "06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const ap = [0.5, 2.0, 6.5, 8.0, 7.5, 4.0, 5.5, 2.5, 0.5];
console.log(table(["Time of day", ...time], [["Mean stomatal aperture / µm", ...ap.map((x) => x.toFixed(1))]]));
