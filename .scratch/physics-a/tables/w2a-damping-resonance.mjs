import { sfStr, dpStr } from "../lib.mjs";
// amplitude decay table: A_n = 10.0 * 0.80^n
console.log([0, 1, 2, 3, 4, 5].map((n) => `| ${n} | ${dpStr(10.0 * 0.8 ** n, 1)} | ${dpStr(100 * 0.64 ** n, 0)} |`).join("\n"));
console.log("energy lost per cycle", 1 - 0.8 ** 2);
// suspension
const m = 300, k = 2.0e4; const f0 = Math.sqrt(k / m) / (2 * Math.PI); console.log("f0", f0, sfStr(f0, 3), "speed at 8.0 m spacing", sfStr(f0 * 8.0, 3), "km/h", f0 * 8 * 3.6);
// resonance curve A(f) normalised to static, f0 = 2.0 Hz
const w0 = 2 * Math.PI * 2.0; const fs = [0.5, 1.0, 1.5, 1.8, 2.0, 2.2, 2.5, 3.0, 4.0];
for (const g of [1.0, 6.0]) console.log(g, fs.map((f) => { const w = 2 * Math.PI * f; return (w0 * w0 / Math.sqrt((w0 * w0 - w * w) ** 2 + (g * w) ** 2)).toFixed(2); }).join(" "));
