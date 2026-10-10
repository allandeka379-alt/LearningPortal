import { linearFit, sfStr, table, Mr, chk } from "../lib.mjs";
// Lesson example: calibration for copper(II) as the ammonia complex
const pts = [[0.020, 0.11], [0.040, 0.22], [0.060, 0.34], [0.080, 0.45], [0.100, 0.56]];
const { m, c } = linearFit(pts);
console.log(table(["[Cu²⁺] / mol dm⁻³", "absorbance"], pts.map(([x, y]) => [x.toFixed(3), y.toFixed(2)])));
console.log("m", m, "c", c);
const A = 0.39; const conc = (A - c) / m; console.log("conc", conc, sfStr(conc, 3));
// mass of Cu in 250 cm3 of that solution
const mass = conc * 0.25 * 63.5; console.log("mass Cu g", mass, sfStr(mass, 3));
// question data (different): Ni or Fe(SCN)
const q = [[1.0e-4, 0.08], [2.0e-4, 0.17], [3.0e-4, 0.25], [4.0e-4, 0.33], [5.0e-4, 0.42]];
const f = linearFit(q); console.log("q fit", f, "conc for 0.29", (0.29 - f.c) / f.m);
