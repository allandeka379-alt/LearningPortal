// W4a: achem.amines.amides (both boards; ZIMSEC Form 6, Cambridge A Level only)
import { concept, P, t, Mr, moles, molesFromSolution, percentPurity, VM_RTP, sfStr, sciStr } from "../lib.mjs";

concept("achem.amines.amides", { file: "amines/amides", keyPrefix: "amines.amides" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of CH₃CONHCH₃?",
    options: [
      ["N-methylethanamide", "Correct: ethanamide with a methyl group on nitrogen."],
      ["N-ethylmethanamide", "The acyl part (with C=O) has two carbons: ethanamide."],
      ["propanamide", "Propanamide is CH₃CH₂CONH₂, a primary amide."],
      ["dimethylamine", "That is an amine with no C=O group."],
    ],
    answer: "A",
    explanation: "Acyl part CH₃CO– → ethanamide; CH₃ on N → N-methyl.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which reagents form propanamide at room temperature?",
    options: [
      ["propanoyl chloride and concentrated ammonia", "Correct: CH₃CH₂COCl + 2NH₃ → CH₃CH₂CONH₂ + NH₄Cl."],
      ["propanoic acid and ammonia gas at room temperature", "The acid only forms an ammonium salt at room temperature."],
      ["propanenitrile and LiAlH₄", "Reduction of a nitrile gives propylamine."],
      ["propanal and ammonia", "Aldehydes do not form amides with ammonia."],
    ],
    answer: "A",
    explanation: "Acyl chlorides react rapidly with ammonia to give primary amides.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What are the products when ethanamide is heated under reflux with dilute hydrochloric acid?",
    options: [
      ["ethanoic acid and ammonium chloride", "Correct: acid hydrolysis gives the free acid and an ammonium salt."],
      ["sodium ethanoate and ammonia", "These form with NaOH(aq)."],
      ["ethylamine and water", "Ethylamine forms by reduction with LiAlH₄."],
      ["ethanoyl chloride and ammonium chloride", "Hydrolysis does not form an acyl chloride."],
    ],
    answer: "A",
    explanation: "CH₃CONH₂ + H₂O + HCl → CH₃COOH + NH₄Cl.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is ethanamide a much weaker base than ethylamine?",
    options: [
      ["The nitrogen lone pair is delocalised over the C=O group.", "Correct: it is much less available to accept a proton."],
      ["Ethanamide has no lone pair on nitrogen.", "Nitrogen still has a lone pair, but it is delocalised."],
      ["The ethyl group in ethylamine withdraws electrons from N.", "Alkyl groups donate electron density; this makes ethylamine stronger."],
      ["Ethanamide is insoluble in water, so it cannot accept protons.", "Ethanamide dissolves in water; solubility is not the reason."],
    ],
    answer: "A",
    hints: ["What is the nitrogen bonded to in an amide?"],
    explanation: "N lone pair overlaps with the C=O π bond, drawn towards electronegative O.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the compounds are secondary amides?\n\n1. CH₃CH₂CONHCH₃\n2. C₆H₅CONHC₂H₅\n3. CH₃CON(CH₃)₂",
    options: [
      ["1 and 2 only", "Correct: each has one carbon group on N; compound 3 has two (tertiary)."],
      ["1, 2 and 3", "CH₃CON(CH₃)₂ has two carbon groups on N: a tertiary amide."],
      ["2 and 3 only", "Compound 1 is secondary; compound 3 is tertiary."],
      ["1 only", "Compound 2 is also secondary."],
    ],
    answer: "A",
    hints: ["Count the carbon groups on nitrogen."],
    explanation: "RCONHR′ is secondary; RCONR′R″ is tertiary.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "What are the products when N-ethylpropanamide, CH₃CH₂CONHCH₂CH₃, is heated under reflux with NaOH(aq)?",
    options: [
      ["sodium propanoate and ethylamine", "Correct: the acyl side becomes the carboxylate; the N side is released as the amine."],
      ["propanoic acid and ethylammonium chloride", "These form in acid, not alkali."],
      ["sodium ethanoate and propylamine", "The C=O is on the three-carbon side, so the acid part is propanoate."],
      ["propylamine and ethanol", "Hydrolysis does not form an alcohol from the amide link."],
    ],
    answer: "A",
    hints: ["Break the C–N bond; which side carries the C=O?"],
    explanation: "CH₃CH₂CONHC₂H₅ + NaOH → CH₃CH₂COONa + C₂H₅NH₂.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which amide gives N-methylpropylamine, CH₃CH₂CH₂NHCH₃, when reduced with LiAlH₄?",
    options: [
      ["N-methylpropanamide, CH₃CH₂CONHCH₃", "Correct: C=O becomes CH₂, keeping the N-methyl group."],
      ["N-methylethanamide, CH₃CONHCH₃", "This gives CH₃CH₂NHCH₃, which has one carbon fewer."],
      ["propanamide, CH₃CH₂CONH₂", "This gives the primary amine propylamine."],
      ["N,N-dimethylethanamide, CH₃CON(CH₃)₂", "This gives a tertiary amine, CH₃CH₂N(CH₃)₂."],
    ],
    answer: "A",
    hints: ["Reduction changes C=O to CH₂ and keeps every N–C bond."],
    explanation: "CH₃CH₂CONHCH₃ + 4[H] → CH₃CH₂CH₂NHCH₃ + H₂O.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about amides are correct?\n\n1. Ethanamide is reduced to ethylamine by LiAlH₄.\n2. Ethanamide is hydrolysed rapidly by cold water.\n3. A tertiary amine reacts with ethanoyl chloride to form an amide.",
    options: [
      ["1 only", "Correct: amides need boiling acid or alkali, and tertiary amines have no N–H."],
      ["1 and 2 only", "Amides are hydrolysed only slowly, on heating with acid or alkali."],
      ["2 and 3 only", "Both statements 2 and 3 are false: amides need hot acid or alkali, and tertiary amines have no N–H."],
      ["1, 2 and 3", "Statements 2 and 3 are false."],
    ],
    answer: "A",
    hints: ["Compare the reactivity of amides with acyl chlorides."],
    explanation: "Only statement 1 is true.",
  });
  {
    const nHCl = molesFromSolution(40, 0.6);
    const nOH = molesFromSolution(25.1, 0.55);
    const nNH3 = nHCl - nOH;
    const pure = nNH3 * Mr("CH3CH2CONH2");
    const pct = percentPurity(pure, 0.8);
    b.calc({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: "A 0.800 g sample of impure propanamide, CH₃CH₂CONH₂, is boiled with excess NaOH(aq). The ammonia released is absorbed in 40.0 cm³ of 0.600 mol dm⁻³ HCl. The unreacted HCl needs 25.10 cm³ of 0.550 mol dm⁻³ NaOH. Calculate the percentage purity of the propanamide, to three significant figures. Ar: H 1, C 12, N 14, O 16.",
      value: pct, sf: 3, unit: "%",
      wrong: [percentPurity(nOH * Mr("CH3CH2CONH2"), 0.8)],
      hints: ["Moles of HCl used by NH₃ = HCl at start − HCl left over.", "1 mol amide gives 1 mol NH₃."],
      explanation: `1. n(HCl) at start = 0.0400 × 0.600 = ${sciStr(nHCl, 3)} mol.\n2. n(HCl) left = n(NaOH) = 0.02510 × 0.550 = ${sciStr(nOH, 3)} mol.\n3. n(NH₃) = ${sciStr(nHCl, 3)} − ${sciStr(nOH, 3)} = ${sciStr(nNH3, 3)} mol = n(propanamide).\n4. Mr(C₂H₅CONH₂) = 73; mass = ${sciStr(nNH3, 3)} × 73 = ${sfStr(pure, 3)} g.\n5. Purity = ${sfStr(pure, 3)} ÷ 0.800 × 100 = ${sfStr(pct, 3)}%. Using the NaOH moles directly gives ${sfStr(percentPurity(nOH * 73, 0.8), 3)}%.`,
    });
  }
  {
    const n = moles(2.95, Mr("CH3CONH2"));
    const v = n * VM_RTP * 1000;
    b.num({
      d: 2, skill: "APPLICATION", calculator: true, daily: true,
      stem: "2.95 g of ethanamide (Mr 59) is completely hydrolysed by boiling with excess NaOH(aq). What volume of ammonia, in cm³ at room conditions, is released? (One mole of gas occupies 24.0 dm³.)",
      value: v, sf: 3, unit: "cm³",
      wrong: [n * VM_RTP],
      explanation: `n = 2.95 ÷ 59 = ${sfStr(n, 3)} mol of NH₃ (1 : 1); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  {
    const n = moles(4.72, Mr("CH3COCl"));
    const m = n * Mr("CH3CONHCH3");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "4.72 g of ethanoyl chloride reacts with excess methylamine. Calculate the maximum mass of N-methylethanamide, CH₃CONHCH₃, in g, to three significant figures. Mr: ethanoyl chloride 78.5, N-methylethanamide 73.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("CH3CONH2")],
      hints: ["1 mol acyl chloride gives 1 mol amide."],
      explanation: `1. Mr(CH₃COCl) = 78.5; n = 4.72 ÷ 78.5 = ${sfStr(n, 3)} mol.\n2. Mr(CH₃CONHCH₃) = 73; mass = ${sfStr(n, 3)} × 73 = ${sfStr(m, 3)} g.\n3. Using ethanamide (Mr 59) gives ${sfStr(n * 59, 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Aqueous ethanamide turns damp red litmus paper blue as strongly as aqueous ethylamine does.",
    answer: false,
    explanation: "False: ethanamide is almost neutral because its N lone pair is delocalised over C=O.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Alkaline hydrolysis of ethanamide releases ammonia gas.",
    answer: true,
    explanation: "True: CH₃CONH₂ + NaOH → CH₃COONa + NH₃.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each reaction of N-methylethanamide with its products.",
    pairs: [
      ["dilute HCl, heat under reflux", "ethanoic acid and methylammonium chloride"],
      ["NaOH(aq), heat under reflux", "sodium ethanoate and methylamine"],
      ["LiAlH₄ in dry ether", "N-methylethylamine (CH₃CH₂NHCH₃) and water"],
    ],
    extraRight: ["ethanoyl chloride and methylamine"],
    hints: ["Acid protonates the nitrogen product; alkali deprotonates the acid."],
    explanation: "Hydrolysis breaks the C–N bond; reduction keeps it.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about amides.",
    template: "Amides are made from an acyl chloride and {{blank:a}} or an amine at room temperature. LiAlH₄ reduces amides to {{blank:b}}. Amides are very weak bases because the nitrogen lone pair is {{blank:c}} over the C=O group.",
    blanks: [
      { id: "a", accepted: ["ammonia"], choices: ["ammonia", "water", "ethanol"] },
      { id: "b", accepted: ["amines"], choices: ["amines", "alcohols", "nitriles"] },
      { id: "c", accepted: ["delocalised"], choices: ["delocalised", "localised", "removed"] },
    ],
    explanation: "Formation, reduction and the weak basicity of amides.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: "Give the structural formula of N,N-dimethylpropanamide (for example CH3CONH2).",
    accepted: ["CH3CH2CON(CH3)2", "CH₃CH₂CON(CH₃)₂", "C2H5CON(CH3)2"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["CH3CH2CONHCH3"],
    explanation: "Propanamide (CH₃CH₂CO–) with two methyl groups on N.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why ethylamine is a base but ethanamide is almost neutral.",
    points: ["In ethylamine the N lone pair is available (increased by the electron-donating ethyl group) to accept a proton", "In ethanamide the N lone pair is delocalised over the adjacent C=O group (overlaps with the C=O π bond)", "and the electronegative O draws electron density away, so the lone pair is much less available"],
    modelAnswer: "The lone pair on nitrogen in ethylamine is readily available, and the ethyl group pushes electron density onto it, so it accepts protons. In ethanamide the nitrogen is bonded to the C=O carbon; its lone pair overlaps with the carbonyl π bond and is drawn towards the electronegative oxygen, so it is hardly available to accept a proton.",
    hints: ["What is next to the nitrogen in each compound?"],
    explanation: "Delocalisation over C=O removes basicity.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "The amide C₆H₅CONHCH₃ is heated under reflux (i) with dilute hydrochloric acid and (ii) with sodium hydroxide solution. Give the names or formulae of all the products in each case.",
    points: ["(i) Benzoic acid, C₆H₅COOH", "(i) Methylammonium chloride, CH₃NH₃⁺Cl⁻", "(ii) Sodium benzoate, C₆H₅COONa", "(ii) Methylamine, CH₃NH₂"],
    modelAnswer: "(i) Benzoic acid and methylammonium chloride. (ii) Sodium benzoate and methylamine.",
    hints: ["Break the C–N bond of the amide link."],
    explanation: "Acid side and amine side, each in the form suited to the conditions.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Write an equation for the formation of N-ethylethanamide from ethanoyl chloride and state the conditions.",
    points: ["CH₃COCl + 2CH₃CH₂NH₂ → CH₃CONHCH₂CH₃ + CH₃CH₂NH₃⁺Cl⁻", "Room temperature (excess ethylamine)"],
    modelAnswer: "CH₃COCl + 2CH₃CH₂NH₂ → CH₃CONHCH₂CH₃ + CH₃CH₂NH₃⁺Cl⁻, at room temperature with excess ethylamine.",
    hints: ["Two moles of amine are needed."],
    explanation: "Acylation of an amine.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound V, C₄H₉NO, is a neutral solid. When V is boiled with NaOH(aq), a gas that turns damp red litmus blue is given off, and the solution contains sodium propanoate. V can be made by reacting propanoyl chloride with an amine W.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify the gas (it is an amine).", accepted: ["methylamine", "CH3NH2", "CH₃NH₂", "methanamine"], wrong: ["ammonia"], explanation: "C₄H₉NO − C₃H₅O (propanoyl) leaves CH₃NH: the amine is methylamine." }),
      P.short({ label: "(b)", marks: 1, stem: "Give the structural formula of V (for example CH3CONH2).", accepted: ["CH3CH2CONHCH3", "CH₃CH₂CONHCH₃", "C2H5CONHCH3"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CH2CONH2"], explanation: "N-methylpropanamide." }),
      P.short({ label: "(c)", marks: 1, stem: "Name V.", accepted: ["N-methylpropanamide", "n-methylpropanamide", "N methylpropanamide"], wrong: ["N-propylmethanamide"], explanation: "N-methylpropanamide." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What type of amide is V?", options: [
        ["secondary", "Correct: one carbon group on nitrogen."],
        ["primary", "A primary amide has –CONH₂."],
        ["tertiary", "A tertiary amide has two carbon groups on N."],
        ["quaternary", "There is no such class of amides."],
      ], answer: "A", explanation: "RCONHR′." }),
      P.manual({ label: "(e)", marks: 2, stem: "Write an equation for the formation of V from propanoyl chloride and W.", points: ["CH₃CH₂COCl + CH₃NH₂ → CH₃CH₂CONHCH₃ + HCl", "with a second CH₃NH₂ forming CH₃NH₃⁺Cl⁻ (2 mol of amine overall)"], modelAnswer: "CH₃CH₂COCl + 2CH₃NH₂ → CH₃CH₂CONHCH₃ + CH₃NH₃⁺Cl⁻" }),
      P.manual({ label: "(f)", marks: 2, stem: "V is reduced with LiAlH₄. Give the structural formula of the product and explain whether the product is basic.", points: ["CH₃CH₂CH₂NHCH₃ (N-methylpropylamine)", "It is basic (a secondary amine): the N lone pair is no longer delocalised over C=O, and alkyl groups increase its availability"], modelAnswer: "CH₃CH₂CH₂NHCH₃. It is basic: with the C=O removed, the nitrogen lone pair is no longer delocalised and the two alkyl groups push electron density onto it." }),
    ],
    hints: ["Subtract the propanoyl group from the formula of V."],
    explanation: "V is N-methylpropanamide; the gas is methylamine; reduction gives a basic secondary amine.",
  });

  {
    const m = 0.03 * 151;
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Paracetamol, a common painkiller, has the structure HOC₆H₄NHCOCH₃ (the –OH and –NHCOCH₃ groups are on opposite sides of the benzene ring). It can be made by reacting 4-aminophenol, HOC₆H₄NH₂, with an acylating agent.",
      parts: [
        P.manual({ label: "(a)", marks: 1, stem: "Identify the amide group in paracetamol and state whether it is a primary, secondary or tertiary amide.", points: ["–NH–CO– group; secondary amide (one carbon group, the ring, on N)"], modelAnswer: "The –NH–CO– group; it is a secondary amide." }),
        P.short({ label: "(b)", marks: 1, stem: "Name an acyl chloride that would convert 4-aminophenol into paracetamol.", accepted: ["ethanoyl chloride", "acetyl chloride", "CH3COCl"], wrong: ["benzoyl chloride"], explanation: "CH₃COCl acylates the –NH₂ group." }),
        P.manual({ label: "(c)", marks: 2, stem: "Paracetamol is heated under reflux with dilute hydrochloric acid. Give the two organic products.", points: ["Ethanoic acid, CH₃COOH", "4-hydroxyphenylammonium chloride, HOC₆H₄NH₃⁺Cl⁻ (the amine as its salt)"], modelAnswer: "Ethanoic acid and 4-hydroxyphenylammonium chloride (4-aminophenol as its hydrochloride salt)." }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the maximum mass of paracetamol, C₈H₉NO₂ (Mr 151), that can be made from 0.0300 mol of 4-aminophenol.", value: m, sf: 3, unit: "g", wrong: [0.03 * 109], explanation: `1 : 1, so 0.0300 × 151 = ${sfStr(m, 3)} g.` }),
      ],
      hints: ["Hydrolysis breaks the C–N bond of the amide link."],
      explanation: `Secondary amide; ethanoyl chloride; ethanoic acid + 4-hydroxyphenylammonium chloride; ${sfStr(m, 3)} g.`,
    });
  }
  b.card("DEFINITION", "Amide", "N bonded to a C=O carbon: –CONH₂ (primary), –CONHR (secondary), –CONR₂ (tertiary).");
  b.card("CONCEPT", "Naming amides", "Acid name -oic acid → -amide; groups on N shown with N-: CH₃CONHCH₃ = N-methylethanamide.");
  b.card("FACT", "Making amides", "Acyl chloride + ammonia or a primary/secondary amine at room temperature (2 mol of the nitrogen compound).");
  b.card("FORMULA", "Acid hydrolysis of an amide", "RCONH₂ + H₂O + HCl → RCOOH + NH₄Cl (reflux).");
  b.card("FORMULA", "Alkaline hydrolysis of an amide", "RCONH₂ + NaOH → RCOONa + NH₃ (reflux).");
  b.card("FACT", "Reducing an amide", "LiAlH₄ in dry ether: RCONH₂ + 4[H] → RCH₂NH₂ + H₂O.");
  b.card("CONCEPT", "Why amides are very weak bases", "The N lone pair is delocalised over the adjacent C=O group, so it is not available to accept H⁺.");
  b.card("CONCEPT", "Deducing hydrolysis products", "Break the C–N bond: C=O side → acid (carboxylate in alkali); N side → amine/ammonia (ammonium salt in acid).");
});
