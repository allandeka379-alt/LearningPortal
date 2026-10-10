// W4a: ZIMSEC-only exam-format items: three Paper 3 Section C free-response questions (15 marks): alcohols and carbonyl
// compounds; carboxylic acids, esters and acyl chlorides; amines, azo dyes and amino acids.
import { concept, P, t, EXAM, checkExam, ZIM, Mr, moles, kEq, kaFromPKa, pOH, sfStr, dpStr, sciStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const P3 = { skill: EXAM.ZIM_P3_FREE.skill, secs: EXAM.ZIM_P3_FREE.secs, applies: EXAM.ZIM_P3_FREE.applies, examStyle: true, paper: "Paper 3 Section C" };

concept(A("carbonyl.aldehydes-ketones"), { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------- Z1: an alcohol, its ketone and nucleophilic addition
  {
    const n = moles(3.6, 72);
    const m = n * Mr("CHI3");
    b.struct({
      ...P3, d: 4, calculator: true,
      concepts: [A("hydroxy.alcohol-reactions"), A("carbonyl.aldehydes-ketones"), A("carbonyl.nucleophilic-addition")],
      stem: "Alcohol P, C₄H₁₀O, has an unbranched chain. When P is warmed with acidified potassium dichromate(VI) it forms Q, C₄H₈O. Q gives an orange precipitate with 2,4-dinitrophenylhydrazine and a pale yellow precipitate with alkaline aqueous iodine, but does not react with Fehling's solution.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.short({ label: "(a)", marks: 1, stem: "Name P.", accepted: ["butan-2-ol", "2-butanol", "butan 2 ol"], wrong: ["butan-1-ol"], explanation: "Oxidised to a methyl ketone, so P is the secondary alcohol butan-2-ol." }),
        P.short({ label: "(b)", marks: 1, stem: "Name Q.", accepted: ["butanone", "butan-2-one", "methyl ethyl ketone"], wrong: ["butanal"], explanation: "A ketone with CH₃CO–: butanone." }),
        P.manual({ label: "(c)", marks: 2, stem: "Write an equation, using [O], for the oxidation of P to Q, and state the colour change.", points: ["CH₃CH(OH)CH₂CH₃ + [O] → CH₃COCH₂CH₃ + H₂O", "Orange to green"], modelAnswer: "CH₃CH(OH)CH₂CH₃ + [O] → CH₃COCH₂CH₃ + H₂O; the dichromate(VI) turns from orange to green." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the maximum mass of tri-iodomethane, CHI₃, in g, formed from 3.60 g of Q. (Mr: Q 72, CHI₃ 393.7)", value: m, sf: 3, unit: "g", wrong: [n * Mr("CH3I")], explanation: `n(Q) = 3.60 ÷ 72 = ${sfStr(n, 3)} mol = n(CHI₃); mass = ${sfStr(n, 3)} × 393.7 = ${sfStr(m, 3)} g.` }),
        P.manual({
          label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Q reacts with hydrogen cyanide in the presence of potassium cyanide. Describe the mechanism of this reaction, explain why the product is optically inactive, and explain why butanal would react faster than Q.",
          points: [
            "C=O is polarised (C δ+, O δ−); CN⁻ (from KCN) is the nucleophile",
            "Arrow from the lone pair on C of CN⁻ to the carbonyl carbon; arrow from the C=O π bond to O",
            "Intermediate CH₃C(O⁻)(CN)CH₂CH₃ with the negative charge on O; O⁻ takes H⁺ from HCN, regenerating CN⁻",
            "Product 2-hydroxy-2-methylbutanenitrile has a chiral carbon (CH₃, C₂H₅, OH, CN)",
            "The planar C=O is attacked equally from either side, so a racemic mixture forms and the rotations cancel",
            "Butanal has only one alkyl group on the carbonyl carbon: more δ+ and less sterically hindered, so it reacts faster",
          ],
          modelAnswer: "The C=O bond in butanone is polar, with a δ+ carbon. A cyanide ion, supplied by KCN, uses the lone pair on its carbon to attack this carbon while the π electrons of C=O move onto the oxygen. This gives the intermediate CH₃C(O⁻)(CN)CH₂CH₃. The negatively charged oxygen then removes a proton from HCN, forming 2-hydroxy-2-methylbutanenitrile and regenerating the cyanide ion.\n\nThe product's central carbon carries CH₃, C₂H₅, OH and CN, so it is chiral. However, the carbonyl group is planar and the cyanide ion attacks from above and below with equal probability, giving equal amounts of the two enantiomers. This racemic mixture does not rotate plane-polarised light.\n\nButanal has only one alkyl group on its carbonyl carbon, so that carbon is more δ+ (less electron donation) and less crowded, and nucleophilic attack is faster.",
        }),
        P.manual({ label: "(f)", marks: 3, stem: "Q is reduced with sodium tetrahydridoborate. Name the product, state the type of reaction, and explain whether the product sample would rotate plane-polarised light.", points: ["Butan-2-ol (P)", "Reduction (nucleophilic addition of H⁻)", "No rotation: H⁻ attacks the planar C=O equally from both sides, giving a racemic mixture"], modelAnswer: "Butan-2-ol forms by reduction (nucleophilic addition of hydride). The hydride attacks the planar carbonyl group from both sides equally, so a racemic mixture forms and there is no overall rotation." }),
      ]),
      hints: ["Iodoform needs CH₃CO– or CH₃CH(OH)–.", "Planar carbonyl → racemate."],
      explanation: `P butan-2-ol; Q butanone; CHI₃ ${sfStr(m, 3)} g; nucleophilic addition gives a racemate; butanal reacts faster; NaBH₄ gives racemic butan-2-ol.`,
    });
  }

  // ---------------------------------------------------------------- Z2: esters, acyl chlorides and soap
  {
    const acid0 = 0.9, alc0 = 1.2, acidEq = 0.3;
    const x = acid0 - acidEq;
    const K = kEq([[1, x], [1, x]], [[1, acidEq], [1, alc0 - x]]);
    const nFat = moles(16.12, 806);
    const mNaOH = 3 * nFat * 40;
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("carboxylic.esters"), A("carboxylic.acyl-chlorides"), A("carboxylic.acids-reactions")],
      stem: "Ethyl ethanoate can be made from ethanoic acid or from ethanoyl chloride. In an experiment, 0.900 mol of ethanoic acid and 1.20 mol of ethanol were mixed with a little concentrated sulfuric acid and left to reach equilibrium; 0.300 mol of ethanoic acid remained.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate Kc for CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O, to three significant figures.", value: K, sf: 3, wrong: [x / (acidEq * (alc0 - x))], explanation: `Acid used = ${sfStr(x, 3)} mol, so ester = water = ${sfStr(x, 3)} mol, ethanol = ${sfStr(alc0 - x, 3)} mol; Kc = (${sfStr(x, 3)} × ${sfStr(x, 3)}) ÷ (0.300 × ${sfStr(alc0 - x, 3)}) = ${sfStr(K, 3)}.` }),
        P.short({ label: "(b)", marks: 1, stem: "State the role of the concentrated sulfuric acid.", accepted: ["catalyst", "it is a catalyst", "acid catalyst"], wrong: ["reactant"], explanation: "Catalyst." }),
        P.manual({ label: "(c)", marks: 2, stem: "Write an equation for making ethyl ethanoate from ethanoyl chloride and give one advantage of this method.", points: ["CH₃COCl + C₂H₅OH → CH₃COOC₂H₅ + HCl", "Faster/at room temperature and goes to completion (not an equilibrium), so higher yield"], modelAnswer: "CH₃COCl + C₂H₅OH → CH₃COOC₂H₅ + HCl; the reaction is fast at room temperature and goes to completion." }),
        P.manual({
          label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
          stem: "Describe the addition-elimination mechanism for the reaction of ethanoyl chloride with ethanol.",
          points: [
            "Carbonyl carbon is δ+ (bonded to O and Cl); ethanol O lone pair is the nucleophile",
            "Arrow from the ethanol O lone pair to the carbonyl C; arrow from the C=O π bond to O",
            "Tetrahedral intermediate with O⁻ and a positively charged –O⁺(H)C₂H₅ on the same carbon",
            "Arrow from O⁻ to reform C=O; arrow from the C–Cl bond to Cl, so Cl⁻ leaves",
            "H⁺ lost from the positive oxygen (to Cl⁻), giving the ester and HCl",
          ],
          modelAnswer: "The carbonyl carbon of ethanoyl chloride is strongly δ+ because it is bonded to oxygen and chlorine. A lone pair on the oxygen of ethanol attacks this carbon while the π electrons of C=O move onto the oxygen, giving a tetrahedral intermediate carrying O⁻ and a positively charged –O⁺(H)C₂H₅ group. The lone pair on O⁻ then moves back to reform C=O and the C–Cl bond breaks, releasing Cl⁻. Finally the chloride ion removes H⁺ from the positive oxygen, giving ethyl ethanoate and hydrogen chloride.",
        }),
        P.num({ label: "(e)", marks: 2, stem: "A fat (a triglyceride, Mr 806) is boiled with sodium hydroxide to make soap. Calculate the mass of NaOH (Mr 40) needed to saponify 16.12 g of the fat completely.", value: mNaOH, sf: 3, unit: "g", wrong: [nFat * 40], explanation: `n(fat) = 16.12 ÷ 806 = ${sfStr(nFat, 3)} mol; three ester groups, so n(NaOH) = ${sfStr(3 * nFat, 3)} mol; mass = ${sfStr(3 * nFat, 3)} × 40 = ${sfStr(mNaOH, 3)} g.` }),
        P.manual({ label: "(f)", marks: 3, stem: "Explain why heating the fat with NaOH(aq) goes to completion, whereas heating it with dilute acid does not, and name the two types of product of saponification.", points: ["Acid hydrolysis is reversible (equilibrium)", "In alkali the fatty acids are converted into carboxylate ions, which cannot re-form the ester, so hydrolysis is complete", "Products: propane-1,2,3-triol (glycerol) and sodium salts of fatty acids (soap)"], modelAnswer: "Acid hydrolysis is an equilibrium. In alkali the acids formed are converted to their carboxylate ions, which do not react with the alcohol, so the reaction goes to completion. The products are propane-1,2,3-triol and the sodium salts of the fatty acids, which are soap." }),
      ]),
      hints: ["The volume cancels in Kc for esterification.", "A triglyceride has three ester groups."],
      explanation: `Kc = ${sfStr(K, 3)}; H₂SO₄ catalyst; acyl chloride route is fast and complete; addition-elimination; NaOH ${sfStr(mNaOH, 3)} g; alkaline hydrolysis is irreversible.`,
    });
  }

  // ---------------------------------------------------------------- Z3: amines, a dyestuff and amino acids
  {
    const Kb = kaFromPKa(3.27), c = 0.04;
    const oh = Math.sqrt(Kb * c);
    const pHv = 14 - pOH(oh);
    const mDye = 0.05 * 0.8 * 0.65 * 248;
    b.struct({
      ...P3, d: 5, calculator: true,
      concepts: [A("amines.preparation-basicity"), A("amines.phenylamine-azo"), A("amines.amino-acids")],
      stem: "This question is about nitrogen compounds. Data: pKb(ethylamine) = 3.27; Kw = 1.00 × 10⁻¹⁴ mol² dm⁻⁶ at 298 K.",
      parts: checkExam(EXAM.ZIM_P3_FREE, [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the pH of 0.0400 mol dm⁻³ aqueous ethylamine, to two decimal places, assuming [OH⁻] = √(Kb c).", value: pHv, dp: 2, wrong: [dpStr(pOH(oh), 2)], explanation: `Kb = 10⁻³·²⁷ = ${sciStr(Kb, 3)}; [OH⁻] = √(${sciStr(Kb, 3)} × 0.0400) = ${sciStr(oh, 3)}; pOH = ${dpStr(pOH(oh), 2)}; pH = 14.00 − ${dpStr(pOH(oh), 2)} = ${dpStr(pHv, 2)}.` }),
        P.short({ label: "(b)", marks: 1, stem: "Name the salt formed when ethylamine reacts with hydrochloric acid.", accepted: ["ethylammonium chloride", "ethylamine hydrochloride"], wrong: ["chloroethane"], explanation: "CH₃CH₂NH₃⁺Cl⁻." }),
        P.manual({
          label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 300 },
          stem: "Describe how an azo dye can be synthesised from benzene, using phenol as the coupling agent. Give the reagents, conditions and an equation for each stage, and one safety precaution.",
          points: [
            "Nitration: conc. HNO₃ + conc. H₂SO₄ at 25-60 °C: C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O",
            "Reduction: Sn + conc. HCl, heat under reflux, then NaOH(aq): C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O",
            "Diazotisation: NaNO₂ + dilute HCl below 10 °C",
            "C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O",
            "Coupling: add to phenol in NaOH(aq), cold: C₆H₅N₂⁺ + C₆H₅OH → C₆H₅N=NC₆H₄OH + H⁺ (yellow-orange)",
            "Safety: diazonium salts are unstable/explosive when dry, so keep cold in solution; or phenylamine is toxic (gloves); or fume cupboard for concentrated acids",
          ],
          modelAnswer: "Benzene is nitrated with a mixture of concentrated nitric and sulfuric acids at 25-60 °C: C₆H₆ + HNO₃ → C₆H₅NO₂ + H₂O. Nitrobenzene is reduced by heating under reflux with tin and concentrated hydrochloric acid, and sodium hydroxide is added to free the amine: C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O. Phenylamine is dissolved in dilute hydrochloric acid, cooled below 10 °C and treated with sodium nitrite: C₆H₅NH₂ + HNO₂ + HCl → C₆H₅N₂⁺Cl⁻ + 2H₂O. The cold diazonium solution is added to phenol in sodium hydroxide, giving a yellow-orange precipitate: C₆H₅N₂⁺ + C₆H₅OH → C₆H₅N=NC₆H₄OH + H⁺. The diazonium salt must be kept cold and never allowed to dry, because it can decompose explosively.",
        }),
        P.num({ label: "(d)", marks: 2, stem: "Using 2-naphthol instead of phenol gives an orange-red dye, C₁₆H₁₂N₂O (Mr 248). Starting from 0.0500 mol of phenylamine, diazotisation proceeds with 80.0% yield and coupling with 65.0% yield. Calculate the mass of dye obtained, in g.", value: mDye, sf: 3, unit: "g", wrong: [0.05 * 248], explanation: `0.0500 × 0.800 × 0.650 = 0.0260 mol; mass = 0.0260 × 248 = ${sfStr(mDye, 3)} g.` }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the diazotisation is carried out below 10 °C.", points: ["Benzenediazonium chloride is unstable and decomposes on warming", "giving phenol and nitrogen gas (C₆H₅N₂⁺ + H₂O → C₆H₅OH + N₂ + H⁺), so the yield of dye would fall"], modelAnswer: "The diazonium salt is unstable; above about 10 °C it reacts with water to give phenol and nitrogen, so little would be left for coupling." }),
        P.manual({ label: "(f)", marks: 2, stem: "Give the structural formulae of the main form of glycine, H₂NCH₂COOH, at pH 1 and at pH 12.", points: ["pH 1: H₃N⁺CH₂COOH", "pH 12: H₂NCH₂COO⁻"], modelAnswer: "pH 1: H₃N⁺CH₂COOH; pH 12: H₂NCH₂COO⁻." }),
      ]),
      hints: ["pH = 14.00 − pOH.", "Multiply the fractional yields."],
      explanation: `pH = ${dpStr(pHv, 2)}; ethylammonium chloride; nitrate, reduce, diazotise (below 10 °C), couple in alkali; dye ${sfStr(mDye, 3)} g; glycine cation in acid and anion in alkali.`,
    });
  }
});
