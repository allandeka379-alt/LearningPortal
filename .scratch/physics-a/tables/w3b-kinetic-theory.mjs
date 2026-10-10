import { DATA } from "../lib.mjs";
const m = 0.028 / DATA.NA; console.log("m", m, "crms", Math.sqrt(3 * DATA.k * 300 / m), "KE", 1.5 * DATA.k * 300);
const v = [300, 400, 500, 600, 700]; const ms = v.reduce((s, x) => s + x * x, 0) / 5; console.log("mean sq", ms, "rms", Math.sqrt(ms));
console.log("from density", Math.sqrt(3 * 1.01e5 / 1.25));
