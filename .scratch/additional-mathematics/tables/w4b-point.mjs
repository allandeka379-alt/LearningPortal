// Checks for lessons/estimation/point.md
import { chk, mean, s2, variance, sf } from "../lib.mjs";
// Ex1: raw data: masses (g) of 8 oranges
const d = [142, 155, 138, 160, 149, 151, 144, 153];
chk(d.reduce((a, b) => a + b), 1192); chk(mean(d), 149);
const sxx = d.reduce((a, x) => a + (x - 149) ** 2, 0);
console.log("Sxx", sxx, "s2", s2(d), sxx / 7, "var n", variance(d), "s", Math.sqrt(s2(d)));
chk(s2(d), sxx / 7, 1e-9);
// Ex2: summary: n = 40, Σx = 1520, Σx² = 59 800
const n = 40, Sx = 1520, Sx2 = 59800;
chk(Sx / n, 38); chk(Sx2 - Sx * Sx / n, 2040); console.log("s2", 2040 / 39, sf(2040 / 39, 3));
// Ex3: sample variance (divisor n) 12.6 from n = 15 -> s2 = 15/14 * 12.6 = 13.5
chk((15 / 14) * 12.6, 13.5, 1e-9);
// Ex4: standard error: s = 6.3? use s2 = 52.31 from Ex2: se = sqrt(52.31/40)
console.log("se", Math.sqrt(2040 / 39 / 40));
console.log("point lesson checks OK");
