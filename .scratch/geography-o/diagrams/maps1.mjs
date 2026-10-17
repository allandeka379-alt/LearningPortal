// geography-o map-skills diagrams (bearings, intervisibility, contours). Run from repo root: node .scratch/geography-o/diagrams/maps1.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;

// ---------- 1. Bearing of the bridge from the dam (Extract D in maps/direction-bearings.md)
{
  const dam = [61.2, 45.2], bridge = [63.6, 48.4], church = [64.2, 48.2];
  const dE = bridge[0] - dam[0], dN = bridge[1] - dam[1];
  const bearing = Math.round((Math.atan2(dE, dN) * 180) / Math.PI); // 37
  const back = bearing + 180;
  const x0 = 50, y0 = 440, s = 100; // px per km, origin = easting 61, northing 45
  const X = (e) => x0 + (e - 61) * s, Y = (n) => y0 - (n - 45) * s;
  let b = "";
  for (let e = 61; e <= 64; e++) b += D.line(X(e), Y(49), X(e), Y(45), { stroke: C.grid, width: 1 }) + D.text(X(e), Y(45) + 20, String(e), { anchor: "middle", size: 13, fill: C.muted });
  for (let n = 45; n <= 49; n++) b += D.line(X(61), Y(n), X(64), Y(n), { stroke: C.grid, width: 1 }) + D.text(X(61) - 8, Y(n) + 4, String(n), { anchor: "end", size: 13, fill: C.muted });
  b += D.arrow(X(dam[0]), Y(dam[1]), X(dam[0]), Y(48.9), { stroke: C.muted, width: 1.8, dash: true });
  b += D.text(X(dam[0]) - 6, Y(48.9) + 14, "grid north", { anchor: "end", size: 13, fill: C.muted });
  b += D.arrow(X(dam[0]), Y(dam[1]), X(bridge[0]), Y(bridge[1]), { stroke: C.blue, width: 2.6 });
  const r = 70, a = (bearing * Math.PI) / 180;
  b += D.path_(`M${X(dam[0])},${Y(dam[1]) - r} A${r},${r} 0 0 1 ${X(dam[0]) + r * Math.sin(a)},${Y(dam[1]) - r * Math.cos(a)}`, { stroke: C.amber, width: 2.4 });
  b += D.tag(X(dam[0]) + 22, Y(dam[1]) - 78, `${String(bearing).padStart(3, "0")}°`, { fill: C.amber, size: 15 });
  b += D.dot(X(dam[0]), Y(dam[1]), { r: 5, stroke: C.ink }) + D.text(X(dam[0]) + 8, Y(dam[1]) + 18, "Dam", { size: 14, weight: 700 });
  b += D.dot(X(bridge[0]), Y(bridge[1]), { r: 5, stroke: C.ink }) + D.text(X(bridge[0]) - 8, Y(bridge[1]) - 10, "Bridge", { anchor: "end", size: 14, weight: 700 });
  b += D.dot(X(church[0]), Y(church[1]), { r: 4, stroke: C.muted }) + D.text(X(church[0]) - 6, Y(church[1]) + 18, "Church", { anchor: "end", size: 13, fill: C.muted });
  b += D.text(380, 150, "Bearing of the bridge\nfrom the dam", { size: 15, weight: 700 });
  b += D.text(380, 195, `Bridge is ${dE.toFixed(1)} km east\nand ${dN.toFixed(1)} km north\nof the dam.`, { size: 14 });
  b += D.text(380, 262, `Bearing = ${String(bearing).padStart(3, "0")}°\n(clockwise from north)`, { size: 14, fill: C.blue, weight: 700 });
  b += D.text(380, 318, `Back bearing\n(dam from bridge)\n${bearing} + 180 = ${back}°`, { size: 14, fill: C.amber, weight: 700 });
  const alt = `Grid with eastings 61 to 64 and northings 45 to 49: the bridge lies ${dE.toFixed(1)} km east and ${dN.toFixed(1)} km north of the dam, so its bearing from the dam, measured clockwise from grid north, is 0${bearing}°, and the bearing of the dam from the bridge (back bearing) is ${back}°.`;
  const cap = `Figure: the bearing of the bridge from the dam is 0${bearing}°; the back bearing is ${back}°`;
  await D.figure(FAMILY, "bearing-dam-bridge", D.svg(560, 470, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/direction-bearings.md`, "Pairs of features that are the same distance east", D.md("bearing-dam-bridge", alt, cap));
}

// ---------- 2. Intervisibility (Table 1 in maps/gradient-cross-sections.md)
{
  const dist = [0, 0.5, 1.0, 1.5, 2.0, 2.5], h = [1300, 1280, 1270, 1320, 1240, 1250];
  const sight = (d) => h[0] - ((h[0] - h[5]) / 2.5) * d; // 20 m per km
  const ax = D.axes({ x: [0, 2.5], y: [1200, 1340], xTicks: 0.5, yTicks: 20, xLabel: "Distance from the lookout tower (km)", yLabel: "Height (m)", w: 600, h: 420, pad: { l: 70, r: 30, t: 30, b: 64 } });
  const land = dist.map((d, i) => [d, h[i]]);
  let b = ax.frame;
  b += ax.area((x) => { const i = Math.min(4, Math.floor(x / 0.5)); const t = (x - dist[i]) / 0.5; return h[i] + (h[i + 1] - h[i]) * t; }, () => 1200, [0, 2.5], { fill: C.fillGrey });
  b += ax.line(land, { stroke: C.axis, width: 2.6 });
  b += ax.line([[0, sight(0)], [2.5, sight(2.5)]], { stroke: C.red, width: 2, dash: true });
  for (const [d, v] of land) b += ax.point(d, v, { r: 4, stroke: C.axis });
  b += ax.tag(0, 1300, "Lookout tower 1300 m", { dx: 8, dy: -14, size: 13 });
  b += ax.tag(2.5, 1250, "Dip tank 1250 m", { dx: 6, dy: 52, anchor: "end", size: 13 });
  b += ax.tag(1.5, 1320, "Ridge 1320 m", { dy: -10, anchor: "middle", size: 13 });
  b += ax.tag(1.5, sight(1.5), `Dashed line of sight: ${sight(1.5)} m at 1.5 km, blocked`, { dy: 90, dx: -40, anchor: "middle", fill: C.red, size: 13 });
  const alt = `Cross-section from a lookout tower at 1300 m to a dip tank at 1250 m over 2.5 km: the line of sight falls 20 m per km and is at ${sight(1.5)} m at 1.5 km, but a ridge there is 1320 m high, so the two places are not intervisible.`;
  const cap = "Figure: a 1320 m ridge rises above the line of sight, so the dip tank cannot be seen from the tower";
  await D.figure(FAMILY, "intervisibility-cross-section", D.svg(600, 420, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/gradient-cross-sections.md`, "The line of sight falls 50 m over 2.5 km", D.md("intervisibility-cross-section", alt, cap));
}

// ---------- 3. Contour patterns (maps/relief-contours.md)
{
  let b = "";
  const panel = (ox, oy, title) => D.rect(ox, oy, 262, 196, { stroke: C.grid, width: 1.5 }) + D.text(ox + 131, oy + 20, title, { anchor: "middle", size: 14, weight: 700 });
  const lab = (x, y, s) => D.tag(x, y, s, { anchor: "middle", size: 12 });
  { // (a) conical hill
    const ox = 10, oy = 8, cx = ox + 131, cy = oy + 112;
    b += panel(ox, oy, "Conical hill");
    [[96, 64], [70, 46], [44, 29]].forEach(([rx, ry]) => (b += `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${C.amber}" stroke-width="2"/>`));
    b += lab(cx, cy - 64 + 4, "1500") + lab(cx + 70 * 0.707 + 6, cy - 46 * 0.707 + 4, "1520") + lab(cx + 44 + 4, cy + 4 + 18, "1540");
    b += D.dot(cx, cy + 4, { r: 3 }) + D.text(cx - 8, cy + 18, "1568", { anchor: "end", size: 12 });
  }
  { // (b) valley: V points uphill (north)
    const ox = 288, oy = 8, cx = ox + 131;
    b += panel(ox, oy, "Valley: Vs point uphill");
    [[160, 1500], [128, 1520], [96, 1540]].forEach(([y, v]) => {
      b += D.polyline([[ox + 8, oy + y + 30], [cx - 38, oy + y + 30], [cx, oy + y + 30 - 34], [cx + 38, oy + y + 30], [ox + 254, oy + y + 30]], { stroke: C.amber, width: 2 });
      b += lab(ox + 36, oy + y + 30, String(v));
    });
    b += D.line(cx, oy + 68, cx, oy + 190, { stroke: C.blue, width: 2.4, arrow: true });
    b += D.text(cx + 8, oy + 52, "higher ground (N)", { size: 12, fill: C.muted });
  }
  { // (c) spur: V points downhill (south)
    const ox = 10, oy = 212, cx = ox + 131;
    b += panel(ox, oy, "Spur: Vs point downhill");
    [[100, 1540], [132, 1520], [164, 1500]].forEach(([y, v]) => {
      b += D.polyline([[ox + 8, oy + y - 12], [cx - 38, oy + y - 12], [cx, oy + y - 12 + 32], [cx + 38, oy + y - 12], [ox + 254, oy + y - 12]], { stroke: C.amber, width: 2 });
      b += lab(ox + 36, oy + y - 12, String(v));
    });
    b += D.text(cx + 8, oy + 52, "higher ground (N)", { size: 12, fill: C.muted });
  }
  { // (d) col between two summits
    const ox = 288, oy = 212, cx = ox + 131, cy = oy + 112;
    b += panel(ox, oy, "Col between two summits");
    const o = `M${cx - 52},${cy - 44} Q${cx},${cy - 16} ${cx + 52},${cy - 44} A44,44 0 0 1 ${cx + 52},${cy + 44} Q${cx},${cy + 16} ${cx - 52},${cy + 44} A44,44 0 0 1 ${cx - 52},${cy - 44} Z`;
    b += D.path_(o, { stroke: C.amber, width: 2 });
    for (const sx of [-52, 52]) b += `<circle cx="${cx + sx}" cy="${cy}" r="24" fill="none" stroke="${C.amber}" stroke-width="2"/>` + D.dot(cx + sx, cy, { r: 3 });
    b += lab(cx, cy - 56 + 4, "1520") + D.text(cx - 52, cy + 17, "1540", { anchor: "middle", size: 12 }) + D.text(cx + 52, cy + 17, "1540", { anchor: "middle", size: 12 }) + D.text(cx, cy + 4, "col", { anchor: "middle", size: 13, weight: 700, fill: C.blue });
  }
  const alt = "Four contour patterns: a conical hill is concentric closed contours (1500, 1520, 1540 m round a 1568 m summit); in a valley the contour Vs point uphill with the river along them; in a spur the Vs point downhill; a col is the low saddle on the 1520 m contour between two summits.";
  const cap = "Figure: contour patterns of a hill, valley, spur and col (fictional heights)";
  await D.figure(FAMILY, "contour-landform-patterns", D.svg(560, 420, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/relief-contours.md`, "- **Col (saddle)**", D.md("contour-landform-patterns", alt, cap));
}
console.log("maps1 done");
