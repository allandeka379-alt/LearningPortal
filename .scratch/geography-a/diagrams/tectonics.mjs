// geography-a tectonics figures. Run: node .scratch/geography-a/diagrams/tectonics.mjs
import { D, C, make, lab, T } from "./_h.mjs";
const G = (body, x, y) => D.group(body, { translate: [x, y] });

// ---------- 1. Sea-floor age against distance
{
  const km = [0, 100, 250, 400, 650, 900], age = [0, 4, 10, 16, 26, 36];
  const w = 560, h = 400;
  const ax = D.axes({ x: [0, 1000], y: [0, 40], w, h, xTicks: 200, yTicks: 10, xLabel: "Distance from ridge axis (km)", yLabel: "Age of basalt (million years)" });
  let b = ax.frame;
  b += ax.line(km.map((k, i) => [k, age[i]]), { stroke: C.blue, width: 2.2 });
  km.forEach((k, i) => { b += ax.point(k, age[i], { stroke: C.blue, r: 5 }); });
  b += ax.label(900, 36, "900 km, 36 Ma", { dx: -108, dy: -10, size: 13, weight: 700 });
  b += lab(ax.X(60), ax.Y(34), `Slope: 900 ÷ 36 = ${900 / 36} km per million years`, { anchor: "start", size: 13 });
  b += lab(ax.X(60), ax.Y(29), `= ${900 / 36} mm a year on each side`, { anchor: "start", size: 13 });
  await make("seafloor-age-distance", w, h, b,
    "Age of ocean-floor basalt rises in a straight line from 0 at the ridge axis to 36 million years at 900 km, a steady spreading rate of 25 km per million years, which is 25 mm a year on each side of the ridge.",
    "Figure: age of basalt against distance from a mid-ocean ridge (illustrative drilling data)",
    "tectonics/plates-evidence", "Reading ocean-floor ages and predicting");
}

// ---------- 2. Four boundary types
{
  const w = 580, h = 520;
  const pw = 280, ph = 240;
  const frame = (title) => D.rect(0, 0, pw, ph, { fill: "#fff", stroke: C.grid, width: 1.2 }) + D.text(pw / 2, 20, title, { anchor: "middle", size: 14, weight: 700 });
  const mantle = D.rect(0, 150, pw, 90, { fill: C.fillAmber, stroke: "none" }) + D.text(8, 232, "Mantle", { size: 12, fill: C.amber });
  let b = "";
  // 1 divergent
  let p = frame("Constructive (divergent)") + mantle;
  p += D.polyline([[0, 110], [100, 110], [130, 96], [150, 96], [180, 110], [280, 110], [280, 150], [0, 150]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.polyline([[120, 150], [128, 100], [152, 100], [160, 150]], { fill: "#f4a58a", stroke: "none", close: true });
  p += D.arrow(100, 70, 40, 70, { stroke: C.red, width: 2.2 }) + D.arrow(180, 70, 240, 70, { stroke: C.red, width: 2.2 });
  p += D.arrow(140, 142, 140, 108, { stroke: C.red, width: 2 }) + T(140, 52, "Plates move apart", { anchor: "middle" }) + T(140, 168, "Magma rises: new crust", { anchor: "middle" }) + T(140, 186, "(ridge, rift valley)", { anchor: "middle" });
  b += G(p, 10, 10);
  // 2 destructive
  p = frame("Destructive (subduction)") + mantle;
  p += D.polyline([[0, 112], [100, 112], [185, 192], [165, 210], [95, 135], [0, 135]], { fill: "#b9b4ab", stroke: C.ink, width: 1.8, close: true });
  p += D.polyline([[100, 112], [280, 112], [280, 150], [140, 150]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.polyline([[170, 112], [196, 74], [222, 112]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.arrow(20, 90, 80, 90, { stroke: C.red, width: 2.2 }) + D.arrow(270, 90, 240, 90, { stroke: C.red, width: 2.2 });
  p += T(50, 62, "Oceanic", { anchor: "middle" }) + T(236, 62, "Continental", { anchor: "middle" }) + T(14, 186, "Trench, volcanoes,", { anchor: "start" }) + T(14, 204, "fold mountains", { anchor: "start" });
  b += G(p, 290, 10);
  // 3 collision
  p = frame("Collision (continent-continent)") + mantle;
  p += D.polyline([[0, 110], [90, 110], [110, 90], [140, 56], [170, 90], [190, 110], [280, 110], [280, 150], [0, 150]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.arrow(20, 85, 70, 85, { stroke: C.red, width: 2.2 }) + D.arrow(260, 85, 210, 85, { stroke: C.red, width: 2.2 });
  p += T(140, 168, "Crust crumples and thickens:", { anchor: "middle" }) + T(140, 186, "fold mountains, few volcanoes", { anchor: "middle" });
  b += G(p, 10, 260);
  // 4 conservative (plan view)
  p = frame("Conservative (transform), plan view");
  p += D.rect(30, 50, 100, 150, { fill: "#d8d3ca", stroke: C.ink, width: 1.8 }) + D.rect(150, 50, 100, 150, { fill: "#d8d3ca", stroke: C.ink, width: 1.8 });
  p += D.arrow(80, 190, 80, 90, { stroke: C.red, width: 2.4 }) + D.arrow(200, 70, 200, 160, { stroke: C.red, width: 2.4 });
  p += T(140, 224, "Plates slide past: earthquakes", { anchor: "middle" }) ;
  p += T(140, 36, "no crust made or destroyed", { anchor: "middle", size: 12, fill: C.muted }).replace("", "");
  b += G(p, 290, 260);
  b += D.text(290, 512, "Red arrows show the direction each plate moves (schematic, not to scale).", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("plate-boundary-types", w, h, b,
    "Four plate boundary types in cross-section and plan: at a constructive boundary plates move apart and magma forms new crust; at a destructive boundary oceanic crust subducts under continental crust forming a trench and volcanoes; at a collision boundary two continents crumple into fold mountains; at a conservative boundary plates slide past each other with earthquakes.",
    "Figure: the four types of plate boundary (schematic)",
    "tectonics/plates-evidence", "## Types of plate boundary");
}

// ---------- 3. Subduction zone with Benioff zone foci (70/140/210/280 km at 100/200/300/400 km)
{
  const w = 580, h = 400;
  const sx = 0.7, X0 = 60, gy = 110;
  const X = (d) => X0 + d * sx, Y = (z) => gy + 4 + z * sx;
  const dist = [100, 200, 300, 400], depth = [70, 140, 210, 280];
  let b = "";
  b += D.rect(10, 20, 560, 370, { fill: "#fff", stroke: C.grid, width: 1 });
  b += D.rect(10, gy - 22, X0 - 10, 26, { fill: C.fillBlue, stroke: "none" });
  b += D.rect(10, gy + 4, 560, 376 - gy, { fill: C.fillAmber, stroke: "none" });
  b += D.text(14, 378, "Mantle", { size: 12, fill: C.amber });
  b += D.polyline([[X0, gy + 4], [X0 + 40, gy - 22], [X(143) - 22, gy - 22], [X(143), gy - 62], [X(143) + 22, gy - 22], [560, gy - 22], [560, gy + 28], [X0 + 34, gy + 28]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  const th = 22;
  b += D.polyline([[10, gy + 4], [X0, gy + 4], [X(450), Y(315)], [X(450), Y(315) + th], [X0 + 6, gy + 4 + th], [10, gy + 4 + th]], { fill: "#b9b4ab", stroke: C.ink, width: 1.8, close: true });
  b += D.text(14, gy + 58, "Oceanic plate", { size: 13, weight: 600 });
  b += D.line(X(143), gy - 58, X(143), Y(100) + 2, { stroke: C.red, width: 2.4, dash: true });
  b += lab(X(143) + 28, gy - 30, "Composite volcano", { anchor: "start", size: 12, fill: C.red });
  dist.forEach((d, i) => { b += D.circle(X(d), Y(depth[i]) + th / 2, 6, { fill: C.red, stroke: C.red, width: 1 }) + lab(X(d) + 12, Y(depth[i]) + th / 2 + 6, `${depth[i]} km (${d} km from trench)`, { anchor: "start", size: 12 }); });
  b += lab(X0, gy - 30, "Trench", { anchor: "middle", size: 12 });
  b += lab(470, 56, "Continental plate", { anchor: "middle", size: 12 });
  b += lab(150, 362, "Dip = tan⁻¹(70 ÷ 100) = 35° for every focus", { anchor: "start", size: 12 });
  await make("subduction-benioff-zone", w, h, b,
    "Subduction zone cross-section: earthquake foci at depths of 70, 140, 210 and 280 km lie 100, 200, 300 and 400 km from the trench along a plate dipping at 35 degrees beneath the continent, marking the Benioff zone, with a composite volcano above the descending slab.",
    "Figure: earthquake foci along a subducting plate (Benioff zone); depths and distances from the worked example",
    "tectonics/processes-landforms", "Interpreting earthquake foci at a subduction zone");
}

// ---------- 4. Fault scarp profile (DEM data)
{
  const d = [0, 100, 200, 300, 400, 500, 600], z = [1250, 1250, 1248, 1210, 1172, 1168, 1168];
  const w = 560, h = 400;
  const ax = D.axes({ x: [0, 600], y: [1150, 1260], w, h, xTicks: 100, yTicks: [1150, 1175, 1200, 1225, 1250], xLabel: "Distance along line (m)", yLabel: "Height (m)", yFormat: (v) => v.toLocaleString("en-GB").replace(",", "") });
  let b = ax.frame;
  b += ax.area((x) => { const i = Math.min(5, Math.floor(x / 100)); return z[i] + (z[i + 1] - z[i]) * ((x - d[i]) / 100); }, () => 1150, [0, 600], { fill: C.fillGrey });
  b += ax.line(d.map((x, i) => [x, z[i]]), { stroke: C.ink, width: 2.6 });
  d.forEach((x, i) => { b += ax.point(x, z[i], { stroke: C.ink, r: 4 }); });
  b += D.line(ax.X(200), ax.Y(1248), ax.X(400), ax.Y(1248), { stroke: C.muted, width: 1.4, dash: true }) + D.line(ax.X(400), ax.Y(1248), ax.X(400), ax.Y(1172), { stroke: C.red, width: 2.2, arrow: true, arrowStart: true });
  b += lab(ax.X(400) + 8, ax.Y(1210), "Drop 76 m over 200 m", { anchor: "start", size: 12, fill: C.red });
  b += lab(ax.X(400) + 8, ax.Y(1197), "Gradient 38%", { anchor: "start", size: 12, fill: C.red }) + lab(ax.X(400) + 8, ax.Y(1184), "Angle 20.8°", { anchor: "start", size: 12, fill: C.red });
  b += lab(ax.X(20), ax.Y(1236), "High side (footwall)", { anchor: "start", size: 12 }) + lab(ax.X(410), ax.Y(1160), "Downthrown block", { anchor: "start", size: 12 });
  b += lab(ax.X(30), ax.Y(1180), "Throw = 1250 − 1168 = 82 m", { anchor: "start", size: 12, fill: C.blue });
  await make("fault-scarp-dem-profile", w, h, b,
    "Height profile across a fault from a digital elevation model: the ground is flat at about 1250 m, drops 76 m over 200 m between 200 and 400 m (gradient 38 percent, angle 20.8 degrees) and is flat again near 1168 m, a throw of 82 m consistent with a normal fault.",
    "Figure: DEM profile across a fault scarp (data from the worked example; height axis starts at 1150 m)",
    "tectonics/processes-landforms", "Measuring a fault scarp on a profile");
}

// ---------- 5. Fault types
{
  const w = 580, h = 330;
  let b = "";
  const pw = 186;
  const block = (title, shift) => {
    let s = D.text(pw / 2, 18, title, { anchor: "middle", size: 14, weight: 700 });
    // footwall (left/below), hanging wall (right/above), fault dips to the right
    s += D.polyline([[10, 70], [80, 70], [140, 190], [10, 190]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
    const dy = shift;
    s += D.polyline([[80 + dy * 0.5, 70 + dy], [pw - 6, 70 + dy], [pw - 6, 190], [140, 190]], { fill: "#e9d5b8", stroke: C.ink, width: 1.8, close: true });
    // fault line
    s += D.line(80, 70, 140, 190, { stroke: C.red, width: 2.4, dash: true });
    return s;
  };
  let n = block("Normal fault", 28);
  n += D.arrow(44, 150, 12, 150, { stroke: C.ink, width: 2 }) + D.arrow(142, 150, 176, 150, { stroke: C.ink, width: 2 });
  n += T(pw / 2, 215, "Tension: hanging wall", { anchor: "middle" }) + T(pw / 2, 233, "moves DOWN", { anchor: "middle", weight: 700 }) + D.arrow(160, 100, 160, 124, { stroke: C.red, width: 2 });
  b += D.group(n, { translate: [4, 10] });
  let r = block("Reverse / thrust fault", -28);
  r += D.arrow(12, 150, 46, 150, { stroke: C.ink, width: 2 }) + D.arrow(176, 150, 144, 150, { stroke: C.ink, width: 2 });
  r += T(pw / 2, 215, "Compression: hanging wall", { anchor: "middle" }) + T(pw / 2, 233, "moves UP and over", { anchor: "middle", weight: 700 }) + D.arrow(160, 120, 160, 90, { stroke: C.red, width: 2 });
  b += D.group(r, { translate: [196, 10] });
  let s = D.text(pw / 2, 18, "Strike-slip fault (plan view)", { anchor: "middle", size: 14, weight: 700 });
  s += D.rect(10, 60, 80, 130, { fill: "#d8d3ca", stroke: C.ink, width: 1.8 }) + D.rect(96, 60, 80, 130, { fill: "#d8d3ca", stroke: C.ink, width: 1.8 });
  s += D.line(93, 54, 93, 196, { stroke: C.red, width: 2.4, dash: true });
  s += D.arrow(50, 175, 50, 85, { stroke: C.ink, width: 2 }) + D.arrow(136, 75, 136, 165, { stroke: C.ink, width: 2 });
  s += T(pw / 2, 215, "Shear: blocks slide", { anchor: "middle" }) + T(pw / 2, 233, "SIDEWAYS past each other", { anchor: "middle", weight: 700 });
  b += D.group(s, { translate: [388, 10] });
  b += D.text(290, 300, "Dashed red line = fault plane. Arrows show the relative movement of the blocks.", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("fault-types-stress", w, h, b,
    "Fault types: under tension a normal fault drops the block above the fault plane (hanging wall), under compression a reverse or thrust fault pushes it up and over, and under shear a strike-slip fault moves the blocks horizontally past each other.",
    "Figure: normal, reverse and strike-slip faults and the stress that makes each",
    "tectonics/processes-landforms", "A **fault scarp** is the steep face");
}
