// agriculture-o soil diagrams: profile, textural triangle. Run: node .scratch/agriculture-o/diagrams/soil.mjs
import * as D from "../../tools/diagram-kit.mjs";
const FAMILY = "agriculture-o";
const L = `content/subjects/${FAMILY}/lessons`;
const { C } = D;

// ---- Soil profile (Pit 1 of the school-orchard example: topsoil 25 cm, subsoil to 120 cm, weathered rock below)
{
  const A_END = 25, B_END = 120, MAX = 160;
  const W = 600, H = 470, top = 40, bot = 440, x0 = 90, x1 = 330;
  const Y = (cm) => top + (cm / MAX) * (bot - top);
  let b = "";
  b += D.text(x0, 24, "Pit 1 (school orchard, Mutare)", { size: 14, weight: 700 });
  b += D.rect(x0, top - 10, x1 - x0, 10, { fill: "#8a6a3a", stroke: C.ink, width: 1 });
  b += D.rect(x0, Y(0), x1 - x0, Y(A_END) - Y(0), { fill: "#6b4a2b", stroke: C.ink, width: 1.5 });
  b += D.rect(x0, Y(A_END), x1 - x0, Y(B_END) - Y(A_END), { fill: "#c27a4a", stroke: C.ink, width: 1.5 });
  b += D.rect(x0, Y(B_END), x1 - x0, Y(MAX) - Y(B_END), { fill: "#c9c2b6", stroke: C.ink, width: 1.5 });
  for (const [dx, dy, r] of [[40, 20, 9], [110, 36, 11], [180, 18, 8], [70, 52, 7], [150, 58, 9], [205, 50, 7]]) b += D.circle(x0 + dx, Y(B_END) + dy, r, { fill: "#a39b8d", stroke: C.ink, width: 1 });
  for (const rx of [60, 130, 200]) { b += D.line(x0 + rx, Y(0), x0 + rx, Y(8), { stroke: "#e8d9b8", width: 2 });  }
  b += D.text((x0 + x1) / 2, Y(A_END / 2) + 12, "Dark, crumbly, humus", { anchor: "middle", size: 13, fill: "#fff" });
  b += D.text((x0 + x1) / 2, Y((A_END + B_END) / 2) + 5, "Red-brown, little humus", { anchor: "middle", size: 13, fill: "#fff" });
  b += D.text((x0 + x1) / 2, Y(B_END) + 90, "Weathered rock fragments", { anchor: "middle", size: 13 });
  for (const d of [0, 25, 50, 75, 100, 120, 150]) { b += D.line(x0 - 6, Y(d), x0, Y(d), { stroke: C.axis, width: 1.2 }); b += D.text(x0 - 10, Y(d) + 4, String(d), { anchor: "end", size: 13, fill: C.muted }); }
  b += D.text(x0 - 10, Y(0) - 14, "Depth (cm)", { anchor: "end", size: 13, weight: 600 });
  const rx = x1 + 14;
  b += D.text(rx, Y(0) - 2, "Litter (leaves, residues)", { size: 13, fill: C.muted });
  b += D.text(rx, Y(8), "A horizon: topsoil", { size: 14, weight: 700 }) + D.text(rx, Y(8) + 17, "most nutrients, humus,\nroots and germination", { size: 13, fill: C.muted });
  b += D.text(rx, Y(65), "B horizon: subsoil", { size: 14, weight: 700 }) + D.text(rx, Y(65) + 17, "stores water for deep roots;\nred-brown = well aerated;\na hardpan would block roots", { size: 13, fill: C.muted });
  b += D.text(rx, Y(B_END) + 20, "C horizon: parent material", { size: 14, weight: 700 }) + D.text(rx, Y(B_END) + 37, "source of new mineral\nparticles; roots rarely\nreach it", { size: 13, fill: C.muted });
  b += D.line(x1, Y(A_END), x1 + 8, Y(A_END), { stroke: C.ink, width: 1 });
  b += D.line(x1, Y(B_END), x1 + 8, Y(B_END), { stroke: C.ink, width: 1 });
  b += D.text((x0 + x1) / 2, Y(MAX) + 18, "Bedrock below", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Soil profile of Pit 1: dark crumbly topsoil (A horizon) 25 cm deep over red-brown subsoil (B horizon) down to 120 cm, then weathered rock fragments (C horizon) above bedrock; the topsoil holds the humus and feeding roots and the red-brown subsoil shows good drainage.";
  const cap = "Figure: the soil profile of Pit 1 with its three horizons and their depths";
  await D.figure(FAMILY, "soil-profile-horizons", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/soil/formation-profile.md`, "Below the C horizon lies solid", D.md("soil-profile-horizons", alt, cap));
}

// ---- Textural triangle (USDA classes) with the jar-test soil: 60% sand, 25% silt, 15% clay
function classify(c, s) {
  const si = 100 - c - s;
  if (si + 1.5 * c < 15) return "sand";
  if (si + 2 * c < 30) return "loamy sand";
  if ((c < 7 && si < 50) || (c >= 7 && c < 20 && s > 52)) return "sandy loam";
  if (c >= 7 && c < 27 && si >= 28 && si < 50 && s <= 52) return "loam";
  if ((si >= 50 && c >= 12 && c < 27) || (si >= 50 && si < 80 && c < 12)) return "silt loam";
  if (si >= 80 && c < 12) return "silt";
  if (c >= 20 && c < 35 && si < 28 && s > 45) return "sandy clay loam";
  if (c >= 27 && c < 40 && s > 20 && s <= 45) return "clay loam";
  if (c >= 27 && c < 40 && s <= 20) return "silty clay loam";
  if (c >= 35 && s > 45) return "sandy clay";
  if (c >= 40 && si >= 40) return "silty clay";
  if (c >= 40 && s <= 45 && si < 40) return "clay";
  return "?";
}
{
  const sand = 60, silt = 25, clay = 15;
  if (sand + silt + clay !== 100) throw new Error("sum");
  if (classify(clay, sand) !== "sandy loam") throw new Error("class mismatch " + classify(clay, sand));
  const W = 600, H = 560, side = 440, ox = 80, oy = 470, hh = side * Math.sqrt(3) / 2;
  const P = (c, s) => { const si = 100 - c - s; return [ox + ((si + c / 2) / 100) * side, oy - (c / 100) * hh]; };
  let b = "";
  for (let v = 10; v < 100; v += 10) {
    b += D.line(...P(v, 0), ...P(v, 100 - v), { stroke: C.grid, width: 1 }); // clay const
    b += D.line(...P(0, 100 - v), ...P(100 - v, 0), { stroke: C.grid, width: 1 }); // silt const
    b += D.line(...P(0, v), ...P(100 - v, v), { stroke: C.grid, width: 1 }); // sand const
  }
  const polys = {
    "sand": [[0, 100], [0, 85], [10, 90]],
    "loamy sand": [[0, 85], [0, 70], [15, 85], [10, 90]],
    "sandy loam": [[0, 70], [0, 50], [7, 43], [7, 52], [20, 52], [20, 80], [15, 85]],
    "loam": [[7, 43], [7, 52], [20, 52], [27, 45], [27, 23]],
    "silt loam": [[0, 20], [0, 50], [27, 23], [27, 0], [12, 0], [12, 8]],
    "silt": [[0, 0], [0, 20], [12, 8], [12, 0]],
    "sandy clay loam": [[20, 80], [20, 52], [27, 45], [35, 45], [35, 65]],
    "clay loam": [[27, 45], [40, 45], [40, 20], [27, 20]],
    "silty clay loam": [[27, 20], [40, 20], [40, 0], [27, 0]],
    "silty clay": [[40, 20], [40, 0], [60, 0]],
    "sandy clay": [[35, 65], [35, 45], [55, 45]],
    "clay": [[40, 45], [55, 45], [100, 0], [60, 0], [40, 20]],
  };
  for (const [name, pts] of Object.entries(polys)) b += D.polyline(pts.map(([c, s]) => P(c, s)), { close: true, stroke: C.axis, width: 1.6, fill: name === "sandy loam" ? C.fillAmber : "none" });
  b += D.polyline([P(0, 100), P(100, 0), P(0, 0)], { close: true, stroke: C.ink, width: 2.4 });
  const lab = { "sand": [[3, 93], "sand", 11], "loamy sand": [[4, 79], "", 11], "sandy loam": [[10, 62], "sandy loam", 13], "loam": [[16, 40], "loam", 13], "silt loam": [[8, 33], "silt loam", 12], "silt": [[3, 10], "silt", 12], "sandy clay loam": [[27, 55], "sandy clay\nloam", 11], "clay loam": [[33, 33], "clay\nloam", 12], "silty clay loam": [[33, 10], "silty clay\nloam", 11], "silty clay": [[48, 9], "silty\nclay", 11], "sandy clay": [[42, 53], "sandy\nclay", 11], "clay": [[58, 28], "clay", 14] };
  const tagged = [];
  for (const [name, [[c, s], t, sz]] of Object.entries(lab)) { const [x, y] = P(c, s); if (name === "sandy loam" || name === "loam") tagged.push([x, y, t, sz, name]); else b += D.text(x, y + 4, t, { anchor: "middle", size: sz }); }
  for (let v = 0; v <= 100; v += 20) {
    const [lx, ly] = P(v, 100 - v);
    b += D.text(lx - 8, ly + 4, String(v), { anchor: "end", size: 13, fill: C.muted });
    const [rx2, ry] = P(v, 0);
    b += D.text(rx2 + 8, ry + 4, String(100 - v), { anchor: "start", size: 13, fill: C.muted });
    const [bx, by] = P(0, 100 - v);
    b += D.text(bx, by + 18, String(100 - v), { anchor: "middle", size: 13, fill: C.muted });
  }
  b += D.text(ox + 50, oy - hh / 2 - 30, "Clay (%)", { anchor: "middle", size: 14, weight: 700, rotate: -60 });
  b += D.text(ox + side - 50 + 38, oy - hh / 2 - 22, "Silt (%)", { anchor: "middle", size: 14, weight: 700, rotate: 60 });
  b += D.text(ox + side / 2, oy + 44, "Sand (%)", { anchor: "middle", size: 14, weight: 700 });
  const [px, py] = P(clay, sand);
  b += D.line(...P(clay, 0), ...P(clay, 100 - clay), { stroke: C.red, width: 1.4, dash: true });
  b += D.line(...P(0, 100 - silt), ...P(100 - silt, 0), { stroke: C.red, width: 1.4, dash: true });
  b += D.line(...P(0, sand), ...P(100 - sand, sand), { stroke: C.red, width: 1.4, dash: true });
  b += D.dot(px, py, { r: 6, fill: C.red, stroke: C.red });
  for (const [x, y, t, sz, name] of tagged) b += D.tag(x + t.length * sz * 0.28, y + 6, t, { size: sz, anchor: "end", bg: name === "sandy loam" ? C.fillAmber : "#ffffff", stroke: name === "sandy loam" ? C.fillAmber : "#ffffff" }).replace(/^/, "");
  b += D.text(14, 414, "loamy sand", { size: 13 }) + D.line(82, 420, ...P(7, 82), { width: 1 });
  b += D.rect(340, 70, 250, 58, { fill: "#ffffff", stroke: C.red, width: 1.5, r: 6 });
  b += D.text(350, 92, "Red dot, Rudo's soil: 60% sand,", { size: 13, fill: C.red, weight: 700 }) + D.text(350, 110, "25% silt, 15% clay = sandy loam", { size: 12, fill: C.red });
  const alt = "Soil textural triangle with the jar-test soil plotted: 60% sand, 25% silt and 15% clay meet inside the sandy loam region; clay is read across on horizontal lines, sand along lines sloping up to the left, silt along lines sloping up to the right.";
  const cap = "Figure: the textural triangle, with Rudo's jar-test soil (60% sand, 25% silt, 15% clay) in the sandy loam region";
  await D.figure(FAMILY, "soil-textural-triangle", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/soil/texture-structure.md`, "Typical classes run from", D.md("soil-textural-triangle", alt, cap));
}
console.log("soil done");
