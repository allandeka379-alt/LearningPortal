// geography-a arid and tropical landform figures. Run: node .scratch/geography-a/diagrams/arid.mjs
import { D, C, make, lab, T } from "./_h.mjs";
const G = (body, x, y) => D.group(body, { translate: [x, y] });
const SAND = "#f1d9a8", ROCK = "#d8d3ca", SOIL = "#e9d5b8";

// ---------- 1. Dune types (plan view)
{
  const w = 580, h = 290;
  const pw = 186;
  const fr = (t) => D.rect(0, 0, pw, 230, { fill: "#fff", stroke: C.grid, width: 1 }) + D.text(pw / 2, 20, t, { anchor: "middle", size: 14, weight: 700 });
  let b = "";
  // barchan: wind left to right
  let p = fr("Barchan dune");
  p += D.path_("M130,60 C70,76 44,112 44,120 C44,128 70,164 130,180 C108,150 100,138 100,120 C100,102 108,90 130,60 Z", { fill: SAND, stroke: C.ink, width: 2 });
  p += D.arrow(8, 120, 50, 120, { stroke: C.blue, width: 2.4 }) + T(8, 108, "Wind", { fill: C.blue });
  p += T(pw / 2, 206, "Crescent; horns point downwind", { anchor: "middle", size: 12 }) + T(pw / 2, 222, "Gentle windward, steep slip face", { anchor: "middle", size: 12 });
  p += T(110, 50, "Slip face", { anchor: "start", size: 12 }).replace("", "") + D.line(112, 56, 112, 96, { stroke: C.muted, width: 1.2 });
  b += G(p, 4, 6);
  // seif: parallel ridges, wind from two directions in narrow range
  p = fr("Seif (linear) dune");
  [[60, 0], [105, 0], [150, 0]].forEach(([y]) => { p += D.path_(`M20,${y + 30} C60,${y + 14} 100,${y + 50} 166,${y + 26}`, { stroke: "#c9a85a", width: 14 }) + D.path_(`M20,${y + 30} C60,${y + 14} 100,${y + 50} 166,${y + 26}`, { stroke: C.ink, width: 1.2, dash: true }); });
  p += D.arrow(16, 34, 90, 52, { stroke: C.blue, width: 2.2 }) + D.arrow(16, 70, 90, 56, { stroke: C.blue, width: 2.2 });
  p += T(pw / 2, 206, "Long ridge parallel to the wind;", { anchor: "middle", size: 12 }) + T(pw / 2, 222, "winds from two close directions", { anchor: "middle", size: 12 });
  b += G(p, 196, 6);
  // star
  p = fr("Star dune");
  const cx = 93, cy = 112, pts = [];
  for (let i = 0; i < 12; i += 1) { const a = (i * Math.PI) / 6 - Math.PI / 2; const r = i % 2 === 0 ? 70 : 22; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  p += D.polyline(pts, { fill: SAND, stroke: C.ink, width: 2, close: true });
  [[0, 0], [60, 0], [120, 0], [180, 0], [240, 0], [300, 0]].forEach(([deg]) => { const a = (deg * Math.PI) / 180; p += D.arrow(cx + 88 * Math.cos(a), cy + 88 * Math.sin(a), cx + 76 * Math.cos(a), cy + 76 * Math.sin(a), { stroke: C.blue, width: 1.8 }).replace("", ""); });
  p += T(pw / 2, 206, "Pyramid with several arms;", { anchor: "middle", size: 12 }) + T(pw / 2, 222, "winds from many directions", { anchor: "middle", size: 12 });
  b += G(p, 388, 6);
  b += D.text(290, 270, "Plan views from above; blue arrows show wind direction; sand shown in yellow.", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("dune-types-plan", w, h, b,
    "Three dune types in plan: a barchan is a crescent with its horns pointing downwind, formed by a single wind direction and limited sand; a seif is a long ridge parallel to the wind from two close wind directions; a star dune is a pyramid with several arms where winds blow from many directions.",
    "Figure: barchan, seif and star dunes and the winds that form them (plan view, schematic)",
    "arid/water-landforms", "## Wind landforms");
}

// ---------- 2. Mountain front: pediment, alluvial fan, bajada, playa (14 m over 700 m)
{
  const w = 580, h = 330;
  let b = "";
  b += D.polyline([[10, 316], [10, 60], [60, 40], [130, 90], [190, 190], [200, 200], [330, 224], [400, 240], [450, 262], [570, 262], [570, 316]], { fill: ROCK, stroke: C.ink, width: 2.4, close: true });
  b += D.polyline([[300, 222], [330, 224], [400, 240], [450, 262], [400, 258], [330, 244]], { fill: SAND, stroke: C.ink, width: 1.4, close: true });
  b += D.polyline([[470, 262], [570, 262], [570, 270], [470, 270]], { fill: "#ffffff", stroke: C.ink, width: 1.4, close: true });
  b += lab(60, 30, "Mountain front: steep, bare rock", { anchor: "start", size: 12 });
  b += lab(20, 250, "Break of slope", { anchor: "start", size: 12, fill: C.red }) + D.line(60, 240, 190, 198, { stroke: C.red, width: 1.3 });
  b += lab(60, 290, "Pediment: gentle bedrock (14 m fall in 700 m: 2%, 1.1°)", { anchor: "start", size: 12 }) + D.line(260, 270, 262, 232, { stroke: C.muted, width: 1.3 });
  b += lab(280, 196, "Alluvial fans merge into a bajada", { anchor: "start", size: 12 }) + D.line(360, 202, 372, 232, { stroke: C.muted, width: 1.3 });
  b += lab(570, 238, "Playa: flat salt and silt", { anchor: "end", size: 12 }) + D.line(520, 244, 520, 261, { stroke: C.muted, width: 1.3 });
  b += D.arrow(150, 78, 205, 172, { stroke: C.blue, width: 2.4 }) + T(214, 150, "Flash floods", { anchor: "start", fill: C.blue, size: 12 });
  b += D.text(20, 304, "Not to scale; height exaggerated.", { size: 11.5, fill: C.muted });
  await make("arid-mountain-front-landforms", w, h, b,
    "Arid landform sequence from a mountain front: steep bare rock, a sharp break of slope, a gently sloping pediment that falls 14 m in 700 m (2 percent, 1.1 degrees), alluvial fans that merge into a bajada, and a flat playa of salt and silt in the basin of internal drainage.",
    "Figure: mountain front, pediment, alluvial fans, bajada and playa (schematic, height exaggerated)",
    "arid/water-landforms", "## Water landforms");
}

// ---------- 3. Wind transport modes
{
  const w = 580, h = 330;
  let b = D.rect(10, 270, 560, 50, { fill: SOIL, stroke: C.ink, width: 1.8 });
  // wind arrows
  [60, 130, 200].forEach((y) => { b += D.arrow(20, y, 70, y, { stroke: C.blue, width: 2.2, dash: true }); });
  b += T(20, 40, "Wind", { fill: C.blue, size: 13 });
  // suspension
  for (const [x, y] of [[200, 60], [250, 84], [300, 52], [350, 90], [400, 66], [450, 100], [500, 76]]) b += D.circle(x, y, 2.5, { fill: C.muted, stroke: C.muted, width: 1 });
  b += lab(300, 40, "Suspension: silt and clay (dust), carried far", { anchor: "middle", size: 12 });
  // saltation arcs
  for (const x0 of [100, 190, 280, 370]) b += D.path_(`M${x0},268 Q${x0 + 40},170 ${x0 + 80},268`, { stroke: C.amber, width: 2.2, arrow: true });
  b += lab(300, 150, "Saltation: sand grains bounce in hops, up to about 1 m high", { anchor: "middle", size: 12, fill: C.amber });
  // traction
  for (const x of [440, 480, 520]) { b += D.circle(x, 262, 7, { fill: "#b9b4ab", stroke: C.ink, width: 1.4 }); }
  b += D.arrow(450, 252, 540, 252, { stroke: C.red, width: 1.8 }).replace("", "");
  b += lab(570, 300, "Traction: coarse grains roll", { anchor: "end", size: 12, fill: C.red });
  b += lab(10, 336, "", { size: 1 }).replace(/.*/, "");
  b += D.text(20, 296, "Ground surface", { size: 12, fill: C.ink });
  await make("wind-transport-modes", w, 330, b,
    "Wind transports sediment in three ways: fine silt and clay travel in suspension high in the air, sand grains bounce along the surface in saltation (the main process, up to about a metre high), and coarse grains roll along the ground by traction.",
    "Figure: suspension, saltation and traction in wind transport (schematic)",
    "arid/weathering-wind", "| Traction (surface creep)");
}

// ---------- 4. Two-stage formation of a dwala (granite dome)
{
  const w = 580, h = 316;
  const pw = 280;
  const fr = (t) => D.rect(0, 0, pw, 270, { fill: "#fff", stroke: C.grid, width: 1 }) + D.text(pw / 2, 20, t, { anchor: "middle", size: 14, weight: 700 });
  let b = "";
  let p = fr("Stage 1: deep weathering");
  p += D.rect(0, 80, pw, 190, { fill: SOIL, stroke: "none" }) + D.line(0, 80, pw, 80, { stroke: C.ink, width: 2 });
  p += D.path_("M90,270 C95,175 115,132 140,130 C165,132 185,175 190,270 Z", { fill: ROCK, stroke: C.ink, width: 2 });
  [[40, 200], [250, 190], [20, 140], [250, 120]].forEach(([x, y]) => { p += D.circle(x, y, 11, { fill: ROCK, stroke: C.ink, width: 1.4 }); });
  p += D.path_("M0,262 C40,262 80,230 90,170 C100,112 180,112 190,170 C200,230 240,262 280,262", { stroke: C.red, width: 2, dash: true });
  p += T(pw / 2, 102, "Soil and weathered rock (regolith)", { anchor: "middle", size: 12 }) + T(140, 190, "Massive", { anchor: "middle", size: 12, weight: 700 }) + T(140, 206, "rock: fresh", { anchor: "middle", size: 12, weight: 700 }) + T(140, 222, "core", { anchor: "middle", size: 12, weight: 700 });
  p += T(6, 238, "Jointed rock", { size: 11.5 }) + T(6, 252, "rotted deeply", { size: 11.5 });
  b += G(p, 10, 6);
  p = fr("Stage 2: stripping");
  p += D.rect(0, 200, pw, 70, { fill: SOIL, stroke: "none" }) + D.line(0, 200, pw, 200, { stroke: C.ink, width: 2 });
  p += D.path_("M90,270 L90,230 C95,150 110,86 140,66 C170,86 185,150 190,230 L190,270 Z", { fill: ROCK, stroke: C.ink, width: 2 });
  [[40, 214], [250, 214], [20, 232]].forEach(([x, y]) => { p += D.circle(x, y, 10, { fill: ROCK, stroke: C.ink, width: 1.4 }); });
  p += T(pw / 2, 40, "Dwala exposed; corestones", { anchor: "middle", size: 12 }) + T(pw / 2, 55, "left on the plain", { anchor: "middle", size: 12 });
  p += T(6, 120, "Flank: 180 m", { size: 11.5, fill: C.red }) + T(6, 134, "in 300 m = 60%", { size: 11.5, fill: C.red }) + T(6, 148, "(31°)", { size: 11.5, fill: C.red });
  p += T(196, 236, "Plain: 1-2°", { size: 12 });
  p += T(196, 172, "Regolith", { size: 11.5 }) + T(196, 186, "stripped", { size: 11.5 });
  b += G(p, 296, 6);
  b += D.text(290, 300, "Sharp break of slope where the steep dome meets the gentle plain. Schematic cross-sections.", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("dwala-two-stage-formation", w, h, b,
    "Two-stage formation of a granite dwala: in stage 1 chemical weathering rots closely jointed rock deeply beneath the surface while massive unjointed rock remains as a fresh core; in stage 2 the weathered cover is stripped away, exposing a steep dome (a flank of 180 m in 300 m is a 60 percent gradient, 31 degrees) with a sharp break of slope at its foot.",
    "Figure: two-stage deep weathering and stripping explains a dwala (schematic cross-sections)",
    "tropical/landforms-granite-karst", "### Theories of formation");
}

// ---------- 5. Karst cross-section
{
  const w = 580, h = 330;
  let b = D.rect(10, 20, 560, 40, { fill: C.fillGreen, stroke: "none" });
  b += D.polyline([[10, 60], [180, 60], [200, 100], [240, 100], [260, 60], [570, 60], [570, 310], [10, 310]], { fill: ROCK, stroke: C.ink, width: 2.2, close: true });
  // joints
  [[100, 60, 110, 200], [220, 100, 214, 220], [380, 60, 390, 210], [470, 60, 462, 200]].forEach(([x1, y1, x2, y2]) => { b += D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2, dash: true }); });
  // sinkhole (shaft) and cave
  b += D.polyline([[212, 100], [226, 100], [222, 190]], { stroke: C.blue, width: 2.2 });
  b += D.path_("M150,230 C170,190 270,190 320,225 C330,240 300,262 250,262 C200,262 140,258 150,230 Z", { fill: "#fff", stroke: C.ink, width: 2 });
  b += D.polyline([[160, 248], [320, 252], [420, 280], [570, 284]], { stroke: C.blue, width: 3 });
  b += D.arrow(500, 276, 546, 278, { stroke: C.blue, width: 2.2 });
  // stalactites
  [190, 215, 245, 275].forEach((x) => { b += D.polyline([[x - 5, 196], [x + 5, 196], [x, 212]], { fill: "#e6e2dc", stroke: C.ink, width: 1.2, close: true }); });
  b += D.line(10, 270, 570, 270, { stroke: C.blue, width: 1.2, dash: true }).replace("", "") + T(566, 266, "Water table", { anchor: "end", fill: C.blue, size: 12 });
  b += D.arrow(60, 30, 60, 58, { stroke: C.blue, width: 2 }) + lab(70, 36, "Rain with CO2 = weak acid", { anchor: "start", size: 12, fill: C.blue });
  b += lab(300, 90, "Sinkhole (depression)", { anchor: "start", size: 12 }) + D.line(298, 86, 250, 98, { stroke: C.muted, width: 1.2 });
  b += lab(300, 150, "Joints widened by solution", { anchor: "start", size: 12 }) + D.line(298, 146, 215, 128, { stroke: C.muted, width: 1.2 });
  b += lab(30, 300, "Cave with stalactites", { anchor: "start", size: 12 }) + lab(330, 300, "Underground stream", { anchor: "start", size: 12, fill: C.blue });
  b += T(300, 46, "Soil and vegetation: high CO2", { size: 11.5, fill: C.green });
  await make("karst-solution-features", w, h, b,
    "Limestone karst in cross-section: rain made slightly acid by carbon dioxide from soil and plants dissolves limestone along joints, widening them into shafts, caves and sinkholes, and water drains underground in caves and streams instead of on the surface.",
    "Figure: solution features of a limestone (karst) landscape (schematic cross-section)",
    "tropical/landforms-granite-karst", "## Tropical karst");
}
