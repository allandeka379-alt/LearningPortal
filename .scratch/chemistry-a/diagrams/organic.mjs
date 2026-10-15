// chemistry-a organic and transition: isomerism, enantiomers, complex shapes. Run: node .scratch/chemistry-a/diagrams/organic.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, atom, wedge, hash, pol, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

// ---- cis / trans but-2-ene
{
  const w = 600, h = 280;
  const mol = (cx, cy, tl, tr) => {
    // C1 at (cx-32,cy), C2 at (cx+32,cy); substituents at 120 / 240 deg from C1 (left side) and 60 / 300 from C2
    const c1 = [cx - 32, cy], c2 = [cx + 32, cy];
    const s = (c, ang, label) => { const [x, y] = pol(c[0], c[1], 54, ang); return D.line(c[0], c[1], x, y) + D.text(x, y + (ang < 180 && ang > 0 ? -10 : 22), label, { anchor: "middle", size: 15, weight: 700 }); };
    return D.line(c1[0], c1[1] - 3, c2[0], c2[1] - 3) + D.line(c1[0], c1[1] + 3, c2[0], c2[1] + 3) + D.text(c1[0] - 4, cy + 5, "C", { anchor: "end", size: 13, fill: C.muted }).replace(/<text/, "<text opacity='0'") +
      s(c1, 120, tl[0]) + s(c1, 240, tl[1]) + s(c2, 60, tr[0]) + s(c2, 300, tr[1]);
  };
  const body =
    D.text(150, 30, "cis-but-2-ene", { anchor: "middle", size: 16, weight: 700 }) + mol(150, 135, ["CH₃", "H"], ["CH₃", "H"]) + D.text(150, 240, "both CH₃ on the same side", { anchor: "middle", size: 14, fill: C.blue }) +
    D.text(450, 30, "trans-but-2-ene", { anchor: "middle", size: 16, weight: 700 }) + mol(450, 135, ["CH₃", "H"], ["H", "CH₃"]) + D.text(450, 240, "CH₃ groups on opposite sides", { anchor: "middle", size: 14, fill: C.amber }) +
    D.line(300, 40, 300, 260, { stroke: C.grid, width: 1.5 });
  const alt = "Cis and trans but-2-ene: in the cis isomer the two CH3 groups are on the same side of the C=C double bond (and the two H atoms on the other side); in the trans isomer the CH3 groups are on opposite sides. There is no rotation about the double bond, so they are different molecules.";
  const cap = "Figure: cis and trans isomers of but-2-ene; the double bond cannot rotate";
  await D.figure(F, "cis-trans-but-2-ene", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("organic/isomerism"), "In the **cis** isomer the two similar groups", D.md("cis-trans-but-2-ene", alt, cap));
}

// ---- enantiomers of lactic acid (2-hydroxypropanoic acid)
{
  const w = 600, h = 330;
  const grp = (cx, cy, a, len, label, kind, side) => {
    const [x, y] = pol(cx, cy, len, a), [sx, sy] = pol(cx, cy, 4, a), [ex, ey] = pol(cx, cy, len - 16, a);
    const b = kind === "wedge" ? wedge(sx, sy, ex, ey, 8) : kind === "hash" ? hash(sx, sy, ex, ey, 8) : D.line(sx, sy, ex, ey);
    return b + D.text(x, y + 5, label, { anchor: side, size: 16, weight: 700 });
  };
  const mol = (cx, mirror) => {
    const cy = 170, m = (a) => (mirror ? 180 - a : a);
    const side = (a) => { const x = Math.cos((m(a) * Math.PI) / 180); return x > 0.3 ? "start" : x < -0.3 ? "end" : "middle"; };
    return D.text(cx + 1, cy + 5, "C*", { anchor: "middle", size: 16, weight: 700 }).replace('weight="700"', 'weight="700" opacity="0"') +
      grp(cx, cy, 90, 66, "COOH", "plain", "middle") + grp(cx, cy, m(210), 66, "CH₃", "plain", side(210)) +
      grp(cx, cy, m(325), 70, "OH", "wedge", side(325)) + grp(cx, cy, m(30), 66, "H", "hash", side(30));
  };
  const body =
    D.text(150, 28, "enantiomer 1", { anchor: "middle", size: 16, weight: 700 }) + mol(150, false) +
    D.text(450, 28, "enantiomer 2", { anchor: "middle", size: 16, weight: 700 }) + mol(450, true) +
    D.line(300, 44, 300, 290, { stroke: C.red, width: 1.8, dash: true }) + D.text(300, 312, "mirror plane", { anchor: "middle", size: 14, fill: C.red }) +
    D.text(150, 312, "wedge: towards you; hash: away", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "The two enantiomers of lactic acid, CH3CH(OH)COOH: each has a central chiral carbon bonded to COOH, CH3, OH and H; the two molecules are mirror images across a dashed mirror plane, with OH on a wedge and H on a hashed bond, and cannot be superimposed.";
  const cap = "Figure: a chiral carbon with four different groups gives two non-superimposable mirror images";
  await D.figure(F, "enantiomers-lactic-acid", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("organic/optical-isomerism-drugs"), "A carbon atom with four **different** groups", D.md("enantiomers-lactic-acid", alt, cap));
}

// ---- shapes of complex ions
{
  const w = 600, h = 560, pw = 300, ph = 280;
  const lig = (x, y, s) => atom(x, y, s, { r: 20, size: 13, fill: C.fillBlue });
  const metal = (x, y, s) => atom(x, y, s, { r: 18, size: 14, fill: C.fillAmber });
  const bond = (cx, cy, a, len, label, kind = "plain") => {
    const [x, y] = pol(cx, cy, len, a), [sx, sy] = pol(cx, cy, 18, a), [ex, ey] = pol(cx, cy, len - 20, a);
    const b = kind === "wedge" ? wedge(sx, sy, ex, ey, 8) : kind === "hash" ? hash(sx, sy, ex, ey, 8) : D.line(sx, sy, ex, ey);
    return b + lig(x, y, label);
  };
  const panel = (i, title, sub, build) => {
    const cx = (i % 2) * pw + pw / 2, cy = Math.floor(i / 2) * ph + 140;
    return D.text(cx, Math.floor(i / 2) * ph + 26, title, { anchor: "middle", size: 15, weight: 700 }) + build(cx, cy) + D.text(cx, cy + 118, sub, { anchor: "middle", size: 13, fill: C.muted });
  };
  const body =
    panel(0, "[Ag(NH₃)₂]⁺: linear", "coordination number 2; 180°", (cx, cy) => bond(cx, cy, 0, 80, "NH₃") + bond(cx, cy, 180, 80, "NH₃") + metal(cx, cy, "Ag")) +
    panel(1, "[CuCl₄]²⁻: tetrahedral", "coordination number 4; 109.5°", (cx, cy) => bond(cx, cy, 90, 70, "Cl") + bond(cx, cy, 235, 70, "Cl") + bond(cx, cy, 325, 70, "Cl", "wedge") + bond(cx, cy, 160, 70, "Cl", "hash") + metal(cx, cy, "Cu")) +
    panel(2, "cisplatin: square planar", "coordination number 4; 90°", (cx, cy) => bond(cx, cy, 0, 72, "NH₃") + bond(cx, cy, 90, 72, "NH₃") + bond(cx, cy, 180, 72, "Cl") + bond(cx, cy, 270, 72, "Cl") + metal(cx, cy, "Pt")) +
    panel(3, "[Cu(H₂O)₆]²⁺: octahedral", "coordination number 6; 90°", (cx, cy) => bond(cx, cy, 90, 74, "H₂O") + bond(cx, cy, 270, 74, "H₂O") + bond(cx, cy, 0, 84, "H₂O") + bond(cx, cy, 180, 84, "H₂O") + bond(cx, cy, 320, 66, "H₂O", "wedge") + bond(cx, cy, 140, 66, "H₂O", "hash") + metal(cx, cy, "Cu"));
  const alt = "Shapes of four complex ions: [Ag(NH3)2]+ is linear with 180 degrees between the two ligands; [CuCl4]2- is tetrahedral at 109.5 degrees; cisplatin [Pt(NH3)2Cl2] is square planar with 90 degrees, the two NH3 next to each other; [Cu(H2O)6]2+ is octahedral with 90 degrees between neighbouring water ligands.";
  const cap = "Figure: linear, tetrahedral, square planar and octahedral complexes";
  await D.figure(F, "complex-ion-shapes", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("transition/complexes-ligands"), "| 6 | octahedral |", D.md("complex-ion-shapes", alt, cap));
}
