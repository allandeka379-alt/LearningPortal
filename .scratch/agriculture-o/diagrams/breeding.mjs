// agriculture-o breeding diagrams: genetic diagrams. Run: node .scratch/agriculture-o/diagrams/breeding.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);

const geno = (a, b) => (a === b ? a + b : "Pp");
const pheno = (g) => (g.includes("P") ? "polled" : "horned");

function panel(x0, title, parentA, parentB, gA, gB) {
  let o = D.text(x0 + 140, 20, title, { size: 14, weight: 700, anchor: "middle" });
  const rows = (y, label, a, b2) => D.text(x0, y, label, { size: 12, fill: C.muted }) + D.text(x0 + 140, y, a, { size: 14, anchor: "middle" }) + D.text(x0 + 215, y, "x", { size: 14, anchor: "middle" }) + D.text(x0 + 275, y, b2, { size: 14, anchor: "middle" });
  o += D.text(x0 + 100, 44, "Parents", { size: 12, fill: C.muted, anchor: "middle" });
  o += D.text(x0 + 90, 64, `${pheno(parentA)}  ${parentA}`, { size: 14, anchor: "middle", weight: 700 }) + D.text(x0 + 150, 64, "x", { size: 14, anchor: "middle" }) + D.text(x0 + 215, 64, `${pheno(parentB)}  ${parentB}`, { size: 14, anchor: "middle", weight: 700 });
  o += D.text(x0 - 4, 96, "Gametes", { size: 12, fill: C.muted });
  gA.forEach((g, i) => { o += D.circle(x0 + 76 + i * 34, 90, 13, { fill: "#fff", stroke: C.blue, width: 1.6 }) + D.text(x0 + 76 + i * 34, 95, g, { size: 14, anchor: "middle" }); });
  gB.forEach((g, i) => { o += D.circle(x0 + 200 + i * 34, 90, 13, { fill: "#fff", stroke: C.amber, width: 1.6 }) + D.text(x0 + 200 + i * 34, 95, g, { size: 14, anchor: "middle" }); });
  const gx = x0 + 70, top = 136, cw = 80, ch = 50;
  gA.forEach((g, i) => { o += D.text(gx + cw + i * cw + cw / 2, top - 8, g, { size: 15, anchor: "middle", weight: 700, fill: C.blue }); });
  gB.forEach((g, j) => { o += D.text(gx + cw / 2 + 10, top + j * ch + 30, g, { size: 15, anchor: "middle", weight: 700, fill: C.amber }); });
  const counts = {};
  gB.forEach((gb, j) => gA.forEach((ga, i) => {
    const g = geno(ga, gb);
    counts[g] = (counts[g] ?? 0) + 1;
    o += D.rect(gx + cw + i * cw, top + j * ch, cw, ch, { fill: pheno(g) === "polled" ? C.fillBlue : C.fillAmber, stroke: C.axis, width: 1.4 });
    o += D.text(gx + cw + i * cw + cw / 2, top + j * ch + 22, g, { size: 15, anchor: "middle", weight: 700 }) + D.text(gx + cw + i * cw + cw / 2, top + j * ch + 40, pheno(g), { size: 12, anchor: "middle" });
  }));
  const ph = {};
  for (const [g, n] of Object.entries(counts)) ph[pheno(g)] = (ph[pheno(g)] ?? 0) + n;
  return { svg: o, counts, ph };
}

{
  const a = panel(10, "F1 x F1 cross (3:1)", "Pp", "Pp", ["P", "p"], ["P", "p"]);
  const t = panel(320, "Test cross (1:1)", "Pp", "pp", ["P", "p"], ["p", "p"]);
  if (a.ph.polled !== 3 || a.ph.horned !== 1 || t.ph.polled !== 2 || t.ph.horned !== 2) throw new Error("ratios");
  const W = 640, H = 320;
  let b = a.svg + t.svg;
  b += D.text(10, 262, `Genotypes 1 PP : 2 Pp : 1 pp 
= ${a.ph.polled} polled : ${a.ph.horned} horned (3:1)`, { size: 13, weight: 700 });
  b += D.text(320, 262, `2 Pp : 2 pp
= ${t.ph.polled} polled : ${t.ph.horned} horned (1:1)`, { size: 13, weight: 700 });
  b += D.text(10, 296, "Key: P = polled (dominant), p = horned (recessive). Blue cells are polled, amber cells horned.", { size: 12, fill: C.muted });
  const alt = "Two genetic diagrams for polled (P) and horned (p) cattle: Pp crossed with Pp gives PP, Pp, Pp and pp, a 3 polled to 1 horned ratio; a test cross of Pp with pp gives two Pp and two pp, a 1 polled to 1 horned ratio.";
  const cap = "Figure: Punnett squares for the F1 x F1 cross (3:1) and the test cross (1:1) in polled and horned cattle";
  await D.figure(FAMILY, "polled-horned-punnett-squares", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/breeding/monohybrid.md`, "This is the basis of the **test cross**", D.md("polled-horned-punnett-squares", alt, cap));
}
console.log("breeding done");
