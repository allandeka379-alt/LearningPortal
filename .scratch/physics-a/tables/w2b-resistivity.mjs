import { sfStr, dpStr, sciPlain, table, linFit } from "../lib.mjs";
const area = (d) => Math.PI * d * d / 4;
const A1 = area(0.32e-3); console.log("WE1 A", sciPlain(A1), "R", 1.10e-6 * 1.5 / A1);
// graph data constantan d=0.28 mm rho 4.9e-7: R/L = rho/A
const d = 0.28e-3; const A = area(d); const k = 4.9e-7 / A; console.log("R per m", k);
const L = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]; const noise = [0.04, -0.06, 0.05, -0.03, 0.06, -0.05, 0.02];
const R = L.map((l, i) => Math.round((k * l + 0.15 + noise[i]) * 100) / 100);
console.log(table(["$L\,/\,\text{m}$", "$R\,/\,\Omega$"], L.map((l, i) => [dpStr(l, 2), dpStr(R[i], 2)])));
const f = linFit(L, R); console.log("fit", f, "rho", f.m * A, sciPlain(f.m * A));
// WE2 using gradient read from line between (0.25, ?) and (0.75, ?)
const g = f.m; console.log("grad 3sf", sfStr(g, 3), "rho from 3sf", sciPlain(Number(sfStr(g,3)) * A), "A", sciPlain(A));
// WE3 stretched wire x2 length: R x4
