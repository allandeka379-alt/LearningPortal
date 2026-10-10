// W4a: achem.hydroxy.alcohol-reactions (both boards; ZIMSEC Form 6, Cambridge AS Level) ★ free preview lesson
import { concept, P, t, Mr, moles, VM_RTP, percentYield, sfStr, chk } from "../lib.mjs";

concept("achem.hydroxy.alcohol-reactions", { file: "hydroxy/alcohol-reactions", keyPrefix: "hydroxy.alcohol-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What colour change is seen when acidified potassium dichromate(VI) oxidises propan-1-ol?",
    options: [
      ["orange to green", "Correct: Cr₂O₇²⁻ (orange) is reduced to Cr³⁺ (green)."],
      ["purple to colourless", "This is the change for acidified manganate(VII)."],
      ["green to orange", "This is the reverse: dichromate(VI) is reduced, not formed."],
      ["orange to colourless", "Cr³⁺ ions are green, so the solution does not become colourless."],
    ],
    answer: "A",
    explanation: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O: orange to green.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Ethanol is warmed with acidified potassium dichromate(VI) and the product is distilled off immediately. What is the main organic product?",
    options: [
      ["ethanal", "Correct: distilling removes the aldehyde before it is oxidised further."],
      ["ethanoic acid", "The acid forms when the mixture is heated under reflux."],
      ["ethene", "Ethene forms by dehydration, not by oxidation."],
      ["ethyl ethanoate", "An ester needs a carboxylic acid and a concentrated H₂SO₄ catalyst."],
    ],
    answer: "A",
    explanation: "CH₃CH₂OH + [O] → CH₃CHO + H₂O; ethanal (bp 21 °C) distils out.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which reagent converts propan-1-ol into 1-chloropropane at room temperature, giving steamy fumes?",
    options: [
      ["phosphorus(V) chloride, PCl₅", "Correct: ROH + PCl₅ → RCl + POCl₃ + HCl (steamy fumes)."],
      ["sodium chloride solution", "Chloride ions alone do not substitute the –OH group."],
      ["chlorine gas in ultraviolet light", "This causes free-radical substitution of C–H bonds, not replacement of –OH."],
      ["dilute hydrochloric acid at room temperature", "Dilute HCl does not react with primary alcohols in the cold."],
    ],
    answer: "A",
    explanation: "PCl₅ reacts in the cold; HCl fumes are seen.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which alcohol gives a pale yellow precipitate when warmed with alkaline aqueous iodine?",
    options: [
      ["butan-2-ol", "Correct: it contains CH₃CH(OH)–."],
      ["butan-1-ol", "The C–OH carbon is not next to a CH₃ group."],
      ["methanol", "Methanol has only one carbon, so it has no CH₃CH(OH)– group."],
      ["2-methylpropan-2-ol", "Tertiary: the C–OH carbon has no H, so it cannot be oxidised to CH₃CO–."],
    ],
    answer: "A",
    explanation: "CH₃CH(OH)CH₂CH₃ is oxidised to CH₃COCH₂CH₃, which gives CHI₃.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which reducing agent will convert ethanoic acid into ethanol?",
    options: [
      ["lithium tetrahydridoaluminate, LiAlH₄, in dry ether", "Correct: LiAlH₄ reduces carboxylic acids to primary alcohols."],
      ["sodium tetrahydridoborate, NaBH₄, in water", "NaBH₄ reduces aldehydes and ketones but is too weak for carboxylic acids."],
      ["acidified potassium dichromate(VI), heated", "This is an oxidising agent, not a reducing agent."],
      ["hydrogen with a nickel catalyst at 150 °C", "This hydrogenates C=C bonds; it does not reduce the COOH group."],
    ],
    answer: "A",
    hints: ["Which hydride reagent is the stronger?"],
    explanation: "CH₃COOH + 4[H] → CH₃CH₂OH + H₂O with LiAlH₄ in dry ether.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about propan-2-ol are correct?\n\n1. It is oxidised to propanone by acidified dichromate(VI).\n2. It gives a pale yellow precipitate with alkaline iodine.\n3. It is dehydrated to propene by heated aluminium oxide.",
    options: [
      ["1, 2 and 3", "Correct: secondary alcohol, contains CH₃CH(OH)–, and can lose water."],
      ["1 and 2 only", "Statement 3 is also true: CH₃CH(OH)CH₃ → CH₃CH=CH₂ + H₂O."],
      ["2 and 3 only", "Statement 1 is also true: secondary alcohols give ketones."],
      ["1 only", "Statements 2 and 3 are also true."],
    ],
    answer: "A",
    hints: ["Check each reaction separately."],
    explanation: "All three reactions occur with propan-2-ol.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements about 2-methylpropan-2-ol are correct?\n\n1. It reacts with sodium, giving hydrogen.\n2. It is oxidised to a ketone by acidified dichromate(VI).\n3. It gives tri-iodomethane with alkaline iodine.",
    options: [
      ["1 only", "Correct: it has an O–H bond but no H on the C–OH carbon."],
      ["1 and 2 only", "Tertiary alcohols are not oxidised by dichromate(VI)."],
      ["2 and 3 only", "Neither reaction occurs: the C–OH carbon carries no hydrogen."],
      ["1, 2 and 3", "Only statement 1 is true."],
    ],
    answer: "A",
    hints: ["What does the C–OH carbon of a tertiary alcohol lack?"],
    explanation: "All alcohols react with Na; tertiary alcohols resist oxidation and so cannot give CHI₃.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "An alcohol C₅H₁₂O is oxidised to a ketone and gives a yellow precipitate with alkaline iodine. Which alcohol is it?",
    options: [
      ["pentan-2-ol", "Correct: secondary, with CH₃CH(OH)–."],
      ["pentan-3-ol", "Secondary, but its C–OH carbon is flanked by two ethyl groups: no CH₃CH(OH)–."],
      ["pentan-1-ol", "A primary alcohol gives an aldehyde, not a ketone."],
      ["2-methylbutan-2-ol", "Tertiary alcohols are not oxidised."],
    ],
    answer: "A",
    hints: ["Two clues: secondary, and CH₃ next to the C–OH carbon."],
    explanation: "CH₃CH(OH)CH₂CH₂CH₃ → CH₃COCH₂CH₂CH₃, which gives CHI₃ and sodium butanoate.",
  });
  {
    const m = 3.10;
    const n = moles(m, Mr("C2H6O2"));
    const v = n * VM_RTP * 1000; // 1 mol H2 per mol diol (two OH groups)
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Excess sodium is added to 3.10 g of ethane-1,2-diol, HOCH₂CH₂OH. Calculate the volume of hydrogen formed, in cm³ at room conditions, to three significant figures. Ar: H 1, C 12, O 16; molar gas volume 24.0 dm³ mol⁻¹.",
      value: v, sf: 3, unit: "cm³",
      wrong: [v / 2],
      hints: ["Each –OH group gives half a mole of H₂."],
      explanation: `1. Mr(C₂H₆O₂) = 62.0; n = 3.10 ÷ 62.0 = ${sfStr(n, 3)} mol.\n2. HOCH₂CH₂OH + 2Na → NaOCH₂CH₂ONa + H₂: 1 mol H₂ per mol of diol.\n3. V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.\n4. Treating it like ethanol (½ mol H₂ per mol) gives ${sfStr(v / 2, 3)} cm³, ignoring the second –OH group.`,
    });
  }
  {
    const m = 2.70;
    const n = moles(m, Mr("C3H8O"));
    const mi = n * Mr("CHI3");
    b.calc({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: "2.70 g of propan-2-ol is warmed with excess alkaline iodine. Calculate the maximum mass of tri-iodomethane, CHI₃, in g, to three significant figures. Ar: H 1, C 12, O 16, I 126.9.",
      value: mi, sf: 3, unit: "g",
      wrong: [n * Mr("CH3I")],
      hints: ["One CHI₃ forms from each CH₃CH(OH)– group."],
      explanation: `1. Mr(C₃H₇OH) = 60.0; n = 2.70 ÷ 60.0 = ${sfStr(n, 3)} mol.\n2. CH₃CH(OH)CH₃ + 4I₂ + 6NaOH → CHI₃ + CH₃COONa + 5NaI + 5H₂O: 1 : 1.\n3. Mr(CHI₃) = ${Mr("CHI3").toFixed(1)}; mass = ${sfStr(n, 3)} × ${Mr("CHI3").toFixed(1)} = ${sfStr(mi, 3)} g.\n4. Using CH₃I (Mr ${Mr("CH3I").toFixed(1)}) by mistake gives ${sfStr(n * Mr("CH3I"), 3)} g.`,
    });
  }
  {
    const nA = moles(6.00, Mr("CH3COOH"));
    const theo = nA * Mr("CH3COOC2H5");
    const y = percentYield(5.72, theo);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "6.00 g of ethanoic acid is heated under reflux with excess ethanol and concentrated sulfuric acid; 5.72 g of ethyl ethanoate is obtained. Calculate the percentage yield to three significant figures. Ar: H 1, C 12, O 16.",
      value: y, sf: 3, unit: "%",
      wrong: [percentYield(5.72, 6.0)],
      hints: ["Find the theoretical mass of ester from the moles of acid (1 : 1)."],
      explanation: `n(acid) = 6.00 ÷ 60.0 = ${sfStr(nA, 3)} mol; theoretical ester = ${sfStr(nA, 3)} × 88.0 = ${sfStr(theo, 3)} g; yield = 5.72 ÷ ${sfStr(theo, 3)} × 100 = ${sfStr(y, 3)}%. Comparing masses directly (5.72 ÷ 6.00) is wrong because the substances have different Mr.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To oxidise ethanol fully to ethanoic acid, the mixture is heated under reflux with excess acidified dichromate(VI).",
    answer: true,
    explanation: "True: reflux keeps the intermediate ethanal in the flask until it is oxidised to the acid.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Propan-1-ol gives a positive tri-iodomethane (iodoform) test.",
    answer: false,
    explanation: "False: propan-1-ol, CH₃CH₂CH₂OH, has no CH₃CH(OH)– group; it is oxidised to propanal, not to a methyl ketone.",
  });
  b.match({
    d: 3, skill: "RECALL",
    stem: "Match each reagent and conditions with the type of product formed from propan-2-ol.",
    pairs: [
      ["K₂Cr₂O₇ and dilute H₂SO₄, heat", "a ketone"],
      ["heated Al₂O₃", "an alkene"],
      ["sodium metal", "an alkoxide and hydrogen"],
      ["ethanoic acid and concentrated H₂SO₄, reflux", "an ester"],
      ["SOCl₂", "a chloroalkane"],
    ],
    hints: ["Oxidation, dehydration, acid-metal-type reaction, esterification, substitution."],
    explanation: "Propanone; propene; sodium propan-2-oxide + H₂; 1-methylethyl ethanoate; 2-chloropropane.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the equation for the tri-iodomethane reaction of ethanol.",
    template: "CH₃CH₂OH + 4I₂ + 6NaOH → CHI₃ + 5H₂O + {{blank:b}} NaI + {{blank:a}}",
    blanks: [
      { id: "a", accepted: ["HCOONa"], choices: ["HCOONa", "CH₃COONa", "CH₃CHO"] },
      { id: "b", accepted: ["5"], choices: ["3", "4", "5", "6"] },
    ],
    hints: ["Ethanol has two carbons; one leaves as CHI₃. Balance iodine: 8 atoms on the left."],
    explanation: "One carbon goes to CHI₃, the other forms sodium methanoate, HCOONa; iodine: 8 = 3 + 5.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the organic product when propan-2-ol is heated with acidified potassium dichromate(VI).",
    accepted: ["propanone", "acetone", "propan-2-one", "dimethyl ketone"],
    wrong: ["propanal"],
    explanation: "Secondary alcohol → ketone: CH₃CH(OH)CH₃ + [O] → CH₃COCH₃ + H₂O.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why distillation gives ethanal but heating under reflux gives ethanoic acid when ethanol is oxidised by acidified dichromate(VI).",
    points: ["Ethanal has a lower boiling point (about 21 °C) than ethanol because it cannot hydrogen bond between its molecules", "In distillation the ethanal vaporises and leaves the flask as soon as it forms, before further oxidation", "Under reflux the vapour condenses and returns, so ethanal stays in contact with the oxidant and is oxidised to ethanoic acid"],
    modelAnswer: "Ethanal has no O–H group, so it cannot hydrogen bond and boils at about 21 °C, well below ethanol. If the mixture is distilled, the ethanal escapes as it forms and is not oxidised further. Under reflux the vapours condense and fall back, so the ethanal is kept with the excess dichromate(VI) and is oxidised to ethanoic acid.",
    hints: ["Compare the boiling points of the alcohol and the aldehyde."],
    explanation: "Apparatus controls whether the aldehyde escapes or stays in the flask.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Describe chemical tests, with observations, that would distinguish between propan-1-ol, propan-2-ol and 2-methylpropan-2-ol.",
    points: ["Warm each with acidified K₂Cr₂O₇: 2-methylpropan-2-ol stays orange", "propan-1-ol and propan-2-ol turn it green", "Warm the other two with alkaline iodine (I₂ and NaOH(aq))", "Propan-2-ol gives a pale yellow precipitate (CHI₃); propan-1-ol gives none"],
    modelAnswer: "Warm each alcohol with acidified potassium dichromate(VI). The tertiary alcohol, 2-methylpropan-2-ol, leaves the solution orange; the other two turn it green. Then warm propan-1-ol and propan-2-ol separately with iodine in sodium hydroxide: only propan-2-ol gives a pale yellow precipitate of tri-iodomethane.",
    hints: ["Use one test for the class and one for CH₃CH(OH)–."],
    explanation: "Dichromate separates tertiary; iodoform separates the secondary CH₃CH(OH)– alcohol.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Write equations, using [O] where needed, for (i) the reaction of ethanol with sodium and (ii) the complete oxidation of ethanol by acidified dichromate(VI).",
    points: ["2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂", "CH₃CH₂OH + 2[O] → CH₃COOH + H₂O"],
    modelAnswer: "(i) 2C₂H₅OH + 2Na → 2C₂H₅O⁻Na⁺ + H₂. (ii) CH₃CH₂OH + 2[O] → CH₃COOH + H₂O.",
    hints: ["Balance the hydrogen in (i)."],
    explanation: "Alkoxide formation and oxidation to the acid.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Three alcohols, J, K and L, each have the formula C₄H₁₀O. Results of tests:\n\n| Test | J | K | L |\n|---|---|---|---|\n| warm with acidified K₂Cr₂O₇ | orange to green | orange to green | stays orange |\n| warm with I₂ and NaOH(aq) | no change | pale yellow precipitate | no change |\n| structure | unbranched chain | — | — |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name J.", accepted: ["butan-1-ol", "1-butanol", "butan 1 ol"], wrong: ["butan-2-ol"], explanation: "Oxidised, no CH₃CH(OH)–, unbranched: butan-1-ol." }),
      P.short({ label: "(b)", marks: 1, stem: "Name K.", accepted: ["butan-2-ol", "2-butanol", "butan 2 ol"], wrong: ["butan-1-ol"], explanation: "Oxidised and gives CHI₃: butan-2-ol." }),
      P.short({ label: "(c)", marks: 1, stem: "Name L.", accepted: ["2-methylpropan-2-ol", "2-methyl-2-propanol", "tert-butanol", "t-butanol", "tertiary butanol", "2 methylpropan 2 ol"], wrong: ["2-methylpropan-1-ol"], explanation: "Not oxidised: tertiary, (CH₃)₃COH." }),
      P.mcq({ label: "(d)", marks: 1, stem: "What are the organic products of the reaction of K with alkaline iodine?", options: [
        ["CHI₃ and sodium propanoate", "Correct: CH₃CH(OH)C₂H₅ → CH₃COC₂H₅ → CHI₃ + C₂H₅COONa."],
        ["CHI₃ and sodium butanoate", "One carbon leaves as CHI₃, so the salt has three carbons."],
        ["CH₃I and butanone", "The product is tri-iodomethane, CHI₃, and the ketone does not survive."],
        ["CHI₃ and propan-1-ol", "The fragment is a carboxylate salt, not an alcohol."],
      ], answer: "A", explanation: "The salt has one carbon fewer than the alcohol." }),
      P.manual({ label: "(e)", marks: 2, stem: "J is heated under reflux with excess acidified dichromate(VI). Name the organic product and write an equation using [O].", points: ["Butanoic acid", "CH₃CH₂CH₂CH₂OH + 2[O] → CH₃CH₂CH₂COOH + H₂O"], modelAnswer: "Butanoic acid: CH₃CH₂CH₂CH₂OH + 2[O] → CH₃CH₂CH₂COOH + H₂O." }),
      P.manual({ label: "(f)", marks: 2, stem: "K is heated with concentrated phosphoric acid. Name the type of reaction and give the names of all the alkenes that could form.", points: ["Dehydration (elimination)", "But-1-ene, cis-but-2-ene and trans-but-2-ene (all three needed)"], modelAnswer: "Dehydration (elimination of water) gives but-1-ene, cis-but-2-ene and trans-but-2-ene." }),
    ],
    hints: ["Tertiary alcohols are not oxidised; CHI₃ needs CH₃CH(OH)–."],
    explanation: "J butan-1-ol, K butan-2-ol, L 2-methylpropan-2-ol; K gives CHI₃ + sodium propanoate; J → butanoic acid; K → three butenes.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "Reaction scheme starting from propan-1-ol:\n\n| Step | Reagent and conditions | Product |\n|---|---|---|\n| 1 | acidified K₂Cr₂O₇, warm, distil | M |\n| 2 | acidified K₂Cr₂O₇, heat under reflux | N |\n| 3 | PCl₅, room temperature | O |\n| 4 | ethanoic acid, concentrated H₂SO₄, reflux | P |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name M.", accepted: ["propanal", "propionaldehyde"], wrong: ["propanone"], explanation: "Primary alcohol, distilled: aldehyde, propanal." }),
      P.short({ label: "(b)", marks: 1, stem: "Name N.", accepted: ["propanoic acid", "propionic acid"], wrong: ["propanal"], explanation: "Reflux: propanoic acid." }),
      P.short({ label: "(c)", marks: 1, stem: "Give the structural formula of O (for example CH3CH2Br).", accepted: ["CH3CH2CH2Cl", "CH₃CH₂CH₂Cl", "C3H7Cl", "ClCH2CH2CH3"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CHClCH3"], explanation: "1-chloropropane: –OH replaced by Cl." }),
      P.manual({ label: "(d)", marks: 1, stem: "State what is observed in step 3.", points: ["Steamy (white) fumes of HCl are given off"], modelAnswer: "Steamy fumes of hydrogen chloride." }),
      P.short({ label: "(e)", marks: 1, stem: "Name P.", accepted: ["propyl ethanoate", "propyl acetate", "1-propyl ethanoate"], wrong: ["ethyl propanoate"], explanation: "The alcohol gives the first word (propyl), the acid the second (ethanoate)." }),
      P.manual({ label: "(f)", marks: 1, stem: "State the role of the concentrated sulfuric acid in step 4.", points: ["Catalyst"], modelAnswer: "It is a catalyst (it also absorbs some of the water)." }),
    ],
    hints: ["Distil versus reflux decides the oxidation product."],
    explanation: "M propanal, N propanoic acid, O 1-chloropropane, P propyl ethanoate.",
  });

  b.card("FACT", "Oxidising agent for alcohols and its colour change", "K₂Cr₂O₇ acidified with dilute H₂SO₄: orange → green (Cr₂O₇²⁻ → Cr³⁺).");
  b.card("CONCEPT", "Primary alcohol: distil or reflux?", "Distil (excess alcohol) → aldehyde; reflux (excess oxidant) → carboxylic acid.");
  b.card("FACT", "Tertiary alcohols with dichromate(VI)", "No reaction: stays orange (no H on the C–OH carbon).");
  b.card("FORMULA", "Ethanol with sodium", "2C₂H₅OH + 2Na → 2C₂H₅O⁻Na⁺ + H₂");
  b.card("FACT", "Reagents converting ROH to RCl", "PCl₅ (cold, steamy fumes), PCl₃ (heat), SOCl₂, or concentrated HCl (with ZnCl₂).");
  b.card("FACT", "Dehydration of alcohols", "Vapour over heated Al₂O₃, or heat with concentrated H₂SO₄ or H₃PO₄ → alkene + H₂O.");
  b.card("FACT", "Tri-iodomethane (iodoform) test", "Warm with I₂ and NaOH(aq): pale yellow CHI₃ precipitate from CH₃CH(OH)– alcohols and CH₃CO– compounds.");
  b.card("CONCEPT", "Products of the iodoform reaction of CH₃CH(OH)R", "CHI₃ plus RCOO⁻Na⁺ (one carbon fewer than the alcohol).");
  b.card("FACT", "Reducing agents for carbonyls and acids", "NaBH₄ reduces aldehydes and ketones; LiAlH₄ (dry ether) also reduces carboxylic acids.");
});
