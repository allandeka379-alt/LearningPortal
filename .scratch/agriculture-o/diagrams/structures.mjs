// agriculture-o structures and marketing diagrams. Run: node .scratch/agriculture-o/diagrams/structures.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const WOOD = "#9a6b3a", GROUND = "#efe2cc";

// ---------------------------------------------------------------- fence: side view (4 strands, posts 10 m apart, 3 droppers a span)
{
  const spanM = 10, droppers = 3, strands = [0.25, 0.5, 0.85, 1.3];
  const W = 690, H = 390;
  const gy = 250, pxPerM = 14, hpx = 120; // horizontal 10 m = 170 px; vertical 1 m = 120 px (not to scale)
  let b = "";
  b += D.rect(0, gy, W, 90, { fill: GROUND, stroke: "none" }) + D.line(0, gy, W, gy, { stroke: "#7a5a2f", width: 3 });
  const xs = [175, 175 + spanM * pxPerM, 175 + 2 * spanM * pxPerM, 175 + 3 * spanM * pxPerM]; // S, L, L, S
  const types = ["S", "L", "L", "S"];
  // wires
  for (const h of strands) b += D.line(xs[0], gy - h * hpx, xs[3], gy - h * hpx, { stroke: C.axis, width: 1.6 });
  // posts
  xs.forEach((x, i) => { const tall = types[i] === "S" ? 1.6 : 1.5; b += D.rect(x - (types[i] === "S" ? 7 : 4), gy - tall * hpx, types[i] === "S" ? 14 : 8, tall * hpx + 28, { fill: WOOD, stroke: C.axis, width: 1.4 }); });
  // droppers: evenly spaced in each span
  for (let s = 0; s < 3; s += 1) for (let d = 1; d <= droppers; d += 1) { const x = xs[s] + ((xs[s + 1] - xs[s]) * d) / (droppers + 1); b += D.line(x, gy - strands[3] * hpx, x, gy - strands[0] * hpx, { stroke: "#b08a5a", width: 3 }); }
  // left: box brace on the outside
  const bx = xs[0] - 55;
  b += D.rect(bx - 5, gy - 1.5 * hpx, 10, 1.5 * hpx + 28, { fill: WOOD, stroke: C.axis, width: 1.4 });
  b += D.line(bx, gy - 1.4 * hpx, xs[0], gy - 1.4 * hpx, { stroke: C.axis, width: 5 });
  b += D.line(bx, gy - 0.1 * hpx, xs[0], gy - 1.4 * hpx, { stroke: C.red, width: 2 });
  b += D.text(10, 44, "Box brace: rail on top and a\ndiagonal wire, twisted tight", { size: 12 });
  b += leader(60, 70, bx - 4, gy - 1.3 * hpx);
  // right: diagonal stay
  b += D.line(xs[3] + 2, gy - 1.35 * hpx, xs[3] + 70, gy - 2, { stroke: WOOD, width: 8 });
  b += D.rect(xs[3] + 55, gy - 2, 34, 20, { fill: "#b9b3a6", stroke: C.axis, width: 1.4 });
  b += D.text(xs[3] - 40, 44, "Diagonal stay to a\nblock in the ground", { size: 12 });
  b += leader(xs[3] + 30, 74, xs[3] + 30, gy - 0.9 * hpx);
  // labels
  b += D.text(xs[0], gy + 52, "Straining post", { size: 13, anchor: "middle", weight: 700 });
  b += D.text(xs[1], gy + 52, "Line post", { size: 13, anchor: "middle", weight: 700 });
  b += D.line(xs[1], gy + 70, xs[2], gy + 70, { stroke: C.blue, width: 1.8, arrow: true, arrowStart: true }) + D.text((xs[1] + xs[2]) / 2, gy + 88, `span ${spanM} m`, { size: 13, anchor: "middle", fill: C.blue, weight: 700 });
  b += D.text(xs[1] - 10, gy - 1.62 * hpx, "4 strands, closer together near the ground", { size: 12, fill: C.muted });
  b += D.text(xs[1] + 14, gy - 0.12 * hpx, `${droppers} droppers in each span`, { size: 12, fill: C.muted });
  b += D.text(10, 380, "Not to scale. The pull of the strained wire is towards the right-hand post; the anchor pushes back against it.", { size: 12, fill: C.muted });
  const alt = "Side view of a cattle fence: four strands of barbed wire, closer together near the ground, line posts 10 m apart with three droppers in each span, and straining posts at the ends held up by a box brace (left) and a diagonal stay to a block in the ground (right).";
  const cap = "Figure: a wire fence with line posts, droppers and two kinds of anchor on the straining posts";
  await D.figure(FAMILY, "fence-side-view-anchors", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/structures/fence-construction.md`, "| Concrete footing |", D.md("fence-side-view-anchors", alt, cap));
}

// ---------------------------------------------------------------- paddock fence plan: 70 posts
{
  const len = 200, wid = 150, spacing = 10, strands = 4, rollM = 500, droppersPerSpan = 3;
  const posts = (2 * (len + wid)) / spacing;
  const wire = 2 * (len + wid) * strands;
  const rolls = Math.ceil(wire / rollM);
  const droppers = posts * droppersPerSpan;
  const cost = posts * 5 + rolls * 60 + droppers * 0.8;
  if (posts !== 70 || wire !== 2800 || rolls !== 6 || droppers !== 210 || Math.round(cost) !== 878) throw new Error("fence numbers " + [posts, wire, rolls, droppers, cost]);
  const W = 640, H = 330, k = 1.5, ox = 30, oy = 40;
  let b = "";
  b += D.rect(ox, oy, len * k, wid * k, { fill: "#f5efe0", stroke: C.axis, width: 1.6 });
  let n = 0;
  const post = (x, y, corner) => { n += 1; return D.rect(ox + x * k - (corner ? 6 : 3.5), oy + y * k - (corner ? 6 : 3.5), corner ? 12 : 7, corner ? 12 : 7, { fill: corner ? C.red : WOOD, stroke: C.axis, width: 1 }); };
  const per = 2 * (len + wid);
  for (let s = 0; s < per; s += spacing) {
    let x, y;
    if (s < len) { x = s; y = 0; } else if (s < len + wid) { x = len; y = s - len; } else if (s < 2 * len + wid) { x = len - (s - len - wid); y = wid; } else { x = 0; y = wid - (s - 2 * len - wid); }
    b += post(x, y, [0, len, len + wid, 2 * len + wid].includes(s));
  }
  if (n !== posts) throw new Error("drawn posts " + n);
  b += D.text(ox + (len * k) / 2, oy + (wid * k) / 2 - 8, `${len} m x ${wid} m`, { size: 14, anchor: "middle", weight: 700 }) + D.text(ox + (len * k) / 2, oy + (wid * k) / 2 + 12, "closed fence", { size: 13, anchor: "middle", fill: C.muted });
  b += D.text(ox, oy - 12, "Plan of the paddock fence", { size: 14, weight: 700 });
  const rx = 360;
  const rows = [
    ["Perimeter", `2 x (${len} + ${wid}) = ${2 * (len + wid)} m`],
    ["Posts", `${2 * (len + wid)} / ${spacing} = ${posts} (a closed loop)`],
    ["Wire", `${2 * (len + wid)} x ${strands} = ${wire} m`],
    ["Rolls", `${wire} / ${rollM} = 5.6, buy ${rolls}`],
    ["Droppers", `${posts} spans x ${droppersPerSpan} = ${droppers}`],
    ["Cost", `350 + 360 + 168 = US$${cost}`],
  ];
  rows.forEach(([a, c], i) => { b += D.text(rx, oy + 14 + i * 38, a, { size: 13, weight: 700 }) + D.text(rx, oy + 31 + i * 38, c, { size: 13 }); });
  b += D.rect(ox, 280, 12, 12, { fill: C.red, stroke: C.axis, width: 1 }) + D.text(ox + 18, 291, "corner straining post (4)", { size: 12 }) + D.rect(ox + 190, 282, 8, 8, { fill: WOOD, stroke: C.axis, width: 1 }) + D.text(ox + 204, 291, "other posts: every 10 m", { size: 12 });
  const alt = "Plan of the 200 m by 150 m paddock fence with a post every 10 m: 70 posts in a closed loop with four corner straining posts, 2,800 m of wire (700 m times 4 strands, which is 5.6 rolls so 6 are bought), 210 droppers and a materials cost of US$878.";
  const cap = "Figure: the 70 posts of a closed paddock fence, and the quantities and cost worked out in the text";
  await D.figure(FAMILY, "paddock-fence-plan-70-posts", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/structures/fence-construction.md`, "Materials for a paddock fence", D.md("paddock-fence-plan-70-posts", alt, cap));
}

// ---------------------------------------------------------------- earth dam cross-section
{
  const W = 700, H = 380;
  let b = "";
  const gy = 270;
  b += D.rect(0, gy, W, 110, { fill: "#ddd2bf", stroke: "none" }) + D.line(0, gy, W, gy, { stroke: "#7a5a2f", width: 2 });
  b += D.text(10, 372, "Impermeable clay or rock base", { size: 12, fill: C.muted });
  // wall trapezoid: base 300 (x 200-500), top 70 (x 315-385), height 170
  const top = gy - 170;
  const baseL = 200, baseR = 500, topL = 315, topR = 385;
  b += D.polyline([[baseL, gy], [topL, top], [topR, top], [baseR, gy]], { close: true, fill: "#d9c3a0", stroke: C.axis, width: 2 });
  // clay core
  b += D.polyline([[330, gy], [342, top], [358, top], [370, gy]], { close: true, fill: "#b9825a", stroke: C.axis, width: 1.4 });
  // cut-off trench below
  b += D.rect(330, gy, 40, 70, { fill: "#b9825a", stroke: C.axis, width: 1.4 });
  // water on the left, level below the top (freeboard)
  const wl = top + 36;
  const waterLeftEdge = baseL + ((gy - wl) / (gy - top)) * (topL - baseL);
  b += D.polyline([[10, wl], [waterLeftEdge, wl], [baseL, gy], [10, gy]], { close: true, fill: "#bfe3ef", stroke: C.blue, width: 1.6 }) + D.text(50, wl + 40, "Water", { size: 14, weight: 700, fill: C.blue });
  b += D.line(10, wl, waterLeftEdge, wl, { stroke: C.blue, width: 2 });
  // pitching on the upstream face
  for (let i = 0; i < 9; i += 1) { const t = i / 8; const x = baseL + t * (topL - baseL) + 8, y = gy - t * 170 + 2; b += D.circle(x, y, 4, { fill: "#a39b8d", stroke: C.axis, width: 0.8 }); }
  // grass on downstream face
  for (let i = 0; i < 9; i += 1) { const t = i / 8; const x = baseR - t * (baseR - topR) - 6, y = gy - t * 170 - 4; b += D.line(x, y, x - 3, y - 10, { stroke: C.green, width: 2 }); }
  // pressure arrows on the upstream face, length proportional to depth
  const depthTop = gy - wl;
  [1 / 3, 2 / 3, 1].forEach((f) => {
    const y = wl + f * depthTop * 0.97;
    const face = baseL + ((gy - y) / 170) * (topL - baseL);
    const len = 90 * f;
    b += D.arrow(face - 6 - len, y, face - 6, y, { stroke: C.red, width: 2 });
  });
  b += D.text(10, wl - 10, "Full water level", { size: 12, fill: C.blue });
  b += D.text(14, 28, "Longer arrows = more pressure", { size: 13, fill: C.red }) + D.text(14, 46, "at depth: twice the depth,", { size: 13, fill: C.red }) + D.text(14, 64, "twice the pressure.", { size: 13, fill: C.red });
  // labels right
  const rx = 520;
  b += D.text(rx, 70, "Freeboard: wall top", { size: 13, weight: 700 }) + D.text(rx, 86, "above full level", { size: 12, fill: C.muted });
  b += leader(386, top + 8, rx - 4, 66);
  b += D.text(rx, 150, "Grass on the", { size: 13, weight: 700 }) + D.text(rx, 166, "downstream face", { size: 12, fill: C.muted });
  b += leader(470, gy - 70, rx - 4, 150);
  b += D.text(rx, 232, "Wall much wider", { size: 13, weight: 700 }) + D.text(rx, 248, "at the base", { size: 12, fill: C.muted });
  b += D.line(baseL, gy + 14, baseR, gy + 14, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true });
    b += D.text(210, 54, "Clay core (watertight)", { size: 13, weight: 700 }) + leader(300, 60, 346, top + 30);
  b += D.text(14, 330, "Stone pitching on the upstream face", { size: 12 }) + leader(120, 318, baseL + 14, gy - 12);
  b += D.text(380, 342, "Cut-off trench filled with clay", { size: 12 }) + leader(400, 330, 372, gy + 50);
  b += D.text(rx - 10, 300, "Spillway: cut round one end", { size: 12, fill: C.muted }) + D.text(rx - 10, 316, "of the wall (not shown)", { size: 12, fill: C.muted });
  const alt = "Cross-section of a small earth dam: a wall much wider at the base than the top with a clay core, a cut-off trench of compacted clay down to the impermeable base, stone pitching on the upstream face, grass on the downstream face, freeboard above the full water level, and pressure arrows that get longer with depth because water pressure doubles when the depth doubles.";
  const cap = "Figure: the parts of a small earth dam and why the wall is thickest at the base";
  await D.figure(FAMILY, "earth-dam-cross-section", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/structures/water-supply.md`, "6. Leave **freeboard**", D.md("earth-dam-cross-section", alt, cap));
}

// ---------------------------------------------------------------- storage tank: features and worked capacity
{
  const r = 1.5, h = 2, cows = 30, perCow = 50;
  const vol = Math.PI * r * r * h; // m3
  const litres = Math.round(vol * 1000);
  const days = Math.round((litres / (cows * perCow)) * 10) / 10;
  if (litres !== 14137 || days !== 9.4) throw new Error("tank " + [litres, days]);
  const W = 680, H = 450;
  let b = "";
  const s = 56;
  const x0 = 210, wpx = 2 * r * s, hpx = h * s;
  const floor = 330, wallTop = floor - hpx - 26;
  b += D.rect(x0 - 10, floor, wpx + 20, 14, { fill: "#b9b3a6", stroke: C.axis, width: 1.4 });
  b += D.rect(x0, wallTop, wpx, floor - wallTop, { fill: "none", stroke: C.axis, width: 3 });
  b += D.rect(x0 + 1.5, floor - hpx, wpx - 3, hpx - 1, { fill: "#bfe3ef", stroke: "none" });
  b += D.line(x0, floor - hpx, x0 + wpx, floor - hpx, { stroke: C.blue, width: 2, dash: true });
  b += D.rect(x0 - 6, wallTop - 8, wpx + 12, 8, { fill: "#9aa3a8", stroke: C.axis, width: 1.4 });
  b += D.line(x0 + 20, wallTop - 40, x0 + 20, wallTop - 8, { stroke: C.axis, width: 5 }) + D.arrow(x0 + 20, wallTop - 70, x0 + 20, wallTop - 44, { stroke: C.blue, width: 2 });
  b += D.line(x0 + wpx, floor - hpx - 12, x0 + wpx + 40, floor - hpx - 12, { stroke: C.axis, width: 5 });
  b += D.line(x0 + wpx, floor - 26, x0 + wpx + 26, floor - 26, { stroke: C.axis, width: 6 });
  b += D.line(x0, floor - 4, x0 - 26, floor - 4, { stroke: C.red, width: 6 });
  b += D.line(x0, floor + 36, x0 + wpx, floor + 36, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true }) + D.text(x0 + wpx / 2, floor + 56, `diameter ${2 * r} m (radius ${r} m)`, { size: 13, anchor: "middle" });
  b += D.line(x0 + 30, floor - hpx, x0 + 30, floor, { stroke: C.blue, width: 1.6, arrow: true, arrowStart: true }) + D.text(x0 + 38, floor - hpx / 2, `${h} m`, { size: 13, fill: C.blue, weight: 700 });
  const lx = 440;
  const R2 = (y, t, d, tx, ty) => { b += leader(tx, ty, lx - 6, y - 4) + D.text(lx, y, t, { size: 13, weight: 700 }) + (d ? D.text(lx, y + 15, d, { size: 12, fill: C.muted }) : ""); };
  R2(44, "Screened inlet", "first-flush device for roof water", x0 + 24, wallTop - 50);
  R2(100, "Cover", "keeps out dirt, animals, mosquitoes", x0 + wpx - 10, wallTop - 4);
  R2(160, "Overflow pipe", "", x0 + wpx + 38, floor - hpx - 12);
  R2(250, "Outlet tap a little above the floor", "so settled sediment is not drawn off", x0 + wpx + 24, floor - 26);
  const L2 = (y, t, d, tx, ty) => { b += leader(tx, ty, 182, y - 4) + D.text(10, y, t, { size: 13, weight: 700 }) + D.text(10, y + 15, d, { size: 12, fill: C.muted }); };
  L2(296, "Scour (drain) valve", "at the very bottom, for cleaning", x0 - 24, floor - 4);
  L2(352, "Raised stand", "gives head for a gravity supply", x0 + 6, floor + 8);
  b += D.text(20, 418, `Volume = pi x ${r}^2 x ${h} = ${vol.toFixed(3)} m3 = ${litres.toLocaleString("en-GB")} L`, { size: 13, weight: 700 });
  b += D.text(20, 438, `30 cows x 50 L = ${(cows * perCow).toLocaleString("en-GB")} L a day, so the full tank lasts ${days} days`, { size: 13 });
  const alt = "Section of a cylindrical storage tank with inside radius 1.5 m and water depth 2 m on a raised stand, showing the screened inlet, cover, overflow pipe, outlet tap above the floor and scour valve at the bottom; its volume is 14.137 cubic metres or 14,137 litres, which lasts 30 cows using 1,500 litres a day for 9.4 days.";
  const cap = "Figure: the features of a storage tank and the capacity calculation from the worked example";
  await D.figure(FAMILY, "storage-tank-features", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/structures/water-supply.md`, "How much does a tank hold, and for how long?", D.md("storage-tank-features", alt, cap));
}

// ---------------------------------------------------------------- marketing: farm gate against town market (worked example)
{
  const crates = 60, farmGate = 4.0, town = 7.0, transport = 1.2, fee = 0.3;
  const net = Math.round((town - transport - fee) * 100) / 100;
  const extra = Math.round((net - farmGate) * 100) / 100;
  if (net !== 5.5 || extra !== 1.5 || Math.round(extra * crates) !== 90) throw new Error("tomato numbers");
  const W = 560, H = 400;
  const ax = D.axes({ x: [0, 2], y: [0, 8], xTicks: [], yTicks: 1, w: W, h: H, origin: false, arrows: false, yLabel: "US$ per crate" });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.5;
  const seg = (cx, y0, v, fill, label) => D.rect(cx - bw / 2, ax.Y(y0 + v), bw, ax.Y(y0) - ax.Y(y0 + v), { fill, stroke: "#fff", width: 1.5 }) + D.text(cx, (ax.Y(y0) + ax.Y(y0 + v)) / 2 + 5, label, { anchor: "middle", size: 13 });
  b += seg(ax.X(0.5), 0, farmGate, C.fillAmber, `US$${farmGate.toFixed(2)}`);
  b += seg(ax.X(1.5), 0, net, C.fillGreen, `Net US$${net.toFixed(2)}`);
  b += seg(ax.X(1.5), net, transport, "#f6c28a", `Transport ${transport.toFixed(2)}`);
  b += seg(ax.X(1.5), net + transport, fee, "#f3b0a8", "") + D.text(ax.X(1.5) + bw / 2 + 8, ax.Y(net + transport + fee / 2) + 5, `Fee ${fee.toFixed(2)}`, { size: 13 });
  b += D.text(ax.X(0.5), ax.Y(0) + 22, "Farm gate", { anchor: "middle", size: 13, weight: 700 }) + D.text(ax.X(1.5), ax.Y(0) + 22, `Harare: US$${town.toFixed(2)} gross`, { anchor: "middle", size: 13, weight: 700 });
  b += D.text(ax.X(0.5), ax.Y(farmGate) - 8, `Extra US$${extra.toFixed(2)} a crate in town`, { anchor: "middle", size: 12, fill: C.green });
  b += D.text(ax.X(1), H - 10, `${crates} crates x US$${extra.toFixed(2)} = US$${extra * crates} more, before time and risk`, { anchor: "middle", size: 13, weight: 700 });
  const alt = "Bar chart per crate of tomatoes: the farm gate price is US$4.00; in Harare the US$7.00 price is reduced by US$1.20 transport and a US$0.30 market fee to a net US$5.50, which is US$1.50 more per crate and US$90 more for 60 crates.";
  const cap = "Figure: farm gate against the net town price for a crate of tomatoes";
  await D.figure(FAMILY, "tomato-farm-gate-vs-town", D.svg(W, H, b), { alt, caption: cap });
  insertAfterBlock(`${L}/business/marketing.md`, "Farm gate or town market?", D.md("tomato-farm-gate-vs-town", alt, cap));
}
console.log("structures done");
