// Statistics charts: histogram, cumulative frequency, scatter, pie chart.
import { D, fig, put, putBefore, arc, rad } from "./lib.mjs";
import { monotone } from "./mono.mjs";
const C = D.C;
const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 15, ...o });

/** Smooth (Catmull-Rom) path through pixel points. */
function smooth(pts, o = {}) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i += 1) {
    const p0 = pts[i - 1] ?? pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0]},${p2[1]}`;
  }
  return D.path_(d, { stroke: C.blue, width: 2.8, ...o });
}

// ---- Histogram, ages of 100 patients (unequal widths)
{
  const bars = [[0, 10, 16], [10, 20, 12], [20, 40, 28], [40, 60, 24], [60, 80, 20]];
  const ax = D.axes({ x: [0, 90], y: [0, 2], xTicks: 10, yTicks: 0.2, xLabel: "Age (years)", yLabel: "Frequency density", w: 560, h: 400, pad: { l: 70 } });
  let b = ax.frame;
  for (const [lo, hi, f] of bars) {
    const fd = f / (hi - lo);
    b += D.rect(ax.X(lo), ax.Y(fd), ax.X(hi) - ax.X(lo), ax.Y(0) - ax.Y(fd), { fill: C.fillBlue, stroke: C.blue, width: 2.2 });
    b += T((ax.X(lo) + ax.X(hi)) / 2, ax.Y(fd) + 26, `${f}`, { size: 16, weight: 700, fill: C.blue });
  }
  b += T(430, 60, "numbers in the bars are the frequencies", { size: 13, fill: C.muted });
  const alt = "Histogram of the ages of 100 patients with bars of unequal width: heights are frequency densities 1.6 (0 to 10 years), 1.2 (10 to 20), 1.4 (20 to 40), 1.2 (40 to 60) and 1.0 (60 to 80); the 20 to 40 bar holds the most patients (28) but is not the tallest.";
  await fig("histogram-patient-ages", b, 560, 400, alt, "Figure: the area of each bar, not its height, is the frequency");
  put("statistics/histograms", "Notice that the class $20 < a \\leq 40$ has the largest frequency", "histogram-patient-ages", alt, "Figure: the area of each bar, not its height, is the frequency");
}
// ---- Cumulative frequency curve: waiting times of 80 patients
{
  const pts = [[30, 0], [40, 4], [50, 16], [60, 32], [70, 48], [80, 68], [90, 80]];
  const ax = D.axes({ x: [30, 95], y: [0, 88], xTicks: 10, yTicks: 10, xLabel: "Waiting time (min)", yLabel: "Cumulative frequency", w: 560, h: 440, pad: { l: 72 } });
  const cf = monotone(pts);
  const curve = [];
  for (let i = 0; i <= 240; i += 1) { const x = 30 + (60 * i) / 240; curve.push([ax.X(x), ax.Y(cf.f(x))]); }
  let b = ax.frame + D.polyline(curve, { stroke: C.blue, width: 2.8 });
  for (const [x, y] of pts) b += ax.point(x, y, { stroke: C.blue, r: 4 });
  const q1 = cf.inv(20), med = cf.inv(40), q3 = cf.inv(60), r1 = (v) => (Math.round(v * 10) / 10).toFixed(1);
  console.log("readings", q1, med, q3);
  const reads = [[20, q1, `Q₁ = ${r1(q1)}`, "end", 6], [40, med, `median = ${r1(med)}`, "end", 13], [60, q3, `Q₃ = ${r1(q3)}`, "start", 6]];
  for (const [cfv, t, lab, anc, ty] of reads) {
    b += ax.line([[30, cfv], [t, cfv], [t, 0]], { stroke: C.amber, width: 2, dash: true });
    b += ax.tag(31, cfv + 3.2, lab, { anchor: "start", fill: C.amber, size: 14 });
  }
  b += ax.tag(94, 28, `IQR = ${r1(q3)} − ${r1(q1)} = ${r1(Math.round(q3 * 10) / 10 - Math.round(q1 * 10) / 10)}`, { anchor: "end", size: 14 });
  const alt = "Cumulative frequency curve for the waiting times of 80 patients through (30, 0), (40, 4), (50, 16), (60, 32), (70, 48), (80, 68) and (90, 80); dashed reading lines from 20, 40 and 60 on the vertical axis meet the curve at the lower quartile 52.7, the median 65.2 and the upper quartile 75.8 minutes.";
  await fig("cumulative-frequency-waiting-times", b, 560, 440, alt, "Figure: read across from n/4, n/2 and 3n/4, then down to the time axis");
  put("statistics/cumulative-frequency", "A smooth curve drawn by hand gives readings close", "cumulative-frequency-waiting-times", alt, "Figure: read across from n/4, n/2 and 3n/4, then down to the time axis");
}
// ---- Scatter diagram with line of best fit
{
  const xs = [2, 5, 1, 8, 4, 6, 3, 7], ys = [41, 58, 35, 72, 50, 63, 47, 66];
  const ax = D.axes({ x: [0, 10], y: [20, 90], xTicks: 1, yTicks: 10, xLabel: "Hours of revision", yLabel: "Test mark", w: 560, h: 420, pad: { l: 64 } });
  const line = (x) => 54 + 5.25 * (x - 4.5);
  let b = ax.frame + ax.line([[0.6, line(0.6)], [9, line(9)]], { stroke: C.amber, width: 2.4 });
  xs.forEach((x, i) => { b += ax.point(x, ys[i], { stroke: C.blue, r: 5 }); });
  b += ax.point(4.5, 54, { stroke: C.red, r: 7, fill: "#fff" }) + ax.tag(4.5, 54, "mean point (4.5, 54)", { dx: 12, dy: 28, fill: C.red });
  b += ax.tag(9.8, 31, "best fit: about 5 marks per hour", { anchor: "end", fill: C.amber });
  const alt = "Scatter diagram of test mark against hours of revision for eight learners, from (1, 35) to (8, 72): the points rise steadily, showing strong positive correlation; the line of best fit passes through the mean point (4.5, 54) with a gradient of about 5.25 marks per hour.";
  await fig("scatter-revision-marks", b, 560, 420, alt, "Figure: strong positive correlation, with the line of best fit through the mean point");
  put("statistics/scatter-diagrams", "Other examples: the age of a car", "scatter-revision-marks", alt, "Figure: strong positive correlation, with the line of best fit through the mean point");
}
// ---- Pie chart: income crops of 60 farmers
{
  const data = [["Maize", 27, C.teal], ["Tobacco", 15, C.amber], ["Cotton", 10, C.green], ["Groundnuts", 8, C.purple]];
  const O = [170, 175], R = 125, total = 60;
  let a0 = 90, b = "";
  const fills = ["#a5d6e6", "#f6c58d", "#a8dcbb", "#cdbde6"];
  data.forEach(([name, n], i) => {
    const sweep = (n / total) * 360, a1 = a0 - sweep;
    const p0 = [O[0] + R * Math.cos(rad(a0)), O[1] - R * Math.sin(rad(a0))], p1 = [O[0] + R * Math.cos(rad(a1)), O[1] - R * Math.sin(rad(a1))];
    b += D.path_(`M${O[0]},${O[1]} L${p0[0].toFixed(2)},${p0[1].toFixed(2)} A${R},${R} 0 ${sweep > 180 ? 1 : 0} 1 ${p1[0].toFixed(2)},${p1[1].toFixed(2)} Z`, { fill: fills[i], stroke: "#fff", width: 3 });
    const mid = a0 - sweep / 2, lp = [O[0] + R * 0.62 * Math.cos(rad(mid)), O[1] - R * 0.62 * Math.sin(rad(mid))];
    b += T(lp[0], lp[1] + 5, `${sweep}°`, { weight: 700, size: 16 });
    a0 = a1;
  });
  data.forEach(([name, n], i) => {
    const y = 80 + i * 34;
    b += D.rect(340, y - 14, 20, 20, { fill: fills[i], stroke: C.axis, width: 1.2 }) + D.text(370, y + 2, `${name}: ${n} farmers`, { size: 15, anchor: "start" });
  });
  b += D.text(340, 235, "Each farmer = 360° ÷ 60 = 6°", { size: 14, anchor: "start", fill: C.muted });
  const alt = "Pie chart of the main income crop of 60 farmers: maize 27 farmers (162°), tobacco 15 (90°), cotton 10 (60°) and groundnuts 8 (48°); each farmer is 6° and the angles add up to 360°.";
  await fig("pie-chart-farmers-crops", b, 560, 330, alt, "Figure: sector angle = frequency ÷ total × 360°");
  putBefore("statistics/charts-and-diagrams", ":::worked-solution[Example 2: reading a pie chart", "pie-chart-farmers-crops", alt, "Figure: sector angle = frequency ÷ total × 360°");
}
console.log("stats done");
