// geography-a coastal figures. Run: node .scratch/geography-a/diagrams/coastal.mjs
import { D, C, make, lab, T } from "./_h.mjs";
const G = (body, x, y) => D.group(body, { translate: [x, y] });
const SAND = "#f1d9a8", SEA = "#d6eef7", ROCK = "#d8d3ca";

// ---------- 1. Longshore drift (plan)
{
  const w = 580, h = 360;
  let b = D.rect(10, 10, 560, 230, { fill: SEA, stroke: "none" }) + D.rect(10, 240, 560, 110, { fill: "#e9d5b8", stroke: "none" });
  b += D.rect(10, 240, 560, 56, { fill: SAND, stroke: "none" }) + D.line(10, 240, 570, 240, { stroke: C.ink, width: 2.4 });
  // wave crests (direction of travel: down-right); crest lines run up-right
  [[40, 120], [150, 110], [260, 100], [370, 90], [480, 80]].forEach(([x, y]) => { b += D.line(x, y + 70, x + 70, y, { stroke: C.teal, width: 3 }); });
  [[20, 190], [130, 190], [240, 190], [350, 190], [460, 190]].forEach(([x, y]) => { b += D.line(x, y + 40, x + 40, y, { stroke: C.teal, width: 3 }); });
  b += D.arrow(80, 60, 130, 110, { stroke: C.blue, width: 2.6 }) + lab(150, 52, "Waves arrive at an angle (wind direction)", { anchor: "start", size: 12, fill: C.blue });
  // zig-zag
  const pts = [[60, 246], [105, 290], [105, 246], [150, 290], [150, 246], [195, 290], [195, 246], [240, 290], [240, 246], [285, 290], [285, 246], [330, 290]];
  b += D.polyline(pts, { stroke: C.red, width: 2.2 });
  for (let i = 0; i < pts.length - 1; i += 2) b += D.dot(pts[i][0], pts[i][1], { r: 3, stroke: C.red });
  b += lab(90, 316, "Swash: up the beach at the wave angle", { anchor: "start", size: 12, fill: C.red });
  b += lab(90, 338, "Backwash: straight down the slope", { anchor: "start", size: 12, fill: C.red });
  b += D.arrow(360, 316, 540, 316, { stroke: C.ink, width: 3 }) + lab(450, 300, "Net movement: longshore drift", { anchor: "middle", size: 12 });
  b += D.text(20, 226, "SEA", { size: 13, weight: 700, fill: C.teal }) + D.text(560, 262, "BEACH", { anchor: "end", size: 13, weight: 700 });
  await make("longshore-drift-plan", w, h, b,
    "Longshore drift in plan: waves arrive at an angle, swash carries sediment up the beach in the direction of the wave, backwash returns it straight down the slope, and the zig-zag path moves the sediment steadily along the coast in one direction.",
    "Figure: longshore drift as a zig-zag path of swash and backwash (plan view)",
    "coastal/waves-erosion-transport", "**Deposition** occurs when wave energy falls");
}

// ---------- 2. Sediment budget (40 000 + 15 000 + 10 000 in; 50 000 + 5 000 out)
{
  const inp = [["Cliff erosion", 40000], ["River", 15000], ["Sea floor", 10000]];
  const out = [["Longshore drift", 50000], ["Dredging", 5000]];
  const tin = inp.reduce((a, [, v]) => a + v, 0), tout = out.reduce((a, [, v]) => a + v, 0);
  const f = (v) => v.toLocaleString("en-GB").replace(",", " ");
  const w = 580, h = 330;
  let b = "";
  inp.forEach(([n, v], i) => { const y = 40 + i * 80; b += D.node(10, y, 150, 50, `${n}\n${f(v)} m³`, { fill: C.fillBlue, size: 13 }) + D.line(160, y + 25, 230, 155, { stroke: C.teal, width: Math.max(3, v / 4000) }); });
  b += D.node(230, 100, 130, 110, `BEACH (store)\nIn: ${f(tin)}\nOut: ${f(tout)}`, { fill: C.fillAmber, size: 13, weight: 700 });
  out.forEach(([n, v], i) => { const y = 70 + i * 110; b += D.line(360, 155, 420, y + 25, { stroke: C.amber, width: Math.max(3, v / 4000) }) + D.node(420, y, 150, 50, `${n}\n${f(v)} m³`, { fill: C.fillAmber, size: 13 }); });
  b += D.text(10, 20, "Inputs (m³ per year)", { size: 14, weight: 700 }) + D.text(570, 20, "Outputs (m³ per year)", { anchor: "end", size: 14, weight: 700 });
  b += D.rect(60, 280, 460, 38, { fill: "#fff", stroke: C.ink, width: 1.2, r: 6 }) + D.text(290, 304, `Net change = ${f(tin)} − ${f(tout)} = +${f(tin - tout)} m³ a year: the beach is building`, { anchor: "middle", size: 13.5, weight: 700 });
  await make("sediment-budget-beach", w, h, b,
    "Sediment budget of a beach: inputs of 40 000 m3 from cliff erosion, 15 000 m3 from a river and 10 000 m3 from the sea floor total 65 000 m3 a year, outputs of 50 000 m3 by longshore drift and 5 000 m3 by dredging total 55 000 m3, so the net gain is 10 000 m3 a year and the beach builds out.",
    "Figure: inputs and outputs of a beach sediment budget (worked-example values; arrow thickness shows size)",
    "coastal/waves-erosion-transport", "Sediment budget and drift rate");
}

// ---------- 3. Cliff notch and shore platform to scale (horizontal) with vertical exaggeration
{
  const w = 580, h = 330;
  const ax = D.axes({ x: [-30, 180], y: [-3, 22], w, h, xTicks: 20, yTicks: [0, 5, 10, 15, 20], xLabel: "Distance seaward of cliff foot (m)", yLabel: "Height above low tide (m)", origin: false, pad: { b: 56, t: 30 } });
  let b = ax.frame;
  const base = 2.8;
  b += D.polyline([[ax.X(-30), ax.Y(-3)], [ax.X(-30), ax.Y(base + 15)], [ax.X(0), ax.Y(base + 15)], [ax.X(0), ax.Y(base + 1)], [ax.X(-3), ax.Y(base + 0.2)], [ax.X(-3), ax.Y(base - 0.3)], [ax.X(0), ax.Y(base)], [ax.X(160), ax.Y(0)], [ax.X(180), ax.Y(-1)], [ax.X(180), ax.Y(-3)]], { fill: ROCK, stroke: C.ink, width: 2.4, close: true });
  b += D.rect(ax.X(160) + 0, ax.Y(0) - 0, ax.X(180) - ax.X(160), ax.Y(-3) - ax.Y(0), { fill: "none", stroke: "none" });
  b += D.line(ax.X(36), ax.Y(base + 15), ax.X(36), ax.Y(base * (1 - 36 / 160)), { stroke: C.red, width: 2, dash: true });
  b += D.arrow(ax.X(36), ax.Y(19), ax.X(1), ax.Y(19), { stroke: C.red, width: 2.2 }) + lab(ax.X(40), ax.Y(19) + 4, "Cliff 18 years ago (36 m back = 2 m a year)", { anchor: "start", size: 12, fill: C.red });
  b += lab(ax.X(-27), ax.Y(10), "Cliff: 15 m high", { anchor: "start", size: 12 });
  b += lab(ax.X(6), ax.Y(8.5), "Wave-cut notch", { anchor: "start", size: 12 }) + D.line(ax.X(5), ax.Y(8.5) + 2, ax.X(-2), ax.Y(base + 0.8), { stroke: C.muted, width: 1.3 });
  b += lab(ax.X(60), ax.Y(7), "Shore platform: 160 m wide,", { anchor: "start", size: 12 }) + lab(ax.X(60), ax.Y(7) + 22, "falls 2.8 m = 1 in 57 (1.0°)", { anchor: "start", size: 12 });
  b += D.line(ax.X(0), ax.Y(0), ax.X(160), ax.Y(0), { stroke: C.blue, width: 1.6, dash: true }) + T(ax.X(175), ax.Y(0) - 6, "Low tide", { anchor: "end", fill: C.blue, size: 12 });
  b += D.text(ax.X(180), ax.Y(21) + 2, "Height scale exaggerated about ×4", { anchor: "end", size: 11.5, fill: C.muted });
  await make("cliff-notch-shore-platform", w, h, b,
    "Cliff and shore platform: waves cut a notch at the foot of a 15 m cliff, the cliff collapses and retreats 36 m in 18 years (2 m a year), and a very gentle platform 160 m wide that falls only 2.8 m (1 in 57, about 1 degree) is left behind; the height scale is exaggerated.",
    "Figure: cliff retreat, wave-cut notch and shore platform (values from the lesson examples, height exaggerated about four times)",
    "coastal/erosional-landforms", "## Shore platforms");
}

// ---------- 4. Cave -> arch -> stack -> stump
{
  const w = 580, h = 280;
  const pw = 140;
  const panel = (title, shapes) => D.rect(0, 0, pw, 200, { fill: "#fff", stroke: C.grid, width: 1 }) + D.rect(0, 150, pw, 50, { fill: SEA, stroke: "none" }) + D.line(0, 150, pw, 150, { stroke: C.blue, width: 1.5, dash: true }) + D.text(pw / 2, 20, title, { anchor: "middle", size: 14, weight: 700 }) + shapes;
  const land = (x1) => D.polyline([[0, 60], [x1, 60], [x1 + 8, 150], [0, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true });
  let b = "";
  b += G(panel("1 Cave", land(105) + D.path_("M96,150 L96,124 Q108,106 120,124 L118,150 Z", { fill: "#6b6761", stroke: C.ink, width: 1.4 })), 4, 6);
  b += G(panel("2 Arch", D.polyline([[0, 60], [130, 60], [136, 150], [0, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true }) + D.path_("M76,150 L76,112 Q96,86 116,112 L116,150 Z", { fill: SEA, stroke: C.ink, width: 1.4 })), 148, 6);
  b += G(panel("3 Stack", D.polyline([[0, 60], [34, 60], [40, 150], [0, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true }) + D.polyline([[84, 70], [112, 70], [116, 150], [80, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true })), 292, 6);
  b += G(panel("4 Stump", D.polyline([[0, 60], [34, 60], [40, 150], [0, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true }) + D.polyline([[88, 130], [108, 130], [112, 150], [84, 150]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true })), 436, 6);
  const cap = ["Waves widen\na joint", "Cave cut right through\nthe headland", "Roof collapses:\na column is left", "Erosion shrinks\nit to a stump"];
  cap.forEach((c, i) => { b += D.text(4 + i * 144 + 70, 224, c, { anchor: "middle", size: 12.5 }); });
  b += D.text(290, 270, "Side view of a headland; dashed line = sea level", { anchor: "middle", size: 12, fill: C.muted });
  await make("cave-arch-stack-stump", w, h, b,
    "Sequence of headland landforms: waves widen a joint into a cave, a cave cut right through the headland makes an arch, the roof collapses to leave a stack, and further erosion and weathering reduce the stack to a stump.",
    "Figure: cave, arch, stack and stump (schematic sequence)",
    "coastal/erosional-landforms", "## Caves, geos, arches, stacks and stumps");
}

// ---------- 5. Concordant and discordant coasts (plan)
{
  const w = 580, h = 330;
  const pw = 280;
  const bands = ["#d8d3ca", "#b9b4ab", "#e9d5b8"];
  let b = "";
  // concordant
  let p = D.rect(0, 0, pw, 296, { fill: "#fff", stroke: C.grid, width: 1 }) + D.text(pw / 2, 20, "Concordant coast", { anchor: "middle", size: 14, weight: 700 });
  p += D.rect(0, 30, pw, 70, { fill: SEA, stroke: "none" });
  [[100, "Hard rock (outer band)", 0], [150, "Soft rock", 2], [200, "Hard rock", 1]].forEach(([y, t, k]) => { p += D.rect(0, y, pw, 50, { fill: y === 100 ? "#b9b4ab" : y === 150 ? "#e9d5b8" : "#b9b4ab", stroke: C.ink, width: 1.4 }) + D.text(pw / 2, y + 30, t, { anchor: "middle", size: 12 }); });
  p += D.line(0, 100, pw, 100, { stroke: C.ink, width: 2.6 }) + D.text(8, 64, "Sea", { size: 13, weight: 700, fill: C.teal });
  p += D.text(pw / 2, 268, "Bands parallel to the coast: straight coast", { anchor: "middle", size: 12 }) + D.text(pw / 2, 286, "(sea breaches the hard band: cove)", { anchor: "middle", size: 12 });
  b += G(p, 10, 8);
  // discordant
  p = D.rect(0, 0, pw, 296, { fill: "#fff", stroke: C.grid, width: 1 }) + D.text(pw / 2, 20, "Discordant coast", { anchor: "middle", size: 14, weight: 700 });
  p += D.rect(0, 30, pw, 120, { fill: SEA, stroke: "none" });
  const cols = [[0, 70, "#e9d5b8", 130, "Bay"], [70, 140, "#b9b4ab", 85, "Headland"], [140, 210, "#e9d5b8", 130, "Bay"], [210, 280, "#b9b4ab", 85, "Headland"]];
  cols.forEach(([x0, x1, f, top, t]) => { p += D.rect(x0, top, x1 - x0, 250 - top, { fill: f, stroke: C.ink, width: 1.4 }); p += D.text((x0 + x1) / 2, top - 6, t, { anchor: "middle", size: 12, weight: 600 }); });
  p += D.text(8, 64, "Sea", { size: 13, weight: 700, fill: C.teal });
  p += D.text(pw / 2, 268, "Hard (dark) and soft (light) bands meet the sea:", { anchor: "middle", size: 12 }) + D.text(pw / 2, 286, "headlands and bays alternate", { anchor: "middle", size: 12 });
  b += G(p, 290, 8);
  b += D.text(290, 322, "Plan views, sea at the top. Dark grey = hard rock; light brown = soft rock.", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("concordant-discordant-coasts", w, 336, b,
    "Concordant and discordant coasts in plan: on a concordant coast the rock bands run parallel to the coast and give a fairly straight shoreline, while on a discordant coast bands of hard and soft rock meet the sea at right angles, so resistant rock forms headlands and soft rock forms bays.",
    "Figure: concordant and discordant coastlines compared (plan view, schematic)",
    "coastal/erosional-landforms", "## Concordant and discordant coasts");
}

// ---------- 6. Beach profiles: shingle vs sand (values from the worked example)
{
  const w = 560, h = 380;
  const ax = D.axes({ x: [0, 72], y: [0, 3], w, h, xTicks: 10, yTicks: 0.5, xLabel: "Horizontal distance (m)", yLabel: "Height (m)", pad: { b: 56 } });
  let b = ax.frame;
  b += ax.line([[0, 0], [18, 2.7]], { stroke: C.amber, width: 3.2 }) + ax.line([[0, 0], [70, 1.4]], { stroke: C.blue, width: 3.2 });
  b += ax.point(18, 2.7, { stroke: C.amber, r: 5 }) + ax.point(70, 1.4, { stroke: C.blue, r: 5 });
  b += lab(ax.X(21), ax.Y(2.7) + 6, "Shingle: 2.7 ÷ 18 = 0.15 (15%), 8.5°", { anchor: "start", size: 12, fill: C.amber });
  b += lab(ax.X(26), ax.Y(0.5) - 18, "Sand: 1.4 ÷ 70 = 0.02 (2%), 1.1°", { anchor: "start", size: 12, fill: C.blue });
  b += D.text(ax.X(72), ax.Y(2.95) + 4, "Height scale exaggerated", { anchor: "end", size: 11.5, fill: C.muted });
  await make("beach-profiles-shingle-sand", w, h, b,
    "Beach profiles compared: the shingle beach rises 2.7 m in 18 m (a gradient of 0.15, 15 percent, 8.5 degrees) while the sandy beach rises only 1.4 m in 70 m (0.02, 2 percent, 1.1 degrees), because swash sinks into permeable shingle and the weak backwash cannot pull it down.",
    "Figure: shingle and sandy beach profiles drawn from the worked-example measurements (height scale exaggerated)",
    "coastal/depositional-landforms", "Gradient of a beach");
}

// ---------- 7. Spit formation (plan)
{
  const w = 580, h = 400;
  let b = D.rect(10, 10, 560, 380, { fill: SEA, stroke: "none" });
  // mainland (left and bottom)
  b += D.polyline([[10, 130], [240, 130], [262, 200], [282, 290], [310, 390], [10, 390]], { fill: "#e9d5b8", stroke: C.ink, width: 2.2, close: true });
  b += D.text(60, 260, "Mainland", { size: 14, weight: 700 });
  // spit
  b += D.path_("M240,130 L420,130 Q470,130 484,186", { stroke: "#e8c97a", width: 22 });
  b += D.path_("M240,130 L420,130 Q470,130 484,186", { stroke: C.ink, width: 1.4, dash: true });
  // saltmarsh
  b += D.polyline([[300, 160], [400, 160], [430, 196], [380, 232], [310, 224]], { fill: C.fillGreen, stroke: C.green, width: 1.5, close: true });
  b += T(364, 200, "Saltmarsh", { anchor: "middle", fill: C.green });
  b += T(364, 262, "Sheltered, shallow water", { anchor: "middle", fill: C.muted, size: 12 });
  b += D.arrow(40, 90, 200, 120, { stroke: C.ink, width: 3 }) + lab(20, 72, "Longshore drift", { anchor: "start", size: 12 });
  b += D.arrow(460, 30, 410, 98, { stroke: C.blue, width: 2.4 }) + lab(560, 40, "Waves from a second direction", { anchor: "end", size: 12, fill: C.blue });
  b += lab(540, 250, "Recurved end (hook)", { anchor: "end", size: 12 }) + D.line(500, 230, 484, 196, { stroke: C.muted, width: 1.3 });
  b += lab(260, 290, "Coast changes direction here", { anchor: "start", size: 12, fill: C.red }) + D.line(300, 272, 252, 140, { stroke: C.red, width: 1.3 });
  b += lab(330, 108, "SPIT: ridge of sand or shingle", { anchor: "start", size: 12 });
  b += D.text(540, 300, "Open sea", { anchor: "end", size: 13, weight: 700, fill: C.teal });
  b += D.rect(10, 10, 560, 380, { stroke: C.grid, width: 1 });
  await make("spit-formation-plan", w, h, b,
    "Spit formation in plan: longshore drift carries sediment along the coast and, where the coast changes direction, deposits it beyond the bend as a ridge in sheltered water; waves from a second direction curve the end into a hook and saltmarsh forms in the sheltered water behind.",
    "Figure: how a spit forms and its parts (plan view, schematic)",
    "coastal/depositional-landforms", "## Spits");
}

// ---------- 8. Groynes: build-up updrift and erosion downdrift
{
  const w = 580, h = 330;
  const water = [[10, 140], [200, 146], [300, 172], [420, 200], [570, 208]];
  const back = [[10, 176], [250, 180], [300, 184], [420, 206], [570, 214]];
  let b = D.rect(10, 10, 560, 310, { fill: SEA, stroke: "none" });
  b += D.polyline([...water, ...[...back].reverse()], { fill: SAND, stroke: "none", close: true });
  b += D.polyline([...back, [570, 320], [10, 320]], { fill: "#e9d5b8", stroke: C.ink, width: 2.2, close: true });
  b += D.polyline(water, { stroke: C.blue, width: 1.6, dash: true });
  [60, 140, 220].forEach((x) => { const yw = 140 + (x - 10) * 0.032; b += D.line(x, yw - 26, x, yw + 40, { stroke: "#6b4f2a", width: 6 }); });
  b += D.line(420, 190, 570, 194, { stroke: C.red, width: 2, dash: true });
  b += lab(570, 262, "Cliff retreats faster (starved of sediment)", { anchor: "end", size: 12, fill: C.red });
  b += D.arrow(30, 58, 380, 58, { stroke: C.ink, width: 3 }) + lab(40, 42, "Longshore drift", { anchor: "start", size: 12 });
  b += lab(60, 98, "Groynes (timber or rock)", { anchor: "start", size: 12 });
  b += lab(30, 218, "Beach builds up:", { anchor: "start", size: 12, fill: C.green }) + lab(30, 238, "cliff protected", { anchor: "start", size: 12, fill: C.green });
  b += lab(30, 304, "Little sediment passes the groynes: the coast down the drift is starved", { anchor: "start", size: 12 });
  b += D.text(560, 30, "Sea", { anchor: "end", size: 13, weight: 700, fill: C.teal }) + D.text(560, 280, "Land", { anchor: "end", size: 13, weight: 700 });
  await make("groynes-downdrift-erosion", w, h, b,
    "Groynes in plan: they trap sediment moved by longshore drift so the beach builds up on the updrift side and protects the cliff, but little sediment passes them, so the coast further down the drift is starved and erodes faster, as at Mappleton and Cowden on the Holderness coast.",
    "Figure: groynes trap sediment updrift and starve the coast downdrift (plan view, schematic)",
    "coastal/management-case", "## Strategies and their evaluation");
}
