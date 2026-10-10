import { Mr, sfStr, sciStr, L, table } from "../lib.mjs";
const rows = [[1e-2, "1 cm"], [1e-6, "1 µm"], [1e-7, "100 nm"], [1e-8, "10 nm"], [1e-9, "1 nm"]].map(([l, s]) => [s, sciStr(6 / l), sciStr(6 / l / 600)]);
console.log(table(["cube edge", "SA:V / m⁻¹", "relative to 1 cm cube"], rows));
// split 1 cm3 cube into 10 nm cubes
const n = (1e-2 / 1e-8) ** 3; console.log("number", sciStr(n), "total area m2", sfStr(n * 6 * 1e-16, 3));
// silver sphere 20 nm diameter, density 10.5 g/cm3
const r = 12e-7; const V = 4 / 3 * Math.PI * r ** 3; const m = V * 10.5; console.log("V cm3", sciStr(V), "m g", sciStr(m), "atoms", sciStr(m / 107.9 * L));
console.log("C60", Mr("C60"), "mol in 1.00 mg", sciStr(1e-3 / 720), "molecules", sciStr(1e-3 / 720 * L));
console.log("SA:V 50 nm cube", sciStr(6/50e-9), "5 nm", sciStr(6/5e-9), "ratio", 10);
