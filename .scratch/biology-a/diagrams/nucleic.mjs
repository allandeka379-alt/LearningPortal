// biology-a nucleic acids: DNA ladder, replication fork, Meselson-Stahl, transcription, translation.
// Run: node .scratch/biology-a/diagrams/nucleic.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, ellipse, fig } from "./_h.mjs";

const T = (x, y, s, o = {}) => D.text(x, y, s, { anchor: "middle", size: 13, ...o });
const pair = { A: "T", T: "A", C: "G", G: "C" };
const baseCol = { A: C.red, T: C.amber, C: C.blue, G: C.green, U: C.purple };
const base = (x, y, ch, o = {}) => D.circle(x, y, o.r ?? 13, { fill: "#fff", stroke: baseCol[ch], width: 2 }) + D.text(x, y + 5, ch, { anchor: "middle", size: 14, weight: 700, fill: baseCol[ch] });

// ---- DNA ladder for the worked fragment 5' ATGCCGTA 3'
{
  const top = "ATGCCGTA";
  const bottom = [...top].map((c) => pair[c]).join(""); // 3' TACGGCAT 5'
  if (bottom !== "TACGGCAT") throw new Error("complement");
  const AT = [...top].filter((c) => c === "A" || c === "T").length, CG = top.length - AT;
  const bonds = AT * 2 + CG * 3;
  if (AT !== 4 || CG !== 4 || bonds !== 20) throw new Error("bond count");
  const w = 600, h = 330, x0 = 100, dx = 54, yt = 90, yb = 210;
  let b = "";
  b += D.line(x0 - 28, yt - 30, x0 + dx * 7 + 28, yt - 30, { stroke: C.muted, width: 3 }) + D.line(x0 - 28, yb + 30, x0 + dx * 7 + 28, yb + 30, { stroke: C.muted, width: 3 });
  b += D.text(10, yt - 26, "5'", { size: 14, weight: 700 }) + D.text(x0 + dx * 7 + 38, yt - 26, "3'", { size: 14, weight: 700 }) + D.text(10, yb + 36, "3'", { size: 14, weight: 700 }) + D.text(x0 + dx * 7 + 38, yb + 36, "5'", { size: 14, weight: 700 });
  [...top].forEach((c, i) => {
    const x = x0 + dx * i, n = c === "A" || c === "T" ? 2 : 3;
    b += D.line(x, yt - 30, x, yt - 13, { stroke: C.muted, width: 2 }) + D.line(x, yb + 30, x, yb + 13, { stroke: C.muted, width: 2 });
    for (let k = 0; k < n; k += 1) { const off = (k - (n - 1) / 2) * 9; b += D.line(x + off, yt + 15, x + off, yb - 15, { stroke: C.red, width: 1.6, dash: "3 3" }); }
    b += base(x, yt, c) + base(x, yb, bottom[i]);
  });
  b += D.text(x0 + dx * 3.5, yt - 40, "sugar-phosphate backbone", { anchor: "middle", size: 13, fill: C.muted }).replace("", "");
  b += T(x0 + dx * 3.5, 272, "red dashes = hydrogen bonds (2 for A-T, 3 for C-G)", { size: 13, fill: C.red });
  b += T(w / 2, 306, `A-T pairs: ${AT} × 2 = ${AT * 2};  C-G pairs: ${CG} × 3 = ${CG * 3};  total = ${bonds} hydrogen bonds`, { size: 14, weight: 700 });
  b += D.text(10, 20, "Two antiparallel strands: 5' → 3' on the top strand, 3' → 5' below", { size: 13, fill: C.muted });
  const alt = "DNA fragment drawn as a ladder: the top strand 5' ATGCCGTA 3' pairs with the antiparallel bottom strand 3' TACGGCAT 5' by hydrogen bonds, two for each A-T pair and three for each C-G pair, so the four A-T and four C-G pairs give 8 + 12 = 20 hydrogen bonds; sugar-phosphate backbones run along the outside.";
  const cap = "Figure: complementary base pairing in an eight-base-pair fragment (the worked example), with hydrogen bonds counted";
  await fig("dna-ladder-base-pairing", D.svg(w, h, b), alt, cap, "nucleic/dna-structure", "5. The ladder is twisted into a **double helix**");
}

// ---- Replication fork
{
  const w = 640, h = 340;
  let b = "";
  const F = [350, 170], topEnd = [50, 30], botEnd = [50, 310];
  const head = (x1, y1, x2, y2, col) => { const a = Math.atan2(y2 - y1, x2 - x1), s = 11; return D.polyline([[x2, y2], [x2 - s * Math.cos(a - 0.45), y2 - s * Math.sin(a - 0.45)], [x2 - s * Math.cos(a + 0.45), y2 - s * Math.sin(a + 0.45)]], { fill: col, stroke: col, width: 1, close: true }); };
  const arr = (x1, y1, x2, y2, col) => D.line(x1, y1, x2, y2, { stroke: col, width: 4 }) + head(x1, y1, x2, y2, col);
  // parental duplex on the right, templates opening to the left
  b += D.line(F[0], F[1] - 12, 620, F[1] - 12, { stroke: C.blue, width: 3.5 }) + D.line(F[0], F[1] + 12, 620, F[1] + 12, { stroke: C.blue, width: 3.5 });
  for (let x = F[0] + 14; x < 620; x += 16) b += D.line(x, F[1] - 10, x, F[1] + 10, { stroke: C.grid, width: 2 });
  b += D.line(F[0], F[1] - 12, topEnd[0], topEnd[1], { stroke: C.blue, width: 3.5 }) + D.line(F[0], F[1] + 12, botEnd[0], botEnd[1], { stroke: C.blue, width: 3.5 });
  const along = (t, p, q, off) => { const dx = q[0] - p[0], dy = q[1] - p[1], l = Math.hypot(dx, dy); return [p[0] + dx * t - (dy / l) * off, p[1] + dy * t + (dx / l) * off]; };
  const P1 = [F[0], F[1] - 12], P2 = [F[0], F[1] + 12];
  const L0 = along(0.05, P1, topEnd, -16), L1 = along(0.9, P1, topEnd, -16);
  b += arr(L1[0], L1[1], L0[0], L0[1], C.amber);
  for (const [a, z] of [[0.06, 0.3], [0.38, 0.62], [0.7, 0.94]]) { const p = along(a, P2, botEnd, 16), q = along(z, P2, botEnd, 16); b += arr(p[0], p[1], q[0], q[1], C.green); }
  // helicase and DNA polymerases
  b += D.circle(F[0] - 4, F[1], 17, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(F[0] - 4, F[1] + 5, "H", { weight: 700 });
  const pl = along(0.3, P1, topEnd, -16), pg = along(0.1, P2, botEnd, 16);
  b += D.circle(pl[0], pl[1], 14, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(pl[0], pl[1] + 5, "P", { weight: 700 });
  b += D.circle(pg[0] + 2, pg[1] + 14, 14, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(pg[0] + 2, pg[1] + 19, "P", { weight: 700 });
  // end labels
  b += D.text(14, 34, "3'", { size: 14, weight: 700 }) + D.text(14, 318, "5'", { size: 14, weight: 700 }) + D.text(626, 130, "5'", { size: 14, weight: 700, anchor: "end" }) + D.text(626, 222, "3'", { size: 14, weight: 700, anchor: "end" });
  // legend (top right)
  const lg = (y, col, s) => D.line(300, y - 4, 330, y - 4, { stroke: col, width: 4 }) + D.text(338, y, s, { size: 13 });
  b += lg(26, C.blue, "Parental (template) strands") + lg(48, C.amber, "Leading strand: continuous, 5' → 3' towards the fork") + lg(70, C.green, "Lagging strand: Okazaki fragments, joined by ligase");
  b += D.text(300, 96, "H = helicase (unwinds the helix)", { size: 13 }) + D.text(300, 116, "P = DNA polymerase (adds nucleotides 5' → 3' only)", { size: 13 });
  b += D.arrow(420, 250, 520, 250, { stroke: C.ink, width: 2 }) + D.text(470, 274, "fork moves this way", { size: 13, anchor: "middle", fill: C.muted });
  const alt = "Replication fork: the parental double helix on the right is unwound by helicase; on the upper template the leading strand is built continuously towards the fork by DNA polymerase, while on the lower template the lagging strand is built away from the fork as short Okazaki fragments that ligase later joins; DNA polymerase adds nucleotides only in the 5' to 3' direction.";
  const cap = "Figure: the replication fork, showing why one new strand is continuous and the other is made in fragments";
  await fig("dna-replication-fork", D.svg(w, h, b), alt, cap, "nucleic/dna-replication", "In eukaryotes replication starts at many points");
}

// ---- Meselson-Stahl tubes (proportions from the lesson and the three-generation worked solution)
{
  const gens = [
    { g: "Generation 0", sub: "¹⁵N only", bands: [["heavy", 1]] },
    { g: "Generation 1", sub: "", bands: [["hybrid", 1]] },
    { g: "Generation 2", sub: "", bands: [["hybrid", 0.5], ["light", 0.5]] },
    { g: "Generation 3", sub: "(worked solution)", bands: [["hybrid", 2 / 8], ["light", 6 / 8]] },
  ];
  const w = 640, h = 360, ty = 70, th = 190, tw = 64;
  const level = { heavy: 0.74, hybrid: 0.5, light: 0.26 }; // fraction down the tube
  const col = { heavy: C.red, hybrid: C.purple, light: C.blue };
  let b = "";
  gens.forEach((gn, i) => {
    const x = 130 + i * 128;
    b += D.rect(x - tw / 2, ty, tw, th, { fill: "#fff", stroke: C.axis, width: 2.5, r: 10 });
    for (const [kind, frac] of gn.bands) b += D.rect(x - tw / 2 + 4, ty + th * level[kind] - (14 * frac) / 2 - 0, tw - 8, 14 * frac + 2, { fill: col[kind], stroke: "none" });
    b += T(x, ty + th + 24, gn.g, { weight: 700 }) + (gn.sub ? T(x, ty + th + 41, gn.sub, { size: 12, fill: C.muted }) : "");
  });
  // generation text with proportions
  const txt = ["all heavy", "all hybrid", "1/2 hybrid, 1/2 light", "2/8 hybrid, 6/8 light"];
  gens.forEach((gn, i) => { b += T(130 + i * 128, ty + th + (gn.sub ? 58 : 58), txt[i], { size: 12 }); });
    b += D.text(10, ty + th * level.light + 4, "light", { size: 13, fill: C.blue, weight: 700 }) + D.text(10, ty + th * level.hybrid + 4, "hybrid", { size: 13, fill: C.purple, weight: 700 }) + D.text(10, ty + th * level.heavy + 4, "heavy", { size: 13, fill: C.red, weight: 700 });
  b += D.text(10, 36, "DNA bands after centrifuging in caesium chloride (denser DNA settles lower)", { size: 13, fill: C.muted });
  b += D.text(10, 340, "Hybrid = one ¹⁵N strand + one ¹⁴N strand; light = both strands ¹⁴N.", { size: 12, fill: C.muted });
  const alt = "Meselson and Stahl result: after growth in heavy nitrogen the DNA forms one low heavy band; after one generation in light nitrogen it forms one intermediate hybrid band; after two generations there are equal hybrid and light bands; after three generations 2 of 8 molecules are hybrid and 6 of 8 are light. Only semi-conservative replication predicts all of these.";
  const cap = "Figure: DNA bands in the Meselson-Stahl experiment (band thickness shows the proportion of molecules)";
  await fig("meselson-stahl-bands", D.svg(w, h, b), alt, cap, "nucleic/dna-replication", "Only the semi-conservative model predicts both results.");
}

// ---- Transcription: the lesson's worked example
{
  const tmpl = "TACCGGAAGCTTATT"; // 3' -> 5'
  const mrna = [...tmpl].map((c) => ({ A: "U", T: "A", C: "G", G: "C" })[c]).join("");
  if (mrna !== "AUGGCCUUCGAAUAA") throw new Error("mRNA " + mrna);
  const coding = [...tmpl].map((c) => pair[c]).join("");
  if (coding !== "ATGGCCTTCGAATAA") throw new Error("coding");
  const w = 640, h = 340, x0 = 70, dx = 36;
  let b = "";
  b += D.text(10, 24, "Coding (non-template) strand, not used: 5' " + coding + " 3'", { size: 13, fill: C.muted });
  const yT = 80, yR = 160;
  b += D.text(8, yT + 5, "3'", { size: 14, weight: 700 }) + D.text(x0 + dx * 14 + 28, yT + 5, "5'", { size: 14, weight: 700 }) + D.text(8, yR + 5, "5'", { size: 14, weight: 700 }) + D.text(x0 + dx * 14 + 28, yR + 5, "3'", { size: 14, weight: 700 });
  b += D.text(x0, yT - 28, "Template strand of DNA", { size: 13, weight: 700, fill: C.blue });
  b += D.text(x0, yR + 42, "mRNA made by RNA polymerase (U replaces T)", { size: 13, weight: 700, fill: C.purple });
  [...tmpl].forEach((c, i) => {
    const x = x0 + dx * i;
    b += D.line(x, yT + 13, x, yR - 13, { stroke: C.red, width: 1.4, dash: "3 3" }) + base(x, yT, c, { r: 12 }) + base(x, yR, mrna[i], { r: 12 });
  });
  // codons
  const aa = ["Met (start)", "Ala", "Phe", "Glu", "stop"];
  for (let k = 0; k < 5; k += 1) {
    const xa = x0 + dx * (3 * k) - 15, xb = x0 + dx * (3 * k + 2) + 15;
    b += D.path_(`M${xa},${yR + 62} v8 h${xb - xa} v-8`, { stroke: C.axis, width: 1.4 });
    b += T((xa + xb) / 2, yR + 98, `codon ${k + 1}`, { size: 12, fill: C.muted }) + T((xa + xb) / 2, yR + 116, aa[k], { size: 13, weight: 700 });
  }
  b += T(w / 2, 318, "mRNA 5' AUG GCC UUC GAA UAA 3' codes for Met-Ala-Phe-Glu, then stops", { size: 14, weight: 700 });
  const alt = "Transcription of the worked example: the template strand 3' TACCGGAAGCTTATT 5' is read by RNA polymerase and free RNA nucleotides pair with it, giving mRNA 5' AUGGCCUUCGAAUAA 3' (A pairs with U, T with A, C with G, G with C); the codons AUG GCC UUC GAA UAA specify Met, Ala, Phe, Glu and a stop signal.";
  const cap = "Figure: the mRNA made from a template strand, split into codons (the worked example)";
  await fig("transcription-template-mrna", D.svg(w, h, b), alt, cap, "nucleic/transcription", "The RNA has the same base sequence as the non-transcribed");
}

// ---- Translation: ribosome, tRNA, codons from the worked example
{
  const mrna = ["AUG", "AAA", "GCU", "UGG", "CAU", "UAG"], aa = ["Met", "Lys", "Ala", "Trp", "His", "stop"];
  const anti = (c) => [...c].map((x) => ({ A: "U", U: "A", G: "C", C: "G" })[x]).join("");
  if (anti("AAA") !== "UUU" || anti("GCU") !== "CGA") throw new Error("anticodon");
  const w = 640, h = 360, x0 = 40, cw = 98, yM = 250;
  let b = "";
  const cx = (i) => x0 + cw * i + cw / 2;
  b += D.line(x0 - 20, yM, x0 + cw * 6 + 10, yM, { stroke: C.purple, width: 3 });
  b += D.text(6, yM - 6, "5'", { size: 14, weight: 700 }) + D.text(x0 + cw * 6 + 14, yM - 6, "3'", { size: 14, weight: 700 }).replace("", "");
  mrna.forEach((c, i) => { b += T(cx(i), yM + 24, c, { size: 15, weight: 700, fill: C.purple }) + T(cx(i), yM + 46, aa[i], { size: 12, fill: C.muted }) + (i ? D.line(x0 + cw * i, yM - 6, x0 + cw * i, yM + 6, { stroke: C.muted, width: 1.4 }) : ""); });
  // ribosome over codons 2 and 3 (index 1, 2)
  const rx = x0 + cw * 1 + 6, rw = cw * 2 - 12;
  b += D.rect(rx, 96, rw, 80, { fill: C.fillGrey, stroke: C.axis, width: 2, r: 30 }) + D.rect(rx + 8, 176, rw - 16, 56, { fill: C.fillGrey, stroke: C.axis, width: 2, r: 14 });
  b += T(rx + rw / 2, 120, "large subunit", { size: 12, fill: C.muted }) + D.text(rx + rw + 10, 208, "small subunit", { size: 12, fill: C.muted });
  // tRNAs: first (UUU, carrying Met-Lys chain) at codon 2, second (CGA, Ala) at codon 3
  const trna = (i, anticodon, label) => {
    const x = cx(i);
    return D.rect(x - 14, 150, 28, 70, { fill: C.fillAmber, stroke: C.amber, width: 2, r: 8 }) + D.line(x, 220, x, yM - 2, { stroke: C.amber, width: 1 }).replace("", "") + T(x, 208, anticodon, { size: 13, weight: 700, fill: C.amber }) + D.line(x - 14, 224, x - 14, yM - 3, { stroke: C.red, width: 1.4, dash: "3 3" }).replace("", "") + D.circle(x, 138, 13, { fill: C.fillGreen, stroke: C.green, width: 2 }) + T(x, 143, label, { size: 11, weight: 700, fill: C.green });
  };
  b += trna(1, "UUU", "Lys") + trna(2, "CGA", "Ala");
  b += D.circle(cx(1) - 20 - 24, 138, 13, { fill: C.fillGreen, stroke: C.green, width: 2 }) + T(cx(1) - 44, 143, "Met", { size: 11, weight: 700, fill: C.green }) + D.line(cx(1) - 31, 138, cx(1) - 13, 138, { stroke: C.green, width: 3 });
  b += D.text(cx(1) - 90, 84, "growing polypeptide: Met-Lys", { size: 13, fill: C.green, weight: 700 });
  b += D.arrow(cx(3) - 20, 130, cx(3) + 60, 130, { stroke: C.ink, width: 2 }) + D.text(cx(3) - 18, 112, "ribosome moves 5' → 3'", { size: 13 });
  b += D.text(cx(3) - 20, 150, "one codon at a time", { size: 13, fill: C.muted });
  b += D.text(10, 28, "Codon (mRNA) and anticodon (tRNA) pair by hydrogen bonds", { size: 14, weight: 700 });
  b += D.text(10, 330, "Result of the whole mRNA: Met-Lys-Ala-Trp-His; the stop codon UAG has no tRNA, so the polypeptide is released.", { size: 12, fill: C.muted });
  const alt = "Translation of the worked-example mRNA 5' AUG AAA GCU UGG CAU UAG 3': a ribosome covers two codons, AAA and GCU; tRNAs with anticodons UUU (carrying lysine) and CGA (carrying alanine) pair with them by complementary bases, the growing chain Met-Lys is transferred, and the ribosome moves one codon at a time until the stop codon UAG, giving Met-Lys-Ala-Trp-His.";
  const cap = "Figure: codon-anticodon pairing at the ribosome during elongation";
  await fig("translation-ribosome-trna", D.svg(w, h, b), alt, cap, "nucleic/translation", "6. **Termination.**");
}
