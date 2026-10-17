// geography-o tectonics diagrams (Earth layers, plate boundaries, volcanoes, folds, faults). Run: node .scratch/geography-o/diagrams/tectonics.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons/tectonics`;
const { C } = D;
const G = "#bcb6ae", MANTLE = "#f9dcc0", RED = "#e8776a";
const lab = (x, y, s, o = {}) => D.tag(x, y, s, { size: 12.5, ...o });

// ---------- 1. Layers of the Earth (to scale for the radius figures in the lesson)
{
  const R = 6370, layers = [["Inner core", 5100, 6370, "#f6c3a0"], ["Outer core", 2900, 5100, "#f3a58a"], ["Mantle", 0, 2900, MANTLE]];
  const cx = 160, cy = 160, px = 140 / R; // px per km
  let b = "";
  // radius = R - depth; draw from the outside in
  b += D.circle(cx, cy, R * px, { fill: "#8f8a82", stroke: C.ink, width: 2 }); // crust (exaggerated outline)
  b += D.circle(cx, cy, (R - 35) * px, { fill: MANTLE, stroke: C.ink, width: 1.6 });
  b += D.circle(cx, cy, (R - 2900) * px, { fill: "#f3a58a", stroke: C.ink, width: 1.6 });
  b += D.circle(cx, cy, (R - 5100) * px, { fill: "#f6d27a", stroke: C.ink, width: 1.6 });
  b += D.text(cx, cy + 5, "Inner\ncore", { anchor: "middle", size: 12.5 });
  b += D.text(cx, cy - 44, "Outer core", { anchor: "middle", size: 12.5 });
  b += D.text(cx, cy - 100, "Mantle", { anchor: "middle", size: 13, weight: 700 });
  // table on the right
  const rows = [["Crust", "thin outer skin, 5 to 70 km"], ["Mantle", "to about 2,900 km depth"], ["Outer core", "2,900 to 5,100 km, liquid"], ["Inner core", "5,100 km to the centre, solid"]];
  rows.forEach(([n, d], i) => {
    b += D.text(320, 70 + i * 62, n, { size: 14, weight: 700 }) + D.text(320, 90 + i * 62, d, { size: 13, fill: C.muted });
  });
  b += D.text(20, 322, "Radius of the Earth: about 6,370 km. The crust is too thin to show at this scale.", { size: 12.5, fill: C.muted });
  const alt = "Cross-section of the Earth drawn to scale in radius (about 6,370 km): a very thin crust of 5 to 70 km, a mantle down to about 2,900 km, a liquid outer core from 2,900 to 5,100 km and a solid inner core from 5,100 km to the centre.";
  const cap = "Figure: the layers of the Earth and their depths";
  await D.figure(FAMILY, "earth-layers", D.svg(560, 336, b), { alt, caption: cap });
  D.insertAfter(`${L}/earth-structure-plates.md`, "The **lithosphere** (crust plus the rigid top of the mantle", D.md("earth-layers", alt, cap));
}

// ---------- 2. Plate boundaries (four panels)
{
  let b = "";
  const W = 270, H = 232;
  const panel = (ox, oy, title) => D.rect(ox, oy, W, H, { stroke: C.grid, width: 1.5 }) + D.text(ox + W / 2, oy + 20, title, { anchor: "middle", size: 14, weight: 700 });
  const P = (ox, oy, pts, o) => D.polyline(pts.map(([x, y]) => [ox + x, oy + y]), { close: true, stroke: C.ink, width: 1.6, ...o });
  { // constructive
    const ox = 4, oy = 4;
    b += panel(ox, oy, "Constructive (plates move apart)");
    b += D.rect(ox + 4, oy + 110, W - 8, 100, { fill: MANTLE, stroke: "none" });
    b += P(ox, oy, [[4, 84], [104, 84], [118, 70], [124, 110], [4, 110]], { fill: G });
    b += P(ox, oy, [[266, 84], [166, 84], [152, 70], [146, 110], [266, 110]], { fill: G });
    b += P(ox, oy, [[118, 70], [135, 54], [152, 70], [146, 110], [124, 110]], { fill: RED });
    b += P(ox, oy, [[124, 110], [146, 110], [140, 180], [130, 180]], { fill: RED, stroke: "none" });
    b += D.arrow(ox + 90, oy + 70, ox + 40, oy + 70, { width: 2.6 }) + D.arrow(ox + 180, oy + 70, ox + 230, oy + 70, { width: 2.6 });
    b += lab(ox + 135, oy + 150, "magma rises", { anchor: "middle" });
    b += lab(ox + 135, oy + 44, "ridge or rift", { anchor: "middle" });
    b += D.text(ox + 135, oy + 226, "new crust forms; basalt lava", { anchor: "middle", size: 12.5, fill: C.muted });
  }
  { // destructive
    const ox = 280, oy = 4;
    b += panel(ox, oy, "Destructive (ocean-continent)");
    b += D.rect(ox + 4, oy + 110, W - 8, 100, { fill: MANTLE, stroke: "none" });
    b += D.rect(ox + 4, oy + 58, 96, 28, { fill: C.fillBlue, stroke: "none" });
    b += P(ox, oy, [[4, 86], [100, 86], [190, 176], [180, 190], [92, 102], [4, 102]], { fill: "#8f8a82" });
    b += P(ox, oy, [[100, 86], [116, 60], [266, 60], [266, 176], [190, 176]], { fill: G });
    b += P(ox, oy, [[196, 60], [214, 34], [232, 60]], { fill: RED });
    b += D.circle(ox + 206, oy + 112, 12, { fill: RED, stroke: C.ink, width: 1.4 });
    b += D.arrow(ox + 40, oy + 76, ox + 84, oy + 76, { width: 2.6 });
    b += lab(ox + 10, oy + 156, "oceanic plate sinks", { anchor: "start" });
    b += lab(ox + 10, oy + 128, "trench", { anchor: "start" }) + D.line(ox + 56, oy + 120, ox + 100, oy + 92, { stroke: C.muted, width: 1.2 });
    b += lab(ox + 192, oy + 52, "volcano", { anchor: "end" });
    b += D.text(ox + 135, oy + 226, "subduction: explosive volcanoes, strong quakes", { anchor: "middle", size: 12, fill: C.muted });
  }
  { // collision
    const ox = 4, oy = 240;
    b += panel(ox, oy, "Collision (continent-continent)");
    b += P(ox, oy, [[4, 100], [80, 100], [135, 54], [190, 100], [266, 100], [266, 150], [190, 150], [135, 196], [80, 150], [4, 150]], { fill: G });
    b += D.arrow(ox + 24, oy + 76, ox + 70, oy + 76, { width: 2.6 }) + D.arrow(ox + 246, oy + 76, ox + 200, oy + 76, { width: 2.6 });
    b += lab(ox + 170, oy + 64, "fold mountains", { anchor: "start" });
    b += D.text(ox + 135, oy + 226, "crust crumpled and thickened; few volcanoes", { anchor: "middle", size: 12, fill: C.muted });
  }
  { // conservative (plan view)
    const ox = 280, oy = 240;
    b += panel(ox, oy, "Conservative (plan view)");
    b += D.rect(ox + 20, oy + 46, 112, 140, { fill: G, stroke: C.ink, width: 1.6 }) + D.rect(ox + 138, oy + 46, 112, 140, { fill: "#d8d3cc", stroke: C.ink, width: 1.6 });
    b += D.arrow(ox + 76, oy + 160, ox + 76, oy + 80, { width: 2.8 }) + D.arrow(ox + 194, oy + 72, ox + 194, oy + 152, { width: 2.8 });
    b += lab(ox + 135, oy + 118, "fault", { anchor: "middle" });
    b += D.text(ox + 135, oy + 226, "plates slide past: earthquakes, no volcanoes", { anchor: "middle", size: 12, fill: C.muted });
  }
  const alt = "Four plate boundaries: at a constructive boundary plates move apart and magma rises to make new crust; at a destructive boundary a dense oceanic plate is subducted under a continental plate forming a trench and volcanoes; at a collision boundary two continents crumple into fold mountains; at a conservative boundary plates slide past each other with earthquakes but no volcanoes.";
  const cap = "Figure: constructive, destructive, collision and conservative plate boundaries";
  await D.figure(FAMILY, "plate-boundary-types", D.svg(560, 480, b), { alt, caption: cap });
  D.insertAfter(`${L}/plate-boundaries.md`, "### Summary table", D.md("plate-boundary-types", alt, cap));
}

// ---------- 3. Strato-volcano and shield volcano cross-sections
{
  let b = "";
  { // strato-volcano, left
    const ox = 4, base = 250;
    b += D.text(130, 22, "Strato-volcano (steep cone)", { anchor: "middle", size: 14, weight: 700 });
    b += D.polyline([[ox + 6, base], [ox + 90, 70], [ox + 112, 62], [ox + 128, 76], [ox + 142, 62], [ox + 160, 70], [ox + 250, base]], { fill: G, stroke: C.ink, width: 2, close: true });
    b += D.polyline([[ox + 6, base], [ox + 250, base]], { stroke: C.ink, width: 2 });
    // layers parallel to the flanks
    for (const k of [18, 38, 58]) b += D.line(ox + 6 + k * 0.5, base - k * 0.4, ox + 100 + k * 0.1, 78 + k * 0.1, { stroke: "#8f8a82", width: 1.5 }) + D.line(ox + 250 - k * 0.5, base - k * 0.4, ox + 150 - k * 0.1, 78 + k * 0.1, { stroke: "#8f8a82", width: 1.5 });
    b += D.path_(`M${ox + 128},76 L${ox + 128},210`, { stroke: RED, width: 6 });
    b += `<ellipse cx="${ox + 128}" cy="228" rx="46" ry="16" fill="${RED}" stroke="${C.ink}" stroke-width="1.6"/>`;
    b += D.path_(`M${ox + 128},150 L${ox + 184},124`, { stroke: RED, width: 4 }) + `<polygon points="${ox + 176},124 ${ox + 192},108 ${ox + 200},130" fill="${RED}" stroke="${C.ink}" stroke-width="1.2"/>`;
    b += D.path_(`M${ox + 154},70 C ${ox + 170},120 ${ox + 190},150 ${ox + 214},${base}`, { stroke: "#7a1d12", width: 3 });
    b += D.circle(ox + 112, 54, 9, { fill: "#d9d5ce", stroke: C.muted, width: 1.5 }) + D.circle(ox + 128, 46, 11, { fill: "#d9d5ce", stroke: C.muted, width: 1.5 }) + D.circle(ox + 146, 54, 9, { fill: "#d9d5ce", stroke: C.muted, width: 1.5 });
    b += lab(ox + 6, 56, "ash cloud", { anchor: "start", size: 12 }) + D.line(ox + 62, 52, ox + 100, 52, { stroke: C.muted, width: 1.2 });
    b += lab(ox + 6, 98, "crater", { anchor: "start", size: 12 }) + D.line(ox + 52, 92, ox + 108, 68, { stroke: C.muted, width: 1.2 });
    b += lab(ox + 40, 150, "main vent", { anchor: "middle", size: 12 }) + D.line(ox + 70, 148, ox + 124, 148, { stroke: C.muted, width: 1.2 });
    b += lab(ox + 130, 262, "magma chamber", { anchor: "middle", size: 12 });
    b += lab(ox + 232, 170, "lava flow", { anchor: "middle", size: 12 });
    b += lab(ox + 246, 100, "side vent", { anchor: "end", size: 12 });
    b += D.text(130, 296, "ash and lava layers; explosive", { anchor: "middle", size: 12, fill: C.muted });
  }
  { // shield volcano, right
    const ox = 280, base = 250;
    b += D.text(ox + 135, 22, "Shield volcano (wide, gentle)", { anchor: "middle", size: 14, weight: 700 });
    b += D.polyline([[ox + 0, base], [ox + 100, 160], [ox + 135, 150], [ox + 170, 160], [ox + 270, base]], { fill: G, stroke: C.ink, width: 2, close: true });
    b += D.line(ox + 0, base, ox + 270, base, { stroke: C.ink, width: 2 });
    b += D.path_(`M${ox + 135},152 L${ox + 135},222`, { stroke: RED, width: 6 });
    b += `<ellipse cx="${ox + 135}" cy="232" rx="50" ry="14" fill="${RED}" stroke="${C.ink}" stroke-width="1.6"/>`;
    b += D.path_(`M${ox + 100},158 C ${ox + 60},190 ${ox + 30},220 ${ox + 14},${base - 4}`, { stroke: "#7a1d12", width: 3 });
    b += D.path_(`M${ox + 170},158 C ${ox + 210},190 ${ox + 240},220 ${ox + 256},${base - 4}`, { stroke: "#7a1d12", width: 3 });
    b += lab(ox + 190, 136, "crater", { anchor: "start", size: 12 }) + D.line(ox + 190, 130, ox + 140, 150, { stroke: C.muted, width: 1.2 });
    b += lab(ox + 135, 262, "magma chamber", { anchor: "middle", size: 12 });
    b += lab(ox + 6, 136, "runny lava flows far", { anchor: "start", size: 12 }) + D.line(ox + 44, 140, ox + 56, 198, { stroke: C.muted, width: 1.2 });
    b += D.text(ox + 135, 296, "runny basalt lava; gentle, frequent eruptions", { anchor: "middle", size: 12, fill: C.muted });
  }
  const alt = "Cross-sections of two volcano types: a steep strato-volcano built of alternating layers of ash and lava, with a magma chamber, main vent, crater, side vent, lava flow and ash cloud (viscous magma, explosive eruptions), and a wide, gently sloping shield volcano built of runny basalt lava (gentle eruptions).";
  const cap = "Figure: a strato-volcano and a shield volcano in cross-section";
  await D.figure(FAMILY, "volcano-cross-sections", D.svg(560, 306, b), { alt, caption: cap });
  D.insertAfter(`${L}/volcanoes.md`, "| Cinder cone", D.md("volcano-cross-sections", alt, cap));
}

// ---------- 4. Folds: parts of a fold and four fold types
{
  let b = "";
  // parts of a fold: three coloured layers as stacked sine bands
  const layers = [["#f0d9a8", 0], ["#e3b98d", 26], ["#c9b7d6", 52]];
  const A = 36, x0 = 20, x1 = 540, k = (2 * Math.PI) / 260;
  const wave = (off, x) => 96 + off + A * Math.sin(k * (x - x0) + Math.PI);
  // anticline crest at x = x0+65*... : sin(k(x-x0)+PI) is max where k(x-x0)+PI = 3PI/2 -> x-x0 = 65
  for (const [col, off] of [...layers].reverse()) {
    const top = [], bot = [];
    for (let x = x0; x <= x1; x += 4) { top.push([x, wave(off, x) - 14]); bot.push([x, wave(off, x) + 14]); }
    b += D.polyline([...top, ...bot.reverse()], { fill: col, stroke: C.ink, width: 1.4, close: true });
  }
  const crest = x0 + 65, trough = x0 + 195;
  b += D.line(crest, 24, crest, 190, { stroke: C.red, width: 1.8, dash: true }) + D.line(trough, 24, trough, 190, { stroke: C.red, width: 1.8, dash: true });
  b += lab(crest, 20, "anticline (arch)", { anchor: "middle" }) + lab(trough, 20, "syncline (trough)", { anchor: "middle" });
  b += D.text(crest + 6, 206, "axis", { size: 12.5, fill: C.red }) + D.text(trough + 6, 206, "axis", { size: 12.5, fill: C.red });
  b += lab(crest + 70, 92, "limb", { anchor: "middle" });
  b += D.text(280, 232, "Layers of rock buckled by compression", { size: 13, fill: C.muted, anchor: "start" });
  // four fold types: the same fold tilted over more and more as compression increases
  const types = [["Simple", 0], ["Asymmetrical", 20], ["Overfold", 50], ["Recumbent", 85]];
  types.forEach(([name, rot], i) => {
    const cx = 74 + i * 138, cy = 296;
    const limb = (dy, col) => D.polyline([[-32, 18 + dy], [0, -14 + dy], [32, 18 + dy]], { stroke: col, width: 4.5 });
    b += '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + rot + ')">' + limb(0, C.ink) + limb(14, "#c98a4b") + '</g>';
    b += D.text(cx, 352, name, { anchor: "middle", size: 13, weight: 700 });
  });
  b += D.text(16, 376, "Compression increases from left to right (an overthrust nappe is the next stage).", { size: 12.5, fill: C.muted });
  const alt = "Cross-section of folded rock layers showing an anticline (arch) and a syncline (trough) with their limbs and axes, and sketches of four fold types as compression increases: simple, asymmetrical, overfold and recumbent.";
  const cap = "Figure: parts of a fold and the main types of fold";
  await D.figure(FAMILY, "fold-parts-types", D.svg(560, 384, b), { alt, caption: cap });
  D.insertAfter(`${L}/folding-faulting.md`, "| Overthrust fold (nappe)", D.md("fold-parts-types", alt, cap));
}

// ---------- 5. Faults: normal, reverse, rift valley, block mountain
{
  let b = "";
  const W = 270, H = 204;
  const panel = (ox, oy, title) => D.rect(ox, oy, W, H, { stroke: C.grid, width: 1.5 }) + D.text(ox + W / 2, oy + 20, title, { anchor: "middle", size: 14, weight: 700 });
  const blk = (ox, oy, pts, col) => D.polyline(pts.map(([x, y]) => [ox + x, oy + y - 20]), { fill: col, stroke: C.ink, width: 1.8, close: true });
  { // normal fault
    const ox = 4, oy = 4;
    b += panel(ox, oy, "Normal fault (tension)");
    const fx = (y) => 60 + (y - 90) * (55.6 / 100);
    b += blk(ox, oy, [[10, 90], [60, 90], [fx(190), 190], [10, 190]], G) + blk(ox, oy, [[fx(114), 114], [250, 114], [250, 190], [fx(190), 190]], "#d8d3cc");
    b += D.arrow(ox + 100, oy + 56, ox + 60, oy + 56, { width: 2.4 }) + D.arrow(ox + 170, oy + 56, ox + 210, oy + 56, { width: 2.4 });
    b += lab(ox + 190, oy + 114, "block slips down", { anchor: "middle" });
  }
  { // reverse fault
    const ox = 280, oy = 4;
    b += panel(ox, oy, "Reverse fault (compression)");
    const fx = (y) => 60 + (y - 90) * (55.6 / 100);
    b += blk(ox, oy, [[10, 90], [60, 90], [fx(190), 190], [10, 190]], G) + blk(ox, oy, [[fx(66), 66], [250, 66], [250, 190], [fx(190), 190]], "#d8d3cc");
    b += D.arrow(ox + 40, oy + 60, ox + 80, oy + 60, { width: 2.4 }) + D.arrow(ox + 240, oy + 40, ox + 200, oy + 40, { width: 2.4 });
    b += lab(ox + 190, oy + 96, "block pushed up and over", { anchor: "middle", size: 12 });
  }
  { // rift valley
    const ox = 4, oy = 212;
    b += panel(ox, oy, "Rift valley (graben)");
    b += blk(ox, oy, [[10, 90], [50, 90], [90, 190], [10, 190]], G) + blk(ox, oy, [[190, 90], [250, 90], [250, 190], [150, 190]], G);
    b += blk(ox, oy, [[62, 120], [178, 120], [150, 190], [90, 190]], "#d8d3cc");
    b += D.arrow(ox + 90, oy + 56, ox + 50, oy + 56, { width: 2.4 }) + D.arrow(ox + 170, oy + 56, ox + 210, oy + 56, { width: 2.4 });
    b += lab(ox + 120, oy + 134, "sunk block", { anchor: "middle" });
    b += lab(ox + 40, oy + 76, "scarp", { anchor: "middle", size: 12 });
  }
  { // block mountain
    const ox = 280, oy = 212;
    b += panel(ox, oy, "Block mountain (horst)");
    b += blk(ox, oy, [[10, 90], [70, 90], [40, 190], [10, 190]], G) + blk(ox, oy, [[180, 90], [250, 90], [250, 190], [210, 190]], G);
    b += blk(ox, oy, [[79, 60], [171, 60], [210, 190], [40, 190]], "#d8d3cc");
    b += lab(ox + 125, oy + 60, "raised block", { anchor: "middle" });
    b += lab(ox + 40, oy + 76, "scarp", { anchor: "middle", size: 12 });
  }
  const alt = "Four fault structures in cross-section: a normal fault where tension makes one block slip down, a reverse fault where compression pushes one block up and over the other, a rift valley where a central block sinks between two faults, and a block mountain (horst) where a central block stands high between two faults.";
  const cap = "Figure: normal fault, reverse fault, rift valley and block mountain";
  await D.figure(FAMILY, "fault-types-rift-horst", D.svg(560, 424, b), { alt, caption: cap });
  D.insertAfter(`${L}/folding-faulting.md`, "- **Tilted block**", D.md("fault-types-rift-horst", alt, cap));
}
console.log("tectonics done");
