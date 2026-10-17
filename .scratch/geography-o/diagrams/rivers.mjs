// geography-o river diagrams (drainage basin system, hydrograph, waterfall, V-valley, meander, oxbow lake).
// Run from repo root: node .scratch/geography-o/diagrams/rivers.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons/rivers`;
const { C } = D;
const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 13, ...o });

// ---------- 2. Storm hydrograph (rainfall peak 10:00, discharge peak 22:00, base flow 3, peak 18 m3/s)
{
  const base = 3, peak = 18, tRain = 10, tPeak = 22;
  // discharge: smooth rise to the peak at 22:00 then slower fall back to base flow (asymmetric curve)
  const q = (t) => {
    if (t <= 6) return base;
    if (t <= tPeak) { const u = (t - 6) / (tPeak - 6); return base + (peak - base) * (3 * u * u - 2 * u * u * u); }
    const u = Math.min(1, (t - tPeak) / 24); return base + (peak - base) * (1 - (3 * u * u - 2 * u * u * u)) ** 1.0;
  };
  const ax = D.axes({ x: [0, 48], y: [0, 20], xTicks: 6, yTicks: 4, xLabel: "Time from 00:00 on day 1 (hours)", yLabel: "Discharge (m³/s)", w: 580, h: 400, pad: { l: 64, r: 24, t: 30, b: 60 } });
  let b = ax.frame;
  for (const [t, hgt] of [[6, 3], [8, 6], [10, 8], [12, 5], [14, 2]]) b += D.rect(ax.X(t - 0.8), ax.Y(0) - 0, ax.X(t + 0.8) - ax.X(t - 0.8), 0, { fill: C.teal, stroke: C.teal }) + D.rect(ax.X(t - 0.8), ax.Y(20), ax.X(t + 0.8) - ax.X(t - 0.8), ax.Y(20 - hgt) - ax.Y(20), { fill: C.teal, stroke: "none" });
  b += D.text(ax.X(16), ax.Y(19.6), "Rainfall bars (peak at 10:00)", { anchor: "start", size: 13, fill: C.teal });
  const pts = []; for (let t = 0; t <= 48; t += 0.5) pts.push([t, q(t)]);
  b += ax.line(pts, { stroke: C.blue, width: 3 });
  b += ax.line([[0, base], [48, base]], { stroke: C.muted, width: 1.4, dash: true });
  b += ax.guides(tPeak, peak);
  b += ax.line([[tRain, 0], [tRain, 8]], { stroke: C.teal, width: 1.4, dash: true });
  b += ax.arrow(tRain, 12.5, tPeak, 12.5, { stroke: C.red, width: 2, arrowStart: true });
  b += ax.tag((tRain + tPeak) / 2, 12.5, "Lag time 12 h", { anchor: "middle", dy: -8, fill: C.red });
  b += ax.tag(tPeak + 1, peak, "Peak 18 m³/s", { dx: 40, dy: 4 });
  b += ax.tag(34, 3, "Base flow 3 m³/s", { dy: -10 });
  b += ax.tag(13.5, 9, "Rising limb", { anchor: "end", size: 13 });
  b += ax.tag(32, 13, "Falling limb", { dx: 6, size: 13 });
  const alt = "Storm hydrograph from the lesson's example: rainfall peaks at 10:00, discharge rises from a base flow of 3 m³/s to a peak of 18 m³/s at 22:00 (a lag time of 12 hours, a rise of 15 m³/s) and then falls back along the falling limb.";
  const cap = "Figure: a storm hydrograph with base flow, rising limb, peak discharge, falling limb and lag time";
  await D.figure(FAMILY, "storm-hydrograph", D.svg(580, 400, b), { alt, caption: cap });
  D.insertAfter(`${L}/drainage-basin.md`, "A **\"flashy\"** hydrograph", D.md("storm-hydrograph", alt, cap));
}

// ---------- 3. Waterfall formation and retreat (rivers/landforms-upper.md)
{
  let b = "";
  // soft rock body with plunge-pool notch
  b += D.polyline([[20, 170], [360, 170], [336, 206], [352, 252], [372, 282], [430, 282], [452, 252], [545, 252], [545, 340], [20, 340]], { fill: "#f1e1c8", stroke: C.ink, width: 2, close: true });
  // hard cap rock
  b += D.polyline([[20, 128], [364, 128], [364, 170], [20, 170]], { fill: "#bcb6ae", stroke: C.ink, width: 2, close: true });
  // plunge pool water and river above
  b += D.polyline([[20, 124], [350, 124]], { stroke: C.blue, width: 4 });
  b += D.path_("M352,124 C 372,124 378,150 380,200 L382,250", { stroke: C.blue, width: 4 });
  b += D.polyline([[352, 252], [372, 282], [430, 282], [452, 252]], { fill: C.fillBlue, stroke: C.blue, width: 2.4, close: true });
  b += D.arrow(300, 114, 340, 114, { stroke: C.blue, width: 2 });
  // labels
  b += lab(30, 112, "River flows to the right", { size: 12, fill: C.blue, anchor: "start" });
  b += lab(150, 154, "Hard rock (resistant)", { anchor: "middle" });
  b += lab(150, 230, "Soft rock (eroded faster)", { anchor: "middle" });
  b += lab(300, 190, "Overhang", { anchor: "end", dy: -4, size: 12 }) + D.line(304, 186, 352, 172, { stroke: C.muted, width: 1.4 });
  b += lab(400, 312, "Plunge pool", { anchor: "middle", size: 13 });
  b += D.line(400, 296, 400, 283, { stroke: C.muted, width: 1.4 });
  b += D.line(452, 252, 545, 252, { stroke: C.blue, width: 3 });
  // retreat
  b += D.arrow(330, 70, 190, 70, { stroke: C.red, width: 2.6 }) + D.text(260, 56, "Falls retreat upstream", { anchor: "middle", size: 14, weight: 700, fill: C.red });
  for (const [x, t] of [[470, "past 1"], [525, "past 2"]]) {
    b += D.line(x, 128, x, 250, { stroke: C.muted, width: 1.5, dash: true }) + D.text(x, 112, t, { anchor: "middle", size: 12, fill: C.muted });
  }
  b += D.text(498, 232, "gorge", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(20, 366, "Dashed lines: earlier positions of the falls. Collapse of the overhang moves the falls upstream.", { size: 12.5, fill: C.ink });
  const alt = "Long section of a waterfall: a hard rock cap lies over softer rock; the soft rock is eroded faster, a plunge pool is scoured and the hard rock overhangs, then collapses, so the falls retreat upstream and leave a gorge downstream.";
  const cap = "Figure: how a waterfall forms, retreats and leaves a gorge";
  await D.figure(FAMILY, "waterfall-retreat-gorge", D.svg(560, 376, b), { alt, caption: cap });
  D.insertAfter(`${L}/landforms-upper.md`, "6. The process repeats, and the waterfall", D.md("waterfall-retreat-gorge", alt, cap));
}

// ---------- 4. V-shaped valley and interlocking spurs
{
  let b = "";
  // cross-section (left)
  b += D.text(150, 24, "Cross-section", { anchor: "middle", size: 14, weight: 700 });
  b += D.polyline([[10, 60], [100, 170], [130, 230], [170, 230], [200, 170], [290, 60]], { stroke: C.ink, width: 2.6 });
  b += D.polyline([[10, 60], [100, 170], [130, 230], [170, 230], [200, 170], [290, 60], [290, 250], [10, 250]], { fill: "#e9d5b8", stroke: "none", close: true });
  b += D.polyline([[10, 60], [100, 170], [130, 230], [170, 230], [200, 170], [290, 60]], { stroke: C.ink, width: 2.6 });
  b += D.polyline([[132, 230], [168, 230], [162, 222], [138, 222]], { fill: C.blue, stroke: C.blue, close: true });
  b += D.text(150, 210, "river", { anchor: "middle", size: 12, fill: C.blue, weight: 700 });
  b += D.text(16, 196, "steep, straight\nvalley side", { size: 13, anchor: "start" });
  b += D.arrow(150, 270, 150, 238, { stroke: C.red, width: 2.4 }) + D.text(150, 288, "vertical erosion", { anchor: "middle", size: 12, fill: C.red });
  // plan view (right): interlocking spurs, river weaving
  b += D.text(430, 24, "Plan view", { anchor: "middle", size: 14, weight: 700 });
  const cx = 430;
  b += D.rect(320, 40, 220, 240, { stroke: C.grid, width: 1.5 });
  const spurL = (y) => D.polyline([[320, y - 22], [cx + 8, y], [320, y + 22]], { fill: "#e9d5b8", stroke: C.ink, width: 1.8, close: true });
  const spurR = (y) => D.polyline([[540, y - 22], [cx - 8, y], [540, y + 22]], { fill: "#e9d5b8", stroke: C.ink, width: 1.8, close: true });
  b += spurL(80) + spurL(170) + spurL(250) + spurR(125) + spurR(210);
  b += D.path_(`M${cx + 18},42 C ${cx + 30},60 ${cx + 28},70 ${cx + 22},80 C ${cx + 10},100 ${cx - 12},100 ${cx - 18},125 C ${cx - 24},150 ${cx + 10},150 ${cx + 22},170 C ${cx + 30},190 ${cx - 10},190 ${cx - 20},210 C ${cx - 28},230 ${cx + 10},230 ${cx + 22},250 C ${cx + 28},262 ${cx + 10},272 ${cx + 6},282`, { stroke: C.blue, width: 3 });
  b += D.text(430, 300, "river winds round interlocking spurs", { anchor: "middle", size: 12 });
  const alt = "A V-shaped valley in cross-section, with steep straight sides and a narrow floor cut by vertical erosion, and in plan view where a small river winds between ridges (interlocking spurs) that project alternately from each side.";
  const cap = "Figure: a V-shaped valley in cross-section and interlocking spurs in plan view";
  await D.figure(FAMILY, "v-valley-interlocking-spurs", D.svg(560, 312, b), { alt, caption: cap });
  D.insertAfter(`${L}/landforms-upper.md`, "Because the river is small and vertical erosion is dominant", D.md("v-valley-interlocking-spurs", alt, cap));
}

// ---------- 5. Meander: plan view and asymmetrical cross-section (rivers/landforms-lower.md)
{
  let b = "";
  b += D.text(150, 24, "Plan view", { anchor: "middle", size: 14, weight: 700 });
  b += D.rect(10, 34, 280, 250, { stroke: C.grid, width: 1.5 });
  const path = "M10,120 C 80,120 90,76 150,84 S 210,190 290,170";
  b += D.path_(path, { stroke: C.blue, width: 16 });
  b += D.path_(path, { stroke: "#bfe6f1", width: 11 });
  b += D.arrow(26, 118, 56, 116, { stroke: C.blue, width: 2.4 });
  // line A-B across the bend (outside to inside)
  b += D.line(140, 52, 140, 130, { stroke: C.ink, width: 1.6, dash: true });
  b += D.text(132, 50, "A", { anchor: "end", size: 15, weight: 700 }) + D.text(132, 142, "B", { anchor: "end", size: 15, weight: 700 });
  b += D.tag(150, 60, "river cliff (outside)", { anchor: "start", size: 12, fill: C.red });
  b += D.tag(24, 176, "slip-off slope (inside)", { anchor: "start", size: 12, fill: C.green });
  b += D.text(20, 214, "Outside of the bend: fast, deep,\nerosion, river cliff.", { size: 13 });
  b += D.text(20, 252, "Inside of the bend: slow, shallow,\ndeposition, slip-off slope.", { size: 13 });
  // cross-section A to B (right): A on the left (outside, cliff), B on the right (inside, slip-off slope)
  b += D.text(450, 24, "Cross-section A to B", { anchor: "middle", size: 14, weight: 700 });
  const prof = [[320, 110], [350, 112], [358, 200], [380, 240], [440, 252], [500, 235], [545, 195], [590, 160]];
  b += D.polyline([[357, 190], [358, 200], [380, 240], [440, 252], [500, 235], [545, 195], [551, 190]], { fill: "#bfe6f1", stroke: "none", close: true });
  b += D.polyline(prof, { stroke: C.ink, width: 2.6 });
  b += D.text(322, 100, "A", { size: 15, weight: 700 }) + D.text(584, 148, "B", { size: 15, weight: 700 });
  b += D.text(352, 278, "steep river cliff,\ndeep water", { anchor: "middle", size: 13 });
  b += D.text(512, 278, "gentle slip-off slope,\nshallow water", { anchor: "middle", size: 13 });
  const alt = "A meander in plan view with the fast, deep outside of the bend eroding a steep river cliff and the slow, shallow inside depositing a gentle slip-off slope, and a cross-section A to B across the bend showing the asymmetrical channel: steep cliff and deep water on one side, gentle slope and shallow water on the other.";
  const cap = "Figure: a meander in plan view and the asymmetrical cross-section A to B";
  await D.figure(FAMILY, "meander-plan-cross-section", D.svg(600, 312, b), { alt, caption: cap });
  D.insertAfter(`${L}/landforms-lower.md`, "**Cross-section across a meander**", D.md("meander-plan-cross-section", alt, cap));
}

// ---------- 6. Oxbow lake formation in four stages
{
  let b = "";
  const w = 136, step = 140;
  const stages = [
    ["1. Neck narrows", "erosion on outer banks"],
    ["2. Flood cuts neck", "takes the shortest route"],
    ["3. Bend sealed off", "deposition at the ends"],
    ["4. Oxbow lake", "later fills with silt"],
  ];
  stages.forEach(([t, sub], i) => {
    const ox = 6 + i * step;
    b += D.rect(ox, 34, w, 200, { stroke: C.grid, width: 1.5 });
    b += D.text(ox + w / 2, 22, `${i + 1}`, { anchor: "middle", size: 15, weight: 700, fill: C.amber });
    const y0 = i === 3 ? 138 : 150;
    const loop = `M${ox + 40},${y0} C ${ox + 18},50 ${ox + 118},50 ${ox + 96},${y0}`;
    const left = `M${ox + 2},150 L ${ox + 40},150`, right = `M${ox + 96},150 L ${ox + w - 2},150`;
    const river = (d, o = {}) => D.path_(d, { stroke: C.blue, width: 7, ...o });
    if (i === 0) {
      b += river(left) + river(loop) + river(right);
      b += D.arrow(ox + 50, 112, ox + 62, 112, { stroke: C.red, width: 2 }) + D.arrow(ox + 86, 112, ox + 74, 112, { stroke: C.red, width: 2 });
    } else if (i === 1) {
      b += river(left) + river(loop) + river(right);
      b += D.line(ox + 40, 150, ox + 96, 150, { stroke: C.red, width: 4, dash: true });
      b += D.text(ox + w / 2, 176, "flood", { anchor: "middle", size: 13, fill: C.red });
    } else if (i === 2) {
      b += river(left) + river(`M${ox + 40},150 L ${ox + 96},150`) + river(right) + river(loop);
      b += D.rect(ox + 33, 142, 9, 16, { fill: C.amber, stroke: C.amber }) + D.rect(ox + 94, 142, 9, 16, { fill: C.amber, stroke: C.amber });
    } else {
      b += river(`M${ox + 2},150 L ${ox + w - 2},150`);
      b += D.path_(loop, { stroke: C.teal, width: 9 });
      b += D.text(ox + w / 2, 112, "oxbow\nlake", { anchor: "middle", size: 13, weight: 700, fill: C.blue });
    }
    b += D.text(ox + w / 2, 254, t, { anchor: "middle", size: 13, weight: 700 });
    b += D.text(ox + w / 2, 272, sub, { anchor: "middle", size: 12, fill: C.muted });
  });
  const alt = "Four plan views of oxbow lake formation: erosion on the outer banks narrows the neck between two bends; in a flood the river cuts through the neck; deposition seals the old bend off from the new straight channel; the abandoned bend becomes a horseshoe-shaped oxbow lake.";
  const cap = "Figure: four stages in the formation of an oxbow lake";
  await D.figure(FAMILY, "oxbow-lake-stages", D.svg(570, 290, b), { alt, caption: cap });
  D.insertAfter(`${L}/landforms-lower.md`, "4. The abandoned bend becomes a horseshoe-shaped", D.md("oxbow-lake-stages", alt, cap));
}
console.log("rivers done");
