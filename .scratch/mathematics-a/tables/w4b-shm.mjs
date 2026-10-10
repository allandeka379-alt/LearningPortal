const { PI, sqrt, asin } = Math;
{ const w = PI / 2; console.log("Ex1 vmax", 0.5 * w, "v(0.3)", w * sqrt(0.25 - 0.09), "t", asin(0.6) / w, "amax", 0.5 * w * w); }
{ const w2 = 20 / 3, a2 = 1 + 36 / w2; console.log("Ex2 w2", w2, "w", sqrt(w2), "a", sqrt(a2), "T", 2 * PI / sqrt(w2), "vmax", sqrt(w2) * sqrt(a2)); }
{ console.log("Ex3 w", sqrt(40 / 0.4), "T", 2 * PI / 10, "vmax", 0.08 * 10, "amax", 0.08 * 100); }
{ const e = 0.5 * 9.8 * 1 / 49; console.log("Ex4 e", e, "w2", 49 / (0.5 * 1), "T", 2 * PI / sqrt(98), "pend", 2 * PI * sqrt(0.9 / 9.8)); }
