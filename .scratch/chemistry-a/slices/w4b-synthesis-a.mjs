// W4b: achem.organic.synthesis-a (Cambridge only, A Level 36.1)
import { concept, P, t, ce, CAM, Mr, moles, VM_RTP, percentYield, sfStr, dpStr } from "../lib.mjs";

concept("achem.organic.synthesis-a", { file: "organic/synthesis-a", keyPrefix: "organic.synthesis-a", applies: CAM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagents convert nitrobenzene into phenylamine?",
    options: [
      ["Sn and conc. HCl, reflux, then NaOH(aq)", "Correct: Sn/HCl reduces –NO₂ to –NH₃⁺; alkali releases the free amine."],
      ["NaBH₄ in aqueous ethanol at room temperature", "NaBH₄ reduces aldehydes and ketones, not nitro groups."],
      ["NaNO₂ and dilute HCl below 10 °C", "These reagents convert phenylamine into a diazonium salt; they do not make it."],
      ["ammonia in ethanol, heated under pressure", "Ammonia substitutes halogenoalkanes; it does not reduce nitrobenzene."],
    ],
    answer: "A",
    explanation: "C₆H₅NO₂ + 6[H] → C₆H₅NH₂ + 2H₂O, using Sn and concentrated HCl; NaOH(aq) then liberates phenylamine from its salt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which reaction forms a new carbon–carbon bond?",
    options: [
      ["benzene with ethanoyl chloride and anhydrous AlCl₃", "Correct: Friedel-Crafts acylation joins the acyl carbon to the ring."],
      ["phenol with ethanoyl chloride at room temperature", "This forms an ester, a C–O bond, not a C–C bond."],
      ["phenylamine with ethanoyl chloride at room temperature", "This forms an amide, a C–N bond."],
      ["benzene with chlorine and anhydrous AlCl₃", "Chlorination forms a C–Cl bond."],
    ],
    answer: "A",
    explanation: "Friedel-Crafts alkylation and acylation (and cyanide reactions) build carbon skeletons.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which reagent converts phenol into phenyl ethanoate, CH₃COOC₆H₅, at room temperature?",
    options: [
      ["ethanoyl chloride", "Correct: the acyl chloride is reactive enough to acylate the phenol oxygen."],
      ["ethanoic acid with a concentrated H₂SO₄ catalyst", "Phenol reacts far too slowly with carboxylic acids to make useful ester."],
      ["ethanal with acidified K₂Cr₂O₇", "This oxidises ethanal to ethanoic acid; it does not make an ester of phenol."],
      ["ethanol with concentrated H₂SO₄", "No acyl group is present to form the ester."],
    ],
    answer: "A",
    explanation: "CH₃COCl + C₆H₅OH → CH₃COOC₆H₅ + HCl. Phenol's lone pair is delocalised into the ring, so it is a weak nucleophile and needs a reactive acyl chloride.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which two-step route converts 1-bromopropane into butan-1-amine, CH₃CH₂CH₂CH₂NH₂?",
    options: [
      ["KCN in ethanol, reflux; then LiAlH₄", "Correct: the nitrile adds a carbon; LiAlH₄ reduces –CN to –CH₂NH₂."],
      ["NH₃ in ethanol, under pressure; then LiAlH₄", "Ammonia gives propan-1-amine, with three carbons; there is nothing for LiAlH₄ to reduce."],
      ["KCN in ethanol, reflux; then dilute HCl, reflux", "Acid hydrolysis of the nitrile gives butanoic acid, not the amine."],
      ["NaOH(aq), reflux; then NH₃ in ethanol", "This gives propan-1-ol, and alcohols do not react with ammonia to give amines here."],
    ],
    answer: "A",
    hints: ["The amine has one more carbon than the halogenoalkane."],
    explanation: "CH₃CH₂CH₂Br → CH₃CH₂CH₂CN → CH₃CH₂CH₂CH₂NH₂ (LiAlH₄, or H₂ with Ni).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statements about making an azo dye from phenylamine are correct?\n\n1. Phenylamine is diazotised with sodium nitrite and dilute hydrochloric acid below 10 °C.\n2. Above about 10 °C the benzenediazonium ion decomposes, giving off nitrogen.\n3. The diazonium salt is coupled with phenol in acidic solution.",
    options: [
      ["1 and 2 only", "Correct: coupling with phenol is carried out in alkaline solution (as the phenoxide ion)."],
      ["1, 2 and 3", "Statement 3 is false: phenol couples in NaOH(aq)."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true: warming gives phenol and N₂."],
    ],
    answer: "A",
    hints: ["What form of phenol is the most reactive towards electrophiles?"],
    explanation: "Diazotisation needs HNO₂ (NaNO₂ + HCl) below 10 °C; the diazonium salt couples with phenol in alkali.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Benzoic acid is made from benzene: (I) CH₃Cl with anhydrous AlCl₃; (II) hot alkaline KMnO₄, then dilute acid. Which statements are correct?\n\n1. Step I is a Friedel-Crafts alkylation.\n2. Step II oxidises the side chain to –COOH.\n3. Some dimethylbenzenes may form as by-products in step I.",
    options: [
      ["1, 2 and 3", "Correct: methylbenzene is more reactive than benzene, so further alkylation can occur."],
      ["1 and 2 only", "Statement 3 is also true: over-alkylation is a known problem."],
      ["2 and 3 only", "Statement 1 is also true."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Is methylbenzene more or less reactive than benzene towards electrophiles?"],
    explanation: "Friedel-Crafts methylation gives methylbenzene (plus some polymethylbenzenes); alkaline KMnO₄ then acid gives C₆H₅COOH.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Phenylethanone, C₆H₅COCH₃, is reduced with NaBH₄. Why is the product not optically active?",
    options: [
      ["The C=O is planar, so attack from either face gives a racemic mixture.", "Correct: equal amounts of the two enantiomers form, so their rotations cancel."],
      ["The product, 1-phenylethanol, has no chiral carbon atom.", "The carbinol carbon carries H, OH, CH₃ and C₆H₅: it is chiral."],
      ["NaBH₄ reduces the benzene ring, destroying the chiral centre.", "NaBH₄ does not reduce the aromatic ring."],
      ["The product is a ketone, which can never be chiral.", "The product is an alcohol, and some ketones can be chiral."],
    ],
    answer: "A",
    hints: ["Can H⁻ approach the carbonyl carbon from both sides?"],
    explanation: "Nucleophilic attack on a planar C=O occurs equally from both faces, giving a 50 : 50 mixture of enantiomers.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Methylbenzene is treated with: (I) Cl₂ in UV light; (II) KCN in ethanol, reflux; (III) H₂ with a nickel catalyst. What is the final product?",
    options: [
      [t`$\ce{C6H5CH2CH2NH2}$`, "Correct: (chloromethyl)benzene → phenylethanenitrile → 2-phenylethylamine."],
      [t`$\ce{ClC6H4CH2NH2}$`, "UV light chlorinates the side chain, not the ring."],
      [t`$\ce{C6H5CH2NH2}$`, "This ignores the carbon added by cyanide."],
      [t`$\ce{C6H5CH2COOH}$`, "That would need hydrolysis of the nitrile, not reduction."],
    ],
    answer: "A",
    hints: ["UV light: side chain. KCN: one more carbon. H₂/Ni: reduce –CN."],
    explanation: "C₆H₅CH₃ → C₆H₅CH₂Cl → C₆H₅CH₂CN → C₆H₅CH₂CH₂NH₂.",
  });
  {
    const overall = 0.9 * 0.7 * 0.85 * 0.6 * 100;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "An azo dye is made from benzene in four steps with yields of 90%, 70%, 85% and 60%. Calculate the overall percentage yield, to three significant figures.",
      value: overall, sf: 3, unit: "%",
      wrong: [60],
      explanation: `0.90 × 0.70 × 0.85 × 0.60 × 100 = ${sfStr(overall, 3)}%. The overall yield is always lower than the poorest step (60%).`,
    });
  }
  {
    const n = moles(9.3, Mr("C6H5NH2"));
    const m = n * Mr("C12H10N2O") * 0.45;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "9.30 g of phenylamine is diazotised and the product coupled with excess phenol to give the dye C₆H₅N=NC₆H₄OH (Mr 198). The overall yield is 45.0%. Calculate the mass of dye obtained, in g. Ar: H 1.0, C 12.0, N 14.0.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("C12H10N2O"), 9.3 * 0.45],
      hints: ["One phenylamine gives at most one molecule of dye."],
      explanation: `1. Mr(C₆H₅NH₂) = ${Mr("C6H5NH2")}; n = 9.30 ÷ ${Mr("C6H5NH2")} = ${sfStr(n, 3)} mol.\n2. Maximum dye = ${sfStr(n, 3)} × 198 = ${sfStr(n * 198, 3)} g.\n3. Actual = 0.450 × ${sfStr(n * 198, 3)} = ${sfStr(m, 3)} g.\n4. Taking 45.0% of the mass of phenylamine ignores the change in Mr.`,
    });
  }
  {
    const n = 0.025;
    const v = n * VM_RTP * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "A solution containing 0.0250 mol of benzenediazonium chloride is allowed to warm up and decomposes completely: C₆H₅N₂⁺ + H₂O → C₆H₅OH + N₂ + H⁺. Calculate the volume of nitrogen released, in cm³ at room conditions (molar gas volume 24.0 dm³ mol⁻¹).",
      value: v, unit: "cm³",
      wrong: [n * VM_RTP],
      hints: ["1 mol of diazonium ion gives 1 mol of N₂."],
      explanation: `n(N₂) = 0.0250 mol; V = 0.0250 × 24 000 = ${v} cm³. Leaving the answer in dm³ gives ${n * VM_RTP}.`,
    });
  }
  {
    const nAmide = moles(25, Mr("C6H5NHCOCH3"));
    const nNeed = nAmide / 0.85;
    const m = nNeed * Mr("C6H5NH2");
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "N-phenylethanamide, C₆H₅NHCOCH₃, is made by reacting phenylamine, C₆H₅NH₂, with ethanoyl chloride. The yield is 85.0%. Calculate the mass of phenylamine needed to obtain 25.0 g of N-phenylethanamide, in g. Ar: H 1.0, C 12.0, N 14.0, O 16.0.",
      value: m, sf: 3, unit: "g",
      wrong: [nAmide * Mr("C6H5NH2"), nAmide * 0.85 * Mr("C6H5NH2")],
      hints: ["Find the amount of product needed, then allow for the yield."],
      explanation: `1. Mr(C₆H₅NHCOCH₃) = ${Mr("C6H5NHCOCH3")}; n(product) = 25.0 ÷ ${Mr("C6H5NHCOCH3")} = ${sfStr(nAmide, 3)} mol.\n2. At 85.0% yield, phenylamine needed = ${sfStr(nAmide, 3)} ÷ 0.850 = ${sfStr(nNeed, 3)} mol.\n3. Mass = ${sfStr(nNeed, 3)} × ${Mr("C6H5NH2")} = ${sfStr(m, 3)} g.\n4. ${sfStr(nAmide * Mr("C6H5NH2"), 3)} g ignores the yield; multiplying by 0.850 instead of dividing gives ${sfStr(nAmide * 0.85 * Mr("C6H5NH2"), 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Phenol is converted into an ester by heating it with a carboxylic acid and a concentrated sulfuric acid catalyst, just as ethanol is.",
    answer: false,
    explanation: "False. Phenol is a much poorer nucleophile than ethanol (its lone pair is delocalised into the ring); esters of phenol are made with acyl chlorides.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each step with its type of reaction.",
    pairs: [
      ["benzene → nitrobenzene", "electrophilic substitution"],
      ["nitrobenzene → phenylamine", "reduction"],
      ["ethanoyl chloride + ammonia → ethanamide", "addition-elimination"],
      ["methylbenzene → (chloromethyl)benzene", "free-radical substitution"],
      ["propanal + HCN → 2-hydroxybutanenitrile", "nucleophilic addition"],
    ],
    hints: ["UV light on a side chain means radicals."],
    explanation: "Nitration is electrophilic substitution; Sn/HCl reduces; acyl chlorides react by addition-elimination; Cl₂/UV is radical substitution; HCN adds to C=O as a nucleophile.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the route from benzene to 1-phenylethanol.",
    template: "Step 1: heat benzene with {{blank:a}} and anhydrous {{blank:b}} to form phenylethanone. Step 2: reduce phenylethanone with {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["ethanoyl chloride"], choices: ["ethanoyl chloride", "chloroethane", "ethanoic acid"] },
      { id: "b", accepted: ["AlCl₃"], choices: ["AlCl₃", "NaOH", "H₂SO₄"] },
      { id: "c", accepted: ["NaBH₄"], choices: ["NaBH₄", "Sn and HCl", "acidified K₂Cr₂O₇"] },
    ],
    hints: ["Acylation puts C=O next to the ring."],
    explanation: "Friedel-Crafts acylation with CH₃COCl/AlCl₃, then NaBH₄ reduces the ketone to the secondary alcohol.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the reagent that reduces an amide, RCONH₂, to an amine, RCH₂NH₂.",
    accepted: ["LiAlH4", "lithium tetrahydridoaluminate", "lithium aluminium hydride", "LiAlH₄", "lithium tetrahydridoaluminate(III)"],
    wrong: ["NaBH4"],
    explanation: "LiAlH₄ (in dry ether) reduces amides to amines; NaBH₄ is too weak.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Ethanoic acid is converted to N-methylethanamide, CH₃CONHCH₃, in two steps. Name the intermediate.",
    accepted: ["ethanoyl chloride", "acetyl chloride", "CH3COCl"],
    hints: ["Amides are made from acyl chlorides."],
    wrong: ["ethanamide"],
    explanation: "CH₃COOH + SOCl₂ → CH₃COCl; then CH₃COCl + CH₃NH₂ → CH₃CONHCH₃ + HCl.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Outline a three-step synthesis of N-phenylethanamide, C₆H₅NHCOCH₃, from benzene, giving reagents and conditions for each step.",
    points: ["Concentrated HNO₃ and concentrated H₂SO₄, 25-60 °C, giving nitrobenzene", "Tin and concentrated HCl, heat under reflux, then NaOH(aq), giving phenylamine", "Ethanoyl chloride, room temperature, giving N-phenylethanamide (+ HCl)", "Intermediates named or shown correctly in the right order"],
    modelAnswer: "1. Nitrate benzene with a mixture of concentrated nitric and sulfuric acids at 25-60 °C to give nitrobenzene. 2. Reduce nitrobenzene with tin and concentrated hydrochloric acid under reflux, then add sodium hydroxide solution to liberate phenylamine. 3. React phenylamine with ethanoyl chloride at room temperature to give N-phenylethanamide and HCl.",
    hints: ["The nitrogen must be put on the ring first."],
    explanation: "Nitrate, reduce, acylate.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "After step 2 of a synthesis, the product should be phenylethanol formed by reducing phenylethanone. Describe how an infrared spectrum would show that the reduction is complete.",
    points: ["The strong C=O absorption (about 1670-1740 cm⁻¹) of the ketone is absent", "A broad O–H absorption at about 3200-3600 cm⁻¹ is present"],
    modelAnswer: "The spectrum should no longer show the strong carbonyl absorption near 1680-1700 cm⁻¹, and should show a broad alcohol O–H absorption between 3200 and 3600 cm⁻¹.",
    hints: ["Which bond disappears and which appears?"],
    explanation: "Infrared tracks the disappearance of C=O and the appearance of O–H.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A drug molecule has one chiral centre, and only one enantiomer is active. The last step of the planned synthesis is NaBH₄ reduction of a ketone. Explain the problem this creates and suggest how a manufacturer might deal with it.",
    points: ["NaBH₄ (H⁻) attacks the planar C=O from both faces equally, giving a racemic mixture", "Half the product is the inactive (or harmful) enantiomer, so the yield of active drug is halved and the inactive isomer may cause side effects", "Use a chiral catalyst / enzyme or a chiral starting material to make one enantiomer, or separate (resolve) the enantiomers"],
    modelAnswer: "The ketone is planar at the carbonyl carbon, so hydride attacks from either face equally and a racemic mixture of the two enantiomers forms. Only half of the product is the active drug, the other half must be removed and may have unwanted effects. A manufacturer could use a chiral catalyst or an enzyme that delivers hydride to one face, start from a chiral starting material, or separate the enantiomers after the reaction.",
    hints: ["What shape is a C=O group?"],
    explanation: "Racemic mixtures from planar intermediates are a key issue in drug synthesis.",
  });
  {
    const n = moles(4.7, Mr("C6H5OH"));
    const th = n * Mr("HOC6H4NO2");
    const y = percentYield(3.34, th);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Paracetamol, HOC₆H₄NHCOCH₃ (4-hydroxy group and NHCOCH₃ group on opposite ring carbons), can be made from phenol.\n\n| Step | Reagent and conditions | Product |\n|---|---|---|\n| 1 | dilute HNO₃, room temperature | E, 4-nitrophenol (with an isomer) |\n| 2 | Sn + conc. HCl, reflux; then neutralise | F |\n| 3 | ethanoyl chloride, room temperature | paracetamol |\n\nAr: H 1.0, C 12.0, N 14.0, O 16.0.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the isomer of E formed in step 1.", accepted: ["2-nitrophenol", "2 nitrophenol", "ortho-nitrophenol", "o-nitrophenol"], wrong: ["3-nitrophenol"], explanation: "–OH directs to the 2- and 4-positions." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain why phenol can be nitrated with dilute nitric acid at room temperature, whereas benzene needs a mixture of concentrated acids.", points: ["A lone pair on the O of –OH is delocalised into the ring, increasing its electron density", "So the ring is activated and attacked by electrophiles much more readily than benzene (a weaker electrophile/milder conditions suffice)"], modelAnswer: "One of the oxygen lone pairs overlaps with the π system and is delocalised into the ring, so the ring is more electron-rich than benzene. It therefore reacts with electrophiles far more readily, and dilute nitric acid at room temperature is enough." }),
      P.num({ label: "(c)", marks: 2, stem: "4.70 g of phenol gave 3.34 g of pure 4-nitrophenol (Mr 139). Calculate the percentage yield of step 1, to three significant figures.", value: y, sf: 3, unit: "%", wrong: [(3.34 / 4.7) * 100], explanation: `n(phenol) = 4.70 ÷ ${Mr("C6H5OH")} = ${sfStr(n, 3)} mol; maximum 4-nitrophenol = ${sfStr(n, 3)} × 139 = ${sfStr(th, 3)} g; yield = 3.34 ÷ ${sfStr(th, 3)} × 100 = ${sfStr(y, 3)}%.` }),
      P.mcq({ label: "(d)", marks: 1, stem: "What type of reaction is step 2?", options: [
        ["reduction", "Correct: –NO₂ becomes –NH₂."],
        ["hydrolysis", "No bond is broken by water."],
        ["nucleophilic substitution", "Nothing on the ring is replaced by a nucleophile."],
        ["oxidation", "Nitrogen gains hydrogen and loses oxygen: reduction."],
      ], answer: "A", explanation: "Sn/HCl reduces the nitro group." }),
      P.short({ label: "(e)", marks: 1, stem: "Give the structural formula of F.", accepted: ["HOC6H4NH2", "HOC₆H₄NH₂", "H2NC6H4OH", "NH2C6H4OH", "4-aminophenol"], normalise: ["trim", "collapse_whitespace"], wrong: ["HOC6H4NO2"], explanation: "4-aminophenol." }),
      P.manual({ label: "(f)", marks: 2, stem: "In step 3 the –NH₂ group reacts with ethanoyl chloride rather than the –OH group. Suggest why.", points: ["The N lone pair is more available (N is less electronegative than O), so the amine is the better nucleophile", "The O lone pair of the phenol group is delocalised into the ring, making it a weaker nucleophile"], modelAnswer: "Nitrogen is less electronegative than oxygen, so its lone pair is more available for attack on the δ+ carbonyl carbon; the oxygen lone pair is also partly delocalised into the ring. The amine group is therefore the stronger nucleophile and reacts first." }),
      P.manual({ label: "(g)", marks: 3, stem: "Give two by-products of the route (one inorganic, one organic) and one safety precaution for step 3.", points: ["Inorganic: HCl (from step 3) or water (step 1/2) or tin salts", "Organic: 2-nitrophenol (or 2-aminophenol, or the ester from O-acylation)", "Ethanoyl chloride is corrosive and fumes in moist air (HCl): use a fume cupboard, gloves and eye protection"], modelAnswer: "HCl forms in step 3, and 2-nitrophenol forms in step 1 (leading to 2-aminophenol in step 2). Ethanoyl chloride reacts vigorously with water releasing HCl fumes, so step 3 should be done in a fume cupboard wearing gloves and eye protection." }),
    ],
    hints: ["–OH is an activating, 2,4-directing group.", "Percentage yield = actual ÷ maximum × 100."],
    explanation: `E is 4-nitrophenol (isomer 2-nitrophenol); step 1 yield ${sfStr(y, 3)}%; F is 4-aminophenol; the amine group is acylated in step 3.`,
  });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound G, C₆H₅CH₂COOH, is to be converted into compound H, C₆H₅CH₂CONHCH₂CH₃.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name a reagent that converts G into its acyl chloride.", accepted: ["SOCl2", "thionyl chloride", "PCl5", "phosphorus pentachloride", "phosphorus(V) chloride", "PCl3", "phosphorus trichloride", "phosphorus(III) chloride"], wrong: ["HCl"], explanation: "SOCl₂, PCl₅ or PCl₃ (with heat)." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the reagent that converts the acyl chloride into H.", accepted: ["ethylamine", "ethanamine", "CH3CH2NH2", "C2H5NH2"], wrong: ["ammonia"], explanation: "Ethylamine forms the N-ethyl amide." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which type of reaction occurs between the acyl chloride and the reagent in (b)?", options: [
        ["addition-elimination", "Correct: the amine adds to C=O, then Cl⁻ and H⁺ are lost."],
        ["electrophilic addition", "The amine is a nucleophile."],
        ["free-radical substitution", "No radicals are involved."],
        ["reduction", "No hydrogen is added to the carbonyl group."],
      ], answer: "A", explanation: "Acyl chlorides react with nucleophiles by addition-elimination." }),
      P.manual({ label: "(d)", marks: 2, stem: "H is heated with LiAlH₄. Give the structural formula of the product and state the change this would make to the infrared spectrum.", points: ["C₆H₅CH₂CH₂NHCH₂CH₃ (the C=O becomes CH₂)", "The amide C=O absorption (1640-1690 cm⁻¹) disappears (N–H at 3300-3500 cm⁻¹ remains)"], modelAnswer: "LiAlH₄ reduces the amide to the secondary amine C₆H₅CH₂CH₂NHCH₂CH₃. The amide C=O absorption at 1640-1690 cm⁻¹ disappears, while an N–H absorption at 3300-3500 cm⁻¹ remains." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest a three-step route that makes G from methylbenzene, giving reagents and conditions.", points: ["Cl₂ in UV light gives C₆H₅CH₂Cl", "KCN in ethanol, heat under reflux, gives C₆H₅CH₂CN", "Dilute HCl (or NaOH then acid), heat under reflux, gives C₆H₅CH₂COOH"], modelAnswer: "1. Chlorine in UV light gives (chloromethyl)benzene. 2. KCN in ethanol under reflux gives phenylethanenitrile. 3. Heating under reflux with dilute hydrochloric acid hydrolyses the nitrile to G." }),
    ],
    hints: ["Amides come from acyl chlorides.", "The side chain of G has one more carbon than methylbenzene."],
    explanation: "G → acyl chloride (SOCl₂) → H (ethylamine, addition-elimination); LiAlH₄ gives the secondary amine; G comes from methylbenzene via Cl₂/UV, KCN, hydrolysis.",
  });
  b.card("CONCEPT", "New C–C bonds at A Level", "Friedel-Crafts alkylation (RCl/AlCl₃) and acylation (RCOCl/AlCl₃), plus the AS cyanide reactions.");
  b.card("FACT", "Nitrobenzene → phenylamine", "Sn + concentrated HCl, heat under reflux, then NaOH(aq) to free the amine.");
  b.card("FACT", "Diazotisation and coupling", "NaNO₂ + dilute HCl below 10 °C gives C₆H₅N₂⁺; couple with phenol in NaOH(aq) to give an azo dye.");
  b.card("FACT", "Amines from nitriles and amides", "RCN → RCH₂NH₂ with LiAlH₄ or H₂/Ni; RCONH₂ → RCH₂NH₂ with LiAlH₄.");
  b.card("FACT", "Esters of phenol", "Use an acyl chloride: CH₃COCl + C₆H₅OH → CH₃COOC₆H₅ + HCl. Carboxylic acids react too slowly.");
  b.card("FACT", "Side chain to COOH", "Alkylbenzene + hot alkaline KMnO₄, then dilute acid → benzoic acid.");
  b.card("CONCEPT", "Racemic products", "A chiral centre formed by attack on a planar C=O (or carbocation) gives a racemic mixture.");
  b.card("CONCEPT", "Ring vs chain amines", "Ring NH₂: from NO₂ by reduction. Chain NH₂: halogenoalkane + NH₃, or reduce a nitrile or amide.");
  b.card("FACT", "Friedel-Crafts problems", "Catalyst must be anhydrous; alkylation can over-alkylate because alkylbenzenes are more reactive.");
});
