// Tables for lessons/structures/equilibrium.md (W3a).
import { table, check, fmt } from "../lib.mjs";
// WE1: a firm in perfect competition (cost schedule; prices US$24 short run, US$20 long run).
const q = [0, 1, 2, 3, 4, 5, 6], tc = [30, 50, 64, 75, 86, 100, 126];
const mc = tc.map((c, i) => (i ? c - tc[i - 1] : null)), atc = tc.map((c, i) => (i ? c / i : null));
console.log(table(["Output (units)", "TC (US\\$)", "MC (US\\$)", "ATC (US\\$)"], q.map((x, i) => [x, tc[i], mc[i] ?? "–", atc[i] === null ? "–" : fmt(atc[i], 2)])));
const bestAt = (p) => { const pr = q.map((x, i) => p * x - tc[i]); const i = pr.indexOf(Math.max(...pr)); return [i, pr[i]]; };
console.log("P=24", bestAt(24), "P=20", bestAt(20));
check("sr", bestAt(24)[1], 20); check("lr", bestAt(20)[1], 0);
// WE2: a monopoly.
const p = [50, 46, 42, 38, 34, 30, 26], tc2 = [40, 60, 74, 86, 100, 118, 142];
const tr = q.map((x, i) => x * p[i]);
const mr = tr.map((t, i) => (i ? t - tr[i - 1] : "–")), mc2 = tc2.map((c, i) => (i ? c - tc2[i - 1] : "–"));
const prof = tr.map((t, i) => t - tc2[i]);
console.log(table(["Output (units)", "Price = AR (US\\$)", "TR (US\\$)", "TC (US\\$)", "MR (US\\$)", "MC (US\\$)", "Profit (US\\$)"], q.map((x, i) => [x, p[i], tr[i], tc2[i], mr[i], mc2[i], prof[i]])));
const b = prof.indexOf(Math.max(...prof));
check("mb", b, 4);
console.log("ATC", tc2.map((c, i) => (i ? c / i : null)));
