// geography-a hydro lessons. Run: node .scratch/geography-a/diagrams/hydro.mjs
import { D, C, make, lab, T } from "./_h.mjs";

// ---------- 1. Drainage basin water balance (840 / 640 / 150 / +50, as in the worked example)
{
  const P = 840, E = 640, Q = 150, dS = P - Q - E; // 50
  let b = "";
  const S = [[20, 130], [130, 170], [250, 220], [350, 262], [410, 290]];
  b += D.polyline([...S, [430, 312], [480, 312], [500, 290], [540, 272], [540, 400], [20, 400]], { fill: C.fillGrey, stroke: "none", close: true });
  b += D.polyline([[20, 280], [410, 300], [540, 300], [540, 400], [20, 400]], { fill: C.fillBlue, stroke: "none", close: true });
  b += D.polyline([[20, 280], [410, 300]], { stroke: C.blue, width: 1.6, dash: true });
  b += D.polyline([...S, ...[...S].reverse().map(([x, y]) => [x, y + 24])], { fill: "#e9d5b8", stroke: "none", close: true });
  b += D.polyline([[410, 290], [430, 312], [480, 312], [500, 290]], { fill: "#bfe6f1", stroke: C.blue, width: 2.4, close: true });
  b += D.polyline([...S, [430, 312], [480, 312], [500, 290], [540, 272]], { stroke: C.ink, width: 2.6 });
  b += D.line(150, 180, 150, 152, { stroke: "#6b4f2a", width: 4 }) + D.circle(150, 134, 20, { fill: C.fillGreen, stroke: C.green, width: 2 });
  for (const x of [50, 105, 215, 330, 420]) b += D.arrow(x - 8, 46, x + 4, 82, { stroke: C.blue, width: 2.2 });
  b += lab(290, 30, `INPUT  Precipitation  P = ${P} mm`, { anchor: "middle", fill: C.blue });
  b += D.arrow(150, 106, 150, 76, { stroke: C.red, width: 2, dash: true }) + D.arrow(290, 224, 290, 140, { stroke: C.red, width: 2, dash: true });
  b += lab(300, 128, `OUTPUT  Evapotranspiration  E = ${E} mm`, { anchor: "start", fill: C.red, dy: -4 });
  b += lab(24, 100, "Interception", { anchor: "start", size: 12 }) + lab(212, 196, "Infiltration", { anchor: "start", size: 12 }) + D.arrow(200, 190, 200, 214, { stroke: C.blue, width: 2.2 });
  b += D.arrow(262, 226, 322, 250, { stroke: C.amber, width: 2.8 }) + lab(334, 236, "Overland flow", { size: 12, fill: C.amber });
  b += D.arrow(230, 244, 330, 280, { stroke: C.teal, width: 2.4 }) + lab(70, 272, "Throughflow", { size: 12, fill: C.teal });
  b += D.arrow(60, 184, 60, 270, { stroke: C.blue, width: 2.2 }) + lab(68, 240, "Percolation", { size: 12 });
  b += D.arrow(100, 322, 380, 336, { stroke: C.blue, width: 2.4 }) + lab(110, 370, "Groundwater flow", { size: 12 });
  b += D.arrow(440, 304, 482, 304, { stroke: C.blue, width: 2.4 }) + lab(430, 276, "Channel flow", { size: 12 });
  b += lab(540, 392, "Groundwater store", { anchor: "end", size: 12, fill: C.blue });
  b += lab(540, 196, `OUTPUT  Runoff  Q = ${Q} mm`, { anchor: "end", size: 12, fill: C.blue, dy: -2 });
  b += D.rect(20, 414, 520, 54, { fill: "#fff", stroke: C.ink, width: 1.2, r: 6 });
  b += D.text(280, 436, `P = Q + E ± ΔS:  ${P} = ${Q} + ${E} + ΔS`, { anchor: "middle", size: 14, weight: 700 });
  b += D.text(280, 458, `ΔS = ${P} − ${Q} − ${E} = +${dS} mm: stores filled`, { anchor: "middle", size: 14, weight: 700, fill: C.green });
  await make("drainage-basin-water-balance", 560, 484, b,
    `Drainage basin as an open system: precipitation of ${P} mm is the input; evapotranspiration of ${E} mm and runoff of ${Q} mm leave, so storage rises by ${dS} mm (P = Q + E + change in storage). Stores and flows (interception, infiltration, overland flow, throughflow, percolation, groundwater flow) are labelled.`,
    "Figure: stores, transfers and the water balance of the worked-example catchment (illustrative data)",
    "hydro/drainage-basin-system", "### How water moves through the basin");
}

// ---------- 2. Storm hydrograph, rural vs urban (table in the lesson)
{
  const hrs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const rain = [0, 4, 12, 18, 6, 2, 0, 0, 0, 0, 0, 0, 0];
  const rural = [2, 2, 2, 3, 4, 6, 8, 10, 9, 7, 5, 3, 2];
  const urban = [2, 2, 3, 9, 20, 26, 19, 12, 7, 4, 3, 2, 2];
  const w = 580, h = 480;
  const ax = D.axes({ x: [0, 12], y: [0, 28], w, h, xTicks: 1, yTicks: 4, xLabel: "Time (hours)", yLabel: "Discharge (m³/s)", pad: { t: 200, l: 64, r: 30, b: 58 } });
  let b = ax.frame;
  b += D.line(ax.X(0), 28, ax.X(12), 28, { stroke: C.axis, width: 1.4 });
  b += D.text(64, 18, "Rainfall (mm/h)", { size: 14, weight: 600 });
  const bw = (ax.X(1) - ax.X(0)) * 0.7;
  hrs.forEach((t, i) => { if (rain[i]) { b += D.rect(ax.X(t) - bw / 2, 28, bw, rain[i] * 6.5, { fill: C.teal, stroke: "none" }) + D.text(ax.X(t), 28 + rain[i] * 6.5 + 15, String(rain[i]), { anchor: "middle", size: 12, fill: C.muted }); } });
  b += ax.line(hrs.map((t, i) => [t, rural[i]]), { stroke: C.green });
  b += ax.line(hrs.map((t, i) => [t, urban[i]]), { stroke: C.red });
  b += ax.point(5, 26, { stroke: C.red }) + ax.point(7, 10, { stroke: C.green });
  b += lab(ax.X(5) + 24, ax.Y(26) + 2, "Urban peak 26", { anchor: "start", fill: C.red, size: 13 });
  b += lab(ax.X(7) + 44, ax.Y(12) - 4, "Rural peak 10", { anchor: "start", fill: C.green, size: 13 });
  b += D.line(ax.X(3), 28 + 18 * 6.5 + 22, ax.X(3), ax.Y(0), { stroke: C.muted, width: 1.3, dash: true });
  b += D.line(ax.X(5), ax.Y(26), ax.X(5), ax.Y(0), { stroke: C.muted, width: 1.3, dash: true }) + D.line(ax.X(7), ax.Y(10), ax.X(7), ax.Y(0), { stroke: C.muted, width: 1.3, dash: true });
  b += D.line(ax.X(3), ax.Y(23), ax.X(5), ax.Y(23), { stroke: C.red, width: 2, arrow: true });
  b += lab(ax.X(3) - 4, ax.Y(23) - 6, "lag 2 h", { anchor: "end", size: 12, fill: C.red });
  b += D.line(ax.X(3), ax.Y(7.5), ax.X(7), ax.Y(7.5), { stroke: C.green, width: 2, arrow: true });
  b += lab(ax.X(3) - 6, ax.Y(7.5) + 6, "lag 4 h", { anchor: "end", size: 12, fill: C.green });
  b += lab(ax.X(0.2), ax.Y(2) - 14, "Baseflow 2", { anchor: "start", size: 12 });
  b += D.line(ax.X(8.3), ax.Y(21), ax.X(9.2), ax.Y(21), { stroke: C.red, width: 3 }) + T(ax.X(9.3), ax.Y(21) + 5, "Urban stream");
  b += D.line(ax.X(8.3), ax.Y(18), ax.X(9.2), ax.Y(18), { stroke: C.green, width: 3 }) + T(ax.X(9.3), ax.Y(18) + 5, "Rural stream");
  await make("storm-hydrograph-urban-rural", w, h, b,
    "Storm hydrograph: rainfall peaks at 18 mm/h in hour 3; the urban stream peaks at 26 m3/s in hour 5 (lag 2 hours) and the rural stream at 10 m3/s in hour 7 (lag 4 hours), so urban surfaces give a shorter lag and a peak 2.6 times higher.",
    "Figure: storm hydrographs for a rural and an urban stream (data from the worked example, illustrative)",
    "hydro/hydrographs-morphometry", "A storm hydrograph has these parts");
}

// ---------- 3. Stream numbers by order (36, 9, 2, 1)
{
  const N = [36, 9, 2, 1];
  const w = 540, h = 380;
  const ax = D.axes({ x: [0.5, 4.5], y: [0, 40], w, h, xTicks: [1, 2, 3, 4], yTicks: 10, xLabel: "Stream order", yLabel: "Number of streams", pad: { b: 62 } });
  let b = ax.frame;
  b += ax.line(N.map((n, i) => [i + 1, n]), { stroke: C.blue });
  N.forEach((n, i) => { b += ax.point(i + 1, n, { stroke: C.blue, r: 5 }) + ax.label(i + 1, n, String(n), { dx: 10, dy: -8, size: 14, weight: 700 }); });
  const Rb = [N[0] / N[1], N[1] / N[2], N[2] / N[3]];
  b += lab(ax.X(1.5) + 16, ax.Y(22), `Rb = 36 ÷ 9 = ${Rb[0].toFixed(1)}`, { anchor: "start", fill: C.amber });
  b += lab(ax.X(2.5) + 10, ax.Y(10), `Rb = 9 ÷ 2 = ${Rb[1].toFixed(1)}`, { anchor: "start", fill: C.amber });
  b += lab(ax.X(3.5) - 20, ax.Y(6), `Rb = 2 ÷ 1 = ${Rb[2].toFixed(1)}`, { anchor: "start", fill: C.amber, dy: -34 });
  const mean = (Rb[0] + Rb[1] + Rb[2]) / 3;
  b += lab(ax.X(4.5), ax.Y(34), `Mean Rb = ${mean.toFixed(1)}`, { anchor: "end", size: 14, fill: C.ink });
  await make("stream-order-numbers", w, h, b,
    "Number of streams falls steeply with Strahler order: 36 first-order, 9 second-order, 2 third-order and 1 fourth-order stream, giving bifurcation ratios of 4.0, 4.5 and 2.0 and a mean of 3.5.",
    "Figure: number of streams by order and the bifurcation ratios of the worked-example basin (illustrative data)",
    "hydro/hydrographs-morphometry", "Stream morphometry of a basin");
}
