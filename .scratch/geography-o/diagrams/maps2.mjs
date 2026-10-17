// geography-o map-skills diagrams, part 2 (map components, sketch map, photo viewpoints, drainage patterns, scale, grid refs).
// Run from repo root: node .scratch/geography-o/diagrams/maps2.mjs
import fs from "node:fs";
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "geography-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;
const SNIP = new URL("./md-snippets.json", import.meta.url);
function snip(name, md) { const o = fs.existsSync(SNIP) ? JSON.parse(fs.readFileSync(SNIP, "utf8")) : {}; o[name] = md; fs.writeFileSync(SNIP, JSON.stringify(o, null, 1)); }
const badge = (x, y, n) => D.circle(x, y, 11, { fill: C.amber, stroke: C.amber, width: 1 }) + D.text(x, y + 5, String(n), { anchor: "middle", size: 14, weight: 700, fill: "#fff" });
const northArrow = (x, y, h = 44) => D.arrow(x, y + h, x, y, { width: 3 }) + D.text(x, y - 6, "N", { anchor: "middle", size: 15, weight: 700 });

// ---------- 1. A good map with its seven components (maps/map-basics.md list)
{
  let b = "";
  // frame
  b += D.rect(20, 40, 470, 340, { stroke: C.ink, width: 3 });
  b += D.text(255, 28, "Land use around Hillview School (fictional)", { anchor: "middle", size: 16, weight: 700 });
  // grid lines and numbers
  for (let i = 0; i < 4; i++) {
    const gx = 120 + i * 100, gy = 100 + i * 70;
    b += D.line(gx, 40, gx, 380, { stroke: C.grid, width: 1.2 }) + D.text(gx, 394, String(10 + i), { anchor: "middle", size: 12, fill: C.muted });
    b += D.line(20, gy, 490, gy, { stroke: C.grid, width: 1.2 }) + D.text(12, gy + 4, String(20 + i), { anchor: "end", size: 12, fill: C.muted });
  }
  // features
  b += D.rect(170, 150, 60, 36, { fill: C.fillAmber, stroke: C.amber }) + D.text(200, 172, "School", { anchor: "middle", size: 13 });
  b += D.rect(270, 230, 100, 60, { fill: C.fillGreen, stroke: C.green }) + D.text(320, 265, "Sports field", { anchor: "middle", size: 13 });
  b += D.dot(150, 260, { r: 5, stroke: C.blue, fill: C.blue }) + D.text(160, 264, "Borehole", { size: 13 });
  b += D.line(20, 200, 490, 200, { stroke: C.muted, width: 3 }) + D.text(400, 194, "Road", { size: 13, fill: C.muted });
  // key (bottom left, inside frame)
  b += D.rect(30, 300, 150, 72, { fill: "#fff", stroke: C.ink, width: 1.5 }) + D.text(38, 316, "Key", { size: 13, weight: 700 });
  b += D.rect(38, 322, 14, 10, { fill: C.fillAmber, stroke: C.amber, width: 1.5 }) + D.text(58, 332, "Building", { size: 12 });
  b += D.rect(38, 338, 14, 10, { fill: C.fillGreen, stroke: C.green, width: 1.5 }) + D.text(58, 348, "Sports field", { size: 12 });
  b += D.dot(45, 360, { r: 4, stroke: C.blue, fill: C.blue }) + D.text(58, 364, "Borehole", { size: 12 });
  // scale bar
  b += D.line(330, 345, 430, 345, { width: 3 }) + D.line(330, 339, 330, 351, { width: 2 }) + D.line(380, 339, 380, 351, { width: 2 }) + D.line(430, 339, 430, 351, { width: 2 });
  b += D.text(330, 335, "0", { anchor: "middle", size: 12 }) + D.text(380, 335, "100", { anchor: "middle", size: 12 }) + D.text(430, 335, "200 m", { anchor: "middle", size: 12 }) + D.text(380, 366, "Scale 1:5 000 (approx.)", { anchor: "middle", size: 12 });
  b += northArrow(450, 70);
  // source
  b += D.text(255, 412, "Source: school survey, 2026 (fictional)", { anchor: "middle", size: 12, fill: C.muted });
  // numbered callouts (match the numbered list: 1 title, 2 frame, 3 key, 4 scale, 5 north, 6 grid, 7 source and date)
  b += badge(60, 22, 1) + badge(494, 46, 2) + badge(194, 304, 3) + badge(450, 346, 4) + badge(475, 70, 5) + badge(220, 52, 6) + badge(120, 412, 7);
  b += D.text(255, 440, "1 title  2 frame  3 key  4 scale  5 north point  6 grid lines  7 source and date", { anchor: "middle", size: 12.5, fill: C.ink });
  const alt = "A sketch of a map of a school with its seven components numbered: 1 title, 2 frame, 3 key, 4 scale bar, 5 north arrow, 6 numbered grid lines, 7 source and date, so a reader can interpret the symbols, measure distance and find direction.";
  const cap = "Figure: the seven components of a good map, labelled on a map of a fictional school";
  await D.figure(FAMILY, "good-map-components", D.svg(520, 452, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/map-basics.md`, "7. **Source and date**", D.md("good-map-components", alt, cap));
}

// ---------- 2. Chipo's incomplete sketch map (question maps.map-basics.q18)
{
  let b = D.rect(20, 40, 400, 290, { stroke: C.ink, width: 3 });
  b += D.text(220, 28, "My village", { anchor: "middle", size: 17, weight: 700 });
  // river (wavy)
  b += D.path_("M20,250 C100,210 160,300 240,255 S360,215 420,260", { stroke: C.blue, width: 5 });
  b += D.text(330, 296, "River", { size: 13, fill: C.blue });
  // huts
  for (const [x, y] of [[90, 100], [140, 130], [100, 160], [190, 95], [230, 150]]) b += D.polyline([[x - 12, y + 10], [x - 12, y - 4], [x, y - 16], [x + 12, y - 4], [x + 12, y + 10]], { fill: C.fillAmber, stroke: C.amber, close: true, width: 1.8 });
  b += D.text(130, 80, "Huts", { size: 13 });
  b += D.dot(300, 120, { r: 6, stroke: C.blue, fill: C.blue }) + D.text(312, 124, "Borehole", { size: 13 });
  b += D.rect(330, 150, 60, 40, { fill: C.fillGrey, stroke: C.ink, width: 1.8 }) + D.text(360, 175, "Store", { anchor: "middle", size: 13 });
  // key
  b += D.rect(34, 52, 0, 0) + D.rect(30, 246 - 20, 0, 0);
  b += D.rect(30, 272, 150, 52, { fill: "#fff", stroke: C.ink, width: 1.5 }) + D.text(38, 288, "Key", { size: 13, weight: 700 });
  b += D.polyline([[40, 306], [40, 298], [48, 292], [56, 298], [56, 306]], { fill: C.fillAmber, stroke: C.amber, close: true, width: 1.5 }) + D.text(64, 307, "Hut", { size: 12 });
  b += D.dot(100, 302, { r: 4, stroke: C.blue, fill: C.blue }) + D.text(110, 307, "Borehole", { size: 12 });
  const alt = "Chipo's freehand sketch map titled My village, inside a frame with a key, showing huts, a borehole, a store and a river; it has no north arrow and no scale.";
  const cap = "Figure: Chipo's sketch map of her village (it has no north arrow and no scale)";
  await D.figure(FAMILY, "chipo-village-sketch-map", D.svg(440, 344, b), { alt, caption: cap });
  snip("chipo-village-sketch-map", D.md("chipo-village-sketch-map", alt, cap));
}

// ---------- 3. Types of photograph (maps/photos-remote-sensing.md)
{
  let b = "";
  const gy = 330;
  b += D.line(20, gy, 540, gy, { stroke: C.green, width: 4 }) + D.text(20, gy + 22, "Ground", { size: 13, fill: C.green });
  const px = 300, py = 54;
  b += D.polyline([[px - 24, py], [px + 24, py], [px + 34, py - 6], [px + 24, py - 10], [px - 24, py - 10]], { fill: C.fillGrey, stroke: C.ink, close: true, width: 2 });
  b += D.line(px - 18, py - 10, px - 24, py - 26, { width: 2 }) + D.line(px - 24, py - 26, px - 12, py - 26, { width: 2 });
  b += D.line(px + 30, py + 2, 548, py + 2, { stroke: C.muted, width: 1.6, dash: true }) + D.text(548, py - 6, "horizon: level with the camera", { anchor: "end", size: 12, fill: C.muted });
  b += D.arrow(px, py + 6, px, gy - 4, { stroke: C.blue, width: 2.6 });
  b += D.text(px + 10, 230, "Vertical: looks straight\ndown, no horizon", { size: 13, fill: C.blue, weight: 600 });
  const tx1 = px - (gy - py) * Math.tan((30 * Math.PI) / 180);
  b += D.arrow(px - 8, py + 6, tx1, gy - 4, { stroke: C.amber, width: 2.6 });
  b += D.text(14, 240, "Low oblique: angled,\nground only, no horizon", { size: 13, fill: C.amber, weight: 600 });
  const hx = 520, hy = py + 6 + (hx - px - 8) * Math.tan((22 * Math.PI) / 180);
  b += D.arrow(px + 8, py + 6, hx, hy, { stroke: C.red, width: 2.6 });
  b += D.text(540, hy + 28, "High oblique: almost level, so the\nhorizon is in the picture", { anchor: "end", size: 13, fill: C.red, weight: 600 });
  const alt = "Side view of an aircraft taking three kinds of photograph: a vertical photograph looks straight down and shows no horizon (a plan like a map), a low oblique is angled but shows only ground, and a high oblique looks almost level so the horizon appears in the picture.";
  const cap = "Figure: how the camera angle gives vertical, low oblique and high oblique aerial photographs";
  await D.figure(FAMILY, "aerial-photograph-types", D.svg(560, 360, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/photos-remote-sensing.md`, "| Vertical aerial photograph", D.md("aerial-photograph-types", alt, cap));
}

// ---------- 4. Drainage patterns (maps/land-use-patterns.md)
{
  let b = "";
  const w = 262, h = 190;
  const panel = (ox, oy, t) => D.rect(ox, oy, w, h, { stroke: C.grid, width: 1.5 }) + D.text(ox + w / 2, oy + 20, t, { anchor: "middle", size: 14, weight: 700 });
  const rv = (pts, wd = 2.4) => D.polyline(pts, { stroke: C.blue, width: wd });
  { // dendritic: main river flows down the middle; tributaries join at acute angles (pointing downstream)
    const ox = 10, oy = 8, cx = ox + w / 2;
    b += panel(ox, oy, "Dendritic");
    b += rv([[cx, oy + 36], [cx, oy + h - 8]], 3.2);
    for (const [y, side, len] of [[60, -1, 70], [90, 1, 80], [112, -1, 64], [140, 1, 60], [160, -1, 50]]) {
      const x1 = cx + side * len, y1 = y - 30;
      b += rv([[x1, y1 + oy], [cx + side * len * 0.35, y + oy - 8], [cx, y + oy]]);
    }
  }
  { // trellis: parallel main streams, short tributaries at right angles
    const ox = 288, oy = 8;
    b += panel(ox, oy, "Trellis");
    for (const x of [ox + 70, ox + 190]) {
      b += rv([[x, oy + 34], [x, oy + h - 8]], 3.2);
      for (const y of [70, 100, 130, 160]) {
        b += rv([[x - 44, oy + y], [x, oy + y]]) + rv([[x + 44, oy + y + 14], [x, oy + y + 14]]);
      }
    }
  }
  { // radial: out from a central high point
    const ox = 10, oy = 204, cx = ox + w / 2, cy = oy + 108;
    b += panel(ox, oy, "Radial");
    b += D.polyline([[cx - 10, cy + 8], [cx, cy - 10], [cx + 10, cy + 8]], { fill: C.fillAmber, stroke: C.amber, close: true, width: 1.8 });
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4 + 0.2;
      b += D.arrow(cx + 16 * Math.cos(a), cy + 16 * Math.sin(a) * 0.8, cx + 100 * Math.cos(a), cy + 76 * Math.sin(a), { stroke: C.blue, width: 2.2 });
    }
  }
  { // parallel
    const ox = 288, oy = 204;
    b += panel(ox, oy, "Parallel");
    for (let k = 0; k < 5; k++) b += D.arrow(ox + 36 + k * 48, oy + 40, ox + 46 + k * 48, oy + h - 10, { stroke: C.blue, width: 2.4 });
  }
  const alt = "Four drainage patterns seen from above: dendritic (tree-like, tributaries join the main river at acute angles), trellis (parallel main streams with short tributaries joining at right angles), radial (rivers flow outwards from a central high point), and parallel (streams side by side down a uniform slope).";
  const cap = "Figure: dendritic, trellis, radial and parallel drainage patterns (rivers in blue)";
  await D.figure(FAMILY, "drainage-patterns", D.svg(560, 408, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/land-use-patterns.md`, "- **Parallel**:", D.md("drainage-patterns", alt, cap));
}

// ---------- 5. Distance from grid references (maps/scale-distance.md): 312 458 to 336 476
{
  const A = [31.2, 45.8], B = [33.6, 47.6];
  const dE = +(B[0] - A[0]).toFixed(1), dN = +(B[1] - A[1]).toFixed(1), dist = Math.sqrt(dE * dE + dN * dN);
  const s = 90, x0 = 60, y0 = 330;
  const X = (e) => x0 + (e - 31) * s, Y = (n) => y0 - (n - 45) * s;
  let b = "";
  for (let e = 31; e <= 35; e++) b += D.line(X(e), Y(48), X(e), Y(45), { stroke: C.grid, width: 1 }) + D.text(X(e), Y(45) + 20, String(e), { anchor: "middle", size: 13, fill: C.muted });
  for (let n = 45; n <= 48; n++) b += D.line(X(31), Y(n), X(35), Y(n), { stroke: C.grid, width: 1 }) + D.text(X(31) - 8, Y(n) + 4, String(n), { anchor: "end", size: 13, fill: C.muted });
  b += D.line(X(A[0]), Y(A[1]), X(B[0]), Y(A[1]), { stroke: C.amber, width: 2.4 }) + D.line(X(B[0]), Y(A[1]), X(B[0]), Y(B[1]), { stroke: C.amber, width: 2.4 });
  b += D.line(X(A[0]), Y(A[1]), X(B[0]), Y(B[1]), { stroke: C.blue, width: 3 });
  b += D.dot(X(A[0]), Y(A[1]), { r: 5 }) + D.dot(X(B[0]), Y(B[1]), { r: 5 });
  b += D.text(X(A[0]) - 8, Y(A[1]) + 20, "312 458", { anchor: "end", size: 13, weight: 700 });
  b += D.text(X(B[0]) + 10, Y(B[1]) - 6, "336 476", { size: 13, weight: 700 });
  b += D.tag(X((A[0] + B[0]) / 2), Y(A[1]) + 26, `${dE} km east`, { anchor: "middle", fill: C.amber });
  b += D.tag(X(B[0]) + 10, Y((A[1] + B[1]) / 2) + 14, `${dN} km north`, { fill: C.amber });
  b += D.tag(X(A[0]) + 12, Y((A[1] + B[1]) / 2) - 12, `${dist.toFixed(1)} km`, { fill: C.blue, size: 15 });
  b += D.text(X(31), 380, "Eastings (km)", { size: 13, weight: 600 }) + D.text(450, 160, "d = √(2.4² + 1.8²)\n  = √9\n  = 3.0 km", { size: 14 });
  const alt = `Right-angled triangle on a map grid between 312 458 and 336 476: the points are ${dE} km apart eastwards and ${dN} km apart northwards, so the straight-line distance is the square root of (2.4 squared plus 1.8 squared), which is ${dist.toFixed(1)} km.`;
  const cap = "Figure: the straight distance from 312 458 to 336 476 by Pythagoras' theorem is 3.0 km";
  await D.figure(FAMILY, "grid-reference-distance-pythagoras", D.svg(620, 396, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/scale-distance.md`, "When you know the six-figure references of two points", D.md("grid-reference-distance-pythagoras", alt, cap));
}

// ---------- 6. Grid references from Extract L (maps/location-coordinates.md)
{
  const feats = [["Dip tank", 27.4, 14.6], ["Shop", 28.3, 14.1], ["Bridge", 29.8, 14.3], ["Borehole", 27.1, 13.2], ["School", 28.6, 13.7], ["Clinic", 29.2, 13.5]];
  const s = 120, x0 = 60, y0 = 280; // origin easting 27, northing 13
  const X = (e) => x0 + (e - 27) * s, Y = (n) => y0 - (n - 13) * s;
  let b = "";
  b += D.rect(X(28), Y(14), s, s, { fill: C.fillAmber, stroke: "none" }); // square 2813
  for (let e = 27; e <= 30; e++) b += D.line(X(e), Y(15), X(e), Y(13), { stroke: C.grid, width: 1.4 }) + D.text(X(e), Y(13) + 20, String(e), { anchor: "middle", size: 14, fill: C.ink, weight: 700 });
  for (let n = 13; n <= 15; n++) b += D.line(X(27), Y(n), X(30), Y(n), { stroke: C.grid, width: 1.4 }) + D.text(X(27) - 8, Y(n) + 5, String(n), { anchor: "end", size: 14, fill: C.ink, weight: 700 });
  for (const [name, e, n] of feats) {
    const school = name === "School";
    b += D.dot(X(e), Y(n), { r: school ? 6 : 4, stroke: school ? C.red : C.ink, fill: school ? C.red : C.ink });
    b += D.text(X(e) + 8, Y(n) - 6, name, { size: 13, weight: school ? 700 : 400, fill: school ? C.red : C.ink });
  }
  // tenths: 6 tenths east, 7 tenths north of the square corner (28, 13)
  b += D.line(X(28), Y(13) - 12, X(28.6), Y(13) - 12, { stroke: C.red, width: 2, arrow: true });
  b += D.text(X(28.3), Y(13) - 18, "6 tenths", { anchor: "middle", size: 12, fill: C.red });
  b += D.line(X(28) + 12, Y(13), X(28) + 12, Y(13.7), { stroke: C.red, width: 2, arrow: true });
  b += D.text(X(28) + 18, Y(13.35), "7 tenths", { size: 12, fill: C.red });
  b += D.text(X(30) + 14, Y(14) - 20, "Square 2813\n(shaded):\neasting 28,\nnorthing 13", { size: 13 });
  b += D.text(X(30) + 14, Y(13.35) + 10, "School\n286 137", { size: 14, weight: 700, fill: C.red });
  const alt = "Extract L grid with eastings 27 to 30 and northings 13 to 15: the school lies in the shaded square 2813 and, at 6 tenths east and 7 tenths north of that square's corner, has the six-figure reference 286 137 (easting first).";
  const cap = "Figure: four-figure reference 2813 and six-figure reference 286 137 for the school in Extract L";
  await D.figure(FAMILY, "grid-reference-extract-l", D.svg(560, 330, b), { alt, caption: cap });
  D.insertAfter(`${L}/maps/location-coordinates.md`, "Always give the easting before the northing.", D.md("grid-reference-extract-l", alt, cap));
}

// ---------- 7. Settlement-pattern map extract for question exam.zim-p2-c-settlement.q02
{
  let b = D.rect(10, 30, 500, 360, { stroke: C.ink, width: 3 });
  b += D.text(260, 22, "Rural Zimbabwe: map extract (schematic, fictional)", { anchor: "middle", size: 14, weight: 700 });
  const hut = (x, y) => D.rect(x - 5, y - 5, 10, 10, { fill: C.amber, stroke: C.amber, width: 1 });
  // river and floodplain
  b += D.path_("M10,255 C120,235 200,290 330,262 S450,240 510,262", { stroke: C.blue, width: 5 });
  b += `<path d="M10,235 C120,215 200,270 330,242 S450,220 510,242 L510,282 C450,260 330,302 200,310 C120,310 60,275 10,275 Z" fill="${C.fillBlue}" opacity="0.55"/>`;
  b += D.text(150, 300, "River and floodplain (no homesteads)", { size: 12, fill: C.blue });
  // north: dispersed
  for (const [x, y] of [[60, 70], [150, 95], [240, 62], [330, 100], [90, 150], [190, 140], [420, 80]]) b += hut(x, y);
  b += D.text(110, 52, "Homesteads spread out singly", { size: 12, fill: C.muted });
  // centre: clustered around borehole, school, clinic
  const vx = 330, vy = 175;
  for (const [dx, dy] of [[-22, -16], [-10, -26], [4, -22], [20, -14], [-28, 2], [26, 6], [-18, 18], [0, 24], [16, 18], [-6, -8], [8, -4], [-14, 6], [12, 10]]) b += hut(vx + dx, vy + dy);
  b += D.dot(vx, vy, { r: 5, stroke: C.blue, fill: C.blue });
  b += D.text(vx - 40, vy - 4, "Nucleated: homesteads around\nborehole, school, clinic", { anchor: "end", size: 12, fill: C.muted });
  // main road N-S on east side, junction, village road
  b += D.line(470, 30, 470, 390, { stroke: C.ink, width: 3 }) + D.text(476, 60, "Main\nroad", { size: 12 });
  b += D.path_(`M${vx + 30},${vy} L470,${vy}`, { stroke: C.ink, width: 2 }) + D.dot(470, vy, { r: 5, stroke: C.red, fill: C.red }) + D.text(462, vy - 10, "Junction", { anchor: "end", size: 12, weight: 700, fill: C.red });
  b += D.arrow(vx + 36, vy + 22, 462, vy + 22, { stroke: C.red, width: 1.6, arrowStart: true });
  b += D.tag((vx + 36 + 462) / 2 + 4, vy + 40, "4.6 cm on the map, by road", { anchor: "middle", fill: C.red, size: 12 });
  // south: linear along a gravel road on a ridge
  b += D.line(10, 350, 470, 350, { stroke: C.muted, width: 3, dash: true });
  for (let x = 40; x <= 440; x += 40) b += hut(x, 340 + (x % 80 === 0 ? 0 : 20) - 6 + 0);
  b += D.text(20, 378, "Linear: homesteads along a gravel road on a ridge", { size: 12, fill: C.muted });
  b += northArrow(40, 118, 30) + D.text(14, 406, "Orange square = homestead; blue dot = borehole.\nScale 1:50 000, not drawn to scale.", { anchor: "start", size: 12, fill: C.muted });
  const alt = "Schematic map extract of rural Zimbabwe: homesteads are scattered singly on the plateau in the north, clustered around a borehole, school and clinic in the centre, strung along a gravel road on a ridge in the south, with none on the river floodplain; the road from the village to the main road junction measures 4.6 cm.";
  const cap = "Figure: schematic map extract showing dispersed, nucleated and linear homesteads (fictional)";
  await D.figure(FAMILY, "settlement-extract-zimsec-p2c", D.svg(520, 430, b), { alt, caption: cap });
  snip("settlement-extract-zimsec-p2c", D.md("settlement-extract-zimsec-p2c", alt, cap));
}
console.log("maps2 done");
