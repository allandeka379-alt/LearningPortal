// economics-a: cost and revenue lessons. Run: node .scratch/economics-a/diagrams/costs.mjs
import { D, C, put, putAfterBlock, lab, dotted, dash } from "./common.mjs";

// ---- Short-run cost curves (costs/short-run-costs.md): bakery with TFC 60
{
  const tvc = [0, 40, 70, 90, 112, 141, 182, 238, 320];
  const q = [1, 2, 3, 4, 5, 6, 7, 8];
  const afc = q.map((n) => [n, 60 / n]);
  const avc = q.map((n) => [n, tvc[n] / n]);
  const atc = q.map((n) => [n, (60 + tvc[n]) / n]);
  const mc = q.map((n) => [n, tvc[n] - tvc[n - 1]]);
  const ax = D.axes({ x: [0, 9], y: [0, 100], xTicks: 1, yTicks: 10, xLabel: "Output (hundreds of loaves)", yLabel: "Cost (US$)", w: 600, h: 450 });
  const body = ax.frame + dotted(ax, afc, { stroke: C.muted, dash: true, width: 2 }) + dotted(ax, atc, { stroke: C.blue }) + dotted(ax, avc, { stroke: C.green }) + dotted(ax, mc, { stroke: C.amber }) +
    lab(ax, 8, 82, "MC", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 8, 47.5, "ATC", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, 8, 40, "AVC", { dx: 8, dy: 18, fill: C.green }) + lab(ax, 8, 7.5, "AFC", { dx: 8, dy: 4, fill: C.muted }) +
    ax.point(4, 28, { stroke: C.green, r: 6 }) + ax.tag(5.3, 21, "AVC minimum: 4 units, US$28", { fill: C.green, size: 13 }) +
    ax.point(5, 40.2, { stroke: C.blue, r: 6 }) + ax.tag(4.4, 96, "ATC minimum: 5 units, US$40.20", { fill: C.blue, size: 13 }) + ax.arrow(5, 90, 5, 43, { stroke: C.blue, width: 1.4 });
  const alt = "Short-run cost curves for the bakery with fixed cost US$60: AFC falls throughout, AVC is lowest at 4 units (US$28), ATC is lowest at 5 units (US$40.20), and MC (US$22 at 4 units, US$29 at 5, US$41 at 6) cuts AVC and then ATC from below at their minimum points.";
  await put("short-run-cost-curves", D.svg(600, 450, body), alt, "Figure: AFC, AVC, ATC and MC for the bakery; MC cuts AVC and ATC from below at their lowest points (MC is plotted at each unit)", "costs/short-run-costs", "In the table AVC is lowest at 4 units");
}

// ---- LRAC from the scale table (costs/long-run-costs-scale.md)
{
  const pts = [[100, 5000], [260, 10000], [450, 15000], [620, 20000], [700, 25000], [720, 30000]].map(([o, tc]) => [o, tc / o]);
  const ax = D.axes({ x: [0, 800], y: [0, 60], xTicks: 100, yTicks: 10, xLabel: "Output (units per month)", yLabel: "LRAC (US$ per unit)", w: 600, h: 430 });
  const body = ax.frame + dotted(ax, pts) + ax.guides(620, 32.26) + ax.point(620, 32.26, { stroke: C.amber, r: 6 }) +
    ax.tag(330, 21, "MES = 620 units", { fill: C.amber, size: 14 }) +
    ax.tag(100, 50, "Scale 1: US$50.00", { dx: 12, dy: -6, size: 13 }) + ax.tag(450, 33.33, "Scale 3: US$33.33", { dx: -120, dy: 36, size: 13 }) +
    ax.tag(720, 41.67, "Scale 6: US$41.67", { dx: -150, dy: -14, size: 13 }) + ax.tag(110, 9, "Economies of scale (LRAC falls)", { fill: C.green }) + ax.tag(628, 9, "Diseconomies", { fill: C.red });
  const alt = "Long-run average cost for the bakery's six scales: LRAC falls from US$50.00 at 100 units to a minimum of US$32.26 at 620 units (the minimum efficient scale), then rises to US$35.71 at 700 and US$41.67 at 720 units because of diseconomies of scale.";
  await putAfterBlock("lrac-bakery-scales", D.svg(600, 430, body), alt, "Figure: the bakery's long-run average cost falls (economies of scale) to 620 units and rises after (diseconomies)", "costs/long-run-costs-scale", "Returns to scale and LRAC");
}

// ---- Revenue curves (costs/revenue-curves.md): P = 20 - 2Q
{
  const ar = [[0, 20], [1, 18], [2, 16], [3, 14], [4, 12], [5, 10], [6, 8], [7, 6]];
  const mr = [[1, 18], [2, 14], [3, 10], [4, 6], [5, 2], [6, -2], [7, -6]];
  const ax = D.axes({ x: [0, 10], y: [-8, 22], xTicks: 1, yTicks: 2, xLabel: "Quantity (units per day)", yLabel: "US$", w: 600, h: 450 });
  const body = ax.frame + dotted(ax, ar) + dotted(ax, mr, { stroke: C.amber }) +
    lab(ax, 7, 6, "AR = D", { dx: 8, dy: -4, fill: C.blue }) + lab(ax, 7, -6, "MR", { dx: 8, dy: 4, fill: C.amber }) +
    ax.label(4.7, 20, "MR = 0 between 5 and 6 units:", { size: 13, fill: C.amber }) + ax.label(4.7, 18.2, "TR is highest (US$50 at 5 units)", { size: 13, fill: C.amber }) +
    ax.point(4, 12, { stroke: C.blue, r: 5 }) + ax.tag(4, 12, "4 units: AR 12, MR 6", { dx: 10, dy: -8, size: 13 });
  const alt = "Revenue curves for a firm facing the demand schedule P = 20 - 2Q: average revenue is the downward-sloping demand curve, marginal revenue starts at the same price intercept and falls twice as steeply (US$6 against AR US$12 at 4 units), reaching zero between 5 and 6 units where total revenue peaks.";
  await put("revenue-curves-ar-mr", D.svg(600, 450, body), alt, "Figure: AR (the demand curve) and MR; MR lies below AR and cuts the axis where total revenue is greatest", "costs/revenue-curves", "Three points follow.");
}

// ---- Profit maximisation (costs/revenue-curves.md): MC, MR, AR, ATC at 4 units
{
  const tc = [10, 18, 24, 28, 33, 40, 50, 64, 82];
  const q = [1, 2, 3, 4, 5, 6, 7, 8];
  const mc = q.map((n) => [n, tc[n] - tc[n - 1]]);
  const atc = q.map((n) => [n, tc[n] / n]);
  const ar = q.map((n) => [n, 20 - 2 * n]);
  const mr = q.map((n) => [n, 20 - 4 * n + 2]);
  const ax = D.axes({ x: [0, 9], y: [0, 20], xTicks: 1, yTicks: 2, xLabel: "Quantity (units per day)", yLabel: "US$", w: 600, h: 440 });
  const rect = D.rect(ax.X(0), ax.Y(12), ax.X(4) - ax.X(0), ax.Y(8.25) - ax.Y(12), { fill: C.fillGreen, stroke: C.green, width: 1.5 });
  const body = rect + ax.frame + dotted(ax, ar.filter((p) => p[1] > 0)) + dotted(ax, mr.filter((p) => p[1] > 0), { stroke: C.muted }) + dotted(ax, mc, { stroke: C.amber }) + dotted(ax, atc, { stroke: C.green }) +
    lab(ax, 7, 6, "AR", { dx: 8, dy: -4, fill: C.blue }) + lab(ax, 5, 2, "MR", { dx: 10, dy: 4, fill: C.muted }) + lab(ax, 8, 18, "MC", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 8, 10.25, "ATC", { dx: 8, dy: 4, fill: C.green }) +
    ax.point(4, 12, { stroke: C.blue, r: 5 }) + ax.tag(4, 12, "Price US$12", { dx: 12, dy: -10, size: 13 }) +
    ax.label(3.4, 19.2, "Output = 4 units:", { size: 13, weight: 700 }) + ax.label(3.4, 18.2, "MR 6 above MC 5 (4th unit)", { size: 13 }) + ax.label(3.4, 17.2, "MR 2 below MC 7 (5th unit)", { size: 13 }) +
    ax.label(0.1, 11.2, "Profit = US$15", { size: 13, fill: C.green, weight: 700 }) + ax.label(0.1, 10.3, "(12 - 8.25) x 4", { size: 13, fill: C.green });
  const alt = "Profit maximisation for the firm in the revenue-curves lesson: the fourth unit has MR US$6 above MC US$5 and the fifth has MC US$7 above MR US$2, so output is 4 units at price US$12; average cost there is US$8.25, giving a profit rectangle of 3.75 x 4 = US$15.";
  await put("profit-maximisation-mc-mr", D.svg(600, 440, body), alt, "Figure: the firm produces where MC meets MR from below (4 units); the green rectangle is the profit of US$15", "costs/revenue-curves", "In a discrete table MC and MR are rarely exactly equal");
}
console.log("done");
