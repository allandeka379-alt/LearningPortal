// W4a: achem.amines.nitriles (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, VM_RTP, percentYield, sfStr } from "../lib.mjs";

concept("achem.amines.nitriles", { file: "amines/nitriles", keyPrefix: "amines.nitriles" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of CH₃CH₂CH₂CN?",
    options: [
      ["butanenitrile", "Correct: four carbons including the nitrile carbon."],
      ["propanenitrile", "The CN carbon is counted, so the parent has four carbons."],
      ["butyl cyanide", "Butyl cyanide would be C₄H₉CN, which has five carbons."],
      ["pentanenitrile", "There are only four carbon atoms."],
    ],
    answer: "A",
    explanation: "C≡N carbon is C1: CH₃CH₂CH₂CN is butanenitrile.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which reagent and conditions convert 1-bromopropane into butanenitrile?",
    options: [
      ["KCN in ethanol, heat under reflux", "Correct: CN⁻ substitutes for Br."],
      ["HCN with a KCN catalyst at room temperature", "These conditions add HCN to carbonyl compounds."],
      ["KCN in water, room temperature", "The reaction needs heating, and water allows OH⁻ to compete."],
      ["NH₃ in ethanol, heat in a sealed tube", "This gives an amine, propylamine."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CH₂Br + CN⁻ → CH₃CH₂CH₂CN + Br⁻.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which product forms when ethanenitrile is heated under reflux with aqueous sodium hydroxide?",
    options: [
      ["sodium ethanoate and ammonia", "Correct: alkaline hydrolysis gives the carboxylate and NH₃."],
      ["ethanoic acid and ammonium chloride", "These form with dilute HCl."],
      ["ethylamine", "Ethylamine forms by reduction, not hydrolysis."],
      ["ethanamide and sodium cyanide", "The C≡N is hydrolysed completely; no cyanide is released."],
    ],
    answer: "A",
    explanation: "CH₃CN + NaOH + H₂O → CH₃COONa + NH₃.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "What type of reaction converts bromoethane into propanenitrile?",
    options: [
      ["nucleophilic substitution", "Correct: CN⁻ replaces Br⁻."],
      ["nucleophilic addition", "That describes HCN adding to C=O."],
      ["electrophilic substitution", "Cyanide is a nucleophile, not an electrophile."],
      ["elimination", "No double bond is formed."],
    ],
    answer: "A",
    explanation: "CH₃CH₂Br + CN⁻ → CH₃CH₂CN + Br⁻.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the reagents convert propanenitrile into propylamine?\n\n1. LiAlH₄ in dry ether\n2. H₂ with a nickel catalyst\n3. NaBH₄ in water",
    options: [
      ["1 and 2 only", "Correct: NaBH₄ is too weak to reduce nitriles."],
      ["1, 2 and 3", "NaBH₄ does not reduce the C≡N group."],
      ["2 and 3 only", "LiAlH₄ works; NaBH₄ does not."],
      ["1 only", "Catalytic hydrogenation also works."],
    ],
    answer: "A",
    hints: ["Which hydride reagent is the weaker?"],
    explanation: "CH₃CH₂CN + 4[H] → CH₃CH₂CH₂NH₂.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of the statements comparing KCN with a halogenoalkane and HCN with a ketone are correct?\n\n1. Both reactions add one carbon atom to the chain.\n2. Both reactions use CN⁻ as a nucleophile.\n3. Both reactions are carried out by heating under reflux.",
    options: [
      ["1 and 2 only", "Correct: HCN adds to ketones at room temperature."],
      ["1, 2 and 3", "The HCN/KCN reaction does not need reflux."],
      ["2 and 3 only", "Statement 1 is true and statement 3 is false."],
      ["1 only", "Statement 2 is also true."],
    ],
    hints: ["Compare the conditions."],
    answer: "A",
    explanation: "Substitution with heating; addition at room temperature; both add a C via CN⁻.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which route converts ethanol into propanoic acid?",
    options: [
      ["HBr; then KCN in ethanol, reflux; then dilute HCl, reflux", "Correct: alcohol → bromoethane → propanenitrile → propanoic acid."],
      ["acidified K₂Cr₂O₇, reflux; then KCN in ethanol, heat under reflux", "Oxidation gives ethanoic acid, and KCN does not then add a carbon to it."],
      ["KCN in ethanol, reflux; then dilute HCl, reflux", "KCN does not react with an alcohol; the –OH must first become a halogen."],
      ["concentrated H₂SO₄, 170 °C; then HCN with a little KCN, room temperature", "Ethene does not react with HCN/KCN in this way."],
    ],
    answer: "A",
    hints: ["The –OH must first be converted into a good leaving group."],
    explanation: "Halogenoalkane, nitrile, hydrolysis.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which product forms when 2-hydroxypropanenitrile, CH₃CH(OH)CN, is heated under reflux with dilute sulfuric acid?",
    options: [
      ["2-hydroxypropanoic acid", "Correct: –CN is hydrolysed to –COOH; the –OH remains."],
      ["propanoic acid", "The –OH group is not removed by hydrolysis."],
      ["1-aminopropan-2-ol", "That is the product of reduction, not hydrolysis."],
      ["ethanal and HCN", "Hydrolysis converts the nitrile group; the reaction is not simply reversed."],
    ],
    answer: "A",
    hints: ["Which group is hydrolysed?"],
    explanation: "CH₃CH(OH)CN + 2H₂O + H⁺ → CH₃CH(OH)COOH + NH₄⁺.",
  });
  {
    const n = moles(5.45, Mr("C2H5Br"));
    const m = n * Mr("C2H5CN");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "5.45 g of bromoethane is heated with excess KCN in ethanol. Calculate the maximum mass of propanenitrile, CH₃CH₂CN, in g, to three significant figures. Ar: H 1, C 12, N 14, Br 79.9.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("CH3CN")],
      hints: ["The product has one more carbon than bromoethane."],
      explanation: `1. Mr(C₂H₅Br) = ${Mr("C2H5Br").toFixed(1)}; n = 5.45 ÷ ${Mr("C2H5Br").toFixed(1)} = ${sfStr(n, 3)} mol.\n2. Mr(CH₃CH₂CN) = 55; mass = ${sfStr(n, 3)} × 55 = ${sfStr(m, 3)} g.\n3. Using ethanenitrile (Mr 41) gives ${sfStr(n * Mr("CH3CN"), 3)} g, forgetting the added carbon.`,
    });
  }
  {
    const n = moles(3.69, Mr("CH3CN"));
    const v = n * VM_RTP * 1000;
    b.num({
      d: 3, skill: "APPLICATION", calculator: true, daily: true,
      stem: "3.69 g of ethanenitrile, CH₃CN (Mr 41), is completely hydrolysed by boiling with NaOH(aq). What volume of ammonia, in cm³ at room conditions, is released if all of it escapes? (One mole of gas occupies 24.0 dm³.)",
      value: v, sf: 3, unit: "cm³",
      wrong: [n * VM_RTP],
      hints: ["CH₃CN + NaOH + H₂O → CH₃COONa + NH₃."],
      explanation: `n = 3.69 ÷ 41 = ${sfStr(n, 3)} mol of NH₃ (1 : 1); V = ${sfStr(n, 3)} × 24 000 = ${sfStr(v, 3)} cm³.`,
    });
  }
  {
    const n0 = moles(9.25, Mr("C4H9Cl"));
    const y1 = 0.7, y2 = 0.8;
    const m = n0 * y1 * y2 * Mr("C4H9COOH");
    b.calc({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: "1-chlorobutane is converted into pentanenitrile (70.0% yield), which is hydrolysed to pentanoic acid, CH₃(CH₂)₃COOH (80.0% yield). Calculate the mass of pentanoic acid obtained from 9.25 g of 1-chlorobutane, in g, to three significant figures. Ar: H 1, C 12, O 16, Cl 35.5.",
      value: m, sf: 3, unit: "g",
      wrong: [n0 * Mr("C4H9COOH")],
      hints: ["Overall yield = 0.700 × 0.800."],
      explanation: `1. Mr(C₄H₉Cl) = ${Mr("C4H9Cl").toFixed(1)}; n = 9.25 ÷ ${Mr("C4H9Cl").toFixed(1)} = ${sfStr(n0, 3)} mol.\n2. Overall yield = 0.700 × 0.800 = 0.560; n(acid) = ${sfStr(n0 * 0.56, 3)} mol.\n3. Mr(C₄H₉COOH) = 102; mass = ${sfStr(n0 * 0.56, 3)} × 102 = ${sfStr(m, 3)} g.\n4. Ignoring both yields gives ${sfStr(n0 * Mr("C4H9COOH"), 3)} g.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Propanenitrile is made from bromoethane, not from bromopropane.",
    answer: true,
    explanation: "True: CN⁻ adds a carbon, so a two-carbon halogenoalkane gives the three-carbon nitrile.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Heating a nitrile with sodium hydroxide solution gives the free carboxylic acid without any further step.",
    answer: false,
    explanation: "False: alkaline hydrolysis gives the carboxylate salt; dilute acid must then be added.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each reaction of butanenitrile, CH₃CH₂CH₂CN, with its organic product.",
    pairs: [
      ["dilute HCl, heat under reflux", "butanoic acid"],
      ["NaOH(aq), heat under reflux", "sodium butanoate"],
      ["LiAlH₄ in dry ether", "butylamine"],
    ],
    extraRight: ["propylamine", "butanamide"],
    hints: ["Hydrolysis keeps the carbon count; reduction gives –CH₂NH₂."],
    explanation: "Acid hydrolysis → acid; alkaline → salt; reduction → CH₃(CH₂)₃NH₂.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about making nitriles.",
    template: "Halogenoalkanes are heated under {{blank:a}} with potassium cyanide dissolved in {{blank:b}}. Aldehydes and ketones react with HCN in the presence of a little {{blank:c}} at room temperature.",
    blanks: [
      { id: "a", accepted: ["reflux"], choices: ["reflux", "distillation", "pressure"] },
      { id: "b", accepted: ["ethanol"], choices: ["ethanol", "water", "hexane"] },
      { id: "c", accepted: ["KCN"], choices: ["KCN", "NaOH", "H₂SO₄"] },
    ],
    explanation: "KCN in ethanol, reflux; HCN with KCN catalyst.",
  });
  b.short({
    d: 3, skill: "APPLICATION",
    stem: "Give the structural formula of the amine formed when ethanenitrile is reduced with LiAlH₄ (for example CH3NH2).",
    accepted: ["CH3CH2NH2", "C2H5NH2", "CH₃CH₂NH₂", "C₂H₅NH₂"],
    normalise: ["trim", "collapse_whitespace"],
    wrong: ["CH3NH2"],
    hints: ["–C≡N becomes –CH₂NH₂."],
    explanation: "CH₃CN + 4[H] → CH₃CH₂NH₂ (ethylamine).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Outline a two-step synthesis of propylamine, CH₃CH₂CH₂NH₂, from bromoethane. Give reagents and conditions and name the intermediate.",
    points: ["KCN in ethanol, heat under reflux", "Intermediate: propanenitrile, CH₃CH₂CN", "Reduce with LiAlH₄ in dry ether (or H₂ with Ni)"],
    modelAnswer: "Heat bromoethane under reflux with potassium cyanide in ethanol to form propanenitrile, CH₃CH₂CN. Reduce the nitrile with LiAlH₄ in dry ether (or hydrogen over nickel) to give propylamine.",
    hints: ["Add a carbon, then reduce."],
    explanation: "Substitution then reduction.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Ethylamine can be made from bromoethane with ammonia, or from ethanenitrile by reduction. Suggest one advantage of each route.",
    points: ["Ammonia route: one step from a cheap halogenoalkane, no expensive reducing agent (and no cyanide)", "Nitrile route: gives only the primary amine (no secondary/tertiary amines or quaternary salts)", "so the nitrile route gives a purer product that is easier to separate"],
    modelAnswer: "The ammonia route is a single step from bromoethane and avoids LiAlH₄ and cyanide. Reducing ethanenitrile, however, gives only ethylamine, because the product cannot react further, so there is no mixture of secondary and tertiary amines to separate.",
    hints: ["Consider purity, number of steps and hazards."],
    explanation: "Purity versus simplicity.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Explain why KCN is dissolved in ethanol rather than water when it is reacted with a halogenoalkane, and give one safety precaution.",
    points: ["In water, OH⁻ ions (from hydrolysis of CN⁻/water) compete, giving some alcohol; the halogenoalkane also dissolves better in ethanol", "KCN is very toxic: gloves, fume cupboard, no contact with acids (HCN released)"],
    modelAnswer: "In ethanol the halogenoalkane dissolves and there are few hydroxide ions to compete, so the nitrile, not the alcohol, forms. KCN is highly toxic, so wear gloves, work in a fume cupboard and keep it away from acids, which release HCN.",
    hints: ["Which other nucleophile would be present in water?"],
    explanation: "Solvent choice and cyanide safety.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "A synthesis scheme from 1-bromopropane:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | 1-bromopropane | KCN in ethanol, heat under reflux | K |\n| 2 | K | dilute HCl, heat under reflux | L |\n| 3 | K | H₂ with nickel catalyst | M |\n| 4 | L | ethanol with concentrated H₂SO₄, reflux | N |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name K.", accepted: ["butanenitrile", "butyronitrile", "propyl cyanide"], wrong: ["propanenitrile"], explanation: "CH₃CH₂CH₂CN." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What type of reaction is step 1?", options: [
        ["nucleophilic substitution", "Correct: CN⁻ replaces Br⁻."],
        ["nucleophilic addition", "Addition happens with C=O compounds."],
        ["elimination", "No alkene forms."],
        ["electrophilic addition", "There is no C=C and CN⁻ is a nucleophile."],
      ], answer: "A", explanation: "Substitution." }),
      P.short({ label: "(c)", marks: 1, stem: "Name L.", accepted: ["butanoic acid", "butyric acid"], wrong: ["propanoic acid"], explanation: "CH₃CH₂CH₂COOH." }),
      P.short({ label: "(d)", marks: 1, stem: "Give the structural formula of M (for example CH3NH2).", accepted: ["CH3CH2CH2CH2NH2", "CH₃CH₂CH₂CH₂NH₂", "C4H9NH2", "CH3(CH2)3NH2"], normalise: ["trim", "collapse_whitespace"], wrong: ["CH3CH2CH2NH2"], explanation: "Butylamine." }),
      P.short({ label: "(e)", marks: 1, stem: "Name N.", accepted: ["ethyl butanoate", "ethyl butyrate"], wrong: ["butyl ethanoate"], explanation: "CH₃CH₂CH₂COOC₂H₅." }),
      P.manual({ label: "(f)", marks: 1, stem: "Write an equation for step 2.", points: ["CH₃CH₂CH₂CN + 2H₂O + HCl → CH₃CH₂CH₂COOH + NH₄Cl"], modelAnswer: "CH₃CH₂CH₂CN + 2H₂O + HCl → CH₃CH₂CH₂COOH + NH₄Cl" }),
    ],
    hints: ["Step 1 adds one carbon."],
    explanation: "K butanenitrile; L butanoic acid; M butylamine; N ethyl butanoate.",
  });

  {
    const n = moles(2.78, 92.5);
    const th = n * 83;
    const y = percentYield(1.81, th);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, calculator: true,
      stem: "Chipo heats 2.78 g of 1-chlorobutane (Mr 92.5) under reflux with potassium cyanide in ethanol and isolates 1.81 g of a nitrile (Mr 83). She then divides the nitrile into two portions for further reactions.",
      parts: [
        P.short({ label: "(a)", marks: 1, stem: "Name the nitrile.", accepted: ["pentanenitrile", "valeronitrile", "butyl cyanide"], wrong: ["butanenitrile"], explanation: "Five carbons including the CN carbon." }),
        P.manual({ label: "(b)", marks: 1, stem: "Write an equation for its formation.", points: ["CH₃CH₂CH₂CH₂Cl + CN⁻ → CH₃CH₂CH₂CH₂CN + Cl⁻ (or with KCN → KCl)"], modelAnswer: "CH₃CH₂CH₂CH₂Cl + KCN → CH₃CH₂CH₂CH₂CN + KCl" }),
        P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage yield of the nitrile.", value: y, sf: 3, unit: "%", wrong: [percentYield(1.81, 2.78)], explanation: `n = 2.78 ÷ 92.5 = ${sfStr(n, 3)} mol; maximum nitrile = ${sfStr(n, 3)} × 83 = ${sfStr(th, 3)} g; yield = 1.81 ÷ ${sfStr(th, 3)} × 100 = ${sfStr(y, 3)}%.` }),
        P.short({ label: "(d)", marks: 1, stem: "Name the product when one portion is heated under reflux with dilute hydrochloric acid.", accepted: ["pentanoic acid", "valeric acid"], wrong: ["butanoic acid"], explanation: "Hydrolysis gives CH₃(CH₂)₃COOH." }),
        P.manual({ label: "(e)", marks: 1, stem: "Name a reagent that converts the other portion into pentylamine.", points: ["LiAlH₄ in dry ether, or H₂ with a nickel catalyst"], modelAnswer: "LiAlH₄ in dry ether." }),
      ],
      hints: ["KCN adds one carbon atom."],
      explanation: `Pentanenitrile; yield ${sfStr(y, 3)}%; hydrolysis to pentanoic acid; reduction to pentylamine.`,
    });
  }
  b.card("DEFINITION", "Nitrile", "Contains –C≡N; named -nitrile, counting the CN carbon (CH₃CH₂CN = propanenitrile).");
  b.card("FACT", "Making a nitrile from a halogenoalkane", "KCN in ethanol, heat under reflux (nucleophilic substitution, +1 carbon).");
  b.card("FACT", "Making a hydroxynitrile", "Aldehyde or ketone + HCN with KCN catalyst, room temperature (nucleophilic addition).");
  b.card("FACT", "Acid hydrolysis of a nitrile", "Dilute HCl, reflux: RCN + 2H₂O + HCl → RCOOH + NH₄Cl.");
  b.card("FACT", "Alkaline hydrolysis of a nitrile", "NaOH(aq), reflux: RCN + NaOH + H₂O → RCOONa + NH₃; acidify to get RCOOH.");
  b.card("FACT", "Reduction of a nitrile", "LiAlH₄ in dry ether or H₂/Ni: RCN → RCH₂NH₂ (primary amine only).");
  b.card("CONCEPT", "When to use a nitrile in synthesis", "When the target has one more carbon than the starting material (–COOH or –CH₂NH₂ ends).");
  b.card("FACT", "Cyanide safety", "KCN and HCN are extremely toxic: gloves, fume cupboard, keep KCN away from acids.");
});
