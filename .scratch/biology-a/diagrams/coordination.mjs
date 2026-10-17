// biology-a coordination + kidney: synapse, sarcomere, nephron. Run: node .scratch/biology-a/diagrams/coordination.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const head = (x1, y1, x2, y2, col, s = 9) => { const a = Math.atan2(y2 - y1, x2 - x1); return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
const arr = (x1, y1, x2, y2, col = C.ink, w = 2.2, dash = false) => D.line(x1, y1, x2, y2, { stroke: col, width: w, dash }) + head(x1, y1, x2, y2, col);
const lead = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2 });
const num = (x, y, n) => D.circle(x, y, 11, { fill: C.ink, stroke: C.ink, width: 1 }) + D.text(x, y + 5, String(n), { anchor: "middle", size: 13, weight: 700, fill: "#fff" });

// ---- Cholinergic synapse
{
  const w = 640, h = 470, dy = 26; // postsynaptic parts are shifted down by dy to leave room in the cleft
  let b = "";
  b += D.rect(0, 70, 90, 60, { fill: "#fdfbf7", stroke: C.axis, width: 2.5 }) + D.rect(60, 36, 430, 140, { fill: "#fdfbf7", stroke: C.axis, width: 2.5, r: 46 });
  for (const [x, y, rot] of [[130, 90, -15], [180, 140, 10]]) b += ellipse(x, y, 24, 11, { fill: C.fillGreen, stroke: C.green, width: 1.8, rotate: rot }) + D.path_(`M${x - 14},${y} l5,-6 l5,12 l5,-12 l5,12 l5,-12`, { stroke: C.green, width: 1.2 });
  for (const [x, y] of [[270, 70], [330, 100], [390, 70], [330, 140]]) b += D.circle(x, y, 13, { fill: C.fillAmber, stroke: C.amber, width: 1.8 }) + D.dot(x - 4, y - 3, { r: 1.8, stroke: C.amber }) + D.dot(x + 4, y + 3, { r: 1.8, stroke: C.amber }) + D.dot(x + 2, y - 5, { r: 1.8, stroke: C.amber });
  b += D.path_("M236,172 C236,150 272,150 272,172", { stroke: C.amber, width: 2, fill: C.fillAmber });
  for (const [x, y] of [[244, 186], [254, 196], [264, 186], [272, 202]]) b += D.dot(x, y, { r: 3, stroke: C.amber });
  for (const x of [130, 420]) b += D.rect(x - 9, 168, 18, 14, { fill: C.fillBlue, stroke: C.blue, width: 2 });
  b += arr(130, 204, 130, 150, C.blue, 2.2) + D.text(142, 204, "Ca²⁺", { size: 13, fill: C.blue, weight: 700 });
  // ACh moving across the cleft to a receptor
  b += arr(262, 196, 296, 222, C.amber, 2);
  // postsynaptic membrane (shifted)
  let post = D.rect(60, 212, 430, 24, { fill: C.fillGrey, stroke: C.axis, width: 2.5 });
  for (const x of [220, 300, 380]) post += D.rect(x - 11, 208, 22, 32, { fill: C.fillGreen, stroke: C.green, width: 2, r: 3 }) + D.polyline([[x - 11, 208], [x - 5, 198], [x, 208], [x + 5, 198], [x + 11, 208]], { stroke: C.green, width: 1.8 });
  for (const x of [170, 260, 340]) post += D.rect(x - 6, 200, 12, 10, { fill: C.fillAmber, stroke: C.purple, width: 2, r: 2 });
  post += arr(300, 246, 300, 282, C.blue, 2.4) + D.text(312, 270, "Na⁺", { size: 13, fill: C.blue, weight: 700 });
  b += D.group(post, { translate: [0, dy] });
  b += arr(170, 224, 170, 186, C.purple, 2);
  b += arr(8, 100, 56, 100, C.ink, 2.4);
  b += num(30, 52, 1) + num(104, 190, 2) + num(262, 130, 3) + num(340, 202, 4) + num(352, 292, 5) + num(196, 214, 6);
  b += D.text(500, 100, "Presynaptic", { size: 13, weight: 700 }) + D.text(500, 116, "knob", { size: 13, weight: 700 });
  b += D.text(500, 142, "mitochondria,", { size: 12, fill: C.green }) + D.text(500, 157, "vesicles of ACh", { size: 12, fill: C.amber });
  b += D.text(500, 206, "cleft (about 20 nm)", { size: 12, fill: C.muted });
  b += D.text(500, 252, "Postsynaptic", { size: 13, weight: 700 }) + D.text(500, 268, "membrane", { size: 13, weight: 700 });
  b += D.text(500, 292, "receptor = Na⁺ channel", { size: 12, fill: C.green }) + D.text(500, 308, "(purple box:", { size: 12, fill: C.purple }) + D.text(500, 323, "acetylcholinesterase)", { size: 12, fill: C.purple });
  const steps = ["Action potential arrives at the presynaptic knob", "Voltage-gated Ca²⁺ channels open; Ca²⁺ diffuses in", "Vesicles fuse with the membrane; ACh released by exocytosis", "ACh diffuses across the cleft and binds to receptors", "Na⁺ channels open; Na⁺ enters: the membrane depolarises", "Acetylcholinesterase splits ACh; choline and ethanoic acid return"];
  steps.forEach((t, i) => { b += D.circle(24, 360 + i * 18 - 4, 8, { fill: C.ink, stroke: C.ink, width: 1 }) + D.text(24, 360 + i * 18, String(i + 1), { anchor: "middle", size: 11, weight: 700, fill: "#fff" }) + D.text(40, 360 + i * 18, t, { size: 12 }); });
  const alt = "Cholinergic synapse: an action potential arrives at the presynaptic knob, voltage-gated calcium channels open and Ca2+ enters, vesicles of acetylcholine fuse with the membrane and release ACh into the 20 nm cleft, ACh binds to receptors that are sodium channels in the postsynaptic membrane so Na+ enters and depolarises it, and acetylcholinesterase breaks the ACh down so its products return to the knob.";
  const cap = "Figure: transmission across a cholinergic synapse, in the six numbered steps";
  await fig("cholinergic-synapse", D.svg(w, h, b), alt, cap, "coordination/synapses", "An electron micrograph of a synapse shows");
}

// ---- Sarcomere at three lengths (worked solution: myosin 1.6 um, actin 1.0 um)
{
  const myosin = 1.6, actin = 1.0, lens = [2.4, 2.2, 2.0], s = 130, x0 = 70;
  const w = 640, h = 420;
  let b = "";
  lens.forEach((L, i) => {
    const y = 90 + i * 115;
    const iBand = Math.round((L - myosin) * 10) / 10, hZone = Math.max(0, Math.round((L - 2 * actin) * 10) / 10);
    if (i === 0 && (iBand !== 0.8 || hZone !== 0.4)) throw new Error("band maths");
    if (i === 1 && (iBand !== 0.6 || hZone !== 0.2)) throw new Error("band maths");
    if (i === 2 && (iBand !== 0.4 || hZone !== 0)) throw new Error("band maths");
    const xa = x0, xb = x0 + L * s, mid = (xa + xb) / 2;
    // Z lines
    b += D.line(xa, y - 34, xa, y + 34, { stroke: C.ink, width: 4 }) + D.line(xb, y - 34, xb, y + 34, { stroke: C.ink, width: 4 });
    b += T(xa, y - 40, "Z", { size: 13, weight: 700 }) + T(xb, y - 40, "Z", { size: 13, weight: 700 });
    // actin (thin) from each Z line, two lanes
    for (const dy of [-14, 14]) b += D.line(xa, y + dy, xa + actin * s, y + dy, { stroke: C.blue, width: 3 }) + D.line(xb, y + dy, xb - actin * s, y + dy, { stroke: C.blue, width: 3 });
    // myosin (thick) centred
    b += D.rect(mid - (myosin * s) / 2, y - 5, myosin * s, 10, { fill: C.amber, stroke: "none" }) + D.rect(mid - (myosin * s) / 2, y - 5, myosin * s, 10, { fill: "none", stroke: C.amber, width: 1 });
    // measurements
    b += D.line(mid - (myosin * s) / 2, y + 44, mid + (myosin * s) / 2, y + 44, { stroke: C.amber, width: 2, arrow: true, arrowStart: true }).replace("", "");
    b += T(mid, y + 60, `A band ${myosin} µm`, { size: 12, fill: C.amber, weight: 700 });
    
    b += D.text(xb + 24, y - 14, `sarcomere ${L.toFixed(1)} µm`, { size: 13, weight: 700 }) + D.text(xb + 24, y + 6, `I band (both halves) ${iBand} µm`, { size: 12 }) + D.text(xb + 24, y + 24, `H zone ${hZone} µm`, { size: 12 });
  });
  b += D.text(10, 400, "Blue: thin actin filaments (1.0 µm from each Z line). Amber: thick myosin filaments (1.6 µm).", { size: 12, fill: C.muted });
  const alt = "A sarcomere at three lengths with myosin 1.6 µm and actin 1.0 µm long: at 2.4 µm the I band is 0.8 µm and the H zone 0.4 µm; at 2.2 µm they are 0.6 and 0.2 µm; at 2.0 µm the I band is 0.4 µm and the H zone has gone, while the A band stays 1.6 µm because the filaments slide but do not shorten.";
  const cap = "Figure: the sliding filament model; the A band stays the same while the I band and H zone shorten";
  await fig("sarcomere-sliding-filaments", D.svg(w, h, b), alt, cap, "coordination/muscle-contraction", "| H zone | Shorter (may disappear)");
}

// ---- Nephron
{
  const w = 640, h = 430;
  let b = "";
  b += D.rect(10, 40, 620, 170, { fill: "#fdf3e6", stroke: "none" }) + D.rect(10, 210, 620, 190, { fill: "#f6ece4", stroke: "none" });
  b += D.line(10, 210, 630, 210, { stroke: C.muted, width: 1.4, dash: true });
  b += D.text(14, 58, "Cortex", { size: 14, weight: 700, fill: C.amber }) + D.text(14, 228, "Medulla", { size: 14, weight: 700, fill: C.amber });
  const tube = (d) => D.path_(d, { stroke: C.axis, width: 9 }) + D.path_(d, { stroke: C.fillBlue, width: 5 });
  // Bowman's capsule and glomerulus
  b += D.circle(130, 120, 34, { fill: "#fff", stroke: C.axis, width: 3 }) + D.path_("M118,108 c14,-8 24,6 10,12 c-14,6 -4,18 10,10 c10,-6 4,-14 -6,-8", { stroke: C.red, width: 3 });
  // arterioles
  b += D.path_("M40,84 L98,108", { stroke: C.red, width: 5 }) + D.path_("M98,134 L40,150", { stroke: C.red, width: 3 });
  // PCT (coiled), loop, DCT, collecting duct
  b += tube("M148,150 C170,170 150,180 175,186 C200,192 180,160 205,172 C228,184 222,196 236,200 L236,330 C236,356 290,356 290,330 L290,190");
  b += tube("M290,190 C300,170 330,175 340,150 C350,126 350,118 380,112 L420,112");
  b += D.line(420, 60, 420, 372, { stroke: C.axis, width: 11 }) + D.line(420, 60, 420, 372, { stroke: C.fillBlue, width: 7 });
  b += arr(420, 340, 420, 395, C.ink, 2.4);
  b += D.text(432, 395, "to the renal pelvis", { size: 12, fill: C.muted });
  const tx = (x, y, s, o = {}) => D.text(x, y, s, { size: o.size ?? 13, anchor: o.anchor ?? "start", weight: o.weight, fill: o.fill });
  b += tx(10, 26, "Afferent arteriole (wider)") + lead(140, 30, 70, 90);
  b += tx(10, 172, "Efferent arteriole") + tx(10, 188, "(narrower)") + lead(60, 164, 60, 152);
  b += tx(176, 56, "Bowman's capsule") + tx(176, 72, "with glomerulus") + lead(200, 78, 156, 104);
  b += tx(176, 132, "Proximal convoluted") + tx(176, 148, "tubule (PCT)") + lead(200, 154, 192, 182);
  b += tx(262, 82, "Distal convoluted") + tx(262, 98, "tubule (DCT)") + lead(330, 104, 348, 128);
  b += tx(226, 262, "Descending limb:", { anchor: "end", size: 12 }) + tx(226, 277, "permeable to water", { anchor: "end", size: 12 });
  b += tx(300, 262, "Ascending limb:", { size: 12 }) + tx(300, 277, "removes Na⁺, Cl⁻;", { size: 12 }) + tx(300, 292, "no water leaves", { size: 12 });
  b += tx(263, 384, "Loop of Henle", { anchor: "middle", weight: 700 });
  b += tx(432, 120, "Collecting duct", { weight: 700 }) + tx(432, 136, "(ADH makes it", { size: 12 }) + tx(432, 151, "permeable to water)", { size: 12 });
  b += tx(440, 270, "Medulla tissue fluid:", { size: 12 }) + tx(440, 285, "very low water potential,", { size: 12 }) + tx(440, 300, "lowest near the loop tips", { size: 12 });
  const alt = "Nephron and collecting duct: blood enters the glomerulus in the cortex by the wider afferent arteriole and leaves by the narrower efferent arteriole; filtrate passes from Bowman's capsule along the proximal convoluted tubule, down the descending limb and up the ascending limb of the loop of Henle in the medulla, through the distal convoluted tubule and into a collecting duct that runs down to the renal pelvis.";
  const cap = "Figure: one nephron, showing which parts lie in the cortex and which in the medulla";
  await fig("nephron-structure", D.svg(w, h, b), alt, cap, "homeostasis/kidney", "7. Several nephrons drain into a **collecting duct**");
}
