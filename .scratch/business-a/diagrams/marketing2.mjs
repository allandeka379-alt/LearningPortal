// Demand and supply, price elasticity and revenue, sales forecasting (marketing/*).
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

// ---- 1. Tomato market: demand rises by 200 crates at every price ----
{
  const dem = (shift) => (p) => 700 + shift - 200 * p; // quantity demanded
  const sup = (p) => -100 + 200 * p; // quantity supplied
  const pOf = (qf) => (q) => qf(q);
  const ax = D.axes({ x: [0, 800], y: [0, 4], w: 600, h: 420, xTicks: 100, yTicks: 0.5, xLabel: "Crates per Saturday", yLabel: "Price per crate (US$)", pad: { l: 72, r: 40, t: 34, b: 56 }, yFormat: (v) => v.toFixed(2) });
  const Dp = (shift) => (q) => (700 + shift - q) / 200;
  const Sp = (q) => (q + 100) / 200;
  let b = ax.frame;
  b += ax.plot(Dp(0), { domain: [0, 700], stroke: C.blue });
  b += ax.plot(Dp(200), { domain: [0, 800], stroke: C.blue, dash: true });
  b += ax.plot(Sp, { domain: [0, 700], stroke: C.red });
  const e1 = { q: 300, p: 2 }, e2 = { q: 400, p: 2.5 };
  // check against the schedule
  if (dem(0)(e1.p) !== e1.q || sup(e1.p) !== e1.q || dem(200)(e2.p) !== e2.q || sup(e2.p) !== e2.q) throw new Error("equilibrium check failed");
  b += ax.guides(e1.q, e1.p) + ax.guides(e2.q, e2.p);
  b += ax.point(e1.q, e1.p, { r: 5, stroke: C.ink }) + ax.point(e2.q, e2.p, { r: 5, stroke: C.ink });
  b += ax.label(0.3 * 800 + 0, 3.55, "", {});
  b += ax.label(655, 0.45, "D", { size: 15, weight: 700, fill: C.blue });
  b += ax.label(735, 1.2, "D2", { size: 15, weight: 700, fill: C.blue });
  b += ax.label(690, 3.9, "S", { size: 15, weight: 700, fill: C.red, dx: 6 });
  b += ax.tag(290, 1.2, "E1: US$2.00, 300", { anchor: "end" });
  b += ax.tag(e2.q, e2.p, "E2: US$2.50, 400", { dx: 10, dy: -12 });
  const alt = "Tomato market: supply S and demand D cross at US$2.00 and 300 crates; a successful advertising campaign shifts demand to D2 (200 crates more at every price), and the new equilibrium is US$2.50 and 400 crates, so price rises by US$0.50 and quantity by 100 crates.";
  const cap = "Figure: the tomato market before (E1) and after (E2) demand increases by 200 crates at every price";
  await D.figure(FAM, "tomato-demand-shift", D.svg(600, 420, b), { alt, caption: cap });
  place(L("marketing/demand-supply"), "4. New equilibrium: ", D.md("tomato-demand-shift", alt, cap), { block: true });
}

// ---- 2. Elastic demand: a price rise cuts revenue ----
{
  const p0 = 2.0, q0 = 5000, p1 = 2.2, q1 = 4000;
  const gain = (p1 - p0) * q1, loss = (q0 - q1) * p0, r0 = p0 * q0, r1 = p1 * q1;
  if (Math.abs(r1 - r0 - (gain - loss)) > 1e-6 || Math.round(gain) !== 800 || loss !== 2000) throw new Error("revenue arithmetic");
  const ax = D.axes({ x: [0, 6000], y: [0, 2.8], w: 600, h: 420, xTicks: 1000, yTicks: 0.4, xLabel: "Bottles a week", yLabel: "Price per bottle (US$)", pad: { l: 72, r: 24, t: 34, b: 56 }, yFormat: (v) => v.toFixed(2) });
  let b = ax.frame;
  const rectD = (xa, xb, ya, yb, o) => D.rect(ax.X(xa), ax.Y(yb), ax.X(xb) - ax.X(xa), ax.Y(ya) - ax.Y(yb), o);
  b += rectD(0, q1, 0, p0, { fill: C.fillGrey, stroke: C.axis, width: 1.4 });
  b += rectD(q1, q0, 0, p0, { fill: "#fde3e0", stroke: C.red, width: 1.6 });
  b += rectD(0, q1, p0, p1, { fill: C.fillGreen, stroke: C.green, width: 1.6 });
  b += ax.line([[3600, p1 + 0.1], [q1, p1], [q0, p0], [5400, p0 - 0.1]], { stroke: C.blue });
  b += ax.point(q1, p1, { stroke: C.blue }) + ax.point(q0, p0, { stroke: C.blue });
  b += ax.label(5460, 1.9, "D", { size: 15, weight: 700, fill: C.blue });
  b += D.text(ax.X(q1 / 2), ax.Y(p0 / 2) - 6, "Kept: 2.00 x 4,000", { anchor: "middle", size: 13 });
  b += D.text(ax.X(q1 / 2), ax.Y(p0 / 2) + 12, "= US$8,000", { anchor: "middle", size: 13 });
  b += D.text(ax.X((q1 + q0) / 2), ax.Y(p0 / 2) - 22, "Lost", { anchor: "middle", size: 13, weight: 700, fill: C.red });
  b += D.text(ax.X((q1 + q0) / 2), ax.Y(p0 / 2) - 6, "1,000 x 2.00", { anchor: "middle", size: 12, fill: C.red });
  b += D.text(ax.X((q1 + q0) / 2), ax.Y(p0 / 2) + 10, "= US$2,000", { anchor: "middle", size: 12, fill: C.red });
  b += D.text(ax.X(100), ax.Y(p1) - 10, "Gained: 0.20 x 4,000 = US$800", { size: 13, weight: 700, fill: C.green });
  b += D.text(ax.X(q1 / 2), ax.Y(0.45), "Revenue falls from US$10,000", { anchor: "middle", size: 13, weight: 700 });
  b += D.text(ax.X(q1 / 2), ax.Y(0.45) + 18, "to US$8,800 (down US$1,200)", { anchor: "middle", size: 13, weight: 700 });
  const alt = "Price rise on elastic demand: the dairy raises the price of milk from US$2.00 to US$2.20 and weekly sales fall from 5,000 to 4,000 bottles; it gains US$800 on the higher price for the 4,000 bottles still sold but loses US$2,000 on the 1,000 bottles no longer sold, so revenue falls from US$10,000 to US$8,800 (PED -2.0).";
  const cap = "Figure: revenue gained and lost when the dairy raises its price (PED of -2.0)";
  await D.figure(FAM, "elastic-price-rise-revenue", D.svg(600, 420, b), { alt, caption: cap });
  place(L("marketing/elasticity"), "| Change in revenue | 8,800 − 10,000 |", D.md("elastic-price-rise-revenue", alt, cap), { block: true });
}

// ---- 3. Sales forecast: actual, centred moving average, trend and forecasts ----
{
  const sales = [40, 62, 84, 50, 46, 68, 88, 56, 52, 74, 96, 62];
  const mt = []; for (let i = 0; i + 3 < sales.length; i += 1) mt.push(sales[i] + sales[i + 1] + sales[i + 2] + sales[i + 3]);
  const cma = {}; for (let i = 0; i + 1 < mt.length; i += 1) cma[i + 3] = (mt[i] + mt[i + 1]) / 8; // quarter index (1-based) i+3
  const idx = Object.keys(cma).map(Number);
  const sv = {}; for (const k of idx) sv[k] = sales[k - 1] - cma[k];
  const avg = [1, 2, 3, 4].map((q) => { const ks = idx.filter((k) => ((k - 1) % 4) + 1 === q); return ks.reduce((s, k) => s + sv[k], 0) / ks.length; });
  const first = idx[0], last = idx.at(-1);
  const step = (cma[last] - cma[first]) / (last - first);
  const fc = [13, 14, 15, 16].map((k) => ({ k, trend: cma[last] + (k - last) * step, f: cma[last] + (k - last) * step + avg[(k - 1) % 4] }));
  const expected = [58.25, 80.25, 101.25, 68.25];
  fc.forEach((f, i) => { if (Math.abs(f.f - expected[i]) > 1e-9) throw new Error("forecast mismatch " + f.f); });
  if (step !== 1.5) throw new Error("step " + step);
  const ax = D.axes({ x: [0.5, 16.5], y: [20, 110], w: 620, h: 420, xTicks: D.range(1, 16, 1), yTicks: 10, xLabel: "", yLabel: "Sales (thousand bottles)", pad: { l: 60, r: 18, t: 34, b: 70 }, xFormat: (v) => "Q" + (((v - 1) % 4) + 1) });
  let b = ax.frame;
  b += D.rect(ax.X(12.5), ax.Y(110), ax.X(16.5) - ax.X(12.5), ax.Y(20) - ax.Y(110), { fill: C.fillAmber, stroke: "none" });
  b = ax.frame + b.replace(ax.frame, "");
  const pts = sales.map((v, i) => [i + 1, v]);
  b += ax.line(pts, { stroke: C.muted, width: 2 });
  pts.forEach(([x, y]) => { b += ax.point(x, y, { r: 3.5, stroke: C.muted }); });
  b += ax.line(idx.map((k) => [k, cma[k]]), { stroke: C.blue, width: 3 });
  b += ax.line([[last, cma[last]], ...fc.map((f) => [f.k, f.trend])], { stroke: C.blue, width: 2.4, dash: true });
  b += ax.line([[12, sales[11]], ...fc.map((f) => [f.k, f.f])], { stroke: C.amber, width: 2, dash: true });
  fc.forEach((f) => { b += ax.point(f.k, f.f, { r: 5, stroke: C.amber }); b += D.text(ax.X(f.k), ax.Y(f.f) + (f.k === 13 || f.k === 16 ? 22 : -11), String(f.f), { anchor: "middle", size: 12, weight: 700, fill: C.amber }); });
  b += ax.tag(3, 112, "", {}).slice(0, 0);
  for (let y = 0; y < 4; y += 1) b += D.text(ax.X(y * 4 + 2.5), ax.Y(20) + 42, `Year ${y + 1}${y === 3 ? " (forecast)" : ""}`, { anchor: "middle", size: 13, weight: 700, fill: y === 3 ? C.amber : C.ink });
  // legend
  const lx = ax.X(0.9), ly = ax.Y(108);
  b += D.line(lx, ly, lx + 26, ly, { stroke: C.muted, width: 2 }) + D.text(lx + 32, ly + 4, "Actual sales", { size: 12 });
  b += D.line(lx, ly + 18, lx + 26, ly + 18, { stroke: C.blue, width: 3 }) + D.text(lx + 32, ly + 22, "Centred moving average (trend)", { size: 12 });
  b += D.line(lx, ly + 36, lx + 26, ly + 36, { stroke: C.blue, width: 2.4, dash: true }) + D.text(lx + 32, ly + 40, "Trend extended at +1.5 a quarter", { size: 12 });
  b += D.line(lx, ly + 54, lx + 26, ly + 54, { stroke: C.amber, width: 2, dash: true }) + D.text(lx + 32, ly + 58, "Forecast = trend + seasonal variation", { size: 12 });
  const alt = "Sales forecast chart for the cold-drinks supplier: quarterly sales swing between 40 and 96 thousand bottles around a centred moving average that rises from 59.75 to 70.25 (+1.5 a quarter); extending the trend and adding the seasonal variations gives year 4 forecasts of 58.25, 80.25, 101.25 and 68.25 thousand bottles.";
  const cap = "Figure: actual sales, the centred moving average and the year 4 forecasts for the cold-drinks supplier";
  await D.figure(FAM, "sales-forecast-trend", D.svg(620, 420, b), { alt, caption: cap });
  place(L("marketing/sales-forecasting"), "6. Forecasts for Y4 Q2 to Q4", D.md("sales-forecast-trend", alt, cap), { block: true });
}
