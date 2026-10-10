import { table, dpStr } from "../lib.mjs";
console.log("bitrate", 8000 * 8, "levels", 2 ** 8, "min rate", 2 * 3400);
const step = 0.5; const vs = [2.1, 4.8, 6.3, 5.0, 2.6];
console.log(table(["t / ms", "V / V", "level", "code", "DAC / V"], vs.map((v, i) => { const L = Math.round(v / step); return [i * 0.125, dpStr(v, 1), L, L.toString(2).padStart(4, "0"), dpStr(L * step, 1)]; })));
console.log("music", 44100 * 16 * 2, "per min", 44100 * 16 * 2 * 60 / 8 / 1e6);
