// biology-a: negative feedback, glucose graphs, genetics, nitrogen cycle, antibodies, respiration, heart.
// Run: node .scratch/biology-a/diagrams/misc.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const head = (x1, y1, x2, y2, col, s = 10) => { const a = Math.atan2(y2 - y1, x2 - x1); return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
const arr = (x1, y1, x2, y2, col = C.ink, w = 2.4, dash = false) => D.line(x1, y1, x2, y2, { stroke: col, width: w, dash }) + head(x1, y1, x2, y2, col);
const lead = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1.2 });
const parr = (pts, col = C.ink, w = 2.4) => { const n = pts.length; return D.polyline(pts, { stroke: col, width: w }) + head(pts[n - 2][0], pts[n - 2][1], pts[n - 1][0], pts[n - 1][1], col); };

// ---- Negative feedback loop
{
  const w = 600, h = 360;
  let b = "";
  const bw = 170, bh = 62;
  b += D.node(20, 40, bw, bh, "Factor moves away\nfrom the set point\n(stimulus)", { fill: C.fillAmber, size: 13 });
  b += D.node(215, 40, bw, bh, "Receptors\ndetect the change", { fill: C.fillBlue, size: 13 });
  b += D.node(410, 40, bw, bh, "Control centre\n(e.g. hypothalamus,\npancreas)", { fill: C.fillBlue, size: 13 });
  b += D.node(410, 210, bw, bh, "Effectors\n(e.g. sweat glands,\nliver cells)", { fill: C.fillGreen, size: 13 });
  b += D.node(215, 210, bw, bh, "Response reverses\nthe change", { fill: C.fillGreen, size: 13 });
  b += D.node(20, 210, bw, bh, "Factor returns\ntowards the set point", { fill: C.fillAmber, size: 13 });
  b += arr(192, 71, 213, 71) + arr(387, 71, 408, 71) + arr(495, 104, 495, 208) + arr(408, 241, 387, 241) + arr(213, 241, 192, 241);
  b += arr(105, 208, 105, 106, C.red, 2.6) + D.text(115, 160, "stimulus is reduced, so", { size: 12, fill: C.red }) + D.text(115, 176, "the response is reduced", { size: 12, fill: C.red });
  b += D.text(300, 326, "Negative feedback: the response reverses the original change,", { anchor: "middle", size: 14, weight: 700 }) + D.text(300, 346, "so the factor fluctuates within narrow limits around the set point.", { anchor: "middle", size: 14, weight: 700 });
  const alt = "Negative feedback loop: a change in a factor away from its set point is detected by receptors, passed to a control centre, which triggers effectors, producing a response that reverses the change so the factor returns towards the set point; as it returns the stimulus is reduced and so the response is reduced.";
  const cap = "Figure: the parts of a negative feedback control system";
  await fig("negative-feedback-loop", D.svg(w, h, b), alt, cap, "homeostasis/principles", "5. As the factor returns");
}

// ---- Blood glucose after a meal (worked solution of principles)
{
  const t = [0, 30, 60, 90, 120, 150], g = [5.0, 7.5, 6.6, 5.6, 5.0, 4.9];
  const ax = D.axes({ x: [0, 150], y: [4, 8], w: 600, h: 400, xTicks: 30, yTicks: 0.5, xLabel: "Time after meal / min", yLabel: "Blood glucose / mmol dm⁻³", pad: { l: 70, r: 28, t: 40, b: 58 }, yFormat: (v) => v.toFixed(1) });
  let b = ax.frame;
  b += D.line(ax.X(0), ax.Y(5.0), ax.X(150), ax.Y(5.0), { stroke: C.muted, width: 1.4, dash: true }) + D.text(ax.X(40), ax.Y(5.0) + 18, "starting value 5.0", { size: 12, fill: C.muted });
  b += ax.line(t.map((x, i) => [x, g[i]]), { stroke: C.blue });
  t.forEach((x, i) => { b += ax.point(x, g[i], { stroke: C.blue, r: 3.5 }); });
  b += ax.tag(30, 7.5, "peak 7.5 at 30 min (+50%)", { dx: 14, dy: -6 }) + D.text(ax.X(150), ax.Y(4.9) + 34, "dips to 4.9 at 150 min", { size: 13, anchor: "end" });
  const alt = "Blood glucose after a meal: 5.0 mmol per dm3 at the start rises 50% to a peak of 7.5 at 30 min, then falls through 6.6 and 5.6 to 5.0 at 120 min and dips slightly to 4.9 at 150 min, fluctuating around the set point as negative feedback corrects it.";
  const cap = "Figure: blood glucose after a meal, from the worked solution";
  await fig("blood-glucose-after-meal", D.svg(600, 400, b), alt, cap, "homeostasis/principles", "| Blood glucose / mmol dm⁻³ | 5.0 | 7.5");
}

// ---- Glucose tolerance test
{
  const t = [0, 30, 60, 90, 120], A = [4.8, 7.6, 6.5, 5.5, 5.0], B = [7.2, 12.4, 15.1, 14.0, 12.6];
  const ax = D.axes({ x: [0, 120], y: [0, 16], w: 600, h: 400, xTicks: 30, yTicks: 2, xLabel: "Time after glucose drink / min", yLabel: "Blood glucose / mmol dm⁻³", pad: { l: 70, r: 28, t: 40, b: 58 } });
  let b = ax.frame + ax.line(t.map((x, i) => [x, A[i]]), { stroke: C.blue }) + ax.line(t.map((x, i) => [x, B[i]]), { stroke: C.amber });
  t.forEach((x, i) => { b += ax.point(x, A[i], { stroke: C.blue, r: 3.5 }) + ax.point(x, B[i], { stroke: C.amber, r: 3.5 }); });
  b += ax.tag(60, 15.1, "Person B (amber): peak 15.1 at 60 min", { fill: C.amber, dx: 12, dy: -8 }) + D.text(ax.X(34), ax.Y(2.6), "Person A (blue): peak 7.6 at 30 min,", { size: 13, fill: C.blue }) + D.text(ax.X(34), ax.Y(2.6) + 17, "back to 5.0 by 120 min", { size: 13, fill: C.blue });
  const alt = "Glucose tolerance test: person A starts at 4.8 mmol per dm3, peaks at 7.6 at 30 minutes and is back to 5.0 by 120 minutes; person B starts higher at 7.2, peaks at 15.1 at 60 minutes and is still 12.6 at 120 minutes, a pattern consistent with diabetes.";
  const cap = "Figure: glucose tolerance test for two adults, from the lesson's table";
  await fig("glucose-tolerance-test", D.svg(600, 400, b), alt, cap, "homeostasis/blood-glucose", "| Person B / mmol dm⁻³");
}

// ---- Monohybrid cross: tall and dwarf peas
{
  const w = 600, h = 430;
  let b = "";
  b += D.node(30, 20, 230, 44, "P  TT (tall) × tt (dwarf)", { fill: C.fillBlue, size: 14 }) + D.node(340, 20, 230, 44, "gametes: all T and all t", { fill: C.fillGrey, size: 14 });
  b += arr(150, 66, 150, 98) + D.node(30, 100, 230, 44, "F1  all Tt (tall)", { fill: C.fillGreen, size: 14 }) + D.node(340, 100, 230, 44, "gametes: T or t, from each", { fill: C.fillGrey, size: 14 });
  b += arr(262, 122, 338, 122);
  b += D.text(30, 178, "F1 × F1:  Tt × Tt", { size: 14, weight: 700 });
  // Punnett square
  const x0 = 140, y0 = 220, cs = 90;
  b += T(x0 + cs / 2, y0 - 10, "T", { weight: 700, size: 15 }) + T(x0 + cs * 1.5, y0 - 10, "t", { weight: 700, size: 15 }) + T(x0 - 20, y0 + cs / 2 + 5, "T", { weight: 700, size: 15 }) + T(x0 - 20, y0 + cs * 1.5 + 5, "t", { weight: 700, size: 15 });
  b += D.text(x0 + cs, 196, "", {});
  const cells = [["TT", "tall", C.fillGreen], ["Tt", "tall", C.fillGreen], ["Tt", "tall", C.fillGreen], ["tt", "dwarf", C.fillAmber]];
  cells.forEach(([g, p, f], i) => { const cx = x0 + (i % 2) * cs, cy = y0 + Math.floor(i / 2) * cs; b += D.rect(cx, cy, cs, cs, { fill: f, stroke: C.axis, width: 2 }) + T(cx + cs / 2, cy + cs / 2 - 2, g, { size: 18, weight: 700 }) + T(cx + cs / 2, cy + cs / 2 + 18, p, { size: 13 }); });
  b += D.text(x0 + 2 * cs + 30, y0 + 40, "Genotypes: 1 TT : 2 Tt : 1 tt", { size: 14, weight: 700 }) + D.text(x0 + 2 * cs + 30, y0 + 66, "Phenotypes: 3 tall : 1 dwarf", { size: 14, weight: 700 }) + D.text(x0 + 2 * cs + 30, y0 + 94, "Each F2 plant: ¾ chance tall,", { size: 13, fill: C.muted }) + D.text(x0 + 2 * cs + 30, y0 + 112, "¼ chance dwarf", { size: 13, fill: C.muted });
  const alt = "Monohybrid cross for tall (T) and dwarf (t) peas: pure-breeding TT × tt gives all Tt (tall) in F1; crossing two F1 plants gives a Punnett square with TT, Tt, Tt and tt, so the genotype ratio is 1 TT : 2 Tt : 1 tt and the phenotype ratio is 3 tall : 1 dwarf.";
  const cap = "Figure: the tall × dwarf cross to F2, with the Punnett square for Tt × Tt";
  await fig("monohybrid-tall-dwarf-cross", D.svg(w, h, b), alt, cap, "inheritance/monohybrid", "Offspring genotypes: 1 TT : 2 Tt : 1 tt");
}

// ---- Pedigree: haemophilia (X-linked recessive), the lesson's family history
{
  const w = 560, h = 400;
  let b = "";
  const sq = (x, y, aff) => D.rect(x - 18, y - 18, 36, 36, { fill: aff ? C.ink : "#fff", stroke: C.ink, width: 2.2 });
  const ci = (x, y, aff, carrier) => D.circle(x, y, 19, { fill: aff ? C.ink : "#fff", stroke: C.ink, width: 2.2 }) + (carrier ? D.dot(x, y, { r: 5, stroke: C.ink }) : "");
  const yI = 60, yII = 170, yIII = 290;
  // generation I
  b += sq(190, yI, false) + ci(330, yI, false, true) + D.line(208, yI, 311, yI, { width: 2 });
  // generation II: mother's brother (affected), mother (carrier), father
  b += sq(110, yII, true) + ci(300, yII, false, true) + sq(430, yII, false) + D.line(319, yII, 412, yII, { width: 2 });
  b += D.line(260, yI, 260, 112, { width: 2 }) + D.line(110, 112, 300, 112, { width: 2 }) + D.line(110, 112, 110, yII - 18, { width: 2 }) + D.line(300, 112, 300, yII - 19, { width: 2 });
  // generation III: two sons
  b += sq(300, yIII, false) + sq(420, yIII, true);
  b += D.line(365, yII, 365, 232, { width: 2 }) + D.line(300, 232, 420, 232, { width: 2 }) + D.line(300, 232, 300, yIII - 18, { width: 2 }) + D.line(420, 232, 420, yIII - 18, { width: 2 });
  // labels
  const lab = (x, y, s) => D.text(x, y, s, { size: 12, anchor: "middle" });
  b += lab(190, yI + 36, "I-1  XᴴY") + lab(330, yI + 36, "I-2  XᴴXʰ") + lab(110, yII + 36, "II-1  XʰY") + lab(300, yII + 38, "II-2  XᴴXʰ") + lab(430, yII + 36, "II-3  XᴴY") + lab(300, yIII + 36, "III-1  XᴴY") + lab(420, yIII + 36, "III-2  XʰY");
  b += D.text(14, yI + 5, "I", { size: 15, weight: 700 }) + D.text(14, yII + 5, "II", { size: 15, weight: 700 }) + D.text(14, yIII + 5, "III", { size: 15, weight: 700 });
  b += D.rect(20, 340, 14, 14, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(40, 352, "unaffected male", { size: 12 }) + D.rect(150, 340, 14, 14, { fill: C.ink, stroke: C.ink, width: 2 }) + D.text(170, 352, "male with haemophilia", { size: 12 });
  b += D.circle(340, 347, 8, { fill: "#fff", stroke: C.ink, width: 2 }) + D.dot(340, 347, { r: 3, stroke: C.ink }) + D.text(354, 352, "carrier female (unaffected)", { size: 12 });
  b += D.text(20, 380, "I-2 is deduced to be a carrier (she passed Xʰ to her son II-1 and to her daughter II-2).", { size: 12, fill: C.muted });
  const alt = "Pedigree of the family with haemophilia: the grandmother I-2 is a carrier, her son II-1 is affected, her daughter II-2 is a carrier who has two sons with the unaffected father II-3; one son, III-2, has haemophilia (XhY) and the other is unaffected. The condition passes through carrier females and affects males.";
  const cap = "Figure: pedigree for an X-linked recessive condition (haemophilia), matching the family history described";
  await fig("pedigree-haemophilia", D.svg(w, h, b), alt, cap, "inheritance/sex-linkage", "In a family, an unaffected couple have two sons");
}

// ---- Hardy-Weinberg genotype frequencies against q, with the snail (q = 0.2) and cattle (q = 0.3) examples
{
  const f = { AA: (q) => (1 - q) ** 2, Aa: (q) => 2 * q * (1 - q), aa: (q) => q * q };
  const snail = [0.64, 0.32, 0.04].map((v) => Math.round(v * 100) / 100);
  const q = 0.2;
  if (Math.abs(f.AA(q) - snail[0]) > 1e-9 || Math.abs(f.Aa(q) - snail[1]) > 1e-9 || Math.abs(f.aa(q) - snail[2]) > 1e-9) throw new Error("HW snail");
  const cattle = [0.49, 0.42, 0.09], qc = 0.3;
  if (Math.abs(f.AA(qc) - cattle[0]) > 1e-9 || Math.abs(f.Aa(qc) - cattle[1]) > 1e-9 || Math.abs(f.aa(qc) - cattle[2]) > 1e-9) throw new Error("HW cattle");
  const ax = D.axes({ x: [0, 1], y: [0, 1], w: 600, h: 420, xTicks: 0.2, yTicks: 0.2, xLabel: "Frequency of the recessive allele, q", yLabel: "Genotype frequency", pad: { l: 70, r: 28, t: 40, b: 58 }, xFormat: (v) => v.toFixed(1), yFormat: (v) => v.toFixed(1) });
  let b = ax.frame + ax.plot(f.AA, { stroke: C.blue }) + ax.plot(f.Aa, { stroke: C.amber }) + ax.plot(f.aa, { stroke: C.red });
  for (const qq of [q, qc]) {
    b += D.line(ax.X(qq), ax.Y(0), ax.X(qq), ax.Y(1), { stroke: C.muted, width: 1.2, dash: true });
    for (const k of ["AA", "Aa", "aa"]) b += ax.point(qq, f[k](qq), { stroke: k === "AA" ? C.blue : k === "Aa" ? C.amber : C.red, r: 4 });
  }
  b += D.text(ax.X(q) - 6, ax.Y(0.98), "snails, q = 0.2", { size: 12, fill: C.muted, anchor: "end" }) + D.text(ax.X(qc) + 6, ax.Y(0.82), "cattle, q = 0.3", { size: 12, fill: C.muted });
  b += D.text(ax.X(0.5), ax.Y(0.96), "AA = p² (blue)", { size: 13, fill: C.blue, weight: 700 }) + D.text(ax.X(0.5), ax.Y(0.88), "Aa = 2pq (amber)", { size: 13, fill: C.amber, weight: 700 }) + D.text(ax.X(0.5), ax.Y(0.80), "aa = q² (red)", { size: 13, fill: C.red, weight: 700 });
  const alt = "Hardy-Weinberg genotype frequencies against the frequency q of the recessive allele: p squared falls from 1 to 0, 2pq peaks at 0.5 when q is 0.5, and q squared rises from 0 to 1; at q = 0.2 (the snails) the frequencies are 0.64, 0.32 and 0.04, and at q = 0.3 (the cattle) 0.49, 0.42 and 0.09.";
  const cap = "Figure: Hardy-Weinberg genotype frequencies, with the snail and cattle populations marked";
  await fig("hardy-weinberg-genotype-curves", D.svg(600, 420, b), alt, cap, "evolution/allele-frequencies", "6. Check:");
}
