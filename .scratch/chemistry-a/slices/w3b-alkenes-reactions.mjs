// W3b: achem.hydrocarbons.alkenes-reactions (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, VM_RTP, sfStr } from "../lib.mjs";

concept("achem.hydrocarbons.alkenes-reactions", { file: "hydrocarbons/alkenes-reactions", keyPrefix: "hydrocarbons.alkenes-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagent and conditions convert 1-bromopropane into propene?",
    options: [
      ["sodium hydroxide in ethanol, heat under reflux", "Correct: ethanolic hydroxide causes elimination of HBr."],
      ["aqueous sodium hydroxide, heat under reflux", "Aqueous hydroxide mainly substitutes, giving propan-1-ol."],
      ["hydrogen with a nickel catalyst, heat", "Hydrogen adds to alkenes; it does not remove HBr."],
      ["ultraviolet light and bromine at room temperature", "These are conditions for free-radical substitution of alkanes."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CH₂Br + NaOH (ethanol) → CH₃CH=CH₂ + NaBr + H₂O.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which observation shows that a hydrocarbon contains a C=C bond?",
    options: [
      ["Bromine water changes from orange to colourless.", "Correct: bromine adds across the double bond."],
      ["Limewater turns milky when the compound is added.", "Limewater tests for carbon dioxide, not C=C."],
      ["Acidified potassium dichromate(VI) turns from orange to green.", "Dichromate oxidises alcohols and aldehydes; it is not the C=C test."],
      ["Aqueous silver nitrate gives a cream precipitate.", "That indicates bromide ions."],
    ],
    answer: "A",
    explanation: "Rapid decolorisation of bromine water at room temperature indicates C=C.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which catalyst is used in the industrial hydration of ethene with steam?",
    options: [
      ["phosphoric acid", "Correct: H₃PO₄ on a solid support, about 300 °C and 60-70 atm."],
      ["nickel", "Nickel catalyses hydrogenation."],
      ["iron", "Iron is the catalyst in the Haber process."],
      ["aluminium oxide", "Al₂O₃ is used to dehydrate ethanol to ethene, the reverse process."],
    ],
    answer: "A",
    explanation: "CH₂=CH₂ + H₂O(g) → CH₃CH₂OH with an H₃PO₄ catalyst.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What is the organic product when propene is shaken with cold, dilute, acidified potassium manganate(VII)?",
    options: [
      [t`$\ce{CH3CH(OH)CH2OH}$`, "Correct: propane-1,2-diol; an OH adds to each carbon of the C=C."],
      [t`$\ce{CH3COOH}$ and $\ce{CO2}$`, "These form only with hot, concentrated manganate(VII)."],
      [t`$\ce{CH3CH(OH)CH3}$`, "Propan-2-ol is made with steam and an H₃PO₄ catalyst."],
      [t`$\ce{CH3COCH3}$`, "Propanone does not form from propene with cold manganate(VII)."],
    ],
    answer: "A",
    explanation: "Cold dilute KMnO₄ gives a diol; purple to colourless.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "But-2-ene is heated with concentrated, acidified potassium manganate(VII). What is the organic product?",
    options: [
      ["ethanoic acid only", "Correct: each =CHCH₃ end becomes CH₃COOH."],
      ["butane-2,3-diol", "The diol forms with cold dilute manganate(VII)."],
      ["ethanal only", "The aldehyde is oxidised further to the acid under these conditions."],
      ["propanoic acid and carbon dioxide", "That pattern would come from but-1-ene."],
    ],
    answer: "A",
    hints: ["Split the molecule at the C=C and oxidise each =CHR end."],
    explanation: "CH₃CH=CHCH₃ → 2CH₃COOH.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "2-methylpropene is heated with concentrated, acidified potassium manganate(VII). Which products form?",
    options: [
      ["propanone and carbon dioxide", "Correct: =C(CH₃)₂ gives propanone; =CH₂ gives CO₂ and water."],
      ["propanoic acid and methanoic acid", "A =C(CH₃)₂ end has no H on the carbon, so it gives a ketone, not an acid."],
      ["2-methylpropane-1,2-diol", "That is the product with cold dilute manganate(VII)."],
      ["propanal and carbon dioxide", "Aldehydes would be oxidised further; the C(CH₃)₂ end gives a ketone."],
    ],
    answer: "A",
    hints: ["What does each end of the double bond become?"],
    explanation: "(CH₃)₂C=CH₂ → CH₃COCH₃ + CO₂ + H₂O.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Butan-2-ol is heated with concentrated phosphoric acid. Which of the statements about the alkene products are correct?\n\n1. But-1-ene can form.\n2. cis-but-2-ene can form.\n3. trans-but-2-ene can form.",
    options: [
      ["1, 2 and 3", "Correct: H can be lost from C1 or C3, and but-2-ene has cis and trans forms."],
      ["1 and 2 only", "trans-but-2-ene also forms."],
      ["2 and 3 only", "Loss of H from C1 gives but-1-ene."],
      ["1 only", "But-2-ene (both isomers) also forms."],
    ],
    answer: "A",
    hints: ["Which carbons next to the C–OH carbon carry hydrogen?"],
    explanation: "Dehydration of butan-2-ol gives a mixture of three alkenes.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which of the statements about the reactions of propene are correct?\n\n1. With HBr the major product is 2-bromopropane.\n2. With bromine the product is 1,2-dibromopropane.\n3. With hydrogen, ultraviolet light is needed.",
    options: [
      ["1 and 2 only", "Correct: hydrogenation needs a Ni or Pt catalyst, not UV light."],
      ["1, 2 and 3", "Statement 3 is false."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true."],
    ],
    answer: "A",
    hints: ["What catalyses hydrogenation?"],
    explanation: "HBr → mainly 2-bromopropane; Br₂ → CH₂BrCHBrCH₃; H₂ needs Ni/Pt and heat.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An alkene of formula C₆H₁₂ gives butanone and ethanoic acid when heated with concentrated, acidified manganate(VII). What is the alkene?",
    options: [
      [t`$\ce{CH3CH2C(CH3)=CHCH3}$`, "Correct: =C(CH₃)(C₂H₅) gives butanone; =CHCH₃ gives ethanoic acid."],
      [t`$\ce{CH3CH2CH2C(CH3)=CH2}$`, "This gives pentan-2-one and CO₂."],
      [t`$\ce{CH3CH2CH=CHCH2CH3}$`, "This gives two molecules of propanoic acid."],
      [t`$\ce{(CH3)2C=C(CH3)2}$`, "This gives two molecules of propanone."],
    ],
    answer: "A",
    hints: ["Rebuild the C=C from the two C=O carbons."],
    explanation: "Join CH₃COCH₂CH₃ and CH₃COOH at their carbonyl carbons: 3-methylpent-2-ene.",
  });
  {
    const n = moles(1.02, Mr("C10H16"));
    const v = 2 * n * VM_RTP * 1000;
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Limonene, C₁₀H₁₆, found in citrus peel, has two C=C bonds and no other multiple bonds. Calculate the volume of hydrogen, in cm³ at room conditions, needed to saturate 1.02 g of limonene completely. Ar: C 12.0, H 1.0; molar gas volume 24.0 dm³ mol⁻¹.",
      value: v, sf: 3, unit: "cm³",
      wrong: [n * VM_RTP * 1000],
      hints: ["How many mol of H₂ per mol of limonene?"],
      explanation: `1. Mr(C₁₀H₁₆) = 136; n = 1.02 ÷ 136 = ${sfStr(n, 3)} mol.\n2. Two C=C, so n(H₂) = 2 × ${sfStr(n, 3)} = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.\n4. Using a 1 : 1 ratio gives ${sfStr(v / 2, 3)} cm³, which ignores the second double bond.`,
    });
  }
  b.num({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "0.0200 mol of an open-chain hydrocarbon with no triple bonds reacts with exactly 0.0600 mol of hydrogen (nickel catalyst). How many C=C bonds are in each molecule?",
    value: 3,
    wrong: [6],
    hints: ["One H₂ per C=C."],
    explanation: "0.0600 ÷ 0.0200 = 3 mol H₂ per mol, so three C=C bonds.",
  });
  {
    const n = moles(1.4, Mr("C2H4"));
    const m = n * Mr("C2H4Br2");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the maximum mass, in g, of 1,2-dibromoethane formed when 1.40 g of ethene reacts with excess bromine. Ar: C 12.0, H 1.0, Br 79.9.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("C2H4Br")],
      hints: ["The mole ratio is 1 : 1."],
      explanation: `1. CH₂=CH₂ + Br₂ → CH₂BrCH₂Br.\n2. n(ethene) = 1.40 ÷ 28.0 = ${sfStr(n, 3)} mol.\n3. Mr(C₂H₄Br₂) = ${Mr("C2H4Br2").toFixed(1)}; mass = ${sfStr(n, 3)} × ${Mr("C2H4Br2").toFixed(1)} = ${sfStr(m, 3)} g.\n4. Adding only one Br atom gives ${sfStr(n * Mr("C2H4Br"), 3)} g: that uses only one bromine atom in the formula mass.`,
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Heating ethanol vapour over aluminium oxide produces ethene.",
    answer: true,
    explanation: "True: dehydration, CH₃CH₂OH → CH₂=CH₂ + H₂O.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Hot, concentrated, acidified manganate(VII) converts ethene into ethane-1,2-diol.",
    answer: false,
    explanation: "False: the diol forms with cold dilute manganate(VII); hot concentrated breaks the C=C, giving CO₂ and water.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each reagent and conditions with the product formed from ethene.",
    pairs: [
      ["H₂, Ni catalyst, heat", "ethane"],
      ["steam, H₃PO₄ catalyst, about 300 °C and 60-70 atm", "ethanol"],
      ["HBr(g), room temperature", "bromoethane"],
      ["Cl₂, room temperature", "1,2-dichloroethane"],
      ["cold dilute acidified KMnO₄", "ethane-1,2-diol"],
    ],
    hints: ["Each reagent adds across the double bond."],
    explanation: "Addition of H₂, H₂O, HBr, Cl₂ and two OH groups.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about making alkenes.",
    template: "Alcohols are dehydrated by heating with concentrated {{blank:a}} acid or by passing the vapour over heated {{blank:b}}. Halogenoalkanes lose HX when heated with NaOH dissolved in {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["sulfuric"], choices: ["sulfuric", "nitric", "hydrochloric"] },
      { id: "b", accepted: ["aluminium oxide"], choices: ["aluminium oxide", "nickel", "platinum"] },
      { id: "c", accepted: ["ethanol"], choices: ["ethanol", "water", "hexane"] },
    ],
    explanation: "Concentrated H₂SO₄ (or H₃PO₄) or hot Al₂O₃; ethanolic NaOH.",
  });
  b.short({
    d: 3, skill: "ANALYSIS",
    stem: "2-methylbut-2-ene, (CH₃)₂C=CHCH₃, is heated with concentrated acidified potassium manganate(VII). Name the ketone formed.",
    accepted: ["propanone", "acetone", "propan-2-one", "dimethyl ketone"],
    wrong: ["ethanoic acid"],
    hints: ["Which end of the double bond carries two alkyl groups?"],
    explanation: "=C(CH₃)₂ → CH₃COCH₃ (propanone); the =CHCH₃ end gives ethanoic acid.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Describe how ethene can be prepared from ethanol in the laboratory and how you would show that the gas collected is an alkene.",
    points: ["Pass ethanol vapour over heated aluminium oxide (or heat ethanol with concentrated H₂SO₄/H₃PO₄)", "Collect the gas over water (after discarding the first tubes, which contain air)", "Shake with bromine water: orange to colourless"],
    modelAnswer: "Heat aluminium oxide strongly in a boiling tube and warm mineral wool soaked in ethanol so that the vapour passes over the hot oxide. Collect the ethene over water, rejecting the first tube of displaced air. Shaking a tube of the gas with bromine water turns it from orange to colourless, showing a C=C bond.",
    hints: ["Dehydrating agent, collection, test."],
    explanation: "Dehydration followed by the bromine-water test.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "An alkene with molecular formula C₆H₁₂ gives only carbon dioxide (with water) and pentan-3-one when heated with concentrated, acidified manganate(VII). Deduce its structure and name it, explaining your reasoning.",
    points: ["CO₂ shows a =CH₂ end", "Pentan-3-one (CH₃CH₂COCH₂CH₃) shows a =C(C₂H₅)₂ end", "Alkene: CH₂=C(CH₂CH₃)₂, 2-ethylbut-1-ene"],
    modelAnswer: "Carbon dioxide comes from a terminal =CH₂ group. Pentan-3-one comes from a carbon carrying two ethyl groups. Joining them gives CH₂=C(C₂H₅)₂, 2-ethylbut-1-ene (6 carbons, C₆H₁₂).",
    hints: ["Each C=O carbon in the products was one end of the C=C."],
    explanation: "Rebuild the alkene from the fragments.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Cyclohexene and cyclohexane are both colourless liquids. Describe and explain what is seen when each is shaken with (i) bromine water and (ii) cold, dilute, acidified potassium manganate(VII).",
    points: ["(i) Cyclohexene decolorises bromine water (orange to colourless): addition across C=C", "(i) Cyclohexane leaves bromine water orange: no C=C, alkanes do not react without UV light", "(ii) Cyclohexene turns the manganate(VII) from purple to colourless, forming cyclohexane-1,2-diol", "(ii) Cyclohexane leaves it purple: saturated, no reaction"],
    modelAnswer: "(i) Cyclohexene, which has a C=C bond, rapidly turns orange bromine water colourless because bromine adds across the double bond; cyclohexane is saturated and does not react, so the colour stays orange. (ii) Cyclohexene turns cold dilute acidified manganate(VII) from purple to colourless as it is oxidised to cyclohexane-1,2-diol; cyclohexane has no double bond and the solution stays purple.",
    hints: ["Which compound has a π bond?"],
    explanation: "Both tests detect the C=C bond.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound P, C₅H₁₀, is a liquid that decolorises bromine water at room temperature. When P is heated with concentrated, acidified potassium manganate(VII), the only organic products are ethanoic acid and propanoic acid.",
    parts: [
      P.manual({ label: "(a)", marks: 1, stem: "State what the reaction with bromine water shows about P.", points: ["P contains a C=C bond (it is an alkene)"], modelAnswer: "P is unsaturated: it contains a C=C double bond." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the structural formula of P (for example CH3CH=CH2).", accepted: ["CH3CH=CHCH2CH3", "CH3CH2CH=CHCH3", "CH₃CH=CHCH₂CH₃"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH2=CHCH2CH2CH3"], explanation: "CH₃COOH from =CHCH₃ and CH₃CH₂COOH from =CHCH₂CH₃: CH₃CH=CHCH₂CH₃." }),
      P.short({ label: "(c)", marks: 1, stem: "Name P.", accepted: ["pent-2-ene", "2-pentene", "pent 2 ene"], wrong: ["pent-1-ene"], explanation: "Pent-2-ene." }),
      P.manual({ label: "(d)", marks: 2, stem: "P exists as two stereoisomers. Name the type of isomerism and explain why it arises.", points: ["Cis/trans (geometrical) isomerism", "Restricted rotation about C=C and each double-bond carbon has two different groups (H and CH₃; H and C₂H₅)"], modelAnswer: "Cis/trans isomerism: the π bond prevents rotation about the C=C, and each carbon of the double bond carries two different groups." }),
      P.mcq({ label: "(e)", marks: 1, stem: "What is the product of P with cold, dilute, acidified manganate(VII)?", options: [
        ["pentane-2,3-diol", "Correct: OH added to C2 and C3."],
        ["ethanoic acid and propanoic acid", "These form with hot, concentrated reagent."],
        ["pentan-2-ol", "One OH and one H would come from hydration, not manganate(VII)."],
        ["pentan-2-one", "No ketone forms from the cold oxidation."],
      ], answer: "A", explanation: "CH₃CH(OH)CH(OH)CH₂CH₃." }),
      P.manual({ label: "(f)", marks: 2, stem: "P can be made by dehydrating an alcohol. Name a suitable alcohol and give the reagent and condition.", points: ["Pentan-2-ol or pentan-3-ol", "Concentrated H₂SO₄ or H₃PO₄ with heat, or vapour over heated Al₂O₃"], modelAnswer: "Pentan-3-ol (which gives only pent-2-ene), heated with concentrated phosphoric acid (or passed as vapour over hot aluminium oxide)." }),
    ],
    hints: ["Each acid comes from one end of the double bond."],
    explanation: "P = pent-2-ene (cis and trans); cold KMnO₄ → pentane-2,3-diol; made by dehydrating pentan-3-ol or pentan-2-ol.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A reaction scheme from bromoethane:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | bromoethane | reagent A | ethene |\n| 2 | ethene | steam, catalyst B, high temperature and pressure | ethanol |\n| 3 | ethene | hydrogen, catalyst C, heat | ethane |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify reagent A (including the solvent).", accepted: ["NaOH in ethanol", "ethanolic NaOH", "KOH in ethanol", "ethanolic KOH", "ethanolic sodium hydroxide", "sodium hydroxide in ethanol", "ethanolic potassium hydroxide", "potassium hydroxide in ethanol"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["aqueous NaOH"], explanation: "Hydroxide in ethanol (heat) causes elimination." }),
      P.short({ label: "(b)", marks: 1, stem: "Identify catalyst B.", accepted: ["phosphoric acid", "H3PO4", "phosphoric(V) acid", "orthophosphoric acid"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["nickel"], explanation: "H₃PO₄." }),
      P.short({ label: "(c)", marks: 1, stem: "Identify catalyst C.", accepted: ["nickel", "Ni", "platinum", "Pt", "palladium", "Pd"], wrong: ["iron"], explanation: "Ni (or Pt)." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What type of reaction is step 1?", options: [
        ["elimination", "Correct: HBr is removed."],
        ["substitution", "Substitution would give ethanol."],
        ["addition", "A molecule is lost, not gained."],
        ["hydration", "Hydration is step 2."],
      ], answer: "A", explanation: "Elimination of HBr." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write the equation for step 1 and state one difference in conditions that would give ethanol from bromoethane instead.", points: ["CH₃CH₂Br + NaOH → CH₂=CH₂ + NaBr + H₂O", "Use aqueous NaOH (water as solvent) instead of ethanol"], modelAnswer: "CH₃CH₂Br + NaOH → CH₂=CH₂ + NaBr + H₂O. Using aqueous sodium hydroxide instead gives ethanol by substitution." }),
    ],
    hints: ["Ethanolic versus aqueous hydroxide."],
    explanation: "A = ethanolic NaOH; B = H₃PO₄; C = Ni; step 1 elimination.",
  });

  b.card("FACT", "Reagent to make an alkene from a halogenoalkane", "NaOH or KOH in ethanol, heat under reflux (elimination).");
  b.card("FACT", "Dehydrating an alcohol", "Heated Al₂O₃, or concentrated H₂SO₄/H₃PO₄ with heat.");
  b.card("FACT", "Conditions for hydrogenation", "H₂ with a Ni catalyst and heat (or Pt).");
  b.card("FACT", "Conditions for hydration of ethene", "Steam, H₃PO₄ catalyst, about 300 °C and 60-70 atm.");
  b.card("FACT", "Test for C=C", "Bromine water: orange to colourless at room temperature.");
  b.card("CONCEPT", "Cold dilute acidified KMnO₄ with an alkene", "Adds two OH groups across C=C (a diol); purple to colourless.");
  b.card("CONCEPT", "Hot concentrated acidified KMnO₄ with an alkene", "Breaks the C=C: =CH₂ → CO₂ + H₂O; =CHR → RCOOH; =CRR' → RCOR'.");
  b.card("CONCEPT", "Counting C=C by hydrogenation", "Each C=C takes up one H₂: mol H₂ ÷ mol compound = number of C=C bonds.");
  b.card("CONCEPT", "Aqueous or ethanolic hydroxide?", "Aqueous → substitution (alcohol); ethanolic → elimination (alkene).");
});
