import { titre, meanTitre, molesFromSolution, sfStr, Mr, table } from "../lib.mjs";
const rows = [[0.00, 21.90], [21.90, 43.15], [0.50, 21.70], [21.70, 42.95]];
const ts = rows.map(([a, b]) => titre(a, b));
const m = meanTitre(ts);
console.log(ts, m);
const nOH = molesFromSolution(m.mean, 0.1);
const cDil = nOH / 0.025; const cOrig = cDil * 10; const gdm = cOrig * Mr("CH3COOH");
console.log(nOH, cDil, cOrig, sfStr(cOrig,3), gdm, sfStr(gdm,3), "g/100cm3", sfStr(gdm/10,3));
console.log(table(["", "1 (rough)", "2", "3", "4"], [["final reading / cm³", ...rows.map(r=>r[1].toFixed(2))],["initial reading / cm³", ...rows.map(r=>r[0].toFixed(2))],["titre / cm³", ...ts.map(x=>x.toFixed(2))]]));
