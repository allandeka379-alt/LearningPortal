// W4a: achem.carboxylic.acyl-chlorides (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, molesFromSolution, percentYield, VM_RTP, sfStr, sciStr } from "../lib.mjs";

concept("achem.carboxylic.acyl-chlorides", { file: "carboxylic/acyl-chlorides", keyPrefix: "carboxylic.acyl-chlorides" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is observed when a few drops of ethanoyl chloride are added to water?",
    options: [
      ["a vigorous reaction with steamy fumes of hydrogen chloride", "Correct: hydrolysis is rapid and releases HCl."],
      ["no reaction until the mixture is heated under reflux", "Acyl chlorides react with water at room temperature."],
      ["a pale yellow precipitate with an antiseptic smell", "That describes CHI₃ from the iodoform test."],
      ["a white precipitate of silver chloride", "Silver nitrate would be needed for AgCl to form."],
    ],
    answer: "A",
    explanation: "CH₃COCl + H₂O → CH₃COOH + HCl.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which product forms when propanoyl chloride reacts with methanol?",
    options: [
      ["methyl propanoate", "Correct: the acyl chloride acylates the alcohol, giving an ester."],
      ["propyl methanoate", "The acyl part (with C=O) comes from propanoyl chloride."],
      ["propanamide", "An amide needs ammonia, not an alcohol."],
      ["propanoic acid", "That forms with water."],
    ],
    answer: "A",
    explanation: "CH₃CH₂COCl + CH₃OH → CH₃CH₂COOCH₃ + HCl.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which organic product forms when ethanoyl chloride reacts with methylamine, CH₃NH₂?",
    options: [
      ["N-methylethanamide, CH₃CONHCH₃", "Correct: an N-substituted amide."],
      ["ethanamide, CH₃CONH₂", "That forms with ammonia, not with methylamine."],
      ["methyl ethanoate, CH₃COOCH₃", "An ester forms with methanol, not methylamine."],
      ["ethylmethylamine, CH₃CH₂NHCH₃", "No amine forms; the C=O group remains."],
    ],
    answer: "A",
    explanation: "CH₃COCl + 2CH₃NH₂ → CH₃CONHCH₃ + CH₃NH₃⁺Cl⁻.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is phenyl benzoate made from benzoyl chloride rather than from benzoic acid?",
    options: [
      ["Phenol reacts too slowly with carboxylic acids, but rapidly with acyl chlorides.", "Correct: phenol is a poor nucleophile towards acids."],
      ["Benzoic acid is too strong an acid to form any ester with phenol at all.", "Acid strength is not the reason; the reaction is simply too slow."],
      ["Benzoyl chloride is cheaper and safer to handle than benzoic acid is.", "It is more expensive and more hazardous, but far more reactive."],
      ["Phenol would be oxidised by the concentrated sulfuric acid catalyst.", "Even without oxidation, the acid reaction is far too slow."],
    ],
    answer: "A",
    hints: ["Compare the reactivity of RCOOH and RCOCl."],
    explanation: "C₆H₅COCl + C₆H₅OH → C₆H₅COOC₆H₅ + HCl.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "In the reaction of ethanoyl chloride with water, what is the first step of the mechanism?",
    options: [
      ["A lone pair on the water oxygen attacks the carbonyl carbon as the π electrons move to O.", "Correct: nucleophilic addition gives a tetrahedral intermediate."],
      ["The C–Cl bond breaks first, giving an acylium ion that water then attacks.", "That would be an SN1-like path; the accepted mechanism is addition-elimination."],
      ["A hydrogen atom of the water molecule attacks the δ− carbonyl oxygen atom.", "Water acts as a nucleophile through its oxygen lone pair."],
      ["Chloride ions leave first and then attack the hydrogen atoms of water molecules.", "Cl⁻ is lost later; it does not start the reaction."],
    ],
    answer: "A",
    hints: ["Which atom is δ+ in the acyl chloride?"],
    explanation: "Addition first, then elimination of Cl⁻ and H⁺.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements explain why ethanoyl chloride is hydrolysed more easily than chloroethane?\n\n1. Its carbonyl carbon is bonded to two electronegative atoms, so it is more δ+.\n2. Its carbonyl carbon is planar, so a nucleophile can approach easily.\n3. Its C–Cl bond has partial double-bond character.",
    options: [
      ["1 and 2 only", "Correct: statement 3 describes chlorobenzene, not acyl chlorides."],
      ["1, 2 and 3", "Statement 3 applies to aryl chlorides."],
      ["2 and 3 only", "Statement 1 is a reason; statement 3 is not."],
      ["1 only", "Statement 2 is also a reason."],
    ],
    answer: "A",
    hints: ["Which compound has a C–Cl bond strengthened by delocalisation?"],
    explanation: "Strongly δ+ carbon and accessible planar geometry.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Each compound is shaken with aqueous silver nitrate at room temperature. Which of the compounds give a white precipitate immediately?\n\n1. ethanoyl chloride\n2. 1-chlorobutane\n3. chlorobenzene",
    options: [
      ["1 only", "Correct: only the acyl chloride releases Cl⁻ instantly."],
      ["1 and 2 only", "1-chlorobutane hydrolyses only slowly, on warming."],
      ["2 and 3 only", "These two do not give a precipitate immediately."],
      ["1, 2 and 3", "Chlorobenzene does not hydrolyse at all."],
    ],
    answer: "A",
    hints: ["Order of ease of hydrolysis: acyl > alkyl > aryl."],
    explanation: "Ethanoyl chloride → Cl⁻ at once → AgCl.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which reagent would convert propanoic acid into N,N-dimethylpropanamide, CH₃CH₂CON(CH₃)₂, in two steps?",
    options: [
      ["SOCl₂, then excess dimethylamine, (CH₃)₂NH", "Correct: acyl chloride first, then acylation of the secondary amine."],
      ["SOCl₂, then excess methylamine, CH₃NH₂", "Methylamine gives N-methylpropanamide, with only one methyl on N."],
      ["NaOH(aq), then chloromethane", "This does not make an amide."],
      ["concentrated NH₃, then LiAlH₄", "This route would end with an amine, not an amide."],
    ],
    answer: "A",
    hints: ["How many methyl groups end up on nitrogen?"],
    explanation: "CH₃CH₂COOH → CH₃CH₂COCl → CH₃CH₂CON(CH₃)₂.",
  });
  {
    const m = 1.11;
    const n = moles(m, Mr("C2H5COCl"));
    const v = (2 * n / 0.4) * 1000;
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "1.11 g of propanoyl chloride, CH₃CH₂COCl, is added to water and the solution is titrated with 0.400 mol dm⁻³ sodium hydroxide. Calculate the volume of NaOH, in cm³, needed to neutralise all the acid formed, to three significant figures. Ar: H 1, C 12, O 16, Cl 35.5.",
      value: v, sf: 3, unit: "cm³",
      wrong: [v / 2],
      hints: ["Hydrolysis gives two acids: propanoic acid and HCl."],
      explanation: `1. Mr(C₂H₅COCl) = ${Mr("C2H5COCl").toFixed(1)}; n = 1.11 ÷ ${Mr("C2H5COCl").toFixed(1)} = ${sfStr(n, 3)} mol.\n2. CH₃CH₂COCl + H₂O → CH₃CH₂COOH + HCl: 2 mol of acid per mol, so n(NaOH) = ${sfStr(2 * n, 3)} mol.\n3. V = ${sfStr(2 * n, 3)} ÷ 0.400 = ${sciStr(2 * n / 0.4, 3)} dm³ = ${sfStr(v, 3)} cm³.\n4. Counting only one acid gives ${sfStr(v / 2, 3)} cm³.`,
    });
  }
  {
    const n = moles(3.14, Mr("CH3COCl"));
    const mAm = n * Mr("CH3CONH2");
    const y = percentYield(1.89, mAm);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "3.14 g of ethanoyl chloride reacts with excess concentrated ammonia; 1.89 g of ethanamide, CH₃CONH₂, is isolated. Calculate the percentage yield to three significant figures. Mr: ethanoyl chloride 78.5, ethanamide 59.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(1.89, 3.14)],
      hints: ["1 mol of acyl chloride gives 1 mol of amide."],
      explanation: `1. n(CH₃COCl) = 3.14 ÷ 78.5 = ${sfStr(n, 3)} mol.\n2. Maximum ethanamide = ${sfStr(n, 3)} × 59 = ${sfStr(mAm, 3)} g.\n3. Yield = 1.89 ÷ ${sfStr(mAm, 3)} × 100 = ${sfStr(y, 3)}%.`,
    });
  }
  {
    const n = moles(1.57, Mr("CH3COCl"));
    const v = n * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "1.57 g of ethanoyl chloride (Mr 78.5) reacts completely with dry ethanol. What volume of hydrogen chloride gas, in cm³ at room conditions, is released if none dissolves? (One mole of gas occupies 24.0 dm³.)",
      value: v, sf: 3, unit: "cm³",
      wrong: [n * VM_RTP],
      explanation: `n = 1.57 ÷ 78.5 = ${sfStr(n, 3)} mol of HCl (1 : 1); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Acyl chlorides react with alcohols at room temperature without a catalyst.",
    answer: true,
    explanation: "True: unlike carboxylic acids, they need no acid catalyst or heating.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "The reaction of ethanoyl chloride with ammonia is described as nucleophilic addition-elimination.",
    answer: true,
    hints: ["Think about the intermediate formed."],
    explanation: "True: NH₃ adds to the C=O carbon, then HCl is eliminated (and removed by a second NH₃).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each reagent with the type of product formed with ethanoyl chloride.",
    pairs: [
      ["water", "a carboxylic acid"],
      ["ethanol", "an ester"],
      ["phenol", "a phenyl ester"],
      ["ammonia", "a primary amide"],
      ["ethylamine", "an N-substituted amide"],
    ],
    explanation: "Each nucleophile replaces Cl by OH, OR, OC₆H₅, NH₂ or NHR.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the explanation for chlorobenzene.",
    template: "In chlorobenzene a lone pair on the chlorine atom overlaps with the {{blank:a}} π system of the ring. The C–Cl bond gains partial {{blank:b}} bond character and is {{blank:c}}, so chlorobenzene is not hydrolysed under normal conditions.",
    blanks: [
      { id: "a", accepted: ["delocalised"], choices: ["delocalised", "localised", "ionic"] },
      { id: "b", accepted: ["double"], choices: ["double", "ionic", "hydrogen"] },
      { id: "c", accepted: ["stronger"], choices: ["stronger", "weaker", "longer"] },
    ],
    hints: ["Overlap with the ring strengthens the bond."],
    explanation: "Delocalisation strengthens the C–Cl bond; the electron-rich ring also repels nucleophiles.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Name the compound CH₃CH₂CH₂COCl.",
    accepted: ["butanoyl chloride", "butyryl chloride"],
    wrong: ["propanoyl chloride"],
    explanation: "Four carbons including C=O: butanoyl chloride.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the structural formula of the ester formed when benzoyl chloride, C₆H₅COCl, reacts with phenol (for example CH3COOC2H5).",
    accepted: ["C6H5COOC6H5", "C₆H₅COOC₆H₅", "C6H5CO2C6H5"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["C6H5OCOC6H5Cl"],
    hints: ["The acyl group C₆H₅CO– joins to the oxygen of phenol."],
    explanation: "Phenyl benzoate, C₆H₅COOC₆H₅.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 5,
    stem: "Describe the addition-elimination mechanism for the reaction of ethanoyl chloride with ammonia. Describe each curly arrow and the intermediate.",
    points: ["The carbonyl carbon is δ+ (bonded to O and Cl)", "Arrow from the lone pair on N of NH₃ to the carbonyl carbon; arrow from the C=O π bond to O", "Tetrahedral intermediate with O⁻ and –NH₃⁺ on the same carbon", "Arrow from O⁻ back to reform C=O; arrow from the C–Cl bond to Cl, so Cl⁻ leaves", "H⁺ is removed from N (by a second NH₃ or Cl⁻), giving CH₃CONH₂ (and NH₄Cl)"],
    modelAnswer: "The C=O carbon is δ+ because it is bonded to both oxygen and chlorine. The lone pair on the nitrogen of ammonia attacks this carbon while the π electrons of C=O move onto the oxygen, giving a tetrahedral intermediate CH₃C(O⁻)(Cl)NH₃⁺. A lone pair on O⁻ moves back to reform the C=O bond and the C–Cl bond breaks, releasing Cl⁻. Finally a proton is removed from the nitrogen by a second ammonia molecule, giving ethanamide and ammonium chloride.",
    hints: ["Addition, then elimination, then deprotonation."],
    explanation: "One mark per creditworthy feature.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain the order of ease of hydrolysis: ethanoyl chloride > chloroethane > chlorobenzene.",
    points: ["Ethanoyl chloride: carbonyl carbon bonded to two electronegative atoms (O and Cl), so strongly δ+", "and planar, so nucleophiles attack the π bond easily (addition-elimination, room temperature)", "Chloroethane: less δ+ tetrahedral carbon; the C–Cl bond must break during substitution, so heating with NaOH is needed", "Chlorobenzene: Cl lone pair delocalised into the ring gives C–Cl partial double-bond character (stronger), and the π electron cloud repels nucleophiles, so no hydrolysis"],
    modelAnswer: "In ethanoyl chloride the carbonyl carbon carries two electronegative atoms, making it strongly δ+, and its planar shape lets water attack the π bond directly, so hydrolysis is instant at room temperature. In chloroethane the carbon is only attached to one electronegative atom and is tetrahedral; the strong C–Cl bond must break as the nucleophile attacks, so warm alkali is needed. In chlorobenzene a chlorine lone pair is delocalised into the ring, strengthening the C–Cl bond, and the electron-rich ring repels nucleophiles, so it is not hydrolysed under normal conditions.",
    hints: ["Compare δ+, shape and C–Cl bond strength."],
    explanation: "Structure explains reactivity.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Give one precaution needed when working with ethanoyl chloride and explain why.",
    points: ["Use a fume cupboard (and keep it dry)", "because it reacts with moisture to release toxic, corrosive HCl fumes (and is a lachrymator)"],
    modelAnswer: "Handle it in a fume cupboard with dry apparatus, because it reacts with moisture, including moisture in the air, to give corrosive fumes of hydrogen chloride.",
    hints: ["What does it form with water?"],
    explanation: "HCl fumes are corrosive.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A synthesis scheme starting from ethanoic acid:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | ethanoic acid | reagent A, room temperature | ethanoyl chloride |\n| 2 | ethanoyl chloride | phenol, in NaOH(aq) | B |\n| 3 | ethanoyl chloride | excess ethylamine | C |\n| 4 | ethanoyl chloride | cold water | D |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Suggest reagent A.", accepted: ["PCl5", "phosphorus pentachloride", "phosphorus(V) chloride", "SOCl2", "thionyl chloride", "sulfur dichloride oxide"], wrong: ["HCl"], explanation: "PCl₅ (room temperature) or SOCl₂." }),
      P.short({ label: "(b)", marks: 1, stem: "Name B.", accepted: ["phenyl ethanoate", "phenyl acetate"], wrong: ["ethyl benzoate"], explanation: "CH₃COOC₆H₅, phenyl ethanoate." }),
      P.short({ label: "(c)", marks: 1, stem: "Give the structural formula of C (for example CH3CONH2).", accepted: ["CH3CONHCH2CH3", "CH3CONHC2H5", "CH₃CONHCH₂CH₃", "CH₃CONHC₂H₅"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CONH2"], explanation: "N-ethylethanamide." }),
      P.mcq({ label: "(d)", marks: 1, stem: "Which observation accompanies step 4?", options: [
        ["steamy fumes of HCl", "Correct: hydrolysis releases hydrogen chloride."],
        ["a silver mirror", "That is the Tollens' test for aldehydes."],
        ["an orange precipitate", "That is the 2,4-DNPH result for C=O compounds."],
        ["a purple colour", "No coloured product forms."],
      ], answer: "A", explanation: "CH₃COCl + H₂O → CH₃COOH + HCl." }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why excess ethylamine is used in step 3.", points: ["One mole of ethylamine acts as the nucleophile, forming the amide", "the second reacts with the HCl formed (as a base), giving CH₃CH₂NH₃⁺Cl⁻"], modelAnswer: "The first ethylamine molecule attacks the acyl chloride to form the amide; a second molecule acts as a base and reacts with the hydrogen chloride produced, forming ethylammonium chloride." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why B cannot be made in good yield by heating phenol with ethanoic acid and a sulfuric acid catalyst.", points: ["Phenol is a much weaker nucleophile than an alcohol (O lone pair delocalised into the ring)", "so the reaction with the less reactive carboxylic acid is far too slow (and reversible); the acyl chloride is much more reactive"], modelAnswer: "Phenol's oxygen lone pair is partly delocalised into the ring, so it is a poor nucleophile; with ethanoic acid the reaction is far too slow and reversible. The acyl chloride, with its very δ+ carbon, reacts quickly and completely." }),
    ],
    hints: ["Acyl chlorides react with any nucleophile containing O–H or N–H."],
    explanation: "A PCl₅/SOCl₂; B phenyl ethanoate; C N-ethylethanamide; D ethanoic acid (+ HCl).",
  });

  {
    const nAc = moles(0.785, 78.5);
    const mAg = nAc * 143.4;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: "Rudo added a few drops of three chlorine compounds to separate tubes of aqueous silver nitrate mixed with ethanol, at room temperature, then warmed any tube that showed no change. Her observations:\n\n| Compound | Observation |\n|---|---|\n| ethanoyl chloride | white precipitate immediately, steamy fumes |\n| 1-chlorobutane | white precipitate slowly forms only on warming |\n| chlorobenzene | no precipitate, even after warming |",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the white precipitate.", accepted: ["silver chloride", "AgCl"], wrong: ["silver nitrate"], explanation: "Ag⁺ + Cl⁻ → AgCl(s)." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain the order of reactivity shown by the results.", points: ["Ethanoyl chloride: carbonyl carbon bonded to O and Cl is strongly δ+ and planar, so water attacks quickly (addition-elimination)", "1-chlorobutane: less δ+ carbon; the strong C–Cl bond must break in substitution, so warming is needed", "Chlorobenzene: Cl lone pair delocalised into the ring strengthens C–Cl (partial double bond) and the ring repels nucleophiles, so no hydrolysis"], modelAnswer: "In ethanoyl chloride the carbonyl carbon is attached to two electronegative atoms and is planar, so water adds rapidly and chloride is released at once. In 1-chlorobutane the carbon is less δ+ and the C–Cl bond must break as water attacks, so the reaction is slow and needs warming. In chlorobenzene the chlorine lone pair is delocalised into the ring, giving the C–Cl bond partial double-bond character, and the π electrons repel nucleophiles, so no chloride is released." }),
        P.manual({ label: "(c)", marks: 1, stem: "Write an equation for the reaction of ethanoyl chloride with water.", points: ["CH₃COCl + H₂O → CH₃COOH + HCl"], modelAnswer: "CH₃COCl + H₂O → CH₃COOH + HCl" }),
        P.mcq({ label: "(d)", marks: 1, stem: "Why is ethanol added to the silver nitrate solution?", options: [
          ["The chlorine compounds do not mix with water, but dissolve in ethanol.", "Correct: a common solvent lets the reactants meet."],
          ["Ethanol catalyses the precipitation of silver chloride from the solution.", "Ethanol is a solvent, not a catalyst."],
          ["Ethanol reacts with silver nitrate to release extra chloride ions.", "Ethanol contains no chlorine."],
          ["Ethanol stops the silver chloride from dissolving in the water.", "AgCl is insoluble in water anyway."],
        ], answer: "A", explanation: "Ethanol is a co-solvent." }),
        P.num({ label: "(e)", marks: 2, stem: "Calculate the maximum mass of silver chloride, in g, formed from 0.785 g of ethanoyl chloride (Mr 78.5) with excess silver nitrate. (Mr AgCl 143.4)", value: mAg, sf: 3, unit: "g", wrong: [mAg * 2], explanation: `n = 0.785 ÷ 78.5 = ${sfStr(nAc, 3)} mol of Cl⁻; mass AgCl = ${sfStr(nAc, 3)} × 143.4 = ${sfStr(mAg, 3)} g.` }),
      ],
      hints: ["Compare the δ+ charge, shape and C–Cl bond strength."],
      explanation: `AgCl; acyl > alkyl > aryl; ethanol as co-solvent; ${sfStr(mAg, 3)} g AgCl.`,
    });
  }
  b.card("DEFINITION", "Acyl chloride", "Contains –COCl; named -oyl chloride, e.g. CH₃COCl ethanoyl chloride.");
  b.card("FORMULA", "Acyl chloride + water", "RCOCl + H₂O → RCOOH + HCl (room temperature, steamy fumes).");
  b.card("FORMULA", "Acyl chloride + alcohol", "RCOCl + R′OH → RCOOR′ + HCl (room temperature, goes to completion).");
  b.card("FORMULA", "Acyl chloride + ammonia", "RCOCl + 2NH₃ → RCONH₂ + NH₄Cl");
  b.card("FORMULA", "Acyl chloride + primary amine", "RCOCl + 2R′NH₂ → RCONHR′ + R′NH₃⁺Cl⁻");
  b.card("FACT", "Making phenyl esters", "Phenol + acyl chloride (in NaOH(aq)): e.g. phenyl benzoate from benzoyl chloride; not possible directly from the acid.");
  b.card("CONCEPT", "Addition-elimination mechanism", "Nucleophile adds to δ+ C=O carbon (tetrahedral intermediate); C=O reforms, Cl⁻ leaves; H⁺ lost.");
  b.card("CONCEPT", "Ease of hydrolysis", "Acyl chloride (cold water) > alkyl chloride (warm NaOH) > aryl chloride (none).");
  b.card("CONCEPT", "Why aryl chlorides resist hydrolysis", "Cl lone pair delocalised into the ring: C–Cl partial double bond; π cloud repels nucleophiles.");
});
