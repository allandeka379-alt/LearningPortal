// biology-a photosynthesis: light-dependent stage, Calvin cycle, limiting factors, spectra, chromatography.
// Run: node .scratch/biology-a/diagrams/photosynthesis.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curve, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const head = (x1, y1, x2, y2, col, s = 10) => { const a = Math.atan2(y2 - y1, x2 - x1); return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
const arr = (x1, y1, x2, y2, col = C.ink, w = 2.2, dash = false) => D.line(x1, y1, x2, y2, { stroke: col, width: w, dash }) + head(x1, y1, x2, y2, col);

// ---- Light-dependent reactions in the thylakoid membrane
{
  const w = 640, h = 420, ym = 215; // membrane centre
  let b = "";
  b += D.rect(10, 52, 620, ym - 12 - 52, { fill: "#f3fbfd", stroke: "none" }) + D.rect(10, ym + 12, 620, 195, { fill: "#fdf7ec", stroke: "none" });
  b += D.line(10, ym - 12, 630, ym - 12, { stroke: C.axis, width: 2 }) + D.line(10, ym + 12, 630, ym + 12, { stroke: C.axis, width: 2 });
  b += D.text(14, 46, "Thylakoid space (inside)", { size: 14, weight: 700, fill: C.blue }) + D.text(14, 412, "Stroma (outside)", { size: 14, weight: 700, fill: C.amber });
  const comp = (x, wd, label, fill, size = 14) => D.rect(x, ym - 26, wd, 52, { fill, stroke: C.axis, width: 2, r: 10 }) + T(x + wd / 2, ym + (label.includes("|") ? -2 : 5), label.replace("|", "\n"), { weight: 700, size });
  b += comp(50, 80, "PSII", C.fillGreen) + comp(165, 80, "carriers", C.fillGrey) + comp(280, 80, "PSI", C.fillGreen) + comp(378, 78, "NADP|reductase", C.fillAmber, 12);
  // ATP synthase
  b += D.rect(520, ym - 26, 26, 52, { fill: C.fillBlue, stroke: C.axis, width: 2, r: 6 }) + D.circle(533, ym + 44, 22, { fill: C.fillBlue, stroke: C.axis, width: 2 }) + T(533, ym + 49, "ATP", { size: 12, weight: 700 });
  
  // light
  for (const x of [90, 320]) b += arr(x, 78, x, ym - 32, C.amber, 3) + D.text(x + 8, 92, "light", { size: 13, fill: C.amber });
  // photolysis
  b += D.text(104, 112, "2H₂O → 4H⁺ + 4e⁻ + O₂", { size: 13 }) + D.text(104, 129, "(photolysis of water)", { size: 12, fill: C.muted });
  // electron flow
  b += arr(132, ym, 163, ym, C.red, 2.4) + arr(247, ym, 278, ym, C.red, 2.4) + arr(362, ym, 376, ym, C.red, 2.4);
  
  b += D.text(232, 270, "", {});
  // proton pumping
  b += arr(205, ym + 62, 205, ym + 30, C.blue, 2.4) + D.text(213, ym + 76, "H⁺ from the stroma", { size: 12, fill: C.blue }) + arr(205, ym - 28, 205, ym - 62, C.blue, 2.4) + D.text(213, ym - 66, "H⁺ pumped into the", { size: 12, fill: C.blue }) + D.text(213, ym - 51, "thylakoid space", { size: 12, fill: C.blue });
  // chemiosmosis
  b += arr(533, ym - 62, 533, ym - 30, C.blue, 2.4) + D.text(480, ym - 100, "H⁺ flow back to the stroma", { size: 12, fill: C.blue }) + D.text(480, ym - 84, "through ATP synthase", { size: 12, fill: C.blue }) + D.text(548, ym - 36, "ATP synthase", { size: 12 });
  b += D.text(500, ym + 90, "ADP + Pi → ATP", { size: 13, weight: 700 }) + D.text(10, 0, "", {});
  // NADP
  b += arr(413, ym + 28, 413, ym + 92, C.ink, 2) + D.text(405, ym + 108, "NADP → reduced NADP", { size: 13, weight: 700, anchor: "end" });
  b += D.text(14, 365, "To the Calvin cycle: ATP and reduced NADP", { size: 13, weight: 700 });
  b += D.text(14, 386, "Red arrows: the one-way flow of electrons (non-cyclic)", { size: 12, fill: C.red });
  const alt = "Light-dependent stage in the thylakoid membrane: light excites electrons in photosystem II, water is split in the thylakoid space to give protons, electrons and oxygen, electrons pass along carriers to photosystem I and then to NADP in the stroma to make reduced NADP, protons pumped into the thylakoid space flow back through ATP synthase to make ATP.";
  const cap = "Figure: non-cyclic photophosphorylation, with electron flow, proton pumping and chemiosmosis";
  await fig("light-dependent-thylakoid-membrane", D.svg(w, h, b), alt, cap, "photosynthesis/light-dependent", "The flow of electrons is one-way");
}

// ---- Calvin cycle with the counts of the worked solution (one hexose)
{
  const n = 6, gp = 2 * n, tp = gp, regen = 10, left = tp - regen;
  if (gp !== 12 || tp !== 12 || left !== 2) throw new Error("calvin counts");
  const atp = 12 + 6, nadph = 12;
  if (atp !== 18 || nadph !== 12) throw new Error("calvin costs");
  const w = 600, h = 420;
  let b = "";
  const box = (x, y, wd, hh, s, fill) => D.node(x, y, wd, hh, s, { fill, size: 14 });
  b += box(30, 170, 150, 64, "6 RuBP\n(5C each)", C.fillAmber) + box(225, 30, 150, 64, "12 GP\n(3C each)", C.fillBlue) + box(420, 170, 150, 64, "12 TP\n(3C each)", C.fillBlue);
  b += box(420, 320, 150, 54, "2 TP → 1 hexose", C.fillGreen);
  // CO2 in
  b += D.text(20, 126, "6 CO₂", { size: 14, weight: 700 }) + arr(60, 134, 90, 166, C.ink, 2.4);
  // arrows around the cycle
  b += arr(130, 166, 240, 98, C.blue, 3) + D.text(70, 100, "1  Fixation", { size: 13, weight: 700, fill: C.blue }) + D.text(70, 116, "(rubisco)", { size: 12, fill: C.muted }).replace("", "");
  b += arr(360, 98, 460, 166, C.blue, 3) + D.text(420, 100, "2  Reduction", { size: 13, weight: 700, fill: C.blue }) + D.text(468, 142, "12 ATP +", { size: 12, fill: C.muted }) + D.text(468, 157, "12 reduced NADP", { size: 12, fill: C.muted });
  b += D.path_("M470,236 C470,300 300,320 180,238", { stroke: C.amber, width: 3, arrow: true }) + D.text(270, 322, "3  Regeneration", { size: 13, weight: 700, fill: C.amber, anchor: "middle" }) + D.text(270, 340, "10 TP → 6 RuBP, using 6 ATP", { size: 12, fill: C.muted, anchor: "middle" });
  b += arr(495, 238, 495, 316, C.green, 2.6) + D.text(504, 280, "2 TP leave", { size: 12, fill: C.green });
  b += D.text(10, 396, `Per hexose: ${atp} ATP and ${nadph} reduced NADP (3 ATP and 2 reduced NADP per CO₂ fixed)`, { size: 13, weight: 700 }).replace("", "");
  b += D.text(10, 22, "Calvin cycle in the stroma: six turns fix six CO₂", { size: 14, weight: 700 }).replace("", "");
  const alt = "Calvin cycle with the counts for one hexose: 6 CO2 combine with 6 RuBP (5C) to give 12 GP (3C); 12 GP are reduced to 12 TP using 12 ATP and 12 reduced NADP; 10 TP are used with 6 ATP to regenerate 6 RuBP, and the other 2 TP leave to make one hexose; the total cost is 18 ATP and 12 reduced NADP.";
  const cap = "Figure: the Calvin cycle with the numbers for making one hexose (worked solution)";
  await fig("calvin-cycle-counts", D.svg(w, h, b), alt, cap, "photosynthesis/calvin-c4", "| Regeneration | 5 TP → 3 RuBP");
}

// ---- Limiting factors graph (table of the lesson)
{
  const L = [0, 10, 20, 30, 40, 50, 60], low = [0, 12, 20, 23, 24, 24, 24], high = [0, 13, 25, 36, 44, 48, 48];
  const ax = D.axes({ x: [0, 60], y: [0, 55], w: 600, h: 400, xTicks: 10, yTicks: 10, xLabel: "Light intensity / arbitrary units", yLabel: "Rate of photosynthesis / arbitrary units", pad: { l: 70, r: 28, t: 40, b: 58 } });
  let b = ax.frame + ax.line(L.map((x, i) => [x, low[i]]), { stroke: C.blue }) + ax.line(L.map((x, i) => [x, high[i]]), { stroke: C.amber });
  L.forEach((x, i) => { b += ax.point(x, low[i], { stroke: C.blue, r: 3.5 }) + ax.point(x, high[i], { stroke: C.amber, r: 3.5 }); });
  b += ax.tag(46, 48, "0.10% CO₂: levels off at 48", { fill: C.amber, anchor: "middle", dy: -14 }).replace("", "") + ax.tag(46, 24, "0.04% CO₂: levels off at 24", { fill: C.blue, anchor: "middle", dy: 30 });
  b += D.text(ax.X(1), ax.Y(47), "Light is limiting where", { size: 13 }) + D.text(ax.X(1), ax.Y(47) + 16, "the curves rise together", { size: 13 });
  const alt = "Rate of photosynthesis against light intensity at two carbon dioxide concentrations: both curves rise together up to about 10 units, so light is limiting; the 0.04% CO2 curve levels off at 24 by about 40 units, where CO2 is limiting, while the 0.10% CO2 curve rises further and levels off at 48.";
  const cap = "Figure: limiting factors, from the lesson's table (temperature kept at 25 °C)";
  await fig("limiting-factors-light-co2", D.svg(600, 400, b), alt, cap, "photosynthesis/limiting-factors", "| Rate at 0.10% CO₂ / arbitrary units");
}

// ---- Absorption and action spectra
{
  const wl = [400, 450, 500, 550, 600, 650, 700], ab = [70, 95, 40, 12, 20, 80, 10], ac = [65, 90, 50, 25, 35, 85, 12];
  const ax = D.axes({ x: [400, 700], y: [0, 100], w: 600, h: 400, xTicks: 50, yTicks: 20, xLabel: "Wavelength / nm", yLabel: "Absorption or rate / %", pad: { l: 70, r: 28, t: 40, b: 58 } });
  let b = ax.frame + ax.line(wl.map((x, i) => [x, ab[i]]), { stroke: C.blue }) + ax.line(wl.map((x, i) => [x, ac[i]]), { stroke: C.amber, dash: true });
  wl.forEach((x, i) => { b += ax.point(x, ab[i], { stroke: C.blue, r: 3.5 }) + ax.point(x, ac[i], { stroke: C.amber, r: 3.5 }); });
  b += D.text(ax.X(478), ax.Y(97), "Absorption by leaf pigments", { size: 13, fill: C.blue, weight: 700 }) + D.text(ax.X(478), ax.Y(89), "Action spectrum (rate, dashed)", { size: 13, fill: C.amber, weight: 700 });
  b += ax.tag(550, 44, "green: lowest", { anchor: "middle", fill: C.muted });
  const alt = "Absorption by leaf pigments and rate of photosynthesis against wavelength: both are highest in blue-violet light (95% and 90% at 450 nm) and red light (80% and 85% at 650 nm), and lowest in green light (12% and 25% at 550 nm) and at 700 nm, so the action spectrum follows the absorption spectrum.";
  const cap = "Figure: absorption spectrum and action spectrum from the lesson's table (illustrative values)";
  await fig("absorption-action-spectra", D.svg(600, 400, b), alt, cap, "photosynthesis/chloroplasts-pigments", "| Rate of photosynthesis / % of maximum");
}

// ---- Chromatogram with Rf values (worked solution: solvent front 80 mm)
{
  const front = 80, spots = [["carotene (orange-yellow)", 76, "#e0a030"], ["xanthophyll (yellow)", 59, "#d8c030"], ["chlorophyll a (blue-green)", 51, "#2a8c8c"], ["chlorophyll b (yellow-green)", 36, "#8fb43c"]];
  const rf = spots.map(([, d]) => Math.round((d / front) * 100) / 100);
  if (rf.join() !== "0.95,0.74,0.64,0.45") throw new Error("Rf " + rf);
  const w = 640, h = 400, px = 3.4, y0 = 330, x0 = 180; // origin at y0; 1 mm = px
  let b = "";
  b += D.rect(x0, y0 - front * px - 24, 110, front * px + 24 + 20, { fill: "#faf8f3", stroke: C.axis, width: 2 });
  b += D.line(x0, y0, x0 + 110, y0, { stroke: C.muted, width: 1.6, dash: true }) + D.text(x0 - 8, y0 + 4, "origin", { size: 13, anchor: "end" });
  b += D.line(x0, y0 - front * px, x0 + 110, y0 - front * px, { stroke: C.red, width: 1.6, dash: true }) + D.text(x0 - 8, y0 - front * px + 4, "solvent front (80 mm)", { size: 13, anchor: "end", fill: C.red });
  spots.forEach(([name, d, col], i) => {
    const y = y0 - d * px;
    b += ellipse(x0 + 55, y, 22, 7, { fill: col, stroke: "none" }) + D.line(x0 + 110, y, x0 + 150, y, { stroke: C.muted, width: 1.2 }) + D.text(x0 + 156, y + 4, `${name}: ${d} mm, Rf ${rf[i].toFixed(2)}`, { size: 13 });
  });
  b += D.text(10, 22, "Rf = distance moved by spot ÷ distance moved by solvent", { size: 13, fill: C.muted });
  b += D.text(10, 385, "Measure from the origin to the centre of each spot.", { size: 12, fill: C.muted });
  const alt = "Chromatogram with a solvent front 80 mm from the origin: carotene moved 76 mm (Rf 0.95), xanthophyll 59 mm (Rf 0.74), chlorophyll a 51 mm (Rf 0.64) and chlorophyll b 36 mm (Rf 0.45); every Rf is below 1 and the most soluble pigment, carotene, travels furthest.";
  const cap = "Figure: separation of leaf pigments by chromatography, with Rf = distance moved by spot ÷ distance moved by solvent";
  await fig("pigment-chromatogram-rf", D.svg(w, h, b), alt, cap, "photosynthesis/chloroplasts-pigments", "| Spot 4 (yellow-green)");
}
