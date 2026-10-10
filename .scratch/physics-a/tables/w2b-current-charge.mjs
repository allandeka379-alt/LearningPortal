import { DATA, sfStr, sciTex, sciPlain } from "../lib.mjs";
const e = DATA.e;
const Q = 1.5 * 2 * 3600; console.log("WE1 Q", Q, "N", sciPlain(Q / e));
const A = Math.PI * (0.5e-3) ** 2; const n = 8.5e28; const v = 3.0 / (n * A * e);
console.log("WE2 A", sciPlain(A, 4), "nAe", n * A * e, "v", sciPlain(v));
// WE3: same wire, section of diameter 0.50 mm in series with 1.0 mm: ratio of drift velocities = (1.0/0.5)^2
console.log("WE3 ratio", (1.0 / 0.5) ** 2, "v thin", sciPlain(4 * v));
// time for electron to travel 1.0 m
console.log("time 1 m", 1 / v, sfStr(1 / v / 60, 2), "min");
// semiconductor: n=1e16? same current density comparisons; ratio n Cu / n Si
console.log("ratio", 8.5e28 / 1e16);
