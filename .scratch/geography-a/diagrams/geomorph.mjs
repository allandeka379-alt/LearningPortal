// geography-a geomorph figures (slopes, mass movement, weathering). Run: node .scratch/geography-a/diagrams/geomorph.mjs
import { D, C, make, lab, T } from "./_h.mjs";
const G = (body, x, y) => D.group(body, { translate: [x, y] });

// ---------- 1. Surveyed slope profile (10 sections of 10 m measured along the slope)
{
  const ang = [3, 7, 12, 20, 24, 24, 24, 15, 8, 4];
  const rad = (a) => (a * Math.PI) / 180;
  const dx = ang.map((a) => 10 * Math.cos(rad(a))), dy = ang.map((a) => 10 * Math.sin(rad(a)));
  const H = dy.reduce((a, b) => a + b, 0), Wd = dx.reduce((a, b) => a + b, 0); // about 24.1 and 96.0
  const pts = [[0, H]]; let x = 0, y = H;
  ang.forEach((a, i) => { x += dx[i]; y -= dy[i]; pts.push([x, y]); });
  const w = 580, h = 330;
  const ax = D.axes({ x: [0, 100], y: [0, 32], w, h: 270, xTicks: 10, yTicks: 8, xLabel: "Horizontal distance from crest (m)", yLabel: "Height above foot (m)", pad: { b: 52, t: 24 } });
  let b = ax.frame;
  b += ax.area((xv) => { for (let i = 0; i < pts.length - 1; i += 1) if (xv <= pts[i + 1][0]) return pts[i][1] + (pts[i + 1][1] - pts[i][1]) * ((xv - pts[i][0]) / (pts[i + 1][0] - pts[i][0])); return pts[pts.length - 1][1]; }, () => 0, [0, Wd], { fill: C.fillGrey });
  b += ax.line(pts, { stroke: C.ink, width: 2.8 });
  pts.forEach(([px, py]) => { b += ax.point(px, py, { stroke: C.ink, r: 3 }); });
  const xs = pts.map((p) => p[0]);
  const br = (a, z, y, s2, col) => D.line(ax.X(a), y, ax.X(z), y, { stroke: col, width: 2 }) + D.text(ax.X((a + z) / 2), y + 17, s2, { anchor: "middle", size: 12, fill: col });
  b += br(xs[0], xs[5], 282, "Waxing (convex): sections 1-5", C.blue);
  b += br(xs[5], xs[7], 314, "Constant (24°): 5-7", C.red);
  b += br(xs[7], xs[10], 282, "Waning (concave): 8-10", C.green);
  b += lab(ax.X(55), ax.Y(30), `Total height ${H.toFixed(1)} m; total horizontal ${Wd.toFixed(1)} m`, { anchor: "start", size: 12 });
  b += lab(ax.X(55), ax.Y(27) + 6, `Mean gradient ${(H / Wd).toFixed(3)} = ${(100 * H / Wd).toFixed(0)}% (${(Math.atan(H / Wd) * 180 / Math.PI).toFixed(1)}°)`, { anchor: "start", size: 12 });
  await make("slope-profile-survey", w, 340, b,
    "Surveyed slope profile from the worked example: angles rise from 3 to 24 degrees over the first five sections (convex, waxing slope), stay at 24 degrees over sections 5 to 7 (constant slope) and fall to 4 degrees over sections 8 to 10 (concave, waning slope); total height 24.1 m over 96.0 m, a mean gradient of 25 percent.",
    "Figure: the surveyed slope profile plotted from the angles in the worked example (calculated from 10 sin and 10 cos of each angle; height scale slightly exaggerated)",
    "geomorph/slopes", "Analysing a surveyed slope profile");
}

// ---------- 2. Three slope models
{
  const w = 580, h = 330;
  const pw = 186;
  const base = 150;
  const panel = (title, lines, note, extra = "") => {
    let s = D.text(pw / 2, 18, title, { anchor: "middle", size: 14, weight: 700 });
    s += D.rect(4, 30, pw - 8, 150, { fill: "#fff", stroke: C.grid, width: 1 });
    lines.forEach((pl, i) => { s += D.polyline(pl, { stroke: i === 0 ? C.ink : i === 1 ? C.muted : "#a8a39b", width: i === 0 ? 2.6 : 2, dash: i > 0 }); });
    s += extra;
    s += D.line(8, 180, pw - 8, 180, { stroke: C.axis, width: 1.4 });
    s += T(pw / 2, 202, note[0], { anchor: "middle" }) + T(pw / 2, 220, note[1], { anchor: "middle" });
    return s;
  };
  const y0 = 34;
  const dec = [[[8, 62], [30, 62], [76, 178]], [[8, 82], [30, 82], [120, 178]], [[8, 106], [30, 106], [172, 178]]];
  const par = [[[8, 62], [50, 62], [76, 124], [178, 168]], [[8, 62], [90, 62], [116, 124], [178, 168]], [[8, 62], [130, 62], [156, 124], [178, 168]]];
  const rep = [[[8, 62], [30, 62], [110, 178]], [[8, 62], [30, 62], [70, 120], [178, 174]], [[8, 62], [30, 62], [50, 90], [178, 176]]];
  let b = "";
  b += G(panel("Slope decline (Davis)", dec, ["Whole slope gets gentler;", "crest lowered"]), 4, 4);
  b += G(panel("Parallel retreat (King)", par, ["Same angle; scarp moves back,", "pediment grows"]), 196, 4);
  b += G(panel("Slope replacement (Penck)", rep, ["Gentle lower slope replaces", "the steep upper slope"]), 388, 4);
  b += D.text(290, 262, "Solid line = earliest profile; dashed lines = later profiles (schematic)", { anchor: "middle", size: 12.5, fill: C.muted });
  b += D.text(290, 284, "Decline: maximum angle falls. Parallel retreat: maximum angle stays the same.", { anchor: "middle", size: 12.5 });
  await make("slope-development-models", w, 300, b,
    "Three models of slope development: in slope decline the whole slope becomes gentler and lower; in parallel retreat the scarp keeps the same angle while it moves back and a pediment widens; in slope replacement a gentle lower slope grows at the expense of the steep upper slope.",
    "Figure: slope decline, parallel retreat and slope replacement compared (schematic profiles at three times)",
    "geomorph/slopes", "| **Slope decline** (Davis)");
}

// ---------- 3. Mass movement types
{
  const w = 580, h = 470;
  const pw = 280, ph = 210;
  const fr = (t) => D.rect(0, 0, pw, ph, { fill: "#fff", stroke: C.grid, width: 1.2 }) + D.text(pw / 2, 20, t, { anchor: "middle", size: 14, weight: 700 });
  let b = "";
  // creep
  let p = fr("Heave / creep (slow, damp soil)");
  p += D.polyline([[10, 70], [270, 150], [270, 200], [10, 200]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.polyline([[10, 70], [270, 150], [270, 162], [10, 82]], { fill: "#e9d5b8", stroke: C.ink, width: 1.2, close: true });
  for (const x of [60, 130, 200]) { const y = 70 + (x - 10) * (80 / 260); p += D.line(x, y, x + 12, y - 28, { stroke: "#6b4f2a", width: 3 }); p += D.line(x, y + 8, x + 4, y - 20, { stroke: "#6b4f2a", width: 0 }); }
  p += D.arrow(60, 100, 100, 112, { stroke: C.red, width: 2 }) + D.arrow(160, 126, 200, 138, { stroke: C.red, width: 2 });
  p += T(140, 190, "A few mm a year; posts lean downslope", { anchor: "middle" }) + T(135, 50, "Soil layer moves, surface layer fastest", { anchor: "middle", size: 12 });
  b += G(p, 10, 10);
  // flow
  p = fr("Flow (very wet, fast)");
  p += D.polyline([[10, 60], [270, 170], [270, 200], [10, 200]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.path_("M90,88 C120,92 130,112 160,120 C190,130 200,140 235,168 L270,170 L270,182 L225,182 C190,160 170,150 140,134 C110,122 95,108 80,96 Z", { fill: "#b8956a", stroke: C.ink, width: 1.6 });
  p += D.arrow(100, 100, 200, 150, { stroke: C.red, width: 2.2 });
  p += T(140, 192, "Saturated debris moves like a liquid", { anchor: "middle" }) + T(140, 52, "Carries boulders along channels", { anchor: "middle", size: 12 });
  b += G(p, 290, 10);
  // slide (rotational)
  p = fr("Slide (rotational slump)");
  p += D.polyline([[10, 70], [150, 70], [270, 150], [270, 200], [10, 200]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.path_("M110,70 C120,130 180,160 232,148", { stroke: C.red, width: 2.4, dash: true });
  p += D.polyline([[110, 70], [110, 82], [200, 130], [232, 148], [230, 138]], { fill: "#e9d5b8", stroke: C.ink, width: 1.4, close: true });
  p += D.arrow(150, 100, 190, 138, { stroke: C.red, width: 2.2 });
  p += T(110, 58, "Scar", { anchor: "middle", size: 12 }) + T(140, 192, "Block moves on a curved surface", { anchor: "middle" }) + T(40, 140, "Failure surface", { anchor: "start", size: 12, fill: C.red });
  b += G(p, 10, 230);
  // fall
  p = fr("Fall (very fast, steep jointed cliff)");
  p += D.polyline([[10, 70], [150, 70], [150, 150], [270, 190], [270, 200], [10, 200]], { fill: "#d8d3ca", stroke: C.ink, width: 1.8, close: true });
  p += D.line(120, 70, 120, 100, { stroke: C.ink, width: 1.4 }) + D.line(150, 100, 120, 100, { stroke: C.ink, width: 1.4 });
  p += D.rect(122, 82, 22, 14, { fill: "#b9b4ab", stroke: C.ink, width: 1.4 }) + D.arrow(160, 90, 170, 130, { stroke: C.red, width: 2.2, dash: true });
  p += D.polyline([[150, 150], [270, 190], [200, 178], [160, 160]], { fill: "#b9b4ab", stroke: C.ink, width: 1.2, close: true });
  p += T(190, 142, "Scree (talus)", { anchor: "start", size: 12 }) + T(140, 192, "Rock detaches, drops, bounces", { anchor: "middle", size: 12 }).replace("", "");
  b += G(p, 290, 230);
  await make("mass-movement-types", w, h, b,
    "Four types of mass movement: heave or creep is a slow movement of damp soil, flow is fast movement of saturated debris like a liquid, a slide moves a block along a surface (curved in a rotational slump), and a fall is rock dropping from a steep jointed cliff.",
    "Figure: heave, flow, slide and fall compared (schematic)",
    "geomorph/mass-movements", "## Types of mass movement");
}

// ---------- 4. Rainfall threshold for landslide warning
{
  const rain = [14, 31, 96, 188, 142];
  const sum = (a, z) => rain.slice(a, z + 1).reduce((x, y) => x + y, 0);
  const w = 560, h = 440;
  const ax = D.axes({ x: [0, 5.6], y: [0, 300], w, h, xTicks: [], yTicks: 50, yLabel: "Daily rainfall (mm)", pad: { b: 60, t: 36 } });
  let b = ax.frame;
  rain.forEach((v, i) => { const x0 = ax.X(i + 0.7), x1 = ax.X(i + 1.3); b += D.rect(x0, ax.Y(v), x1 - x0, ax.Y(0) - ax.Y(v), { fill: C.teal, stroke: "none" }) + D.text((x0 + x1) / 2, ax.Y(v) - 6, String(v), { anchor: "middle", size: 13, weight: 700 }) + D.text((x0 + x1) / 2, ax.Y(0) + 20, `Day ${i + 1}`, { anchor: "middle", size: 13 }); });
  const win = (a, z, y, s, col) => D.line(ax.X(a + 0.7), ax.Y(y), ax.X(z + 1.3), ax.Y(y), { stroke: col, width: 2.4 }) + D.line(ax.X(a + 0.7), ax.Y(y) , ax.X(a + 0.7), ax.Y(y) + 8, { stroke: col, width: 2.4 }) + D.line(ax.X(z + 1.3), ax.Y(y), ax.X(z + 1.3), ax.Y(y) + 8, { stroke: col, width: 2.4 }) + lab(ax.X(a + 0.7) + 4, ax.Y(y) - 8, s, { anchor: "start", size: 12, fill: col });
  b += win(0, 2, 275, `Days 1-3: ${sum(0, 2)} mm (below 300: no warning)`, C.green);
  b += win(1, 3, 250, `Days 2-4: ${sum(1, 3)} mm (over 300: WARNING)`, C.amber);
  b += win(2, 4, 225, `Days 3-5: ${sum(2, 4)} mm (over by ${sum(2, 4) - 300} mm)`, C.red);
  await make("landslide-rainfall-threshold", w, h, b,
    "Daily rainfall of 14, 31, 96, 188 and 142 mm: the three-day total for days 1 to 3 is 141 mm, below the 300 mm landslide threshold, but days 2 to 4 total 315 mm, so a warning is issued on day 4, and days 3 to 5 reach 426 mm, 126 mm over the threshold.",
    "Figure: three-day rainfall totals against the 300 mm landslide-warning threshold (worked-example data)",
    "geomorph/mass-movements", "Applying a rainfall threshold");
}

// ---------- 5. Peltier weathering diagram (schematic)
{
  const w = 580, h = 440;
  const ax = D.axes({ x: [-10, 30], y: [0, 3000], w, h, xTicks: 10, yTicks: 500, xLabel: "Mean annual temperature (°C)", yLabel: "Mean annual rainfall (mm)", origin: false, yFormat: (v) => String(v) });
  let b = ax.frame;
  const box = (x0, x1, y0, y1, title, sub, fill) => D.rect(ax.X(x0), ax.Y(y1), ax.X(x1) - ax.X(x0), ax.Y(y0) - ax.Y(y1), { fill, stroke: C.ink, width: 1.6, r: 6 }) + D.text((ax.X(x0) + ax.X(x1)) / 2, (ax.Y(y0) + ax.Y(y1)) / 2 - 2, title, { anchor: "middle", size: 13, weight: 700 }) + D.text((ax.X(x0) + ax.X(x1)) / 2, (ax.Y(y0) + ax.Y(y1)) / 2 + 15, sub, { anchor: "middle", size: 12 });
  b += box(18, 30, 1800, 3000, "Humid tropical", "chemical very strong", C.fillAmber);
  b += box(18, 30, 600, 1700, "Savanna", "chemical moderate", "#f9f3e6");
  b += box(18, 30, 0, 450, "Hot desert", "thermal and salt", C.fillGrey);
  b += box(-10, 8, 400, 1800, "Cold and moist", "freeze-thaw strong", C.fillBlue);
  b += box(-10, 0, 0, 300, "Polar", "very slow", "#ffffff");
  b += T(ax.X(10), ax.Y(2800), "Chemical weathering needs heat and water;", { anchor: "middle", fill: C.muted, size: 12 }) + T(ax.X(10), ax.Y(2800) + 15, "freeze-thaw needs water and frost", { anchor: "middle", fill: C.muted, size: 12 });
  await make("peltier-weathering-climates", w, h, b,
    "Schematic Peltier diagram of mean annual temperature against rainfall: chemical weathering dominates where it is hot and wet (humid tropical, strongest), freeze-thaw dominates where it is cold and moist, thermal and salt weathering matter in hot deserts, and weathering is very slow in dry polar climates.",
    "Figure: schematic Peltier diagram linking climate to the dominant type of weathering (boxes are approximate regions)",
    "geomorph/weathering", "## Weathering and climate: the Peltier diagram");
}
