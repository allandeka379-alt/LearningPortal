import { DATA, sfStr, rad, deg } from "../lib.mjs";
const g = DATA.g;
console.log("WE1 F", 1200 * 144 / 25, "a", 144 / 25);
const L = 0.8, th = 30, m = 0.2; const r = L * Math.sin(rad(th)); const w = Math.sqrt(g * Math.tan(rad(th)) / r); console.log("WE2 r", r, "w", w, "T", 2 * Math.PI / w, "Tension", m * g / Math.cos(rad(th)));
console.log("WE3 vmax", Math.sqrt(g * 20), "N", 1000 * g - 1000 * 100 / 20);
const mm = 0.2, R = 0.6; console.log("WE4 top", mm * 9 / R - mm * g, "bottom", mm * g + mm * 25 / R, "vmin", Math.sqrt(g * R));
console.log("bank", deg(Math.atan(400 / (80 * g))));
