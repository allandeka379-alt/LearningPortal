// geography-o settlement and skills diagrams. Run from repo root: node .scratch/geography-o/diagrams/settlement.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;

// ---------- 1. Settlement patterns on the fictional grid (settlement/types-site-patterns.md)
{
  const s = 130, x0 = 70, y0 = 440; // origin = easting 41, northing 64
  const X = (e) => x0 + (e - 41) * s, Y = (n) => y0 - (n - 64) * s;
  let b = "";
  for (let e = 41; e <= 44; e++) b += D.line(X(e), Y(67), X(e), Y(64), { stroke: C.grid, width: 1.4 }) + D.text(X(e), Y(64) + 20, String(e), { anchor: "middle", size: 13, fill: C.muted });
  for (let n = 64; n <= 67; n++) b += D.line(X(41), Y(n), X(44), Y(n), { stroke: C.grid, width: 1.4 }) + D.text(X(41) - 8, Y(n) + 4, String(n), { anchor: "end", size: 13, fill: C.muted });
  const hut = (e, n, o = {}) => D.rect(X(e) - 4, Y(n) - 4, 8, 8, { fill: o.fill ?? C.amber, stroke: o.fill ?? C.amber, width: 1 });
  let huts = 0;
  const count = {};
  const add = (e, n) => { b += hut(e, n); huts += 1; const k = `${Math.floor(e)}${Math.floor(n)}`; count[k] = (count[k] ?? 0) + 1; };
  // dispersed: 1 hut in each of these squares (2 in 4366)
  for (const [e, n] of [[41.3, 66.6], [42.6, 66.3], [43.2, 66.7], [43.7, 66.2], [42.4, 65.4], [43.5, 65.3], [41.6, 64.3]]) add(e, n);
  // nucleated: 14 huts round the borehole at 418 657 (41.8, 65.7)
  for (let k = 0; k < 14; k++) {
    const a = (k / 14) * 2 * Math.PI + 0.3, r = k % 2 ? 0.09 : 0.17;
    add(41.8 + r * Math.cos(a), 65.7 + r * Math.sin(a) * 0.9);
  }
  // linear: 9 huts along the road from 420 640 to 430 645 (42.0, 64.0) -> (43.0, 64.5)
  b += D.line(X(42), Y(64), X(43), Y(64.5), { stroke: C.muted, width: 3 });
  for (let k = 0; k < 9; k++) {
    const t = 0.06 + (k * 0.88) / 8;
    add(42 + t, 64 + 0.5 * t + (k % 2 ? 0.1 : 0.1) + (k % 2 ? 0.04 : 0));
  }
  b += D.dot(X(41.8), Y(65.7), { r: 5, stroke: C.blue, fill: C.blue });
  b += D.text(X(41.8) + 14, Y(65.7) + 4, "Borehole", { size: 12, fill: C.blue });
  b += D.text(X(42) + 70, Y(64.5) - 4, "Road", { size: 12, fill: C.muted });
  b += D.tag(X(41) + 6, Y(65.2), "4165 nucleated", { size: 13, fill: C.green });
  b += D.tag(X(43) + 14, Y(64.4), "4264 linear", { size: 13, fill: C.green });
  b += D.text(X(41), Y(67) - 12, "All other squares: dispersed", { size: 13, fill: C.muted });
  const alt = `Grid of nine squares (eastings 41 to 43, northings 64 to 66) with a hut in most squares: 14 huts packed around a borehole in square 4165 (nucleated), 9 huts along a road in square 4264 (linear), and single scattered huts elsewhere (dispersed). Total ${huts} huts.`;
  const cap = "Figure: nucleated, linear and dispersed patterns on a fictional map grid";
  if (count["4165"] !== 14 && true) { /* nucleated squares hold the cluster plus no extra hut */ }
  await D.figure(FAMILY, "settlement-patterns-grid", D.svg(560, 480, b), { alt, caption: cap });
  D.insertAfter(`${L}/settlement/types-site-patterns.md`, "Square 4165 shows a **nucleated** pattern", D.md("settlement-patterns-grid", alt, cap));
  console.log("hut counts per square", JSON.stringify(count));
}

// ---------- 2. Urban models (settlement/urban-land-use.md)
{
  let b = "";
  const w = 180, h = 220, top = 36;
  const zone = { cbd: ["1", C.red], ind: ["2", C.grey ?? "#8a857d"], low: ["3", C.amber], med: ["4", "#d9a066"], high: ["5", C.green], nuc: ["6", C.purple] };
  const fills = { cbd: "#f3b4ad", ind: "#cfcac3", low: "#f6c691", med: "#fbe3c4", high: "#a9dfc1", nuc: "#d3c5ea" };
  const num = (x, y, k) => D.text(x, y + 5, zone[k][0], { anchor: "middle", size: 15, weight: 700 });
  const cell = (ox, title) => D.text(ox + w / 2, 22, title, { anchor: "middle", size: 14, weight: 700 }) + D.rect(ox, top, w, h, { stroke: C.grid, width: 1.5 });
  { // concentric
    const ox = 4, cx = ox + w / 2, cy = top + h / 2;
    b += cell(ox, "Concentric (Burgess)");
    [[84, "high"], [68, "med"], [52, "low"], [34, "ind"], [16, "cbd"]].forEach(([r, k]) => (b += D.circle(cx, cy, r, { fill: fills[k], stroke: C.ink, width: 1.4 })));
    b += num(cx, cy, "cbd") + num(cx, cy - 25, "ind") + num(cx, cy - 43, "low") + num(cx, cy - 60, "med") + num(cx, cy - 76, "high");
  }
  { // sector
    const ox = 190, cx = ox + w / 2, cy = top + h / 2, R = 84;
    b += cell(ox, "Sector (Hoyt)");
    const wedge = (a0, a1, k, rr = R) => {
      const p = (a) => [cx + rr * Math.sin((a * Math.PI) / 180), cy - rr * Math.cos((a * Math.PI) / 180)];
      const [x1, y1] = p(a0), [x2, y2] = p(a1);
      return D.path_(`M${cx},${cy} L${x1},${y1} A${rr},${rr} 0 0 1 ${x2},${y2} Z`, { fill: fills[k], stroke: C.ink, width: 1.4 });
    };
    // compass angle from north, clockwise
    b += wedge(10, 70, "high") + wedge(70, 130, "med") + wedge(130, 190, "med") + wedge(190, 250, "low") + wedge(250, 310, "med") + wedge(310, 370, "med");
    // industrial wedge inside the low-income side: draw a narrow wedge on top
    b += wedge(190, 250, "low") + wedge(205, 235, "ind", 60);
    b += D.circle(cx, cy, 16, { fill: fills.cbd, stroke: C.ink, width: 1.4 });
    b += num(cx, cy, "cbd") + num(cx + 42, cy - 30, "high") + num(cx - 44, cy + 28, "ind") + num(cx - 60, cy + 40 + 8, "low") + num(cx, cy + 56, "med");
  }
  { // multiple nuclei
    const ox = 376, cx = ox + w / 2;
    b += cell(ox, "Multiple nuclei");
    const blk = (x, y, ww, hh, k) => D.rect(ox + x, top + y, ww, hh, { fill: fills[k], stroke: C.ink, width: 1.4 }) + num(ox + x + ww / 2, top + y + hh / 2, k);
    b += blk(6, 6, 168, 208, "med");
    b += blk(60, 70, 56, 50, "cbd") + blk(10, 10, 50, 46, "high") + blk(124, 14, 46, 50, "nuc") + blk(10, 150, 80, 56, "ind") + blk(100, 140, 70, 40, "low") + blk(116, 70, 54, 56, "low") + blk(14, 70, 40, 60, "low");
  }
  b += D.text(10, 280, "1 CBD   2 industry (or zone of transition)   3 low-income housing", { size: 13 });
  b += D.text(10, 300, "4 medium-income housing   5 high-income housing   6 other centre (nucleus)", { size: 13 });
  const alt = "Three urban land-use models: in the concentric model the CBD is at the centre and industry, then low-, medium- and high-income housing lie in rings further out; in the sector model zones run outwards in wedges, with industry and low-income housing in one sector and high-income housing in another; in the multiple-nuclei model several centres grow round separate nuclei.";
  const cap = "Figure: the concentric, sector and multiple-nuclei models of a town";
  await D.figure(FAMILY, "urban-land-use-models", D.svg(560, 312, b), { alt, caption: cap });
  D.insertAfter(`${L}/settlement/urban-land-use.md`, "This model fits large, car-using cities better.", D.md("urban-land-use-models", alt, cap));
}

// ---------- 3. Pie chart and scatter graph (skills/graphs.md)
{
  // pie: employment in a fictional town, 45 / 20 / 35 (worked solution in the lesson)
  const data = [["Agriculture", 45, C.green], ["Industry", 20, C.amber], ["Services", 35, C.teal]];
  const total = data.reduce((a, d) => a + d[1], 0);
  let b = "", ang = 0;
  const cx = 150, cy = 150, R = 110;
  const pt = (a, r) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const angles = [];
  for (const [name, v, col] of data) {
    const deg = (v / total) * 360;
    angles.push(Math.round(deg));
    const [x1, y1] = pt(ang, R), [x2, y2] = pt(ang + deg, R);
    b += D.path_(`M${cx},${cy} L${x1},${y1} A${R},${R} 0 ${deg > 180 ? 1 : 0} 1 ${x2},${y2} Z`, { fill: col, stroke: "#fff", width: 3 });
    const [lx, ly] = pt(ang + deg / 2, R * 0.62);
    b += D.text(lx, ly + 5, `${Math.round(deg)}°`, { anchor: "middle", size: 16, weight: 700, fill: "#fff" });
    ang += deg;
  }
  const lg = [["Agriculture 45%", C.green], ["Industry 20%", C.amber], ["Services 35%", C.teal]];
  lg.forEach(([t, col], i) => (b += D.rect(290, 100 + i * 34, 18, 18, { fill: col, stroke: col }) + D.text(316, 115 + i * 34, t, { size: 15 })));
  b += D.text(290, 80, "Employment, fictional town", { size: 14, weight: 700 });
  const alt = `Pie chart of employment in a fictional town: agriculture 45% is a sector of ${angles[0]}°, industry 20% is ${angles[1]}° and services 35% is ${angles[2]}°, which add up to 360°.`;
  const cap = "Figure: sector angles of a pie chart are the percentage multiplied by 3.6";
  await D.figure(FAMILY, "pie-chart-employment", D.svg(560, 300, b), { alt, caption: cap });
  D.insertAfter(`${L}/skills/graphs.md`, "4. Check: 162 + 72 + 126 = 360°", D.md("pie-chart-employment", alt, cap));
}
{
  // scatter: distance from CBD (km) against land value (US$ per m2); fictional survey matching the lesson's example
  const pts = [[0.5, 900], [1, 800], [1.5, 690], [2, 580], [2.5, 480], [3, 600], [3.5, 330], [4, 250], [4.5, 180], [5, 100]];
  const fit = pts.filter((p) => p[0] !== 3);
  const n = fit.length, sx = fit.reduce((a, p) => a + p[0], 0), sy = fit.reduce((a, p) => a + p[1], 0);
  const sxy = fit.reduce((a, p) => a + p[0] * p[1], 0), sxx = fit.reduce((a, p) => a + p[0] * p[0], 0);
  const m = (n * sxy - sx * sy) / (n * sxx - sx * sx), c = (sy - m * sx) / n;
  const ax = D.axes({ x: [0, 5.5], y: [0, 1000], xTicks: 1, yTicks: 200, xLabel: "Distance from the CBD (km)", yLabel: "Land value (US$ per m²)", w: 560, h: 390, pad: { l: 70, r: 24, t: 30, b: 60 } });
  let b = ax.frame + ax.line([[0.2, c + m * 0.2], [5.2, c + m * 5.2]], { stroke: C.amber, width: 2.2, dash: true });
  for (const [x, y] of pts) b += ax.point(x, y, { r: 5.5, stroke: x === 3 ? C.red : C.blue, fill: x === 3 ? C.red : C.blue });
  b += ax.tag(3, 600, "Anomaly: US$600 at 3 km", { dx: 12, dy: -6, size: 13, fill: C.red });
  b += ax.tag(0.3, 400, "Line of best fit", { anchor: "start", dy: 0, size: 13, fill: C.amber });
  const alt = "Scatter graph (fictional survey): land value falls from about US$900 per square metre at 0.5 km from the CBD to about US$100 at 5 km, a negative correlation shown by the dashed line of best fit; one site at 3 km is an anomaly at US$600.";
  const cap = "Figure: a scatter graph with a negative correlation, a line of best fit and one anomaly";
  await D.figure(FAMILY, "scatter-land-value-distance", D.svg(560, 390, b), { alt, caption: cap });
  D.insertAfter(`${L}/skills/graphs.md`, "Draw a line of best fit and describe the correlation", D.md("scatter-land-value-distance", alt, cap));
  console.log("fit", m.toFixed(1), c.toFixed(1));
}
console.log("settlement done");
