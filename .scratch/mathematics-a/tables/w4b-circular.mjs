import { rad } from "../lib.mjs";
const g = 9.8, { PI, cos, sin, tan, sqrt } = Math;
{ const w = 45 * 2 * PI / 60; console.log("Ex1 w", w, "a", 0.15 * w * w, "mu", 0.15 * w * w / g); }
{ const T = 0.3 * g / cos(rad(30)); const w2 = T * sin(rad(30)) / (0.3 * 0.4); console.log("Ex2 T", T, "w2", w2, "w", sqrt(w2), "g/(l cos)", g / (0.8 * cos(rad(30))), "period", 2 * PI / sqrt(w2)); }
{ console.log("Ex3 v", sqrt(80 * g * tan(rad(12)))); }
{ const m = 0.2, r = 0.5, v = 4; console.log("Ex4 top", m * v * v / r - m * g, "bottom", m * v * v / r + m * g, "min top speed", sqrt(g * r)); }
