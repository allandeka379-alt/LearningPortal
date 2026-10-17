// Run from repo root: node .scratch/chemistry-o/diagrams/polymers2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";
import { atom, bond, twoCarbon, repeatBrackets } from "./_disp.mjs";

// ---- addition polymerisation of ethene
{
  const w = 600, h = 250;
  const y = 100;
  let b = T(24, y + 6, "n", { size: 18, weight: 700 });
  b += twoCarbon(60, y, ["H", "H", "H", "H"], 2);
  b += D.arrow(150, y, 250, y, { width: 2.4 });
  b += T(200, y - 34, "heat, pressure,\ncatalyst", { anchor: "middle", size: 13 });
  b += twoCarbon(330, y, ["H", "H", "H", "H"], 1);
  b += repeatBrackets(330, y);
  b += T(105, 196, "n ethene molecules\n(each has C=C)", { anchor: "middle", size: 13 });
  b += T(380, 206, "poly(ethene): the C=C has become C–C;\nthe polymer is the only product", { anchor: "middle", size: 13 });
  await put("addition-polymer-ethene-poly-ethene", w, h, b,
    "Addition polymerisation: n ethene molecules, each with a C=C double bond, join under heat, pressure and a catalyst to form poly(ethene); in the repeat unit the double bond has become a single bond, and the polymer is the only product.",
    "Figure: n ethene molecules form poly(ethene); the repeat unit is in brackets",
    "organic/addition-polymers", "## Making poly(ethene)");
}

// ---- repeat units of propene, chloroethene, tetrafluoroethene
{
  const w = 600, h = 505;
  const rows = [
    ["propene", "poly(propene)", ["H", "H", "H", "CH₃"], "the CH₃ is a branch on the chain"],
    ["chloroethene", "poly(chloroethene)\n(PVC)", ["H", "H", "H", "Cl"], ""],
    ["tetrafluoroethene", "poly(tetrafluoroethene)\n(PTFE)", ["F", "F", "F", "F"], ""],
  ];
  let b = "";
  rows.forEach(([mon, pol, g, note], i) => {
    const y = 80 + i * 160;
    b += T(14, y + 6, "n", { size: 18, weight: 700 });
    b += twoCarbon(46, y, g, 2);
    b += D.arrow(130, y, 200, y, { width: 2.4 });
    b += twoCarbon(270, y, g, 1);
    b += repeatBrackets(270, y);
    b += T(46 + 23, y + 84, mon, { anchor: "middle", size: 13, weight: 700 });
    b += T(385, y - 8, pol, { size: 13, weight: 700 });
    if (note) b += T(385, y + 36, "the CH₃ is a\nbranch on the chain", { size: 12, fill: C.muted });
  });
  await put("addition-polymers-repeat-units", w, h, b,
    "Monomers and repeat units: propene gives poly(propene) with a CH3 branch, chloroethene gives PVC with a Cl on every second carbon, and tetrafluoroethene gives PTFE with four F atoms on each repeat unit; in each the C=C becomes C-C.",
    "Figure: each C=C monomer opens to give a two-carbon repeat unit",
    "organic/addition-polymers", "Notice that the");
}

// ---- condensation polymers as block diagrams
{
  const w = 600, h = 360;
  const row = (y, title, link1, link2, kind, fill, end) => {
    let b = T(20, y - 44, title, { size: 15, weight: 700 });
    const items = [["end", "–CO"], ["blk", "A"], ["lnk", link1], ["blk", "B"], ["lnk", link2], ["blk", "A"], ["lnk", link1], ["blk", "B"], ["end", end]];
    let x = 20;
    for (const [k, s] of items) {
      const ww = k === "blk" ? 44 : k === "lnk" ? s.length * 9 + 18 : 44;
      if (k === "blk") b += D.rect(x, y - 20, ww, 40, { fill: s === "A" ? C.fillBlue : C.fillAmber, stroke: C.axis, r: 4 }) + T(x + ww / 2, y + 6, "[" + s + "]", { anchor: "middle", size: 15, weight: 700 });
      else if (k === "lnk") b += D.rect(x, y - 20, ww, 40, { fill, stroke: C.axis, r: 20 }) + T(x + ww / 2, y + 6, s, { anchor: "middle", size: 14, weight: 700 });
      else b += T(x + ww / 2, y + 6, s, { anchor: "middle", size: 15, weight: 700 });
      x += ww + 9;
    }
    b += T(20, y + 46, kind, { size: 13, fill: C.muted });
    return b;
  };
  let b = row(70, "Nylon, a polyamide: acid [A] + diamine [B]", "CONH", "NHCO", "Every highlighted link is an amide link; one water molecule is lost for each link.", C.fillAmber, "NH–");
  b += row(210, "PET (Terylene), a polyester: acid [A] + diol [B]", "COO", "OCO", "Every highlighted link is an ester link; one water molecule is lost for each link.", C.fillGreen, "O–");
  b += T(20, 300, "Monomers: HOOC–[A]–COOH with H₂N–[B]–NH₂ (nylon) or HO–[B]–OH (PET).", { size: 13 });
  b += T(20, 322, "A block is the part of the monomer between the two reactive groups.", { size: 13, fill: C.muted });
  await put("condensation-polymers-block-diagrams", w, h, b,
    "Block diagrams of two condensation polymers: nylon has amide links (CONH) between the acid block A and the diamine block B, PET has ester links (COO) between the acid block A and the diol block B; one water molecule is lost at every link.",
    "Figure: block diagrams of nylon (amide links) and PET (ester links)",
    "organic/condensation-polymers", "## Nylon, a polyamide");
}
