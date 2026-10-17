// biology-o: plant-nutrition (leaf section, guard cells, pondweed apparatus, limiting-factor graph)
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

// ---------- 1. Leaf transverse section
{
  let b = "";
  const x0 = 40, x1 = 400;
  b += D.rect(x0, 40, x1 - x0, 4, { fill: C.amber, stroke: "none" });                       // upper cuticle
  for (let x = x0; x < x1; x += 45) b += D.rect(x + 1, 46, 43, 26, { fill: "#f6f2ea", r: 3 });   // upper epidermis
  for (let x = x0 + 2; x < x1 - 10; x += 24) {                                                  // palisade
    b += D.rect(x, 76, 21, 84, { fill: C.fillGreen, stroke: C.green, width: 1.4, r: 4 });
    for (const y of [86, 106, 126, 146]) b += D.dot(x + 5 + (y % 20 === 6 ? 8 : 0), y, { r: 2.6, fill: C.green });
  }
  // spongy mesophyll: irregular rounded cells with air spaces between
  const sp = [[60, 185], [110, 200], [160, 182], [210, 205], [330, 190], [365, 205], [90, 228], [140, 232], [200, 235], [250, 238], [310, 232], [370, 235], [60, 215], [250, 175]];
  for (const [x, y] of sp) { b += ell(x, y, 19, 14, { fill: C.fillGreen, stroke: C.green, width: 1.4 }) + D.dot(x - 5, y, { r: 2.4, fill: C.green }); }
  // vascular bundle
  b += D.circle(285, 205, 30, { fill: "#fbf7ef", stroke: C.ink, width: 2 });
  b += D.circle(285, 192, 9, { fill: C.fillBlue, stroke: C.teal, width: 2 }) + D.circle(270, 197, 6, { fill: C.fillBlue, stroke: C.teal, width: 2 }) + D.circle(300, 197, 6, { fill: C.fillBlue, stroke: C.teal, width: 2 });
  b += D.rect(268, 210, 34, 14, { fill: C.fillAmber, stroke: C.amber, width: 1.6, r: 3 });
  // lower epidermis with a stoma at x 150..180
  b += D.rect(x0, 258, 130, 26, { fill: "#f6f2ea", r: 3 }) + D.rect(x0 + 135, 258, 100, 26, { fill: "#f6f2ea", r: 3 }) + D.rect(x0 + 240, 258, 120, 26, { fill: "#f6f2ea", r: 3 });
  b += ell(x0 + 140, 271, 7, 13, { fill: C.fillGreen, stroke: C.green, width: 1.8 }) + ell(x0 + 168, 271, 7, 13, { fill: C.fillGreen, stroke: C.green, width: 1.8 });
  b += D.rect(x0, 285, x1 - x0, 3, { fill: C.amber, stroke: "none" });                       // lower cuticle
  b += D.arrow(x0 + 154, 318, x0 + 154, 290, { width: 1.6, stroke: C.blue });
  b += D.text(x0 + 154, 336, "CO₂ in", { anchor: "middle", size: 13, fill: C.blue });
  // labels (right)
  const lx = 420;
  b += call(lx, 44, "Waxy cuticle", 395, 42);
  b += call(lx, 66, "Upper epidermis", 390, 60);
  b += call(lx, 118, "Palisade mesophyll", 372, 118);
  b += call(lx, 168, "Vascular bundle", 312, 196);
  b += D.text(lx, 186, "(xylem above,", { size: 13, fill: C.muted }) + D.text(lx, 202, "phloem below)", { size: 13, fill: C.muted });
  b += call(lx, 240, "Spongy mesophyll", 385, 215);
  b += D.text(lx, 258, "(air spaces)", { size: 13, fill: C.muted });
  b += call(lx, 284, "Lower epidermis", 395, 272);
  b += call(lx, 312, "Lower cuticle", 380, 287);
  b += call(118, 322, "Stoma", 176, 284, { anchor: "end" });
  const alt = "Transverse section of a leaf from top to bottom: waxy cuticle, upper epidermis, tightly packed palisade mesophyll full of chloroplasts, spongy mesophyll with air spaces, a vascular bundle with xylem above and phloem below, and a lower epidermis with a stoma between two guard cells through which carbon dioxide enters.";
  await add("leaf-cross-section", D.svg(580, 380, b), alt, "Figure: a transverse section of a leaf with its layers labelled", "plant-nutrition/leaf-structure", "7. **Lower cuticle**");
}

// ---------- 2. Pondweed apparatus (lamp distance d from the tube)
{
  let b = "";
  // beaker of water, tube of pondweed
  b += D.rect(250, 100, 160, 190, { fill: C.fillBlue, stroke: C.ink, width: 2.4 });
  b += D.rect(250, 100, 160, 22, { fill: "#ffffff", stroke: "none" });
  b += D.line(250, 122, 410, 122, { stroke: C.teal, width: 1.6 });
  b += D.rect(300, 80, 60, 180, { fill: "#f1fafc", stroke: C.ink, width: 2, r: 6 });
  b += D.path_("M330,236 C318,214 342,196 330,172 C320,152 342,140 330,120", { stroke: C.green, width: 4 });
  for (const [x, y] of [[334, 112], [326, 94], [338, 150], [324, 188]]) b += D.circle(x, y, 3, { fill: "#fff", stroke: C.ink, width: 1.2 });
  b += call(440, 160, "Boiling tube of water\nwith sodium\nhydrogencarbonate", 360, 170);
  b += call(440, 230, "Pondweed, cut end up", 332, 205);
  b += call(440, 106, "Oxygen bubbles", 338, 106);
  b += D.text(330, 310, "Beaker of water (stops the lamp heating the tube)", { anchor: "middle", size: 13, fill: C.muted });
  // lamp
  b += D.rect(40, 150, 40, 70, { fill: C.fillAmber, stroke: C.amber, width: 2.4, r: 6 }) + D.circle(100, 185, 14, { fill: "#fff7e6", stroke: C.amber, width: 2 });
  for (const dy of [-34, 0, 34]) b += D.arrow(120, 185 + dy, 235, 185 + dy * 0.5, { stroke: C.amber, width: 1.4 });
  b += D.text(60, 140, "Lamp", { anchor: "middle", size: 14, weight: 700 });
  // ruler from 0 at lamp to 30 cm... drawn to scale 5 px per cm from lamp (x=100) to tube (x=300): 40 cm
  const R0 = 100, S = 5, y = 365;
  b += D.rect(R0, y, 300, 22, { fill: "#fbf3d6", stroke: C.ink, width: 1.6 });
  for (let cm = 0; cm <= 60; cm += 10) { b += D.line(R0 + cm * S, y, R0 + cm * S, y + 10, { width: 1.4 }) + D.text(R0 + cm * S, y + 36, String(cm), { anchor: "middle", size: 12, fill: C.muted }); }
  b += D.arrow(R0, y - 12, 300, y - 12, { width: 1.6, arrowStart: true, stroke: C.red }) + D.tag(200, y - 20, "distance d (cm): move the lamp, keep the rest fixed", { anchor: "middle", size: 13, fill: C.red });
  const alt = "Pondweed apparatus: a lamp at a measured distance from a boiling tube of water and sodium hydrogencarbonate holding pondweed with its cut end up, inside a beaker of water; oxygen bubbles from the cut end are counted per minute at each lamp distance.";
  await add("pondweed-apparatus", D.svg(580, 420, b), alt, "Figure: apparatus for investigating how light intensity affects the rate of photosynthesis", "plant-nutrition/limiting-factors-and-gas-exchange", "5. Repeat at other distances.");
}

// ---------- 3. Limiting-factor graph from Example 2's table
{
  const li = [1, 2, 3, 4, 5, 6], lo = [10, 20, 27, 30, 30, 30], hi = [10, 20, 30, 39, 45, 46];
  const ax = D.axes({ x: [0, 6.5], y: [0, 50], xTicks: 1, yTicks: 10, xLabel: "Light intensity (arbitrary units)", yLabel: "Rate of photosynthesis", w: 560, h: 400, pad: { l: 60, r: 30, t: 30, b: 62 } });
  let b = ax.frame;
  b += ax.line(hi.map((v, i) => [li[i], v]), { stroke: C.green, width: 3 }) + ax.line(lo.map((v, i) => [li[i], v]), { stroke: C.blue, width: 3 });
  li.forEach((x, i) => { b += ax.point(x, hi[i], { stroke: C.green }) + ax.point(x, lo[i], { stroke: C.blue }); });
  b += ax.tag(6.4, 46, "0.10% CO₂: levels off at about 46", { anchor: "end", dy: -14, size: 13, fill: C.green });
  b += ax.tag(6.4, 30, "0.04% CO₂: levels off at 30", { anchor: "end", dy: 44, size: 13, fill: C.blue });
  b += ax.tag(0.15, 38, "Curves identical: light is limiting", { anchor: "start", size: 13 }) + ax.line([[1.1, 37.6], [1.45, 17]], { stroke: C.muted, width: 1.3 });
  const alt = "Graph from Example 2: at 0.04% carbon dioxide the rate rises from 10 to 30 and levels off from light intensity 4; at 0.10% carbon dioxide it is the same up to intensity 2, then climbs higher to about 46, showing light limits the rate first and then carbon dioxide.";
  await add("limiting-factors-graph", D.svg(560, 400, b), alt, "Figure: rate of photosynthesis against light intensity at two carbon dioxide concentrations", "plant-nutrition/limiting-factors-and-gas-exchange", "At any moment, the rate of photosynthesis is held down");
}
