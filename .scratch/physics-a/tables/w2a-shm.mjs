import { sfStr, dpStr, DATA } from "../lib.mjs";
const m = 0.5, k = 20, x0 = 0.08; const w = Math.sqrt(k / m), T = 2 * Math.PI / w;
console.log("w", w, sfStr(w, 3), "T", sfStr(T, 3), "vmax", sfStr(w * x0, 3), "amax", sfStr(w * w * x0, 3));
console.log("v at 0.05", sfStr(w * Math.sqrt(x0 ** 2 - 0.05 ** 2), 3), "a at 0.05", sfStr(-w * w * 0.05, 3));
console.log("pend T", sfStr(2 * Math.PI * Math.sqrt(0.9 / DATA.g), 3));
// table: x = x0 sin wt, x0 = 8.0 cm, T = 0.993 s
const ts = [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1];
console.log(ts.map((f) => { const ph = 2 * Math.PI * f; const x = 8.0 * Math.sin(ph); const v = w * 8.0 * Math.cos(ph) / 100; const a = -w * w * x / 100; return `| ${f === 0 ? "0" : f === 1 ? "T" : f + "T"} | ${dpStr(Math.abs(x) < 1e-9 ? 0 : x, 1)} | ${dpStr(Math.abs(v) < 1e-9 ? 0 : v, 2)} | ${dpStr(Math.abs(a) < 1e-9 ? 0 : a, 2)} |`; }).join("\n"));
