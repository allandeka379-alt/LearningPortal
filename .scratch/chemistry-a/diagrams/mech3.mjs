// chemistry-a: more mechanisms (carbonyl, halogenoalkane). Run: node .scratch/chemistry-a/diagrams/mech3.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, curly, grp, bond, dbl, lp, rxn, note, fig } from "./_m.mjs";

// ---- ethanal + HCN (KCN catalyst)
{
  let s = note(30, 16, "Step 1: cyanide ion attacks the δ+ carbon; C=O pi electrons move to O", { fill: C.ink, weight: 700 });
  // reactants: ethanal, carbon at (170,150)
  const a = [170, 120];
  s += grp(a[0], a[1], "C") + dbl(a[0], a[1] - 14, a[0], a[1] - 44) + grp(a[0], a[1] - 58, "O") + grp(a[0] + 28, a[1] - 62, "δ−", null, { size: 13 }) + D.text(a[0] + 14, a[1] + 2, "δ+", { size: 13 });
  s += bond(a[0] + 8, a[1] + 12, a[0] + 42, a[1] + 38) + grp(a[0] + 62, a[1] + 48, "CH₃") + bond(a[0] - 8, a[1] + 12, a[0] - 42, a[1] + 38) + grp(a[0] - 52, a[1] + 48, "H");
  s += grp(52, 100, "N≡C", "−") + lp(70, 100, "right", 3);
  s += curly(80, 98, 120, 98, a[0] - 12, a[1] - 4);
  s += curly(a[0] + 4, a[1] - 30, a[0] + 22, a[1] - 40, a[0] + 8, a[1] - 52);
  s += rxn(280, 110, 335);
  // intermediate, carbon at (470,150)
  const b = [470, 120];
  s += grp(...b, "C") + bond(b[0], b[1] - 12, b[0], b[1] - 36) + grp(b[0], b[1] - 50, "O", "−") + bond(b[0] - 12, b[1], b[0] - 36, b[1]) + grp(b[0] - 62, b[1], "N≡C") + bond(b[0] + 12, b[1], b[0] + 36, b[1]) + grp(b[0] + 58, b[1], "CH₃") + bond(b[0], b[1] + 12, b[0], b[1] + 36) + grp(b[0], b[1] + 50, "H");
  s += note(b[0] - 70, b[1] + 84, "alkoxide intermediate", { fill: C.ink });
  // step 2
  s += note(30, 232, "Step 2: O⁻ takes H⁺ from H–CN, regenerating CN⁻ (the catalyst)", { fill: C.ink, weight: 700 });
  const c = [120, 330];
  s += grp(...c, "C") + bond(c[0], c[1] - 12, c[0], c[1] - 36) + grp(c[0], c[1] - 50, "O", "−") + lp(c[0], c[1] - 50, "right", 14) + bond(c[0] - 12, c[1], c[0] - 36, c[1]) + grp(c[0] - 62, c[1], "N≡C") + bond(c[0] + 12, c[1], c[0] + 36, c[1]) + grp(c[0] + 58, c[1], "CH₃") + bond(c[0], c[1] + 12, c[0], c[1] + 36) + grp(c[0], c[1] + 50, "H");
  s += grp(262, 280, "H") + bond(272, 280, 292, 280) + grp(312, 280, "C≡N");
  s += curly(c[0] + 22, c[1] - 56, 190, 262, 254, 276);
  s += curly(282, 274, 300, 256, 316, 270);
  s += rxn(370, c[1], 410);
  const d = [540, 330];
  s += grp(...d, "C") + bond(d[0], d[1] - 12, d[0], d[1] - 36) + grp(d[0], d[1] - 50, "OH") + bond(d[0] - 12, d[1], d[0] - 36, d[1]) + grp(d[0] - 62, d[1], "N≡C") + bond(d[0] + 12, d[1], d[0] + 36, d[1]) + grp(d[0] + 58, d[1], "CH₃") + bond(d[0], d[1] + 12, d[0], d[1] + 36) + grp(d[0], d[1] + 50, "H");
  s += grp(664, 330, "+ CN", "−", { size: 16 }) + note(d[0] - 80, d[1] + 86, "2-hydroxypropanenitrile", { fill: C.ink });
  const alt = "Nucleophilic addition of HCN to ethanal: the carbon lone pair of CN minus attacks the delta-plus carbonyl carbon while the C=O pi bond moves onto oxygen, giving an alkoxide intermediate CH3CH(O minus)CN; the O minus then takes the H of H-CN, giving 2-hydroxypropanenitrile and regenerating CN minus.";
  const cap = "Figure: nucleophilic addition of HCN to ethanal, in two steps, with cyanide as the catalyst";
  await fig("hcn-ethanal-mechanism", 720, 440, s, alt, cap, "carbonyl/nucleophilic-addition", "## The mechanism, step by step");
}

// ---- bromoethane: SN2 (aqueous NaOH) and E2 (ethanolic NaOH)
{
  let s = note(30, 18, "Substitution (NaOH in water, heat): hydroxide acts as a nucleophile", { fill: C.ink, weight: 700 });
  const y = 110;
  s += grp(52, y, "HO⁻") + lp(76, y, "right", 4);
  s += grp(150, y, "CH₃") + bond(168, y, 192, y) + grp(212, y, "CH₂") + bond(232, y, 258, y) + grp(278, y, "Br");
  s += D.text(212, y - 22, "δ+", { anchor: "middle", size: 13 }) + D.text(296, y - 14, "δ−", { size: 13 });
  s += curly(80, y - 4, 130, y - 52, 204, y - 14) + curly(246, y - 6, 262, y - 34, 276, y - 18);
  s += rxn(325, y, 375) + grp(470, y, "CH₃CH₂OH  +  Br⁻");
  s += note(30, 168, "one step: the nucleophile arrives as the bromide ion leaves (SN2)", { size: 13 });
  s += note(30, 214, "Elimination (NaOH in ethanol, heat): hydroxide acts as a base", { fill: C.ink, weight: 700 });
  const y2 = 300;
  s += grp(46, 262, "HO⁻") + lp(70, 262, "right", 4);
  s += grp(124, 262, "H") + bond(124, 272, 130, y2 - 16) + grp(130, y2, "CH₂") + bond(150, y2, 174, y2) + grp(194, y2, "CH₂") + bond(214, y2, 240, y2) + grp(260, y2, "Br");
  s += curly(82, 260, 96, 252, 110, 260) + curly(126, 274, 148, 270, 160, y2 - 6) + curly(224, y2 - 6, 242, y2 - 34, 258, y2 - 18);
  s += rxn(325, y2, 375) + grp(480, y2, "H₂C=CH₂  +  H₂O  +  Br⁻");
  s += note(30, 352, "the base removes H from the carbon next to C–Br; C=C forms as Br⁻ leaves", { size: 13 });
  const alt = "Bromoethane with hydroxide: in aqueous NaOH, OH minus uses a lone pair to attack the delta-plus carbon while the C-Br bond breaks, giving ethanol and Br minus (substitution); in ethanolic NaOH, OH minus removes an H from the neighbouring carbon, the C-H electrons form C=C and Br minus leaves, giving ethene, water and Br minus (elimination).";
  const cap = "Figure: substitution and elimination of bromoethane with hydroxide, drawn with curly arrows";
  await fig("bromoethane-substitution-elimination", 620, 372, s, alt, cap, "halogen/halogenoalkane-reactions", "## Nucleophilic substitution and elimination");
}
