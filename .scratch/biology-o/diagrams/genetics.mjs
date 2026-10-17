// biology-o: inheritance/monohybrid-inheritance (genetic diagram Rr x Rr, pedigree), flowers, mitosis/DNA/sex-linkage as added
import { D, FAMILY, LES, C, call, title, ell, place } from "./_h.mjs";

const add = async (name, svg, alt, caption, lesson, after) => {
  await D.figure(FAMILY, name, svg, { alt, caption });
  place(LES(lesson), after, D.md(name, alt, caption));
};

// ---------- 1. Genetic diagram for Rr x Rr (Example 2)
{
  let b = "";
  const cells = [["RR", "round", C.fillGreen], ["Rr", "round", C.fillGreen], ["Rr", "round", C.fillGreen], ["rr", "wrinkled", C.fillAmber]];
  const gx = 250, gy = 150, cw = 100, ch = 62;
  // parents
  b += D.node(400 - 85, 10, 170, 52, "Parent 2: round seed\ngenotype Rr", { fill: C.fillGreen, size: 14 });
  b += D.node(14, 190, 150, 52, "Parent 1: round seed\ngenotype Rr", { fill: C.fillGreen, size: 14 });
  // gamete headers
  b += D.arrow(400, 62, 400, 96, { width: 2 }) + D.text(404, 82, "gametes", { size: 12, fill: C.muted });
  b += D.arrow(164, 216, 196, 216, { width: 2 }) + D.text(100, 270, "gametes", { size: 12, fill: C.muted }).replace('x="100"', 'x="106"');
  for (const [i, g] of ["R", "r"].entries()) {
    b += D.circle(gx + cw * (i + 0.5), 122, 18, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(gx + cw * (i + 0.5), 128, g, { anchor: "middle", size: 18, weight: 700 });
    b += D.circle(224, gy + ch * (i + 0.5), 18, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(224, gy + ch * (i + 0.5) + 6, g, { anchor: "middle", size: 18, weight: 700 });
  }
  cells.forEach(([g, p, fill], i) => {
    const x = gx + cw * (i % 2), y = gy + ch * Math.floor(i / 2);
    b += D.rect(x, y, cw, ch, { fill, stroke: C.ink, width: 2 }) + D.text(x + cw / 2, y + 28, g, { anchor: "middle", size: 20, weight: 700 }) + D.text(x + cw / 2, y + 48, p, { anchor: "middle", size: 13 });
  });
  b += D.text(gx + cw, 290, "F2 offspring", { anchor: "middle", size: 13, weight: 700, fill: C.muted }).replace('y="290"', 'y="286"');
  b += D.text(20, 330, "Genotypes: 1 RR : 2 Rr : 1 rr", { size: 15, weight: 700 });
  b += D.text(20, 354, "Phenotypes: 3 round : 1 wrinkled", { size: 15, weight: 700 });
  b += D.text(20, 378, "Chance that one seed is wrinkled = 1/4 (25%)", { size: 14 });
  const alt = "Genetic diagram for two heterozygous round-seeded pea plants, Rr crossed with Rr: each parent makes R and r gametes, the Punnett square gives RR, Rr, Rr and rr, so the offspring genotypes are 1 RR to 2 Rr to 1 rr and the phenotypes are 3 round to 1 wrinkled.";
  await add("punnett-rr-cross", D.svg(560, 392, b), alt, "Figure: genetic diagram and Punnett square for Rr x Rr", "inheritance/monohybrid-inheritance", "The recessive feature skipped the F1 and reappeared in the F2.");
}

// ---------- 2. Pedigree: albinism in the Ncube family
{
  let b = "";
  const sq = (x, y, shaded) => D.rect(x - 22, y - 22, 44, 44, { fill: shaded ? C.ink : "#fff", stroke: C.ink, width: 2.4 });
  const ci = (x, y, shaded) => D.circle(x, y, 23, { fill: shaded ? C.ink : "#fff", stroke: C.ink, width: 2.4 });
  b += D.text(20, 70, "I", { size: 18, weight: 700 }) + D.text(20, 190, "II", { size: 18, weight: 700 });
  // parents
  b += sq(190, 60) + ci(330, 60) + D.line(212, 60, 307, 60, { width: 2.4 });
  b += D.text(190, 112, "Mr Ncube", { anchor: "middle", size: 13 }) + D.text(190, 130, "Aa", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  b += D.text(330, 112, "Mrs Ncube", { anchor: "middle", size: 13 }) + D.text(330, 130, "Aa", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  // children
  b += D.line(260, 60, 260, 150, { width: 2.4 }) + D.line(120, 150, 400, 150, { width: 2.4 });
  for (const x of [120, 260, 400]) b += D.line(x, 150, x, 175, { width: 2.4 });
  b += ci(120, 198) + sq(260, 198, true) + ci(400, 198);
  b += D.text(120, 246, "Thandeka", { anchor: "middle", size: 13 }) + D.text(120, 264, "AA or Aa", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  b += D.text(260, 246, "Sipho", { anchor: "middle", size: 13 }) + D.text(260, 264, "aa: has albinism", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  b += D.text(400, 246, "Nomsa", { anchor: "middle", size: 13 }) + D.text(400, 264, "AA or Aa", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  // key
  b += D.rect(20, 300, 24, 24, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(52, 318, "male", { size: 13 });
  b += D.circle(130, 312, 12, { fill: "#fff", stroke: C.ink, width: 2 }) + D.text(150, 318, "female", { size: 13 });
  b += D.rect(236, 300, 24, 24, { fill: C.ink, stroke: C.ink, width: 2 }) + D.text(268, 318, "shaded: has albinism", { size: 13 });
  const alt = "Pedigree of the Ncube family: Mr and Mrs Ncube (both Aa, no albinism) have three children, Thandeka and Nomsa without albinism and Sipho, shown shaded, who has albinism and is aa; two unaffected parents with an affected child shows the allele for albinism is recessive.";
  await add("albinism-pedigree", D.svg(520, 340, b), alt, "Figure: pedigree diagram of albinism in the Ncube family", "inheritance/monohybrid-inheritance", "People with albinism have little or no melanin");
}

// ---------- 3. Insect-pollinated flower, cut lengthways
{
  let b = "";
  const cx = 280, petal = "#f7d6e0", green = C.fillGreen;
  // pedicel and receptacle
  b += D.rect(cx - 8, 330, 16, 60, { fill: green, stroke: C.green, width: 2 });
  b += ell(cx, 318, 40, 16, { fill: "#e8e0c8", stroke: C.ink, width: 2 });
  // petals (behind) and sepals
  b += D.path_(`M${cx - 30},312 C${cx - 140},300 ${cx - 150},140 ${cx - 70},96 C${cx - 70},170 ${cx - 50},260 ${cx - 30},312 Z`, { fill: petal, stroke: C.red, width: 2 });
  b += D.path_(`M${cx + 30},312 C${cx + 140},300 ${cx + 150},140 ${cx + 70},96 C${cx + 70},170 ${cx + 50},260 ${cx + 30},312 Z`, { fill: petal, stroke: C.red, width: 2 });
  b += D.path_(`M${cx - 36},322 C${cx - 90},330 ${cx - 120},316 ${cx - 128},296 C${cx - 100},300 ${cx - 56},308 ${cx - 36},322 Z`, { fill: C.fillGreen, stroke: C.green, width: 2 });
  b += D.path_(`M${cx + 36},322 C${cx + 90},330 ${cx + 120},316 ${cx + 128},296 C${cx + 100},300 ${cx + 56},308 ${cx + 36},322 Z`, { fill: C.fillGreen, stroke: C.green, width: 2 });
  // carpel: ovary with ovules, style, stigma
  b += ell(cx, 268, 30, 38, { fill: "#fff7d6", stroke: C.ink, width: 2 });
  for (const [dx, dy] of [[-10, -14], [10, -14], [-10, 6], [10, 6], [0, 24]]) b += D.circle(cx + dx, 268 + dy, 5.5, { fill: C.fillAmber, stroke: C.amber, width: 1.6 });
  b += D.rect(cx - 4, 120, 8, 112, { fill: "#fff7d6", stroke: C.ink, width: 1.8 });
  b += ell(cx, 114, 14, 8, { fill: C.fillGreen, stroke: C.green, width: 2 });
  // stamens: filament + anther
  for (const s of [-1, 1]) {
    b += D.line(cx + s * 46, 304, cx + s * 52, 170, { stroke: C.ink, width: 2.4 });
    b += ell(cx + s * 52, 156, 11, 20, { fill: "#f6e27a", stroke: C.amber, width: 2 });
  }
  // nectary at the base of the petals
  b += ell(cx + 22, 300, 8, 5, { fill: C.fillAmber, stroke: C.amber, width: 1.6 });
  // labels left
  b += call(100, 120, "Petal", cx - 100, 150, { anchor: "end" });
  b += call(120, 170, "Anther", cx - 62, 160, { anchor: "end" });
  b += call(120, 230, "Filament", cx - 50, 230, { anchor: "end" });
  b += call(110, 308, "Sepal", cx - 110, 305, { anchor: "end" });
  b += call(180, 370, "Receptacle", cx - 36, 320, { anchor: "end", fromY: 366 });
  // labels right
  b += call(450, 86, "Stigma (receives pollen)", cx + 10, 110, { fromY: 82 });
  b += call(450, 150, "Style", cx + 4, 150, { fromY: 146 });
  b += call(450, 218, "Ovary", cx + 30, 252, { fromY: 214 });
  b += call(450, 272, "Ovule (inside the ovary)", cx + 10, 262, { fromY: 268 });
  b += call(450, 332, "Nectary (makes nectar)", cx + 28, 301, { fromY: 328 });
  b += call(450, 380, "Pedicel (flower stalk)", cx + 8, 372, { fromY: 376 });
  const alt = "An insect-pollinated flower cut lengthways: sepals and large petals surround the stamens, each with an anther on a filament, and the carpel, which has a sticky stigma, a style and an ovary containing ovules; a nectary at the base of the petals makes nectar, and the flower sits on the receptacle at the top of the pedicel.";
  await add("flower-structure", D.svg(640, 400, b), alt, "Figure: an insect-pollinated flower cut lengthways, with its parts labelled", "reproduction/flowers-and-pollination", "The flower is held on a stalk");
}
