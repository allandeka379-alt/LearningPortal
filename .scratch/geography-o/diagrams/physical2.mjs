// geography-o physical diagrams, part 2: climate graph, depression cross-section, soil profile, kopje, coasts.
// Run from repo root: node .scratch/geography-o/diagrams/physical2.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;
const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 12.5, ...o });
const SAND = "#e9d29a", ROCK = "#bcb6ae", SOIL = "#e9d5b8", SEA = "#cfeaf3";

// ---------- 1. Climate graph for the fictional plateau station (weather/climate-graphs.md)
{
  const temp = [21, 21, 20, 18, 15, 13, 13, 15, 19, 21, 22, 21];
  const rain = [190, 170, 90, 30, 10, 2, 0, 1, 8, 30, 95, 180];
  const total = rain.reduce((a, v) => a + v, 0), range = Math.max(...temp) - Math.min(...temp);
  const w = 600, h = 430, pad = { l: 64, r: 64, t: 56, b: 56 };
  const ax = D.axes({ x: [0, 12], y: [0, 200], xTicks: [], yTicks: 50, yLabel: "", w, h, pad, grid: true, arrows: false });
  const Yt = (c) => ax.Y((c / 40) * 200); // temperature 0-40 C on the same height
  const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  let b = ax.frame;
  rain.forEach((v, i) => { b += D.rect(ax.X(i + 0.15), ax.Y(v), ax.X(0.7) - ax.X(0), ax.Y(0) - ax.Y(v), { fill: "#8cc7db", stroke: C.teal, width: 1 }); });
  months.forEach((m, i) => (b += D.text(ax.X(i + 0.5), ax.Y(0) + 20, m, { anchor: "middle", size: 14, weight: 600 })));
  b += D.polyline(temp.map((c, i) => [ax.X(i + 0.5), Yt(c)]), { stroke: C.red, width: 3 });
  temp.forEach((c, i) => (b += D.dot(ax.X(i + 0.5), Yt(c), { r: 4, stroke: C.red })));
  // right axis (temperature)
  b += D.line(ax.X(12), ax.Y(0), ax.X(12), ax.Y(200), { stroke: C.axis, width: 1.6 });
  for (let c = 0; c <= 40; c += 10) b += D.text(ax.X(12) + 10, Yt(c) + 4, String(c), { size: 13, fill: C.red }) + D.line(ax.X(12), Yt(c), ax.X(12) + 5, Yt(c), { stroke: C.axis, width: 1.2 });
  b += D.text(ax.X(0), 20, "Rainfall (mm)", { size: 14, weight: 700, fill: C.teal }) + D.text(ax.X(12), 20, "Temperature (°C)", { anchor: "end", size: 14, weight: 700, fill: C.red });
  b += D.text(ax.X(6), 42, "Fictional plateau station: " + total + " mm a year; annual range " + range + " °C", { anchor: "middle", size: 13, fill: C.muted });
  b += D.tag(ax.X(3), ax.Y(185), "Rain: November to March", { anchor: "middle", size: 12.5, fill: C.teal });
  b += D.tag(ax.X(8), Yt(13) + 34, "Coolest: June and July, 13 °C", { anchor: "middle", size: 12.5, fill: C.red });
  b += D.tag(ax.X(8.9), Yt(22) - 22, "Hottest: November, 22 °C", { anchor: "middle", size: 12.5, fill: C.red });
  const alt = `Climate graph for the fictional plateau station: rainfall bars are tall from November to March (January 190 mm) and almost nil from May to September (0 mm in July), totalling ${total} mm; the temperature line stays between 13 °C in June and July and 22 °C in November, an annual range of ${range} °C.`;
  const cap = "Figure: a climate graph, rainfall as bars and temperature as a line, for the fictional plateau station";
  await D.figure(FAMILY, "climate-graph-plateau-station", D.svg(w, h, b), { alt, caption: cap });
  D.insertAfter(`${L}/weather/climate-graphs.md`, "On the fictional station's graph you would see", D.md("climate-graph-plateau-station", alt, cap));
  console.log("climate totals", total, range);
}

// ---------- 2. Cross-section of a depression (weather/depressions-fronts.md)
{
  let b = "";
  const g = 290, cx0 = 215, cx1 = 160, wx0 = 335, wx1 = 560;
  // cold air (left), cold air ahead of the warm front (right)
  b += D.polyline([[10, g], [cx0, g], [cx1, 90], [10, 90]], { fill: "#dbe9f2", stroke: "none", close: true });
  b += D.polyline([[wx0, g], [560, g], [560, 120]], { fill: "#dbe9f2", stroke: "none", close: true });
  b += D.polyline([[cx0, g], [cx1, 90]], { stroke: C.blue, width: 3 }) + D.polyline([[wx0, g], [560, 120]], { stroke: C.red, width: 3 });
  b += D.line(10, g, 560, g, { stroke: C.ink, width: 2.5 });
  b += D.text(cx0 + 6, g + 20, "cold front", { anchor: "middle", size: 13, weight: 700, fill: C.blue }) + D.text(wx0 + 10, g + 20, "warm front", { anchor: "middle", size: 13, weight: 700, fill: C.red });
  // cloud along the fronts
  const cloud = (x, y, r = 14, f = "#ffffff") => D.circle(x, y, r, { fill: f, stroke: C.muted, width: 1.6 });
  for (const [x, y] of [[196, 250], [186, 220], [176, 190], [170, 160], [164, 130], [196, 200], [188, 170], [178, 140]]) b += cloud(x, y, 15, "#aeb3b8");
  for (const [t, base] of [[0.18, 0], [0.32, 0], [0.46, 0], [0.6, 0], [0.76, 0]]) { const x = wx0 + t * (560 - wx0), y = g - t * (g - 120) - 18; b += cloud(x, y, 13, "#c6cacf"); }
  for (const x of [262, 292, 316]) b += cloud(x, 220, 10, "#e2e4e7");
  for (const [x, y] of [[520, 82], [540, 74]]) b += D.path_(`M${x - 14},${y} Q${x},${y - 10} ${x + 14},${y}`, { stroke: C.muted, width: 2 });
  // rain
  for (let x = 150; x <= 205; x += 11) b += D.line(x, 262, x - 3, 278, { stroke: C.blue, width: 2 });
  for (let x = 345; x <= 470; x += 14) b += D.line(x, 262, x - 3, 276, { stroke: C.blue, width: 1.6 });
  // labels
  b += lab(20, 70, "Cold air", { anchor: "start", size: 13, fill: C.blue }) + lab(556, 252, "Cold air ahead", { anchor: "end", size: 13, fill: C.blue });
  b += lab(280, 150, "Warm sector", { anchor: "middle", size: 13, fill: C.red });
  b += lab(100, 110, "cumulus, showers", { anchor: "middle", size: 12 }) + lab(256, 60, "cumulonimbus", { anchor: "end", size: 12 });
  b += lab(420, 176, "nimbostratus", { anchor: "middle", size: 12 }) + lab(508, 66, "cirrus", { anchor: "end", size: 12 });
  b += lab(280, 252, "stratus", { anchor: "middle", size: 12 }) + D.line(170, 138, 200, 70, { stroke: C.muted, width: 1.2 });
  b += D.arrow(30, 322, 130, 322, { width: 3 }) + D.text(140, 327, "system moves east", { size: 13, weight: 600 });
  b += D.text(20, 350, "Steep cold front: heavy, short rain. Gentle warm front: steady rain over a wide belt.", { size: 12.5, fill: C.muted });
  const alt = "Cross-section through a mature depression moving east: the steep cold front with towering cumulonimbus and heavy short downpours, the warm sector with low stratus and drizzle, and the gently sloping warm front with nimbostratus and steady rain over a wide belt, thinning to cirrus far ahead.";
  const cap = "Figure: cross-section of a mature depression with the cold front, warm sector and warm front";
  await D.figure(FAMILY, "depression-cross-section", D.svg(570, 360, b), { alt, caption: cap });
  D.insertAfter(`${L}/weather/depressions-fronts.md`, "The warm front slopes gently", D.md("depression-cross-section", alt, cap));
}

// ---------- 3. Soil profile horizons (ecosystems/soils.md)
{
  let b = "";
  const hz = [["O", "Organic layer", "leaf litter, partly decomposed matter", "#5b4631", 36], ["A", "Topsoil", "dark, humus-rich; most roots and soil life", "#7a5a3a", 60], ["E", "Eluviated layer", "pale, bleached: minerals washed out", "#e8dfd0", 44], ["B", "Subsoil", "minerals washed in (illuviation); may form a hard pan", "#c98a4b", 66], ["C", "Weathered parent material", "broken, partly weathered rock", "#a99a86", 56], ["R", "Bedrock", "solid, unweathered rock", "#8f8a82", 44]];
  let y = 24;
  b += D.text(20, 16, "Surface", { size: 12, fill: C.muted });
  hz.forEach(([k, name, desc, col, hgt]) => {
    b += D.rect(20, y, 150, hgt, { fill: col, stroke: C.ink, width: 1.4 });
    b += D.text(95, y + hgt / 2 + 7, k, { anchor: "middle", size: 22, weight: 700, fill: ["E"].includes(k) ? C.ink : "#fff" });
    b += D.text(190, y + hgt / 2 - 2, name, { size: 14, weight: 700 }) + D.text(190, y + hgt / 2 + 16, desc, { size: 12.5, fill: C.muted });
    y += hgt;
  });
  b += D.arrow(8, 30, 8, y - 4, { width: 2 }) + D.text(12, y + 18, "depth", { size: 12, fill: C.muted });
  const alt = "Soil profile with six horizons from the surface down: O organic layer, A dark humus-rich topsoil, E pale eluviated layer from which minerals are washed out, B subsoil where minerals are washed in (illuviation), C weathered parent material and R solid bedrock.";
  const cap = "Figure: the horizons of a soil profile, O at the surface to R at the base";
  await D.figure(FAMILY, "soil-profile-horizons", D.svg(560, y + 28, b), { alt, caption: cap });
  D.insertAfter(`${L}/ecosystems/soils.md`, "Not every soil has every horizon", D.md("soil-profile-horizons", alt, cap));
}

// ---------- 4. How a kopje forms (landforms/weathering-mass-wasting.md)
{
  let b = "";
  const w = 270;
  const stones = (ox, base, top) => [[ox + 70, base - 18, 26, 18], [ox + 120, base - 24, 30, 22], [ox + 175, base - 16, 26, 16], [ox + 98, base - 52, 22, 18], [ox + 150, base - 56, 24, 18], [ox + 124, base - 86, 20, 16]];
  { // stage 1: underground weathering along joints
    const ox = 6;
    b += D.text(ox + w / 2, 22, "1. Weathering along joints", { anchor: "middle", size: 14, weight: 700 });
    b += D.rect(ox, 80, w, 120, { fill: SOIL, stroke: C.ink, width: 1.6 });
    b += D.rect(ox, 200, w, 60, { fill: ROCK, stroke: C.ink, width: 1.6 });
    for (const [x, y, ew, eh] of [[ox + 40, 130, 28, 22], [ox + 100, 150, 34, 24], [ox + 168, 126, 30, 24], [ox + 220, 156, 26, 22], [ox + 70, 176, 28, 18], [ox + 150, 184, 30, 14]]) b += `<ellipse cx="${x}" cy="${y}" rx="${ew}" ry="${eh}" fill="${ROCK}" stroke="${C.ink}" stroke-width="1.5"/>`;
    for (const x of [ox + 70, ox + 134, ox + 198]) b += D.line(x, 80, x, 260, { stroke: C.blue, width: 1.5, dash: true });
    b += lab(ox + w / 2, 66, "ground surface", { anchor: "middle", size: 12 });
    b += lab(ox + 66, 112, "regolith (rotted rock)", { anchor: "start", size: 12 });
    b += lab(ox + 20, 248, "joints (dashed) let water in", { anchor: "start", size: 12 });
    b += lab(ox + 170, 168, "corestone", { anchor: "start", size: 12 });
  }
  { // stage 2: regolith stripped, corestones left as a kopje
    const ox = 284;
    b += D.text(ox + w / 2, 22, "2. Regolith stripped away: kopje", { anchor: "middle", size: 14, weight: 700 });
    b += D.rect(ox, 200, w, 60, { fill: ROCK, stroke: C.ink, width: 1.6 });
    b += D.line(ox, 80, ox + w, 80, { stroke: C.muted, width: 1.4, dash: true });
    b += D.text(ox + 8, 74, "original ground level", { size: 12, fill: C.muted });
    for (const [x, y, ew, eh] of [[ox + 90, 186, 36, 18], [ox + 150, 180, 38, 22], [ox + 200, 188, 28, 14], [ox + 120, 158, 28, 18], [ox + 170, 150, 26, 16], [ox + 148, 128, 22, 14]]) b += `<ellipse cx="${x}" cy="${y}" rx="${ew}" ry="${eh}" fill="${ROCK}" stroke="${C.ink}" stroke-width="1.5"/>`;
    b += D.arrow(ox + 40, 110, ox + 40, 188, { stroke: C.red, width: 2.4 }) + lab(ox + 12, 232, "lower land surface", { anchor: "start", size: 12 });
    b += lab(ox + 262, 112, "kopje (tor)", { anchor: "end", size: 12.5 });
  }
  const alt = "Two stages of kopje formation: first, water rots granite along joints below the ground, leaving rounded corestones inside a thick layer of regolith; second, rain and rivers strip the regolith away, lowering the surface and leaving the corestones standing as a pile of boulders called a kopje.";
  const cap = "Figure: how a granite kopje forms by weathering along joints and then stripping of the regolith";
  await D.figure(FAMILY, "kopje-formation", D.svg(560, 276, b), { alt, caption: cap });
  D.insertAfter(`${L}/landforms/weathering-mass-wasting.md`, "- **Dwala (bornhardt)**", D.md("kopje-formation", alt, cap));
}

// ---------- 5. Coasts: notch to platform, headland stages, spit (coasts/landforms.md)
{
  // 5a. cliff retreat and wave-cut platform (three stages)
  let b = "";
  const w = 180;
  const sea = (ox, y) => D.rect(ox, y, w, 250 - y, { fill: SEA, stroke: "none" });
  const stage = (i, title) => { const ox = 4 + i * 186; b += D.rect(ox, 30, w, 220, { stroke: C.grid, width: 1.5 }) + D.text(ox + w / 2, 22, title, { anchor: "middle", size: 13.5, weight: 700 }); return ox; };
  { const ox = stage(0, "1. Notch cut");
    b += sea(ox, 190) + D.polyline([[ox, 250], [ox, 80], [ox + 100, 80], [ox + 100, 170], [ox + 80, 186], [ox + 100, 202], [ox + 100, 250]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true });
    b += D.polyline([[ox + 100, 170], [ox + 82, 186], [ox + 100, 202]], { fill: "#3a3a3a", stroke: "none", close: true });
    b += D.arrow(ox + 170, 160, ox + 112, 186, { stroke: C.blue, width: 2.2 }) + lab(ox + 176, 150, "waves attack", { anchor: "end", size: 12 }) + lab(ox + 4, 228, "wave-cut notch", { anchor: "start", size: 12 }); }
  { const ox = stage(1, "2. Collapse");
    b += sea(ox, 190) + D.polyline([[ox, 250], [ox, 80], [ox + 100, 80], [ox + 100, 190], [ox + 100, 250]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true });
    b += D.polyline([[ox + 100, 190], [ox + 128, 188], [ox + 140, 200], [ox + 100, 204]], { fill: "#a39d96", stroke: C.ink, width: 1.2, close: true });
    b += D.arrow(ox + 100, 110, ox + 112, 176, { stroke: C.red, width: 2.2 }) + lab(ox + 176, 130, "overhang falls", { anchor: "end", size: 12 }); }
  { const ox = stage(2, "3. Platform left");
    b += D.rect(ox, 200, w, 50, { fill: SEA, stroke: "none" }) + D.polyline([[ox, 250], [ox, 80], [ox + 66, 80], [ox + 66, 196], [ox + 150, 214], [ox + 180, 214], [ox + 180, 250]], { fill: ROCK, stroke: C.ink, width: 1.8, close: true });
    b += D.arrow(ox + 66, 110, ox + 30, 110, { stroke: C.red, width: 2.2 }) + lab(ox + 90, 100, "cliff retreats", { anchor: "start", size: 12 });
    b += lab(ox + 176, 190, "wave-cut platform", { anchor: "end", size: 12 }); }
  const altA = "Three cross-sections of a cliff: waves cut a notch at the base, the unsupported rock above collapses, and as the cliff retreats inland a gently sloping wave-cut platform is left behind.";
  const capA = "Figure: how a wave-cut platform forms as a cliff retreats";
  await D.figure(FAMILY, "cliff-notch-platform", D.svg(570, 262, b), { alt: altA, caption: capA });
  D.insertAfter(`${L}/coasts/landforms.md`, "5. As it retreats it leaves behind a gently sloping", D.md("cliff-notch-platform", altA, capA));
}
{
  // 5b. headland: crack, cave, arch, stack, stump (side views)
  let b = "";
  const w = 106, step = 110;
  const names = ["1. Crack", "2. Cave", "3. Arch", "4. Stack", "5. Stump"];
  names.forEach((n, i) => {
    const ox = 4 + i * step, sl = 176;
    b += D.rect(ox, 30, w, 190, { stroke: C.grid, width: 1.5 }) + D.text(ox + w / 2, 22, n, { anchor: "middle", size: 13.5, weight: 700 });
    b += D.rect(ox + 1, sl, w - 2, 220 - sl, { fill: SEA, stroke: "none" });
    if (i <= 2) {
      b += D.rect(ox + 1, 80, 99, 139, { fill: ROCK, stroke: C.ink, width: 1.6 });
      b += D.rect(ox + 1, sl, 99, 43, { fill: SEA, stroke: "none" });
      b += D.text(ox + 6, 96, "land", { size: 12, fill: C.muted });
    }
    if (i === 0) b += D.path_(`M${ox + 50},80 L${ox + 54},140 L${ox + 50},sl`.replace("sl", String(sl)), { stroke: "#3a3a3a", width: 3 });
    if (i === 1) b += `<path d="M${ox + 30},${sl} Q${ox + 50},${sl - 38} ${ox + 70},${sl} Z" fill="#3a3a3a"/>` + D.text(ox + 50, 130, "cave", { anchor: "middle", size: 12 });
    if (i === 2) b += `<path d="M${ox + 20},${sl} Q${ox + 48},${sl - 56} ${ox + 78},${sl} Z" fill="#ffffff" stroke="${C.ink}" stroke-width="1.6"/>`;
    if (i === 3) b += D.polyline([[ox + 36, sl], [ox + 36, 96], [ox + 66, 96], [ox + 66, sl]], { fill: ROCK, stroke: C.ink, width: 1.6, close: true }) + D.polyline([[ox + 1, sl], [ox + 1, 80], [ox + 14, 80], [ox + 14, sl]], { fill: ROCK, stroke: C.ink, width: 1.6, close: true }) + D.text(ox + 51, 90, "stack", { anchor: "middle", size: 12 });
    if (i === 4) b += D.polyline([[ox + 36, sl], [ox + 40, sl - 14], [ox + 62, sl - 14], [ox + 66, sl]], { fill: ROCK, stroke: C.ink, width: 1.6, close: true }) + D.polyline([[ox + 1, sl], [ox + 1, 80], [ox + 14, 80], [ox + 14, sl]], { fill: ROCK, stroke: C.ink, width: 1.6, close: true });
  });
  b += D.text(10, 244, "Waves exploit a line of weakness: crack, cave, arch (roof collapses), stack, then a low stump.", { size: 12.5, fill: C.muted });
  const altB = "Five side views of a headland being eroded: waves widen a crack in the rock, which becomes a cave, then the cave cuts through to form an arch, the roof of the arch collapses leaving an isolated stack, and the stack is later undercut to a low stump.";
  const capB = "Figure: crack, cave, arch, stack and stump on an eroding headland";
  await D.figure(FAMILY, "headland-cave-arch-stack-stump", D.svg(570, 254, b), { alt: altB, caption: capB });
  D.insertAfter(`${L}/coasts/landforms.md`, "5. The stack is undercut at its base and eventually collapses", D.md("headland-cave-arch-stack-stump", altB, capB));
}
{
  // 5c. spit (plan view)
  let b = "";
  b += D.rect(10, 10, 540, 304, { fill: SEA, stroke: C.grid, width: 1.5 });
  b += D.polyline([[10, 10], [200, 10], [200, 130], [90, 215], [10, 215]], { fill: "#e5e0d6", stroke: C.ink, width: 2, close: true });
  b += D.text(80, 80, "LAND", { size: 14, weight: 700, fill: C.muted });
  // spit continues the original direction of the coast, then curves (recurved end)
  b += D.path_("M200,130 L200,205 Q200,248 250,262 L300,262", { stroke: SAND, width: 16 });
  b += D.path_("M200,130 L200,205 Q200,248 250,262 L300,262", { stroke: C.ink, width: 1.2, dash: true });
  b += D.polyline([[190, 146], [150, 174], [140, 214], [190, 238]], { fill: "#bfe0b8", stroke: C.green, width: 1.5, close: true });
  b += lab(20, 276, "salt marsh in sheltered water", { anchor: "start", size: 12 }) + D.line(100, 262, 150, 214, { stroke: C.muted, width: 1.2 });
  b += D.arrow(240, 36, 240, 120, { stroke: C.red, width: 3 }) + lab(250, 40, "longshore drift", { anchor: "start", size: 12.5, fill: C.red });
  b += D.arrow(420, 40, 340, 100, { stroke: C.blue, width: 3 }) + lab(550, 34, "prevailing wind and waves", { anchor: "end", size: 12.5, fill: C.blue });
  b += lab(300, 215, "spit: ridge of sand", { anchor: "start", size: 12.5 }) + lab(320, 290, "recurved end", { anchor: "start", size: 12.5 });
  b += D.text(20, 326, "The coast changes direction, so drifting sand is deposited in calmer water.", { size: 12.5, fill: C.muted });
  const altC = "Plan view of a spit: longshore drift carries sand along the coast in the direction of the prevailing wind; where the coastline changes direction the sand is deposited in calmer water and builds a ridge out into the sea, curving at the end, with a salt marsh developing in the sheltered water behind.";
  const capC = "Figure: a spit with longshore drift, a recurved end and a salt marsh behind";
  await D.figure(FAMILY, "spit-formation", D.svg(560, 336, b), { alt: altC, caption: capC });
  D.insertAfter(`${L}/coasts/landforms.md`, "6. A spit across a river mouth cannot close it", D.md("spit-formation", altC, capC));
}
console.log("physical2 done");
