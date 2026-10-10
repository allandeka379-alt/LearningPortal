// Lesson tables and worked examples for skills.tables-graphs (W1a). Run: node .scratch/physics-a/tables/w1a-tables-graphs.mjs
import { t, table, linFit, sfStr, dpStr, gradient, interceptThrough, chk } from "../lib.mjs";
// Example 1: mass-spring, T^2 against m; 20 oscillations timed twice.
const m = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6];
const t1 = [8.0, 11.2, 13.8, 15.8, 17.9, 19.4];
const t2 = [7.8, 11.4, 13.6, 16.0, 17.7, 19.6];
const rows = m.map((mi, i) => {
  const tm = (t1[i] + t2[i]) / 2;
  const T = tm / 20;
  return [dpStr(mi, 3), dpStr(t1[i], 1), dpStr(t2[i], 1), dpStr(tm, 2), sfStr(T, 3), sfStr(T * T, 3)];
});
console.log(table([t`$m\,/\,\text{kg}$`, t`$20T_1\,/\,\text{s}$`, t`$20T_2\,/\,\text{s}$`, t`mean $20T\,/\,\text{s}$`, t`$T\,/\,\text{s}$`, t`$T^2\,/\,\text{s}^2$`], rows));
const T2 = m.map((mi, i) => ((t1[i] + t2[i]) / 2 / 20) ** 2);
const f = linFit(m, T2);
console.log("fit", f, "line at 0.150", f.m * 0.15 + f.c, "at 0.550", f.m * 0.55 + f.c);
const g1 = chk(gradient([0.15, 0.236], [0.55, 0.871]), 1.5875);
console.log("grad read", g1, "k", (4 * Math.PI ** 2) / g1, "4pi2", 4 * Math.PI ** 2);
// Example 2: R against theta (false origin)
const th = [20, 30, 40, 50, 60, 70, 80];
const R = [12.95, 13.47, 13.9, 14.42, 14.86, 15.41, 15.83];
console.log(table([t`$\theta\,/\,^\circ\text{C}$`, t`$R\,/\,\Omega$`], th.map((x, i) => [String(x), dpStr(R[i], 2)])));
const g = linFit(th, R);
console.log("fit2", g, "line at 25", g.m * 25 + g.c, "at 75", g.m * 75 + g.c);
const g2 = gradient([25, 13.2], [75, 15.61]);
const c2 = interceptThrough(g2, [25, 13.2]);
console.log("grad2", g2, "c2", c2, "alpha", g2 / c2);
