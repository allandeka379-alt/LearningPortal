// W3b: achem.halogen.halogenoalkane-reactions (both boards; ZIMSEC Form 6, Cambridge AS Level)
import { concept, P, t, Mr, moles, percentYield, sfStr, dpStr } from "../lib.mjs";

concept("achem.halogen.halogenoalkane-reactions", { file: "halogen/halogenoalkane-reactions", keyPrefix: "halogen.halogenoalkane-reactions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which reagent and conditions convert 1-bromobutane into butan-1-ol?",
    options: [
      ["aqueous sodium hydroxide, heat under reflux", "Correct: nucleophilic substitution (hydrolysis)."],
      ["sodium hydroxide in ethanol, heat under reflux", "Ethanolic hydroxide favours elimination to but-1-ene."],
      ["potassium cyanide in ethanol, heat under reflux", "This gives pentanenitrile."],
      ["concentrated sulfuric acid, heat", "This does not substitute OH for Br."],
    ],
    answer: "A",
    explanation: "CH₃CH₂CH₂CH₂Br + OH⁻ → CH₃CH₂CH₂CH₂OH + Br⁻.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "An iodoalkane is warmed with aqueous silver nitrate dissolved in ethanol. What is seen?",
    options: [
      ["a yellow precipitate forms quickly", "Correct: AgI, from the fastest-hydrolysed halogenoalkane."],
      ["a white precipitate forms slowly", "That describes a chloroalkane (AgCl)."],
      ["a cream precipitate forms at a moderate rate", "That describes a bromoalkane (AgBr)."],
      ["no precipitate forms at all", "C–I is the weakest C–X bond, so a precipitate forms readily."],
    ],
    answer: "A",
    explanation: "Iodoalkanes hydrolyse fastest; Ag⁺ + I⁻ → AgI(s), yellow.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "1-bromopropane is heated under reflux with potassium cyanide in ethanol. What is the organic product?",
    options: [
      [t`$\ce{CH3CH2CH2CN}$`, "Correct: butanenitrile; the chain gains one carbon."],
      [t`$\ce{CH3CH2CN}$`, "Propanenitrile would come from bromoethane."],
      [t`$\ce{CH3CH2CH2NH2}$`, "Propylamine comes from reaction with ammonia."],
      [t`$\ce{CH3CH=CH2}$`, "Propene comes from elimination with ethanolic hydroxide."],
    ],
    answer: "A",
    explanation: "CN⁻ replaces Br: CH₃CH₂CH₂CN.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: t`How is 2-chloro-2-methylbutane, $\ce{CH3CH2C(CH3)ClCH3}$, classified?`,
    options: [
      ["tertiary", "Correct: the C–Cl carbon is bonded to three carbons."],
      ["secondary", "Count again: CH₃, CH₃ and CH₂CH₃ are all attached."],
      ["primary", "A primary halogenoalkane has a CH₂X group."],
      ["quaternary", "The term is not used for halogenoalkanes; the carbon has a Cl, not four carbons."],
    ],
    answer: "A",
    explanation: "Three alkyl groups on the C–Cl carbon: tertiary.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do iodoalkanes undergo hydrolysis faster than chloroalkanes?",
    options: [
      ["The C–I bond is weaker than the C–Cl bond, so it breaks more easily.", "Correct: bond strength controls the rate."],
      ["The C–I bond is more polar, so the carbon is more strongly δ+.", "C–I is the least polar C–X bond; polarity predicts the opposite order."],
      ["Iodide ions are better nucleophiles than hydroxide ions.", "The nucleophile is water or OH⁻ in both cases."],
      ["Iodine atoms are smaller and leave the molecule more quickly.", "Iodine atoms are larger than chlorine atoms."],
    ],
    answer: "A",
    hints: ["Compare the C–X bond energies."],
    explanation: "C–I is the weakest bond; rate order RI > RBr > RCl.",
  });
  b.mcq({
    d: 3, skill: "RECALL",
    stem: "Which reagent converts ethanol into chloroethane at room temperature, producing steamy fumes?",
    options: [
      ["phosphorus(V) chloride", "Correct: PCl₅ gives RCl, POCl₃ and HCl (steamy fumes)."],
      ["sodium chloride solution", "Chloride ions do not replace OH in alcohols."],
      ["chlorine in ultraviolet light", "This substitutes C–H bonds by free radicals; it does not replace OH."],
      ["dilute hydrochloric acid without heating", "Dilute HCl at room temperature does not convert ethanol."],
    ],
    answer: "A",
    hints: ["Which reagent also tests for –OH groups?"],
    explanation: "CH₃CH₂OH + PCl₅ → CH₃CH₂Cl + POCl₃ + HCl.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Bromoethane is converted into ethylamine. Which of the statements about the conditions are correct?\n\n1. Ammonia is used in excess.\n2. The mixture is heated in a sealed tube.\n3. The product is an amide.",
    options: [
      ["1 and 2 only", "Correct: the product is an amine, not an amide."],
      ["1, 2 and 3", "Statement 3 is false: CH₃CH₂NH₂ is an amine."],
      ["2 and 3 only", "Statement 3 is false and statement 1 is true."],
      ["1 only", "Statement 2 is also true: it keeps the volatile ammonia in the mixture."],
    ],
    answer: "A",
    hints: ["Amides contain C=O."],
    explanation: "Excess NH₃ in ethanol, heated under pressure, gives the primary amine.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "2-bromobutane is heated with potassium hydroxide in ethanol. Which of the statements about the organic products are correct?\n\n1. But-1-ene can form.\n2. cis-But-2-ene can form.\n3. trans-But-2-ene can form.",
    options: [
      ["1, 2 and 3", "Correct: H can be removed from C1 or C3, and but-2-ene has cis and trans forms."],
      ["1 and 2 only", "trans-But-2-ene also forms."],
      ["2 and 3 only", "Removing H from C1 gives but-1-ene."],
      ["1 only", "But-2-ene (both isomers) also forms."],
    ],
    answer: "A",
    hints: ["Which neighbouring carbons carry hydrogen?"],
    explanation: "Elimination can go towards C1 or C3.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which test distinguishes 1-chlorobutane from 1-bromobutane?",
    options: [
      ["Warm each with ethanolic silver nitrate and compare the precipitates.", "Correct: colour and rate of the silver halide."],
      ["Shake each with bromine water: only the chloro compound decolorises it.", "Neither has a C=C bond."],
      ["Add sodium metal: only the bromo compound gives hydrogen.", "Neither has an O–H group."],
      ["Warm each with acidified dichromate(VI): only one turns it green.", "Halogenoalkanes are not oxidised by dichromate."],
    ],
    answer: "A",
    hints: ["Which reagent detects halide ions?"],
    explanation: "Silver halide colour and speed identify the halogen.",
  });
  {
    const n = moles(3.45, Mr("C2H6O"));
    const th = n * Mr("C2H5Br");
    const y = percentYield(5.9, th);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "3.45 g of ethanol was converted into bromoethane, and 5.90 g of pure bromoethane was collected. Calculate the percentage yield, to one decimal place. Ar: H 1.0, C 12.0, O 16.0, Br 79.9.",
      value: y, dp: 1, unit: "%",
      wrong: [(5.9 / 3.45) * 100],
      hints: ["1 mol ethanol gives 1 mol bromoethane."],
      explanation: `1. n(C₂H₅OH) = 3.45 ÷ 46.0 = ${sfStr(n, 3)} mol.\n2. Mr(C₂H₅Br) = ${Mr("C2H5Br").toFixed(1)}; theoretical mass = ${sfStr(n, 3)} × ${Mr("C2H5Br").toFixed(1)} = ${sfStr(th, 3)} g.\n3. Yield = 5.90 ÷ ${sfStr(th, 3)} × 100 = ${dpStr(y, 1)}%.\n4. Dividing the masses directly gives more than 100%, which is impossible.`,
    });
  }
  {
    const n = moles(4.36, Mr("C2H5Br"));
    const m = n * Mr("C2H5CN");
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: "Calculate the maximum mass, in g, of propanenitrile, CH₃CH₂CN, that can be made from 4.36 g of bromoethane. Ar: H 1.0, C 12.0, N 14.0, Br 79.9.",
      value: m, sf: 3, unit: "g",
      wrong: [n * Mr("CH3CN")],
      hints: ["Check the formula of the product: how many carbons?"],
      explanation: `1. CH₃CH₂Br + CN⁻ → CH₃CH₂CN + Br⁻ (1 : 1).\n2. n = 4.36 ÷ ${Mr("C2H5Br").toFixed(1)} = ${sfStr(n, 3)} mol.\n3. Mr(C₂H₅CN) = 55.0; mass = ${sfStr(n, 3)} × 55.0 = ${sfStr(m, 3)} g.\n4. Using ethanenitrile (Mr 41.0) forgets the extra carbon.`,
    });
  }
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "1-bromobutane is heated with KCN in ethanol. How many carbon atoms are in one molecule of the organic product?",
    value: 5,
    wrong: [4],
    explanation: "The CN group adds a carbon: pentanenitrile, CH₃CH₂CH₂CH₂CN.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Bromoalkanes are hydrolysed faster than chloroalkanes because the C–Br bond is more polar than the C–Cl bond.",
    answer: false,
    hints: ["Which is more electronegative, Cl or Br?"],
    explanation: "False: C–Br is less polar; it reacts faster because it is weaker.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "When an alcohol reacts with thionyl chloride, SOCl₂, both by-products are gases.",
    answer: true,
    explanation: "True: ROH + SOCl₂ → RCl + SO₂ + HCl, which makes the product easy to separate.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each set of reagents and conditions with the organic product formed from 1-bromobutane.",
    pairs: [
      ["NaOH(aq), heat under reflux", "butan-1-ol"],
      ["KCN in ethanol, heat under reflux", "pentanenitrile"],
      ["excess NH₃ in ethanol, heat in a sealed tube", "butylamine"],
      ["NaOH in ethanol, heat under reflux", "but-1-ene"],
    ],
    hints: ["Solvent decides substitution or elimination for hydroxide."],
    explanation: "OH⁻(aq) substitution; CN⁻ adds a carbon; NH₃ gives an amine; ethanolic OH⁻ eliminates HBr.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the results of warming halogenoalkanes with ethanolic silver nitrate.",
    template: "A chloroalkane gives a {{blank:a}} precipitate, a bromoalkane a {{blank:b}} precipitate and an iodoalkane a {{blank:c}} precipitate. The fastest to form is from the {{blank:d}}alkane.",
    blanks: [
      { id: "a", accepted: ["white"], choices: ["white", "cream", "yellow"] },
      { id: "b", accepted: ["cream"], choices: ["white", "cream", "yellow"] },
      { id: "c", accepted: ["yellow"], choices: ["white", "cream", "yellow"] },
      { id: "d", accepted: ["iodo"], choices: ["chloro", "bromo", "iodo"] },
    ],
    explanation: "AgCl white, AgBr cream, AgI yellow; iodo fastest.",
  });
  b.short({
    d: 2, skill: "APPLICATION",
    stem: t`Name the organic product formed when 2-iodopropane, $\ce{CH3CHICH3}$, is heated under reflux with aqueous sodium hydroxide.`,
    accepted: ["propan-2-ol", "2-propanol", "isopropanol", "isopropyl alcohol"],
    wrong: ["propene"],
    explanation: "Substitution: CH₃CH(OH)CH₃, propan-2-ol.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Describe how you would compare the rates of hydrolysis of 1-chlorobutane, 1-bromobutane and 1-iodobutane using silver nitrate, and state the expected results.",
    points: ["Add the same volume (a few drops) of each halogenoalkane to equal volumes of ethanol in separate test tubes in a water bath at the same temperature (e.g. 50 °C)", "Add the same volume of warmed aqueous silver nitrate to each at the same time and start timing", "Record the time for a precipitate to appear", "Iodo: yellow precipitate first; bromo: cream next; chloro: white precipitate slowest"],
    modelAnswer: "Put equal amounts of each halogenoalkane into separate tubes with the same volume of ethanol, and warm them with a tube of aqueous silver nitrate in the same water bath. Add equal volumes of the silver nitrate to each simultaneously, start a timer and note when each precipitate appears. 1-iodobutane gives a yellow precipitate first, then 1-bromobutane a cream one, and 1-chlorobutane a white one last.",
    hints: ["Fair test: same amounts, same temperature."],
    explanation: "Controlled comparison; colours and order.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why ammonia is used in excess when making ethylamine from bromoethane.",
    points: ["Ethylamine has a lone pair on N, so it is also a nucleophile and can react with more bromoethane", "Excess ammonia makes it more likely that bromoethane reacts with NH₃, reducing secondary/tertiary amine (further substitution) products"],
    modelAnswer: "The product, ethylamine, is itself a nucleophile and could attack more bromoethane to give diethylamine and other products. With a large excess of ammonia, bromoethane molecules are far more likely to meet ammonia, so the primary amine is the main product.",
    hints: ["Can the product react further?"],
    explanation: "Excess reagent limits further substitution.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "A student predicts that chloroalkanes are hydrolysed fastest because the C–Cl bond is the most polar C–X bond. Evaluate this prediction using the experimental order of reactivity.",
    points: ["Experimentally the order is RI > RBr > RCl, the opposite of the prediction", "Bond enthalpy decreases from C–Cl to C–I, so C–I is broken most easily", "So bond strength, not polarity, is the deciding factor; the prediction is wrong"],
    modelAnswer: "The prediction fails: iodoalkanes react fastest and chloroalkanes slowest. Although C–Cl is the most polar, it is also the strongest of the three bonds, and breaking the C–X bond is needed for the halide to leave. The weaker C–I bond breaks most easily, so bond strength rather than polarity controls the rate.",
    hints: ["Compare the bond energies with the rates."],
    explanation: "Bond strength dominates.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    stem: "Compound Q is a halogenoalkane with molecular formula C₄H₉X. Results of tests on Q:\n\n| Test | Observation |\n|---|---|\n| warm with ethanolic AgNO₃ | cream precipitate forms quickly |\n| heat with NaOH in ethanol | a single alkene, 2-methylpropene, is formed |\n| heat with NaOH(aq) | an alcohol that is not oxidised by acidified dichromate(VI) |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Identify the halogen X.", accepted: ["bromine", "Br", "bromide"], wrong: ["chlorine"], explanation: "Cream AgBr." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the third test shows the type of halogenoalkane.", points: ["An alcohol not oxidised by acidified dichromate is a tertiary alcohol", "So Q is a tertiary halogenoalkane (the OH replaces X on the same carbon)"], modelAnswer: "Tertiary alcohols resist oxidation by acidified dichromate(VI); since hydrolysis puts OH where X was, Q must be tertiary." }),
      P.short({ label: "(c)", marks: 1, stem: "Name Q.", accepted: ["2-bromo-2-methylpropane", "2 bromo 2 methylpropane", "tert-butyl bromide"], wrong: ["1-bromo-2-methylpropane"], explanation: "(CH₃)₃CBr." }),
      P.short({ label: "(d)", marks: 1, stem: "Name the alcohol formed in the third test.", accepted: ["2-methylpropan-2-ol", "2 methylpropan 2 ol", "tert-butanol", "tert-butyl alcohol"], wrong: ["butan-2-ol"], explanation: "(CH₃)₃COH." }),
      P.mcq({ label: "(e)", marks: 1, stem: "What type of reaction is the second test?", options: [
        ["elimination", "Correct: HBr is removed, forming C=C."],
        ["nucleophilic substitution", "That is the third test."],
        ["electrophilic addition", "Nothing adds to a double bond."],
        ["hydrolysis", "Hydrolysis gives the alcohol."],
      ], answer: "A", explanation: "Ethanolic hydroxide eliminates HBr." }),
      P.manual({ label: "(f)", marks: 2, stem: "Explain why Q gives only one alkene on elimination.", points: ["All three carbons next to the C–Br carbon are CH₃ groups, which are equivalent", "So removal of H from any of them gives the same alkene, (CH₃)₂C=CH₂"], modelAnswer: "The C–Br carbon is attached to three identical methyl groups; whichever methyl loses an H, the product is 2-methylpropene." }),
    ],
    hints: ["Cream precipitate → which halide?", "Which alcohols resist oxidation?"],
    explanation: "Q = 2-bromo-2-methylpropane: AgBr cream; tertiary; one alkene.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true,
    stem: "A two-step route converts propan-1-ol into butanenitrile:\n\n| Step | Reactant | Reagent and conditions | Product |\n|---|---|---|---|\n| 1 | propan-1-ol | reagent R | 1-chloropropane |\n| 2 | 1-chloropropane | reagent S | butanenitrile |",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Suggest reagent R.", accepted: ["PCl5", "phosphorus pentachloride", "phosphorus(V) chloride", "SOCl2", "thionyl chloride", "PCl3", "phosphorus trichloride", "phosphorus(III) chloride"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["Cl2"], explanation: "PCl₅, PCl₃ (heat) or SOCl₂." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give reagent S and the conditions.", points: ["KCN (or NaCN) dissolved in ethanol", "Heat under reflux"], modelAnswer: "Potassium cyanide in ethanol, heated under reflux." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the type of reaction in step 2.", accepted: ["nucleophilic substitution", "SN2"], wrong: ["elimination"], explanation: "CN⁻ is the nucleophile." }),
      P.manual({ label: "(d)", marks: 1, stem: "State why step 2 is useful in synthesis.", points: ["It increases the length of the carbon chain by one carbon"], modelAnswer: "It adds one carbon atom to the chain." }),
      P.manual({ label: "(e)", marks: 1, stem: "State one hazard of reagent S and a precaution.", points: ["KCN is highly toxic (and forms HCN with acid): use gloves, fume cupboard, keep away from acid, supervised use"], modelAnswer: "Potassium cyanide is extremely toxic; wear gloves, work in a fume cupboard and keep acids away to avoid forming hydrogen cyanide." }),
    ],
    hints: ["Which reagent replaces OH by Cl?"],
    explanation: "R = PCl₅ (or SOCl₂/PCl₃); S = KCN in ethanol, reflux; nucleophilic substitution adds a carbon.",
  });

  b.card("FACT", "NaOH(aq) with a halogenoalkane", "Heat under reflux → alcohol (nucleophilic substitution, hydrolysis).");
  b.card("FACT", "KCN with a halogenoalkane", "In ethanol, heat under reflux → nitrile with one extra carbon.");
  b.card("FACT", "NH₃ with a halogenoalkane", "Excess NH₃ in ethanol, heated in a sealed tube → primary amine.");
  b.card("FACT", "NaOH in ethanol with a halogenoalkane", "Heat under reflux → alkene (elimination of HX).");
  b.card("FACT", "Silver halide colours", "AgCl white; AgBr cream; AgI yellow.");
  b.card("CONCEPT", "Reactivity order of halogenoalkanes", "RI > RBr > RCl, because C–X bond strength decreases from Cl to I (not polarity).");
  b.card("FACT", "Alcohol to chloroalkane", "PCl₅ (room temperature), PCl₃ (heat) or SOCl₂.");
  b.card("CONCEPT", "Classifying halogenoalkanes", "Count carbons bonded to the C–X carbon: one primary, two secondary, three tertiary.");
  b.card("FACT", "Making an iodoalkane from an alcohol", "KI with concentrated H₃PO₄ (H₂SO₄ would oxidise HI).");
});
