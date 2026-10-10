// W3b: six THEORY10 items (ZIMSEC Paper 2; Cambridge Paper 2 for AS concepts, Paper 4 for A Level concepts) on organic
// foundations, hydrocarbons and halogen compounds. T1-T3 are on Cambridge AS concepts; T4-T6 on Cambridge A Level concepts.
import { concept, P, t, EXAM, checkExam, Mr, moles, percentYield, empiricalFormula, same, VM_RTP, sfStr, dpStr } from "../lib.mjs";

const A = (k) => `achem.${k}`;
const TH = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const AS = { ...TH, paper: "Paper 2" };
const AL = { ...TH, paper: "Paper 4 (CIE), Paper 2 (ZIMSEC)" };

concept(A("organic.isomerism"), { file: "exam/w3b-theory", keyPrefix: "exam.w3b-theory" }, (b) => {
  // ---------------------------------------------------------------- T1 (AS): an unknown alkene, formulae and isomers
  {
    const e = empiricalFormula({ C: 85.7, H: 14.3 });
    same(e.ratio, { C: 1, H: 2 }, "CH2");
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("organic.isomerism"), A("organic.nomenclature-formulas"), A("hydrocarbons.alkenes-reactions")],
      stem: "Hydrocarbon X contains 85.7% carbon and 14.3% hydrogen by mass. Its relative molecular mass is 56. X decolorises bromine water at room temperature. When X is heated with concentrated, acidified potassium manganate(VII), ethanoic acid is the only organic product. Data: Ar C = 12.0, H = 1.0.",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Calculate the empirical formula of X (type it, for example CH3).", accepted: ["CH2", "CH₂"], normalise: ["trim", "collapse_whitespace"], wrong: ["C2H4"], explanation: "C 85.7/12.0 = 7.14; H 14.3/1.0 = 14.3; ratio 1 : 2 → CH₂." }),
        P.short({ label: "(b)", marks: 1, stem: "Deduce the molecular formula of X.", accepted: ["C4H8", "C₄H₈"], normalise: ["trim", "collapse_whitespace"], wrong: ["C4H10"], explanation: "56 ÷ 14 = 4, so C₄H₈." }),
        P.num({ label: "(c)", marks: 1, stem: "How many alkenes have the formula of X? Count cis and trans isomers separately.", value: 4, wrong: [3], explanation: "But-1-ene, cis-but-2-ene, trans-but-2-ene and 2-methylpropene." }),
        P.manual({ label: "(d)", marks: 3, stem: "Use the reaction with manganate(VII) to identify X, explaining your reasoning.", points: ["Each =CHCH₃ end of a C=C is oxidised to CH₃COOH", "Only ethanoic acid forms, so both ends are =CHCH₃: X is CH₃CH=CHCH₃", "X is but-2-ene (but-1-ene would give propanoic acid and CO₂; 2-methylpropene would give propanone and CO₂)"], modelAnswer: "Hot concentrated manganate(VII) splits the C=C and oxidises each =CHR end to RCOOH. Since ethanoic acid is the only product, each end must be =CHCH₃, so X is CH₃CH=CHCH₃, but-2-ene. But-1-ene would give propanoic acid and carbon dioxide, and 2-methylpropene would give propanone and carbon dioxide." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why X exists as two stereoisomers.", points: ["Restricted rotation about the C=C bond (because of the π bond)", "Each carbon of the C=C carries two different groups (H and CH₃), so cis and trans forms exist"], modelAnswer: "The π bond prevents rotation about the C=C, and each double-bond carbon bears H and CH₃, so the methyl groups can be on the same side (cis) or opposite sides (trans)." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which compound with the same molecular formula as X does not decolorise bromine water at room temperature?", options: [
          ["cyclobutane", "Correct: a saturated ring isomer."],
          ["but-1-ene", "This alkene decolorises bromine water."],
          ["2-methylpropene", "This alkene decolorises bromine water."],
          ["cis-but-2-ene", "This alkene decolorises bromine water."],
        ], answer: "A", explanation: "Cyclobutane has no C=C." }),
        P.short({ label: "(g)", marks: 1, stem: "Name the alkene that is a chain isomer of X.", accepted: ["2-methylpropene", "methylpropene", "2-methylprop-1-ene"], wrong: ["but-1-ene"], explanation: "Branched skeleton: (CH₃)₂C=CH₂." }),
      ]),
      hints: ["Divide by Ar, then by the smallest.", "Each end of the C=C gives one product."],
      explanation: "X = but-2-ene, C₄H₈ (empirical CH₂); four alkenes of formula C₄H₈; cis/trans from restricted rotation.",
    });
  }

  // ---------------------------------------------------------------- T2 (AS): propane, free radicals and combustion
  {
    const n = moles(0.88, Mr("C3H8"));
    const v = 5 * n * VM_RTP;
    b.struct({
      ...AS, d: 3, calculator: true,
      concepts: [A("hydrocarbons.free-radical-substitution"), A("hydrocarbons.alkanes-crude-oil")],
      stem: "Propane is a component of liquefied petroleum gas. It reacts with chlorine to form a mixture that includes 1-chloropropane and 2-chloropropane.",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "State the condition needed for propane to react with chlorine.", accepted: ["ultraviolet light", "UV light", "uv", "sunlight", "UV radiation"], wrong: ["AlCl3 catalyst"], explanation: "UV light." }),
        P.manual({ label: "(b)", marks: 3, stem: "Give the equations for the initiation step and for the two propagation steps that form 2-chloropropane.", points: ["Initiation: Cl₂ → 2Cl•", "Cl• + CH₃CH₂CH₃ → HCl + CH₃C•HCH₃", "CH₃C•HCH₃ + Cl₂ → CH₃CHClCH₃ + Cl•"], modelAnswer: "Cl₂ → 2Cl•; Cl• + CH₃CH₂CH₃ → HCl + CH₃ĊHCH₃; CH₃ĊHCH₃ + Cl₂ → CH₃CHClCH₃ + Cl•" }),
        P.manual({ label: "(c)", marks: 1, stem: "Write an equation for a termination step that forms a hydrocarbon with six carbon atoms.", points: ["e.g. 2CH₃CH₂CH₂• → C₆H₁₄, or 2(CH₃)₂CH• → C₆H₁₄, or CH₃CH₂CH₂• + (CH₃)₂CH• → C₆H₁₄"], modelAnswer: "2CH₃CH₂CH₂• → CH₃CH₂CH₂CH₂CH₂CH₃" }),
        P.mcq({ label: "(d)", marks: 1, stem: "Why is propane unreactive towards most reagents?", options: [
          ["All of its bonds are strong and almost non-polar.", "Correct: no δ+ or δ− sites, and the bonds need much energy to break."],
          ["Its molecules are held together by hydrogen bonds.", "Propane has no hydrogen bonding; intermolecular forces do not decide reactivity."],
          ["It has lone pairs that repel electrophiles and nucleophiles.", "Carbon in propane has no lone pairs."],
          ["It is a gas, so it cannot collide with other molecules.", "Gases collide frequently."],
        ], answer: "A", explanation: "Strong, non-polar bonds." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the volume of oxygen, in dm³ at room conditions, needed to burn 0.880 g of propane completely. Ar: C 12.0, H 1.0; molar gas volume 24.0 dm³ mol⁻¹.", value: v, sf: 3, unit: "dm³", wrong: [n * VM_RTP], explanation: `C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; n(C₃H₈) = 0.880 ÷ 44.0 = ${sfStr(n, 3)} mol; n(O₂) = ${sfStr(5 * n, 3)} mol; V = ${sfStr(v, 3)} dm³.` }),
        P.num({ label: "(f)", marks: 1, stem: "How many structural isomers of C₃H₆Cl₂ could form if substitution continues?", value: 4, wrong: [3], explanation: "1,1-, 1,2-, 1,3- and 2,2-dichloropropane." }),
        P.tf({ label: "(g)", marks: 1, stem: "Using a large excess of propane increases the proportion of monochlorinated products.", answer: true, explanation: "Cl• then meets propane rather than chloropropane." }),
      ]),
      hints: ["Radicals carry a dot.", "Balance the combustion equation first."],
      explanation: `UV; Cl₂ → 2Cl•, then H abstraction and Cl transfer; termination gives C₆H₁₄; ${sfStr(v, 3)} dm³ O₂.`,
    });
  }

  // ---------------------------------------------------------------- T3 (AS): 1-bromobutane, SN2 and the silver nitrate test
  {
    const n = moles(6.85, Mr("C4H9Br"));
    const th = n * Mr("C4H10O");
    const y = percentYield(2.96, th);
    b.struct({
      ...AS, d: 4, calculator: true,
      concepts: [A("halogen.halogenoalkane-reactions"), A("halogen.sn1-sn2")],
      stem: "1-bromobutane, CH₃CH₂CH₂CH₂Br, is a primary halogenoalkane. In one experiment 6.85 g of 1-bromobutane was converted into 2.96 g of pure butan-1-ol.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which reagent and conditions convert 1-bromobutane into butan-1-ol?", options: [
          ["NaOH(aq), heat under reflux", "Correct: nucleophilic substitution."],
          ["NaOH in ethanol, heat under reflux", "This favours elimination to but-1-ene."],
          ["KCN in ethanol, heat under reflux", "This gives pentanenitrile."],
          ["concentrated H₂SO₄, heat", "This does not convert RBr into ROH."],
        ], answer: "A", explanation: "Aqueous hydroxide, reflux." }),
        P.manual({ label: "(b)", marks: 3, stem: "Describe the mechanism of this reaction.", points: ["C–Br polar (C δ+); arrow from a lone pair on O of OH⁻ to the δ+ carbon, attacking opposite Br", "Arrow from the C–Br bond to Br", "Transition state with partial C–O and C–Br bonds and a negative charge; Br⁻ leaves (SN2)"], modelAnswer: "The C–Br bond is polar with C δ+. The OH⁻ ion attacks this carbon from the side opposite the bromine (arrow from an O lone pair to C) while the C–Br bonding pair moves onto Br (second arrow). A negatively charged transition state with partial C···O and C···Br bonds forms; then Br⁻ leaves and butan-1-ol forms. This is SN2." }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage yield, to one decimal place. Ar: H 1.0, C 12.0, O 16.0, Br 79.9.", value: y, dp: 1, unit: "%", wrong: [(2.96 / 6.85) * 100], explanation: `Mr(C₄H₉Br) = 136.9 and Mr(C₄H₉OH) = 74.0; n = 6.85 ÷ 136.9 = ${sfStr(n, 3)} mol; theoretical mass = ${sfStr(n, 3)} × 74.0 = ${sfStr(th, 3)} g; yield = 2.96 ÷ ${sfStr(th, 3)} × 100 = ${dpStr(y, 1)}%.` }),
        P.short({ label: "(d)", marks: 1, stem: "Name the organic product when 1-bromobutane is heated with KCN in ethanol.", accepted: ["pentanenitrile", "1-cyanobutane", "butyl cyanide"], wrong: ["butanenitrile"], explanation: "One extra carbon: pentanenitrile." }),
        P.short({ label: "(e)", marks: 1, stem: "Give the rate equation for the reaction in (b).", accepted: ["rate = k[C4H9Br][OH-]", "rate=k[C4H9Br][OH-]", "rate = k[RBr][OH-]", "rate = k[CH3CH2CH2CH2Br][OH-]", "rate = k[OH-][C4H9Br]"], normalise: ["trim", "collapse_whitespace"], wrong: ["rate = k[C4H9Br]"], explanation: "SN2: first order in each reactant." }),
        P.manual({ label: "(f)", marks: 2, stem: "1-iodobutane is hydrolysed faster than 1-bromobutane. Explain why.", points: ["The C–I bond is weaker (lower bond energy) than C–Br", "So it breaks more easily; bond strength, not polarity (C–Br is more polar), controls the rate"], modelAnswer: "The C–I bond has a lower bond energy than C–Br, so it is broken more easily in the substitution, even though it is less polar." }),
      ]),
      hints: ["Primary → SN2.", "Use the 1 : 1 mole ratio."],
      explanation: `NaOH(aq), reflux; SN2; yield ${dpStr(y, 1)}%; KCN gives pentanenitrile; rate = k[RBr][OH⁻]; C–I weakest.`,
    });
  }

  // ---------------------------------------------------------------- T4 (A Level): nitration of benzene
  {
    const n = moles(5.85, Mr("C6H6"));
    const th = n * Mr("C6H5NO2");
    const y = percentYield(6.52, th);
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("hydrocarbons.electrophilic-substitution"), A("hydrocarbons.arenes-reactions"), A("hydrocarbons.benzene-structure")],
      stem: "Benzene is nitrated with a mixture of concentrated nitric acid and concentrated sulfuric acid at 50 °C. In one preparation, 5.85 g of benzene gave 6.52 g of nitrobenzene.",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Give the formula of the electrophile.", accepted: ["NO2+", "NO₂⁺"], normalise: ["trim", "collapse_whitespace"], wrong: ["NO3-"], explanation: "The nitronium ion." }),
        P.manual({ label: "(b)", marks: 1, stem: "Write an equation for the formation of the electrophile.", points: ["HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻ (or HNO₃ + H₂SO₄ → NO₂⁺ + HSO₄⁻ + H₂O)"], modelAnswer: "HNO₃ + 2H₂SO₄ → NO₂⁺ + H₃O⁺ + 2HSO₄⁻" }),
        P.manual({ label: "(c)", marks: 3, stem: "Describe the mechanism of the reaction of the electrophile with benzene.", points: ["Arrow from the delocalised π ring to N of NO₂⁺", "Intermediate: one sp³ carbon with H and NO₂; positive charge delocalised over the other five carbons", "Arrow from the C–H bond into the ring; H⁺ lost and delocalisation restored (H⁺ + HSO₄⁻ → H₂SO₄)"], modelAnswer: "A curly arrow goes from the delocalised π electrons to the nitrogen of NO₂⁺. The intermediate cation has one sp³ carbon carrying H and NO₂, with the positive charge spread over the remaining five carbons. A curly arrow from the C–H bond back into the ring restores the aromatic system and H⁺ is lost; it reforms H₂SO₄ with HSO₄⁻." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Why does the intermediate lose H⁺ instead of adding a nucleophile?", options: [
          ["Loss of H⁺ restores the stable delocalised ring.", "Correct: addition would lose the delocalisation energy."],
          ["No nucleophiles are present in the nitrating mixture.", "HSO₄⁻ and water are present."],
          ["The intermediate is negatively charged and repels nucleophiles.", "The intermediate is positively charged."],
          ["Adding a nucleophile would form a free radical.", "No radicals are involved."],
        ], answer: "A", explanation: "Substitution keeps the aromatic stabilisation." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the percentage yield, to one decimal place. Ar: H 1.0, C 12.0, N 14.0, O 16.0.", value: y, dp: 1, unit: "%", wrong: [(6.52 / 5.85) * 100], explanation: `n(C₆H₆) = 5.85 ÷ 78.0 = ${sfStr(n, 3)} mol; theoretical nitrobenzene = ${sfStr(n, 3)} × 123.0 = ${sfStr(th, 3)} g; yield = 6.52 ÷ ${sfStr(th, 3)} × 100 = ${dpStr(y, 1)}%.` }),
        P.short({ label: "(f)", marks: 1, stem: "Above about 60 °C a second nitro group is substituted. Name the main product.", accepted: ["1,3-dinitrobenzene", "1 3 dinitrobenzene", "13-dinitrobenzene", "meta-dinitrobenzene"], wrong: ["1,4-dinitrobenzene"], explanation: "–NO₂ is 3-directing." }),
        P.tf({ label: "(g)", marks: 1, stem: "Sulfuric acid is regenerated at the end of the mechanism and acts as a catalyst.", answer: true, explanation: "H⁺ + HSO₄⁻ → H₂SO₄." }),
      ]),
      hints: ["The ring donates electrons to NO₂⁺.", "1 : 1 mole ratio for the yield."],
      explanation: `NO₂⁺; electrophilic substitution via a cation with charge over five carbons; yield ${dpStr(y, 1)}%; 1,3-dinitrobenzene at higher temperature.`,
    });
  }

  // ---------------------------------------------------------------- T5 (A Level): methylbenzene, ring and side chain, chlorobenzene
  {
    const n = moles(2.3, Mr("C7H8"));
    const m = n * Mr("C7H6O2");
    b.struct({
      ...AL, d: 4, calculator: true,
      concepts: [A("hydrocarbons.arenes-reactions"), A("halogen.halogenoarenes-cfcs")],
      stem: "Methylbenzene reacts with chlorine in two different ways:\n\n| Reaction | Conditions | Organic product(s) |\n|---|---|---|\n| 1 | Cl₂, AlCl₃ catalyst, room temperature, dark | two ring-substituted isomers |\n| 2 | Cl₂, ultraviolet light, no catalyst | C₆H₅CH₂Cl |",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "What type of reaction is reaction 2?", options: [
          ["free-radical substitution", "Correct: UV light, side-chain C–H."],
          ["electrophilic substitution", "That is reaction 1."],
          ["nucleophilic substitution", "No nucleophile attacks."],
          ["electrophilic addition", "Nothing adds to a double bond."],
        ], answer: "A", explanation: "Cl• radicals abstract a side-chain hydrogen." }),
        P.manual({ label: "(b)", marks: 2, stem: "Name the two products of reaction 1.", points: ["2-chloromethylbenzene", "4-chloromethylbenzene"], modelAnswer: "2-chloromethylbenzene and 4-chloromethylbenzene." }),
        P.short({ label: "(c)", marks: 1, stem: "Methylbenzene is heated under reflux with alkaline KMnO₄ and the mixture is then acidified. Name the organic product.", accepted: ["benzoic acid", "benzenecarboxylic acid"], wrong: ["phenol"], explanation: "Side-chain oxidation." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the maximum mass, in g, of this product from 2.30 g of methylbenzene. Ar: H 1.0, C 12.0, O 16.0.", value: m, sf: 3, unit: "g", wrong: [2.3], explanation: `n(C₇H₈) = 2.30 ÷ 92.0 = ${sfStr(n, 3)} mol; mass of C₆H₅COOH = ${sfStr(n, 3)} × 122.0 = ${sfStr(m, 3)} g.` }),
        P.manual({ label: "(e)", marks: 3, stem: "The product of reaction 2 gives a white precipitate when warmed with ethanolic silver nitrate, but the products of reaction 1 do not. Explain this difference.", points: ["In C₆H₅CH₂Cl the Cl is on a side-chain (sp³) carbon, so it behaves like a halogenoalkane and is hydrolysed, releasing Cl⁻ (AgCl white)", "In the ring compounds a Cl lone pair overlaps with the delocalised π system, giving the C–Cl bond partial double-bond character (stronger)", "and the π electrons repel the nucleophile, so the C–Cl bond is not broken and no Cl⁻ forms"], modelAnswer: "In (chloromethyl)benzene the chlorine is bonded to a side-chain carbon, so the C–Cl bond is an ordinary halogenoalkane bond that is hydrolysed, releasing chloride ions that give white AgCl. In the chloromethylbenzenes from reaction 1 the chlorine is bonded to the ring; a chlorine lone pair is delocalised into the ring, giving the C–Cl bond partial double-bond character so it is stronger, and the ring's π electrons repel nucleophiles, so no hydrolysis occurs." }),
        P.tf({ label: "(f)", marks: 1, stem: "Methylbenzene reacts with electrophiles faster than benzene does.", answer: true, explanation: "The CH₃ group is electron-donating (activating)." }),
      ]),
      hints: ["Catalyst in the dark → ring; UV → side chain.", "Where is each Cl attached?"],
      explanation: `Reaction 2 is free-radical substitution; reaction 1 gives 2- and 4-chloromethylbenzene; benzoic acid ${sfStr(m, 3)} g; ring C–Cl resists hydrolysis.`,
    });
  }

  // ---------------------------------------------------------------- T6 (A Level): optical isomers, SN1/SN2 and drugs
  b.struct({
    ...AL, d: 4,
    concepts: [A("organic.optical-isomerism-drugs"), A("halogen.sn1-sn2")],
    stem: "3-bromo-3-methylhexane, CH₃CH₂C(CH₃)BrCH₂CH₂CH₃, is chiral. A pure enantiomer of it is hydrolysed by aqueous hydroxide ions to 3-methylhexan-3-ol, CH₃CH₂C(CH₃)(OH)CH₂CH₂CH₃.",
    parts: checkExam(EXAM.THEORY10, [
      P.num({ label: "(a)", marks: 1, stem: "How many chiral centres are present in 3-methylhexan-3-ol?", value: 1, wrong: [2], explanation: "C3 carries OH, CH₃, C₂H₅ and C₃H₇." }),
      P.manual({ label: "(b)", marks: 2, stem: "Describe how the two optical isomers of 3-methylhexan-3-ol are related.", points: ["The four different groups are arranged tetrahedrally around C3", "The isomers are mirror images that cannot be superimposed (enantiomers)"], modelAnswer: "Both have OH, CH₃, C₂H₅ and C₃H₇ arranged tetrahedrally around C3; the two arrangements are mirror images and are non-superimposable." }),
      P.mcq({ label: "(c)", marks: 1, stem: "The alcohol formed is optically inactive. Which statement explains this?", options: [
        ["It reacts by SN1 via a planar carbocation, giving a racemic mixture.", "Correct: the carbocation is attacked equally from both sides."],
        ["The halogenoalkane reacts by SN2, which always gives an inactive product.", "SN2 gives a single inverted enantiomer."],
        ["The product molecule has no chiral centre.", "C3 of the product is chiral."],
        ["The hydroxide ion is chiral and cancels the rotation.", "OH⁻ is not chiral."],
      ], answer: "A", explanation: "SN1 → racemisation." }),
      P.short({ label: "(d)", marks: 1, stem: "Give the name for a 50 : 50 mixture of two enantiomers.", accepted: ["racemic mixture", "racemate", "racemic modification", "a racemic mixture"], wrong: ["enantiomer"], explanation: "A racemic mixture (racemate)." }),
      P.manual({ label: "(e)", marks: 2, stem: "A single enantiomer of 2-bromohexane is hydrolysed under conditions where only SN2 occurs. Predict and explain the optical activity of the product.", points: ["The product (hexan-2-ol) is optically active: a single enantiomer forms", "SN2 is one step with backside attack, inverting the configuration rather than forming a planar intermediate"], modelAnswer: "The product is optically active. In SN2 the nucleophile attacks from the side opposite the bromine in a single step, so the configuration is inverted and only one enantiomer of hexan-2-ol forms." }),
      P.manual({ label: "(f)", marks: 2, stem: "Many drugs are chiral. Suggest why a manufacturer may choose to make a drug as a single enantiomer rather than as a racemic mixture.", points: ["The other enantiomer may be inactive or have harmful side effects (it fits receptors differently)", "A smaller dose is needed / less waste / fewer side effects"], modelAnswer: "The two enantiomers fit chiral receptors differently, so one may be inactive or harmful; supplying only the active enantiomer allows a smaller dose with fewer side effects." }),
      P.tf({ label: "(g)", marks: 1, stem: "The two enantiomers of 3-methylhexan-3-ol have the same boiling point.", answer: true, explanation: "Enantiomers have identical physical properties apart from optical rotation." }),
    ]),
    hints: ["Tertiary → SN1 → planar carbocation.", "SN2 → inversion."],
    explanation: "One chiral centre; SN1 gives a racemate; SN2 gives a single inverted enantiomer; single-enantiomer drugs avoid inactive or harmful isomers.",
  });
});
