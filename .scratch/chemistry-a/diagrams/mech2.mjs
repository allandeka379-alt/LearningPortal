// chemistry-a: curly-arrow mechanisms. Run: node .scratch/chemistry-a/diagrams/mech2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curly, grp, bond, dbl, lp, rxn, note, fig, ring, cation } from "./_m.mjs";

// ---- HBr + propene
{
  const y = 120, b = [];
  // step 1 reactants
  let s = grp(40, y, "CH₃") + bond(58, y, 82, y) + grp(100, y, "CH") + dbl(118, y, 142, y) + grp(160, y, "CH₂");
  s += grp(215, 52, "H") + bond(226, 52, 250, 52) + grp(268, 52, "Br");
  s += curly(130, y - 7, 140, 56, 205, 54);
  s += curly(238, 46, 252, 24, 266, 36);
  s += rxn(300, y, 350, "slow");
  s += grp(395, y, "CH₃") + bond(413, y, 437, y) + grp(455, y, "CH", "+") + bond(481, y, 497, y) + grp(515, y, "CH₃");
  s += grp(545, 52, "Br", "−") + lp(545, 52, "up", 19) + lp(545, 52, "right", 19) + lp(545, 52, "left", 19) + lp(545, 52, "down", 19);
  s += note(30, 16, "Step 1: the C=C attacks H–Br; H–Br breaks heterolytically", { fill: C.ink, weight: 700 });
  s += note(395, 168, "secondary carbocation", { fill: C.ink });
  // step 2
  const y2 = 290;
  s += note(30, 204, "Step 2: bromide ion attacks the carbocation", { fill: C.ink, weight: 700 });
  s += grp(60, y2, "CH₃") + bond(78, y2, 102, y2) + grp(120, y2, "CH", "+") + bond(146, y2, 162, y2) + grp(180, y2, "CH₃");
  s += grp(120, 244, "Br", "−") + lp(120, 244, "left", 19) + lp(120, 244, "right", 19) + lp(120, 244, "up", 19);
  s += curly(120, 256, 108, 268, 120, 278);
  s += rxn(235, y2, 285, "fast");
  s += grp(330, y2, "CH₃") + bond(348, y2, 372, y2) + grp(390, y2, "CH") + bond(408, y2, 432, y2) + grp(450, y2, "CH₃");
  s += bond(390, y2 - 16, 390, y2 - 38) + grp(390, y2 - 50, "Br");
  s += note(300, 322, "2-bromopropane (the major product)", { fill: C.ink });
  s += note(30, 352, "H adds to the CH₂ carbon, so the positive charge sits on the middle carbon.", { size: 13 });
  const alt = "Electrophilic addition of HBr to propene in two steps: the C=C pi electrons attack the H of H-Br, which breaks to give Br minus, leaving a secondary carbocation CH3-CH+-CH3; the bromide ion then donates a lone pair to the positive carbon, giving 2-bromopropane as the major product.";
  const cap = "Figure: electrophilic addition of HBr to propene, with curly arrows and the secondary carbocation intermediate";
  await fig("electrophilic-addition-hbr-propene", 590, 368, s, alt, cap, "hydrocarbons/electrophilic-addition", "## Hydrogen bromide and propene");
}

// ---- nitration of benzene
{
  const [r1x, r1y] = [80, 130];
  let s = note(30, 16, "Step 1: the ring's pi electrons attack the electrophile NO₂⁺", { fill: C.ink, weight: 700 });
  s += ring(r1x, r1y) + grp(205, 56, "NO₂", "+") + curly(r1x + 20, r1y - 17, 130, 66, 182, 56);
  s += rxn(250, r1y, 300, "slow");
  const c = [400, 130];
  s += cation(...c) + bond(c[0], c[1] - 45, c[0] - 20, c[1] - 59) + grp(c[0] - 28, c[1] - 62, "H") + bond(c[0], c[1] - 45, c[0] + 20, c[1] - 59) + grp(c[0] + 38, c[1] - 62, "NO₂");
  s += note(c[0] + 62, c[1] + 4, "intermediate:\n+ spread over the\nother five carbons", { size: 13 });
  s += note(30, 214, "Step 2: H⁺ is lost and the ring is restored", { fill: C.ink, weight: 700 });
  const d = [130, 320];
  s += cation(...d) + bond(d[0], d[1] - 45, d[0] - 20, d[1] - 59) + grp(d[0] - 28, d[1] - 62, "H") + bond(d[0], d[1] - 45, d[0] + 20, d[1] - 59) + grp(d[0] + 38, d[1] - 62, "NO₂");
  s += grp(34, 252, "HSO₄", "−", { size: 16 }) + curly(66, 250, 80, 244, 92, 246);
  s += curly(d[0] - 12, d[1] - 50, d[0] - 34, d[1] - 40, d[0] - 22, d[1] - 30);
  s += rxn(235, d[1], 285, "fast");
  const e = [390, 320];
  s += ring(...e) + bond(e[0], e[1] - 45, e[0], e[1] - 64) + grp(e[0], e[1] - 74, "NO₂") + note(e[0] - 50, e[1] + 72, "nitrobenzene", { fill: C.ink });
  s += grp(500, 320, "+  H₂SO₄", null, { size: 16 });
  const alt = "Nitration of benzene in two steps: a curly arrow from the delocalised ring to the N of NO2 plus gives an intermediate with H and NO2 on one carbon and the positive charge delocalised over the other five; a curly arrow from the C-H bond restores the ring, releasing H plus (which regenerates H2SO4) and giving nitrobenzene.";
  const cap = "Figure: electrophilic substitution of benzene by NO₂⁺, showing the intermediate and the restored ring";
  await fig("nitration-benzene-mechanism", 590, 410, s, alt, cap, "hydrocarbons/electrophilic-substitution", "## Step 2 and 3: the mechanism");
}
