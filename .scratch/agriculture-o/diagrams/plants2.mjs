// agriculture-o plant diagrams 2: leaf section, root/stem sections. Run: node .scratch/agriculture-o/diagrams/plants2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const XY = "#bcd9e6", PH = "#f2c28b";

// ---------------------------------------------------------------- leaf cross-section
{
  const W = 620, H = 370;
  let b = "";
  const x0 = 30, x1 = 400;
  const yc = 70, ue = [72, 92], pal = [92, 160], sp = [160, 240], le = [240, 260];
  for (const x of [90, 190, 290]) b += D.arrow(x, 20, x, 58, { stroke: C.amber, width: 2 });
  b += D.text(x0, 14, "light", { size: 12, fill: C.amber });
  b += D.rect(x0, yc - 4, x1 - x0, 4, { fill: "#cdb48a", stroke: "none" });
  const cw = 18;
  for (let x = x0; x + cw <= x1; x += cw) b += D.rect(x, ue[0], cw, ue[1] - ue[0], { fill: "#f6f3ec", stroke: C.axis, width: 1 });
  for (let x = x0; x + cw <= x1; x += cw) {
    b += D.rect(x, pal[0], cw, pal[1] - pal[0], { fill: "#e7f4e3", stroke: C.axis, width: 1 });
    for (const [dy, dx] of [[10, 5], [22, 12], [36, 6], [50, 11]]) b += D.circle(x + dx, pal[0] + dy, 2.4, { fill: C.green, stroke: C.green, width: 1 });
  }
  for (let r = 0; r < 3; r += 1) for (let c = 0; c < 10; c += 1) b += D.circle(x0 + 22 + c * 37 + (r % 2) * 17, sp[0] + 14 + r * 24, 11, { fill: "#eaf5e6", stroke: C.axis, width: 1 });
  const vx = 150, vy = 200;
  b += D.circle(vx, vy, 22, { fill: "#fff", stroke: C.axis, width: 1.6 });
  b += D.path_(`M${vx - 17},${vy - 2} A17,17 0 0 1 ${vx + 17},${vy - 2} Z`, { fill: XY, stroke: C.blue, width: 1.5 });
  b += D.path_(`M${vx - 17},${vy + 2} A17,17 0 0 0 ${vx + 17},${vy + 2} Z`, { fill: PH, stroke: C.amber, width: 1.5 });
  const sx = 270;
  for (let x = x0; x + cw <= x1; x += cw) {
    if (x + cw > sx - 16 && x < sx + 16) continue;
    b += D.rect(x, le[0], cw, le[1] - le[0], { fill: "#f6f3ec", stroke: C.axis, width: 1 });
  }
  b += D.path_(`M${sx - 16},${le[0]} C${sx - 16},${le[0] + 24} ${sx - 3},${le[1] + 2} ${sx - 3},${le[1] - 10} L${sx - 3},${le[0]} Z`, { fill: C.fillGreen, stroke: C.green, width: 1.6 });
  b += D.path_(`M${sx + 16},${le[0]} C${sx + 16},${le[0] + 24} ${sx + 3},${le[1] + 2} ${sx + 3},${le[1] - 10} L${sx + 3},${le[0]} Z`, { fill: C.fillGreen, stroke: C.green, width: 1.6 });
  b += D.arrow(sx - 50, 300, sx - 8, 264, { stroke: C.blue, width: 1.8 }) + D.text(sx - 150, 316, "carbon dioxide in", { size: 12, fill: C.blue });
  b += D.arrow(sx + 8, 264, sx + 50, 300, { stroke: C.blue, width: 1.8 }) + D.text(sx + 30, 316, "oxygen and water\nvapour out", { size: 12, fill: C.blue });
  const lx = 424;
  const lab2 = (y, name, desc, tx, ty) => { b += leader(tx, ty, lx - 4, y - 4) + D.text(lx, y, name, { size: 13, weight: 700 }) + (desc ? D.text(lx, y + 15, desc, { size: 12, fill: C.muted }) : ""); };
  lab2(46, "Waxy cuticle", "cuts water loss", 380, yc - 2);
  lab2(88, "Upper epidermis", "transparent, protects", 380, 82);
  lab2(128, "Palisade mesophyll", "most chloroplasts: main\nsite of photosynthesis", 380, 125);
  lab2(188, "Spongy mesophyll", "air spaces for gas exchange", 380, 190);
  lab2(226, "Vein", "xylem above, phloem below", vx + 22, vy + 4);
  lab2(270, "Lower epidermis", "", 380, 252);
  lab2(306, "Stoma between", "two guard cells", sx + 18, le[0] + 8);
  const alt = "Cross-section of a dicotyledonous leaf from top to bottom: waxy cuticle, upper epidermis, palisade mesophyll full of chloroplasts, spongy mesophyll with air spaces and a vein with xylem above phloem, then the lower epidermis with a stoma between two guard cells that lets carbon dioxide in and oxygen and water vapour out.";
  const cap = "Figure: a section through a leaf, from the waxy cuticle to the lower epidermis";
  await D.figure(FAMILY, "leaf-cross-section", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/plants/roots-stems-leaves.md`, "In most dicotyledons the stomata are mainly on the lower surface", D.md("leaf-cross-section", alt, cap));
}

// ---------------------------------------------------------------- root, dicot stem, monocot stem in cross-section
{
  const W = 620, H = 340;
  let b = "";
  const cy = 120, R = 84;
  const xs = [100, 310, 520];
  b += D.rect(14, 292, 18, 12, { fill: XY, stroke: C.blue, width: 1.5 }) + D.text(38, 303, "xylem (water and salts up)", { size: 13 });
  b += D.rect(250, 292, 18, 12, { fill: PH, stroke: C.amber, width: 1.5 }) + D.text(274, 303, "phloem (sugars)", { size: 13 });
  b += D.text(14, 328, "Blue-grey shapes are xylem and orange shapes are phloem.", { size: 12, fill: C.muted });
  const bundle = (x, y, ang, s = 1) => {
    const ox = Math.cos(ang), oy = Math.sin(ang);
    return D.circle(x + ox * 7 * s, y + oy * 7 * s, 6.5 * s, { fill: PH, stroke: C.amber, width: 1.4 }) + D.circle(x - ox * 5 * s, y - oy * 5 * s, 7.5 * s, { fill: XY, stroke: C.blue, width: 1.4 });
  };
  let cx = xs[0];
  b += D.circle(cx, cy, R, { fill: "#f6f3ec", stroke: C.axis, width: 2 });
  for (let i = 0; i < 24; i += 1) { const a = (i * Math.PI * 2) / 24; b += D.line(cx + R * Math.cos(a), cy + R * Math.sin(a), cx + (R + 12) * Math.cos(a), cy + (R + 12) * Math.sin(a), { stroke: C.axis, width: 1.2 }); }
  b += D.circle(cx, cy, 34, { fill: "#fff", stroke: C.axis, width: 1.6 });
  const star = [];
  for (let i = 0; i < 8; i += 1) { const a = (i * Math.PI) / 4 - Math.PI / 2; const r1 = i % 2 === 0 ? 26 : 8; star.push([cx + r1 * Math.cos(a), cy + r1 * Math.sin(a)]); }
  b += D.polyline(star, { close: true, fill: XY, stroke: C.blue, width: 1.6 });
  for (const a of [-Math.PI / 4, Math.PI / 4, (3 * Math.PI) / 4, (-3 * Math.PI) / 4]) b += D.circle(cx + 18 * Math.cos(a), cy + 18 * Math.sin(a), 5, { fill: PH, stroke: C.amber, width: 1.4 });
  b += D.text(cx, cy + R + 36, "Dicot root", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(cx, cy + R + 52, "xylem star in the centre", { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(cx, 14, "root hairs on the epidermis", { anchor: "middle", size: 12, fill: C.muted });
  cx = xs[1];
  b += D.circle(cx, cy, R, { fill: "#f6f3ec", stroke: C.axis, width: 2 });
  b += D.circle(cx, cy, 24, { fill: "#fff", stroke: C.axis, width: 1, dash: true });
  for (let i = 0; i < 8; i += 1) { const a = (i * Math.PI) / 4; b += bundle(cx + 52 * Math.cos(a), cy + 52 * Math.sin(a), a); }
  b += D.text(cx, cy + 5, "pith", { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(cx, cy + R + 36, "Dicot stem", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(cx, cy + R + 52, "bundles in a ring", { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(cx, 14, "phloem outside, xylem inside", { anchor: "middle", size: 12, fill: C.muted });
  cx = xs[2];
  b += D.circle(cx, cy, R, { fill: "#f6f3ec", stroke: C.axis, width: 2 });
  const pts = [[0, -58, -1.57], [30, -48, -1.1], [-34, -42, -2.2], [55, -14, -0.3], [-58, -10, 3.0], [8, -20, -1.5], [-26, -6, 3.5], [30, 10, 0.4], [-12, 22, 1.9], [50, 38, 0.8], [-46, 36, 2.4], [8, 52, 1.6], [-14, 58, 1.8], [24, 36, 1]];
  for (const [dx, dy, a] of pts) b += bundle(cx + dx * 0.95, cy + dy * 0.95, a, 0.8);
  b += D.text(cx, cy + R + 36, "Maize stem", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(cx, cy + R + 52, "bundles scattered", { anchor: "middle", size: 12, fill: C.muted });
  const alt = "Cross-sections side by side: a dicotyledonous root with a star of xylem in the centre and phloem between its arms, a dicotyledonous stem with vascular bundles in a ring (phloem outside, xylem inside, pith in the middle), and a maize stem with its bundles scattered.";
  const cap = "Figure: where xylem and phloem lie in a dicot root, a dicot stem and a maize stem";
  await D.figure(FAMILY, "root-stem-cross-sections", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/plants/roots-stems-leaves.md`, "This is the basis of the ring-barking experiment", D.md("root-stem-cross-sections", alt, cap));
}
console.log("plants2 done");
