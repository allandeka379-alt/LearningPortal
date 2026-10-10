import { linFit, worstLines, lg, ln, dpStr, sfStr, table, chk } from "../lib.mjs";
// WE1: drain time t = k d^n through a hole of diameter d (expect n = -2)
const d = [2.0, 3.0, 4.0, 5.0, 6.0, 8.0]; // mm
const tt = [181, 79.6, 46.3, 28.6, 20.4, 11.3]; // s
const X = d.map((x) => lg(x)), Y = tt.map((y) => lg(y));
console.log(table(["$d\,/\,\text{mm}$", "$t\,/\,\text{s}$", "$\lg(d/\text{mm})$", "$\lg(t/\text{s})$"], d.map((x, i) => [x.toFixed(1), String(tt[i]), dpStr(X[i], 3), dpStr(Y[i], 3)])));
const f = linFit(X, Y); console.log("WE1 fit", f, "k=", 10 ** f.c);
// WE2: burette draining h = h0 e^{-kt}
const ts = [0, 20, 40, 60, 80, 100]; // s
const h = [40.0, 32.6, 26.9, 21.8, 18.0, 14.6]; // cm
const L = h.map((y) => ln(y));
console.log(table(["$t\,/\,\text{s}$", "$h\,/\,\text{cm}$", "$\ln(h/\text{cm})$"], ts.map((x, i) => [String(x), h[i].toFixed(1), dpStr(L[i], 3)])));
const f2 = linFit(ts, L); console.log("WE2 fit", f2, "h0", Math.exp(f2.c));
// WE3 worst lines for WE2 with dh = 0.5 cm
const pts = ts.map((x, i) => { const up = ln(h[i] + 0.5), dn = ln(h[i] - 0.5); return { x, y: L[i], dy: (up - dn) / 2 }; });
console.log(pts.map((p) => [p.x, dpStr(p.y, 3), dpStr(p.dy, 3)]));
const w = worstLines(pts); console.log("worst", w, "unc in grad", Math.abs(f2.m - w.steep.m), Math.abs(f2.m - w.shallow.m));
