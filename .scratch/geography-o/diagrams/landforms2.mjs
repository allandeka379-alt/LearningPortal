// geography-o second pass: landforms diagrams. Run from repo root: node .scratch/geography-o/diagrams/landforms2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, figBefore, poly, edge, SOIL, SAND, ROCK } from "./kit2.mjs";

// ---------- 1. The rock cycle (landforms/rocks.md)
{
  const BW = 132, BH = 44, cen = { Igneous: [280, 52], Sediments: [425, 156], Sedimentary: [368, 328], Metamorphic: [192, 328], Magma: [135, 156] };
  const names = { Igneous: "Igneous rock", Sediments: "Sediments\n(loose fragments)", Sedimentary: "Sedimentary rock", Metamorphic: "Metamorphic rock", Magma: "Magma" };
  const fills = { Igneous: C.fillAmber, Sediments: C.fillGrey, Sedimentary: C.fillBlue, Metamorphic: C.fillGreen, Magma: "#f3b4ad" };
  const steps = [
    ["Igneous", "Sediments", "Weathering,\nerosion, transport", [470, 86]],
    ["Sediments", "Sedimentary", "Deposition,\ncompaction,\ncementation", [506, 252]],
    ["Sedimentary", "Metamorphic", "Heat and pressure", [280, 372]],
    ["Metamorphic", "Magma", "Melting", [42, 262]],
    ["Magma", "Igneous", "Cooling", [100, 86]],
  ];
  let b = "";
  for (const [a, z, label, [lx, ly]] of steps) {
    const [ax, ay] = cen[a], [zx, zy] = cen[z];
    const p1 = edge(ax, ay, BW, BH, zx, zy), p2 = edge(zx, zy, BW, BH, ax, ay);
    b += D.arrow(p1[0], p1[1], p2[0], p2[1], { stroke: C.ink, width: 2.2 });
    const ls = label.split("\n");
    b += ls.map((l, i) => D.text(lx, ly + i * 16, l, { anchor: "middle", size: 13, fill: C.blue, weight: 600 })).join("");
  }
  for (const k of Object.keys(cen)) b += D.node(cen[k][0] - BW / 2, cen[k][1] - BH / 2, BW, BH, names[k], { fill: fills[k], size: 13.5, weight: 700 });
  b += D.text(280, 418, "Short cuts: igneous rock can be metamorphosed directly; any rock can be weathered into sediment.", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("rock-cycle",
    D.svg(560, 432, b),
    "Rock cycle: igneous rock is weathered and eroded into sediments, which are deposited, compacted and cemented into sedimentary rock; heat and pressure change it to metamorphic rock, which melts to magma and cools to igneous rock again.",
    "Figure: the rock cycle with the process that links each stage",
    "landforms/rocks", "## The rock cycle in outline");
}

// ---------- 2. Relief cross-section Kariba to Mutare (landforms/landscapes.md); heights from the lesson's table
{
  const valley = 480, middle = [900, 1200], harare = 1500, nyangani = 2590, mutare = 1100; // metres (valley: "below about 500 m")
  const ax = D.axes({ x: [0, 100], y: [0, 3000], w: 560, h: 420, xTicks: [], yTicks: 500, xLabel: "NW (Kariba)  to  SE (Mutare); horizontal scale not drawn", yLabel: "Height above sea level (m)", pad: { l: 68, r: 16, t: 34, b: 60 } });
  const prof = [[0, valley], [12, valley], [17, 700], [22, 1010], [26, 1100], [28, 1040], [30, 1150], [38, 1380], [46, harare], [56, 1420], [66, 1180], [70, 1050], [74, 1120], [80, 1500], [88, 2100], [92, nyangani], [96, 1500], [100, mutare]];
  let b = ax.frame;
  const pts = prof.map(([x, h]) => [ax.X(x), ax.Y(h)]);
  b += poly([[ax.X(0), ax.Y(0)], ...pts, [ax.X(100), ax.Y(0)]], { fill: SOIL, stroke: C.axis, width: 2.2 });
  b += D.line(ax.X(0), ax.Y(900), ax.X(100), ax.Y(900), { stroke: C.amber, width: 1.4, dash: true }) + D.line(ax.X(0), ax.Y(1200), ax.X(100), ax.Y(1200), { stroke: C.blue, width: 1.4, dash: true });
  b += D.text(ax.X(48), ax.Y(900) + 16, "900 m", { size: 12.5, fill: C.amber }) + D.text(ax.X(48), ax.Y(1200) + 16, "1,200 m", { size: 12.5, fill: C.blue });
  const lead = (x1, h1, x2, h2) => D.line(ax.X(x1), ax.Y(h1), ax.X(x2), ax.Y(h2), { stroke: C.muted, width: 1.2 });
  b += ax.tag(1, 250, "Zambezi valley: lowveld, Lake Kariba", { size: 12.5 });
  b += ax.tag(2, 1100, "Escarpment", { size: 12.5 }) + lead(12, 1030, 16, 620);
  b += ax.tag(10, 1650, "Middleveld, kopjes", { size: 12.5 }) + lead(20, 1560, 28, 1050);
  b += ax.tag(30, 2250, "Highveld: Harare about 1,500 m", { size: 12.5 }) + lead(46, 2120, 46, harare + 20);
  b += ax.tag(56, 1900, "Middleveld", { size: 12.5 }) + lead(70, 1790, 70, 1070);
  b += ax.tag(90, 2750, "Eastern Highlands: Nyangani about 2,590 m", { anchor: "end", size: 12.5 }) + lead(91, 2700, 92, nyangani + 20);
  await fig("relief-cross-section-kariba-mutare",
    D.svg(560, 420, b),
    "Schematic relief cross-section from Kariba to Mutare: the Zambezi valley lies below about 500 m, a steep escarpment climbs to the middleveld (900 to 1,200 m), the highveld around Harare is about 1,500 m, the land falls to the middleveld again, then rises to the Eastern Highlands, where Nyangani reaches about 2,590 m.",
    "Figure: relief cross-section from the Zambezi valley to the Eastern Highlands (horizontal scale not drawn)",
    "landforms/landscapes", "Heights in the table are approximate");
}

// ---------- 3. Barchan dune (landforms/arid-wind.md): windward slope 10-15 degrees, slip face 30-35 degrees
{
  let b = D.rect(4, 4, 552, 196, { stroke: C.grid, width: 1.5 }) + D.text(14, 24, "Plan view (from above)", { weight: 700, size: 14 });
  b += D.path_("M360,48 C 210,70 210,150 360,176 C 296,138 296,86 360,48 Z", { fill: SAND, stroke: C.amber, width: 2.2 });
  b += D.arrow(30, 112, 170, 112, { stroke: C.blue, width: 3 }) + D.text(100, 100, "Wind", { anchor: "middle", fill: C.blue, weight: 700 });
  b += lab(200, 34, "Horns point downwind", { anchor: "start", size: 13 }) + D.line(330, 40, 360, 46, { stroke: C.muted, width: 1.2 });
  b += D.text(384, 98, "Slip face", { size: 13, weight: 600 }) + D.text(384, 114, "(leeward, steep)", { size: 13 }) + D.line(380, 112, 322, 112, { stroke: C.muted, width: 1.2 });
  b += D.text(190, 188, "Windward side (gentle)", { size: 13, anchor: "start" });
  // cross-section: scale 1 px = 1 unit; height 60, windward slope 12 degrees, slip face 33 degrees (inside the quoted ranges)
  const oy = 200, gy = oy + 160, H = 60, a1 = 12, a2 = 33, t1 = Math.tan((a1 * Math.PI) / 180), t2 = Math.tan((a2 * Math.PI) / 180);
  const x0 = 50, crest = x0 + H / t1, end = crest + H / t2;
  b += D.rect(4, oy, 552, 196, { stroke: C.grid, width: 1.5 }) + D.text(14, oy + 24, "Cross-section along the wind", { weight: 700, size: 14 });
  b += D.line(20, gy, 540, gy, { stroke: C.muted, width: 1.4 }) + poly([[x0, gy], [crest, gy - H], [end, gy]], { fill: SAND, stroke: C.amber, width: 2.2 });
  b += D.arrow(24, oy + 52, 120, oy + 52, { stroke: C.blue, width: 3 }) + D.text(72, oy + 44, "Wind", { anchor: "middle", fill: C.blue, weight: 700 });
  const sy = (x) => gy - (x - x0) * t1;
  b += D.arrow(x0 + 70, sy(x0 + 70) - 12, crest - 8, sy(crest - 8) - 12, { stroke: C.blue, width: 1.8 }) + D.text(x0 + 120, sy(x0 + 120) - 40, "sand pushed up the", { size: 12.5, fill: C.blue, anchor: "middle" }) + D.text(x0 + 120, sy(x0 + 120) - 25, "gentle slope by saltation", { size: 12.5, fill: C.blue, anchor: "middle" });
  b += D.arrow(crest + 8, gy - H - 8, end + 2, gy - 12, { stroke: C.red, width: 1.8 }) + D.text(end + 12, gy - H + 4, "sand avalanches", { size: 12.5, fill: C.red }) + D.text(end + 12, gy - H + 19, "down the slip face", { size: 12.5, fill: C.red });
  b += lab(x0 + 10, gy + 28, "Windward slope: about 10 to 15°", { size: 12.5 });
  b += lab(crest, gy + 28, "Slip face: about 30 to 35°", { size: 12.5 });
  await figBefore("barchan-dune-plan-section",
    D.svg(560, 404, b),
    "Barchan dune: a crescent whose horns point downwind; sand is pushed up the gentle windward slope (about 10 to 15 degrees) and avalanches down the steep slip face (about 30 to 35 degrees), so the whole dune creeps downwind.",
    "Figure: a barchan dune in plan view and in cross-section",
    "landforms/arid-wind", "### Landforms of wind erosion");
}

// ---------- 4. Wind transport: suspension, saltation, surface creep (landforms/arid-wind.md)
{
  const gy = 330, per = 80; // 1 m = 80 px
  let b = D.rect(0, gy, 560, 70, { fill: SAND, stroke: "none" }) + D.line(0, gy, 560, gy, { stroke: C.amber, width: 2 });
  b += D.line(30, gy - 2 * per, 530, gy - 2 * per, { stroke: C.muted, width: 1.3, dash: true }) + D.text(536, gy - 2 * per - 5, "2 m", { size: 12.5, fill: C.muted, anchor: "end" });
  b += D.line(30, gy - per, 530, gy - per, { stroke: C.muted, width: 1, dash: true }) + D.text(536, gy - per - 5, "1 m", { size: 12.5, fill: C.muted, anchor: "end" });
  b += D.arrow(20, 40, 150, 40, { stroke: C.blue, width: 3 }) + D.text(160, 45, "Wind", { fill: C.blue, weight: 700 });
  // suspension: fine dust well above 2 m
  for (const [x, y] of [[230, 72], [280, 96], [330, 70], [390, 104], [440, 80], [490, 62], [260, 128], [360, 136]]) b += D.circle(x, y, 2.6, { fill: C.muted, stroke: C.muted, width: 1 });
  b += D.arrow(200, 92, 250, 92, { stroke: C.muted, width: 1.4 });
  b += lab(24, 100, "1  Suspension: fine dust,", { size: 12.5 }) + D.text(30, 120, "carried high and far", { size: 12.5 });
  // saltation: hops up to about 1 m
  for (const x of [120, 260, 400]) b += D.path_(`M${x},${gy - 4} C ${x + 15},${gy - 108} ${x + 95},${gy - 108} ${x + 110},${gy - 4}`, { stroke: C.amber, width: 2, arrow: true }) + D.circle(x, gy - 4, 4, { fill: C.amber, stroke: C.amber, width: 1 });
  b += lab(24, gy - 112, "2  Saltation: sand grains hop, rarely above 1 to 2 m", { size: 12.5 });
  // creep: larger grains
  for (const x of [90, 210, 330, 450]) b += D.circle(x, gy + 14, 9, { fill: ROCK, stroke: C.axis, width: 1.6 }) + D.arrow(x + 12, gy + 14, x + 46, gy + 14, { stroke: C.axis, width: 1.6 });
  b += lab(24, gy + 58, "3  Surface creep: larger grains rolled along", { size: 12.5 });
  await fig("wind-transport-saltation-creep",
    D.svg(560, 400, b),
    "Wind transport by grain size: fine dust is carried in suspension high above the ground, sand grains bounce in short hops by saltation rarely higher than about 1 to 2 m, and larger grains are pushed along the surface by creep.",
    "Figure: suspension, saltation and surface creep in wind transport",
    "landforms/arid-wind", "**Deposition** happens when");
}
