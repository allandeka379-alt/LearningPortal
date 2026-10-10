import { DATA, sfStr, sciTex, table, dpStr, linFit, ln } from "../lib.mjs";
const { NA } = DATA;
const yr = 3.16e7, day = 86400;
// WE1 Co-60 1.0 µg
{ const th = 5.27 * yr, lam = 0.693 / th, N = (1.0e-9 / 0.060) * NA; console.log("Co lam", sciTex(lam), "N", sciTex(N), "A", sciTex(lam * N)); }
// WE2 I-131 8.0 d, A0 = 4.0e8 Bq after 20 d
{ const lam = 0.693 / (8.0 * day); const A = 4.0e8 * Math.exp(-lam * 20 * day); console.log("I lam", sciTex(lam), "A", sciTex(A), "frac", sfStr(Math.exp(-0.693*20/8), 3)); }
// WE3 C-14 5730 y, ratio 0.35
{ const lam = 0.693 / 5730; const t = Math.log(1 / 0.35) / lam; console.log("C14 lam per yr", sciTex(lam), "t", sfStr(t, 3)); }
// graph: t½=56 s, R0 = 40 /s corrected, bg 0.50
const th = 56, lam = 0.693 / th, bg = 0.5;
const ts = [0, 20, 40, 60, 80, 100, 120];
const noise = [0, 0.4, -0.3, 0.2, -0.2, 0.1, 0.1];
const meas = ts.map((t, i) => Number((40 * Math.exp(-lam * t) + bg + noise[i]).toFixed(1)));
const corr = meas.map((m) => m - bg);
console.log(table(["t / s", "measured / s^-1", "corrected / s^-1", "ln(R/s^-1)"], ts.map((t, i) => [t, meas[i].toFixed(1), corr[i].toFixed(1), dpStr(ln(corr[i]), 2)])));
const f = linFit(ts, corr.map(ln)); console.log("grad", f.m, "half", 0.693 / -f.m);
