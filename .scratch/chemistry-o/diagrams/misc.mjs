// Run from repo root: node .scratch/chemistry-o/diagrams/misc.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker, tube, conical, WATER } from "./_h.mjs";

const arr = (x1, y1, x2, y2, o = {}) => D.arrow(x1, y1, x2, y2, { width: 2, ...o });

// ---------- particles in solids, liquids and gases
{
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const R = 9, bw = 160, bh = 160;
  const box = (ox, title) => D.rect(ox, 40, bw, bh, { stroke: C.axis, width: 2 }) + T(ox + bw / 2, 26, title, { anchor: "middle", size: 15, weight: 700 });
  const ball = (x, y) => D.circle(x, y, R, { fill: C.fillBlue, stroke: C.blue, width: 1.8 });
  let solid = box(20, "Solid");
  for (let r = 0; r < 7; r += 1) for (let c = 0; c < 7; c += 1) solid += ball(20 + 14 + c * 22 + 1, 40 + 14 + r * 22 + 1);
  const place = (n, minD, x0, y0, limit = 6000) => {
    const pts = []; let tries = 0;
    while (pts.length < n && tries < limit) { tries += 1; const x = x0 + R + 2 + rnd() * (bw - 2 * R - 24), y = y0 + R + 12 + rnd() * (bh - 2 * R - 24); if (pts.every(([a, b]) => Math.hypot(a - x, b - y) >= minD)) pts.push([x, y]); }
    return pts;
  };
  let liquid = box(210, "Liquid");
  // liquid: fill the lower 80% with touching, irregular particles
  const lq = []; let t = 0;
  while (lq.length < 38 && t < 20000) { t += 1; const x = 210 + R + 2 + rnd() * (bw - 2 * R - 4), y = 40 + 40 + R + rnd() * (bh - 40 - 2 * R - 2); if (lq.every(([a, b]) => Math.hypot(a - x, b - y) >= 2 * R - 0.5)) lq.push([x, y]); }
  liquid += lq.map(([x, y]) => ball(x, y)).join("");
  let gas = box(400, "Gas");
  const gp = place(9, 48, 400, 40);
  gas += gp.map(([x, y]) => ball(x, y) + arr(x + R + 1, y, x + R + 15, y - 7, { width: 1.4, stroke: C.muted })).join("");
  const body = solid + liquid + gas + T(100, 226, "regular pattern,\ntouching", { anchor: "middle", size: 13, fill: C.muted }) + T(290, 226, "random, mostly touching,\nsliding past each other", { anchor: "middle", size: 13, fill: C.muted }) + T(480, 226, "far apart, moving\nquickly in all directions", { anchor: "middle", size: 13, fill: C.muted });
  await put("states-of-matter-particles", 580, 262, body,
    "Particle diagrams of the three states: in a solid the particles are in a regular pattern and touching; in a liquid they are close together in an irregular arrangement; in a gas they are far apart and move randomly and quickly in all directions.",
    "Figure: the arrangement of particles in a solid, a liquid and a gas", "matter/states-of-matter", "## The particles in each state");
}

// ---------- universal indicator pH scale
{
  const cols = ["#c62828", "#c62828", "#c62828", "#ef6c00", "#ef6c00", "#f2c500", "#f2c500", "#2e9d4a", "#1f77b4", "#1f77b4", "#1f77b4", "#6a3fa0", "#6a3fa0", "#6a3fa0", "#6a3fa0"];
  const x0 = 30, cw = 38, y0 = 50, h = 56;
  let b = "";
  for (let i = 0; i <= 14; i += 1) b += D.rect(x0 + i * cw, y0, cw, h, { fill: cols[i], stroke: "#ffffff", width: 1.5 }) + T(x0 + i * cw + cw / 2, y0 + h + 22, String(i), { anchor: "middle", size: 15, weight: 700 });
  const grp = (a, z, label, ln = 0) => D.line(x0 + a * cw + 3, y0 - 8, x0 + (z + 1) * cw - 3, y0 - 8, { stroke: C.muted, width: 1.4 }) + T(x0 + ((a + z + 1) / 2) * cw, y0 - 14, label, { anchor: "middle", size: 12, fill: C.ink });
  b += grp(0, 2, "red") + grp(3, 4, "orange") + grp(5, 6, "yellow") + grp(7, 7, "green") + grp(8, 10, "blue") + grp(11, 14, "purple (violet)") +
    T(x0, y0 + h + 52, "pH", { size: 14, weight: 700 }) +
    D.arrow(x0 + 2 * cw, y0 + h + 76, x0 + 0.2 * cw, y0 + h + 76, { stroke: C.red, width: 2 }) + T(x0 + 2.2 * cw, y0 + h + 81, "more acidic", { size: 13, fill: C.red, weight: 700 }) +
    D.arrow(x0 + 12.8 * cw, y0 + h + 76, x0 + 14.8 * cw, y0 + h + 76, { stroke: C.purple, width: 2 }) + T(x0 + 12.6 * cw, y0 + h + 81, "more alkaline", { size: 13, fill: C.purple, weight: 700, anchor: "end" }) +
    T(x0 + 7.5 * cw, y0 + h + 120, "7 = neutral", { anchor: "middle", size: 13, weight: 700, fill: C.green });
  await put("universal-indicator-ph-scale", 620, 250, b,
    "The pH scale from 0 to 14 with universal indicator colours: red for pH 0 to 2 (strongly acidic), orange for 3 and 4, yellow for 5 and 6, green at pH 7 (neutral), blue for 8 to 10, and purple for 11 to 14 (strongly alkaline).",
    "Figure: universal indicator colours on the pH scale (the colour is also named above each group)", "acids/indicators-and-ph", "## Universal indicator and the pH scale");
}

// ---------- calorimetry: spirit burner under a copper can
{
  const b = D.rect(150, 90, 120, 90, { fill: "#f1cdb0", stroke: C.ink, width: 2.5 }) + D.rect(153, 120, 114, 57, { fill: WATER, stroke: "none" }) +
    D.line(150, 180, 150, 90, { stroke: C.ink, width: 2.5 }).replace("", "") +
    // thermometer and stirrer
    D.rect(232, 30, 8, 110, { fill: "#ffffff", stroke: C.ink, width: 1.6 }) + D.rect(234, 100, 4, 38, { fill: C.red, stroke: "none" }) +
    D.line(176, 40, 176, 150, { stroke: C.axis, width: 2.2 }) + D.circle(176, 40, 5, { stroke: C.axis, width: 2 }) +
    // clamp
    D.line(110, 135, 150, 135, { stroke: C.muted, width: 5 }) + D.line(110, 135, 110, 300, { stroke: C.muted, width: 5 }) + D.line(70, 300, 150, 300, { stroke: C.muted, width: 6 }) +
    // burner + flame
    D.path_("M190,232 L190,270 Q190,282 202,282 L238,282 Q250,282 250,270 L250,232", { stroke: C.axis, width: 2.2, fill: "#eef2f4" }) + D.rect(212, 218, 16, 14, { fill: "#d9cbb6", stroke: C.axis, width: 1.5 }) +
    D.path_("M220,218 C206,200 210,190 220,172 C232,190 234,202 220,218 Z", { fill: "#f6b04a", stroke: C.amber, width: 1.5 }) +
    // draught shield
    D.rect(120, 78, 180, 215, { stroke: C.muted, width: 1.6, dash: true }) +
    T(310, 100, "copper can (calorimeter)\ncontaining a measured\nmass of water", { size: 13, weight: 700 }) + arr(306, 106, 272, 120, { stroke: C.muted, width: 1.3 }) +
    T(310, 160, "thermometer", { size: 13 }) + arr(306, 156, 244, 120, { stroke: C.muted, width: 1.3 }) +
    T(60, 40, "stirrer", { size: 13 }) + arr(96, 38, 168, 42, { stroke: C.muted, width: 1.3 }) + T(310, 255, "spirit burner with the fuel,\nweighed before and after", { size: 13, weight: 700 }) + arr(306, 252, 252, 258, { stroke: C.muted, width: 1.3 }) +
    T(310, 295, "draught shield (dashed)", { size: 13, fill: C.muted }) +
    T(120, 330, "q = mcΔT, with m the mass of water and c = 4.2 J/g/°C", { size: 13, fill: C.blue, weight: 700 });
  await put("calorimetry-spirit-burner-apparatus", 560, 350, b,
    "Apparatus for the enthalpy change of combustion: a spirit burner containing the fuel, weighed before and after, heats a copper can holding a measured mass of water, with a thermometer and stirrer in the water and a draught shield around the flame; the rise in water temperature gives q = m c ΔT.",
    "Figure: measuring the energy released when a fuel burns", "energetics/calorimetry", "## The apparatus");
}

// ---------- displayed formulae
const U = 44;
function molecule(ox, oy, atoms, bonds) {
  const P = (id) => [ox + atoms[id][1] * U, oy + atoms[id][2] * U];
  let s = "";
  for (const [a, b] of bonds) {
    const [x1, y1] = P(a), [x2, y2] = P(b), d = Math.hypot(x2 - x1, y2 - y1), k = 13 / d;
    s += D.line(x1 + (x2 - x1) * k, y1 + (y2 - y1) * k, x2 - (x2 - x1) * k, y2 - (y2 - y1) * k, { width: 2, stroke: C.ink });
  }
  for (const id of Object.keys(atoms)) { const [x, y] = P(id); s += T(x, y + 5, atoms[id][0], { anchor: "middle", size: 16, weight: atoms[id][0] === "C" ? 700 : 400 }); }
  return s;
}
/** straight-chain alkane with n carbons: atoms at (i,0) with H above and below, extra H at the ends. */
function chain(n) {
  const a = {}, bd = [];
  for (let i = 0; i < n; i += 1) {
    a[`c${i}`] = ["C", i, 0]; a[`hu${i}`] = ["H", i, -1]; a[`hd${i}`] = ["H", i, 1]; bd.push([`c${i}`, `hu${i}`], [`c${i}`, `hd${i}`]);
    if (i > 0) bd.push([`c${i - 1}`, `c${i}`]);
  }
  a.hl = ["H", -1, 0]; a.hr = ["H", n, 0]; bd.push(["c0", "hl"], [`c${n - 1}`, "hr"]);
  return [a, bd];
}
{
  const names = ["methane, CH₄", "ethane, C₂H₆", "propane, C₃H₈", "butane, C₄H₁₀"];
  const met = (() => { const a = { c: ["C", 0, 0], h1: ["H", 0, -1], h2: ["H", 0, 1], h3: ["H", -1, 0], h4: ["H", 1, 0] }; return [a, [["c", "h1"], ["c", "h2"], ["c", "h3"], ["c", "h4"]]]; })();
  const mols = [met, chain(2), chain(3), chain(4)];
  let b = "";
  mols.forEach(([a, bd], i) => { const oy = 70 + i * 120; b += molecule(60, oy, a, bd) + T(330, oy + 5, names[i], { size: 15, weight: 700, fill: C.blue }); });
  await put("alkanes-displayed-formulae", 480, 490, b,
    "Displayed formulae of the first four alkanes, methane CH4, ethane C2H6, propane C3H8 and butane C4H10: every carbon atom has four single bonds, each straight-chain alkane differs from the next by one CH2 group, and the molecular formula fits CnH2n+2.",
    "Figure: methane, ethane, propane and butane; each carbon forms four single bonds", "organic/alkanes", "## Why alkanes are unreactive");
}
{
  // C4H10 isomers: butane and methylpropane
  const [ba, bb] = chain(4);
  const U2 = 1; // grid already in U
  const mp = { c1: ["C", 0, 0], c2: ["C", 1.1, 0], c3: ["C", 2.2, 0], c4: ["C", 1.1, -1.1], hd2: ["H", 1.1, 1], h4u: ["H", 1.1, -2.1], h4l: ["H", 0.15, -1.45], h4r: ["H", 2.05, -1.45], h1u: ["H", 0, -1], h1d: ["H", 0, 1], h1l: ["H", -1, 0], h3u: ["H", 2.2, -1], h3d: ["H", 2.2, 1], h3r: ["H", 3.2, 0] };
  const mpb = [["c1", "c2"], ["c2", "c3"], ["c2", "c4"], ["c2", "hd2"], ["c4", "h4u"], ["c4", "h4l"], ["c4", "h4r"], ["c1", "h1u"], ["c1", "h1d"], ["c1", "h1l"], ["c3", "h3u"], ["c3", "h3d"], ["c3", "h3r"]];
  const b = molecule(60, 150, ba, bb) + molecule(380, 150, mp, mpb) +
    T(160, 90 + 130, "", {}) + T(130, 240, "butane", { anchor: "middle", size: 15, weight: 700, fill: C.blue }) + T(460, 240, "methylpropane", { anchor: "middle", size: 15, weight: 700, fill: C.blue }) +
    T(130, 260, "straight chain, bp −1 °C", { anchor: "middle", size: 13, fill: C.muted }) + T(460, 260, "branched chain, bp −12 °C", { anchor: "middle", size: 13, fill: C.muted }) +
    T(300, 24, "Both are C₄H₁₀: same molecular formula, different structural formula", { anchor: "middle", size: 14, weight: 700 });
  await put("isomers-butane-methylpropane", 620, 280, b,
    "Displayed formulae of the two isomers of C4H10: butane, a straight chain of four carbon atoms with a boiling point of −1 °C, and methylpropane, a chain of three carbon atoms with a CH3 branch on the middle carbon and a boiling point of −12 °C; the same molecular formula but different structural formulae.",
    "Figure: structural isomers of C₄H₁₀", "organic/isomerism", "## Drawing carbon skeletons");
}

// ---------- air separation flow
{
  const W = 250, H = 50;
  const nd = (y, s, o = {}) => D.node(20, y, W, H, s, { size: 13, ...o });
  const b = nd(20, "Air: filter out dust") + arr(145, 70, 145, 92) +
    nd(94, "Remove CO₂ and water vapour") + arr(145, 144, 145, 166) +
    nd(168, "Compress (about 200 atm); cool\nwith water") + arr(145, 218, 145, 240) +
    nd(242, "Expand through a valve: the air\ncools; repeat until it liquefies", { fill: C.fillAmber }) + arr(145, 292, 145, 314) +
    nd(316, "Liquid air at about −200 °C", { fill: C.fillAmber, weight: 700 }) +
    arr(270, 341, 392, 341) +
    D.rect(395, 50, 90, 320, { fill: "#f4f9fb", stroke: C.ink, width: 3, r: 8 }) + D.line(395, 110, 485, 110, { stroke: C.muted, width: 1.2 }) + D.line(395, 170, 485, 170, { stroke: C.muted, width: 1.2 }) + D.line(395, 230, 485, 230, { stroke: C.muted, width: 1.2 }) + D.line(395, 290, 485, 290, { stroke: C.muted, width: 1.2 }) +
    T(440, 40, "fractionating column", { anchor: "middle", size: 13, weight: 700 }) +
    arr(485, 70, 520, 70) + T(525, 66, "nitrogen, −196 °C\n(gas, top)", { size: 13, weight: 700 }) +
    arr(485, 190, 520, 190) + T(525, 186, "argon, −186 °C\n(part-way up)", { size: 13, weight: 700 }) +
    arr(485, 340, 520, 340) + T(525, 336, "oxygen, −183 °C\n(liquid, bottom)", { size: 13, weight: 700 }) +
    T(30, 392, "cooler at the top, slightly warmer at the bottom", { size: 13, fill: C.muted });
  await put("air-separation-flow", 680, 410, b,
    "Flow chart of air separation: air is filtered, carbon dioxide and water vapour are removed, the air is compressed and cooled, then expanded through a valve until it liquefies at about −200 °C, and the liquid air is fractionally distilled in a column where nitrogen (−196 °C) leaves as a gas at the top, argon (−186 °C) part-way up and oxygen (−183 °C) as a liquid at the bottom.",
    "Figure: liquefying and fractionally distilling air", "industry/air-separation", "## Step 3: fractional distillation");
}

// ---------- gas collection methods
{
  const tubeStyle = { stroke: C.axis, width: 2.6 };
  // 1: over water
  let b = T(110, 24, "Over water", { anchor: "middle", size: 15, weight: 700 }) + T(110, 42, "gases that are insoluble in water", { anchor: "middle", size: 12, fill: C.muted }) + T(110, 58, "(H₂, O₂)", { anchor: "middle", size: 12, fill: C.muted }) +
    beaker(30, 200, 170, 100, 70, WATER) +
    D.rect(81, 110, 58, 150, { fill: WATER, stroke: "none" }) + D.rect(81, 110, 58, 56, { fill: "#ffffff", stroke: "none" }) +
    D.polyline([[81, 260], [81, 110], [139, 110], [139, 260]], { stroke: C.axis, width: 2.2 }) +
    D.polyline([[10, 130], [44, 130], [44, 285], [110, 285], [110, 190]], tubeStyle) +
    D.circle(104, 175, 4, { fill: "#fff", stroke: C.muted, width: 1.2 }) + D.circle(114, 160, 3.5, { fill: "#fff", stroke: C.muted, width: 1.2 }) +
    T(110, 322, "jar full of water, upside\ndown in a trough: the gas\npushes the water out", { anchor: "middle", size: 12 });
  // 2: downward delivery
  const o2 = 250;
  b += T(o2 + 100, 24, "Downward delivery", { anchor: "middle", size: 15, weight: 700 }) + T(o2 + 100, 42, "gases denser than air", { anchor: "middle", size: 12, fill: C.muted }) + T(o2 + 100, 58, "(CO₂, Cl₂, SO₂, HCl)", { anchor: "middle", size: 12, fill: C.muted }) +
    D.rect(o2 + 60, 130, 80, 130, { fill: "#f4f9fb", stroke: "none" }) +
    D.polyline([[o2 + 60, 100], [o2 + 60, 260], [o2 + 140, 260], [o2 + 140, 100]], { stroke: C.axis, width: 2.2 }) +
    D.polyline([[o2 - 30, 130], [o2 + 100, 130], [o2 + 100, 246]], tubeStyle) +
    D.arrow(o2 + 160, 140, o2 + 160, 100, { stroke: C.muted, width: 1.6 }) + T(o2 + 168, 124, "air pushed out", { size: 12, fill: C.muted }) +
    T(o2 + 100, 296, "the gas sinks, filling the jar\nfrom the bottom upwards", { anchor: "middle", size: 12 });
  // 3: upward delivery
  const o3 = 480;
  b += T(o3 + 100, 24, "Upward delivery", { anchor: "middle", size: 15, weight: 700 }) + T(o3 + 100, 42, "gases less dense than air", { anchor: "middle", size: 12, fill: C.muted }) + T(o3 + 100, 58, "(H₂, NH₃)", { anchor: "middle", size: 12, fill: C.muted }) +
    D.rect(o3 + 60, 100, 80, 130, { fill: "#f4f9fb", stroke: "none" }) +
    D.polyline([[o3 + 60, 230], [o3 + 60, 100], [o3 + 140, 100], [o3 + 140, 230]], { stroke: C.axis, width: 2.2 }) +
    D.polyline([[o3 - 30, 290], [o3 + 100, 290], [o3 + 100, 118]], tubeStyle) +
    D.arrow(o3 + 160, 270, o3 + 160, 232, { stroke: C.muted, width: 1.6 }) + T(o3 + 168, 262, "air pushed out", { size: 12, fill: C.muted }) +
    T(o3 + 100, 322, "the gas rises, filling the inverted\njar from the top downwards", { anchor: "middle", size: 12 });
  await put("gas-collection-methods", 760, 375, b,
    "Three ways of collecting a gas: over water in an upturned jar for gases that are insoluble in water such as hydrogen and oxygen; by downward delivery into an upright jar for gases denser than air such as carbon dioxide, chlorine and sulfur dioxide; and by upward delivery into an upturned jar for gases less dense than air such as hydrogen and ammonia.",
    "Figure: choosing how to collect a gas", "practical/tests-for-gases", "## Collecting the gas");
}
