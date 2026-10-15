// chemistry-a acids: pH curves. Run: node .scratch/chemistry-a/diagrams/acids.mjs
import * as D from "../../tools/diagram-kit.mjs";
const F = "chemistry-a";
const L = (p) => `content/subjects/${F}/lessons/${p}.md`;
const { C } = D;
const Kw = 1e-14, Ka = 1.74e-5, Kb = 1.8e-5, c = 0.1, V0 = 25;
function solve(g) { let lo = -2, hi = 15; for (let i = 0; i < 200; i += 1) { const mid = (lo + hi) / 2; (g(10 ** -mid) > 0 ? (lo = mid) : (hi = mid)); } return (lo + hi) / 2; }
// g(h) > 0 means too acidic charge excess -> raise pH
const strong = (v) => solve((h) => { const t = V0 + v; return h + (c * v) / t - Kw / h - (c * V0) / t; });
const weakAcid = (v) => solve((h) => { const t = V0 + v; return h + (c * v) / t - Kw / h - ((c * V0) / t) * (Ka / (Ka + h)); });
const weakBase = (v) => solve((h) => { const t = V0 + v, Kah = Kw / Kb; return h + ((c * v) / t) * (h / (h + Kah)) - Kw / h - (c * V0) / t; });
// checks against the lesson table
for (const [f, v, want] of [[strong, 24.9, 3.7], [strong, 25.1, 10.3], [weakAcid, 12.5, 4.76], [weakAcid, 25, 8.73], [weakAcid, 25.1, 10.3], [weakBase, 25, 5.28], [weakBase, 40, 9.03], [weakAcid, 0, 2.88]])
  if (Math.abs(f(v) - want) > 0.03) throw new Error(`curve check failed ${f.name} ${v}: ${f(v)} vs ${want}`);
const vols = []; for (let v = 0; v <= 40.001; v += v < 23 ? 0.5 : v < 27 ? 0.05 : 0.5) vols.push(Math.round(v * 100) / 100);
const curve = (f) => vols.map((v) => [v, f(v)]);

const mk = (opts) => D.axes({ x: [0, 40], y: [0, 14], xTicks: 5, yTicks: 2, xLabel: "Volume of base added / cm³", yLabel: "pH", w: 600, h: 420, pad: { l: 52, r: 24, t: 34, b: 58 }, ...opts });
{
  const ax = mk();
  const sw = (y, col, dash) => D.line(ax.X(26.2), ax.Y(y) - 4, ax.X(27.9), ax.Y(y) - 4, { stroke: col, width: 3, dash });
  const body = ax.frame + D.line(ax.X(25), ax.Y(0), ax.X(25), ax.Y(14), { stroke: C.muted, width: 1.4, dash: true }) +
    ax.line(curve(weakBase), { stroke: C.green, width: 2.8 }) + ax.line(curve(weakAcid), { stroke: C.amber, width: 2.8 }) + ax.line(curve(strong), { stroke: C.blue, width: 2.8, dash: "9 5" }) +
    ax.point(25, 7, { stroke: C.blue, r: 4.5 }) + ax.point(25, weakAcid(25), { stroke: C.amber, r: 4.5 }) + ax.point(25, weakBase(25), { stroke: C.green, r: 4.5 }) +
    ax.tag(26, 13.5, "equivalence at 25.0 cm³", { size: 13, anchor: "start", dx: 4 }) +
    D.text(ax.X(26.2), ax.Y(6.9), "pH at equivalence:", { size: 13, weight: 700 }) +
    sw(6, C.blue, true) + D.text(ax.X(28.3), ax.Y(6), "HCl + NaOH: 7.00", { size: 13, fill: C.blue }) +
    sw(4.8, C.amber) + D.text(ax.X(28.3), ax.Y(4.8), "CH₃COOH + NaOH: 8.73", { size: 13, fill: C.amber }) +
    sw(3.6, C.green) + D.text(ax.X(28.3), ax.Y(3.6), "HCl + NH₃: 5.28", { size: 13, fill: C.green });
  const alt = "pH against volume of base for 25.0 cm³ of 0.100 mol per dm³ acid and 0.100 mol per dm³ base: hydrochloric acid with sodium hydroxide starts at pH 1 and has equivalence at pH 7; ethanoic acid with sodium hydroxide starts near pH 3 and has equivalence at pH 8.73; hydrochloric acid with ammonia has equivalence at pH 5.28. All three have equivalence at 25.0 cm³.";
  const cap = "Figure: three titration curves; the equivalence point is at 25.0 cm³ for each but at different pH values";
  await D.figure(F, "titration-curves-three", D.svg(600, 420, body), { alt, caption: cap });
  D.insertAfter(L("acids/titration-curves-indicators"), "**Weak acid–weak base.**", D.md("titration-curves-three", alt, cap));
}
{
  const ax = mk();
  const pka = -Math.log10(Ka);
  const band = (lo, hi, fill) => D.rect(ax.X(0), ax.Y(hi), ax.X(40) - ax.X(0), ax.Y(lo) - ax.Y(hi), { fill, stroke: "none" });
  const body = ax.frame + band(8.3, 10.0, C.fillAmber) + band(2.9, 4.6, C.fillGreen) +
    ax.line(curve(weakAcid), { stroke: C.blue, width: 2.8 }) +
    ax.guides(12.5, pka) + ax.point(12.5, pka, { stroke: C.red, fill: C.red, r: 5 }) +
    ax.tag(13.5, 3.2, "half-equivalence: 12.5 cm³, pH = pKa = 4.76", { size: 13, anchor: "start", fill: C.red }) +
    ax.tag(1, 9.5, "phenolphthalein 8.3 to 10.0: on the steep part", { size: 13, anchor: "start", fill: C.amber, dy: -4 }) +
    ax.tag(1, 12.3, "steep section about pH 7 to 11", { size: 13, anchor: "start", fill: C.blue, dx: 100 }) +
    ax.tag(39.5, 2.2, "methyl orange 2.9 to 4.6: buffer region", { size: 13, anchor: "end", fill: C.green });
  const alt = "Titration curve of 25.0 cm³ of 0.100 mol per dm³ ethanoic acid with sodium hydroxide: the half-equivalence point at 12.5 cm³ has pH 4.76, equal to the pKa; the phenolphthalein range 8.3 to 10.0 lies on the steep section near 25.0 cm³, while the methyl orange range 2.9 to 4.6 lies in the buffer region, so only phenolphthalein gives a sharp end-point.";
  const cap = "Figure: weak acid with strong base: pH = pKa at half-equivalence; the shaded bands are two indicator ranges";
  await D.figure(F, "titration-weak-acid-indicators", D.svg(600, 420, body), { alt, caption: cap });
  D.insertAfter(L("acids/titration-curves-indicators"), "## Choosing an indicator", D.md("titration-weak-acid-indicators", alt, cap));
}
